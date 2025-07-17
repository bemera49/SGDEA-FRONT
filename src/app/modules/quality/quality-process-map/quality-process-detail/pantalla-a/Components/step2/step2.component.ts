import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Items } from '@app/modules/quality/quality-main/components/sub-menu-quality/items';
import { ProcessData, SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { ProcesoDetallesService } from '../../../services/proceso-detalles.service';
;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit, OnDestroy {
  @Input() ID;
  items: Items[] = [{
    link: '',
    text: ''
  }, {
    link: '',
    text: ''
  }];
  //variables de datos
  DatosSubprocess: SubprocessDetail = null
  datosProceso: ProcessData = null
  tablesub3 = []
  selectedTab = 0
  titleSubproces: string = ''
  titleProcess: string = ''
  tabledate: any = []
  isDestroyed = false
  mostrarDescripción: boolean = false

  //Variables para iconos
  Info: string = 'info'
  circle: string = 'check'
  calendar: string = 'calendar_today'
  article: string = 'article'
  account_tree: string = 'account_tree'
  close_fullscreen: string = 'close_fullscreen'
  Edit: string = 'border_color'
  //variables de subcripción
  private SubprocesoSubscription: Subscription
  private procesoSubscription: Subscription
  private downloadSubscription: Subscription
  private mostrarDescripcionSubscription: Subscription

  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private cd: ChangeDetectorRef,
    private servicesdownloadfile: QualityDetailsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isDestroyed = false
    this.subscribeToShowDescription()
  }
  ngOnDestroy(): void {
    this.isDestroyed = true
    this.resetVariables()
    this.cancelsuscription()
  }

  private resetVariables(): void {

  }


  private cancelsuscription(): void {
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe();
    }
    if (this.SubprocesoSubscription) {
      this.SubprocesoSubscription.unsubscribe();
    }
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

  private subscribeToShowDescription(): void {
    this.mostrarDescripcionSubscription = this.procesoDetallesService.getMostrarDescripcion().subscribe(mostrar => {
      this.mostrarDescripción = mostrar; // Actualización del indicador para mostrar
      this.DatosSubproces() // Actualización de los detalles del proceso al cambiar el indicador
    });
  }


  private DatosSubproces(): void {
    this.procesoSubscription = this.procesoDetallesService.getDatosProceso().subscribe({
      next: (res) => {
        this.datosProceso = res
        this.titleProcess = this.getConcatenatedCodeName(this.datosProceso)
        this.SubprocesoSubscription = this.procesoDetallesService.retrieveAndProcessSubprocess().subscribe({
          next: (value) => {
            if (value && value.id === this.ID) {
              this.DatosSubprocess = value
              this.titleSubproces = this.DatosSubprocess.code;
              const documents = this.DatosSubprocess.documents;
              this.getdatanotvision(value)
              this.cancelsuscription()
            }
          }
        })
      }
    }
    )
  }

  private getConcatenatedCodeName(proceso: any): string {
    return `${proceso.code} - ${proceso.name}`;
  }

  getdatanotvision(res: any): void {

    // Copiar profundamente el objeto principal
    let tabledateCopy = { ...res, documents: [...res.documents] };

    // Verificar si 'documents' es un array
    if (tabledateCopy.documents && Array.isArray(tabledateCopy.documents)) {
      tabledateCopy.documents = tabledateCopy.documents.map(document => {
        // Hacer una copia profunda del documento
        let documentCopy = { ...document };

        // Verificar si el documento tiene un array de archivos
        if (documentCopy.files && Array.isArray(documentCopy.files)) {
          // Filtrar los archivos que no tienen la extensión 'vsdx'
          documentCopy.files = documentCopy.files.filter(file => file.extesion.toLowerCase() !== 'vsdx');
        } else {
          // Si no tiene archivos, inicializar el array como vacío
          documentCopy.files = [];
        }

        return documentCopy;
      });
    } else {
      tabledateCopy.documents = [];
    }

    // Asignar la copia filtrada a tabledate
    this.tabledate = tabledateCopy;
    this.BuildSubprocessData(this.tabledate)
  }



  //Organización de detos para la tabla del step2
  private BuildSubprocessData(res): void {
    this.tablesub3 = [];
    const table3 = res; // `subprocess` es un único objeto

    if (table3.documents && Array.isArray(table3.documents) && table3.documents.length > 0) {
      // Si `documents` es un arreglo y no está vacío
      this.tablesub3.push(...table3.documents.map(document => ({
        id: document.id,
        name: document.name,
        code: document.code,
        version: document.version,
        documental: document.documental,
        subtitle: document.subtitle,
        fileId: document.files.length > 0 ? document.files[0].id : 'Sin archivos',
        extesion: document.files.length > 0 ? document.files[0].extesion : 'Sin archivos',
      })));
    } else {
      // Si la carpeta 'documents' está vacía, muestra mensaje de no hay selección
      this.tablesub3.push({
        id: 999,
        name: 'No hay procedimientos para seleccionar',
        code: '',
        version: '',
        documental: '',
        subtitle: '',
        fileId: 'Sin archivos',
        extesion: 'Sin archivos',
      });
    }
  }

  returnStep(step: number): void {
    this.procesoDetallesService.setbyidrouterstep(step)
    this.procesoDetallesService.setsubprocesOrProcedure(false)
    this.procesoDetallesService.setMostrarDescripcion(this.mostrarDescripción)
  }

  descargarDocumento(event: { id: number, original_name: string }) {
    const { id, original_name } = event;
    this.downloadSubscription = this.servicesdownloadfile.descargarArchivo(id.toString()).subscribe((data: Blob) => {
      const nombreArchivo = original_name;
      saveAs(data, nombreArchivo);
      this.openAcceptModal('012. Descarga Exitosa.');
    }, error => {
      this.openAcceptModal('003.Error del sistema.');
    });
  }

  openAcceptModal(message: string) {
    // Implementa esta función para mostrar el modal con el mensaje
  }

}

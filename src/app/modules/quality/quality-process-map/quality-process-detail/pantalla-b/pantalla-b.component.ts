import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { ProcessData } from '@app/services/quality-details/Interfaces/detailsConfig';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { RestService } from '@app/services/rest.service';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { DocumentDetail, FileDetail, SubprocessDetail, tablenode } from '../interfaces/Processnode';
import { ProcesoDetallesService } from '../services/proceso-detalles.service';

@Component({
  selector: 'app-pantalla-b',
  templateUrl: './pantalla-b.component.html',
  styleUrls: ['./pantalla-b.component.css']
})
export class PantallaBComponent implements OnInit, OnDestroy {
  //variables de iconos
  fullscreen: string = 'fullscreen'
  account_tree: string = 'account_tree'
  Info: string = 'info'
  download: string = 'file_download'
  Edit: string = 'border_color'
  //variables de flujo
  subprocesOrProcedure: boolean = false
  tablesub3: tablenode[] = []
  subprocess: SubprocessDetail = null
  datosProceso: ProcessData = null
  datoSubproces: any = null
  mostrarDescripcion: boolean = true
  process: ProcessData = null
  document: DocumentDetail = null
  currentStep: number = null
  selectedId: number = null
  tablesub2 = []
  filebyId: FileDetail = null
  datoProces: string = null
  datafile: any = null
  previousDocument: any = null
  selectedTab: number = 0;
  diagramdata: any = null
  DiagramView: boolean = false
  isDestroyed: boolean
  isCharacterizationSelected: boolean = false

  private dataFile$: Subscription;
  //variables de supcriocion
  mostrarDescripcionSubscription: Subscription
  subprocessOrProcedureSubscription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessSubprocess()
  private retrieveAndProcessSubprocessSubscription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessDocument()
  private retrieveAndProcessDocumentSubscription: Subscription
  private downloadSubscription: Subscription
  private procesoSubscription: Subscription
  private documentIdSubscription: Subscription
  private fileIdSubscription: Subscription
  private dataFileSubscription: Subscription
  private SubprocesoSubcription: Subscription
  extension: string;

  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private cd: ChangeDetectorRef,
    private servicesdownloadfile: QualityDetailsService,
    private dialog: MatDialog,
    private rest: RestService,
  ) {
    this.subscribeToShowDescription(); // Suscripción para mostrar descripción en la inicialización
  }


  ngOnInit(): void {
    this.isDestroyed = false
    this.getDatastep(this.currentStep);
    this.dataFile$ = this.procesoDetallesService.dateFile().subscribe();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true
    this.resetVariables()
    this.cancelsuscription();
    this.retrieveAndProcessDocumentSubscription?.unsubscribe();
    this.dataFile$?.unsubscribe();
    this.SubprocesoSubcription?.unsubscribe();
    this.retrieveAndProcessSubprocessSubscription?.unsubscribe();
  }
  //cancelación de las subcripciones
  private cancelsuscription(): void {
    if (this.mostrarDescripcionSubscription) {
      this.mostrarDescripcionSubscription.unsubscribe(); // Cancelación de la suscripción al destruir el componente
    }
    if (this.subprocessOrProcedureSubscription) {
      this.subprocessOrProcedureSubscription.unsubscribe();
    }
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe();
    }
    if (this.documentIdSubscription) {
      this.documentIdSubscription.unsubscribe();
    }
    if (this.fileIdSubscription) {
      this.fileIdSubscription.unsubscribe();
    }
  }
  //reinicio de variables cuando se destruye el componente
  private resetVariables(): void {
    this.subprocesOrProcedure = false;
    this.tablesub3 = []
    this.subprocess = null
    this.datosProceso = null
    this.datoSubproces = null
    this.mostrarDescripcion = true
    this.process = null
    this.document = null
    this.selectedId = null
    this.tablesub2 = []
    this.filebyId = null
    this.datoProces = null
    this.datafile = null
    this.previousDocument = null
    this.selectedTab = 0
    this.diagramdata = null
    this.DiagramView = false
    this.isCharacterizationSelected = false
  }

  onRequestModification() {
    this.selectedTab = 1;
  }

  private subscribeToShowDescription(): void {
    this.mostrarDescripcionSubscription = this.procesoDetallesService.getMostrarDescripcion().subscribe(mostrar => {
      this.mostrarDescripcion = mostrar; // Actualización del indicador para mostrar
      this.updateProcessDetails(); // Actualización de los detalles del proceso al cambiar el indicador
    });
  }
  private subscribeToSubprocessOrProcedure(): void {
    this.subprocessOrProcedureSubscription = this.procesoDetallesService.getsubprocessOrProcedure().subscribe(value => {
      this.subprocesOrProcedure = value; // Aquí cambia a subprocessOrProcedure
      this.updateViewBasedOnValue();
    });
  }


  private updateProcessDetails(): void {
    this.procesoDetallesService.getDatosProceso().subscribe({
      next: (res) => {
        this.datosProceso = res;

        if (res && typeof res === 'object' && Object.keys(res).length === 0 || this.mostrarDescripcion) {
          this.process = this.datosProceso
          this.isCharacterizationSelected = true
          this.ConstruirdatosProces();
        } else {
          // Una vez que se obtienen los datos del proceso, se obtiene el valor de subprocessOrProcedure
          this.isCharacterizationSelected = false
          this.subscribeToSubprocessOrProcedure()
        }
      },
      error: (error) => {
        if (!this.isDestroyed) {
          console.error('Error al obtener datos: ', error);
        }
      }
    });
  }

  updateViewBasedOnValue(): void {
    if (!this.subprocesOrProcedure) {
      this.document = null
      this.filebyId = null
      this.subprocess = null
      // Asignar la suscripción a retrieveAndProcessSubprocess() a la variable
      this.retrieveAndProcessSubprocessSubscription = this.procesoDetallesService.retrieveAndProcessSubprocess().subscribe({
        next: (res) => {
          if (res) {
            this.subprocess = res;
            this.BuildSubprocessData();
            this.cd.detectChanges()
          }
        },
        error: (error) => {
          console.error('Error al obtener datos: ', error);
        }
      });
    } else {
      // Asignar la suscripción a retrieveAndProcessDocument() a la variable
      this.retrieveAndProcessDocumentSubscription = this.procesoDetallesService.retrieveAndProcessDocument().subscribe({
        next: (value) => {
          if (value) {
            this.document = value;
            this.filebyId = this.document.files[0];
            this.validateDiagramExtension(value.files)

          }
        },
        error: (error) => {
          console.error('Error al obtener datos: ', error);
        }
      });
    }
  }

  // funcion para verificar si tiene visión
  private validateDiagramExtension(files: any): void {
    this.diagramdata = files.find(file => file.extesion.toLowerCase() === 'vsdx');
    if (this.diagramdata) {
      this.DiagramView = true
    } else {
      this.DiagramView = false
    }
  }


  //Organización de detos para la tabla Procedimientos
  private BuildSubprocessData(): void {

    if (this.subprocess) {
      this.tablesub3 = [];
      const table3 = this.subprocess; // `subprocess` es un único objeto

      if (table3.documents && Array.isArray(table3.documents) && table3.documents.length > 0) {
        // Si `documents` es un arreglo y no está vacío
        this.tablesub3.push(...table3.documents.map(document => ({
          id: document.id,
          name: document.name,
          code: document.code
        })));

      } else {
        //si la carpeta 'documents' esta vacia este muestra mensaje de no hay selección
        this.tablesub3.push({
          id: 999,
          name: 'No hay procedimientos para seleccionar',
          code: ''
        });
      }
    }
  }

  //descargar archivo
  descargarDocumento(event: { id: number, name: string }): void {
    this.downloadSubscription = this.servicesdownloadfile.descargarArchivo(event.id.toString()).subscribe((data: Blob) => {
      const nombreArchivo = event.name;
      saveAs(data, nombreArchivo);
      this.openAcceptModal('012. Descarga Exitosa.');
    }, error => {
      this.openAcceptModal('003.Error del sistema.');
    });
  }
  openAcceptModal(paragraph: string): void {
    const dialogRef = this.dialog.open(ModalAcceptComponent, {
      width: '50%',
      data: { paragraph: paragraph }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  //organiza datos para mostrar en la tabla de subproceso
  private ConstruirdatosProces(): void {
    if (this.datosProceso) {
      this.tablesub3 = []
      this.tablesub3 = this.datosProceso.subprocess.map((item: SubprocessDetail) => ({
        id: item.id,
        name: item.name,
        code: item.code
      }))
    }
  }
  getDatastep(currentStep?: number): void {
    this.procesoSubscription = this.procesoDetallesService.getbyidrouterstep().subscribe({
      next: (res) => {
        this.currentStep = res.step;
        this.getIDforstep(this.currentStep)
      },
      error: (error) => {
        console.error('Error al obtener los datos del paso:', error);
      }
    });
  }

  gostep(event: { id: number, step: number }): void {
    this.procesoDetallesService.setbyidrouterstep(event.step);
  }

  getIDforstep(currentStep): void {
    if (this.currentStep === 2) {
      this.documentIdSubscription = this.procesoDetallesService.getDocumentById().subscribe({
        next: (id) => {
          this.selectedId = id
        }
      })
    } else if (this.currentStep === 3) {
      if (!this.isCharacterizationSelected) {
        this.fileIdSubscription = this.procesoDetallesService.getFileId().subscribe({
          next: (id) => {
            this.selectedId = id
          }
        })
      }
    } else {
      currentStep = 1
    }
  }
  // En tu componente Pantalla B
  onRowClicked(id: number): void {
    // Actualiza el estado y el ID en el servicio
    this.selectedId = id
    this.gostep({ id: id, step: 3 })
  }


}

import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { ProcessData } from '@app/services/quality-details/Interfaces/detailsConfig';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { DocumentDetail, FileDetail, SubprocessDetail, tablenode } from '../../../interfaces/Processnode';
import { ProcesoDetallesService } from '../../../services/proceso-detalles.service';

@Component({
  selector: 'app-alternate-data-viewer-step-one',
  templateUrl: './alternate-data-viewer-step-one.component.html',
  styleUrls: ['./alternate-data-viewer-step-one.component.css']
})
export class AlternateDataViewerStepOneComponent implements OnInit, OnDestroy {
  @Input() ID;
  //variables de iconos
  fullscreen: string = 'fullscreen'
  account_tree: string = 'account_tree'
  Info: string = 'info'
  download: string = 'file_download'
  edit: string = 'edit'

  //variables de flujo
  subprocesOrProcedure: boolean = false
  tablesub3: tablenode[] = []
  subproces: SubprocessDetail
  datosProceso: ProcessData
  datoSubproces: any
  mostrarDescripcion: boolean = true
  process: ProcessData
  Procedure: DocumentDetail
  currentStep: number
  selectedId: number
  tablesub2 = [];
  filebyId: FileDetail = null
  datoProces: string
  datafile: any = null
  stepReturn: boolean = false
  diagramdata: any = null
  DiagramView: boolean = false


  //variables de supcriocion
  private dataFileSubscription: Subscription
  private SubprocesoSubcription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessSubprocess()
  private subprocesoSubscription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessDocument()
  private documentByIdSubscription: Subscription
  private downloadSubscription: Subscription
  private procesoSubscription: Subscription
  private documentIdSubscription: Subscription
  private fileIdSubscription: Subscription


  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private servicesdownloadfile: QualityDetailsService,
    private dialog: MatDialog,
    private VIA: ValidateInternetService,
    private cd: ChangeDetectorRef,
  ) {
    this.VIA.connect()
  }
  ngOnInit(): void {
    /* this.viwerProcedureorFile(); // Suscripción para mostrar descripción en la inicialización */
    this.VIA.checkConnection()

    this.getDatastep(this.currentStep);
    this.updateData(); // Actualización de los detalles del proceso en la inicialización
    this.cd.detectChanges()
  }

  ngOnDestroy(): void {
    this.cancelsuscription();
    this.SubprocesoSubcription?.unsubscribe();
    this.documentByIdSubscription?.unsubscribe()
    this.SubprocesoSubcription?.unsubscribe()
    this.dataFileSubscription?.unsubscribe()
  }

  private cancelsuscription(): void {
    if (this.documentByIdSubscription) {
      this.documentByIdSubscription.unsubscribe()
    }

    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe()
    }
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe()
    }
    if (this.documentIdSubscription) {
      this.documentIdSubscription.unsubscribe()
    }
    if (this.fileIdSubscription) {
      this.fileIdSubscription.unsubscribe()
    }
    if (this.dataFileSubscription) {
      this.dataFileSubscription.unsubscribe()
    }
  }

  private getDataProces(): void {
    this.procesoSubscription = this.procesoDetallesService.getDatosProceso().subscribe({
      next(value) {
        if (value !== undefined && value !== null) {
          this.datoProces = value.name
        }
        if (value !== undefined && value !== null) {
          this.datoProces = value.name
        }
      },
    })
  }

  private updateData(): void {

    this.documentByIdSubscription = this.procesoDetallesService.retrieveAndProcessDocument().subscribe({
      next: (res) => {
        if (res !== null && res !== undefined) {
          this.Procedure = res
          this.validateDiagramExtension(res.files)
        }
      }
    })

    this.dataFileSubscription = this.procesoDetallesService.getFileById().subscribe({
      next: (res) => {
        if (res !== undefined && res !== null) {
          this.filebyId = res;
          this.getDataProces()

        }
      },
      error: (error) => {
        console.log(error);
      }
    });


    this.SubprocesoSubcription = this.procesoDetallesService.getSubprocess().subscribe({
      next: (subprocess) => {
        this.datoSubproces = { name: subprocess[0].name, code: subprocess[0].code };
        // Después de obtener los datos necesarios, cancela la suscripción si está definida
        this.cd.detectChanges();
        this.BuildfileData(this.filebyId)
      },
      error: (error) => {
        console.log(error);
      }
    });

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
  private BuildfileData(res): void {
    this.tablesub3 = [];
    const table3 = res; // `Procedure` es un único objeto

    if (res && table3.files && Array.isArray(table3.files) && table3.files.length > 0) {
      // Si `documents` es un arr  eglo y no está vacío
      this.tablesub3.push(...table3.files.map(file => ({
        id: file.id,
        name: file.name,
        code: file.code,
        extension: file.extension
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


  getIDforstep(currentStep): void {
    console.log('STEP  ALTERNATIVE 1')
    if (this.currentStep === 2) {
      this.documentIdSubscription = this.procesoDetallesService.getDocumentById().subscribe({
        next: (id) => {
          if (id !== undefined && id !== null) {
            console.log('datos current= 2', id)
            this.selectedId = id
            this.updateData()
          }
        }
      })

    } else if (this.currentStep === 3) {
      this.fileIdSubscription = this.procesoDetallesService.getFileId().subscribe({
        next: (id) => {
          this.selectedId = id
        }
      })
    } else {
      currentStep = 1
      this.cancelsuscription()
    }

  }

  getDatastep(currentStep?: number): void {

    this.procesoSubscription = this.procesoDetallesService.getbyidrouterstep().subscribe({
      next: (res) => {
        this.currentStep = 1;
        console.log('datos de step', res)
        this.getIDforstep(this.currentStep)
      },
      error: (error) => {
        console.error('Error al obtener los datos del paso:', error);
      }
    });

  }

  gostep(event: { id: number, step: number }): void {

    this.procesoDetallesService.setbyidrouterstep(event.step);
    this.procesoDetallesService.setIsCharacterizationSelected(false)
    this.cancelsuscription()
  } Ñ

  //descargar archivo
  descargarDocumento(event: { id: number, name: string }) {
    if (this.VIA.validateConnection()) {
      this.downloadSubscription = this.servicesdownloadfile.descargarArchivo(event.id.toString()).subscribe((data: Blob) => {
        const nombreArchivo = event.name;
        saveAs(data, nombreArchivo);
        this.openAcceptModal('012. Descarga Exitosa.');
      }, error => {
        this.openAcceptModal('003.Error del sistema.');
      });
    }
  }


  openAcceptModal(paragraph: string): void {
    const dialogRef = this.dialog.open(ModalAcceptComponent, {
      width: '50%',
      data: { paragraph: paragraph }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

}

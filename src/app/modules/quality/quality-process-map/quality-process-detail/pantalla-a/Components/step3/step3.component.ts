import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { ProcessData } from '@app/services/quality-details/Interfaces/detailsConfig';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { FileDetail, tablenode } from '../../../interfaces/Processnode';
import { ProcesoDetallesService } from '../../../services/proceso-detalles.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit, OnDestroy, OnChanges {
  @Input() ID
  @Input() isCharacterizationSelected: boolean;
  //variables de iconos
  close_fullscreen: string = 'close_fullscreen'
  account_tree: string = 'account_tree'
  Info: string = 'info'
  download: string = 'file_download'
  edit: string = 'edit'

  //variables de flujo
  subprocesOrProcedure: boolean = false
  tablesub3: tablenode[] = []
  datoSubproces: any = null
  mostrarDescripcion: boolean = true
  process: ProcessData
  Procedure: any = null
  currentStep: number
  selectedId: number
  tablesub2 = [];
  filebyId: FileDetail = null
  datoProces: string
  datafile: any = null
  titleSubproces: string = ''
  titleProcess: string = ''
  titleDocument: string = ''
  Characterization: boolean = false
  diagramdata: any = null
  DiagramView: boolean = false

  //variables de supcriocion
  mostrarDescripcionSubscription: Subscription
  subprocessOrProcedureSubscription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessSubprocess()
  private subprocesoSubscription: Subscription
  // Variable para almacenar la suscripción a retrieveAndProcessDocument()
  private documentByIdSubscription: Subscription
  private downloadSubscription: Subscription
  private procesoSubscription: Subscription
  private documentIdSubscription: Subscription
  private fileIdSubscription: Subscription
  isDestroyed: boolean;


  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private servicesdownloadfile: QualityDetailsService,
    private dialog: MatDialog,

  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('STEP 3', this.isCharacterizationSelected);


  }
  ngOnInit(): void {

    this.isDestroyed = false
    if (this.isCharacterizationSelected) {

      this.getDataCharacterization();
    } else {
      this.getDatastep(this.currentStep);
      this.updateData();
    }
    /*     this.getDataCharacterization(); */
    /* this.viwerProcedureorFile(); // Suscripción para mostrar descripción en la inicialización */

  }

  ngOnDestroy(): void {
    this.isDestroyed = true
    this.cancelsuscription();
    this.subprocesoSubscription?.unsubscribe();
  }
  private cancelsuscription(): void {
    if (this.mostrarDescripcionSubscription) {
      this.mostrarDescripcionSubscription.unsubscribe()
    }
    if (this.documentByIdSubscription) {
      this.documentByIdSubscription.unsubscribe()
    }
    if (this.subprocesoSubscription) {
      this.subprocesoSubscription.unsubscribe()
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
  }

  private getDataCharacterization(): void {
    this.Procedure = []
    this.datoProces = null
    this.titleDocument = ''
    this.titleProcess = ''
    this.titleSubproces = ''
    this.filebyId = null
    this.datoSubproces = null
    this.Characterization = this.isCharacterizationSelected

    this.procesoDetallesService.getDatosProceso().subscribe({
      next: (value) => {
        this.datoProces = value.name;
        this.titleProcess = this.getConcatenatedCodeName(value)
        this.Procedure = value.characterizations;
        this.BuildfileData(this.Procedure);
        this.titleDocument = this.Procedure.code;
        this.validateDiagramExtension(this.Procedure.files)
        this.getdatafilenotvision(this.Procedure.files)

      },
      error: (error) => {
        console.log(error);
      }
    });

    this.procesoDetallesService.getSubprocess().subscribe({
      next: (value) => {
        if (value) {
          this.datoSubproces = { name: value[0].name, code: value[0].code };
          this.titleSubproces = this.datoSubproces.code
        }

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private updateData(): void {
    this.subprocesoSubscription = this.procesoDetallesService.retrieveAndProcessDocument().subscribe({
      next: (res) => {
        if (res.id === this.ID || res.id === this.selectedId) {
          this.Procedure = res
          this.titleDocument = res.code
          this.BuildfileData(res)
          const fileFirtsId = this.Procedure.files[0].id
          this.validateDiagramExtension(res.files)
          this.procesoDetallesService.setFileId(fileFirtsId)

        }

      }
    })

    this.procesoDetallesService.dateFile().subscribe({
      next: (res) => {
        if (res) {
          this.updateData();
        }
        else {
          this.filebyId = res
          this.procesoDetallesService.getDatosProceso().subscribe({
            next: (value) => {
              this.datoProces = value.name;
              this.titleProcess = this.getConcatenatedCodeName(value)

            },
            error: (error) => {

              console.log(error);

            }
          });
        }

      },
      error: (error) => {

        console.log(error);

      }
    });

    this.procesoDetallesService.getSubprocess().subscribe({
      next: (value) => {
        this.datoSubproces = { name: value[0].name, code: value[0].code };
        this.titleSubproces = this.datoSubproces.code
        // Después de obtener los datos necesarios, cancela la suscripción si está definida
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getdatafilenotvision(files: any): void {

    if (this.ID !== undefined && this.ID !== null) {
      this.filebyId = files.find(file => file.id === this.ID);
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




  private getConcatenatedCodeName(proceso: any): string {
    return `${proceso.code} - ${proceso.name}`;
  }

  private BuildfileData(res): void {

    this.tablesub3 = [];
    const table3 = res; // `Procedure` es un único objeto

    if (table3.files && Array.isArray(table3.files) && table3.files.length > 0) {
      // Si `documents` es un arreglo y no está vacío
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
  getreturnStep(step: number): void {

    if (step !== 1 && !this.isCharacterizationSelected) {
      this.procesoDetallesService.setIsCharacterizationSelected(false);
      this.procesoDetallesService.setbyidrouterstep(step);

    } else if (step === 1 && this.isCharacterizationSelected) {
      this.procesoDetallesService.setIsCharacterizationSelected(true);
      this.procesoDetallesService.setbyidrouterstep(step);
    } else {
      this.procesoDetallesService.setIsCharacterizationSelected(false);
      this.procesoDetallesService.setbyidrouterstep(step);
    }

  }

  getIDforstep(currentStep): void {

    if (this.currentStep === 2) {
      this.documentIdSubscription = this.procesoDetallesService.getDocumentById().subscribe({
        next: (id) => {
          this.selectedId = id;
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
      console.log('El modal se cerró');
    });
  }

}

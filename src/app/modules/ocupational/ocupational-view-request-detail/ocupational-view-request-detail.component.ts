import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";
import { ModalACComponent } from "@app/modules/components/modal-ac/modal-ac.component";
import { Subscription } from "rxjs";
import { RestService } from "src/app/services/rest.service";
import { Items } from "../ocupational-main/components/sub-menu-ocupational/items";
import { Data, DataItemInfo, DocumentFile } from "./model/view-reques-detail";
import { RequestDetailService } from "./services/request-detail/request-detail.service";

import { MatStepper } from "@angular/material/stepper";
import { ValidateInternetService } from "@app/services/validate-internet/validate-internet.service";
import { saveAs } from 'file-saver';
import { environment } from "src/environments/environment";

import { SgdaEditorV2Component } from "./components/sgda-editor/sgda-editor.component";
import { ToastService } from '@app/services/toast/toast.service';
import { Carta } from './Interfaces/view-request-detail';
import { ModalService } from '@app/services/modal/modal.service';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { Router, ActivatedRoute } from '@angular/router';


import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { NotifyModalComponent } from '@app/services/modal/components/pqrs/notify-modal/notify-modal.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';

import { TiposolicitudService } from '@app/services/ocupational/tiposolicitud.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';


@Component({
  selector: 'app-ocupational-view-request-detail',
  templateUrl: './ocupational-view-request-detail.component.html',
  styleUrls: ['./ocupational-view-request-detail.component.css']
})
export class OcupationalViewRequestDetailComponent implements OnInit, OnDestroy {

  @ViewChild(SgdaEditorV2Component) editorComponent: SgdaEditorV2Component;

  @ViewChild('stepper') stepper: MatStepper;
  private validateIt = inject(ValidateInternetService);
  private cdr = inject(ChangeDetectorRef);
  private urlBase = environment.apiUrl;
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  
  itemsMenu: Items[] = [
    {
      link: 'ocupational-view-request',
      text: 'Solicitudes'
    },
    {
      link: `ocupational-view-request/4`,
      text: 'Ver solicitud'
    }]

  

  location: Location;
  solicitudForm = new FormGroup({
    radicado: new FormControl('', [Validators.required]),
    Solicitante: new FormControl('', [Validators.required]),
    TipoDeSolicitud: new FormControl('', [Validators.required]),
    FechaDeSolicitud: new FormControl('', [Validators.required]),
    ProcesoDocumento: new FormControl('', [Validators.required]),
    EstadoSolicitud: new FormControl('', [Validators.required]),
    DocumentoModificar: new FormControl('', [Validators.required]),
    TipoDocumental: new FormControl('', [Validators.required]),
    Cargo: new FormControl('', [Validators.required]),
    Privacidad: new FormControl('', [Validators.required]),
    CentroDeCostos: new FormControl('', [Validators.required]),
    Gerencia: new FormControl('', [Validators.required]),
    DDO: new FormControl('', [Validators.required]),
    Justificacion: new FormControl('', [Validators.required]),
    seccionMultiple: new FormControl('', [Validators.required]),
    DocumentosPropuestos: new FormControl(null, [Validators.required]),
    Diagrama: new FormControl(null, [Validators.required])
  })


  dataInformation: DataItemInfo[] = [];
  diagrama: DocumentFile | null = null;
  document: any | null = null;

  TiposolicitudReceived: any[] = [];

  archivosSubidos: File[] = [];
  pqrsForm: FormGroup
  private headerAuthServices = inject(AuthHeaderService);
  private ruoteService = environment.apiUrl + 'api/hco/solicitud/store/';



  editModel: any[] = [];
  dataView: Data = {
    dependence_all: null,
    applicant: null,
    date: '',
    hour: '',
    diagram: null,
    document_file: null,
    documentary_type: '',
    documents_addtional: [],
    list_analysts_all_sap: [],
    filed: '',
    id: 0,
    is_propuesto: 0,
    justification: '',
    level: '',
    multiple_choice: 0,
    privacy: '',
    process: '',
    request_type: '',
    state: '',
    sub_process: '',
    analysis_plan: null,
    extend: '',
    hco_tipo_tarea_id: 0,
    tipoSolicitud: '',
    aclaracion: '',
    user: '',
    datasap: [],

  };

  pdfMake: any;

  public idParam
  public idRequest
  public tipoTareaId
  public plantillav2
  public idUsuario

  editorActivo: boolean = true;
  editorContent: string = '';

  fileSizeError: boolean = false;
  selectedFile: File | null = null;
  
// Iconos del formulario
@Input() initCardHeaderIcon = 'person';
  pathDoc: string = '';
  dataSub!: Subscription;
  stateAnalysisPlan: string | null = '';
  requestType: string = '';
  exit = '/ocupational/ocupational-request-index';
  constructor(
    private router: ActivatedRoute,
    public route: ActivatedRoute,
    private routers: Router,
    location: Location,
    public restService: RestService,
    public dialog: MatDialog,
    private viewServices: RequestDetailService,
    private routerRedirect: Router,
    private toastSvc: ToastService,
    private http: HttpClient,
    public sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private tiposolicitudServices: TiposolicitudService,
    private paginationService: PaginationServiceService,



  ) {
    this.validateIt.connect();
    this.location = location;

    this.itemsMenu = [{
      link: 'ocupational-view-request',
      text: 'Solicitudes'
    },
    {
      link: `ocupational-view-request/4`,
      text: 'Ver solicitud'
    }]

    
    
  }


  getTiposolicitudReceived() {
    this.tiposolicitudServices.getTiposolicitudReceived().subscribe({
      next: (res: any) => {
        
        this.paginationService.setTotalItems(res.data)
        this.TiposolicitudReceived = res.data

          //console.log(res.data)


      },
      error: (error) => {
        console.log('error getTiposolicitudReceived: ', error);
      }
    });
  }

  //Decorador OUTPUT
  refreshTiposolicitudReceived() {
    this.getTiposolicitudReceived();
    
  }


  ngOnInit() {


    this.getTiposolicitudReceived();

    /*
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.TiposolicitudReceived = res
      }
    })

    this.refreshTiposolicitudReceived();
    */


    this.pqrsForm = this.fb.group({
      anexos: new FormControl(null),
      tipoSolicitud: new FormControl(null),
      aclaracion: new FormControl(null),

    });
  
  

    this.validateIt.checkConnection();
    if (this.validateIt.validateConnection()) {
      this.router.paramMap.subscribe(params => {

        const userid = params.get('userid');
        const id = params.get('id');
        const idTypeTask = params.get('idTypeTask');

        if (id && !isNaN(parseInt(id))) {

          this.idParam = parseInt(id);
          this.dataSub = this.viewServices.getData(id, idTypeTask).subscribe(item => {
  
            console.log(item.data);
            this.idRequest = item.data.id;
            this.tipoTareaId = item.data.hco_tipo_tarea_id;
            this.plantillav2 = item.data.plantilla;
            if (this.tipoTareaId == 6) {
              //this.editorContent = '<html><head title="cosa"><body><h1>Hola Mundo</h1></body></head></html>';
              //this.changeDocument('<html><head title="cosa"><body><h1>Hola Mundo</h1></body></head></html>');
   
            }
  
  
            //console.log(item.data.hco_tipo_tarea_id);
            this.dataView = item.data;
  
            this.requestType = item.data.request_type;


            this.dataInformation = [
              { label: 'Radicado', value: item.data.filed },
              { label: 'Fecha de creacion', value: item.data.date },
              { label: 'Tipo de solicitud', value: item.data.tipoSolicitud },
              { label: 'Hora de creacion', value: item.data.hour },
              { label: 'Fecha Inicio Deseado', value: item.data.datasap['fechaInicioDeseada'] },
              { label: 'Fecha Fin Deseado', value: item.data.datasap['fechaFinDeseada'] },
              { label: 'Circunstancias', value: 'Arreglo E_CIRCUNSTANCIAS' },
              { label: 'Funcionarios', value: 'No viene en el Response Sap' },
              { label: 'Descripcion', value: item.data.datasap['descripcionBreveGrupoCodigos'] },
              { label: 'Numero de Aviso', value: item.data.datasap['numeroAviso'] },
              { label: 'Clase de Aviso', value: item.data.datasap['claseAviso'] },
              { label: 'Autor Aviso', value: item.data.user },
              { label: 'Numero de Orden', value: item.data.datasap['numeroOrden'] },
              { label: 'Status usuario', value: 'No viene en el Response Sap' },
              { label: 'Fecha de Status', value: 'No viene en el Response Sap' },
              { label: 'Hora de Status', value: 'No viene en el Response Sap' },
              { label: 'Numero de Celular', value: 'No viene en el Response Sap' },
              { label: 'Correo Electronico', value: 'No viene en el Response Sap' },
              { label: 'Fecha de Nacimiento', value: 'No viene en el Response Sap' },
              { label: 'Grupo planificador', value: item.data.datasap['grupoPlanificadorServicioClienteMantenimiento'] },
              { label: 'Centro planificador', value: item.data.datasap['centroPlanificacionMantenimiento'] },
              { label: 'Puesto Trabajo Responsable', value: item.data.datasap['puestoTrabajoResponsableMedidasMantenimiento'] },
              { label: 'Centro Puesto Trabajo Responsable', value: 'No viene en el Response Sap' },
            ]



            this.cdr.detectChanges();
            this.getParamsState();
          })
  
        } else {
          const userid = params.get('idUsuario');
          const requestid = params.get('idRequest');
          if (userid && !isNaN(parseInt(userid))) {
            this.idUsuario = userid;
            this.idRequest = requestid;

            this.tipoTareaId = 0;
            this.exit = '/ocupational/ocupational-view-notification/'+this.idRequest+'/7';
            //this.exit = '/ocupational/ocupational-notification-index';
            
              // Manejo del caso cuando el id no es válido o no está presente
              console.error("Ingreso por userid.");
          } else {
              // Manejo del caso cuando el id no es válido o no está presente
              console.error("El parámetro 'id' no es válido o no está presente.");

          }

        }
      })
    }

  }


  getParamsState(): void {
    this.router.queryParams.subscribe(params => {
      this.stateAnalysisPlan = params['state'] ?? null;
      if (this.stateAnalysisPlan) {
        this.itemsMenu[0] = {
          link: 'ocupational-notification-index',
          text: 'Notificaciones'
        }
        this.exit = '/ocupational/ocupational-request-index'
        this.stepper.selectedIndex = 4;

      }
    })
  }




  public isMap() {
    if (this.location.prepareExternalUrl(this.location.path()) === "/maps/fullscreen") {
      return true;
    } else {
      return false;
    }
  }


  downloadPdf(): void {
    this.viewServices.exportFile(this.idParam).subscribe({
      next: (res: Blob) => {


        const nombreArchivo = this.dataView.filed;
        saveAs(res, nombreArchivo);
      },
      error: (error) => {
        alert('La solicitud no se puede exportar!')
        console.error('El error es: ', error)
      }
    })
  }



  openModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const modalRef = this.dialog.open(ModalACComponent, {
      width: '515px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        img: 'assets/img/questionIcon.svg',
        paragraph: '004. ¿Estas seguro de la acción a realizar?'
      }
    });

    modalRef.afterClosed().subscribe(result => {

      alert('Generar un nueva solicitud')
    })
  }

  saveChanges() {
    if (this.solicitudForm.valid) {
      this.openModal('100ms', '100ms')
    } 




  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe()
  }

  changeDocument(content: string) {
    this.editorContent = content;
    console.log(this.editorContent); // Muestra el contenido del editor en la consola
  }

  insertarPlantilla(content: string){
    this.validateIt.checkConnection();
    if (this.validateIt.validateConnection()) {
      this.router.paramMap.subscribe(params => {
        const id = params.get('id');
        const idTypeTask = params.get('idTypeTask');

        this.dataSub = this.viewServices.getData(id, idTypeTask).subscribe(item => {
          if (this.tipoTareaId == 6) {
            this.plantillav2 = item.data.plantilla;
            this.editorContent = this.plantillav2
            this.changeDocument(this.plantillav2);
          }

        })
      })
    }

  }



  guardarPlantilla(): void {
    
    if (this.editorComponent) {
      const plantillas = this.editorComponent.getEditorContent();
      // Asegúrate de que `editorComponent` esté inicializado
      console.log(plantillas)

      if (this.validateIt.validateConnection()) {
        if (plantillas != '') {
          const dialogRef = this.modal.open(ActionModalComponent, {
            title: '004',
            description: `¿Está seguro de la acción a realizar?`,
            onConfirmAction: () => {
              const valueForm: Carta = {
                request_id: this.idRequest,
                plantilla: plantillas
                
              };
              this.viewServices.postregisterCarta(valueForm).subscribe({
                next: (response) => {
                  this.toast.open({
                    title: '001',
                    description: 'Registro exitoso.'
                  });
                  this.routerRedirect.navigate(['/ocupational/ocupational-notification-index']);
  
                  console.log('respuesta de la API:', response);
                },
                error: (err) => {
                  this.toast.open({
                    title: 'Error',
                    description: `Petición fallida ${err.error.message}.`
                  });
                },
              });
            }
          });
  
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
              dialogRef.componentInstance.data.onConfirmAction();
            }
          });
        } else {
          this.toast.open({
            title: '¡007!',
            description: 'Por favor verifique, datos obligatorios incompletos.'
          });
        }
      }
  
  
    }

  }




onFileSelectedOld2(event: any) {

  const file: File = event.target.files[0];
  
  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convertir el tamaño a MB
    this.fileSizeError = fileSizeInMB > 5; // True si supera los 5MB
  }


  const archivos = event.target.files;
  
  // Agregar archivos seleccionados a la lista de archivosSubidos
  for (let i = 0; i < archivos.length; i++) {
    this.archivosSubidos.push(archivos[i]);
  }

  // Actualizar el formulario con los archivos seleccionados
  this.pqrsForm.get('anexos').setValue(this.archivosSubidos);
}




checkAndTriggerFileInput(fileInput: HTMLInputElement) {
  fileInput.click();  // Dispara el input de archivos
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  
  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convertir el tamaño a MB
    if (fileSizeInMB > 5) {
      this.fileSizeError = true; // Archivo demasiado grande
      this.selectedFile = null; // No permitir agregar el archivo
      event.target.value = "";  // Resetear el input de archivo
    } else {
      this.fileSizeError = false; // Archivo válido
      this.selectedFile = file;   // Guardar el archivo seleccionado
    }
  }


  const archivos = event.target.files;
  
  // Agregar archivos seleccionados a la lista de archivosSubidos
  for (let i = 0; i < archivos.length; i++) {
    this.archivosSubidos.push(archivos[i]);
  }

  // Actualizar el formulario con los archivos seleccionados
  this.pqrsForm.get('anexos').setValue(this.archivosSubidos);

}








  onFileSelectedOld(event: any): void {
    const selectedFiles = event.target.files;
    let archivosInvalidos = false;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const extension = file.name.split('.').pop().toLowerCase();

      if (['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'].includes(extension)) {
        this.archivosSubidos.push(file);
      } else {
        archivosInvalidos = true;
      }
    }

    if (archivosInvalidos) {
      this.toastSvc.open({
        title: 'Error',
        description: 'Solo se aceptan archivos .png, .jpg, .jpeg, .pdf, .doc, .docx. Por favor, valida los archivos seleccionados.',
        success: false
      });
    }

    this.pqrsForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  }


  submitFormReceive(): void {
    // Verificaciones previas, como la de anexos y la aceptación de la política.
    this.pqrsForm.markAllAsTouched()
    const anexos = this.pqrsForm.get('anexos').value;
    const tipoSolicitud = this.pqrsForm.get('tipoSolicitud').value;
    
    if (!anexos || anexos.length === 0) {
      this.toastSvc.open({
        title: 'Error',
        description: 'No se encuentran archivos adjuntos, por favor validar.',
        success: false
      });
      return; 
    }

    if (!tipoSolicitud) {
      this.toastSvc.open({
        title: 'Error',
        description: 'No se ha seleccionado el tipo de solicitud, por favor validar.',
        success: false
      });
      return; 
    }
  


    if (anexos || anexos.length !== 0) {
      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '004',
        description: `¿Está seguro de crear la Solicitud?`,
        onConfirmAction: () => {
              // Crear un objeto FormData
              const formData = new FormData();

              // Agregar cada archivo seleccionado al FormData
              anexos.forEach((archivo: File, index: number) => {
                formData.append(`anexos[${index}]`, archivo, archivo.name);
              });

              // Si tienes otros datos del formulario que quieres enviar junto con los archivos:
              formData.append('request_id', this.idRequest);
              formData.append('tipoSolicitud', this.pqrsForm.get('tipoSolicitud')?.value!);
              formData.append('aclaracion', this.pqrsForm.get('aclaracion')?.value!);

              const ruta = this.ruoteService
              this.http.post(ruta, formData, this.headerAuthServices.getHttpHeadersOptions()).subscribe(event => {
                console.log({"evento": event});
          
                if(event) {
                  this.modal.open(NotifyModalComponent, {
                    title: 'Registro exitoso'
                  });
              
                  // Resetear el formulario.
                  this.pqrsForm.reset();
                  this.routers.navigate(["/ocupational/ocupational-request-index"]);
                }        
              }, error => {
                  this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.error);
              });
          


        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
          dialogRef.componentInstance.data.onConfirmAction();
        }
      });
    } else {
      this.toastSvc.open({
        title: '¡007!',
        description: 'Por favor verifique, datos obligatorios incompletos.'
      });
    }
  }

  eliminarArchivo(index: number): void {
    this.archivosSubidos.splice(index, 1);
    // Actualizar el valor del formulario después de eliminar el archivo.
    this.pqrsForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  }



  
}

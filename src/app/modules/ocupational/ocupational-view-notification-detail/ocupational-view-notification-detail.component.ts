import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, inject, Input, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ModalACComponent } from "@app/modules/components/modal-ac/modal-ac.component";
import { Subscription } from "rxjs";
import { RestService } from "src/app/services/rest.service";
import { Items } from "../ocupational-main/components/sub-menu-ocupational/items";
import { Data, DataItemInfo, DocumentFile } from "./model/view-notification-detail";
import { NotificationDetailService } from "./services/notification-detail/notification-detail.service";

import { MatStepper } from "@angular/material/stepper";
import { ValidateInternetService } from "@app/services/validate-internet/validate-internet.service";
import { saveAs } from 'file-saver';
import { environment } from "src/environments/environment";

import { SgdaEditorV2Component } from "./components/sgda-editor/sgda-editor.component";
import { ToastService } from '@app/services/toast/toast.service';
import { Carta, ListFile } from './Interfaces/view-notification-detail';
import { ModalService } from '@app/services/modal/modal.service';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { Router } from '@angular/router';

import { NotifyModalComponent } from '@app/services/modal/components/pqrs/notify-modal/notify-modal.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-ocupational-view-notification-detail',
  templateUrl: './ocupational-view-notification-detail.component.html',
  styleUrls: ['./ocupational-view-notification-detail.component.css']
})
export class OcupationalViewNotificationDetailComponent implements OnInit, OnDestroy {

  @ViewChild(SgdaEditorV2Component) editorComponent: SgdaEditorV2Component;

  @ViewChild('stepper') stepper: MatStepper;
  private validateIt = inject(ValidateInternetService);
  private cdr = inject(ChangeDetectorRef);
  private urlBase = environment.apiUrl;
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  private datosShow: any;
  private archivosGuardados: any;
  

  itemsMenu: Items[] = [
    {
      link: 'ocupational-view-request',
      text: 'Solicitudes'
    }
    /*,
    {
      link: `ocupational-view-request/4`,
      text: 'Ver solicitud'
    }
    */  
    ]



  location: Location;
  solicitudForm = new FormGroup({
    radicado: new FormControl('', [Validators.required]),
    FechaDeSolicitud: new FormControl('', [Validators.required]),
    TipoDeSolicitud: new FormControl('', [Validators.required]),
    Aclaracion: new FormControl('', [Validators.required])
    
    //Solicitante: new FormControl('', [Validators.required]),
    //EstadoSolicitud: new FormControl('', [Validators.required]),
  })


  dataInformation: DataItemInfo[] = [];
  diagrama: DocumentFile | null = null;
  document: any | null = null;

  archivosSubidos: File[] = [];
  aclarationForm: FormGroup
  private headerAuthServices = inject(AuthHeaderService);
  private ruoteService = environment.apiUrl + 'api/hco/solicitud/correccion/store/';


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
    tipoVerificacion_id: 0,
    respuesta_interna: '',

  };

  pdfMake: any;

  public idParam
  public idRequest
  public tipoTareaId
  public plantillav2
  public idUsuario
  public tipoVerificacion_id
  public respuesta_interna

  editorActivo: boolean = true;
  editorContent: string = '';
// Iconos del formulario
@Input() initCardHeaderIcon = 'person';
  pathDoc: string = '';
  dataSub!: Subscription;
  stateAnalysisPlan: string | null = '';
  requestType: string = '';
  exit = '/ocupational/ocupational-notification-index';
  constructor(
    private router: ActivatedRoute,
    location: Location,
    public restService: RestService,
    public dialog: MatDialog,
    private viewServices: NotificationDetailService,
    private routerRedirect: Router,
    public sweetAlertService: SweetAlertService,
    private routers: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastSvc: ToastService,



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


  

  ngOnInit() {

    this.aclarationForm = this.fb.group({
      anexos: new FormControl(null),
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

            //console.log(item.data.datasap)

            this.idRequest = item.data.id;
            this.tipoTareaId = item.data.hco_tipo_tarea_id;
            this.plantillav2 = item.data.plantilla;

            this.tipoVerificacion_id = item.data.tipoVerificacion_id
            this.respuesta_interna = item.data.respuesta_interna

            this.obtenerDatosDeLaAPI();

            if (this.tipoTareaId == 9) {
              this.viewServices.getClosedAnswer(id).subscribe({
              });
            }


  
  
            this.dataView = item.data;
  
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
              { label: 'Aclaracion', value: item.data.aclaracion },
              { label: 'Estado Solicitud', value: item.data.state },
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
            //this.exit = '/ocupational/ocupational-notification-index';

            //this.exit = '/ocupational/ocupational-view-request/'+this.idRequest;

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

        console.log("TIPO TAREA")
        console.log(this.tipoTareaId )
        if (this.tipoTareaId == 11) {
          this.exit = '/ocupational/ocupational-notification-closed-index'
        } else {
          this.exit = '/ocupational/ocupational-notification-index'
        }
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


  submitFormReceive(): void {
    // Verificaciones previas, como la de anexos y la aceptación de la política.
    this.aclarationForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
    const anexos = this.aclarationForm.get('anexos').value;
    
    if (!anexos || anexos.length === 0) {
      this.toastSvc.open({
        title: 'Error',
        description: 'No se encuentran archivos adjuntos, por favor validar.',
        success: false
      });
      return; 
    }


    if (anexos || anexos.length !== 0) {
      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '004',
        description: `¿Está seguro de corregir la Solicitud?`,
        onConfirmAction: () => {
              // Crear un objeto FormData
              const formData = new FormData();

              // Agregar cada archivo seleccionado al FormData
              anexos.forEach((archivo: File, index: number) => {
                formData.append(`anexos[${index}]`, archivo, archivo.name);
              });

              // Si tienes otros datos del formulario que quieres enviar junto con los archivos:
              formData.append('request_id', this.idRequest);
              formData.append('aclaracion', this.aclarationForm.get('aclaracion')?.value!);

              const ruta = this.ruoteService
              this.http.post(ruta, formData, this.headerAuthServices.getHttpHeadersOptions()).subscribe(event => {
                console.log({"evento": event});
          
                if(event) {
                  this.modal.open(NotifyModalComponent, {
                    title: 'Registro exitoso'
                  });
              
                  // Resetear el formulario.
                  this.aclarationForm.reset();
                  this.routers.navigate(["/ocupational/ocupational-notification-index"]);
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

  onFileSelected(event: any) {
    
    const archivos = event.target.files;

    const archivoSubidoExiste = (archivo: File): boolean => {
      return this.archivosSubidos.some(existingFile => 
        existingFile.name === archivo.name && existingFile.size === archivo.size
      );
    };

    /*
    const archivoGuardadoExiste = (archivo: File): boolean => {
      return this.archivosGuardados.some(existingFile => 
        existingFile.name === archivo.name
      );
    };
    */


    
    
    for (let i = 0; i < archivos.length; i++) {
      if (archivoSubidoExiste(archivos[i])) {
        this.toastSvc.open({
          title: '¡007!',
          description: `El archivo  ya está en la lista.`
        });
      } else {
        this.archivosSubidos.push(archivos[i]);
      }
    }
    
    this.aclarationForm.get('anexos').setValue(this.archivosSubidos);


  }

  
  eliminarArchivo(index: number): void {
    this.archivosSubidos.splice(index, 1);
    // Actualizar el valor del formulario después de eliminar el archivo.
    this.aclarationForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  }



  ngOnChanges(changes: SimpleChanges) {
    /*
    if (changes['idRequest']) {
      console.log('Nuevo valor para idRequest:', this.idRequest);
      this.obtenerDatosDeLaAPI();
    }
    */
  }


  obtenerDatosDeLaAPI() {
    const valueForm: ListFile = {
      request_id: this.idRequest,
      id: null,

    };

    this.viewServices.obtenerDatos(valueForm).subscribe(response => {
    this.archivosGuardados = response.data;
    }, error => {
      console.error('Error al obtener datos de la API:', error);
    });
  }
 
  eliminarArchivoGuardado(index: number): void {
    const valueForm: ListFile = {
      request_id: this.idRequest,
      id: index,

    };

    const dialogRef = this.modal.open(ActionModalComponent, {
      title: '004',
      description: `¿Está seguro de remover el Documento. ?`,
      onConfirmAction: () => {



        this.viewServices.removerFile(valueForm).subscribe(response => {

          this.archivosGuardados.splice(index, 1);
          this.aclarationForm.get('anexos').setValue(this.archivosGuardados.length > 0 ? this.archivosGuardados.length : null);
      
          this.obtenerDatosDeLaAPI();

          this.toastSvc.open({
            title: '¡007!',
            description: 'Documento removido con exito.'
          });

        this.archivosGuardados = response.data;
        }, error => {
          this.toastSvc.open({
            title: '¡007!',
            description: 'Se presento un error removiendo el documento.'
          });

        });

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
        dialogRef.componentInstance.data.onConfirmAction();
      }
    });

  }
  

}

/**
 * @description Bibliotecas y dependencias
 */
import { Component, Input, OnInit, SimpleChanges, Inject, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

/**
 * @description Servicios generales
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { JuridicalService } from 'src/app/services/juridical/juridical.service';

import { DetailElement } from '../../../services/juridical/models/detail-element'

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";

// Navbar
import { Items } from '../juridica-main/components/sub-menu-juridica/items';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProfessionalAssignmentsComponent } from './components/professional-assignments/professional-assignments.component';
import { forkJoin, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { environment } from 'src/environments/environment';
import { SweetAlertService } from '@app/services/sweet-alert.service';

@Component({
  selector: 'app-juridica-detail-request',
  templateUrl: './juridica-detail-request.component.html',
  styleUrls: ['./juridica-detail-request.component.css']
})
export class JuridicaDetailRequestComponent implements OnInit {

  @Output() reclamar = new EventEmitter<{ value: boolean }>();
  observationOrResponseValue: string = '';
  justificacionOrResponseValue: string = '';
  observationValid: boolean = false;
  justificacionValid: boolean = false;

  public attachments: { nameFile: string, nomArchivo: string, dataArchivo: string }[];

  //Item para el navbar
  items: Items[] = [{ link: 'view-request', text: 'Notificaciones' }, { link: 'detail-request', text: 'Detalle solicitud' }]

  //Variables logicas
  public numeroRadiRadicado: number;
  public estado: string;
  private idRouter: number;
  public viewConcepts: boolean = false;
  public observacionExist: string;
  public aclaracionExist: string;
  public attachmentsExist: string;
  test: string = 'juridica%recibir%aprobar%devolver'
  public mostrarBotonAsignar: boolean = true;
  //Output
  public observacion: string;
  //Input
  public dataDetailPadre: any;

  public rolCurrent: string; //test
  options: any;
  public hashLocalStorage: any;

  constructor(
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public juridicalService: JuridicalService,
    private authService: AuthService,
    public sweetAlertService: SweetAlertService) {

    //this.rolCurrent = 'Solicitante conceptos'
    this.rolCurrent = 'Secretaria concepto'

    this.hashLocalStorage = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
  }

  ngOnInit(): void {
    this.detectIdRouter();
  }

  ngAfterViewInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log('changes', changes)
  }

  detectIdRouter() {
    this.idRouter = parseInt(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.idRouter)) {
      this.getDetailByIdNotification(this.idRouter);
    }
  }

  getDetailByIdNotification(idNotification: number) {
    forkJoin({
      detail: this.juridicalService.getDetailByIdNotification(idNotification),
      options: this.juridicalService.getProfessionalAssignments().pipe(
        tap(data => data),
        map(data => data)
      )
    }).subscribe({
      next: ({ detail, options }) => {
        //console.log('Detail', detail)
        //console.log('Options', options)
        // Manejo de la respuesta de getDetailByIdNotification
        this.dataDetailPadre = detail.data.tarea;
        this.numeroRadiRadicado = this.dataDetailPadre?.solicitud?.radicado;
        this.estado = this.dataDetailPadre.estado?.estado;
        this.observacionExist = this.dataDetailPadre.observacion;
        this.aclaracionExist = this.dataDetailPadre.aclaraciones;
        this.attachmentsExist = this.dataDetailPadre.anexos;
        this.juridicalService.actualizarObjetoPadre(this.dataDetailPadre);
        // Manejo de la respuesta de options, le agregamos a todos un checkbox
        this.options = options.data.asignaciones.map((option) => { return { ...option, checked: false }; });
        if (this.hashLocalStorage.data.Rol.idRol == 34) {
          this.juridicalService.actualizarEnviarHijoAlPadre({ observacion: false, justificacion: false, key_tipo_tarea: this.dataDetailPadre?.key_tipo_tarea });
        }
        //console.log('this.hashLocalStorage.data.Rol.idRol', this.hashLocalStorage.data.Rol.idRol)
    
        if (this.hashLocalStorage.data.Rol.idRol == 19 || this.hashLocalStorage.data.Rol.idRol == 28) {
          this.juridicalService.actualizarEnviarHijoAlPadre({ observacion: true, key_tipo_tarea: this.dataDetailPadre?.key_tipo_tarea });
        }
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }

  /**
   * @description Obtener los cambios del formulario correspondiente
   * @param event 
   */
  onObservacionFormChange(event: { value: string, valid: boolean }) {
    this.observationOrResponseValue = event.value;
    this.observationValid = event.valid;
  }

  onJustificacionFormChange(event: { value: string, valid: boolean }) {
    this.justificacionOrResponseValue = event.value;
    this.justificacionValid = event.valid;
  }

  /**
   * @description obtener los cambios de los anexos correspondiente
   * @param event 
   */
  onObservacionAttachmentModify(event: { nameFile: string, nomArchivo: string, dataArchivo: string }[]) {
    this.attachments = event;
  }


  /**
   * @description Verificar validaciones para poder aprobar o devolver
   */
  canApproveOrReject(): boolean {
    return this.observationValid;
  }

  /**
   * @description Devolver el detalle actual this.numeroRadiRadicado
   */
  clickReturnDetail() {
    if (this.canApproveOrReject()) {
      const modalRef = this.modal.open(ActionModalComponent, {
        title: '¿Está seguro de devolver esta solicitud?',
        description: `Al aceptar se realizará la devolución de la solicitud #${this.numeroRadiRadicado} no se podrá deshacer esta acción`
      });

      modalRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.updateDetail(41, 'La solicitud ha sido devuelta de forma exitosa.', this.observationOrResponseValue, this.aclaracionExist);
        }
      });
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }

  /**
   * @description Aprobar el detalle actual this.numeroRadiRadicado
   */
  clickApprovedDetail() {
    if (this.canApproveOrReject()) {
      const modalRef = this.modal.open(ActionModalComponent, {
        title: '¿Está seguro de aprobar esta solicitud?',
        description: `Al aceptar se realizará la aprobación de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`
      });

      modalRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.updateDetail(39, 'La solicitud ha sido aprobada de forma exitosa.', this.observationOrResponseValue, this.aclaracionExist);
        }
      });
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }

  /**
   * @description Devolver el detalle actual this.numeroRadiRadicado
   */
  clickSubsanarDetail() {
    if (this.canApproveOrReject()) {
      const modalRef = this.modal.open(ActionModalComponent, {
        title: '¿Está seguro de subsanar esta solicitud?',
        description: `Al aceptar se realizará la subsanación de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`
      });

      modalRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.updateDetail(63, 'La solicitud ha sido subsanada y enviada a secretaria de forma exitosa.', this.observacionExist, this.observationOrResponseValue);
          //Carga de documentos
          this.uploadedAttachments();
        }
      });
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }

  uploadedAttachments() {
    let jsonUpdateAttachments = {
      "idRadicado": this.idRouter,
      "archivos": (!this.attachments) ? this.attachmentsExist : this.attachments
    }
    //console.log('Objeto para cargar', jsonUpdateAttachments)
    //Falta agregar el metodo updateDocuments
  }

  /**
   * @description Actualizar el detalle segun sea el caso
   */
  updateDetail(estado: number, successMessage: string, observation?: string, aclaration?: string) {
    let detail = {
      "id_radicado": this.idRouter,
      "estado": estado,
      "observacion": observation,
      "aclaracion": aclaration
    };

    this.juridicalService.updateDetailById(detail).subscribe({
      next: () => {
        this.getDetailByIdNotification(this.idRouter);
        this.toast.open({
          title: estado === 39 ? 'Aprobación exitosa' : 'Devolución exitosa',
          description: successMessage
        });
        this.viewRequestRouting();
      }, error: (err) => {
        console.log('err', err)

      }
    });
  }

  /**
   * @description Abrir el componente ver conceptos
   */
  searchConceptOnClick() {
    this.viewConcepts = !this.viewConcepts;
  }

  /**
   * @description Redireccionar al modulo ver notificaciones
   */
  viewRequestRouting() {
    this.router.navigate(['/juridica/view-request']);
  }

  clickDesignarDetail() {
    // Validamos que la observación no esté vacía
    if (!this.observationOrResponseValue) {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    } else {
      if (this.observationValid && this.observationOrResponseValue !== '') {
        const dialog = this.dialog.open(ProfessionalAssignmentsComponent, {
          width: '800px',
          height: '600px',
          data: {
            title: 'Asignar profesional',
            description: 'Seleccione el profesional que desea asignar a esta solicitud',
            options: this.options,
            id_solicitud: this.dataDetailPadre?.id
          },
          disableClose: true,
        });

        dialog.afterClosed().subscribe((result) => {
          if (result !== '' && result !== undefined && result !== null) {
            this.mostrarBotonAsignar = false;
            if(typeof result === 'number'){
              this.getDetailByIdNotification(result);
            }else{
              this.sweetAlertService.showNotification("success", result, 2000);
              setTimeout(() => {
                this.router.navigate(['/juridica/view-request']);
              }, 1000);
            }
          }
        });
      }
    }
  }

  clickReclamarDetail() {
    const Swal = require('sweetalert2');
    Swal.fire({
      title: '¿Está seguro de reclamar esta solicitud?',
      text: `Al aceptar se realizará la reclamación de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reclamar'
    }).then((result) => {
      if (result.value) {
        this.sweetAlertService.sweetLoading();
        this.juridicalService.putApproveSolicitude(this.dataDetailPadre?.id).subscribe({ next: (message) => {
          this.sweetAlertService.sweetClose();
          this.sweetAlertService.showNotification("success", message.message, 2000);
          setTimeout(() => {
            this.router.navigate(['/juridica/view-request']);
            this.sweetAlertService.sweetClose();
          }, 1000);
        }});
      }
    });
  }

  oneObservacion: boolean = false;
  visualizarObservacion: boolean = false;
  devolverSolicitud() {
    if(!this.oneObservacion){
      this.juridicalService.actualizarEnviarHijoAlPadre({ observacion: true, key_tipo_tarea: this.dataDetailPadre?.key_tipo_tarea });
      this.oneObservacion = true;
    }else{
      if (this.observationOrResponseValue !== '') {
        const Swal = require('sweetalert2');
        Swal.fire({
          title: '¿Está seguro de devolver esta solicitud?',
          text: `Al aceptar se realizará la devolución de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Devolver'
        }).then((result) => {
          if (result.value) {
            this.sweetAlertService.sweetLoading();
            this.juridicalService.putRejectSolicitude(this.dataDetailPadre?.id, this.observationOrResponseValue).subscribe({ next: (message) => {
              this.sweetAlertService.sweetClose();
              this.sweetAlertService.showNotification("success", message.message, 2000);
              this.juridicalService.actualizarEnviarHijoAlPadre({ observacion: false });
              setTimeout(() => {
                this.router.navigate(['/juridica/view-request']);
              }, 1000);
            } });
            // this.juridicalService.actualizarEnviarHijoAlPadre(true);
            // this.updateDetail(41, 'La solicitud ha sido devuelta de forma exitosa.', this.observationOrResponseValue, this.aclaracionExist);
          }
        }
        );
      } else {
        this.toast.open({
          description: 'Por agregue una observación para devolver la solicitud'
        });
      }
    }
  }

  private editorContent: string = '';
  changeDocument(content: any) {
    this.editorContent = content;
    console.log('Contenido del editor', this.editorContent)
  }

  mostrarEditor: boolean = false;
  onFormTemplateSecurityChange(event: any) {
    this.mostrarEditor = !this.mostrarEditor;
    console.log('Formulario de seguridad', event)
  }

  onUploadFiles(event: any) {
    console.log('Event attachment', event)
  }

  private oneJustificacion: boolean = false;
  solicitarProrroga() {
    if (this.dataDetailPadre?.key_tipo_tarea === 'SOLICITAR_PRORROGA'){
      if (!this.oneJustificacion) {
        this.juridicalService.actualizarEnviarHijoAlPadre({ justificacion: true });
        this.oneJustificacion = true;
      } else {
        if (this.justificacionOrResponseValue !== '') {
          const Swal = require('sweetalert2');
          Swal.fire({
            title: '¿Está seguro de solicitar esta prorroga?',
            text: `Al aceptar se realizará la prorroga de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.value) {
              this.sweetAlertService.sweetLoading();
              this.juridicalService.postSolicitarProrroga(this.dataDetailPadre?.id, this.justificacionOrResponseValue).subscribe({ next: (message) => {
                this.sweetAlertService.sweetClose();
                this.sweetAlertService.showNotification("success", message.message, 2000);
                this.juridicalService.actualizarEnviarHijoAlPadre({ justificacion: false });
                setTimeout(() => {
                  this.router.navigate(['/juridica/view-request']);
                }, 1000);
              } });
            }
          }
          );
        } else {
          this.toast.open({
            description: 'Por favor agregue una justificación para solicitar la prorroga'
          });
        }
      }
    }else{
      this.toast.open({
        description: 'La solicitud no es apta para solicitar prorroga'
      });
    }
  }

  approvedProrroga() {
    if (this.dataDetailPadre?.key_tipo_tarea === 'VERIFICAR_RANGO_COMPLEJIDAD_JEFE') {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: '¿Está seguro de aprobar esta prórroga?',
        text: `Al aceptar se realizará la aprobación de la prorroga de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();
          this.juridicalService.postAprobarProrroga(this.dataDetailPadre?.id, this.observationOrResponseValue, this.rangeValue).subscribe({ next: (message) => {
            this.sweetAlertService.sweetClose();
            this.sweetAlertService.showNotification("success", message.message, 2000);
            setTimeout(() => {
              this.router.navigate(['/juridica/view-request']);
            }, 1000);
          } });
        }
      }
      );
    }

    if (this.dataDetailPadre?.key_tipo_tarea === 'VERIFICAR_RANGO_COMPLEJIDAD' && this.rangeValue != 0) {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: '¿Está seguro de aprobar esta prórroga?',
        text: `Al aceptar se realizará la aprobación de la prorroga de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();
          this.juridicalService.postApproveReviewExtension(this.dataDetailPadre?.id, this.observationOrResponseValue, this.rangeValue).subscribe({ next: (message) => {
            this.sweetAlertService.sweetClose();
            this.sweetAlertService.showNotification("success", message.message, 2000);
            setTimeout(() => {
              this.router.navigate(['/juridica/view-request']);
            }, 1000);
          } });
        }
      }
      );
    } else {
      if(this.rangeValue === 0){
        this.toast.open({
          description: 'Por favor, seleccione un rango de complejidad'
        });
      }
    }
  }

  rejectProrroga() {
    if ((this.dataDetailPadre?.key_tipo_tarea === 'VERIFICAR_RANGO_COMPLEJIDAD_JEFE' || this.dataDetailPadre?.key_tipo_tarea === 'VERIFICAR_RANGO_COMPLEJIDAD') && this.observationOrResponseValue !== '') {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: '¿Está seguro de rechazar esta prórroga?',
        text: `Al aceptar se realizará el rechazo de la prorroga de la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();
          this.juridicalService.postRechazarProrroga(this.dataDetailPadre?.id, this.observationOrResponseValue).subscribe({ next: (message) => {
            this.sweetAlertService.sweetClose();
            this.sweetAlertService.showNotification("success", message.message, 2000);
            setTimeout(() => {
              this.router.navigate(['/juridica/view-request']);
            }, 1000);
          } });
        }
      }
      );
    } else {
      this.toast.open({
        description: 'Por favor, ingrese una observación para rechazar la prorroga'
      });
    }
  }

  rangeValue: number = 0;
  onRangeFormChange(event: { value: string, valid: boolean }) {
    this.rangeValue = parseInt(event.value);
  }

  closeExtension() {
    if (this.dataDetailPadre?.key_tipo_tarea === 'PRORROGA_APROBADA') {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: '¿Está seguro de cerrar la prorroga?',
        text: `Al aceptar se realizará el cierre de la prorroga, y se volverá a comenzará de nuevo la solicitud #${this.numeroRadiRadicado} y no se podrá deshacer esta acción`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();
          this.juridicalService.postCreateExtension(this.dataDetailPadre?.id).subscribe({ next: (message) => {
            this.sweetAlertService.sweetClose();
            this.sweetAlertService.showNotification("success", message.message, 2000);
            setTimeout(() => {
              this.router.navigate(['/juridica/view-request']);
            }, 1000);
          } });
        }
      }
      );
    } else {
      this.toast.open({
        description: 'Esta solicitud no es apta para cerrar la prorroga'
      });
    }
  }
}
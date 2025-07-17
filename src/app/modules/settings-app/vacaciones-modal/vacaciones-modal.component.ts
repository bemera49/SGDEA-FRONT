import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


/**
 * @description Importacion de services
 */
import { VacacionesService } from '../../../services/pqrs/vacaciones.service';
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";

@Component({
  selector: 'app-vacaciones-modal',
  templateUrl: './vacaciones-modal.component.html',
  styleUrls: ['./vacaciones-modal.component.css']
})
export class VacacionesModalComponent implements OnInit {

  public dataRoles: any
  public rolesFiltered: any
  public rolesAcepted = ["Tipificador", "Analista ", "Revisor", "Aprobador"]
  public usersFilteredByIdRol: any
  public usersFilteredNotSelected: any
  public fechaInicial: string;
  public fechaFinal: string;

  public formVacacionesReemplazo = new FormGroup({
    rol_funcionario: new FormControl('', [Validators.maxLength(5), Validators.required]),
    usuario_sale_id: new FormControl('', [Validators.maxLength(5), Validators.required]),
    usuario_reemplazo_id: new FormControl('', [Validators.maxLength(5), Validators.required]),
    fecha_inicial: new FormControl('', [Validators.maxLength(30), Validators.required]),
    fecha_final: new FormControl('', [Validators.maxLength(30), Validators.required]),
  });

  constructor(
    public vacacionesService: VacacionesService,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    public sweetAlertService: SweetAlertService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  /**
   * @description Obtener todos los roles y seleccionar solo los necesarios.
   */
  getAllRoles() {
    this.vacacionesService.getAllRoles().subscribe({
      next: (res) => {
        this.dataRoles = res;
        const rolesFiltered = this.dataRoles.filter(role => this.rolesAcepted.includes(role.nombreRol));
        this.rolesFiltered = rolesFiltered;
      },
      error: () => {
        console.error('Error getAllRoles');
      }
    });
  }

  /**
   * @description Obtener todos los usuarios que coincidan con el rol selecionado.
   */
  getUserByIdRol() {
    let rolSelected = this.formVacacionesReemplazo.get('rol_funcionario').value
    this.vacacionesService.getUserByIdRol(parseInt(rolSelected)).subscribe({
      next: (res) => {
        this.usersFilteredByIdRol = res
      },
      error: () => {
        console.error('Error getUserByIdRol');
      }
    });
  }

  /**
   * @description Generar una lista de usuarios ignorando el funcionario selecionado que sale.
   */
  getUserNotSelected() {
    let rolSelected = this.formVacacionesReemplazo.get('usuario_sale_id').value;
    this.getDatesVacationsByIdUser()
    let filteredUsers = this.usersFilteredByIdRol.filter(user => user.id !== rolSelected);
    this.usersFilteredNotSelected = filteredUsers;
  }

  /**
   * @description Obtener las fechas de vacaciones para el usuario que sale.
   */
  getDatesVacationsByIdUser() {
    let rolSelected = this.formVacacionesReemplazo.get('usuario_sale_id').value;
    this.vacacionesService.getDateVacationsTest(parseInt(rolSelected)).subscribe({
      next: (res) => {
        this.fechaInicial = res['data']['fecha_inicial']; //Estado 135 debe usar un dia despues: '2024-07-??'
        this.fechaFinal = res['data']['fecha_final'];

        const formattedFechaInicial = this.datePipe.transform(res['data']['fecha_inicial'], 'dd/MM/yyyy');
        const formattedFechaFinal = this.datePipe.transform(res['data']['fecha_final'], 'dd/MM/yyyy');

        this.formVacacionesReemplazo.get('fecha_inicial').patchValue(formattedFechaInicial);
        this.formVacacionesReemplazo.get('fecha_final').patchValue(formattedFechaFinal);
      },
      error: () => {
        console.error('Error getDatesVacationsByIdUser');
      }
    });
  }


  /**
   * @description Agregar el reemplazo / validar los demas flujos.
   */
  addVacacionesReemplazo() {
    let solicitud = {
      "usuario_sale_id": parseInt(this.formVacacionesReemplazo.get('usuario_sale_id').value),
      "usuario_reemplazo_id": parseInt(this.formVacacionesReemplazo.get('usuario_reemplazo_id').value),
      "fecha_inicial": this.fechaInicial,
      "fecha_final": this.fechaFinal,
    }

    this.vacacionesService.addVacacionesReemplazo(solicitud).subscribe({
      next: (res) => {

        if (res['code'] == '135') {
          this.toast.open({
            description: '135. Reemplazo de vacaciones programado exitosamente'
          });
          this.formVacacionesReemplazo.reset()
          return
        }

        if (res['code'] == '040') {
          this.toast.open({
            description: '040. Asignación exitosa'
          });
          this.formVacacionesReemplazo.reset()
          return
        }

        if (res['code'] == '136') {
          const mensajeHTML = res['message'].replace(/\n/g, '<br>');
          this.detectReemplazoVacaciones(mensajeHTML, res['data']['id']);
          return
        }

        if (res['code'] == '137') {
          this.sweetAlertService.alertaReemplazoExistente(res['code'], res['message'])
          return
        }
      },
      error: (err) => {
        console.error('Error addVacacionesReemplazo', err);
      }
    });
  }

  /**
   * @description Metodo actualizar reemplazo de vacaciones
   */
  updateVacacionesReemplazo(usuario_reemplazo_id: number) {
    let solicitud = {
      "usuario_sale_id": parseInt(this.formVacacionesReemplazo.get('usuario_sale_id').value),
      "usuario_reemplazo_id": parseInt(this.formVacacionesReemplazo.get('usuario_reemplazo_id').value),
      "fecha_inicial": this.fechaInicial,
      "fecha_final": this.fechaFinal,
    }
    this.vacacionesService.updateVacacionesReemplazo(usuario_reemplazo_id, solicitud).subscribe({
      next: (res) => {
        this.toast.open({
          description: '135. Reemplazo de vacaciones programado exitosamente'
        });
        this.formVacacionesReemplazo.reset()
      },
      error: (err) => {
        console.error('Error addVacacionesReemplazo', err);
      }
    })
  }

  /**
   * @description Modal confirmar si desea agregar reemplazo de vacaciones
   */
  aceptedVacationsUser() {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: '¿004. Está seguro de la acción a realizar?',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.addVacacionesReemplazo();
      } else {
        this.OpenModalCancelReemplazo();
      }
    });
  }

  /**
   * @description Modal confirmar si desea actualizar reemplazo de vacaciones
   */
  detectReemplazoVacaciones(message: string, usuario_reemplazo_id: number) {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: message,
    });
    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.updateVacacionesReemplazo(usuario_reemplazo_id)
      } else {
        this.OpenModalCancelReemplazo();
      }
    });
  }


  OpenModalCancelReemplazo() {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: '¿Está seguro de cancelar la asignación?',
    });
    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.actionReemplazo()
      }
    });
  }

  actionReemplazo() {
    this.formVacacionesReemplazo.reset();
    this.toast.open({ title: 'Cancelación exitosa', duration: 2000, success: true })
  }


}

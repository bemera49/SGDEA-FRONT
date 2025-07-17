import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { AsignarPqrsComponent } from '@app/services/modal/components/pqrs/asignar-pqrs/asignar-pqrs.component';
import { ClasificacionInternaComponent } from '@app/services/modal/components/pqrs/clasificacion-interna/clasificacion-interna.component';
import { ReasignarAnalistaComponent } from '@app/services/modal/components/pqrs/reasignar-analista/reasignar-analista.component';
import { RetipificacionPqrsComponent } from '@app/services/modal/components/pqrs/retipificacion-pqrs/retipificacion-pqrs.component';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pqrs-listado',
  templateUrl: './pqrs-listado.component.html',
  styleUrls: ['./pqrs-listado.component.css']
})
export class PqrsListadoComponent implements OnInit {

  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
  ];
  breadcrumbRouteActive = "Lista de radicados";

  // tabla de resultrados
  showButtonFiltrer = false; // oculta el boton de los filtros
  initialNotificationMessage = 'textFormFilingLabel';
  initialNotificationStatus = false; // muestra la notificacion
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'point_of_sale';
  initCardHeaderTitle = 'Listado registro de PQRS';
  route: string = 'LogPqrs';
  dtTitles: any = [
    { 'title': 'Semaforo', 'data': 'semaforo' },
    { 'title': 'ID', 'data': 'idRadiRadicado' },
    { 'title': 'Días para vencimiento', 'data': 'diasVencimiento' },
    { 'title': 'Radicado entrada', 'data': 'numeroRadiRadicado' },
    { 'title': 'Cuenta contrato', 'data': 'numeroCuentaContrato' },
    { 'title': 'Contacto SAP', 'data': 'contactoSap' },
    { 'title': 'F. radicación', 'data': 'creacionRadiRadicado' },
    { 'title': 'Solicitud', 'data': 'nombre_tipo_solicitud' },
    { 'title': 'Repuesta', 'data': 'tipoRespuesta' },
    { 'title': 'Medio recepción', 'data': 'medio_de_recepcion' },
    { 'title': 'Clasificación interna', 'data': 'clasificacion_interna' },
    { 'title': 'F. asignación', 'data': 'fecha_de_asignacion' },
    { 'title': 'F. vencimiento', 'data': 'fechaVencimientoRadiRadicados' },
    { 'title': 'Usuario solicitante', 'data': 'usuario_que_solicita' },
    { 'title': 'F. solicitud autorización', 'data': 'fecha_solicitud_autorizacion' },
    { 'title': 'Solicitud autorización', 'data': 'nombre_tipo_solicitud_autorizacion' },
    { 'title': 'Causal rechazo', 'data': 'causal_de_rechazo' },
  ];

  // Propiedades para la configuración de DataTables
  routeLoadDataTablesService = environment.versionApiDefault + `api/radicados?usuario_id=${this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.idDataCliente}`;

  // acciones
  eventClickButtonSelectedData: any;
  menuButtonsSelectNull: any = [];
  menuButtonsSelectOne: any = [
    { icon: 'remove_red_eye', title: 'Ver', action: 'view', },
  ];
  menuButtonsSelectMultiple: any = [
    { icon: 'account_tree', title: 'Tipificar', action: 'tipificar', permission: ['pqrs%tipificar'] },
    { icon: 'account_tree', title: 'Retipificar', action: 'retipificar', permission: ['pqrs%retipificar'] },
    { icon: 'person', title: 'Asignar', action: 'asignar', permission: ['pqrs%asignar'] },
    { icon: 'swap_horizontal_circle', title: 'Reasignar a analista', action: 'reasignar_analista', permission: ['pqrs%reasignar%analista'] },

  ];
  menuButtons: any = this.menuButtonsSelectNull;

  // filtros de bsuqueda
  pqrsEstados = []
  statusParamsAdd = true
  dataParamsAdd = null

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private restSvc: RestService,
    private lhs: LocalStorageService,
    private modal: ModalService,
    private toastSvc: ToastService
  ) { }

  ngOnInit(): void {
    this.lhs.getUser().then((res: any) => {
      this.restSvc.get(`api/v1/radicado/counts?usuario_id=${res.idDataCliente}`).subscribe((res: any) => {
        this.pqrsEstados = res.data
      })

    })
  }

  selectedRowsReceiveData(event) {

    if (event && event.length == 0) {
      this.eventClickButtonSelectedData = event;
      this.menuButtons = [];
    }
    else if (event && event.length == 1) {
      this.eventClickButtonSelectedData = event;
      this.menuButtons = this.menuButtonsSelectOne;
    } else {
      this.eventClickButtonSelectedData = event;
      this.menuButtons = this.menuButtonsSelectMultiple;
    }
  }

  menuReceiveData(event) {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/pqrs/pqrs-view/', this.eventClickButtonSelectedData[0].idRadiRadicado]);
        break;
      case 'asignar':
        if (this.eventClickButtonSelectedData.every(item =>
          item.estado == 'Por asignar'
        ))
          this.openAsignarPqrs()
        else {
          this.toastSvc.open({ description: "No se pueden asignar PQRS a radicados diferentes de estado 'Por asignar'" })
        }
        break;
      case 'tipificar':
        if (this.eventClickButtonSelectedData.every(item =>
          item.estado == 'Asignado para gestión' ||
          item.estado == 'Radicado' ||
          item.estado == 'Pendiente retipificación'
        ))
          this.openClasificacionInternaComponent()
        else {
          this.toastSvc.open({ description: "No se pueden tipificar PQRS a radicados diferentes de estado 'Asignado para gestión', 'Radicado' o 'Pendiente retipificación'" })
        }
        break;
      case 'retipificar':
        if (this.eventClickButtonSelectedData.every(item =>
          item.estado == 'Pendiente retipificación' &&
          item.causal_de_rechazo == 'Tipificación interna errada'
        ))
          this.openRetipificacionPqrs()
        else {
          this.toastSvc.open({ description: "No se pueden tipificar PQRS a radicados diferentes de estado 'Pendiente retipificación' con causal Tipificacion interna errada" })
        }
        break;
      case 'reasignar_analista':
        if (this.eventClickButtonSelectedData.every(item =>
          item.estado == 'Rechazado' &&
          item.causal_de_rechazo == 'Asignación a analista no corresponde'
        ))
          this.openReasignarAnalistaPqrs()
        else {
          this.toastSvc.open({ description: "No se pueden reasignar PQRS a radicados diferentes de estado 'Rechazado' con causal Asignación a analista no corresponde" })
        }
        break;
      default:
        break;
    }
  }

  changeFilter(estado_id) {
    // estado_id
    const filtros = {
      estado_id
    }
    this.dataParamsAdd = filtros
  }

  /** HU 008 - Asignar PQRS o solicitud */
  openAsignarPqrs() {
    this.modal.open(AsignarPqrsComponent, {
      data: this.eventClickButtonSelectedData.map(item => item.idRadiRadicado),
      title: 'Asignar solicitud',
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }

  /** HU 006 - Realizar Clasificación interna de una PQRS o solicitud - Tipificar */
  openClasificacionInternaComponent() {
    this.modal.open(ClasificacionInternaComponent, {
      title: 'Realizar tipificación',
      void: () => {
        this.modal.openNotify('Mensaje', 'Clasificacion interna realizada con éxito', true)
      },
      data: {
        idRadicado: this.eventClickButtonSelectedData.map(item => item.idRadiRadicado),
      }
    }).afterClosed().subscribe(result => {
      this.toastSvc.open({ title: 'tipificación exitosa', duration: 2000, success: true });
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }

  openRetipificacionPqrs() {
    this.modal.open(RetipificacionPqrsComponent, {
      title: 'Realizar retipificación',
      data: {
        idRadicado: this.eventClickButtonSelectedData.map(item => item.idRadiRadicado)
      },
      void: () => {
        this.toastSvc.open({
          title: 'Clasificación Interna realizada con éxito',
          duration: 3000
        })
      },
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    });;
  }

  openReasignarAnalistaPqrs() {
    this.modal.open(ReasignarAnalistaComponent, {
      title: 'Reasignar a analista',
      data: {
        solicitudesSelected: this.eventClickButtonSelectedData.map(item => item.idRadiRadicado)
      }
    }).afterClosed().subscribe(result => {
      this.toastSvc.open({ title: 'Asignación exitosa', duration: 2000, success: true });
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }

}

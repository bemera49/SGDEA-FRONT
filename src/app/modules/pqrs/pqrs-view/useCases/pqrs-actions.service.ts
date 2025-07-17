import { Injectable } from '@angular/core';
import { DevolverSolicitudComponent } from "src/app/services/modal/components/pqrs/devolver-solicitud/devolver-solicitud.component";
import { AsociarDocumentosComponent } from "src/app/services/modal/components/pqrs/asociar-documentos/asociar-documentos.component";
import { SolicitarAutorizacionDevolucionComponent } from "src/app/services/modal/components/pqrs/solicitar-autorizacion-devolucion/solicitar-autorizacion-devolucion.component";
import { ClasificacionInternaComponent } from "src/app/services/modal/components/pqrs/clasificacion-interna/clasificacion-interna.component";
import { RetipificacionPqrsComponent } from "src/app/services/modal/components/pqrs/retipificacion-pqrs/retipificacion-pqrs.component";
import { GestionarProrrogaComponent } from "src/app/services/modal/components/pqrs/gestionar-prorroga/gestionar-prorroga.component";
import { AprobarPqrsComponent } from "src/app/services/modal/components/pqrs/aprobar-pqrs/aprobar-pqrs.component";
import { RechazarPqrsComponent } from "src/app/services/modal/components/pqrs/rechazar-pqrs/rechazar-pqrs.component";
import { ToastService } from '@app/services/toast/toast.service';
import { ModalService } from '@app/services/modal/modal.service';
import { inject } from '@angular/core';
import { ReasignarGeneralComponent } from '@app/services/modal/components/pqrs/reasignar-general/reasignar-general.component';
import { AsignarPqrsComponent } from '@app/services/modal/components/pqrs/asignar-pqrs/asignar-pqrs.component';
import { ReasignarAnalistaComponent } from '@app/services/modal/components/pqrs/reasignar-analista/reasignar-analista.component';
import { UtilsService } from './utils.service';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Signature } from '@app/modules/management-processing/signature-detail/signature-detail.component';

@Injectable({
  providedIn: 'root'
})
export class PqrsActionsService {

  public modal = inject(ModalService)
  public toast = inject(ToastService)
  public utilsService = inject(UtilsService)
  public http = inject(RestService)
  public http$ = inject(HttpClient)

  public userData = this.http.getUserData()

  public menuButtonsSelectMasive: any = [
    // { icon: 'account_tree', title: 'Tipificar', action: () => this.openClasificacionInternaComponent(), data: '' },
    // { icon: 'person', title: 'Asignar', action: () => this.openAsignarPqrs(), data: '' },
    { icon: 'swap_horizontal_circle', title: 'Reasignar proyecto', action: () => this.openReasignarPqrs(), data: '' },
    { icon: 'refresh', title: 'Devolver', action: () => this.openDevolverSolicitud(), data: '' },
    { icon: 'help', title: 'Solicitar autorización', action: () => this.openSolicitarAutorizacionDevolucionComponent(), data: '' },
    // { icon: 'description', title: 'Consultar solicitudes relacionadas', action: () => this.openConsultarPqrsAbiertas(), data: '' },
    // { icon: 'account_tree', title: 'Retipificar', action: () => this.openRetipificacionPqrs(), data: '' },
    // { icon: 'content_paste_go', title: 'Asociar documento o expediente', action: () => this.associateDocumentAction(), data: '' },
    // { icon: 'content_paste_go', title: 'Traslado por competencia', action: () => this.openModalGestionarTraslado(), data: '' },
    // { icon: 'content_paste_go', title: 'Asociar solicitudes', action: () => this.openModalAsociarSolicitudes(), data: '' },
    // { icon: 'cancel', title: 'Gestionar desistimiento', action: () => this.openModalGestionarDesistimiento(), data: '' },
    { icon: 'schedule', title: 'Solicitar prorroga', action: () => this.openModalGestionarProrroga(), data: '' },
    { icon: 'speaker_notes', title: 'Proyectar respuesta', action: () => this.redirectProyectarRespuesta(), data: '' },
  ];
  /**HU 09 */
  private funcionarioSelected = null;

  /*HU-11*/
  isExpedienteListVisible: boolean = false;
  isAssociatedExpedientesVisible: boolean = false;

  /** HU 003 - Devolver PQRS o solicitud */
  openDevolverSolicitud() {
    this.modal.open(DevolverSolicitudComponent, {
      title: 'Devolver solicitud',
      void: () => {
        this.toast.open({
          title: 'Devolución éxitosa',
          description: 'La solicitud ha sido devuelta con éxito.'
        })
      },
    });
  }
  /**END HU 003 - Devolver PQRS o solicitud */


  /** HU 004 - Solicitar autorización para devolución fuera de tiempo permitido */
  openSolicitarAutorizacionDevolucionComponent() {
    this.modal.open(SolicitarAutorizacionDevolucionComponent, {
      title: 'Solicitar autorización',
      void: () => {
        this.toast.open({
          title: 'Solicitud de autorización enviada',
          description: 'La solicitud ha sido enviada con éxito.'
        })
      },
    });
  }
  /**END HU 004 - Solicitar autorización para devolución fuera de tiempo permitido */


  /** HU 006 - Realizar Clasificación interna de una PQRS o solicitud - Tipificar */
  openClasificacionInternaComponent(idCollection: number[]) {
    this.modal.open(ClasificacionInternaComponent, {
      title: 'Realizar tipificación',
      void: () => {
        this.toast.open({
          title: 'Tipificación realizada',
          description: 'La clasificación interna fue realizada con éxito.',
          success: true,
        })
      },
      data: {
        idRadicado: idCollection,
      }
    });
  }
  /** END HU 006 - Realizar Clasificación interna de una PQRS o solicitud */

  /** HU 008 - Asignar PQRS o solicitud */
  openAsignarPqrs(select) {
    this.modal.open(AsignarPqrsComponent, {
      data: select,
      title: 'Asignar solicitud',
      void: () => {
        this.toast.open({
          title: 'Solicitud asignada',
          description: 'La solicitud fue asiganada con éxito'
        })
      },
    });
  }
  /** END HU 008 - Asignar PQRS o solicitud */


  /** HU 009 - Reasignar PQRS o solicitud a analista para su trámite */

  openReasignarPqrs() {
    this.modal.open(AsignarPqrsComponent, {
      title: 'Reasignar solicitud',
      void: () => {
        this.toast.open({
          title: 'Resignación éxitosa',
          description: 'La solicitud fue reasiganada con éxito'
        })
      },
    });
  }

  openReasignarAnalistaPqrs(solicitudesSelected, tableRef) {
    console.log(solicitudesSelected)
    this.modal.open(ReasignarAnalistaComponent, {
      title: 'Reasignar a analista',
      data: {
        solicitudesSelected,
        funcionarioSelected: this.getFuncionarioSelected
      },
      void: () => {
        this.toast.open({ title: 'Asignación exitosa', duration: 2000, success: true });
        tableRef.reload(true)
        this.utilsService.reloadTable("reload-table-default");
      },
    });
  }

  openReasignarGeneralPqrs(solicitudesSelected) {
    //console.log(solicitudesSelected)
    let ref = this.modal.open(ReasignarGeneralComponent, {
      title: 'Reasignación general',
      data: {
        solicitudesSelected
      },

    });

    ref.afterClosed().subscribe(() => {
      this.utilsService.reloadTable(ref.componentInstance.data.soliciutesFiltradas);
      this.setFuncionarioSelected = ref.componentInstance.data.funcionarioSelected;
    });
  }
  /** END HU 009 - Reasignar PQRS o solicitud a analista para su trámite */


  /** HU 010 - Reclasificación o retipificacion interna de la PQRS o solicitud */
  openRetipificacionPqrs(select) {
    console.log(select)
    this.modal.open(RetipificacionPqrsComponent, {
      title: 'Realizar retipificación',
      data: select,
      void: () => {
        this.toast.open({
          title: 'Clasificación Interna realizada con éxito',
          duration: 3000
        })
      },
    });
  }

  /** END HU 010 - Reclasificación o retipificacion interna de la PQRS o solicitud */


  // /** HU 011 - Listar la clasificación documental y asociar documentos al expediente **/
  // // Método para mostrar la tabla de expedientes y el botón flotante
  //   associateDocumentAction() {
  //   this.isExpedienteListVisible = true;
  //   this.isAssociatedExpedientesVisible = false;
  // }

  // // Método que se dispara después de asociar los expedientes
  //    onExpedientesAssociated() {
  //   this.isExpedienteListVisible = false;
  //   this.isAssociatedExpedientesVisible = true;
  // }

  // Método para abrir el modal de asociar documentos y manejar la   lógica de asociación
  openModalAsociarDocumentoExpediente(select) {

    let transformedArray = select.map((value) => {
      return { id: value };
    });
    const dialogRef = this.modal.open(AsociarDocumentosComponent, {
      title: '¿Está seguro de asociar el expediente?',
      data: transformedArray
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.isExpedienteListVisible = false;
        this.isAssociatedExpedientesVisible = true;
        this.modal.openNotify('', 'Documento asociado exitosamente al expediente seleccionado', true)

      }
    });
  }


  /** HU 019 - Gestionar Prórroga */
  openModalGestionarProrroga() {
    this.modal.open(GestionarProrrogaComponent, {
      title: 'Solicitar prorroga',
      void: () => {
        this.toast.open({
          title: 'Prorroga enviada'
        })
      },
    });
  }
  /** END HU 019 - Gestionar Prórroga */


  /** HU 023 - Elaborar comunicación de respuesta al solicitante, HU 024 - Adjuntar archivos */
  redirectProyectarRespuesta() {
    window.location.href = "/#/pqrs/pqrs-view/1/proyectar-respuesta"
  }
  /** END HU 023, 024 */


  /** ROL - APROBAR - RECHAZAR PQRS */
  aprobarPQRS() {
    this.modal.open(AprobarPqrsComponent, {
      title: 'Está seguro de la aprobación',
      description: 'Al aceptar se realizará la aprobación del rádicado #846545388',
      void: () => {
        this.toast.open({
          title: 'Radicado aprobado',
          description: 'El radicado fue aprobado con éxito'
        })
      },
    });
  }

  rechazarPQRS() {
    this.modal.open(RechazarPqrsComponent, {
      title: 'Rechazar solicitud',
      void: () => {
        this.toast.open({
          title: 'Solicitud rechazada',
          description: 'La solicitud fue rechazada con éxito'
        })
      },
    });
  }

public getSignature(params: FormGroup) {
  let params$ = this.http.buildHttpParams(params)

  let httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.userData.accessToken,
    }),
    params: params$,
  };
    return this.http$.get(`${environment.apiUrl}api/flujo/radicado/lista/mejorado`, httpOptions).pipe(
      retry(3),
    )
 
} 

public putSignature(idRadicado: number, body: Signature[]) {
  const idUser = this.userData.idDataCliente;
  const idDependencia = this.userData.dependencia.idGdTrdDependencia;

  let httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.userData.accessToken,
    })
  }
    

  return this.http$.put(`${environment.apiUrl}api/flujo/radicado/editar/${idRadicado}/${idUser}/${idDependencia}`, body, httpOptions)
}

public getAllSignatures(params: FormGroup) {

  let params$ = this.http.buildHttpParams(params)

  let httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.userData.accessToken,
    }),
    params: params$,
  };
    const currentUserId = this.userData.idDataCliente;
    return this.http$.get(`${environment.apiUrl}api/flujo/radicado/tramitador`, httpOptions).pipe(
      retry(3),
      map((data:any) => data.map(item => ({
        ...item,
        full_name: item.tramitador.user_detalle.full_name,
        nombreEstado: item.estado.estado,
      })))
    )
 
}

  reasignarPqrs(userId: number, userDependenciaId: number, radicadoId: number, canChangeStatus: boolean = true) {
    let jsonSend = {
      data: {
        idUsuarioTramitador: userId,
        idDependenciaTramitador: "null",
        observacion: ""
      },
      ButtonSelectedData: [
        { id: radicadoId, idInitialList: 0 },
      ],
      canChangeStatus
    }
    const userData = this.http.getUserData()
    let dataEncypt = this.http.encryptAES(jsonSend, userData.accessToken);
    let dataSend = encodeURIComponent(JSON.stringify(dataEncypt));
    let jsonParams = "jsonSend=" + dataSend;
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + userData.accessToken,
      })
    };

    return this.http$.post(`${environment.apiUrl}radicacion/transacciones/re-asign`, jsonParams, httpOptions)
  }


  // postReasociarPlantilla(idEstadoPlantilla: string) {

  //   const formData = new FormData();

  //   formData.append('idUser', this.restService.getUserData().idDataCliente)
  //   formData.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)
  //   formData.append('estado', idEstadoPlantilla)
  //   formData.append('file', this.LastfileObject[0].data)


  //   return this.restService.httpPostArchivo(`api/radicado/${this.currentID}/documento-principal-one-file`, formData, this.authentication).pipe(
  //     catchError(err => {
  //       console.error(err)
  //       this.modal.openNotify('', 'Error en la peticion de reasociacion', false)
  //       throw new Error()
  //     })
  //   )
  // }


  /** END APROBAR - RECHAZAR PQRS */

  postProyectarRespuesta(body: any) {
    return this.http.postParams('radicacion/radicados/create', body).pipe()
  }


  public get getFuncionarioSelected() {
    return this.funcionarioSelected;
  }

  public set setFuncionarioSelected(val) {
    this.funcionarioSelected = val;
  }

  constructor() { }
}

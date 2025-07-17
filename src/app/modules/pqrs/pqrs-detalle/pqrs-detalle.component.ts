import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { catchError, lastValueFrom } from 'rxjs';
import { AvisosSapSgoModalComponent } from '../radicados-cuenta-contrato/avisos-sap-sgo-modal/avisos-sap-sgo-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { ClasificacionInternaComponent } from '@app/services/modal/components/pqrs/clasificacion-interna/clasificacion-interna.component';
import { AsociarSolicitudesHu13ConfirmComponent } from '../pqrs-log-index/uses/asociar-solicitudes-hu13-confirm/asociar-solicitudes-hu13-confirm.component';
import { environment } from 'src/environments/environment';
import { AuthService } from '@app/services/auth.service';
import { ProrrogaService } from '@app/services/pqrs/prorroga.service';
import { AsignarPqrsComponent } from '@app/services/modal/components/pqrs/asignar-pqrs/asignar-pqrs.component';
import { ReasignarAnalistaComponent } from '@app/services/modal/components/pqrs/reasignar-analista/reasignar-analista.component';
import { DevolverSolicitudComponent } from '@app/services/modal/components/pqrs/devolver-solicitud/devolver-solicitud.component';
import { SolicitarAutorizacionDevolucionComponent } from '@app/services/modal/components/pqrs/solicitar-autorizacion-devolucion/solicitar-autorizacion-devolucion.component';
import { RetipificacionPqrsComponent } from '@app/services/modal/components/pqrs/retipificacion-pqrs/retipificacion-pqrs.component';
import { AsociarDocumentosComponent } from '@app/services/modal/components/pqrs/asociar-documentos/asociar-documentos.component';
import { AsociarSolicitudesHu13Component } from '../pqrs-log-index/uses/asociar-solicitudes-hu13/asociar-solicitudes-hu13.component';
import { IAssociatedRequest } from '../pqrs-log-index/uses/asociar-solicitudes-hu13/util/data';
import { GestionarDesistimientoComponent } from '@app/services/modal/components/pqrs/gestionar-desistimiento/gestionar-desistimiento.component';
import { GestionarProrrogaComponent } from '@app/services/modal/components/pqrs/gestionar-prorroga/gestionar-prorroga.component';
import { AprobarRadicadoComponent } from '@app/services/modal/components/pqrs/aprobar-radicado/aprobar-radicado.component';
import { DesaprobarRadicadoComponent } from '@app/services/modal/components/pqrs/desaprobar-radicado/desaprobar-radicado.component';
import { RechazarSolicitudComponent } from '@app/services/modal/components/pqrs/rechazar-solicitud/rechazar-solicitud.component';
import { LocalStorageService } from '@app/services/local-storage.service';
import { CreacionContactosComponent } from '../radicados-cuenta-contrato/creacion-contactos/creacion-contactos.component';
import { IncludeInFileComponent } from '@app/modules/components/include-in-file/include-in-file.component';

@Component({
  selector: 'app-pqrs-detalle',
  templateUrl: './pqrs-detalle.component.html',
  styleUrls: ['./pqrs-detalle.component.css']
})
export class PqrsDetalleComponent implements OnInit {

  // titulos
  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
  ];
  breadcrumbRouteActive = "Detalle de radicado";

  // datos generales
  currentId = this.activatedRoute.snapshot.params['id']
  requestType = null;
  currentItem: any = {}
  anexos: any[] = [];
  infoArrayProrroga: any[] = [];

  // Para el proceso del historico del radicado se muestra la data correspondiente
  dataRowsHistorico: any;
  statusSeeMoreHistory: boolean = false;
  numberLimitHistory: number;
  minLimit: number = 5;
  statusSeeHistory: boolean = true;

  // datos para las tablas
  showButtonFiltrer = false;
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'point_of_sale';
  initCardHeaderTitleOtras = 'Otras cuentas contrato asociados al radicado';
  routeLoadDataTablesServiceOtras = `api/radi-radicados-cuenta-contrato/info/${this.currentId}`
  dtTitlesOtras = [
    { 'title': 'Cuenta contrato actual', 'data': 'numeroCuentaContrato' },
    { 'title': 'Contácto SAP', 'data': 'contactoSap' },
    { 'title': 'Zona', 'data': 'zona' },
    { 'title': 'Cuenta interna', 'data': 'cuentaInterna' },
  ]
  initCardHeaderTitleRadicadosAsociados = 'Radicados asociados a la misma cuenta contrato';
  routeLoadDataTablesServiceRadicadosAsociados = `api/asociar-solicitudes/radicados-para-asociar/${this.currentId}`
  dtTitlesRadicadosAsociados = [
    { 'title': 'ID', 'data': 'idRadicado' },
    { 'title': 'Número de radicado de entrada', 'data': 'numeroRadicado' },
    { 'title': 'Cuenta contrato', 'data': 'numeroCuentaContrato' },
    { 'title': 'Contacto SAP', 'data': 'numeroContactoSap' },
    { 'title': 'Nombre del solicitante', 'data': 'nombresSolicitantes' },
    { 'title': 'Fecha de radicacion', 'data': 'fechaRadicacion' },
    { 'title': 'Clasificación interna', 'data': 'clasificacionInterna' },
    { 'title': 'Funcionario asignado', 'data': 'funcionariosGestiona' },
  ]
  initCardHeaderTitleSolicitudesAsociadas = 'Listado de solicitudes asociadas';
  routeLoadDataTablesServiceSolicitudesAsociadas = `api/asociar-solicitudes/radicados-asociados/${this.currentId}`
  dtTitlesSolicitudesAsociadas = [
    { 'title': 'ID Radicado', 'data': 'idRadicado' },
    { 'title': 'Número de radicado de entrada', 'data': 'numeroRadicado' },
    { 'title': 'Cuenta contrato', 'data': 'numeroCuentaContrato' },
    { 'title': 'Nombre del solicitante', 'data': 'nombresSolicitantes' },
    { 'title': 'Fecha de radicacion', 'data': 'fechaRadicacion' },
    { 'title': 'Clasificación interna', 'data': 'clasificacionInterna' },
    { 'title': 'Funcionario asignado', 'data': 'funcionariosGestiona' },
  ]
  selectedRows$: any;

  // formulario
  pqrsForm = this._fb.group({
    idRadiRadicado: [''],
    numeroCuentaContrato: ['', Validators.required],
    estadoRadiRadicado: ['', Validators.required],
    contactoSap: ['', Validators.required],
    creacionRadiRadicado: ['', Validators.required],
    tipo_solicitud: ['', Validators.required],
    cg_medio_recepcion: ['', Validators.required],
    clasificacionInternaId: ['', Validators.required],
    asignacionRadiRadicado: ['', Validators.required],
    user_idTramitador: ['', Validators.required],
    fechaDocumentoRadiRadicado: ['', Validators.required],
    user_idCreador: ['', Validators.required],
    returnCause: ['', Validators.required],
    anexos: ['', Validators.required],
    rejectUser: ['', Validators.required],
    rejectDate: ['', Validators.required],
    rejectCause: ['', Validators.required],
    observations: ['', Validators.required],
  })

  // acciones para tablas y pqrs
  menuButtonsSelectNull: any = [
    { icon: 'account_tree', title: 'Tipificar', action: 'tipificar', permission: ['pqrs%tipificar'] },
    { icon: 'person', title: 'Asignar', action: 'asignar', permission: ['pqrs%asignar'] },
    { icon: 'swap_horizontal_circle', title: 'Reasignar a analista', action: 'reasignar_analista', permission: ['pqrs%reasignar%analista'] },
    { icon: 'refresh', title: 'Rechazar asignacion', action: 'rechazar_asignacion', permission: ['pqrs%rechazar%asignacion'] },
    { icon: 'refresh', title: 'Rechazo interno', action: 'rechazo_interno', permission: ['pqrs%rechazo%interno'] },
    { icon: 'help', title: 'Solicitar autorización', action: 'solicitar_autorizacion', permission: ['pqrs%solicitar%autorizacion'] },
    { icon: 'help', title: 'Solicitud creación de contactos', action: 'solicitar_creacion_contactos', permission: ['pqrs%acciones%solicitud%creacion%contactos'] },
    { icon: 'account_tree', title: 'Retipificar', action: 'retipificar', permission: ['pqrs%retipificar'] },
    { icon: 'content_paste_go', title: 'Asociar documento o expediente', action: 'asociar_expediente', permission: ['pqrs%asociar%expediente'] },
    { icon: 'content_paste_go', title: 'Traslado por competencia', action: 'traslado_competencia', permission: ['pqrs%traslado%competencia'] },
    { icon: 'help', title: 'Peticion incompleta', action: 'peticion_incompleta', permission: ['pqrs%peticion%incompleta'] },
    { icon: 'content_paste_go', title: 'Asociar solicitudes', action: 'asociar_solicitudes', permission: ['pqrs%asociar%solicitudes'] },
    { icon: 'cancel', title: 'Gestionar desistimiento', action: 'gestionar_desistimiento', permission: ['pqrs%gestionar%desistimiento'] },
    { icon: 'schedule', title: 'Solicitar Ampliación de Términos', action: 'solicitar_ampliacion', permission: ['pqrs%ampliacion%terminos'] },
    { icon: 'speaker_notes', title: 'Proyectar respuesta', action: 'proyectar_respuesta', permission: ['pqrs%proyectar%respuesta'] },
    { icon: 'speaker_notes', title: 'Ver respuesta proyectada', action: 'ver_respuesta', permission: ['pqrs%ver%respuesta%proyectada'] },
    { icon: 'speaker_notes', title: 'Ver Comunicación Proyectada', action: 'ver_comunicacion', permission: ['pqrs%comunicacion%proyectada'] },
    { icon: 'speaker_notes', title: 'Rechazo visto bueno', action: 'rechazo_visto_bueno', permission: ['pqrs%comunicacion%proyectada'] },
    { icon: 'attach_file_add', title: 'Asociar Documento a Expediente', action: 'asociar_documento', permission: ['pqrs%asociar%documento-expediente'] },
    { icon: 'check', title: 'Aprobar radicado', action: 'aprobar', permission: ['pqrs%proyectar%respuesta'] },
    { icon: 'cancel', title: 'Rechazar radicado', action: 'rechazar', permission: ['pqrs%proyectar%respuesta'] },
    { icon: 'check', title: 'Aprobar solicitud', action: 'aprobar_solicitud', permission: ['pqrs%rechazar%ampliacionTerminos'] },
    { icon: 'cancel', title: 'Rechazar solicitud', action: 'rechazar_solicitud', permission: ['pqrs%rechazar%ampliacionTerminos'] },
    { icon: 'attach_file_add', title: 'Formulario Transaccion SAP', action: 'form_sap', permission: ['pqrs%fromulario%sap'] },
    { icon: 'speaker_notes', title: 'Trabajo Colaborativo', action: 'trabajo_colaborativo', permission: ['pqrs%ver%respuesta%proyectada'] },
  ];
  menuButtonsSelect: any = [
    { icon: '', title: 'Asociar', action: 'asociarSolicitudes', permission: null },
    { icon: '', title: 'Desasociar', action: 'desasociarSolicitudes', permission: null },
  ];
  menuButtons: any

  // variables asisos sap
  avisoSAPBoolean = false
  avisoSGOBoolean = false
  dataAvisoSAP = null
  dataAvisoSGO = null

  // variables para HU-11
  isExpedienteListVisible: boolean = false;
  isAssociatedExpedientesVisible: boolean = false;
  initCardHeaderTitleExpedientes = 'Otras cuentas contrato asociados al radicado';
  routeLoadDataTablesExpedientes = `api/radi-radicados-cuenta-contrato/info/${this.currentId}`
  dtTitlesExpedientes: any = [
    { 'title': 'Nombre de expediente', 'data': 'usuario' },
    { 'title': 'Serie', 'data': 'fechaLog' },
    { 'title': 'Subserie', 'data': 'moduloLog' },
  ];
  statusModalIncludeInFile: boolean = false; // Status del modal incluir en expediente


  // variables HU-13
  selectedExpedientes: IAssociatedRequest[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restSvc: RestService,
    private toast: ToastService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private modal: ModalService,
    private authService: AuthService,
    private _serviceProrroga: ProrrogaService,
    private router: Router,
    private lhs: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getData()
    this.getAvisoSap();
    this.getAvisoSGO();
  }

  async getData() {
    const response: any = await lastValueFrom(this.restSvc.get(`api/radicado/${this.currentId}`).pipe(
      catchError(error => {
        this.toast.open({
          description: 'Conexión con el servidor fallida. Intente de nuevo más tarde',
          title: 'Error de conexión',
          success: false,
          duration: null,
        })
        console.error(error)
        throw new Error
      })
    ))

    const responsehistorico: any = await lastValueFrom(this.restSvc.get(`api/v1/radicado/${this.currentId}/trazabilidad`).pipe(
      catchError(error => {
        this.toast.open({
          description: 'Conexión con el servidor fallida. Intente de nuevo más tarde',
          title: 'Error de conexión',
          success: false,
          duration: null,
        })
        console.error(error)
        throw new Error
      })
    ))

    this.currentItem = response

    // setear datos de formulario
    this.pqrsForm.patchValue({
      numeroCuentaContrato: response.numeroCuentaContrato,
      estadoRadiRadicado: response.estado.estado,
      contactoSap: response.contactoSap,
      creacionRadiRadicado: response.creacionRadiRadicado,
      tipo_solicitud: response.tipo_solicitud?.nombre,
      cg_medio_recepcion: response.cg_medio_recepcion?.nombreCgMedioRecepcion,
      clasificacionInternaId: response.clasificacion_interna?.detalle,
      asignacionRadiRadicado: response.fecha_de_asignacion,
      user_idTramitador: response.usuario_que_asigno,
      fechaDocumentoRadiRadicado: response.fechaDocumentoRadiRadicado,
      user_idCreador: response.usuario_remitente,
      returnCause: response.returnCause,
      anexos: response.anexos,
      rejectUser: response.usuario_que_rechazo,
      rejectDate: response.fecha_de_rechazo,
      rejectCause: response.causal_de_rechazo,
      observations: response.observaciones_rechazo,
    });
    this.pqrsForm.disable()

    // obtener anexos
    this.obtenerAnexos()

    // validar estados
    this.validarEstado()

    // setear el historico
    this.dataRowsHistorico = responsehistorico.data.dataHistorico;
    if (this.dataRowsHistorico.length > this.minLimit) {
      this.statusSeeMoreHistory = true;
      this.numberLimitHistory = this.minLimit;
    }

  }

  // MANEJO DE DATOS

  async validarEstado() {

    this.lhs.getUser().then((user: any) => {

      // quitar acciones al usuario proyector
      if (user.idRol == 12) {
        this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Asignar')
      }
    })

    if (new Date(this.currentItem.fechaVencimientoRadiRadicados) < new Date()) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Proyectar respuesta')
    }

    if (
      this.currentItem.estado.estado != 'Por asignar'
    ) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Asignar')
    }


    if (
      this.currentItem.estado.estado === 'Por asignar' ||
      this.currentItem.estado.estado == 'Rechazado' ||
      this.currentItem.estado.estado == 'Pendiente retipificación' ||
      this.currentItem.estado.estado == 'Asignado para gestión'

    ) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Tipificar')
    }

    if (
      this.currentItem.estado.estado != 'Pendiente retipificación' &&
      this.currentItem.causal_de_rechazo != 'Tipificación interna errada'
    ) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Retipificar')
    }
    if (![
      'Asignado para gestión',
      'Ampliación de términos Aprobada',
      'Ampliación de términos Rechazada'
    ].includes(this.currentItem.estado.estado)) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Proyectar respuesta')
    }
    if (this.currentItem.estado.estado !== 'Proyección respuesta' &&
      this.currentItem.estado.estado !== 'Trabajo Colaborativo Finalizado') {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Ver respuesta proyectada')
    }

    if (
      this.currentItem.estado.estado == 'Proyección respuesta' ||
      this.currentItem.estado.estado == 'En trabajo colaborativo' ||
      this.currentItem.estado.estado == 'Trabajo Colaborativo Finalizado') {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Solicitar autorización')
    }

    if (
      this.currentItem.estado.estado != 'Rechazado' &&
      this.currentItem.causal_de_rechazo != 'Asignación a analista no corresponde'
    ) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Reasignar a analista')
    }

    if (this.currentItem.estado.estado !== 'En trabajo colaborativo') {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title !== 'Trabajo Colaborativo')
    }

    const info = localStorage.getItem(environment.hashSgdea)
    const infoDescrypt = this.authService.decryptAES(info)
    const iDRol = infoDescrypt.data.Rol.idRol
    const response: any = await lastValueFrom(this._serviceProrroga.getAmpliacionTerminos(this.currentItem.idRadiRadicado))
    this.infoArrayProrroga = response.ampliacion_terminos
    const titlesToFilter = this.infoArrayProrroga.length > 0
      ? ['Rechazar solicitud', 'Aprobar solicitud']
      : ['Rechazar radicado', 'Aprobar radicado', 'Proyectar respuesta', 'Formulario Transaccion SAP'];

    if (this.infoArrayProrroga.length > 0) {
      let actualDate = this.getDate()
      let parsedDate1 = this.parseDate(this.currentItem.fechaVencimientoRadiRadicados);
      let parsedDate2 = this.parseDate(actualDate);

      if (parsedDate2 > parsedDate1) {
        this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter(item => item.title === 'Rechazar solicitud');
      }
    }

    if (iDRol === 9 || iDRol === 10) {
      this.menuButtonsSelectNull = this.menuButtonsSelectNull.filter((item: any) => {
        return titlesToFilter.includes(item.title);
      });
    }


    this.selectedRowsReceiveData([])
  }

  async obtenerAnexos() {
    // if (!!this.currentItem?.radicado_salida_id) {
    //   const response: any = await lastValueFrom(this.restSvc.get(`api/radicado/${this.currentItem.radicado_salida_id}`))
    //   this.anexos.push(...response.anexos, ...this.currentItem.anexos)
    // } else {
    this.anexos.push(...this.currentItem.anexos)
    // }
  }

  // FUNCIONALIDAD
  menuReceiveData(event) {
    switch (event.action) {
      case 'tipificar':
        this.openClasificacionInternaComponent()
        break;
      case 'asignar':
        this.openAsignarPqrs()
        break;
      case 'reasignar_analista':
        this.openReasignarAnalistaPqrs()
        break;
      case 'rechazar_asignacion':
        this.openDevolverSolicitud(false)
        break;
      case 'rechazo_interno':
        this.openDevolverSolicitud(true)
        break;
      case 'solicitar_autorizacion':
        this.openSolicitarAutorizacionDevolucionComponent()
        break;
      case 'solicitar_creacion_contactos':
        this.solicitudCreacionContacto()
        break;
      case 'retipificar':
        this.openRetipificacionPqrs()
        break;
      case 'asociar_expediente':
        this.associateDocumentAction()
        break;
      case 'associateExpedient':
        this.openModalAsociarDocumentoExpediente();
        break;
      case 'traslado_competencia':
        this.openModalGestionarTraslado()
        break;
      case 'peticion_incompleta':
        this.openPeticionIncompleta()
        break;
      case 'asociar_solicitudes':
        this.openModalAsociarSolicitudes()
        break;
      case 'gestionar_desistimiento':
        this.openModalGestionarDesistimiento()
        break;
      case 'solicitar_ampliacion':
        this.openModalGestionarProrroga()
        break;
      case 'proyectar_respuesta':
        this.redirectProyectarRespuesta()
        break;
      case 'ver_respuesta':
        this.redirectRespuestaProyectada()
        break;
      case 'ver_comunicacion':
        this.solicitudVistoBueno()
        break;
      case 'rechazo_visto_bueno':
        this.rechazoVistoBueno()
        break;
      case 'asociar_documento':
        this.statusModalIncludeInFile = true
        // this.openModalAsociarDocumentoExpediente()
        break;
      case 'aprobar':
        this.openAprobarRadicadoDialog()
        break;
      case 'rechazar':
        this.openDesaprobarRadicadoDialog()
        break;
      case 'aprobar_solicitud':
        this.openAprobarSolicitudDialog()
        break;
      case 'rechazar_solicitud':
        this.openRechazarSolicitudDialog()
        break;
      case 'form_sap':
        this.openFormularioTransaccionSap()
        break;
      case 'trabajo_colaborativo':
        this.redirectRespuestaProyectada()
        break;

      // cases tablas
      case 'asociarSolicitudes':
        this.openAsociarDesasociar(false)
        break;
      case 'desasociarSolicitudes':
        this.openAsociarDesasociar(true)
        break;

      default:
        break;
    }


  }

  selectedRowsReceiveData(data) {
    if (data.length > 0) this.menuButtons = this.menuButtonsSelect
    else this.menuButtons = this.menuButtonsSelectNull
    this.selectedRows$ = data
  }

  selectedRowsReceiveDataExpediente(selectedItems: any[]) {
    this.selectedRows$ = selectedItems;
    if (selectedItems.length > 0) {
      this.menuButtons = [
        {
          icon: 'folder',
          title: 'Asociar expediente',
          action: 'associateExpedient'
        }
      ];
    } else {
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }

  getAvisoSap() {
    this.restSvc.get(`api/consulta-avisoSAP/af1d302e-42ac-34dc-af02-c48ab029f363`).subscribe({
      next: (data) => {
        if (data['data']) {
          this.avisoSAPBoolean = true
          this.dataAvisoSAP = data['data'];
        } else {
          this.avisoSAPBoolean = false
        }
      },
      error: (err) => {
        console.log('error obtenerAvisoSAP', err);
      }
    });
  }

  getAvisoSGO() {
    this.restSvc.get(`api/consulta-avisoSGO/af1d302e-42ac-34dc-af02-c48ab029f363`).subscribe({
      next: (data) => {
        if (data['data']) {
          this.avisoSGOBoolean = true
          this.dataAvisoSGO = data['data'];
        } else {
          this.avisoSGOBoolean = false
        }
      },
      error: (err) => {
        console.log('error obtenerAvisoSAP', err);
      }
    });
  }

  downloadFile(doc) {
    const toBeReplaced = '/app/public/'
    const linkSource = doc.rutaRadiDocumento.replace(toBeReplaced, environment.apiUrl) + doc.nombreRadiDocumento;
    const link = document.createElement('a');
    link.href = linkSource;
    link.download = '';
    link.click();
  }

  parseDate(dateString: string): Date | null {
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  }

  getDate() {
    let fecha = new Date();
    let desdeStr = `${fecha.getFullYear()}-${(
      "0" +
      (fecha.getMonth() + 1)
    ).slice(-2)}-${fecha.getDate()}`;
    return desdeStr;
  }

  /**
   * Fuincion que cambia el estado de ver mas en Documentos
   * @param status // Estado
   * @param module // Modulo a consultar
   */
  seeMoreAndLess(status, module) {
    if (status) {
      this.numberLimitHistory = this.dataRowsHistorico.length;

    } else {
      this.numberLimitHistory = this.minLimit;
    }
    // Asigna el valor contrario
    this.statusSeeHistory = !this.statusSeeHistory;

  }

  // modals

  openDialogCreacionContactos() {

    const dialogRef = this.dialog.open(CreacionContactosComponent, {
      data: this.currentId,
      width: '1200px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  openDialogSAP() {
    const dialogRef = this.dialog.open(AvisosSapSgoModalComponent, {
      data: { aviso: this.dataAvisoSAP }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSGO() {
    const dialogRef = this.dialog.open(AvisosSapSgoModalComponent, {
      data: { aviso: this.dataAvisoSGO }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /** HU 003 - Devolver PQRS o solicitud */
  openDevolverSolicitud(isProyector) {
    this.modal.open(DevolverSolicitudComponent, {
      title: 'Rechazar solicitud',
      data: {
        isProyector: isProyector,
        id: this.activatedRoute.snapshot.params['id']
      },
      void: () => {
        this.toast.open({
          title: 'Devolución éxitosa',
          description: 'La solicitud ha sido rechazada con éxito.'
        })
      },
    });
  }
  /**END HU 003 - Devolver PQRS o solicitud */

  /** HU 004 - Solicitar autorización para devolución fuera de tiempo permitido */
  /** HU 015 - Solicitar autorización para transaccion en sap */
  openSolicitarAutorizacionDevolucionComponent() {
    this.modal.open(SolicitarAutorizacionDevolucionComponent, {
      title: 'Solicitar autorización',
      data: {
        id: this.activatedRoute.snapshot.params['id'],
        from: 'solicitar',
        pqrs: this.currentItem
      },
      void: () => {
        this.toast.open({
          title: 'Solicitud de autorización enviada',
          description: 'La solicitud ha sido enviada con éxito.'
        })
      },
    }, "50%");
  }

  /** HU 006 - Realizar Clasificación interna de una PQRS o solicitud - Tipificar */
  openClasificacionInternaComponent() {
    this.modal.open(ClasificacionInternaComponent, {
      title: 'Realizar tipificación',
      void: () => {
        this.modal.openNotify('Mensaje', 'Clasificacion interna realizada con éxito', true)
      },
      data: {
        idRadicado: [parseInt(this.activatedRoute.snapshot.params['id'])]
      }
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    });
  }

  /** HU 008 - Asignar PQRS o solicitud */
  openAsignarPqrs() {
    this.modal.open(AsignarPqrsComponent, {
      data: [this.activatedRoute.snapshot.params['id']],
      title: 'Asignar solicitud',
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    });
  }

  /** HU 009 - Reasignar PQRS o solicitud a analista para su trámite */
  openReasignarAnalistaPqrs() {
    this.modal.open(ReasignarAnalistaComponent, {
      title: 'Reasignar a analista',
      data: {
        solicitudesSelected: [parseInt(this.activatedRoute.snapshot.params['id'])]
      },
      void: () => {
        this.toast.open({ title: 'Asignación exitosa', duration: 2000, success: true });
        this.router.navigate(['/pqrs/log-pqrs-index']);
      },
    });
  }

  /** HU 010 - Reclasificación o retipificacion interna de la PQRS o solicitud */
  openRetipificacionPqrs() {
    this.modal.open(RetipificacionPqrsComponent, {
      title: 'Realizar retipificación',
      data: {
        idRadicado: [parseInt(this.activatedRoute.snapshot.params['id'])]
      },
      void: () => {
        this.toast.open({
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

  /** HU 011 - Listar la clasificación documental y asociar documentos al expediente **/
  associateDocumentAction() {
    this.isExpedienteListVisible = true;
    this.isAssociatedExpedientesVisible = false;
  }

  /** HU 012 - Gestionar traslado por competencia **/
  openModalGestionarTraslado() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.router.navigate([`/pqrs/pqrs-view/${this.currentId}/gestionar-traslado`])
    })
  }

  /** HU 013 - Asociar varias PQRS o solicitudes de una cuenta contrato para unificar respuesta **/
  openModalAsociarSolicitudes(): void {
    const dialogRef = this.modal.open(AsociarSolicitudesHu13Component, {
      title: 'Solicitudes asociadas',
      width: '1500px',
      id: this.activatedRoute.snapshot.params['id']
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        this.toast.open({
          title: 'Solicitudes asociadas',
          description: 'Las solicitudes fueron asociadas con éxito.'
        });
        window.location.reload()
      }, 2000);
    });
  }

  /** HU 014 - Gestionar Desistimiento **/
  openModalGestionarDesistimiento() {
    this.modal.open(GestionarDesistimientoComponent, {
      title: 'Gestionar desistimiento',
      void: () => {
        this.toast.open({
          title: 'Desistimiento generado',
          description: 'Las solicitudes generada con éxito'
        })
      },
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    });
  }

  /** HU 014 - Gestionar Peticiones Incompletas */
  openPeticionIncompleta() {
    this.router.navigate([`/pqrs/pqrs-view/${this.currentId}/peticion-incompleta`])
  }

  // HU 016 - Aprobación de solicitud para ejecutar transacción en SAP
  openFormularioTransaccionSap() {
    this.modal.open(SolicitarAutorizacionDevolucionComponent, {
      title: 'Aprobación de solicitud',
      data: {
        id: this.activatedRoute.snapshot.params['id'],
        from: 'aprobar',
        pqrs: this.currentItem
      },
    }, "50%").afterClosed().subscribe(result => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    });;
  }

  /** HU 019 - Gestionar Prórroga */
  openModalGestionarProrroga() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.modal.open(GestionarProrrogaComponent, {
        data: {
          title: "AMPLIACIÓN DE TERMINOS",
          id: this.currentId,
          dateVencimiento: this.currentItem.fechaVencimientoRadiRadicados,
        },
        void: () => {
          this.router.navigate(['/pqrs/log-pqrs-index']);
          this.toast.open({
            title: "Envío exitoso",
          });
        },
      });
    })
  }

  /* HU 021 */
  openAprobarSolicitudDialog() {
    if (this.currentItem.estado.id !== 11 && this.currentItem.estado.id !== 12) {
      this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
        this.restSvc.get(`api/autorizaciones?radicado_id=${this.currentId}`)
          .subscribe({
            next: (res) => {
              this.restSvc.put(`api/autorizacion`, res[0]['id'], { estado: "Aprobada" })
                .subscribe({
                  next: (res) => {
                    this.modal.openNotify(
                      "",
                      "Aprobación exitosa",
                      false
                    );
                    this.toast.open({
                      title: 'Solicitud aprobada',
                      description: 'La solicitud fue aprobada con éxito'
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  },

                  error: (err: any) => {
                    console.log(err);
                    this.modal.openNotify(
                      "Aviso",
                      `Hubo un error, intente más tarde`,
                      false
                    );
                  },
                })
            },
            error: (err: any) => {
              this.toast.open({
                title: '',
                description: `Ha ocurrido un error al consultar las autorizaciones pendientes`,
                success: false,
                duration: 5000,
              })
            },
          })
      });
    } else {
      this.modal.openNotify(
        "Aviso",
        `Esta solicitud ya fue aprobada o rechazada`,
        false
      );
    }
  }

  /** HU 023 - Elaborar comunicación de respuesta al solicitante, HU 024 - Adjuntar archivos */
  redirectProyectarRespuesta() {
    this.router.navigate([`/pqrs/pqrs-view/${this.currentId}/proyectar-respuesta`])
  }

  redirectRespuestaProyectada() {
    this.router.navigate([`/pqrs/pqrs-view/${this.currentId}/ver-respuesta-proyectada/${this.currentItem.radicado_salida_id}`])
  }

  /** HU 027 - Gestionar solicitud de Visto Bueno, Aprobación y Firma */
  solicitudVistoBueno() {
    this.router.navigate(['pqrs/pqrs-solicitud-visto-bueno/', this.activatedRoute.snapshot.params['id']]);
  }

  // Método para abrir el modal de asociar documentos y manejar la lógica de asociación
  openModalAsociarDocumentoExpediente() {

    const dialogRef = this.modal.open(IncludeInFileComponent, {
      data: [
        {
          "id": parseInt(this.activatedRoute.snapshot.params['id'])
        }
      ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.isExpedienteListVisible = false;
        this.isAssociatedExpedientesVisible = true;
        this.modal.openNotify('Mensaje', 'Documento asociado exitosamente al expediente seleccionado', true)
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    });
  }

  /** HU 030 - Radicados con varias cuentas contrato y agregar o editar cuentas contrato en un radicado */
  solicitudCreacionContacto() {
    this.router.navigate([`/pqrs/pqrs-view/${this.currentId}/creacion-contactos/`])
  }

  /** HU 031 - Gestionar solicitud de Visto Bueno, Aprobación y Firma */
  rechazoVistoBueno() {
    this.router.navigate(['pqrs/pqrs-rechazo-visto-bueno/', this.activatedRoute.snapshot.params['id']]);
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Abre el modal para rechazar una solicitud de ampliación de términos.
   * 
   * Si la solicitud ya fue aprobada o rechazada, muestra un mensaje de aviso.
   * En caso contrario, abre el modal de rechazo y, si se completa exitosamente, 
   * vuelve a cargar la página actual.
   */
  /******  6607e61c-2dff-4b9e-906d-1f53cf43fcce  *******/

  openRechazarSolicitudDialog() {
    if (this.currentItem.estado.id !== 11 && this.currentItem.estado.id !== 12) {
      this.modal.open(RechazarSolicitudComponent, {
        data: {
          title: "RECHAZANDO SOLICITUD DE AMPLIACIÓN DE TÉRMINOS",
          id: this.currentId
        },
        void: () => {
          setTimeout(() => {
            this.router.navigate(['/pqrs/log-pqrs-index']);
          }, 2000);
        },
      });
    } else {
      this.modal.openNotify(
        "Aviso",
        `Esta solicitud ya fue aprobada o rechazada`,
        false
      );
    }
  }


  openDesaprobarRadicadoDialog() {
    this.dialog.open(DesaprobarRadicadoComponent, {
      width: '350px',
      data: {
        radicado_id: this.activatedRoute.snapshot.params['id'],
      }
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        this.router.navigate(['/pqrs/log-pqrs-index']);
      }, 2000);
    });;
  }

  openAprobarRadicadoDialog() {
    this.dialog.open(AprobarRadicadoComponent, {
      data: {
        radicado_id: this.activatedRoute.snapshot.params['id'],
      }
    }).afterClosed().subscribe(result => {
      setTimeout(() => {
        this.router.navigate(['/pqrs/log-pqrs-index']);
      }, 2000);
    });;
  }

  openAsociarDesasociar(desasociar) {
    let data = {
      radicado_id: this.activatedRoute.snapshot.params['id'],
      asociados: this.selectedRows$.map(item => item.idRadicado),
      desasociar: desasociar
    }
    let ref = this.dialog.open(AsociarSolicitudesHu13ConfirmComponent, {
      data,
      disableClose: true
    });
    ref.afterClosed().subscribe(() => {
      if (ref.componentInstance.data.isClosedWithCancelButton) {
        this.toast.open({
          title: 'Cancelación exitosa',
          description: ``,
          success: true,
          duration: 3000,
        })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }


  /**
   * Funcion que incluye los radicados a expedientes hu11
   * @param dataObserva
   */

  transactionIncludeFiles(dataObserva) {
    console.log("entro", dataObserva);

    let params = {
      data: dataObserva.data,
      ButtonSelectedData: this.currentItem
    };
    this.restSvc.post('radicacion/transacciones/include-expedient', params).subscribe({
      next: (res) => {
        this.toast.open({ title: 'Archivo incluido exitosamente', success: true, duration: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (err) => { }
    });
  }
}

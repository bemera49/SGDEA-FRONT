import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "@app/interfaces/direccion.interface";
import { TranslateService } from "@ngx-translate/core";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { FloatingButtonService } from "src/app/services/floating-button.service";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { TransaccionesService } from "src/app/services/transacciones.service";
import { environment } from "src/environments/environment";
import swal from "sweetalert2";
import { ActivateTranslateService } from "../../../services/activate-translate.service";
import { FilingCreateDetailResolutionComponent } from "../filing-create-detail-resolution/filing-create-detail-resolution.component";

//HU030 - Radicados con varias cuentas contrato y agregar o editar cuentas contrato en un radicado.
import { CreacionContactosComponent } from "../../../modules/pqrs/radicados-cuenta-contrato/creacion-contactos/creacion-contactos.component";

import { NivelPrioridad } from "@app/interfaces/radicados/nivel-prioridad";
import { ResNivelesPrivacidad } from "@app/interfaces/radicados/nivel-privacidad.interface";
import { TipoNotificacion } from "@app/interfaces/radicados/tipo-notificacion.interface.";
import { RadicadosService } from "@app/services/radicados/radicados.service";
import { ToastService } from "@app/services/toast/toast.service";
import moment from "moment";
import { ChangeChildrenService } from "@app/services/change-children.service";
import { ModalService } from "@app/services/modal/modal.service";

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: "app-filing-form",
  templateUrl: "./filing-form.component.html",
  styleUrls: ["./filing-form.component.css"],
})
export class FilingFormComponent implements OnInit, OnDestroy {
  @Output() public submitFormEmit = new EventEmitter<any>();
  @Output() public menuReceiveDataEmit = new EventEmitter<any>();
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Nombre de tarjetas del formulario
  @Input() textForm = "Formulario principal de radicación";
  //
  @Input() textForm2 = "Destinatario";
  //
  @Input() textForm3 = "Información de Radicado";
  //
  @Input() textForm4 = "Responsable";
  //
  @Input() textForm5 = "Información de cuenta contrato";

  //actos administrativos
  @Input() textForm6 = "Nivel de Acceso";
  @Input() textForm7 = "Notificacion";
  @Input() textForm8 = "Tipo de Prioridad";

  // Iconos del formulario
  @Input() initCardHeaderIcon = "description";
  @Input() initCardHeaderIconDatos = "library_books";
  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    { name: "Radicación estándar", route: "/filing/filing-index/false" },
  ];
  @Input() breadcrumbRouteActive = "Formulario principal";
  @Input() messageUnderConstruction = "funcionalidad en construcción";

  @Input() tipoRadicado: any;

  textFormAttachment = "Cargar anexos";
  maxRowsFilesAttachment: number = 5;
  showButtonCleanAttachment: boolean = true;
  showButtonClearAttachment: boolean = true;
  showCreateDireccion: boolean = true;
  editorContent = "";
  direccionCliente = "";
  firmaRadiRadicado = null;

  /** Data seleccionada en la tabla principal */
  @Input() dataIdRadicados: any = [];

  textNumeroRadicadoOConsecutivo: string = "Número radicado";

  showAgenda: boolean = false; // Muestra el input de fecha
  showReasignacion: boolean = false; // Muestra los inputs de reasignacion
  showVOBO: boolean = false; // Muestra los inputs de VOBO (Visto bueno)
  showCopyInformaded: boolean = false; // Muestra los inputs de copiar informado
  textFormObservaHeader: string = ""; // Titulo del botón inteligente tambien titulo del dialog observacion
  operationDialogObserva: string; // operacion que se utiliza para las trasferencias
  editorActivo: boolean = false;
  today: Date = new Date();
  // No Radicado
  booleanRadicado: boolean = false;
  NoRadicado: any;
  // Valida typo
  validTextType: boolean = false;
  isCooperative: boolean = false;
  isToclone: boolean = false;

  tittleCliente: string = "filingModule.selectRemitente";
  tittleNewCliente: string = "new";
  tittleCardCliente: string = "Información Adicional";

  statusModalMain: boolean = false; // Muestra el componente de Programacion Agenda
  statusModalUploadFile: boolean = false; // Muestra el componente de Envio de Documentos

  ruoteServiceDocuments: string =
    environment.apiUrl +
    environment.versionApiDefault +
    "radicacion/transacciones/upload-file";
  eventClickButtonSelectedData: any;

  // Variable del formulario
  moduleForm: any; // FormGroup;
  // Autentificacion
  authorization: string;
  // Version api
  versionApi = environment.versionApiDefault;
  // Ruta a redirigir
  redirectionPath = "/filing/filing-index/false";
  remitentes: UntypedFormArray;
  // Variable para la divicion de información adicional de remitentes
  modelClientes: any; // Variable para guardar lis remitentes
  statusRemitenteMultiple: boolean = false; // Muestra el selector multiple de remitentes
  statusRemitente: boolean = false; // muestra scroll y formArray de remitentes
  codigoTipoRadicado: any; // Código del tipo de radicado puede ser numero o string

  statusModalIncludeInFile: boolean = false; // Status del modal incluir en expediente

  // Variables de consumo de servicios
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  resServices: any;
  resServicesErr: any;
  resErrServices: any;
  resServicesSoliVobo: any;
  resServicesSoliVoboErr: any;
  resServicesVobo: any;
  resServicesVoboErr: any;
  resServicesReasign: any;
  resServicesReasignErr: any;
  resServicesAnnulment: any;
  resServicesAnnulmentErr: any;
  resServicesDiscardConsecutive: any;
  resServicesDiscardConsecutiveErr: any;
  resServicesCopyInfo: any;
  resServicesCopyInfoErr: any;
  resServicesFinalizeFiling: any;
  resServicesFinalizeFilingErr: any;
  resServicesReturnFiling: any;
  resServicesReturnFilingErr: any;
  resServicesSchedule: any;
  resServicesScheduleErr: any;
  resServicesFuncionariosRadicado: any;
  resServicesFuncionariosRadicadoErr: any;
  resServicesNivelGeografico2: any;
  resServicesNivelGeografico2Err: any;
  resServicesNivelGeografico3: any;
  resServicesNivelGeografico3Err: any;
  resServicesVerificarDocNit: any;
  resServicesVerificarDocNitErr: any;
  resServicesVerificarCorreo: any;
  resServicesVerificarCorreoErr: any;
  resServicesDependencias: any;
  resServicesDependenciasErr: any;
  resServicesDestinatario: any;
  resServicesDestinatarioErr: any;
  resServicesVencimiento: any;
  resServicesVencimientoErr: any;
  resServicesSendEmailCli: any;
  resServicesSendEmailCliErr: any;
  resServicesDownloadDocumentPackage: any;
  resServicesDownloadDocumentPackageErr: any;
  resSerIncludeFiles: any;
  resSerIncludeFilesErr: any;
  resSerRemitenteByEmail: any;
  resSerRemitenteByEmailErr: any;
  resSerShippingReady: any;
  resSerShippingReadyErr: any;
  resSerlistGeneralPQRS: any;
  resSerlistGeneralPQRSErr: any;
  resSerPrintStickers: any;
  resSerPrintStickersErr: any;
  resSerWithdrawal: any;
  resSerWithdrawalErr: any;
  resSerListClientes: any;
  resSerListClientesErr: any;
  resServicesSendApprovalsMail: any;
  resServicesSendApprovalsMailErr: any;

  // Variables para el boton flotante
  iconMenu: string = "save";
  @Input() menu: string = "";

  /** Variables para radicacion mail */
  @Input() radicacionEmail: boolean = false; // Status si modulo radicación email
  @Input() affairStatus: boolean = false; // Status si el asunto es uno solo
  @Input() affairmsg: string; // Mensaje del asunto
  @Input() fromAddressEmail: string; // Remitente

  isMailRecordExists = false;
  idMailRemitente: any;

  /** Variables para internacionalizacion */
  activeLang: string;
  languageReceive: any;
  subscriptionTranslateService$: Subscription;

  /** Variable que controla botón flotante */
  menuButtonsSelectOne: any = [];
  @Input() menuButtons: any = this.menuButtonsSelectOne;

  // Variable para tener la ruta que ejecuta VOBO
  routeVobo = this.versionApi + "radicacion/transacciones/solicita-vobo";

  /** Variables para traer el texto de confirmacion */
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;
  editMode: boolean;

  /** Variables para los campos adicionales de un remitente cuando es nuevo y el tipo de radicado es PQRSD */
  statusNewPQRSD: boolean = false; // Muestra los campos adicionales del remitente
  statusAutoriza: boolean = false; // Muestra el campo de autoriza
  statusAutorizaPolitica: boolean = false; // Muestra el campo de autoriza politica

  /** Variables para llamarlas listas del formulario */
  resSerlistGeneral: any;
  resSerlistGeneralErr: any;
  resSerSeries: any;
  resSerSeriesErr: any;
  resSerSubseries: any;
  resSerSubseriesErr: any;
  resSerTipoDocumental: any;
  resSerTipoDocumentalErr: any;
  resServicesSgdeaScan: any;
  resServicesSgdeaScanErr: any;

  listSeries: any; // Series
  listSubseries: any; // Subseries
  listTipoDocumental: any; // Tipos documentales
  listTipoRespuesta: any; // Tipos documentales
  listMediorespuesta: any; // Tipos de medio respuesta
  listTipoComunicado: any; // Tipos Comunicado
  listCliente: any; // Clientes
  listTipoPersona: any; // Tipo Persona
  listTipoIdentificacion: any = []; // Tipo de remitente
  listTipoTramite: any = []; // Tipo de tramite
  listTipoPersonaNewRemi: any = []; // Tipo Persona nuevo remitente sin funcionario
  listTipoRadicado: any; // Tipos Radicados
  listTipoRadicadoActosAdmin: any; // Tipos Radicados actos administrativos
  listNumRadicado: any; // Numeros Radicados
  listTramites: any; // Tramites
  bisOptions: any = [
    { value: "SI", viewValue: "SI" },
    { value: "NO", viewValue: "NO" },
  ];
  listTramitador: any; // Usuario tramitador
  listMedioRecepcion: any; // Medios de recepcion
  listDependencias: any; // Dependencias
  listFuncionarios: any; // Funcionarios
  listGenero: any; // Genero
  listRangoEdad: any; // Rango de edad
  listVulnerabilidad: any; // Vulnerabilidad
  listEtnia: any; // Etnia
  listTipoAnexo: any;
  tiposOrigenOptions: any = [];

  /** Nivel Geografico  */
  listNivelGeografico1: any;
  listNivelGeografico2: any;
  listNivelGeografico3: any;

  /** lists filtered + nombrelista by search keyword */
  filteredlistSeries: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistSubseries: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTipoDocumental: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistCliente: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTipoPersona: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filterdIdTipoIdentificacion: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTipoRespuesta: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistMedioRespuesta: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistTipoRadicado: Array<ListaBusq> = [];
  filteredlistTipoComunicacion: Array<ListaBusq> = [];
  filteredlistNumRadicado: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTramites: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTramitador: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistMedioRecepcion: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistTipoTramite: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistDependencias: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistFuncionarios: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistGenero: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistRangoEdad: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistVulnerabilidad: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistEtnia: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistTipoAnexo: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistNivelGeografico1: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistNivelGeografico2: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);
  filteredlistNivelGeografico3: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  /** slide-toggle  */
  color: ThemePalette = "primary";
  colorAu: ThemePalette = "primary";
  checked = false;
  disabled = false;
  disabledSelect: boolean = true;

  hashLocalStorage: any;

  // ParamId
  paramiD: string;

  //idCliente
  idCliente: any;

  // Route Templaste
  ruoteServiceDocumentsTemplate: string =
    environment.apiUrl +
    this.versionApi +
    "radicacion/transacciones/load-format";
  // Upload Documents Anexos
  ruoteServiceDocumentsAne: string =
    environment.apiUrl +
    this.versionApi +
    "radicacion/documentos/upload-document";
  // Route Documents modal
  ruoteServiceDocumentsModal: any;
  validateFile: any = [
    { type: "xls" },
    { type: "xlsx" },
    { type: "pdf" },
    { type: "doc" },
    { type: "docx" },
  ];
  validateFileAnexos: any = environment.validateFile.anexosRadicado;
  statusUploadFileAne: boolean = false; // Muestra el modal para adjuntar anexos
  statusUploadFileAneMasive: boolean = false; // Muestra el modal para adjuntar anexos masivos
  statusSendReplyMailModal = false; // Muestra el modal de envio de respuesta por correo
  showTipoDocumental: boolean = true; // Se muestra el campo  tipo documental de anexos
  showObservacion: boolean = true; // Muestra el campo observacion de anexos
  statusNameFile: boolean = false; // Muestra el campo nombre archivo de anexos
  dataSend: any; // Data que se le envia al front de los radicados

  /** Informacion del usuario logueado */
  dataUserLogin: object = {
    id: 0,
    idGdTrdDependencia: 0,
  };

  messageIsNuevoRemitente: string = "No";
  messageAutoriza: string = "No";
  messageAutorizaPolitica: string = "No";

  // Valida mostrar el campo
  validaMultiple = false;
  titleMultiple = "Único radicado con múltiples remitentes";
  messageMultiple = "No";
  dataMultiRadi: any;
  showSenderSelect: boolean = true; // muestra la lista desplegable de remitentes y si el remitente es nuevo
  showNuevoRemitente: boolean = true; // muestra nuevo remitente
  // cuando es sin tipo documental debe ejecutar el vencimiento statusVencimientoEje = true
  statusVencimientoEje = false;
  // fecha creación del radicado
  creacionRadiRadicado = "";

  /** Las variables para mostrar la alerta informativa  */
  @Input() initialNotificationClassAlert: string =
    "alert alert-info alert-with-icon";
  @Input() initialNotificationMessageArray: any = [];

  /** Clases para selector de remitente's */
  classListOneSender = "col-lg-10 col-md-10 col-sm-12 col-xs-12";
  classListMultipleSender = "col-lg-10 col-md-10 col-sm-12 col-xs-12";

  // se utiliza para la fecha del documento
  public minDate: Date;
  public maxDate: Date;

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  tiposDeViaOptions = [
    { value: "AC", viewValue: "Avenida Calle" },
    { value: "AK", viewValue: "Avenida Carrera" },
    { value: "CL", viewValue: "Calle" },
    { value: "KR", viewValue: "Carrera" },
    { value: "DG", viewValue: "Diagonal" },
    { value: "TV", viewValue: "Transversal" },
  ];

  //actos administrativos
  public notificacionesList: TipoNotificacion[] = [];
  public nivelesPrivacidad: ResNivelesPrivacidad = { message: "", data: [] };
  public nivelPrioridadList: NivelPrioridad[] = [];

  // Letras para la dirección
  letraOptions = [
    { value: "", viewValue: "" },
    { value: "A", viewValue: "A" },
    { value: "B", viewValue: "B" },
    { value: "C", viewValue: "C" },
    { value: "D", viewValue: "D" },
    { value: "E", viewValue: "E" },
    { value: "F", viewValue: "F" },
    { value: "G", viewValue: "G" },
    { value: "H", viewValue: "H" },
    { value: "I", viewValue: "I" },
    { value: "J", viewValue: "J" },
    { value: "K", viewValue: "K" },
    { value: "L", viewValue: "L" },
    { value: "M", viewValue: "M" },
    { value: "N", viewValue: "N" },
    { value: "Ñ", viewValue: "Ñ" },
    { value: "O", viewValue: "O" },
    { value: "P", viewValue: "P" },
    { value: "Q", viewValue: "Q" },
    { value: "R", viewValue: "R" },
    { value: "S", viewValue: "S" },
    { value: "T", viewValue: "T" },
    { value: "U", viewValue: "U" },
    { value: "V", viewValue: "V" },
    { value: "W", viewValue: "W" },
    { value: "X", viewValue: "X" },
    { value: "Y", viewValue: "Y" },
    { value: "Z", viewValue: "Z" },
  ];

  // Sufijos para la dirección
  sufijoOptions = [
    { value: "", viewValue: "" },
    { value: "SUR", viewValue: "Sur" },
    { value: "ESTE", viewValue: "Este" },
  ];

  tiposAnexosFisicosOptions: any = [];
  medioRespuestaOptions: any = [];
  tipoTramitesOptions: any = [];
  tipoServiciosOptions: any = [];
  tiposSolicitudesOptions: any = [];
  direccionManual: boolean;
  tipoZonaNotificacion: boolean;
  formIncompleto: boolean;

  archivosSubidos: File[] = [];
  tipoAnexo: any = [];

  isDevolution: boolean = false;
  disabledDevelution: string = "";

  @ViewChild("imprimirRadicado", { static: false })
  imprimirRadicado: ElementRef;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private floatingButtonService: FloatingButtonService,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private activateTranslateService: ActivateTranslateService,
    public lhs: LocalStorageService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public sweetAlertService: SweetAlertService,
    public transaccionesService: TransaccionesService,
    private dialog: MatDialog,
    private http: HttpClient,
    public radicadosService: RadicadosService,
    private toastSvc: ToastService,
    private changeChildrenService: ChangeChildrenService,
    private modal: ModalService,
  ) {
    localStorage.removeItem("signature");
    //actos adminitrativos
    this.notificacionesList = [];
    this.nivelPrioridadList = [
      {
        id: 1,
        name: "Alta",
      },
      {
        id: 2,
        name: "Media",
      },
      {
        id: 0,
        name: "Baja",
      },
    ];

    this.direccionManual = false;
    this.tipoZonaNotificacion = false;
    this.formIncompleto = true;
    /** Idioma inical */
    this.detectLanguageInitial();

    /**
     * Configuración del formulario para el login
     */
    this.moduleForm = this.formBuilder.group({
      isNuevoRemitente: new UntypedFormControl(false, Validators.compose([])),

      /*** Inicio Detinatario ***/
      idCliente: new UntypedFormControl(
        "",
        Validators.compose([
          this.tipoRadicado === 2 ? Validators.required : null,
        ]),
      ),
      idCgTipoRadicado: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      tipoComunicacionId: new UntypedFormControl("", Validators.compose([])),
      idTipoTramite: new UntypedFormControl(
        "",
        Validators.compose([
          this.tipoRadicado === 2 ? Validators.required : null,
        ]),
      ),
      idTipoAnexoFisico: new UntypedFormControl("", Validators.compose([])),
      // idMedioRespuesta: new UntypedFormControl("", Validators.compose([Validators.required])),
      numeroCuentaInterna: new UntypedFormControl("", Validators.compose([])),
      bis: new UntypedFormControl("", Validators.compose([])),
      letraDos: new UntypedFormControl("", Validators.compose([])),
      letraTres: new UntypedFormControl("", Validators.compose([])),
      nPlacaDos: new UntypedFormControl("", Validators.compose([])),
      sufijoDos: new UntypedFormControl("", Validators.compose([])),
      bisNotificacion: new UntypedFormControl("", Validators.compose([])),
      letraDosNotificacionDos: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      letraTresNotificacion: new UntypedFormControl("", Validators.compose([])),
      nPlacaDosNotificacion: new UntypedFormControl("", Validators.compose([])),
      sufijoDosNotificacion: new UntypedFormControl("", Validators.compose([])),
      radicadoOrigen: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      fechaDocumentoRadiRadicado: new UntypedFormControl(
        new Date(), // Set default to current date and time
        Validators.compose([Validators.required]),
      ),
      RadiRadicadoHijos: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      unicoRadiCgTipoRadicado: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      idOrigen: new UntypedFormControl(
        "",
        Validators.compose([
          this.tipoRadicado == 2 ? Validators.required : null,
        ]),
      ),
      idTipoPersona: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      idMedioRespuesta: new UntypedFormControl(
        { value: "1", disabled: true },
        Validators.compose([]),
      ),

      //idTipoIdentificacion: new UntypedFormControl({ value: 1, disabled: true }, Validators.compose([])),
      idTipoIdentificacion: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      nombreCliente: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      numeroDocumentoCliente: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      direccionCliente: new UntypedFormControl(
        { value: "", disabled: false },
        Validators.compose([]),
      ),
      idNivelGeografico3: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      idNivelGeografico2: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      idNivelGeografico1: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([]),
      ),
      correoElectronicoCliente: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([Validators.email]),
      ),
      telefonoCliente: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([
          // Validators.required
        ]),
      ),
      celular: new UntypedFormControl(
        { value: "", disabled: true },
        Validators.compose([
          // Validators.required
        ]),
      ),
      tipoZona: new UntypedFormControl(
        false,
        Validators.compose([
          // Validators.required
        ]),
      ),
      tipoZonaNotificacion: new UntypedFormControl(
        false,
        Validators.compose([
          // Validators.required
        ]),
      ),
      CityCode: new UntypedFormControl("", []),
      remitentes: this.formBuilder.array([]),

      /*** Inicio PQRSD Detinatario ***/
      generoClienteCiudadanoDetalle: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      rangoEdadClienteCiudadanoDetalle: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      vulnerabilidadClienteCiudadanoDetalle: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      etniaClienteCiudadanoDetalle: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      isCiudadano: new UntypedFormControl(
        false,
        Validators.compose([
          // Validators.required
        ]),
      ),
      /*** Fin PQRSD Detinatario ***/

      /*** Fin Detinatario ***/

      /*** Inicio Información radicado ***/
      idGdTrdSerie: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idGdTrdSubserie: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      idTrdTipoDocumental: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idTramites: new UntypedFormControl(
        "0",
        Validators.compose([
          // Validators.required
        ]),
      ),
      PrioridadRadiRadicados: new UntypedFormControl(
        null,
        Validators.compose([
          //Validators.required
        ]),
      ),
      PrioridadDevolucion: new UntypedFormControl(
        false,
        Validators.compose([
          // Validators.required
        ]),
      ),
      PrioridadInsistencia: new UntypedFormControl(
        false,
        Validators.compose([
          // Validators.required
        ]),
      ),
      idCgMedioRecepcion: new UntypedFormControl(
        // this.tipoRadicado == 2 ? "" : "9",
        // this.tipoRadicado == 2 ? Validators.required : null
        Validators.compose([]),
      ),
      asuntoRadiRadicado: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      codigoPostal: new UntypedFormControl({ value: "", disabled: true }),
      // idMedioRespuesta: new UntypedFormControl({ value: "", disabled: true }, Validators.compose([])),
      direccionManualCuentaContrato: new UntypedFormControl(
        false,
        Validators.compose([]),
      ),

      // Vencimiento
      fechaVencimientoRadiRadicados: new UntypedFormControl(
        { value: "", disabled: false },
        Validators.compose([]),
      ),
      foliosRadiRadicado: new UntypedFormControl(
        { value: "0", disabled: false },
        Validators.compose([]),
      ),
      descripcionAnexoRadiRadicado: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      // Dias Restantes
      diasRestantes: new UntypedFormControl(
        15,
        Validators.compose([
          // Validators.required
        ]),
      ),
      observacionRadiRadicado: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      /*** Inicio Información radicado PQRSD ***/
      autorizacionRadiRadicados: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      /*** Fin Información radicado PQRSD ***/

      /*** Fin Información radicado ***/

      // Dependencia
      idTrdDepeUserTramitador: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      // Funcionarios
      user_idTramitador: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      // tipo servicio
      //tipoServicioId: new UntypedFormControl("", Validators.compose([Validators.required])),

      /** Campos para hacer la busqueda en las listas este deben llamarse
       * Como las listas  "nombreLista + Filter"
       */

      listSeriesFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listSubseriesFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTipoComunicacionFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTipoDocumentalFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listClienteFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTipoPersonaFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTipoIdentificacion: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listNumRadicadoFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTipoRadicadoFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTramitesFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listTramitadorFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listMedioRecepcionFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listNivelGeografico3Filter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listMedioRespuesta: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),

      listNivelGeografico2Filter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listNivelGeografico1Filter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listDependenciasFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listFuncionariosFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listGeneroFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listRangoEdadFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listVulnerabilidadFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),
      listEtniaFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),

      listTipoAnexoFilter: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),

      fileUpload: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),

      aceptaPolitica: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.required
        ]),
      ),

      //notificaciones
      direccionNotificacion: new UntypedFormControl("", Validators.compose([])),

      //PQRS
      numeroRadicadoExterno: new UntypedFormControl(
        "",
        Validators.compose([
          // Validators.pattern('^[0-9]*$')
        ]),
      ),
      numeroCuentaContrato: new UntypedFormControl("", Validators.compose([])),

      tipoRespuestaId: new UntypedFormControl("", Validators.compose([])),
      contactoSap: new UntypedFormControl("", Validators.compose([])),
      direccion: new UntypedFormControl("", Validators.compose([])),
      tipoDeVia: new UntypedFormControl("", Validators.compose([])),
      numVia: new UntypedFormControl("", Validators.compose([])),
      letra: new UntypedFormControl("", Validators.compose([])),
      sufijo: new UntypedFormControl("", Validators.compose([])),
      nPlaca: new UntypedFormControl("", Validators.compose([])),
      complemento: new UntypedFormControl("", Validators.compose([])),
      zona: new UntypedFormControl(
        "",
        Validators.compose([
          Number(this.tipoRadicado) === 2 ? Validators.required : null,
        ]),
      ),
      tipoDeViaNotificacion: new UntypedFormControl("", Validators.compose([])),
      numViaNotificacion: new UntypedFormControl("", Validators.compose([])),
      letraNotificacion: new UntypedFormControl("", Validators.compose([])),
      sufijoNotificacion: new UntypedFormControl("", Validators.compose([])),
      nPlacaNotificacion: new UntypedFormControl("", Validators.compose([])),
      complementoNotificacion: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      tipoSolicitudId: new UntypedFormControl(
        "",
        Validators.compose([
          Number(this.tipoRadicado) === 2 ? Validators.required : null,
        ]),
      ),

      tipoServicioId: new UntypedFormControl(
        "",
        Validators.compose([
          Number(this.tipoRadicado) === 2 ? Validators.required : null,
        ]),
      ),
      cuentaConAnexos: new UntypedFormControl(false),

      //actos administrativos
      idTipoPrioridad: new UntypedFormControl("", Validators.compose([])),
      idNivelPrivacidad: new UntypedFormControl("", Validators.compose([])),
      idTipoNotificacion: new UntypedFormControl("", Validators.compose([])),
      // cuentaConAnexos: new UntypedFormControl(false),
      // anexos: new UntypedFormControl(null),
      // tipoAnexo: new UntypedFormControl('', Validators.compose([])),
    });

    this.hashLocalStorage = this.authService.decryptAES(
      localStorage.getItem(environment.hashSgdea),
    );
  }

  filingCreate: boolean = false;
  ngOnInit() {
    this.actualizarHora();

    this.moduleForm.controls["fechaDocumentoRadiRadicado"].disable();
    if (Number(this.tipoRadicado) === 2) {
      this.camposRequeridos("2", true);
      this.editorActivo = false;
    } else {
      this.moduleForm.controls["idCgMedioRecepcion"].setValue(9);
    }

    if (this.tipoRadicado == "actoAdmin") {
      this.camposRequeridos("actoAdmin", true);
    }

    if (this.moduleForm.controls["idCgTipoRadicado"].value == 2) {
      this.moduleForm.controls["idCgMedioRecepcion"].setValidators([
        Validators.required,
      ]);
      this.moduleForm.get("idCgMedioRecepcion").updateValueAndValidity();
    }
    this.getNivelesPrivacidad(); // trae los tipo de notificaciones
    this.getNotificaciones(); // trae los tipos de notificaciones
    // this.getTipoAnexo();
    if (
      this.route.snapshot.url[0].path == "filing-create" ||
      this.route.snapshot.url[0].path == "filing-update"
    ) {
      this.filingCreate = true;
      this.editorActivo = false;
    }
    if (this.route.snapshot.url[0].path == "filing-update") {
      this.editorActivo = true;
    }

    if (this.moduleForm.controls["idMedioRespuesta"].value == 1) {
      this.moduleForm.controls["direccionCliente"].setValidators([
        Validators.required,
      ]);
      this.moduleForm.controls["correoElectronicoCliente"].setValidators([]);
      this.moduleForm.controls["direccionCliente"].updateValueAndValidity();
      this.moduleForm.controls[
        "correoElectronicoCliente"
      ].updateValueAndValidity();
    }

    // if (this.moduleForm.controls["idMedioRespuesta"].value == 2) {
    // this.moduleForm.controls["direccionCliente"].setValidators([]);
    // this.moduleForm.controls["correoElectronicoCliente"].setValidators([Validators.required]);
    // this.moduleForm.controls["correoElectronicoCliente"].updateValueAndValidity();
    // this.moduleForm.controls["direccionCliente"].updateValueAndValidity();
    // }

    let checked = this.moduleForm.controls["autorizacionRadiRadicados"].value;
    if (checked) {
      this.moduleForm.controls["idMedioRespuesta"].setValue(2); // Correo Electrónico
      this.moduleForm.controls["correoElectronicoCliente"].setValidators([
        Validators.required,
        Validators.email,
      ]);
      // this.moduleForm.controls["direccionCliente"].clearValidators();
    } else {
      this.moduleForm.controls["idMedioRespuesta"].setValue(1); // Personal
      // this.moduleForm.controls["direccionCliente"].setValidators([Validators.required]);
      this.moduleForm.controls["correoElectronicoCliente"].clearValidators();
    }
    this.moduleForm.controls[
      "correoElectronicoCliente"
    ].updateValueAndValidity();
    // this.moduleForm.controls["direccionCliente"].updateValueAndValidity();

    //   elements.forEach(element => {
    //     element.removeAttribute('aria-owns');
    //   });
    // });

    this.getOptionsService();
    // Hace el llamado del token
    this.getTokenLS();
    /** Detectando si se ejecuta cambio de idioma */
    this.detectLanguageChange();
    // Start listen for search field value changes
    // Series
    this.moduleForm.controls["listSeriesFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listSeries");
      });
    // Subseries
    this.moduleForm.controls["listSubseriesFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listSubseries");
      });
    // Tipos documentales
    this.moduleForm.controls["listTipoDocumentalFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoDocumental");
      });
    // Clientes
    this.moduleForm.controls["listClienteFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listCliente");
      });
    // Num radicados
    this.moduleForm.controls["listNumRadicadoFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNumRadicado");
      });
    // Tipos radicados
    this.moduleForm.controls["listTipoRadicadoFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoRadicado");
      });
    // Tipos comunicacion
    this.moduleForm.controls["listTipoComunicacionFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoComunicado");
      });
    // Tramites
    this.moduleForm.controls["listTramitesFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTramites");
      });
    // Usuario Tramitador
    this.moduleForm.controls["listTramitadorFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTramitador");
      });
    // Medios de recepcion
    this.moduleForm.controls["listMedioRecepcionFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listMedioRecepcion");
      });
    // Dependencias
    this.moduleForm.controls["listDependenciasFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listDependencias");
      });
    // Funcionarios
    this.moduleForm.controls["listFuncionariosFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listFuncionarios");
      });
    // Tipo de persona
    this.moduleForm.controls["listTipoPersonaFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoPersona");
      });
    // Tipo de identificacion
    // if (this.moduleForm.controls["listTipoIdentificacion"]) {
    this.moduleForm.controls["listTipoIdentificacion"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoIdentificacion");
      });
    // }
    // Nivel geografico 1 - Pais
    this.moduleForm.controls["listNivelGeografico1Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico1");
      });
    // Nivel geografico 2 - Departamento
    this.moduleForm.controls["listNivelGeografico2Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico2");
      });
    // Nivel geografico 3 - Municipio
    this.moduleForm.controls["listNivelGeografico3Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico3");
      });
    /** End search field value changes*/

    // Medio de recepción
    this.moduleForm.controls["listMedioRespuesta"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoPersona");
      });
    /** End search field value changes*/

    /** Start Information PQRSD */
    // Valida si el tipo de PQRSD yt el remitente es nuevo
    if (this.statusNewPQRSD) {
      // Lista Genero
      this.moduleForm.controls["listGeneroFilter"].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks("listGenero");
        });
      // Lista Rango de edad
      this.moduleForm.controls["listRangoEdadFilter"].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks("listRangoEdad");
        });
      // Lista Vulnerabilidad
      this.moduleForm.controls["listVulnerabilidadFilter"].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks("listVulnerabilidad");
        });
      // Lista Etnia
      this.moduleForm.controls["listEtniaFilter"].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks("listEtnia");
        });

      // Dependencias
      this.moduleForm.controls["listTipoAnexoFilter"].valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks("listTipoanexo");
        });

      this.moduleForm.controls["generoClienteCiudadanoDetalle"].setValidators([
        Validators.required,
      ]);
      this.moduleForm.controls[
        "rangoEdadClienteCiudadanoDetalle"
      ].setValidators([Validators.required]);
      this.moduleForm.controls[
        "vulnerabilidadClienteCiudadanoDetalle"
      ].setValidators([Validators.required]);
      this.moduleForm.controls["etniaClienteCiudadanoDetalle"].setValidators([
        Validators.required,
      ]);

      // this.moduleForm.controls['autorizacionRadiRadicados'].setValidators([Validators.required]);
    }
    /** End Information PQRSD */

    /** Start email Filign */
    if (this.radicacionEmail) {
      // Se asigna correo electronico
      this.moduleForm.controls["idCgMedioRecepcion"].setValue(
        environment.medioRecepcion.correoElectronico,
      );
      this.moduleForm.controls["idCgMedioRecepcion"].disable();
    }

    this.validarSiClonado();

    /* if (this.affairStatus) {
      this.moduleForm.controls["asuntoRadiRadicado"].setValue(this.affairmsg);
    } */
    // verifica si un estado (this.affairStatus) es verdadero y de ser así, limpia this.affairmsg de emojis y establece el texto limpio en el campo asuntoRadiRadicado del formulario.
    if (this.affairStatus) {
      const cleanedText = this.removeEmojis(this.affairmsg);
      this.moduleForm.controls["asuntoRadiRadicado"].setValue(cleanedText);
    }
    /** End email Filign */
  }

  actualizarHora() {
    if (!this.paramOID) {
      setInterval(() => {
        this.moduleForm.controls["fechaDocumentoRadiRadicado"].setValue(
          new Date(),
          { emitEvent: false },
        );
      }, 1000);
    }
  }

  private camposRequeridos(controlsToValidate: string, required: boolean) {
    let fields = [];
    switch (controlsToValidate) {
      case "actoAdmin":
        fields = [
          "idNivelPrivacidad",
          "idTipoNotificacion",
          "idTramites",
          "idGdTrdSerie",
          "idGdTrdSubserie",
          "idTrdTipoDocumental",
          "diasRestantes",
          "PrioridadRadiRadicados",
          "fechaVencimientoRadiRadicados",
        ];
        break;
      case "2":
        fields = [
          "idCgMedioRecepcion",
          "tipoSolicitudId",
          "tipoServicioId",
          "idOrigen",
          "idCliente",
          "idTipoTramite",
          "idTrdTipoDocumental",
          // "idGdTrdSubserie",
          "idGdTrdSerie",
        ];
        break;
      case "serieSubserie":
        fields = ["idGdTrdSerie", "idGdTrdSubserie"];
        break;
      case "remitentes":
        fields = ["remitentes"];
        break;
    }
    const validators = required ? [Validators.required] : [];

    fields.forEach((control) => {
      if (!required) {
        this.moduleForm.controls[control].reset(); // Reset the control state
      }
      this.moduleForm.controls[control].setValidators(validators);
      this.moduleForm.controls[control].updateValueAndValidity();
    });
  }

  matDrawerContainerStyle: any;
  ngAfterViewInit() {
    // Obtenemos los estilos del mat-drawe-container
    const matDrawerContainer = document.querySelector(
      ".mat-drawer-container",
    ) as HTMLElement;
    const style = window.getComputedStyle(matDrawerContainer);
    this.matDrawerContainerStyle = [
      style.width,
      style.maxWidth,
      style.height,
      style.maxHeight,
    ];
    console.log("matDrawerContainerStyle", this.matDrawerContainerStyle);
  }

  deshabilitarDias() {
    setTimeout(() => {
      const button = document.querySelector(
        ".mat-datetimepicker-calendar-header-date",
      ) as HTMLElement;
      button.addEventListener("click", (e) => {
        this.deshabilitarDias2();
      });
      this.deshabilitarDias2();
    }, 100);
  }

  private deshabilitarDias2() {
    // Deshabilitar anteriores a la fecha actual
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const todayElement = document.querySelectorAll(
      ".mat-datetimepicker-calendar-body-cell",
    ) as NodeListOf<HTMLElement>;
    for (let i = 0; i < todayElement.length; i++) {
      if (
        Number(todayElement[i].textContent) < Number(todayString.split("-")[2])
      ) {
        todayElement[i].style.pointerEvents = "none";
        todayElement[i].style.color = "#ccc";
        todayElement[i].style.backgroundColor = "#f5f5f5";
        todayElement[i].style.border = "1px solid #f5f5f5";
        todayElement[i].style.borderRadius = "50%";
        todayElement[i].style.cursor = "not-allowed";
        todayElement[i].style.opacity = "0.5";
      }
    }
  }

  // actos administrativos
  public getNivelesPrivacidad(): void {
    this.radicadosService.getNivelesPrivacidad().subscribe({
      next: (value: ResNivelesPrivacidad) => {
        this.nivelesPrivacidad = value;
      },
      error: (err: any) => {
        console.log("ERR GET COM", err);
      },
    });
  }

  public getNotificaciones(): void {
    this.radicadosService.getNotificaciones().subscribe({
      next: (value: TipoNotificacion[]) => {
        this.notificacionesList = value;
      },
      error: (err: any) => {
        console.log("ERR GET COM", err);
      },
    });
  }
  // end actos administrativos

  getOptionsService() {
    this.http
      .get(
        environment.apiUrl +
          environment.versionApiDefault +
          `api/tipos_servicios`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.tipoServiciosOptions = data;
      });

    this.http
      .get(
        environment.apiUrl +
          environment.versionApiDefault +
          `api/tipos_solicitudes`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.tiposSolicitudesOptions = data;
      });

    this.http
      .get(
        environment.apiUrl +
          environment.versionApiDefault +
          `api/tipos_tramites`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.tipoTramitesOptions = data;
      });

    this.http
      .get(
        environment.apiUrl +
          environment.versionApiDefault +
          `api/medio_respuesta`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.medioRespuestaOptions = data;
      });

    this.http
      .get(
        environment.apiUrl +
          environment.versionApiDefault +
          `api/tipos_anexos_fisicos`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.tiposAnexosFisicosOptions = data;
      });

    this.http
      .get(
        environment.apiUrl + environment.versionApiDefault + `api/tipos_origen`,
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.tiposOrigenOptions = data;
      });
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      this.booleanRadicado = false;
      /** Llamado de los servicios para las listas */
      this.getListGeneral();
      this.getListClientes();
      if (this.route.snapshot.url[0].path == "filing-create") {
        this.menu = "create";
        this.menuButtons = [
          {
            icon: "cancel",
            title: "Cancelar",
            action: "CancelRadicado",
            data: "",
          },
        ];
      } else {
        this.menuButtons = this.menuButtonsSelectOne;
      }

      if (this.paramOID != 0 && !this.isToclone) {
        this.paramiD = this.route.snapshot.paramMap.get("id"); // SE recibe el id
        this.booleanRadicado = true;
        this.onSearchId(this.paramOID, this.authorization);
        this.iconMenu = "menu";
        this.menuButtons = [
          { icon: "save", title: "Guardar", action: "save", data: "" },
        ];
        // this.menuButtons = [ { icon: "save", title: "Guardar", action: "save", data: "" },
        //                       { icon: "close", title: "Cancelar", action: "close", data: "" }];

        this.moduleForm.controls["idCgTipoRadicado"].disable();
        if (
          this.route.snapshot.url[0].path == "filing-update-request" ||
          this.route.snapshot.url[0].path == "filing-update-web-page" ||
          this.route.snapshot.url[0].path == "filing-update"
        ) {
          this.moduleForm.controls["idTrdDepeUserTramitador"];
          this.moduleForm.controls["fechaDocumentoRadiRadicado"].disable();
          this.moduleForm.controls["idTrdDepeUserTramitador"].disable();
        } else {
          this.moduleForm.controls["user_idTramitador"].disable();
        }
      } else {
        /**
         *  asignar  id de radicados seleccionados en la vista anterior al select multiple RadiRadicadoHijos
         */
        this.asignacionRadicados(false);

        if (this.isToclone) {
          this.iconMenu = "menu";
          this.menuButtons = [
            { icon: "save", title: "Guardar", action: "save", data: "" },
            {
              icon: "cancel",
              title: "Cancelar",
              action: "CancelRadicado",
              data: "",
            },
          ];
          this.menu = "clone";
          this.onSearchId(this.paramOID, this.authorization);
        }

        /** Llamado a funcion de lista si es radicacion email */
        if (this.radicacionEmail) {
          this.getRemitenteByEmail(this.fromAddressEmail, this.authorization);
        }
      }
    });
  }

  /** Obtener Id de remitente en caso de existir */
  getRemitenteByEmail(fromAddressEmail, authorization) {
    let params = {
      email: fromAddressEmail,
    };

    this.restService
      .restGetParams(
        this.versionApi + "radicacion/radicados/get-remitente-by-email",
        params,
        authorization,
      )
      .subscribe(
        (res) => {
          this.resSerRemitenteByEmail = res;

          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.resSerRemitenteByEmail,
              true,
              this.redirectionPath,
            )
            .then((res) => {
              let resResolveResponse = res;
              if (resResolveResponse == true) {
                this.isMailRecordExists =
                  this.resSerRemitenteByEmail.data.isMailRecordExists;
                if (this.isMailRecordExists == true) {
                  this.idMailRemitente =
                    this.resSerRemitenteByEmail.data.idMailRemitente;
                  this.moduleForm.controls["idCliente"].setValue(
                    this.idMailRemitente,
                  );
                  this.destinatario();
                } else {
                  this.moduleForm.controls["isNuevoRemitente"].setValue(true);
                  this.MatSlideToggleChange({ checked: true });
                }
              }
            });
        },
        (err) => {
          this.resSerRemitenteByEmailErr = err;
          // Evaluar respuesta de error del servicio
          // this.globalAppService.resolveResponseError(this.resSerRemitenteByEmailErr, true, this.redirectionPath ).then((res) => { });
        },
      );
  }

  /*
   * param - id del rol a buscar
   * param - authori variable de la autorizacion del localstorage
   */
  private subSerie: number = 0;
  private tipoDoc: number = 0;
  private medioRespuesta: number = 0;
  idClienteSearch: number = 0;
  onSearchId(id, authori) {
    const idCgTipoRadicadoOld =
      this.moduleForm.controls["idCgTipoRadicado"].value;
    // loading Active
    this.sweetAlertService.sweetLoading();
    let params = {
      id: this.paramOID,
    };

    params["mostrarBotonCancelar"] = false;
    this.restService
      .restGetParams(
        this.versionApi + "radicacion/radicados/index-one",
        params,
        authori,
      )
      .subscribe(
        (res) => {
          this.resSerFormSubmit = res;
          if (!this.isToclone) {
            this.firmaRadiRadicado =
              this.resSerFormSubmit.data["firmaRadiRadicado"];
            localStorage.setItem("signature", this.firmaRadiRadicado);
          } else {
            this.idCliente =
              this.resSerFormSubmit.data["idCliente"][0]["cliente"];
            this.moduleForm.get("idCliente").setValue(this.idCliente);
          }

          this.isDevolution = false;
          if (
            res.data != undefined &&
            res.data.estadoId != undefined &&
            res.data.estadoId == 44
          ) {
            this.isCooperative = true;
          }

          if (
            res.data != undefined &&
            res.data.estadoId != undefined &&
            res.data.estadoId == 45
          ) {
            this.isDevolution = true;

            this.moduleForm.controls["tipoRespuestaId"].disable();
            this.moduleForm.controls["asuntoRadiRadicado"].disable();
            this.moduleForm.controls["numeroRadicadoExterno"].disable();
            this.moduleForm.controls["tipoSolicitudId"].disable();

            this.moduleForm.controls["numeroCuentaContrato"].disable();
            this.moduleForm.controls["numeroCuentaInterna"].disable();
            this.moduleForm.controls["contactoSap"].disable();
            this.moduleForm.controls["tipoZona"].disable();

            if (this.moduleForm.get("tipoZona").value) {
              this.moduleForm.controls["direccion"].disable();
            } else {
              this.moduleForm.controls["tipoDeVia"].disable();
              this.moduleForm.controls["numVia"].disable();
              this.moduleForm.controls["letra"].disable();
              this.moduleForm.controls["bis"].disable();
              this.moduleForm.controls["letraDos"].disable();
              this.moduleForm.controls["sufijo"].disable();
              this.moduleForm.controls["nPlaca"].disable();
              this.moduleForm.controls["letraTres"].disable();
              this.moduleForm.controls["nPlacaDos"].disable();
              this.moduleForm.controls["sufijoDos"].disable();
              this.moduleForm.controls["complemento"].disable();
            }

            this.moduleForm.controls["direccionManualCuentaContrato"].disable();
            this.moduleForm.controls["direccion"].disable();
            this.moduleForm.controls["zona"].disable();

            this.moduleForm.controls["idTrdDepeUserTramitador"].disable();
            this.moduleForm.controls["user_idTramitador"].disable();
            this.moduleForm.controls["tipoServicioId"].disable();
            this.moduleForm.controls["idGdTrdSerie"].disable();
            this.moduleForm.controls["idGdTrdSubserie"].disable();
            this.moduleForm.controls["idTrdTipoDocumental"].disable();

            this.moduleForm.controls["autorizacionRadiRadicados"].disable();
            this.moduleForm.controls["idCliente"].disable();
          }

          if (res.data.plantilla) {
            this.editorContent = res.data.plantilla;
          }

          console.log({ "info-radicado": this.isDevolution });

          if ([6, 7, 8, 9].includes(res.data.idCgTipoRadicado)) {
            this.tipoRadicado = "actoAdmin";
            this.camposRequeridos("actoAdmin", true);
          } else {
            this.tipoRadicado = res.data.idCgTipoRadicado;
          }

          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resSerFormSubmit, true, this.redirectionPath)
            .then((res) => {
              let resResolveResponse = res;
              if (resResolveResponse == true) {
                // console.log("resSerFormSubmit", this.resSerFormSubmit)
                this.NoRadicado =
                  this.resSerFormSubmit.data["numeroRadiRadicado"];

                if (
                  typeof this.resSerFormSubmit.textNumeroRadicadoOConsecutivo !=
                    "undefined" &&
                  this.resSerFormSubmit.textNumeroRadicadoOConsecutivo != ""
                ) {
                  this.textNumeroRadicadoOConsecutivo =
                    this.resSerFormSubmit.textNumeroRadicadoOConsecutivo;
                }

                if (this.resSerFormSubmit.data) {
                  console.log(
                    "this.resSerFormSubmit.data",
                    this.resSerFormSubmit.data,
                  );
                  for (let name in this.resSerFormSubmit.data) {
                    if (this.moduleForm.controls[name]) {
                      this.moduleForm.controls[name].setValue(
                        this.resSerFormSubmit.data[name],
                      );
                    }
                    if (
                      name == "idCgTipoRadicado" &&
                      this.resSerFormSubmit.data[name] != idCgTipoRadicadoOld
                    ) {
                      this.getListClientes();
                    }
                    // Busca nivel geografico 2 y 3 en el primer registro
                    if (name == "idNivelGeografico1") {
                      this.nivelGeografico2(this.resSerFormSubmit.data[name]);
                    }

                    if (name == "idNivelGeografico2") {
                      this.nivelGeografico3(this.resSerFormSubmit.data[name]);
                    }

                    if (this.isToclone) {
                      this.moduleForm.controls[
                        "autorizacionRadiRadicados"
                      ].setValue(false);
                    } else if (name == "autorizacionRadiRadicados") {
                      if (
                        this.resSerFormSubmit.data[name] == 10 ||
                        this.resSerFormSubmit.data[name] == true
                      ) {
                        this.AutorizaChange({ checked: true });
                      }
                    }

                    if (this.isToclone) {
                      this.moduleForm.controls["aceptaPolitica"].setValue(
                        false,
                      );
                    } else if (name == "aceptaPolitica") {
                      this.moduleForm.controls["aceptaPolitica"].setValue(true);
                    }

                    if (this.isToclone) {
                      this.moduleForm.controls["tipoZonaNotificacion"].setValue(
                        false,
                      );
                    } else if (name == "tipoZonaNotificacion") {
                      this.moduleForm.controls["tipoZonaNotificacion"].setValue(
                        true,
                      );
                    }

                    if (this.isToclone) {
                      this.moduleForm.controls["tipoZona"].setValue(false);
                    } else if (name == "tipoZona") {
                      this.moduleForm.controls["tipoZona"].setValue(true);
                    }

                    if (name["foliosRadiRadicado"] != "") {
                      this.moduleForm.controls["cuentaConAnexos"].setValue(
                        true,
                      );
                    }

                    if (name == "creacionRadiRadicado") {
                      this.creacionRadiRadicado =
                        this.resSerFormSubmit.data[name];
                    }
                    if (
                      name == "zona" &&
                      this.resSerFormSubmit.data[name] != null &&
                      this.resSerFormSubmit.data[name] != ""
                    ) {
                      this.moduleForm.controls["tipoZona"].setValue(true);
                    }

                    if (
                      name == "idGdTrdSubserie" &&
                      this.resSerFormSubmit.data[name] != null
                    ) {
                      this.subSerie = this.resSerFormSubmit.data[name];
                    }

                    if (
                      name == "idTrdTipoDocumental" &&
                      this.resSerFormSubmit.data[name] != null
                    ) {
                      this.tipoDoc = this.resSerFormSubmit.data[name];
                    }

                    if (
                      name == "idCliente" &&
                      this.resSerFormSubmit.data[name] != null
                    ) {
                      this.idClienteSearch =
                        this.resSerFormSubmit.data[name][0]["cliente"];
                    }

                    if (this.isToclone) {
                      this.validarCampoInsistencia = false;
                      this.moduleForm.controls["PrioridadInsistencia"].setValue(
                        false,
                      );
                    } else if (
                      name == "PrioridadInsistencia" &&
                      this.resSerFormSubmit.data[name] > 0
                    ) {
                      this.validarCampoInsistencia = false;
                      this.messageRadicaInsistencia = "Si";
                      this.validarUnaVez = true;
                      this.moduleForm.controls["PrioridadInsistencia"].setValue(
                        true,
                      );
                    }

                    if (this.isToclone) {
                      this.validarCampoDevolucion = false;
                      this.moduleForm.controls["PrioridadDevolucion"].setValue(
                        false,
                      );
                    } else if (
                      name == "PrioridadDevolucion" &&
                      this.resSerFormSubmit.data[name] > 0
                    ) {
                      this.validarCampoDevolucion = false;
                      this.messageDevolucionDocumento = "Si";
                      this.validarUnaVez = true;
                      this.moduleForm.controls["PrioridadDevolucion"].setValue(
                        true,
                      );
                    }

                    if (name == "fechaVencimientoRadiRadicados") {
                      const fechaVencimiento = moment(
                        this.resSerFormSubmit.data[name],
                        "DD/MM/YYYY",
                      ).toDate();
                      this.moduleForm.controls[
                        "fechaVencimientoRadiRadicados"
                      ].setValue(fechaVencimiento);
                    }

                    if (name == "creacionRadiRadicado") {
                      const fechaVencimiento = moment(
                        this.resSerFormSubmit.data[name],
                      )
                        .local()
                        .toDate();
                      this.moduleForm.controls[
                        "fechaDocumentoRadiRadicado"
                      ].setValue(fechaVencimiento);
                    }

                    if (
                      name == "diasRestantes" &&
                      this.resSerFormSubmit.data[name]
                    ) {
                      this.moduleForm.controls["diasRestantes"].setValue(
                        this.resSerFormSubmit.data[name],
                      );
                    }
                  }
                }

                if (!this.isToclone) {
                  this.menuButtons = this.resSerFormSubmit.dataTransacciones;
                  /* this.menuButtons = [{ icon: "save", title: "Guardar", action: "save", data: "" },...this.menuButtons ]; */
                }
                this.destinatario();
                this.validaDependencias();
              }
            });
        },
        (err) => {
          this.resSerFormSubmitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(
              this.resSerFormSubmitErr,
              true,
              this.redirectionPath,
            )
            .then((res) => {});
        },
      );
  }

  /**
   *  asignar  id de radicados seleccionados en la vista anterior al select multiple RadiRadicadoHijos
   * @param condicion indica si es push o setValue al asignar los valores
   */
  asignacionRadicados(condicion) {
    let RadiAsociados = this.authService.decryptAES(
      localStorage.getItem(environment.hashRadiAsociados),
    );
    if (RadiAsociados) {
      if (!condicion) {
        this.moduleForm.controls["RadiRadicadoHijos"].setValue(RadiAsociados);
      }
    }
  }

  validateNumberCuentaContrato(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("numeroCuentaContrato")?.setValue(sanitizedValue);
  }

  // ValidateCorreoCliente(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const sanitizedValue = input.value.replace(/[^a-zA-Z0-9@._-]/g, '');  // Permitir solo caracteres válidos en un correo
  //   input.value = sanitizedValue;

  //   // Validar el formato del correo
  //   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!emailPattern.test(sanitizedValue)) {
  //     console.log('Correo inválido');
  //   }

  //   this.moduleForm.get('correoElectronicoCliente')?.setValue(sanitizedValue);
  // }

  validateNumberCuentaInterna(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("numeroCuentaInterna")?.setValue(sanitizedValue);
  }

  ValidateDocumentoCliente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("numeroDocumentoCliente")?.setValue(sanitizedValue);
  }

  ValidateTelefonoCliente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("telefonoCliente")?.setValue(sanitizedValue);
  }

  ValidateTelefonoCelularCliente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("celular")?.setValue(sanitizedValue);
  }

  ValidateNumeroFolios(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("foliosRadiRadicado")?.setValue(sanitizedValue);
  }

  ValidateCodigPostal(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("codigoPostal")?.setValue(sanitizedValue);
  }

  ValidateCorreoCliente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^a-zA-Z0-9@._-]/g, ""); // Permitir solo caracteres válidos en un correo
    input.value = sanitizedValue;
    this.moduleForm.get("correoElectronicoCliente")?.setValue(sanitizedValue);
  }

  validarUnaVez: boolean = false;
  submitForm() {
    const invalidFields = Object.keys(this.moduleForm.controls).filter(
      (key) => this.moduleForm.controls[key].invalid,
    );
    console.log(invalidFields, this.moduleForm.controls);
    console.log("GUARDANDO RADICADO");
    if (this.tipoRadicado == "actoAdmin") {
      const remitentesFormArray = this.moduleForm.get(
        "remitentes",
      ) as UntypedFormArray;
      remitentesFormArray.clear();
      remitentesFormArray.clearValidators();
      remitentesFormArray.updateValueAndValidity();
      this.moduleForm.get("idCgMedioRecepcion").setValue(9);
      this.moduleForm.get("idTipoPersona").setValue("2");
      this.moduleForm.get("idTipoIdentificacion").setValue("1");
      this.moduleForm.get("nombreCliente").setValue("&ensp;");
      this.moduleForm.get("numeroDocumentoCliente").setValue("&ensp;");
      this.moduleForm.get("direccionCliente").setValue("&ensp;");
      this.moduleForm.get("idNivelGeografico1").setValue("1");
      this.moduleForm.get("idNivelGeografico3").setValue("1");
      this.moduleForm.get("idNivelGeografico2").setValue("1");
      this.moduleForm.get("correoElectronicoCliente").setValue("&ensp;");
    }
    if (this.moduleForm.valid) {
      if (this.isToclone) {
        this.moduleForm.get("idCliente").setValue(this.idCliente);
      }
      // Que me capture el dia, mes, año, hora, minutos y si es am o pm
      this.moduleForm.get("fechaDocumentoRadiRadicado").value = new Date(
        moment(this.moduleForm.get("fechaDocumentoRadiRadicado").value).format(
          "YYYY-MM-DD HH:mm",
        ),
      );
      if (this.tipoRadicado == "actoAdmin") {
        this.submitFormEmit.emit({
          data: this.moduleForm.getRawValue(),
          fileUpload: this.moduleForm.get("fileUpload").value,
          plantillaHTML: this.editorContent,
        });
      } else if (
        this.moduleForm.controls["isNuevoRemitente"].value == true ||
        this.moduleForm.controls["idCliente"].value != ""
      ) {
        this.submitFormEmit.emit({
          data: this.moduleForm.getRawValue(),
          fileUpload: this.moduleForm.get("fileUpload").value,
          plantillaHTML: this.editorContent,
        });
        // this.sweetAlertService.sweetClose();
      } else {
        this.sweetAlertService.sweetInfo("Algo está mal", [
          "Seleccione remitente/destinatario",
        ]);
      }
    } else {
      this.sweetAlertService.sweetInfo(
        "Por favor verifique, datos obligatorios incompletos",
        "",
      );
      this.moduleForm.markAllAsTouched();
    }
  }

  // Consume servicio de listas
  async getListGeneral() {
    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restGetNotDecrypt(
        this.versionApi +
          "radicacion/radicados/index-general-filing-lists-not-encrypt",
        this.authorization,
      )
      .subscribe(
        (data) => {
          const responseService: any = data;
          this.globalAppService
            .resolveResponse(responseService)
            .then((dataGlobal) => {
              const responseGlobal = dataGlobal;
              if (responseGlobal === true) {
                /** Informacion del usuario logueado */
                if (responseService.dataUserLogin) {
                  this.dataUserLogin = responseService.dataUserLogin;
                }

                if (responseService.dataTiposRespuesta) {
                  this.listTipoRespuesta = responseService.dataTiposRespuesta;
                  this.filteredlistTipoRespuesta.next(
                    this.listTipoRespuesta.slice(),
                  );
                }

                if (responseService.dataMedioRespuesta) {
                  this.listMediorespuesta = responseService.dataMedioRespuesta;
                  this.filteredlistMedioRespuesta.next(
                    this.listMediorespuesta.slice(),
                  );
                  console.log({
                    listMediorespuesta: this.listMediorespuesta,
                    filteredlistMedioRespuesta: this.filteredlistMedioRespuesta,
                  });
                }

                if (responseService.dataTiposComunicacion) {
                  this.listTipoComunicado =
                    responseService.dataTiposComunicacion;
                  this.filteredlistTipoComunicacion = this.listTipoComunicado;
                }

                // Numeros Radicados
                if (responseService.dataNumRadicados) {
                  this.listNumRadicado = responseService.dataNumRadicados;
                  // load the list initial
                  this.filteredlistNumRadicado.next(
                    this.listNumRadicado.slice(),
                  );
                }
                // Tipo Radicado

                if (typeof this.tipoRadicado === "string" && !this.isToclone) {
                  if (this.tipoRadicado == "actoAdmin") {
                    this.listTipoRadicadoActosAdmin =
                      responseService.dataRadicado.filter(
                        (item) => item.tipoRadicado == "1",
                      );
                    // load the list initial
                    this.filteredlistTipoRadicado =
                      this.listTipoRadicadoActosAdmin;
                  } else {
                    const tipoRadicadoArray = this.tipoRadicado
                      .split(",")
                      .map(Number)
                      .filter((num) => !isNaN(num));
                    //console.log( responseService.dataRadicado)
                    this.listTipoRadicado = responseService.dataRadicado.filter(
                      (item) => tipoRadicadoArray.includes(item.id),
                    );
                    // load the list initial
                    this.filteredlistTipoRadicado = this.listTipoRadicado;
                  }
                } else {
                  this.listTipoRadicado = responseService.dataRadicado;
                  // load the list initial
                  this.filteredlistTipoRadicado = responseService.dataRadicado;
                }

                if (this.filteredlistTipoRadicado.length == 1) {
                  this.moduleForm.controls["idCgTipoRadicado"].setValue(
                    this.filteredlistTipoRadicado[0].id,
                  );
                  this.validaDependencias();
                }

                if (responseService.dataTipoPersonal) {
                  this.listTipoPersona = responseService.dataTipoPersonal;
                  // Valida lista para que se agregue las tipos de persona
                  var dataTipoPer = responseService.dataTipoPersonal;
                  dataTipoPer.forEach((tipP) => {
                    // quita el funcionario para agergar a la lista
                    if (tipP.id != environment.tipoPersonaNumber.Funcionario) {
                      this.listTipoPersonaNewRemi.push(tipP);
                    }
                  });
                  // load the list initial
                  this.filteredlistTipoPersona.next(
                    this.listTipoPersona.slice(),
                  );
                }

                // Lista tipo identificacion
                if (responseService.dataTiposIdentificacion) {
                  this.listTipoIdentificacion =
                    responseService.dataTiposIdentificacion;
                  this.filterdIdTipoIdentificacion.next(
                    this.listTipoIdentificacion,
                  );
                }

                // Lista tramites
                if (responseService.dataTramites) {
                  this.listTramites = responseService.dataTramites;
                  // load the list initial
                  this.filteredlistTramites.next(this.listTramites.slice());
                }
                // Tipo Documental
                if (responseService.dataDocumentales) {
                  // this.listTipoDocumental = responseService.dataDocumentales;
                  // load the list initial
                  // this.filteredlistTipoDocumental.next(this.listTipoDocumental.slice());
                }
                // Lista medios de recepcion
                if (responseService.dataMediosRecepcion) {
                  this.listMedioRecepcion = responseService.dataMediosRecepcion;
                  // load the list initial
                  if (this.tipoRadicado == 2) {
                    this.filteredlistMedioRecepcion.next(
                      this.listMedioRecepcion.filter(
                        (item) => item.val != "Asignación por sistema",
                      ),
                    );
                  } else {
                    this.filteredlistMedioRecepcion.next(
                      this.listMedioRecepcion.slice(),
                    );
                  }
                }
                // lista Paises
                if (responseService.dataNivelGeografico1) {
                  this.listNivelGeografico1 =
                    responseService.dataNivelGeografico1;
                  // load the list initial
                  this.filteredlistNivelGeografico1.next(
                    this.listNivelGeografico1.slice(),
                  );
                }
                // lista Departamentos
                if (responseService.dataNivelGeografico2) {
                  this.listNivelGeografico2 =
                    responseService.dataNivelGeografico2;
                  // load the list initial
                  this.filteredlistNivelGeografico2.next(
                    this.listNivelGeografico2.slice(),
                  );
                }
                // lista Municipios
                if (responseService.dataNivelGeografico3) {
                  this.listNivelGeografico3 =
                    responseService.dataNivelGeografico3;
                  // load the list initial
                  this.filteredlistNivelGeografico3.next(
                    this.listNivelGeografico3.slice(),
                  );
                }
                // Data multiremitentes
                if (responseService.dataRadiUnico) {
                  this.dataMultiRadi = responseService.dataRadiUnico;
                }
                if (this.paramOID == 0)
                  // this.moduleForm.controls["idCgTipoRadicado"].setValue(responseService.dataRadicado[1].id);

                  // loading false
                  this.sweetAlertService.sweetClose();
              }
            });
        },
        (err) => {
          this.resSerlistGeneralErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerlistGeneralErr)
            .then((res) => {});
        },
      );
  }

  tipoRadi: number = 0;
  onSelectionChangeTipoRadicado() {
    this.validaDependencias();
    this.moduleForm.controls["isNuevoRemitente"].value = false;
    const tipoRadicadoValue =
      this.moduleForm.controls["idCgTipoRadicado"].value;
    if (tipoRadicadoValue == 2) {
      this.camposRequeridos("2", true);
    } else {
      this.moduleForm.controls["idCgMedioRecepcion"].setValue(9);
      this.camposRequeridos("2", false);
    }
    if ([3, 5, 6, 7, 8, 9].includes(tipoRadicadoValue)) {
      this.tipoRadicado = "actoAdmin";
      this.camposRequeridos("actoAdmin", true);
    }

    if (
      this.moduleForm.controls["idCgTipoRadicado"].value !=
        environment.tipoRadicadoId.entrada &&
      this.moduleForm.controls["idCgTipoRadicado"].value !=
        environment.tipoRadicadoId.pqrs
    ) {
      this.moduleForm.controls["autorizacionRadiRadicados"].setValue(false);
      this.AutorizaChange({ checked: false });
      this.camposRequeridos("serieSubserie", true);
    } else {
      this.camposRequeridos("serieSubserie", true);
    }
  }

  /** consultar Lista de clientes según el tipo de radicado seleccionado */
  getListClientes(stringSearch: string = null) {
    const data = {
      idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      radicacionEmail: this.radicacionEmail,
      searchClient: stringSearch === null ? "" : stringSearch,
    };

    this.restService
      .restGetParamsNotDecrypt(
        this.versionApi + "radicacion/radicados/list-clientes-not-encrypt",
        data,
        this.authorization,
      )
      .subscribe(
        (data) => {
          const responseService = data;
          this.resSerListClientes = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(responseService).then((res) => {
            const responseGlobal = res;
            if (responseGlobal === true) {
              // Actualizar lista de clientes
              this.listCliente = this.resSerListClientes.dataClientes;
              console.log(this.idClienteSearch);
              if (this.idClienteSearch > 0 && this.listCliente.length > 0) {
                this.moduleForm.controls["idCliente"].setValue(
                  this.listCliente.find(
                    (item) => item.id.cliente == this.idClienteSearch,
                  )?.id,
                );
                this.moduleForm.controls["idCliente"].setValidators([]);
                this.moduleForm.controls["idCliente"].updateValueAndValidity();
              }
              this.filteredlistCliente.next(this.listCliente.slice());
            }
          });
        },
        (err) => {
          this.resSerListClientesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerListClientesErr)
            .then((res) => {});
        },
      );
  }

  onChangeSerie() {
    this.getListSubseries();
  }

  // Consume servicio de listas para las series
  getListSeries() {
    // loading true
    this.sweetAlertService.sweetLoading();

    var data = {
      idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      idTrdDepeUserTramitador:
        this.moduleForm.controls["idTrdDepeUserTramitador"].value,
    };

    this.restService
      .restGetParams(
        this.versionApi + "radicacion/radicados/index-list-series",
        data,
        this.authorization,
      )
      .subscribe(
        (data) => {
          this.resSerSeries = data;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resSerSeries)
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.listSeries = this.resSerSeries.dataList;
                this.filteredlistSeries.next(this.listSeries.slice());
                // loading false
                this.sweetAlertService.sweetClose();
                this.getListSubseries();
              } else {
                this.listSeries = [];
                this.filteredlistSeries.next(this.listSeries.slice());
              }
            });
        },
        (err) => {
          this.resSerSeriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerSeriesErr)
            .then((res) => {});
        },
      );
  }

  onChangeSubserie() {
    this.getListTipoDocumental();
  }

  // Consume servicio de listas para las series
  getListSubseries() {
    // loading true
    this.sweetAlertService.sweetLoading();
    this.moduleForm.controls["idGdTrdSubserie"].setValue("");
    var data = {
      idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      idTrdDepeUserTramitador:
        this.moduleForm.controls["idTrdDepeUserTramitador"].value,
      idGdTrdSerie: this.moduleForm.controls["idGdTrdSerie"].value,
    };

    this.restService
      .restGetParams(
        this.versionApi + "radicacion/radicados/index-list-subseries",
        data,
        this.authorization,
      )
      .subscribe(
        (data) => {
          this.resSerSubseries = data;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resSerSubseries)
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.listSubseries = this.resSerSubseries.dataList;
                this.filteredlistSubseries.next(this.listSubseries.slice());
                this.moduleForm.controls["idGdTrdSubserie"].setValue(
                  this.subSerie,
                );
                // Validamos si solamente hay un registro en la lista
                if (this.listSubseries.length == 1) {
                  this.moduleForm.controls["idGdTrdSubserie"].setValue(
                    this.listSubseries[0].id,
                  );
                }
                // loading false
                this.sweetAlertService.sweetClose();
                this.getListTipoDocumental();
              } else {
                this.listSubseries = [];
                this.filteredlistSubseries.next(this.listSubseries.slice());
              }
            });
        },
        (err) => {
          this.resSerSubseriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerSubseriesErr)
            .then((res) => {});
        },
      );
  }

  // Consume servicio de listas para los tipos documentales
  getListTipoDocumental() {
    // loading true
    this.sweetAlertService.sweetLoading();

    var data = {
      idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      idTrdDepeUserTramitador:
        this.moduleForm.controls["idTrdDepeUserTramitador"].value,
      idGdTrdSerie: this.moduleForm.controls["idGdTrdSerie"].value,
      idGdTrdSubserie: this.moduleForm.controls["idGdTrdSubserie"].value,
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/index-list-tipo-documental",
        data,
        this.authorization,
      )
      .subscribe(
        (data) => {
          this.resSerTipoDocumental = data;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resSerTipoDocumental)
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                // Tipo Documental

                if (this.resSerTipoDocumental.dataDocumentales) {
                  this.listTipoDocumental =
                    this.resSerTipoDocumental.dataDocumentales;
                  // load the list initial
                  this.filteredlistTipoDocumental.next(
                    this.listTipoDocumental.slice(),
                  );

                  // Valida si el tipo de radicado es PQRSD o entrada
                  if (
                    this.moduleForm.controls["idCgTipoRadicado"].value ==
                      environment.tipoRadicadoId.pqrs ||
                    this.moduleForm.controls["idCgTipoRadicado"].value ==
                      environment.tipoRadicadoId.entrada
                  ) {
                    // Recorre la lista de tipo documental
                    this.listTipoDocumental.forEach((element) => {
                      // Verifica si el tipo documental esta vacio si esta vacio le asigna el sin tipo documental
                      if (
                        this.moduleForm.controls["idTrdTipoDocumental"].value ==
                          "" &&
                        element.val == "Sin tipo documental"
                      ) {
                        // Asigna el tipo documental
                        this.moduleForm.controls[
                          "idTrdTipoDocumental"
                        ].setValue(element.id);
                        // Valida tipo documental para que se ejecute
                        this.statusVencimientoEje = true;
                      }
                    });
                  } else {
                    // Si el tipo documental es diferente PQRSD y entrada
                    this.moduleForm.controls["idTrdTipoDocumental"].setValue(
                      this.tipoDoc,
                    );
                  }
                }

                // loading false
                this.sweetAlertService.sweetClose();

                //cuando la dependencia no tiene una TRD (Tipo Documental) configurada muestra un array vacido
              } else {
                this.listTipoDocumental = [];
                // load the list initial
                this.filteredlistTipoDocumental.next(
                  this.listTipoDocumental.slice(),
                );
              }
            });
        },
        (err) => {
          this.resSerTipoDocumentalErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerTipoDocumentalErr)
            .then((res) => {});
        },
      );
  }

  verificarDocNit() {
    let params = {
      numeroDocumentoCliente:
        this.moduleForm.controls["numeroDocumentoCliente"].value,
    };

    this.restService
      .restPost(
        this.versionApi +
          "radicacion/radicados/verificar-identificacion-cliente",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesVerificarDocNit = res;

          if (this.resServicesVerificarDocNit.data["available"] == false) {
            this.moduleForm.controls["numeroDocumentoCliente"].setValue("");
            this.sweetAlertService.showNotification(
              "danger",
              this.resServicesVerificarDocNit["message"],
              6000,
            );
          }
        },
        (err) => {
          this.resServicesVerificarDocNitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesVerificarDocNitErr)
            .then((res) => {});
        },
      );
  }

  verificarCorreo() {
    let params = {
      correoElectronicoCliente:
        this.moduleForm.controls["correoElectronicoCliente"].value,
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/verificar-correo-cliente",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesVerificarCorreo = res;

          if (this.resServicesVerificarCorreo.data["available"] == false) {
            this.moduleForm.controls["correoElectronicoCliente"].setValue("");
            this.sweetAlertService.showNotification(
              "danger",
              this.resServicesVerificarCorreo["message"],
              6000,
            );
          }
        },
        (err) => {
          this.resServicesVerificarCorreoErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesVerificarCorreoErr)
            .then((res) => {});
        },
      );
  }

  public createDireccionUrbana() {
    let nPlaca = this.moduleForm.get("nPlaca").value.replaceAll("-", " ");
    let nPlaca2 = this.moduleForm.get("nPlacaDos").value.replaceAll("-", "");
    let bis = this.moduleForm.get("bis").value == "SI" ? " BIS" : "";
    let letraDosValue = this.moduleForm.get("letraDos").value || "";
    let letraDos = bis == " BIS" ? " " + letraDosValue : letraDosValue;
    let via = this.moduleForm.get("numVia").value
      ? this.moduleForm.get("numVia").value
      : "";
    if (this.moduleForm.get("sufijo").value) {
      let direccionUrbana =
        this.moduleForm.get("tipoDeVia").value +
        " " +
        via +
        this.moduleForm.get("letra").value +
        bis +
        letraDos +
        " " +
        this.moduleForm.get("sufijo").value +
        " " +
        nPlaca +
        this.moduleForm.get("letraTres").value +
        " " +
        nPlaca2 +
        this.moduleForm.get("sufijoDos").value +
        " " +
        this.moduleForm.get("complemento").value;
      this.moduleForm.get("direccion").setValue(direccionUrbana.toUpperCase());
    } else {
      let direccionUrbana =
        this.moduleForm.get("tipoDeVia").value +
        " " +
        via +
        this.moduleForm.get("letra").value +
        bis +
        letraDos +
        this.moduleForm.get("sufijo").value +
        " " +
        nPlaca +
        this.moduleForm.get("letraTres").value +
        " " +
        nPlaca2 +
        this.moduleForm.get("sufijoDos").value +
        " " +
        this.moduleForm.get("complemento").value;
      this.moduleForm.get("direccion").setValue(direccionUrbana.toUpperCase());
    }
  }

  async copiarDatos() {
    try {
      // Obtiene el valor del campo 'complemento'
      const textoParaCopiar = this.moduleForm.get("complemento").value;
      // Usa la API del portapapeles para copiar el texto
      await navigator.clipboard.writeText(textoParaCopiar);
      // Se muestra la notificación de éxito
      this.sweetAlertService.showNotification("success", "Dato Copiado", 2000);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir (por ejemplo, si el acceso al portapapeles está bloqueado)
      console.error("Error al copiar al portapapeles", error);
      // Opcional: muestra una notificación de error
      this.sweetAlertService.showNotification("error", "Error al copiar", 2000);
    }
  }

  public createBodyAdress(): Direccion {
    let address = this.moduleForm
      .get("direccion")
      .value!.trim()
      .replace(/\s+/g, " ");
    return {
      address: address,
      applicationId: "SGDA",
      secret: "U0dEQSBFQUFCIDIwMjQgU0dP",
      isIntersection: "0",
      cityCode: "11001",
    };
  }

  public validarDireccion() {
    const numVia = this.moduleForm.get("numVia").value;
    const tipoDeVia = this.moduleForm.get("tipoDeVia").value;
    const nPlaca = this.moduleForm.get("nPlaca").value;

    if (numVia && tipoDeVia && nPlaca) {
      const direccionContrato: Direccion = this.createBodyAdress();
      // Llamar al servicio para validar la dirección
      this.restService.validateAdress(direccionContrato).subscribe({
        next: (value: any) => {
          if (value.data.length > 0) {
            this.moduleForm.controls["zona"].setValue(value.data[0].zoneDesc);
          } else {
            this.modal.openAction(
              "Dirección no encontrada",
              "¿Desea ingresar la dirección manualmente?",
              () => {
                this.direccionManual = true;
              },
            );
          }
        },
        error: (err: any) => {
          console.log("Error en la validación de la dirección", err);
        },
      });
    } else {
      this.sweetAlertService.sweetInfo(
        "La dirección está incompleta. Asegúrate de completar el número de vía, tipo de vía y número de placa.",
        "",
      );
    }
  }

  MatSlideToggleChangePolitica(event) {
    if (event.checked) {
      this.messageAutorizaPolitica = "Si";
    } else {
      this.messageAutorizaPolitica = "No";
    }
  }

  MatSlideToggleChange(event) {
    // oculta al formulario de remitentes
    this.statusRemitente = false;
    // Elimina todos los remitentes
    this.deleteAllItem();

    let newIdCliente: any = "";

    let formsModules: string[] = [
      "nombreCliente",
      "idTipoPersona",
      "numeroDocumentoCliente",
      "direccionCliente",
      "idNivelGeografico3",
      "idNivelGeografico2",
      "idNivelGeografico1",
      "correoElectronicoCliente",
      "telefonoCliente",
      "idTipoIdentificacion",
      "celular",
      "codigoPostal",
      "idMedioRespuesta",
    ];
    if (this.moduleForm.controls["direccionManualCuentaContrato"].value) {
      this.moduleForm.controls["direccionCliente"].setValue(
        this.moduleForm.controls["direccion"].value,
      );
    } else {
      this.moduleForm.controls["direccionCliente"].setValue(
        this.direccionCliente,
      );
    }
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.moduleForm.controls["idCliente"].setValue("");
      this.messageIsNuevoRemitente = "Si";
      this.direccionCliente = "";

      for (let key in formsModules) {
        if (this.moduleForm.controls[formsModules[key]]) {
          /** Validar si es radicación email y el correo no existe en base de datos para colocarlo en el campo de nuevo remitente */
          if (
            formsModules[key] == "correoElectronicoCliente" &&
            this.radicacionEmail == true &&
            this.isMailRecordExists == false
          ) {
            this.moduleForm.controls["correoElectronicoCliente"].setValue(
              this.fromAddressEmail,
            );
          } else {
            if (
              formsModules[key] != "direccionCliente" &&
              formsModules[key] != "idMedioRespuesta"
            )
              this.moduleForm.controls[formsModules[key]].setValue("");
          }
          this.moduleForm.controls[formsModules[key]].enable();
        }
      }

      if (this.moduleForm.get("idNivelGeografico1").value == "") {
        this.moduleForm.controls["idNivelGeografico1"].setValue(1);
        this.nivelGeografico2(1);
      }

      if (this.moduleForm.controls["autorizacionRadiRadicados"].value) {
        this.AutorizaChange({ checked: true });
      }
      this.moduleForm.controls["idCliente"].disable();
      // Asigna las nueva lista SIN funcionario
      this.filteredlistTipoPersona.next(this.listTipoPersonaNewRemi.slice());

      /** Limpiando campos del ciudadano */
      this.moduleForm.controls["generoClienteCiudadanoDetalle"].setValue(null);
      this.moduleForm.controls["rangoEdadClienteCiudadanoDetalle"].setValue(
        null,
      );
      this.moduleForm.controls[
        "vulnerabilidadClienteCiudadanoDetalle"
      ].setValue(null);
      this.moduleForm.controls["etniaClienteCiudadanoDetalle"].setValue(null);

      // Valida multipres remitentes
      this.moduleForm.controls["unicoRadiCgTipoRadicado"].setValue(false);
      this.MatSlideToggleChangeMulti({ checked: false });
      this.validaMultiple = false;
      this.colocarValidacionesCampos();

      if (this.moduleForm.controls["direccionManualCuentaContrato"].value) {
        this.moduleForm.controls["direccionCliente"].setValue(
          this.moduleForm.controls["direccion"].value,
        );
      } else {
        this.moduleForm.controls["direccionCliente"].setValue(
          this.direccionCliente,
        );
      }

      // Validación nuevo destinatario dependiente de autorización envío por medios magneticos
      if (this.moduleForm.controls["autorizacionRadiRadicados"].value) {
        this.moduleForm.controls["correoElectronicoCliente"].setValidators([
          Validators.email,
          Validators.required,
        ]);
      } else {
        this.moduleForm.controls["correoElectronicoCliente"].setValidators([
          Validators.email,
        ]);
      }
      this.moduleForm.controls[
        "correoElectronicoCliente"
      ].updateValueAndValidity();
    } else {
      this.messageIsNuevoRemitente = "No";

      for (let key in formsModules) {
        if (this.moduleForm.controls[formsModules[key]]) {
          if (
            formsModules[key] != "direccionCliente" &&
            formsModules[key] != "idMedioRespuesta"
          )
            this.moduleForm.controls[formsModules[key]].setValue("");
          this.moduleForm.controls[formsModules[key]].disable();
        }
      }

      // Asigna las nueva lista CON Funcionario
      this.filteredlistTipoPersona.next(this.listTipoPersona.slice());
      this.filterdIdTipoIdentificacion.next(
        this.listTipoIdentificacion.slice(),
      );

      this.setValueIdCliente(newIdCliente);
      this.moduleForm.controls["idCliente"].enable();
      /** Limpiando campos del ciudadano */

      // Valida multipres remitentes
      this.validaCapoMultiple();

      // Campos no requeridos
      this.quitarValidacionesCampos();
    }
    setTimeout(() => {
      if (this.moduleForm.controls["direccionManualCuentaContrato"].value) {
        this.moduleForm.controls["direccionCliente"].setValue(
          this.moduleForm.controls["direccion"].value,
        );
      } else {
        this.moduleForm.controls["direccionCliente"].setValue(
          this.direccionCliente,
        );
      }
    }, 1000);

    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  private colocarValidacionesCampos() {
    this.moduleForm.controls["nombreCliente"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idTipoPersona"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idTipoIdentificacion"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["numeroDocumentoCliente"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idNivelGeografico3"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idNivelGeografico2"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idNivelGeografico1"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["idMedioRespuesta"].setValidators([
      Validators.required,
    ]);
    this.moduleForm.controls["correoElectronicoCliente"].setValidators([
      Validators.required,
      Validators.email,
    ]);
    this.moduleForm.controls["idCliente"].setValidators([]);

    // Actualiza las validaciones
    this.actualizarValidaciones();
  }

  private actualizarValidaciones() {
    this.moduleForm.controls["nombreCliente"].updateValueAndValidity();
    this.moduleForm.controls["idTipoPersona"].updateValueAndValidity();
    this.moduleForm.controls["idTipoIdentificacion"].updateValueAndValidity();
    this.moduleForm.controls["numeroDocumentoCliente"].updateValueAndValidity();
    this.moduleForm.controls["idNivelGeografico3"].updateValueAndValidity();
    this.moduleForm.controls["idNivelGeografico2"].updateValueAndValidity();
    this.moduleForm.controls["idNivelGeografico1"].updateValueAndValidity();
    this.moduleForm.controls["idMedioRespuesta"].updateValueAndValidity();
    this.moduleForm.controls["idCliente"].updateValueAndValidity();
    this.moduleForm.controls[
      "correoElectronicoCliente"
    ].updateValueAndValidity();
    // correoElectronicoCliente
  }

  private quitarValidacionesCampos() {
    this.moduleForm.controls["nombreCliente"].setValidators([]);
    this.moduleForm.controls["idTipoPersona"].setValidators([]);
    this.moduleForm.controls["idTipoIdentificacion"].setValidators([]);
    this.moduleForm.controls["numeroDocumentoCliente"].setValidators([]);
    this.moduleForm.controls["idNivelGeografico3"].setValidators([]);
    this.moduleForm.controls["idNivelGeografico2"].setValidators([]);
    this.moduleForm.controls["idNivelGeografico1"].setValidators([]);
    this.moduleForm.controls["idMedioRespuesta"].setValidators([]);
    this.moduleForm.controls["idCliente"].setValidators([
      this.tipoRadicado === 2 ? Validators.required : null,
    ]);

    // Actualiza las validaciones
    this.actualizarValidaciones();
  }

  AutorizaChange(event) {
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.messageAutoriza = "Si";
      // Validamos si remitente existe
      if (this.moduleForm.controls["remitentes"].value.length > 0) {
        // Buscamos el idMedioRespuesta en el array de remitentes
        let index = this.moduleForm
          .get("remitentes")
          .value.findIndex((element) => element.idMedioRespuesta > 0);
        // Si existe le cambiamos el idMedioRespuesta a 2
        if (index > -1) {
          this.remitentes
            .get(index.toString())
            .get("idMedioRespuesta")
            .setValue(2);
          this.remitentes
            .get(index.toString())
            .get("idMedioRespuesta")
            .updateValueAndValidity();
          this.moduleForm.get("remitentes").value.forEach((element) => {
            element.idMedioRespuesta = 2;
          });
          // Buscamos el correo en el array de remitentes
          let indexCorreo = this.moduleForm
            .get("remitentes")
            .value.findIndex(
              (element) => element.correoElectronicoCliente == "",
            );
          // Si existe le cambiamos el correo a requerido
          if (indexCorreo > -1) {
            this.remitentes
              .get(indexCorreo.toString())
              .get("correoElectronicoCliente")
              .setValidators([Validators.required, Validators.email]);
            this.remitentes
              .get(indexCorreo.toString())
              .get("correoElectronicoCliente")
              .updateValueAndValidity();
          }
        }
      } else {
        // idMedioRespuesta queda en 1
        this.moduleForm.controls["idMedioRespuesta"].setValue(2);
        // y el correo se deshabilita y se coloca requerido
        //this.moduleForm.controls["correoElectronicoCliente"].enable();
        this.moduleForm.controls["correoElectronicoCliente"].setValidators([
          Validators.required,
          Validators.email,
        ]);
        this.moduleForm.controls[
          "correoElectronicoCliente"
        ].updateValueAndValidity();
      }
    } else {
      this.messageAutoriza = "No";
      // Validamos si remitente existe
      if (this.moduleForm.controls["remitentes"].value.length > 0) {
        // Buscamos el idMedioRespuesta en el array de remitentes
        let index = this.moduleForm
          .get("remitentes")
          .value.findIndex((element) => element.idMedioRespuesta > 0);
        // Si existe le cambiamos el idMedioRespuesta a 2
        if (index > -1) {
          this.remitentes.get("idMedioRespuesta").setValue(1);
          //this.remitentes.get("idMedioRespuesta").updateValueAndValidity();
          this.moduleForm.get("remitentes").value.forEach((element) => {
            element.idMedioRespuesta = 1;
          });
          // Buscamos el correo en el array de remitentes
          let indexCorreo = this.moduleForm
            .get("remitentes")
            .value.findIndex(
              (element) => element.correoElectronicoCliente == "",
            );
          // Si existe le cambiamos el correo a requerido
          if (indexCorreo > -1) {
            this.remitentes
              .get("correoElectronicoCliente")
              .setValidators([Validators.email]);
            this.remitentes
              .get("correoElectronicoCliente")
              .updateValueAndValidity();
          }
        }
      } else {
        // idMedioRespuesta queda en 1
        this.moduleForm.controls["idMedioRespuesta"].setValue(1);
        // y el correo se deshabilita y se quita requerido
        if (
          this.moduleForm.controls["isNuevoRemitente"].value == false &&
          !this.moduleForm.controls["correoElectronicoCliente"].value
        ) {
          this.moduleForm.controls["correoElectronicoCliente"].disable();
        }
        this.moduleForm.controls["correoElectronicoCliente"].setValidators([
          Validators.email,
        ]);
        this.moduleForm.controls[
          "correoElectronicoCliente"
        ].updateValueAndValidity();
      }
    }
    console.log(this.moduleForm.get("remitentes").value);
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  AutorizaPoliticChange(event) {
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.messageAutorizaPolitica = "Si";
    } else {
      this.messageAutorizaPolitica = "No";
    }
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  messageRadicaInsistencia: string = "No";
  validarCampoInsistencia: boolean = false;
  // función que solo cambia el titulo de radica por insistencia
  radicaInsistenciaChange(event) {
    this.validarCampoInsistencia = false;
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.messageRadicaInsistencia = "Si";
    } else {
      this.messageRadicaInsistencia = "No";
    }
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  validarCampoDevolucion: boolean = false;
  messageDevolucionDocumento: string = "No";
  // función que solo cambia el titulo de radica por devolucionDocumentos
  radicaDevolucionDocumentosChange(event) {
    this.validarCampoDevolucion = false;
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.messageDevolucionDocumento = "Si";
    } else {
      this.messageDevolucionDocumento = "No";
    }
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  /**
   * Funcion que muestra los campos adicionales para un radicado que tiene un remitente nuevo y es tipo PQRSD
   */
  setFieldsNewPQRSD() {
    if (
      this.moduleForm.controls["idCgTipoRadicado"].value ==
        environment.tipoRadicadoId.pqrs &&
      this.moduleForm.controls["idTipoPersona"].value ==
        environment.tipoPersonaNumber.PersonaNatural
    ) {
      this.statusNewPQRSD = true; // Muestra los campos adicionales de PQRSD
      // Verifica si al menos en la lista genero tiene valores
      if (!this.listGenero) {
        this.restService
          .restGet(
            this.versionApi + "radicacion/radicados/ciudadano-list",
            this.authorization,
          )
          .subscribe(
            (data) => {
              this.resSerlistGeneralPQRS = data;
              // console.log(this.resSerlistGeneralPQRS);
              // Evaluar respuesta del servicio
              this.globalAppService
                .resolveResponse(this.resSerlistGeneralPQRS)
                .then((res) => {
                  let responseResolveResponse = res;
                  if (responseResolveResponse == true) {
                    // lista Etnia
                    if (this.resSerlistGeneralPQRS.dataEtnia) {
                      this.listEtnia = this.resSerlistGeneralPQRS.dataEtnia;
                      // load the list initial
                      this.filteredlistEtnia.next(this.listEtnia.slice());
                    }
                    // lista Gemero
                    if (this.resSerlistGeneralPQRS.dataGenero) {
                      this.listGenero = this.resSerlistGeneralPQRS.dataGenero;
                      // load the list initial
                      this.filteredlistGenero.next(this.listGenero.slice());
                    }
                    // lista Rango de edad
                    if (this.resSerlistGeneralPQRS.dataRangoEdad) {
                      this.listRangoEdad =
                        this.resSerlistGeneralPQRS.dataRangoEdad;
                      // load the list initial
                      this.filteredlistRangoEdad.next(
                        this.listRangoEdad.slice(),
                      );
                    }
                    // lista Vulnerabilidad
                    if (this.resSerlistGeneralPQRS.dataVulnerabilidad) {
                      this.listVulnerabilidad =
                        this.resSerlistGeneralPQRS.dataVulnerabilidad;
                      // load the list initial
                      this.filteredlistVulnerabilidad.next(
                        this.listVulnerabilidad.slice(),
                      );
                    }
                  }
                });
            },
            (err) => {
              this.resSerlistGeneralPQRSErr = err;
              // Evaluar respuesta de error del servicio
              this.globalAppService
                .resolveResponseError(this.resSerlistGeneralPQRSErr)
                .then((res) => {});
            },
          );
      }
    } else {
      this.statusNewPQRSD = false; // Oculta campos de PQRSD
      // Limpia los valores solo cuando es nuevo
      if (this.paramOID == 0 || !this.isToclone) {
        this.moduleForm.controls["generoClienteCiudadanoDetalle"].setValue("");
        this.moduleForm.controls["rangoEdadClienteCiudadanoDetalle"].setValue(
          "",
        );
        this.moduleForm.controls[
          "vulnerabilidadClienteCiudadanoDetalle"
        ].setValue("");
        this.moduleForm.controls["etniaClienteCiudadanoDetalle"].setValue("");
        // Quita validacion de que sea requerido
        this.moduleForm.controls["generoClienteCiudadanoDetalle"].setValidators(
          [],
        );
        this.moduleForm.controls[
          "generoClienteCiudadanoDetalle"
        ].updateValueAndValidity();
        this.moduleForm.controls[
          "rangoEdadClienteCiudadanoDetalle"
        ].setValidators([]);
        this.moduleForm.controls[
          "rangoEdadClienteCiudadanoDetalle"
        ].updateValueAndValidity();
        this.moduleForm.controls[
          "vulnerabilidadClienteCiudadanoDetalle"
        ].setValidators([]);
        this.moduleForm.controls[
          "vulnerabilidadClienteCiudadanoDetalle"
        ].updateValueAndValidity();
        this.moduleForm.controls["etniaClienteCiudadanoDetalle"].setValidators(
          [],
        );
        this.moduleForm.controls[
          "etniaClienteCiudadanoDetalle"
        ].updateValueAndValidity();
      }

      // this.moduleForm.controls['autorizacionRadiRadicados'].setValidators([]);
      // this.moduleForm.controls['autorizacionRadiRadicados'].updateValueAndValidity();
    }
  }

  /** Funcion que setea el valor del campo idCliente segun el caso (si es multiple[] o no{}) */
  setValueIdCliente(newIdCliente: any) {
    if (this.statusRemitenteMultiple === true) {
      if (this.moduleForm.controls["idCliente"].value != "") {
        if (
          typeof this.moduleForm.controls["idCliente"].value[0] == "undefined"
        ) {
          newIdCliente = [this.moduleForm.controls["idCliente"].value];
          this.moduleForm.controls["idCliente"].setValue(newIdCliente);
          this.destinatario();
        }
      }
    } else {
      if (this.moduleForm.controls["idCliente"].value != "") {
        if (
          typeof this.moduleForm.controls["idCliente"].value[0] != "undefined"
        ) {
          newIdCliente = this.moduleForm.controls["idCliente"].value[0];
          //this.moduleForm.controls['idCliente'].setValue(newIdCliente); // Duda
          this.moduleForm.controls["idCliente"].value = newIdCliente;
          this.destinatario();
        }
      }
    }
  }

  /**
   * Funcion que consulta el nivel geografico segun el departamento muestra los municipios
   * @param nivel2 nivel geografico 2
   */
  nivelGeografico3(nivel2) {
    let params = {
      idNivelGeografico2: nivel2,
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/nivel-geografico3",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesNivelGeografico3 = res;

          // lista Departamentos
          if (this.resServicesNivelGeografico3.dataNivelGeografico3) {
            this.listNivelGeografico3 =
              this.resServicesNivelGeografico3.dataNivelGeografico3;
            // load the list initial
            this.filteredlistNivelGeografico3.next(
              this.listNivelGeografico3.slice(),
            );
          }
        },
        (err) => {
          this.resServicesNivelGeografico3Err = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesNivelGeografico3Err)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion que consulta el nivel geografico segun el departamento muestra los municipios
   * @param nivel1 nivel geografico 1
   */
  nivelGeografico2(nivel1) {
    let params = {
      idNivelGeografico1: nivel1,
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/nivel-geografico2",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesNivelGeografico2 = res;

          // lista Municipios
          if (this.resServicesNivelGeografico2.dataNivelGeografico2) {
            this.listNivelGeografico2 =
              this.resServicesNivelGeografico2.dataNivelGeografico2;
            // load the list initial
            this.filteredlistNivelGeografico2.next(
              this.listNivelGeografico2.slice(),
            );
          }
        },
        (err) => {
          this.resServicesNivelGeografico2Err = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesNivelGeografico2Err)
            .then((res) => {});
        },
      );
  }

  destinatario() {
    let params = {
      idcliente: this.moduleForm.controls["idCliente"].value,
    };
    console.log("id del cliente", params);
    /** Cuando seleccionen un cliente ya se habilitan los campos para que se puedan dilogenciar
     * correctamente y enviarlo al servicio
     */

    this.moduleForm.controls["nombreCliente"].enable();
    this.moduleForm.controls["idTipoPersona"].enable();
    this.moduleForm.controls["idTipoIdentificacion"].enable();

    // this.moduleForm.controls['numeroDocumentoCliente'].enable();
    this.moduleForm.controls["direccionCliente"].enable();
    //this.moduleForm.controls["direccionClienteNotificacion"].enable();

    this.moduleForm.controls["idNivelGeografico3"].enable();
    this.moduleForm.controls["idNivelGeografico2"].enable();
    this.moduleForm.controls["idNivelGeografico1"].enable();
    // this.moduleForm.controls['correoElectronicoCliente'].enable();
    this.moduleForm.controls["telefonoCliente"].enable();
    this.moduleForm.controls["celular"].enable();
    this.moduleForm.controls["codigoPostal"].enable();
    this.moduleForm.controls["idMedioRespuesta"].enable();

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/destinatario",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesDestinatario = res;
          if (this.resServicesDestinatario) {
            console.log("Data destinatario", this.resServicesDestinatario);
            this.modelClientes = this.resServicesDestinatario.modelClientes;
            // Elimina los registros del remitente formArray
            this.deleteAllItem();
            // Actualizamos los campos de remitentes
            this.moduleForm.controls["remitentes"].setValue([]);
            this.moduleForm.controls["remitentes"].updateValueAndValidity();

            // Variables para el consumo de departamento y ciudad
            let idsNivel2: any = []; // Departamento
            let idsNivel3: any = []; // Ciudad
            let idMedioRespuesta: any;

            // Si llega algun registro entonces entra a recorrer la información
            if (this.modelClientes.length > 0) {
              // muestra el formulario con scroll para muchos remitentes
              this.statusRemitente = true;
              // Asigna los valores al formulario
              for (let key in this.modelClientes[0]) {
                if (this.moduleForm.controls[key] && key != "idCliente") {
                  if (
                    this.moduleForm.controls["direccionManualCuentaContrato"]
                      .value &&
                    key == "direccionCliente"
                  ) {
                    this.direccionCliente = this.modelClientes[0][key];
                    continue;
                  }
                  this.moduleForm.controls[key].setValue(
                    this.modelClientes[0][key],
                  );
                }
              }
              console.log(
                "data del modelo cliente line 2707",
                this.modelClientes,
              );
              // Recorre la data que llega y lo asigna a remitentes
              this.modelClientes.forEach((element) => {
                if (!idsNivel2.includes(element["idNivelGeografico1"])) {
                  idsNivel2.push(element["idNivelGeografico1"]);
                }
                if (!idsNivel3.includes(element["idNivelGeografico2"])) {
                  idsNivel3.push(element["idNivelGeografico2"]);
                }

                // if (!idMedioRespuesta.includes(element["idMedioRespuesta"])) {
                //   idMedioRespuesta.push(element["idMedioRespuesta"]);
                // }

                // Envia la data para que se cree en remitentes array
                this.remitentes = this.moduleForm.get(
                  "remitentes",
                ) as UntypedFormArray;
                this.remitentes.push(this.createItem(element));
              });
              // Consumo del nivel geografico Departamento y ciudad
              this.nivelGeografico2(idsNivel2);
              this.nivelGeografico3(idsNivel3);
              let validarAutoriza =
                this.moduleForm.controls["autorizacionRadiRadicados"].value;
              this.AutorizaChange({ checked: validarAutoriza });
            } else {
              // muestra el formulario sin scrooll solo un remitente
              this.statusRemitente = false;
              this.direccionCliente = "";
              // Se envia true a la funcion para que bloquee los campos de remitentes.
              this.MatSlideToggleChange(true);
            }
          }
          // Valida si el formulario esta en update y si los remitentes son multiples para ocultar los campos seleccionar remitente y remitente nuevo
          if (this.paramOID != 0 && !this.isToclone) {
            this.showNuevoRemitente = false; // oculta el campo de nuevo remitente en el update
            if (this.modelClientes.length > 1) {
              this.showSenderSelect = false; // Oculta los campos de seleccionar remitente y remitente nuevo
            } else {
              this.showSenderSelect = true; // Muestra los campos de seleccionar remitente y remitente nuevo
            }
          }
        },
        (err) => {
          this.resServicesDestinatarioErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesDestinatarioErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Metodo que crea un item en un formArray con la información de los remitentes
   * @param data del remitente
   */
  createItem(data): UntypedFormGroup {
    console.log("crearItem data", data);
    let validarAutoriza =
      this.moduleForm.controls["autorizacionRadiRadicados"].value;
    let validaciones = validarAutoriza
      ? [Validators.email, Validators.required]
      : [Validators.email];
    return this.formBuilder.group({
      correoElectronicoCliente: new UntypedFormControl(
        data.correoElectronicoCliente,
        validaciones,
      ),
      direccionCliente: new UntypedFormControl(
        data.direccionCliente,
        Validators.compose([Validators.required]),
      ),
      idNivelGeografico1: new UntypedFormControl(
        data.idNivelGeografico1,
        Validators.compose([]),
      ),
      idNivelGeografico2: new UntypedFormControl(
        data.idNivelGeografico2,
        Validators.compose([]),
      ),
      idNivelGeografico3: new UntypedFormControl(
        data.idNivelGeografico3,
        Validators.compose([]),
      ),
      idTipoPersona: new UntypedFormControl(
        data.idTipoPersona,
        Validators.compose([Validators.required]),
      ),
      nombreCliente: new UntypedFormControl(
        data.nombreCliente,
        Validators.compose([Validators.required]),
      ),
      codigoPostal: new UntypedFormControl(data.codigoPostal),
      idTipoIdentificacion: new UntypedFormControl(
        data.idTipoIdentificacion,
        Validators.compose([Validators.required]),
      ),
      idMedioRespuesta: new UntypedFormControl(
        data.idMedioRespuesta,
        Validators.compose([Validators.required]),
      ),
      numeroDocumentoCliente: new UntypedFormControl(
        { value: data.numeroDocumentoCliente, disabled: true },
        Validators.compose([Validators.required]),
      ),
      telefonoCliente: new UntypedFormControl(
        data.telefonoCliente,
        Validators.compose([
          // Validators.required
        ]),
      ),
      celular: new UntypedFormControl(
        data.celular,
        Validators.compose([
          // Validators.required
        ]),
      ),
      idCliente: new UntypedFormControl(
        data.idCliente,
        Validators.compose([
          // Validators.required
        ]),
      ),
    });
  }

  /**
   * Elimina todos los remitentes
   */
  deleteAllItem() {
    this.remitentes = this.moduleForm.get("remitentes") as UntypedFormArray;
    while (this.remitentes.length) {
      this.remitentes.removeAt(0);
    }
  }

  vencimiento(type: string = "bd") {
    let params = {};
    if (this.tipoRadicado === "actoAdmin") {
      let prioridad = this.moduleForm.controls["PrioridadRadiRadicados"].value;
      switch (prioridad) {
        case 1:
          this.moduleForm.controls["diasRestantes"].setValue("5");
          break;
        case 2:
          this.moduleForm.controls["diasRestantes"].setValue("10");
          break;
        case 3:
          this.moduleForm.controls["diasRestantes"].setValue("15");
        default:
          this.moduleForm.controls["diasRestantes"].setValue("15");
          break;
      }
    }
    // calida que sea update
    if (this.paramOID != 0 && !this.isToclone) {
      params = {
        idGdTrdTipoDocumental:
          this.moduleForm.controls["idTrdTipoDocumental"].value,
        idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
        diasRestantes: this.moduleForm.controls["diasRestantes"].value,
        tipoInput: type,
        fechaDocumentoRadiRadicado: this.creacionRadiRadicado,
      };
    } else {
      params = {
        idGdTrdTipoDocumental:
          this.moduleForm.controls["idTrdTipoDocumental"].value,
        idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
        diasRestantes: this.moduleForm.controls["diasRestantes"].value,
        tipoInput: type,
      };
    }

    // console.log(this.moduleForm.controls['diasRestantes'].value);

    this.restService
      .restPost(
        this.versionApi + "radicacion/radicados/vencimiento-radicado",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesVencimiento = res;

          if (this.resServicesVencimiento) {
            this.moduleForm.controls["diasRestantes"].setValue(
              this.resServicesVencimiento.diasRestantes,
            );
            const fechaVencimiento = moment(
              this.resServicesVencimiento.fechaFormatoQA,
              "DD/MM/YYYY",
            ).toDate();
            this.moduleForm.controls["fechaVencimientoRadiRadicados"].setValue(
              fechaVencimiento,
            );
            // Valida que se hizo una modificación manual en el campo de días y muestra el mensaje
            if (this.resServicesVencimiento.fechaVencimientoRadiRadicados) {
              // Llama el servicio de mensajes para buscar y reemplazar dependiendo la internacionalización
              this.sweetAlertService.text18nGet().then((res) => {
                this.resSerLenguage = res;
                // Asignación de los mensajes según el idioma
                let titleTranslate = this.resSerLenguage["txtFecVencimiento"];
                // Valida mensaje
                if (!titleTranslate) {
                  titleTranslate = "txtFecVencimiento";
                }
                // Valida que solo sea para el crear
                if (this.paramOID != 0 && !this.isToclone) {
                  // Muestra la notificación
                  this.sweetAlertService.showNotification(
                    "info",
                    titleTranslate +
                      ": " +
                      this.resServicesVencimiento.fechaVencimientoRadiRadicados,
                  );
                }
              });
            }

            // this.dependencias(); // VALIDAR EN EL HISTORIAL, EL POR QUE SE USABA AQUI
          }

          this.sweetAlertService.sweetClose();
        },
        (err) => {
          this.resServicesVencimientoErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesVencimientoErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Esta funcion se ejecuta al cambiar el tipo de radicado
   */
  validaDependencias() {
    // Consulta el listado de tipos documentales

    // Valida si muestra el campo de autorización
    if (
      this.moduleForm.controls["idCgTipoRadicado"].value ==
        environment.tipoRadicadoId.pqrs ||
      this.moduleForm.controls["idCgTipoRadicado"].value ==
        environment.tipoRadicadoId.entrada
    ) {
      this.statusAutoriza = true;
      // this.statusAutorizaPolitica = true;
      this.classListOneSender = "col-lg-8 col-md-8 col-sm-12 col-xs-12";
      this.classListMultipleSender = "col-lg-8 col-md-8 col-sm-12 col-xs-12";
    } else {
      this.statusAutoriza = true;
      // this.statusAutorizaPolitica = true;
      this.classListOneSender = "col-lg-10 col-md-10 col-sm-12 col-xs-12";
      this.classListMultipleSender = "col-lg-10 col-md-10 col-sm-12 col-xs-12";
    }

    this.dependencias().then(
      (res) => {
        if (
          this.moduleForm.controls["idCgTipoRadicado"].value !=
          environment.tipoRadicadoId.pqrs
        ) {
          this.getListSeries();
          this.getListTipoDocumental();
        } else {
          this.getListSeries();
          this.getListTipoDocumental();
        }
        this.validaTipoRadicadoRemi();
      },
      (err) => {
        if (
          this.moduleForm.controls["idCgTipoRadicado"].value !=
          environment.tipoRadicadoId.pqrs
        ) {
          this.getListSeries();
          this.getListTipoDocumental();
        } else {
          this.getListSeries();
          this.getListTipoDocumental();
        }
      },
    );
  }

  /**
   * La funcion de dependencias se convierte en una promesa ya que esta genera el codigo de  que se
   * utiliza en validaTipoRadicadoRemi()
   */
  dependencias() {
    // Valida tipo de radicado y si es nuevo el remitente para PQRSD
    this.setFieldsNewPQRSD();

    return new Promise<any>((resolve) => {
      let params = {
        idGdTrdTipoDocumental:
          this.moduleForm.controls["idTrdTipoDocumental"].value,
        idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      };

      this.restService
        .restPost(
          this.versionApi + "radicacion/radicados/dependencias-radicado",
          params,
          this.authorization,
        )
        .subscribe(
          (res) => {
            this.resServicesDependencias = res;
            // Tipo de Dependecias
            if (this.resServicesDependencias.dependencias) {
              // load the list initial
              this.listDependencias = this.resServicesDependencias.dependencias;
              this.filteredlistDependencias.next(this.listDependencias.slice());
              if (
                this.route.snapshot.url[0].path == "filing-update-request" ||
                this.route.snapshot.url[0].path == "filing-update-web-page"
              ) {
                this.dependencias2();
              }
            }

            // verificar el codigo de tipo de radicado
            if (this.resServicesDependencias.codiTipoRadicado != 0) {
              // Se asigna código tipo radicado para la funcion
              this.codigoTipoRadicado =
                this.resServicesDependencias.codiTipoRadicado;

              if (
                this.resServicesDependencias.codiTipoRadicado !=
                environment.tipoRadicadoCodigo.salida
              ) {
                // Titulo remitentes
                this.tittleCliente = "filingModule.selectRemitente";
                this.tittleCardCliente = "TitleRemitente";
                this.tittleNewCliente = "filingModule.newRemitente";
              } else {
                //Cargar campo dependencia
                if (this.tipoRadicado != 2) {
                  for (let key in this.resServicesDependencias.dependencias) {
                    if (
                      this.moduleForm.controls["idTrdDepeUserTramitador"]
                        .value == "" ||
                      this.moduleForm.controls["idTrdDepeUserTramitador"]
                        .value == null
                    ) {
                      this.moduleForm.controls[
                        "idTrdDepeUserTramitador"
                      ].setValue(
                        this.resServicesDependencias.dependencias[0].id,
                      );
                    }
                  }
                }

                // Titulo Destinario
                this.tittleNewCliente = "filingModule.newDestinatario";
                this.tittleCliente = "filingModule.selectDestinatario";
                this.tittleCardCliente = "TitleDestinatario";
              }

              // if ( this.resServicesDependencias.codiTipoRadicado != environment.tipoRadicadoCodigo.entrada && this.resServicesDependencias.codiTipoRadicado != environment.tipoRadicadoCodigo.pqrs) {
              if (
                this.dataUserLogin["idGdTrdDependencia"] != 0 &&
                this.dataUserLogin["id"] != 0
              ) {
                // Solo para crear
                if (this.paramOID == 0 || !this.isToclone) {
                  if (
                    this.moduleForm.controls["idTrdDepeUserTramitador"].value ==
                      "" ||
                    this.moduleForm.controls["idTrdDepeUserTramitador"].value ==
                      null
                  ) {
                    this.moduleForm.controls[
                      "idTrdDepeUserTramitador"
                    ].setValue(this.dataUserLogin["idGdTrdDependencia"]);
                    this.moduleForm.controls["user_idTramitador"].setValue(
                      this.dataUserLogin["id"],
                    );
                  }
                }
              }
              // }

              // valida si el tipo documental es sin tipo documental para que se ejecute
              if (this.statusVencimientoEje) {
                this.statusVencimientoEje = false;
                // Valida que solo sea en el create
                if (this.paramOID == 0 || !this.isToclone) {
                  this.vencimiento("select");
                }
              }

              // Cargar funcionario
              this.funcionario();
              resolve(this.codigoTipoRadicado);
            }
          },
          (err) => {
            this.resServicesDependenciasErr = err;
            // Evaluar respuesta de error del servicio
            resolve(this.codigoTipoRadicado);
            this.globalAppService
              .resolveResponseError(this.resServicesDependenciasErr)
              .then((res) => {});
          },
        );
    });
  }

  private dependencias2() {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + this.authorization,
        language: localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "es",
      }),
    };
    // Hacemos la petición get para obtener todas las dependencias con la authorization
    this.http
      .get(environment.apiUrl + "api/radicacion/dependenciasRadicados", {
        headers: httpOptions.headers,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          for (let key in res) {
            res[key].val = res[key].nombreGdTrdDependencia;
            res[key].id = res[key].idGdTrdDependencia;
            res[key].codigoTipoRadicado = res[key].codigoGdTrdDependencia;
          }
          return res;
        }),
      )
      .subscribe((res) => {
        this.listDependencias = res;
        this.filteredlistDependencias.next(this.listDependencias.slice());
      });
  }

  /**
   * Validación para poder mostrar el selector multiple de remitentes solo si tipo radicado es diferente a Entrada y PQRS
   */
  validaTipoRadicadoRemi() {
    if (this.codigoTipoRadicado) {
      if (
        this.codigoTipoRadicado != environment.tipoRadicadoCodigo.entrada &&
        this.codigoTipoRadicado != environment.tipoRadicadoCodigo.pqrs
      ) {
        // Valida si esta el selector multiple como verdadero si es falso limpia todo
        if (!this.statusRemitenteMultiple) {
          // Selector multiple de remitente
          this.statusRemitenteMultiple = true;
          // Si es diferente a Update elimina si es update no se hace nada
          if (this.paramOID == 0) {
            // Elimina todos los remitentes
            this.deleteAllItem();
            // Se evalua la función solo si no es un nuevo remitente
            if (this.moduleForm.controls["isNuevoRemitente"].value == false) {
              this.MatSlideToggleChange({ checked: false });
            }
          }
        }
      } else {
        // Valida si esta el selector multiple como verdadero si es verdadero limpia todo
        if (this.statusRemitenteMultiple) {
          // Selector multiple de remitente
          this.statusRemitenteMultiple = false;
          // oculta al formulario de muchos remitentes
          this.statusRemitente = false;
          // Elimina todos los remitentes
          this.deleteAllItem();
          // Se evalua la función solo si no es un nuevo remitente
          if (this.moduleForm.controls["isNuevoRemitente"].value == false) {
            this.MatSlideToggleChange({ checked: false });
          }
        }
      }
    }

    // Valida el campo multiplte
    this.validaCapoMultiple();
  }

  funcionario(getTiposDoc = false, cleanTramitador = false) {
    if (cleanTramitador) {
      this.moduleForm.controls["user_idTramitador"].setValue("");
    }
    if (getTiposDoc) {
      if (
        this.moduleForm.controls["idCgTipoRadicado"].value !=
        environment.tipoRadicadoId.pqrs
      ) {
        this.getListSeries();
      } else {
        this.getListTipoDocumental();
      }
    }

    if (this.moduleForm.controls["idTrdDepeUserTramitador"].value) {
      let params = {
        idTrdDepeUserTramitador:
          this.moduleForm.controls["idTrdDepeUserTramitador"].value,
        idCgTipoRadicado: this.moduleForm.controls["idCgTipoRadicado"].value,
      };

      console.log(params);
      this.restService
        .restPost(
          this.versionApi + "radicacion/radicados/funcionarios-radicado",
          params,
          this.authorization,
        )
        .subscribe(
          (res) => {
            this.resServicesFuncionariosRadicado = res;

            // Funcionarios encargados segun la Dependencia
            if (this.resServicesFuncionariosRadicado.funcionarios) {
              this.listFuncionarios =
                this.resServicesFuncionariosRadicado.funcionarios;
              // load the list initial
              this.filteredlistFuncionarios.next(this.listFuncionarios.slice());
            }

            //verificar el codigo de tipo de radicado
            if (
              this.resServicesFuncionariosRadicado.codiTipoRadicado != 0 &&
              this.resServicesFuncionariosRadicado.codiTipoRadicado != 2
            ) {
              if (
                this.resServicesFuncionariosRadicado.codiTipoRadicado ==
                  environment.tipoRadicadoCodigo.salida &&
                this.resServicesFuncionariosRadicado.codiTipoRadicado !=
                  environment.tipoRadicadoCodigo.pqrs
              ) {
                // Cargar campo funcionario
                for (let key in this.resServicesFuncionariosRadicado
                  .funcionarios) {
                  this.moduleForm.controls["user_idTramitador"].setValue(
                    this.resServicesFuncionariosRadicado.funcionarios[0].id,
                  );
                }
              }
            }
          },
          (err) => {
            this.resServicesFuncionariosRadicadoErr = err;
            // Evaluar respuesta de error del servicio
            this.globalAppService
              .resolveResponseError(this.resServicesFuncionariosRadicadoErr)
              .then((res) => {});
          },
        );
    }
  }

  /** Realiza el filtro de busqueda */
  filterBanks(nomList) {
    if (!this[nomList]) {
      return;
    }
    // get the search keyword
    let search = this.moduleForm.controls[nomList + "Filter"].value;
    if (!search) {
      this["filtered" + nomList].next(this[nomList].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this["filtered" + nomList].next(
      this[nomList].filter(
        (listOption) => listOption.val.toLowerCase().indexOf(search) > -1,
      ),
    );
  }

  /**
   *
   * @param event
   * Cuando se hace clic en el botón se envia el formulario
   */
  menuPrimaryReceiveData(event) {
    if (this.paramOID == 0 || !this.isToclone) {
      let buttonSubmit = <HTMLFormElement>document.getElementById("sendForm");
      buttonSubmit.click();
    }
  }

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  public menuReceiveData(event) {
    this.dataIdRadicados = [parseInt(String(this.paramOID))]; // se necesita un número entero dentro del array pero la funcion parseInt necesita que sea un string
    console.log(event);
    switch (event.action) {
      case "cancel":
        console.log("Cancel");
        window.history.back();
        break;

      case "save":
        //console.log("save");
        let buttonSubmit = <HTMLFormElement>document.getElementById("sendForm");
        buttonSubmit.click();
        break;

      case "CloneRadicado":
        this.router.navigate([
          "/" + "/filing/filing-clone" + "/" + this.paramiD,
        ]);
        break;

      case "add":
        if (this.dataIdRadicados.length > 0) {
          // Cambia el los mensajes de texto del componete para confirmar la eliminacion
          this.globalAppService.text18nGet().then((res) => {
            this.resSerLenguage = res;
            // console.log( this.resSerLenguage );
            this.titleMsg = this.resSerLenguage.titleMsg;
            this.textMsg = this.resSerLenguage["textMsgAsoRadi"];
            this.bntCancelar = this.resSerLenguage["bntCancelarSendMail"];
            this.btnConfirmacion = this.resSerLenguage["btnConfirmar"];

            swal({
              title: this.titleMsg,
              text: this.textMsg,
              type: "warning",
              showCancelButton: true,
              cancelButtonText: this.bntCancelar,
              confirmButtonText: this.btnConfirmacion,
              cancelButtonClass: "btn btn-danger",
              confirmButtonClass: "btn btn-success",
              buttonsStyling: false,
            }).then((result) => {
              if (result.value) {
                // Guarda en localStorage para asociacion de radicados
                localStorage.setItem(
                  environment.hashRadiAsociados,
                  this.authService.encryptAES(this.dataIdRadicados, false),
                );
                this.router.navigate(["/" + "/filing/filing-create"]);
              }
            });
          });
        } else {
          this.router.navigate(["/" + "/filing/filing-create"]);
        }
        break;

      case "edit":
        this.router.navigate([
          "/" + "/filing/filing-update" + "/" + this.paramiD,
        ]);
        break;

      case "printRadicado":
        window.print();
        break;

      case "sendRadicadoEmail":
        this.transactionEnviarCorreoRadicado();
        break;

      case "view":
        this.router.navigate([
          "/" + "/filing/filing-view" + "/" + this.paramiD,
        ]);
        break;

      case "CancelRadicado":
        if (this.menu === "email") {
          this.router.navigate(["/" + "/filing/filing-radicados-email-index"]);
        } else if (this.menu === "sdqs") {
          this.router.navigate(["/" + "/filing/sdqs-requests-index"]);
        } else if (this.menu === "web") {
          this.router.navigate(["/" + "/filing/filing-web-index"]);
        } else if (this.menu === "radicados") {
          this.router.navigate(["/" + "/filing/filing-create"]);
        } else if (this.menu === "clone") {
          this.router.navigate([
            "/" + "/filing/filing-view" + "/" + this.route.snapshot.params.id,
          ]);
        } else if (this.menu === "create") {
          this.router.navigate(["/" + "/filing/filing-index/false/2"]);
        }
        break;

      case "downloadDocumentPackage":
        this.downloadDocumentPackage();
        break;

      case "uploadFile":
        this.statusModalUploadFile = true;
        this.eventClickButtonSelectedData = {
          0: {
            id: this.paramOID,
          },
        };
        break;

      case "printStickers":
        this.transactionPrintStickers();
        break;

      case "sendMail":
        // this.sendEmailClient();
        this.dataSend = {
          0: {
            id: this.paramOID,
          },
        };
        this.statusSendReplyMailModal = true; // Muestra el modal de Envio de respuesta por correo
        break;
      case "schedule":
        this.showAgenda = true; // Transaccion agendar
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "send":
        this.showReasignacion = true; // Transaccion reasignacion
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "annulationRequest":
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "discardConsecutive":
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "voboRequest":
        this.showVOBO = true; // Transaccion VOBO
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "vobo":
        this.transactionVobo();
        break;
      case "copyInformaded":
        this.showCopyInformaded = true; // Transaccion de copiar informado
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;

        break;
      case "returnFiling":
        this.operationDialogObserva = event.action;
        this.textFormObservaHeader = event.title;
        this.statusModalMain = true;
        break;
      case "includeInFile":
        this.eventClickButtonSelectedData = [{ id: this.paramOID }];
        this.operationDialogObserva = event.action;
        this.statusModalIncludeInFile = true;
        break;
      case "printRadi":
        this.transactionPrintRadi();
        break;
      case "loadFormat":
        this.statusUploadFileAne = true; // Muestra el modal de adjutar documentos
        this.showTipoDocumental = false; // No muestra el tipo documental
        this.showObservacion = false; // No muestra la observación
        this.statusNameFile = true; // Muestra el campo nombre archivo
        this.validateFile = [{ type: "doc" }, { type: "docx" }];
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        this.ruoteServiceDocumentsModal = this.ruoteServiceDocumentsTemplate; // Ruta de la plantilla
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        this.dataSend = {
          0: {
            id: this.paramOID,
          },
        };
        break;
      case "attachment":
        this.textFormAttachment = event.title;
        this.maxRowsFilesAttachment = 5;
        this.showButtonCleanAttachment = true;
        this.showButtonClearAttachment = true;
        this.showTipoDocumental = false; // Oculta el campo tipo documental
        this.operationDialogObserva = event.action;
        this.dataSend = {
          0: {
            id: this.paramOID,
          },
        };
        this.statusUploadFileAneMasive = true;
        break;
      case "attachmentMain":
        this.textFormAttachment = event.title;
        this.maxRowsFilesAttachment = 1;
        this.showButtonCleanAttachment = false;
        this.showButtonClearAttachment = false;
        this.showTipoDocumental = false; // Oculta el campo tipo documental
        this.operationDialogObserva = event.action;
        this.dataSend = {
          0: {
            id: this.paramOID,
          },
        };
        this.statusUploadFileAneMasive = true;
        break;
      case "finalizeFiling":
        // Le asigna la operacion a ejecutar
        this.operationDialogObserva = event.action;
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        // muestra el componente
        this.statusModalMain = true;
        break;
      case "shippingReady":
        this.transactionShippingReady();
        break;
      case "withdrawal":
        this.operationDialogObserva = event.action;
        this.textFormObservaHeader = event.title;
        this.statusModalMain = true;
        break;
      case "createResolutionDetail":
        if (this.dataIdRadicados.length === 1) {
          const dataResolutionDetail = {
            idRadicado: this.dataIdRadicados[0],
            route: event["route"],
            authorization: this.authorization,
          };
          this.openDialog(
            FilingCreateDetailResolutionComponent,
            "75%",
            dataResolutionDetail,
          );
        }
        break;
      case "loadDocumentRadicado":
        /** Cantidad de registros a mostrar en el listado incial, limitante que se envia al bakend */
        let params = {
          data: "",
        };

        this.restService
          .restPost(
            this.versionApi + "externos/radicados-externos/token-Sgdea-scan",
            params,
            this.authorization,
          )
          .subscribe(
            (res) => {
              this.resServicesSgdeaScan = res;

              const linkSource = `SgdeaScan://aplicacion.documento?toquen=${this.resServicesSgdeaScan.message}&idRadicado=${this.dataIdRadicados[0]}&tipoArchivo=1`;
              const downloadLink = document.createElement("a");

              downloadLink.href = linkSource;
              downloadLink.click();
            },
            (err) => {
              this.resServicesSgdeaScanErr = err;
              // Evaluar respuesta de error del servicio
              this.globalAppService
                .resolveResponseError(this.resServicesSgdeaScanErr)
                .then((res) => {});
            },
          );
        break;
    }
  }

  openDialog(file, width, data) {
    const dialogRef = this.dialog.open(file, {
      disableClose: true,
      width: width,
      data: data,
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  /** Cerrar o desdruir componente observaciones */
  closeObserva(dataObserva) {
    // Se reestablecen los valores que se muestran en el componente de observaciones
    this.showAgenda = false; // Transaccion agendar
    this.showReasignacion = false; // Transaccion reasignacion
    this.showVOBO = false; // Transaccion VOBO
    this.showCopyInformaded = false; // Transaccion de copiar informado
    this.showTipoDocumental = true; // Muestra el campo tipos documentales en el modal de adjuntar documentos
    this.showObservacion = true; // Muestra el campo observación en el modal de adjuntar documentos
    this.statusNameFile = false; // Oculta el campo nombre archivo
    this.statusModalIncludeInFile = false; // Oculta el modal incluir en expediente
    this.validateFile = [
      { type: "xls" },
      { type: "xlsx" },
      { type: "pdf" },
      { type: "doc" },
      { type: "docx" },
    ];
    // Fin reestablecer variables
    this.statusUploadFileAne = false; // Modal carga de anexos
    this.statusUploadFileAneMasive = false; // Modal de anexos masivos

    // dataObserva es la data que retorna el componente de observaciones
    if (dataObserva.status) {
      switch (this.operationDialogObserva) {
        case "schedule":
          this.transactionSchedule(dataObserva);
          break;
        case "send":
          this.transactionReasing(dataObserva);
          break;
        case "annulationRequest":
          this.transactionCancellationRequest(dataObserva);
          break;
        case "discardConsecutive":
          this.transactionDiscardConsecutive(dataObserva);
          break;
        case "voboRequest":
          this.transactionVoboRequest(dataObserva);
          break;
        case "copyInformaded":
          this.transactionCopyInformaded(dataObserva);
          break;
        case "returnFiling":
          this.transactionReturnFiling(dataObserva);
          break;
        case "finalizeFiling":
          this.transactionFinalizeFiling(dataObserva);
          break;
        case "withdrawal":
          this.transactionWithdrawal(dataObserva);
          break;
        case "includeInFile":
          this.transactionIncludeFiles(dataObserva);
          break;
      }
    }
    this.statusModalUploadFile = false;
    this.statusModalMain = false;

    if (
      this.operationDialogObserva == "attachment" ||
      this.operationDialogObserva == "attachmentMain" ||
      this.operationDialogObserva == "loadFormat"
    ) {
      this.onSearchId(this.paramOID, this.authorization);
    }
  }

  transactionPrintRadi() {
    // Se imprime el radicado con el print del navegador
    // const printContents = imprimir.innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();

    // Se retorna el contenido original
    // document.body.innerHTML = originalContents;

    // Ocultamos el mat-drawer
    let matDrawer = document.querySelector(".mat-drawer") as HTMLElement;
    matDrawer.classList.add("d-none");
    // Ocultamos el btnFloatContentVertical
    let btnFloatContentVertical = document.querySelector(
      ".btnFloatContentVertical",
    ) as HTMLElement;
    btnFloatContentVertical.classList.add("d-none");

    let matDrawerContent = document.querySelector(
      ".mat-drawer-content",
    ) as HTMLElement;
    matDrawerContent.style.overflow = "visible";

    const matDrawerContainer = document.querySelector(
      ".mat-drawer-container",
    ) as HTMLElement;
    matDrawerContainer.setAttribute(
      "style",
      "width: auto, height: auto; min-height: auto; max-width: auto;",
    );

    setTimeout(() => {
      window.print();
      matDrawer.classList.remove("d-none");
      btnFloatContentVertical.classList.remove("d-none");
      matDrawerContent.style.overflow = "auto";
      matDrawerContainer.setAttribute(
        "style",
        `width: 100vw; height: 100vh; min-height: ${this.matDrawerContainerStyle[2]};`,
      );
    }, 1000);
  }
  transactionReturnFiling(dataObserva) {
    let ButtonSelectedData: any = {
      0: {
        id: this.paramOID,
        idInitialList: this.paramOID,
      },
    };

    // Cambia el los mensajes de texto del componete para confirmar la eliminacion
    this.globalAppService.text18nGet().then((res) => {
      this.resSerLenguage = res;
      // console.log( this.resSerLenguage );
      this.titleMsg = this.resSerLenguage.titleMsg;
      this.textMsg = this.resSerLenguage["textMsgRadiReturnOne"];
      this.bntCancelar = this.resSerLenguage["bntCancelarSendMail"];
      this.btnConfirmacion = this.resSerLenguage["btnConfirmar"];

      swal({
        title: this.titleMsg,
        text: this.textMsg,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: this.bntCancelar,
        confirmButtonText: this.btnConfirmacion,
        cancelButtonClass: "btn btn-danger",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();

          let params = {
            observacion: dataObserva.data.observacion,
            ButtonSelectedData: ButtonSelectedData,
          };

          this.restService
            .restPost(
              this.versionApi + "radicacion/transacciones/return-filing",
              params,
              this.authorization,
            )
            .subscribe(
              (res) => {
                this.resServicesReturnFiling = res;

                this.globalAppService
                  .resolveResponse(this.resServicesReturnFiling, false)
                  .then((res) => {
                    const responseResolveResponse = res;

                    if (responseResolveResponse == true) {
                      for (let key in this.resServicesReturnFiling
                        .notificacion) {
                        this.sweetAlertService.showNotification(
                          this.resServicesReturnFiling.notificacion[key][
                            "type"
                          ],
                          this.resServicesReturnFiling.notificacion[key][
                            "message"
                          ],
                        );
                      }
                      this.sweetAlertService.sweetClose();
                    }

                    if (this.resServicesReturnFiling.data) {
                      this.router.navigate([this.redirectionPath]);
                    } else {
                      this.onSearchId(this.paramOID, this.authorization);
                    }
                  });
              },
              (err) => {
                this.resServicesReturnFilingErr = err;
                // Evaluar respuesta de error del servicio
                this.globalAppService
                  .resolveResponseError(this.resServicesReturnFilingErr)
                  .then((res) => {});
              },
            );
        }
      });
    });
  }

  transactionSchedule(dataObserva) {
    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
        },
      },
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/schedule",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesSchedule = res;
          // console.log(this.resServicesSchedule);

          this.globalAppService
            .resolveResponse(this.resServicesSchedule, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesSchedule["message"],
                );
                // this.sweetAlertService.showSwal( 'success-message', 'Datos almacenados', this.resServicesSchedule['']);
                this.onSearchId(this.paramOID, this.authorization);
              }
            });
        },
        (err) => {
          this.resServicesScheduleErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesScheduleErr)
            .then((res) => {});
        },
      );
  }

  /**
   * funcion que realiza una asignación a un usuario para que continue con el tramite
   * @param dataObserva data del modal observaciones
   */
  transactionReasing(dataObserva) {
    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/re-asign",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesReasign = res;

          this.globalAppService
            .resolveResponse(this.resServicesReasign, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesReasign["message"],
                );
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
              this.router.navigate([this.redirectionPath]);
            });
        },
        (err) => {
          this.resServicesReasignErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesReasignErr)
            .then((res) => {});
        },
      );
  }

  /**
   * funcion que solicita VOBO o realiza una asignación a un usuario para que de un (visto bueno) VOBO
   * @param dataObserva data del modal observaciones
   */
  transactionVoboRequest(dataObserva) {
    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/solicita-vobo",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesSoliVobo = res;

          this.globalAppService
            .resolveResponse(this.resServicesSoliVobo, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesSoliVobo["message"],
                );
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
              this.router.navigate([this.redirectionPath]);
            });
        },
        (err) => {
          this.resServicesSoliVoboErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesSoliVoboErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Transaccion de VOBO (Visto bueno) no recibe nada, pero toma los ID's de los radicados
   * seleccionados para el debido consumo de servicio
   */
  transactionVobo() {
    /** Se asigna el valor del id del radicado que se está actualizando */
    let data = {
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };
    // Cargando true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPut(
        this.versionApi + "radicacion/transacciones/vobo",
        data,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesVobo = res;

          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resServicesVobo, true, this.redirectionPath)
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesVobo["message"],
                );
                this.continueTransaccion();
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
            });
        },
        (err) => {
          this.resServicesVoboErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(
              this.resServicesVoboErr,
              true,
              this.redirectionPath,
            )
            .then((res) => {});
        },
      );
  }

  /**
   * Mensaje de confirmación para continuar con la trasacciones
   */
  continueTransaccion() {
    // Cambia el los mensajes de texto del componete para confirmar la eliminacion
    this.globalAppService.text18nGet().then((res) => {
      this.resSerLenguage = res;
      // console.log( this.resSerLenguage );
      this.titleMsg = "";
      this.textMsg = this.resSerLenguage["textMsContinuarPro"];
      let textReasignar = this.resSerLenguage["Reasignar"];
      let textDevolver = this.resSerLenguage["Devolver"];

      swal({
        title: this.titleMsg,
        text: this.textMsg,
        type: "success",
        showCancelButton: true,
        cancelButtonText: textReasignar,
        confirmButtonText: textDevolver,
        cancelButtonClass: "btn btn-success",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          // Transacion Devolver
          // Le asigna la operacion a ejecutar
          this.operationDialogObserva = "returnFiling";
          this.textFormObservaHeader = "Devolver radicado";
          this.statusModalMain = true;
        }
        // Si el valor es igual a cancelar entonces es reasignar
        if (String(result.dismiss) === "cancel") {
          // Transaccion send - reasignar
          this.showReasignacion = true; // Transaccion reasignacion
          // Le asigna la operacion a ejecutar
          this.operationDialogObserva = "send";
          // Titulo del modal segun el title del boton
          this.textFormObservaHeader = "Reasignar";
          // muestra el componente
          this.statusModalMain = true;
        }
      });
    });
  }

  /**
   * Transaccion de copiar informado
   * @param data recibe que contiene los id de los radicados y la observacion que digita el usuario
   */
  transactionCopyInformaded(dataObserva) {
    let dataSend = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/informados/copy",
        dataSend,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesCopyInfo = res;

          this.globalAppService
            .resolveResponse(this.resServicesCopyInfo, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesCopyInfo["message"],
                );
                // Cargando false
                this.sweetAlertService.sweetClose();
                this.onSearchId(this.paramOID, this.authorization);
              }
            });
        },
        (err) => {
          this.resServicesCopyInfoErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesCopyInfoErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Transaccion de finalizar radicado
   * @param data recibe que contiene los id de los radicados y la observacion que digita el usuario
   */
  transactionFinalizeFiling(dataObserva) {
    let dataSend = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/finalize-filing",
        dataSend,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesFinalizeFiling = res;

          this.globalAppService
            .resolveResponse(this.resServicesFinalizeFiling, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesFinalizeFiling["message"],
                );
                // Cargando false
                this.sweetAlertService.sweetClose();
              }
              this.router.navigate([this.redirectionPath]);
            });
        },
        (err) => {
          this.resServicesFinalizeFilingErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesFinalizeFilingErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Función para enviar documentos firmados
   * @param dataVal
   */
  transactionShippingReady() {
    let dataSend = {
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/shipping-ready",
        dataSend,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerShippingReady = res;

          this.globalAppService
            .resolveResponse(this.resSerShippingReady, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resSerShippingReady["message"],
                );
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
              this.router.navigate([this.redirectionPath]);
            });
        },
        (err) => {
          this.resSerShippingReadyErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerShippingReadyErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion para solicitar la anulacion de un radicado
   * @param dataObserva data del modal observaciones
   */
  transactionCancellationRequest(dataObserva) {
    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi +
          "radicacion/transacciones/solicita-anulacion-radicado",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesAnnulment = res;

          this.globalAppService
            .resolveResponse(this.resServicesAnnulment, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesAnnulment["message"],
                );
                this.onSearchId(this.paramOID, this.authorization);
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
            });
        },
        (err) => {
          this.resServicesAnnulmentErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesAnnulmentErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion para descartar un consecutivo "radicado temporal"
   * @param dataObserva data del modal observaciones
   */
  transactionDiscardConsecutive(dataObserva) {
    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
        },
      },
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/descartar-consecutivo",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesDiscardConsecutive = res;

          this.globalAppService
            .resolveResponse(this.resServicesDiscardConsecutive, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resServicesDiscardConsecutive["message"],
                );
                this.onSearchId(this.paramOID, this.authorization);
                // Cargando false
                this.sweetAlertService.sweetClose();
              }
            });
        },
        (err) => {
          this.resServicesDiscardConsecutiveErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesDiscardConsecutiveErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion que incluye los radicados a expedientes
   * @param dataObserva
   */
  transactionIncludeFiles(dataObserva) {
    this.sweetAlertService.sweetLoading();

    let params = {
      data: dataObserva.data,
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/include-expedient",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerIncludeFiles = res;
          // console.log(this.resSerIncludeFiles);

          this.globalAppService
            .resolveResponse(this.resSerIncludeFiles, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resSerIncludeFiles["message"],
                );
                // Cargando false
                this.sweetAlertService.sweetClose();
              }
              this.onSearchId(this.paramOID, this.authorization);
            });
        },
        (err) => {
          this.resSerIncludeFilesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerIncludeFilesErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion que imprime los radicados seleccionados
   */
  transactionPrintStickers() {
    this.sweetAlertService.sweetLoading();
    let params = {
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
    };

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/print-sticker",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerPrintStickers = res;
          // console.log(this.resSerPrintStickers);

          this.globalAppService
            .resolveResponse(this.resSerPrintStickers, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resSerPrintStickers["message"],
                );
                if (this.resSerPrintStickers.datafile) {
                  this.resSerPrintStickers.datafile.forEach((dtFile) => {
                    this.downloadFile(dtFile.dataFile, dtFile.fileName);
                  });
                }
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
            });
        },
        (err) => {
          this.resSerPrintStickersErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerPrintStickersErr)
            .then((res) => {});
        },
      );
  }

  transactionEnviarCorreoRadicado() {
    this.sweetAlertService.sweetLoading();
    let params = {
      id: this.paramOID,
    };
    params["correoRemitente"] =
      this.resServicesDestinatario.modelClientes[0].correoElectronicoCliente;
    console.log(params);
    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/send-email-radicado",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerPrintStickers = res;
          // console.log(this.resSerPrintStickers);

          this.globalAppService
            .resolveResponse(this.resSerPrintStickers, false)
            .then((res) => {
              const responseResolveResponse = res;
              if (responseResolveResponse == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resSerPrintStickers["message"],
                );
                if (this.resSerPrintStickers.datafile) {
                  this.resSerPrintStickers.datafile.forEach((dtFile) => {
                    this.downloadFile(dtFile.dataFile, dtFile.fileName);
                  });
                }
              }
              // Cargando false
              this.sweetAlertService.sweetClose();
              this.changeChildrenService.changeProcess({ proccess: "reload" });
            });
        },
        (err) => {
          this.resSerPrintStickersErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerPrintStickersErr)
            .then((res) => {});
        },
      );
  }

  /**
   * Transaccion de desiste el ciudadano
   * @param data llegan los ids de radicado
   */
  transactionWithdrawal(dataObserva) {
    /** Se asigna el valor del id del radicado que se está actualizando */
    let params = {
      ButtonSelectedData: {
        0: {
          id: this.paramOID,
          idInitialList: this.paramOID,
        },
      },
      observacion: dataObserva.data.observacion,
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(
        this.versionApi + "radicacion/transacciones/withdrawal",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerWithdrawal = res;
          // console.log(this.resSerWithdrawal);

          this.globalAppService
            .resolveResponse(this.resSerWithdrawal, false)
            .then((res) => {
              let responseResolveResponseDown = res;

              if (responseResolveResponseDown == true) {
                this.sweetAlertService.showNotification(
                  "success",
                  this.resSerWithdrawal.message,
                );
                // loading false
                this.sweetAlertService.sweetClose();
                // Redirecciona
                this.router.navigate([this.redirectionPath]);
              }
            });
        },
        (err) => {
          this.resSerWithdrawalErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerWithdrawalErr)
            .then((res) => {});
        },
      );
  }

  sendEmailClient() {
    // Cambia el los mensajes de texto del componete para confirmar la eliminacion
    this.globalAppService.text18nGet().then((res) => {
      this.resSerLenguage = res;
      // console.log( this.resSerLenguage );
      this.titleMsg = this.resSerLenguage.titleMsg;
      this.textMsg =
        this.resSerLenguage["textMsgSendMail"] +
        this.hashLocalStorage.data.radiSendReplyEMail;
      this.bntCancelar = this.resSerLenguage["bntCancelarSendMail"];
      this.btnConfirmacion = this.resSerLenguage["btnConfirmacionSendMail"];

      swal({
        title: this.titleMsg,
        text: this.textMsg,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: this.bntCancelar,
        confirmButtonText: this.btnConfirmacion,
        cancelButtonClass: "btn btn-danger",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          /** Se asigna el valor del id del radicado que se está actualizando */
          let data = {
            id: {
              0: {
                id: this.paramOID,
              },
            },
          };
          // Cargando true
          this.sweetAlertService.sweetLoading();

          this.restService
            .restPut(
              this.versionApi + "radicacion/transacciones/send-reply-mail",
              data,
              this.authorization,
            )
            .subscribe(
              (res) => {
                this.resServicesSendEmailCli = res;

                // Evaluar respuesta del servicio
                this.globalAppService
                  .resolveResponse(
                    this.resServicesSendEmailCli,
                    true,
                    this.redirectionPath,
                  )
                  .then((res) => {
                    let responseResolveResponse = res;
                    if (responseResolveResponse == true) {
                      this.sweetAlertService.showNotification(
                        "success",
                        this.resServicesSendEmailCli.message,
                      );
                      // this.sweetAlertService.showSwal( 'success-message', 'Datos almacenados', this.resServicesSendEmailCli.message);
                      // Redirecciona a la pagina principal
                      this.router.navigate([this.redirectionPath]);
                    }
                  });
              },
              (err) => {
                this.resServicesSendEmailCliErr = err;
                // Evaluar respuesta de error del servicio
                this.globalAppService
                  .resolveResponseError(
                    this.resServicesSendEmailCliErr,
                    true,
                    this.redirectionPath,
                  )
                  .then((res) => {});
              },
            );
        }
      });
    });
  }

  /** Descarga de paquete de documentos del radicado */
  downloadDocumentPackage() {
    const titleMsg = this.translate.instant("titleMsg");
    const textMsg = this.translate.instant("textMsgDownloadDocumentPackage");
    const bntCancelar = this.translate.instant("bntCancelar");
    const btnConfirmacion = this.translate.instant(
      "btnConfirmacionDownloadDocumentPackage",
    );

    swal({
      title: titleMsg,
      text: textMsg,
      type: "warning",
      showCancelButton: true,
      cancelButtonText: bntCancelar,
      confirmButtonText: btnConfirmacion,
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        /** Se asigna el valor del id del radicado seleccionado */
        // let data = {
        //   id: this.paramOID
        // };
        let data = {
          id: this.dataIdRadicados[0],
        };
        // Cargando true
        this.sweetAlertService.sweetLoading();

        this.restService
          .restPost(
            this.versionApi + "radicacion/radicados/download-document-package",
            data,
            this.authorization,
          )
          .subscribe(
            (res) => {
              this.resServicesDownloadDocumentPackage = res;
              // Evaluar respuesta del servicio
              this.globalAppService
                .resolveResponse(this.resServicesDownloadDocumentPackage, false)
                .then((res) => {
                  let responseResolveResponse = res;
                  if (responseResolveResponse == true) {
                    this.downloadFile(
                      this.resServicesDownloadDocumentPackage.datafile,
                      this.resServicesDownloadDocumentPackage.fileName,
                    );
                  }
                  // Cargando false
                  this.sweetAlertService.sweetClose();
                });
            },
            (err) => {
              this.resServicesDownloadDocumentPackageErr = err;
              // Evaluar respuesta de error del servicio
              this.globalAppService
                .resolveResponseError(
                  this.resServicesDownloadDocumentPackageErr,
                  false,
                )
                .then((res) => {});
            },
          );
      }
    });
  }

  /**
   * Funcion que valida el campo si es multiple
   */
  validaCapoMultiple() {
    // Valida si es posible mostrar la información del multiple remitente
    if (
      this.codigoTipoRadicado == environment.tipoRadicadoCodigo.entrada ||
      this.codigoTipoRadicado == environment.tipoRadicadoCodigo.pqrs ||
      this.codigoTipoRadicado == environment.tipoRadicadoCodigo.salida
    ) {
      this.validaMultiple = false;
      this.initialNotificationMessageArray = [];
      this.moduleForm.controls["unicoRadiCgTipoRadicado"].setValue(false);
    } else {
      if (this.dataMultiRadi[this.codigoTipoRadicado] == 10) {
        this.validaMultiple = true;
        this.initialNotificationMessageArray = ["textMultiplesRemitentes"];
        this.moduleForm.controls["unicoRadiCgTipoRadicado"].setValue(true);
        this.MatSlideToggleChangeMulti({ checked: true });
      }
    }
  }

  MatSlideToggleChangeMulti(event) {
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.messageMultiple = "Si";
      this.initialNotificationMessageArray = ["textMultiplesRemitentes"];
    } else {
      this.messageMultiple = "No";
      this.initialNotificationMessageArray = [];
    }
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }

  /**
   * Descarga el archivo que llega en base64
   * @param file el  en base 64
   * @param nameDownload nombre del archivo
   */
  downloadFile(file, nameDownload) {
    const linkSource = `data:application/octet-stream;base64,${file}`;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = nameDownload;
    downloadLink.click();
  }

  /** Métodos para el uso de la internacionalización */
  detectLanguageInitial() {
    if (localStorage.getItem("language")) {
      this.activeLang = localStorage.getItem("language");
    } else {
      this.activeLang = "es";
    }
    this.translate.setDefaultLang(this.activeLang);
  }

  detectLanguageChange() {
    this.subscriptionTranslateService$ =
      this.activateTranslateService.activateLanguageChange.subscribe(
        (language) => {
          this.languageReceive = language;
          this.translate.setDefaultLang(this.languageReceive);
        },
      );
  }
  /** Fin Métodos para el uso de la internacionalización */

  closeModalSendDocs(data) {
    this.statusModalUploadFile = false;
  }

  closeSendReplyMailModal(dataModal) {
    this.statusSendReplyMailModal = false;
  }

  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$)
      this.subscriptionTranslateService$.unsubscribe();
  }

  tipoRadicadoIdEntrada = environment.tipoRadicadoId.entrada;
  tipoRadicadoIdPqrs = environment.tipoRadicadoId.pqrs;

  accept: string = "";
  nombreArchivoSeleccionado: string = "";
  notificationErrExt: string = "Solo es permitido archivos";
  notificationErrExtArray: any = [];
  @ViewChild("inputFile", { static: false }) inputFile: ElementRef;

  uploadValid: boolean = false;

  /** Método para validar la busqueda personalizada de archivos en el navegador */
  validateInputFile() {
    this.accept = "";
    var validateFile: any = [
      { type: "xls" },
      { type: "xlsx" },
      { type: "pdf" },
      { type: "doc" },
      { type: "docx" },
    ];

    validateFile.forEach((element) => {
      this.accept = this.accept + "." + element.type + ",";
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.nombreArchivoSeleccionado = event.target.files[0].name;

      // console.log(event.target.files[0]);

      this.validateFileExtension(event.target.files[0]).then((res) => {
        if (res) {
          // if (event.target.files[0].size > this.maxSize) {
          /*let msjmaxTamanyo: any;
              msjmaxTamanyo = this.translate.instant('Solo es permitido cargar');
              msjmaxTamanyo = msjmaxTamanyo + ' ' + this.maxSizeText;
              this.sweetAlertService.sweetInfoText('El archivo es muy pesado', msjmaxTamanyo );

            this.uploadValid = false;
            this.inputFile.nativeElement.value = '';
            this.nombreArchivoSeleccionado = "";*/
          // } else {
          this.moduleForm.controls["fileUpload"].setValue(
            event.target.files[0],
          );
          this.uploadValid = true;
          // }
        } else {
          const notificationErrExt = this.translate.instant(
            this.notificationErrExt,
          );
          this.sweetAlertService.sweetInfoText(
            "Archivo no válido",
            notificationErrExt + " " + this.notificationErrExtArray.join(),
          );
          this.uploadValid = false;
          this.inputFile.nativeElement.value = "";
          this.nombreArchivoSeleccionado = "";
        }
      });
    } else {
      this.moduleForm.controls["fileUpload"].setValue("");
      this.nombreArchivoSeleccionado = "";
    }
  }

  // onFileSelected(event: any): void {
  //   const selectedFiles = event.target.files;
  //   let archivosInvalidos = false;
  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     const file = selectedFiles[i];
  //     const extension = file.name.split('.').pop().toLowerCase();
  //     if (['png', 'jpg', 'jpeg', 'pdf'].includes(extension)) {
  //       this.archivosSubidos.push(file);
  //     } else {
  //       archivosInvalidos = true;
  //     }
  //   }

  //   if (archivosInvalidos) {
  //     this.toastSvc.open({
  //       title: 'Error',
  //     });
  //   }
  //   this.moduleForm.controls["fileUpload"].setValue(this.archivosSubidos);
  //   this.moduleForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  // }

  onFileSelectedV1(event: any): void {
    const selectedFiles = event.target.files;
    const extensionesPermitidas = [
      "3gp",
      "avi",
      "bmp",
      "csv",
      "doc",
      "docx",
      "gif",
      "html",
      "jpeg",
      "jpg",
      "mov",
      "mp2",
      "mp3",
      "mp4",
      "mpeg",
      "odg",
      "odp",
      "odt",
      "otg",
      "pdf",
      "png",
      "ppsx",
      "ppt",
      "pptx",
      "rar",
      "tar",
      "tif",
      "txt",
      "wav",
      "wma",
      "wmv",
      "xls",
      "xlsx",
      "zip",
    ];
    const MAX_TOTAL_SIZE_MB = 25 * 1024 * 1024; // 25 Megabytes en bytes
    const MAX_FILES = 10; // Máximo de 10 archivos
    let totalSize = this.archivosSubidos.reduce(
      (acc, file) => acc + file.size,
      0,
    ); // Suma actual de los archivos subidos
    let archivosInvalidos = false;

    // Verificar si ya hay más de 10 archivos subidos

    if (this.archivosSubidos.length + selectedFiles.length > MAX_FILES) {
      this.toastSvc.open({
        title: "Error",
        description: `No puedes subir más de ${MAX_FILES} archivos.`,
        success: false,
      });
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const extension = file.name.split(".").pop().toLowerCase();
      const size = file.size;

      // Verificar si la extensión es permitida y el archivo no es un .exe
      if (extensionesPermitidas.includes(extension) && extension !== "exe") {
        // Verificar si la suma total de los archivos seleccionados no supera 25 MB
        if (totalSize + size <= MAX_TOTAL_SIZE_MB) {
          this.archivosSubidos.push(file);
          totalSize += size; // Actualiza el tamaño total
        } else {
          archivosInvalidos = true;
          this.toastSvc.open({
            title: "Error",
            description: `La suma total de los archivos seleccionados excede el tamaño máximo de 25 MB.`,
            success: false,
          });
          break; // Salir del bucle si ya se excede el límite
        }
      } else {
        archivosInvalidos = true;
        this.toastSvc.open({
          title: "Error",
          description: `El archivo "${file.name}" tiene una extensión no permitida o es un .exe.`,
          success: false,
        });
      }
    }

    if (archivosInvalidos) {
      this.toastSvc.open({
        title: "Error",
        description:
          "Hay archivos que no cumplen con las condiciones (extensión o tamaño).",
        success: false,
      });
    }

    this.moduleForm.controls["fileUpload"].setValue(this.archivosSubidos);
    this.moduleForm
      .get("anexos")
      .setValue(
        this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null,
      );
  }

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    const extensionesPermitidas = [
      "3gp",
      "avi",
      "bmp",
      "csv",
      "doc",
      "docx",
      "gif",
      "html",
      "jpeg",
      "jpg",
      "mov",
      "mp2",
      "mp3",
      "mp4",
      "mpeg",
      "odg",
      "odp",
      "odt",
      "otg",
      "pdf",
      "png",
      "ppsx",
      "ppt",
      "pptx",
      "rar",
      "tar",
      "tif",
      "txt",
      "wav",
      "wma",
      "wmv",
      "xls",
      "xlsx",
      "zip",
    ];
    const MAX_TOTAL_SIZE_MB = 25 * 1024 * 1024; // 25 Megabytes en bytes
    const MAX_TOTAL_ALL_SIZE_MB = 25 * 1024 * 1024 * 1024; // 25 Megabytes en bytes
    const MAX_FILES = 10; // Máximo de 10 archivos
    let totalSize = this.archivosSubidos.reduce(
      (acc, file) => acc + file.size,
      0,
    ); // Suma actual de los archivos subidos
    let archivosInvalidos = false;

    // Verificar si ya hay más de 10 archivos subidos
    /*
    if (this.archivosSubidos.length + selectedFiles.length > MAX_FILES) {
      this.toastSvc.open({
        title: 'Error',
        description: `No puedes subir más de ${MAX_FILES} archivos.`,
        success: false
      });
      return;
    }
    */

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const extension = file.name.split(".").pop().toLowerCase();
      const size = file.size;

      // Verificar si la extensión es permitida y el archivo no es un .exe
      if (extensionesPermitidas.includes(extension) && extension !== "exe") {
        // Verificar si la suma total de los archivos seleccionados no supera 25 MB
        this.archivosSubidos.push(file);
        /*
        if ((totalSize + size) <= MAX_TOTAL_ALL_SIZE_MB) {
          this.archivosSubidos.push(file);
          totalSize += size; // Actualiza el tamaño total
        } else {
          archivosInvalidos = true;
          this.toastSvc.open({
            title: 'Error',
            description: `La suma total de los archivos seleccionados excede el tamaño máximo de 25 MB.`,
            success: false
          });
          break; // Salir del bucle si ya se excede el límite
        }
        */
      } else {
        archivosInvalidos = true;
        this.toastSvc.open({
          title: "Error",
          description: `El archivo "${file.name}" tiene una extensión no permitida o es un .exe.`,
          success: false,
        });
      }
    }

    if (archivosInvalidos) {
      this.toastSvc.open({
        title: "Error",
        description:
          "Hay archivos que no cumplen con las condiciones (extensión o tamaño).",
        success: false,
      });
    }

    this.moduleForm.controls["fileUpload"].setValue(this.archivosSubidos);
    this.moduleForm
      .get("anexos")
      .setValue(
        this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null,
      );
  }

  // Método para eliminar un archivo de la lista.
  eliminarArchivo(index: number): void {
    this.archivosSubidos.splice(index, 1);
    // Actualizar el valor del formulario después de eliminar el archivo.
    this.moduleForm
      .get("anexos")
      .setValue(
        this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null,
      );
    this.moduleForm.controls["fileUpload"].setValue("");
  }

  deleteFiles(event: any): void {
    //this.archivosSubidos.splice(index, 1);
    // Actualizar el valor del formulario después de eliminar el archivo.
    if (event.checked == false) {
      this.archivosSubidos = [];
      this.moduleForm.get("anexos").setValue(null);
    }
  }

  /**
   * Valida la extensión del archivo que será cargado
   * @param nameFile nombre del archivo a cargar
   */
  validateFileExtension(nameFile) {
    return new Promise<boolean>((resolve) => {
      let extensionAcepted = false;
      this.notificationErrExtArray = [];
      const extensionArr = nameFile.name.split(".");
      const extension = extensionArr.pop().toLowerCase();
      this.validateFile.forEach((element) => {
        this.notificationErrExtArray.push("." + element.type);
        if (extension == element.type) {
          extensionAcepted = true;
        }
      });

      resolve(extensionAcepted);
    });
  }

  /**
   * Valida la consulta de clientes para enviar al api consultar
   * y traer datos al select
   * @param {any} event
   */
  async selectKeyPressClientes(stringSearch) {
    this.getListClientes(stringSearch);
  }
  //elimina todos los emojis del texto proporcionado y devuelve el texto limpio.
  removeEmojis(text: string): string {
    return text.replace(/\p{Extended_Pictographic}/gu, "");
  }

  //procesa y limpia emojis de la entrada de texto
  handleInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.value = this.removeEmojis(textarea.value);
    this.moduleForm.controls["asuntoRadiRadicado"].setValue(textarea.value);
  }

  updateDireccionNotificacion() {
    if (this.moduleForm.get("tipoZonaNotificacion").value === false) {
      const tipoDeViaNotificacion = this.moduleForm.get(
        "tipoDeViaNotificacion",
      ).value;
      const numViaNotificacion =
        this.moduleForm.get("numViaNotificacion").value;
      const letraNotificacion = this.moduleForm.get("letraNotificacion").value;
      const bisNotificacion =
        this.moduleForm.get("bisNotificacion").value === "SI" ? "BIS" : "";
      const letraDosNotificacionDos = this.moduleForm.get(
        "letraDosNotificacionDos",
      ).value;
      const sufijoNotificacion =
        this.moduleForm.get("sufijoNotificacion").value;
      const nPlacaNotificacion =
        this.moduleForm.get("nPlacaNotificacion").value;
      const letraTresNotificacion = this.moduleForm.get(
        "letraTresNotificacion",
      ).value;
      const nPlacaDosNotificacion = this.moduleForm.get(
        "nPlacaDosNotificacion",
      ).value;
      const sufijoDosNotificacion = this.moduleForm.get(
        "sufijoDosNotificacion",
      ).value;
      const complementoNotificacion = this.moduleForm.get(
        "complementoNotificacion",
      ).value;

      const direccionNotificacion = `${tipoDeViaNotificacion} ${numViaNotificacion} ${letraNotificacion} ${bisNotificacion} ${letraDosNotificacionDos}
      ${sufijoNotificacion} ${nPlacaNotificacion} ${letraTresNotificacion} ${nPlacaDosNotificacion} ${sufijoDosNotificacion}
      ${complementoNotificacion} `;
      if (!this.moduleForm.get("direccionManualCuentaContrato").value)
        this.moduleForm
          .get("direccionCliente")
          .setValue(direccionNotificacion.toUpperCase(), { emitEvent: false });
    } else {
      let direccionNotificacionManual = this.moduleForm.get("direccion").value;
      this.moduleForm
        .get("direccionCliente")
        .setValue(direccionNotificacionManual.toUpperCase());
    }
  }

  /** FIN HU 030 - Radicados con varias cuentas contrato y agregar o editar cuentas contrato en un radicado */
  openDialogCreacionContactos() {
    const dialogRef = this.dialog.open(CreacionContactosComponent, {
      data: this.resSerFormSubmit.data.idRadiRadicado,
      width: "1200px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  direccionManualCuentaContratoChange(event) {
    if (event.checked) {
      // Validamos si la direccion esta vacia
      if (this.moduleForm.get("direccion").value == "") {
        this.sweetAlertService.sweetInfoText(
          "Dirección",
          "Por favor diligencie la dirección",
        );
        // Hacemos que el checkbox quede desmarcado
        this.moduleForm.controls["direccionManualCuentaContrato"].setValue(
          false,
        );
        event.checked = false;
      } else {
        //  this.moduleForm.controls["tipoZonaNotificacion"].setValue(true);
        this.moduleForm.controls["direccionCliente"].setValue(
          this.moduleForm.controls["direccion"].value,
        );
      }
    } else {
      this.sweetAlertService.sweetClose();
      //  this.moduleForm.controls["tipoZonaNotificacion"].setValue(false);
      this.moduleForm.controls["direccionCliente"].setValue(
        this.direccionCliente,
      );
    }
  }

  validarCuentaContrato(
    control: AbstractControl,
  ): { [key: string]: any } | null {
    const control2 = control.value;
    // Validamos que solo se permita entre 6 y 12 caracteres
    if (control2.length > 12) {
      return {
        noEsCuentaContrato: true,
        mensaje:
          "El número de cuenta contrato no puede tener más de 12 caracteres.",
      };
    } else {
      return { noEsCuentaContrato: false };
    }
  }

  validarUnaVez2: boolean = false;
  onNumeroCuentaContratoInput(): void {
    const controlValue = this.moduleForm.controls["numeroCuentaContrato"].value;

    if (controlValue && controlValue[0].length > 0 && !this.validarUnaVez2) {
      this.validarUnaVez2 = true;
      this.moduleForm.controls["numeroCuentaContrato"].setValidators([
        this.validarCuentaContrato,
      ]);
    }
    if (!controlValue || controlValue[0].length === 0) {
      this.validarUnaVez2 = false;
      this.moduleForm.controls["numeroCuentaContrato"].setValidators([]);
      this.moduleForm.controls["numeroCuentaInterna"].reset();
      this.moduleForm.controls["direccion"].reset();
      this.moduleForm.controls["zona"].reset();
    }

    setTimeout(() => {
      if (
        controlValue &&
        !this.moduleForm.controls["numeroCuentaContrato"]?.hasError(
          "noEsCuentaContrato",
        )
      ) {
        this.validarUnaVez2 = false;
        this.moduleForm.controls["numeroCuentaContrato"].setValidators([]);
        this.moduleForm.controls[
          "numeroCuentaContrato"
        ].updateValueAndValidity();
        this.buscarCuentaContrato();
      }
    });

    this.moduleForm.controls["numeroCuentaContrato"].updateValueAndValidity();
  }

  resSerCuentaContrato: any;
  resSerCuentaContratoErr: any;
  buscarCuentaContrato() {
    this.sweetAlertService.sweetLoading();
    let cuenta = this.moduleForm.controls["numeroCuentaContrato"].value;
    this.restService
      .restGetNotDecrypt(
        this.versionApi + "api/v1/cuenta-contrato/detalles/" + cuenta,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resSerCuentaContrato = res;
          if (this.resSerCuentaContrato.data.E_DETALLES.length > 0) {
            this.showCreateDireccion = false;
            this.moduleForm.controls["numeroCuentaInterna"].setValue(
              this.resSerCuentaContrato.data.E_DETALLES[0].CUENTA_INTERNA,
            );
            this.moduleForm.controls["direccion"].setValue(
              this.resSerCuentaContrato.data.E_DETALLES[0].CALLE,
            );
            this.moduleForm.controls["zona"].setValue(
              this.resSerCuentaContrato.data.E_DETALLES[0].ZONA,
            );
          } else {
            this.showCreateDireccion = true;
            this.moduleForm.controls["numeroCuentaInterna"].reset();
            this.moduleForm.controls["direccion"].reset();
            this.moduleForm.controls["zona"].reset();
            this.sweetAlertService.sweetInfo("Info", [
              "No se encontró información con el número de cuenta contrato ingresado: " +
                cuenta +
                ".",
            ]);
          }
          this.sweetAlertService.sweetClose();
        },
        (err) => {
          this.resSerCuentaContratoErr = err;
          // Evaluar respuesta de error del servicio
          this.sweetAlertService.sweetClose();
          this.globalAppService
            .resolveResponseError(this.resSerCuentaContratoErr)
            .then((res) => {});
        },
      );
  }

  validarSiClonado() {
    let clone = this.router.url.includes("filing-clone"); // Validate if URL contains filing-clone
    if (clone) {
      this.isToclone = true;
    }
  }

  changeDocument(content) {
    this.editorContent = content.data;
  }

  onInputChangeOnlyNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, "");
    let int = parseInt(input.value, 10) || 0;
    this.moduleForm.get("foliosRadiRadicado")?.setValue(int);
  }
}

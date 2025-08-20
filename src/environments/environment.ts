/**

 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  /**
   *
   * Variables de conexión hacia el API REST
   */
  //apiUrl: 'http://139.177.195.95:8111/',
  //apiUrlBasePath: 'http://139.177.195.95:8111/',

  apiUrl: "http://localhost/",
  apiUrlBasePath: "http://localhost/",

  versionApiDefault: "",

  frontUrl: "/",

  /**
   * Variables para configurar servidor de sockets
   */
  SOCKET_ENDPOINT: "http://localhost:3005",
  socketConnect: "socketConnect",
  socketMenu: "socketMenu",
  socketMenuMulti: "socketMenuMulti",
  socketLanguage: "socketLanguage",
  roomRolUser: "roomRolUser_",
  roomLanguageUser: "roomLanguageUser_",

  /**
   * Nombre del hash almacenado en el LocalStorage, contiene los datos sencibles del usuario que
   * realizao inicio de sesión
   */
  hashMenu: "2c358af0-8cbb-46c6-a55c-e00f8b93a9b7",
  hashSgdea: "2586e6b7-fa9d-425d-9f67-1f98d266dc59",
  hashTimeOut: "8efa3946-f76b-49cc-9471-079bc883d850 ",

  hashMailSgdea: "9b307ade-1122-4dca-becf-b6174fe6c7a6",
  hashMailInitialListSgdea: "950f34cf-f23f-4138-8451-7321aeb612d0",

  /**
   * Nombre del dataList mostrado en el datatables, a esta se concatena el nombre del modulo que se ejecuta
   * Nombre del modulo donde se encuentra ubicado el usuario
   */
  hashDataList: "5705bffb-e313-43d8-865f-4edd8e40911a",
  hashDataListModule: "4544423c-cbab-404d-bec9-6a3beabe0843",
  hashDataFilter: "f97e407a-1aae-4953-873f-c104ffdffaaf",
  dataIdDepe: "2de2f8f8-8f12-406e-97e0-2d73320468ba",
  hashMenuButtonRadi: "f9817c23-7700-4a82-979c-f26e30d6ae58",
  hashMenuButtonRadiCor: "90af720f-86a6-4f21-9ca3-e2b97c7a7a4c",
  hashRadiAsociados: "8f9a3431-b417-4fec-b753-7cb4be3806fb",

  /** Lenguajes soportados */
  supportedLanguages: {
    es: true,
    en: true,
    br: false,
  },

  /**
   * Llave para la librería CryptoJS
   */
  llaveAES: "aegoh3quai3Aijum7cae0theifo}uv",

  /**
   * Clave de recaptcha
   */
  captchaSiteKey: "6Lc8_d4UAAAAANK-6A3w_lP6Crr6BJzT9ldbK_iO",
  /**
   * Tipos de usuario
   */
  tipoUsuario: {
    AdministradorSistema: 1,
    AdministradorGestionDoc: 2,
    VentanillaRadicacion: 3,
    Funcional: 4,
    Jefe: 5,
    Externo: 6,
    Cliente: 999,
  },

  /**
   * Estados de anulacion
   */
  estadoAnulacion: {
    Cancelacion: 1,
    Solicitud: 2,
    Aceptacion: 3,
  },
  /**
   * Estados de documento
   */
  statusDocsPrincipales: {
    Inactivo: 0,
    Combinado: 8,
    Firmado: 9,
    Cargado: 10,
  },
  /** Pais por defecto */
  defaultCountry: 1,
  /**
   * Estados de respuesta de servicios
   */
  statusErrorValidacion: 322, // Estado de error de validación
  statusErrorAccessDenied: 330, // Estado de error de permisos sobre acción
  statusErrorEncrypt: 390, // Estado de error en encriptación y desencriptación
  statusErrorBadRequest: 404, // Estado de error 404 recurso no existente
  statusErrorUnauthorized: 401, // Estado de error 401 Unauthorized
  /**
   * Estados de tipos de préstamo
   */
  statusLoanTypeText: {
    consultaSala: 1,
    prestamoFisico: 2,
    prestamoDigital: 3,
  },
  /**
   * Estado de préstamo
   */
  statusLoanNumber: {
    solicitudPrestamo: 18,
    prestamoAprobado: 19,
    prestamoCancelado: 20,
    prestamoDevuelto: 21,
    prestamoPorAutorizar: 25,
    prestamoAutorizado: 26,
  },
  /**
   * Estados expediente
   */
  statusExpedientesText: {
    finalizado: 11,
    pendienteTransferir: 13,
    transferenciaAceptada: 14,
    transferenciaRechazada: 15,
  },
  /*** Bandeja de Correos Radicacion Email */
  mailbox: "Recibidos",

  /**
   * Validación de tipos de archivo aceptados
   */
  validateFile: {
    anexosRadicado: [
      { type: "xls" },
      { type: "xlsx" },
      { type: "pdf" },
      { type: "doc" },
      { type: "docx" },
      { type: "odt" },
      { type: "jpg" },
      { type: "png" },
      { type: "avi" },
      { type: "mp3" },
      { type: "mp4" },
      { type: "html" },
      { type: "dwg" },
      { type: "dxf" },
      { type: "svg" },
      { type: "csv" },
      { type: "jpeg" },
      { type: "skp" },
      { type: "rvt" },
      { type: "rfa" },
      { type: "rte" },
      { type: "pln" },
      { type: "tpl" },
      { type: "txt" },
      { type: "docm" },
      { type: "rtf" },
      { type: "xlsm" },
      { type: "ods" },
      { type: "pps" },
      { type: "ppt" },
      { type: "ppsx" },
      { type: "pptx" },
      { type: "ppsm" },
      { type: "pptm" },
      { type: "potx" },
      { type: "odp" },
      { type: "wma" },
      { type: "wav" },
      { type: "flac" },
      { type: "midi" },
      { type: "ogg" },
      { type: "m3u" },
      { type: "divx" },
      { type: "mov" },
      { type: "mpg" },
      { type: "mkv" },
      { type: "wmv" },
      { type: "wpl" },
      { type: "bmp" },
      { type: "ico" },
      { type: "webp" },
      { type: "gif" },
      { type: "psd" },
      { type: "heic" },
      { type: "nef" },
      { type: "crw" },
      { type: "ai" },
      { type: "zip" },
      { type: "rar" },
      { type: "rar5" },
      { type: "7z" },
      { type: "ace" },
      { type: "r00" },
      { type: "r01" },
      { type: "gz" },
      { type: "xml" },
      { type: "eml" },
      { type: "msg" },
      { type: "tiff" },
      { type: "tar.bz2" },
    ],
  },

  /**
   *  Tipos de Radicado por codigo
   */
  tipoRadicadoCodigo: {
    salida: 1,
    entrada: 2,
    pqrs: 4,
  },
  /**
   *  Tipos de Radicado por id
   */
  tipoRadicadoId: {
    salida: 1,
    entrada: 2,
    pqrs: 4,
    comunicacionInterna: 3,
  },
  /**
   * Medio de Recepción
   */
  medioRecepcion: {
    correoElectronico: 7,
  },
  /**
   * Tipos de mascara TRD ConfiguracionMascara
   */
  mascaraTRD: {
    columnasSeparadas: 4,
  },
  /**
   * Tipo de persona Number muestra el id
   */
  tipoPersonaNumber: {
    PersonaJuridica: 1,
    PersonaNatural: 2,
    Funcionario: 3,
  },
  /**
   * Tiempo de cerrar sesión por inactividad en minutos
   */
  timeOutSessionMin: 120,
  /**
   * Estados el expediente
   */
  statusExpedienteText: {
    Cerrado: 0,
    Abierto: 10,
    PendienteCerrar: 11,
  },
  /**
   * Estados todo number
   */
  statusTodoNumber: {
    activo: 10,
    inactivo: 0,
  },
  /**
   * Indica si se ocultan o quitan modulos adicional de limitar la creación de todos los modulos en el sistema
   **/
  sgda: {
    ocultarModulos: false,
    limitarCreacion: 60,
    limitarCreacionUsuarios: 5,
  },
};

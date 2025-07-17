/**

 */

import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { saveAs } from 'file-saver';
import { catchError } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { ConvertParamsBase64Helper } from "src/app/helpers/convert-params-base64.helper";
import { ActivateTranslateService } from "src/app/services/activate-translate.service";
import { ChangeChildrenService } from "src/app/services/change-children.service";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { environment } from "src/environments/environment";
import swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { ModalDocInfoComponent } from "./components/modal-doc-info/modal-doc-info.component";
import { AuthorizationService } from "./services/authorization/authorization.service";
import { DataDocParamsService } from "./services/data-doc-params/data-doc-params.service";
import { GeneratePdfService } from "./services/generate-pdf/generate-pdf.service";
import { ParamsService } from "./services/params/params.service";

import { ToastService } from '@app/services/toast/toast.service';
import { ExpedienteService } from '../../../services/expedientes/expediente.service';
import { ModalSecurityComponent } from "./components/modal-security/modal-security.component";
import { ModalSelectDocComponent } from "./components/modal-select-doc/modal-select-doc.component";
import { ModalTrasbilidadDocComponent } from "./components/modal-trasbilidad-doc/modal-trasbilidad-doc.component";
import { TypeDocumentService } from "./services/type-document/type-document.service";

import { ModalService } from '@app/services/modal/modal.service';
import { ModalMapComponent } from "./components/modal-map/modal-map.component";
import { ActulizarTrazabilidadService } from "./services/actulizar-trazabilidad/actulizar-trazabilidad.service";
import { ChangeTrazaService } from "./services/change-traza/change-traza.service";


@Component({
  selector: "app-doc-manag-folder-view",
  templateUrl: "./doc-manag-folder-view.component.html",
  styleUrls: ["./doc-manag-folder-view.component.css"],
})
export class DocManagFolderViewComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  private generatePdf = inject(GeneratePdfService);
  public expedienteService = inject(ExpedienteService);
  private dps$ = inject(DataDocParamsService);
  private tds$ = inject(TypeDocumentService);
  private ats = inject(ActulizarTrazabilidadService);
  private cts$ = inject(ChangeTrazaService);

  // Autentificacion
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID = 0;
  // Nombre del formulario
  textFormView = "Detalle de expediente"; // i18n
  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList
  reuteLoadView: string = "gestionDocumental/expedientes/view";
  // Ruta a actualizar en el ViewList
  routeBotonUpdateView: string = "/documentManagement/folder-update/";
  // Icono del ViewList
  initCardHeaderIcon = "fact_check";
  // Ruta a redirigir
  redirectionPath = "/documentManagement/folder-index/false";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Gestión documental", route: "/documentManagement" },
    { name: "Expedientes", route: this.redirectionPath },
  ];
  breadcrumbRouteActive = "Detalles";
  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderTitle = "Documentos de expediente";
  initCardHeaderTitleF = "Archivos físicos";
  routeLoadDataTablesService: string =
    environment.versionApiDefault + "gestionDocumental/expedientes/index-expedientes-documentos";

  routeIndIndex: string = "/documentManagement/folder-ind-index/";
  routeLoadDataTablesServiceF = "gestionDocumental/expedientes/get-unidades-fisicas";
  viewColumStatus: false; // Se olculta el campo status
  classMainConten: string = "";
  classContainerFluid: string = "";

  dtTitles: any = [
    { title: "Asunto", data: "asunto" },
    { title: "Nombre de documento", data: "nombreDocumento" },
    { title: "Tipo  documental", data: "tipoDocumental" },
    { title: "Fecha de declaración", data: "fechaDeclaracion" },
    { title: "Fecha de incorporación", data: "fechaIncorporacion" },
    { title: "Pagina inicio", data: "paginaInicio" },
    { title: "Pagina Fin", data: "paginaFin" },
    { title: "Numero Folios", data: "numeroFolios" },
    { title: "Radicado", data: "radicado" },
    { title: "Formato", data: "formato" },
    { title: "Peso documento", data: "tamanio" },
    { title: "Origen", data: "origen" },
    { title: "Unidad de almacenamiento", data: "unidadAlmacenamiento" },
    { title: "Documento asociado", data: "asociado" }

  ];



  /* dtTitles: any = [    
    { title: "Número radicado", data: "numeroRadiRadicado" },Ñ
    { title: "Tipo documental", data: "nombreGdTrdTipoDocumental" },
    { title: "Documento", data: "nombreRadiDocumento" },
    { title: "Descripción", data: "descripcionRadiDocumentoRadicado" },
    { title: "Fecha recepción", data: "creacionRadiDocumento" },
  ];
 */
  dtTitlesF: any = [
    { title: "Edificio", data: "ubicacion" },
    { title: "Area de archivo", data: "areaArchivo" },
    { title: "Fecha inicial", data: "fechaInicio" },
    { title: "Fecha final", data: "fechaFin" },
    { title: "Unidad de almacenamiento", data: "unidadAlmacenamiento" },
    { title: "Unidad de conservación", data: "unidadConservación" },
    { title: "Tomos", data: "tomo" },
    { title: "Otros", data: "tipoUnidad" },
    { title: "Numero de documento", data: "numeroDocumentos" },
    { title: "Numero de folio", data: "numeroFolios" },
    { title: "Soporte", data: "soporte" },
    { title: "Frecuencia consulta", data: "frecuenciaConsulta" },
    { title: "Notas", data: "observaciones" },
  ];



  /**
   * Configuración para el botón flotante
   */
  iconMenu: string = "edit";
  dataRows: any;
  dataRows1: any;
  dataDividita: any;
  valorDividido: any;
  data1: any = [];
  data2: any = [];
  // Para el proceso del historico del radicado se muestra la data correspondiente
  dataRowsHistorico: any;
  statusSeeMoreHistory: boolean = false; // Muestra div ver mas
  statusSeeHistory: boolean = true; // Muestra div ver mas
  numberLimitHistory: number; // Limite de 3
  minLimit: number = 5; // Limite de 3
  // Version api
  versionApi = environment.versionApiDefault;
  // Variables de servicios
  responseServiceView: any;
  responseServiceViewErr: any;

  initBotonCreateRoute: string = "/documentManagement/folder-create"; // Ruta del botón crear
  initBotonUpdateRoute: string = "/documentManagement/folder-update"; // Ruta editar

  menuButtonsSelectOneClose: any = [
    /*     { icon: "add", title: "Agregar", action: "add", data: "" },
        { icon: "cloud_download", title: "Descarga paquete documentos", action: "downloadExpedientPackage", data: "" }, */
    //{ icon: "featured_play_list", title: "Hoja de control", action: "controlSheet", data: "" },
    /* { icon: "featured_play_list", title: "Indice", action: "indice", data: "" },
    { icon: "playlist_add_check_circle", title: "Paz y salvo", action: "peaceAndSafe", data: "" }, */
    { icon: "lock_open", title: "Reabrir expediente", action: "openFolder", data: "" },
  ];



  menuButtonsSelectOneOpen: any = [
    /*     { icon: "add", title: "Agregar", action: "add", data: "" }, */
    { icon: "edit", title: "Editar", action: "edit", data: "" },
    { icon: "lock", title: "Cerrar expediente", action: "closeFolder", data: "" },
    { icon: "post_add", title: "Crear nuevo documento", action: "createDoc", data: "" },
    /* { icon: "location_on", title: "Localizacion", action: "localizacion", data: "" }, */
    /* { icon: "attachment", title: "Carga de documentos", action: "attachment", data: "" }, */
    /* { icon: "description", title: "Archivo físico", action: "view_file", data: "" }, */
    /* { icon: "cloud_download", title: "Descarga paquete documentos", action: "downloadExpedientPackage", data: "" }, */
    //{ icon: "featured_play_list", title: "Hoja de control", action: "controlSheet", data: "" },
    /* { icon: "featured_play_list", title: "Indice", action: "indice", data: "" }, */
    /* { icon: "playlist_add_check_circle", title: "Paz y salvo", action: "peaceAndSafe", data: "" },
    { icon: "lock", title: "Cerrar expediente", action: "closeFolder", data: "" }, */
  ];

  menuButtonsSelectOne: any = [

  ];

  menuButtonsSelectDocumentMasive: any = [
    { icon: "work_off", title: "Excluir documentos", action: "excludeTheFile", data: "" },


  ];

  menuButtonsSelectDocumentNoPdf: any = [
    /*   { icon: "work_off", title: "Excluir documentos", action: "excludeTheFile", data: "" }, */
    { icon: "lock", title: "Seguridad", action: "seguridad", data: "" },
    { icon: "insert_chart", title: "Trazabilidad", action: "traza", data: "" },
    { icon: "description", title: "Información del documento", action: "infoDoc", data: "" },
    { icon: "cloud_download", title: "Descargar", action: "Descargar", data: "" },
    { icon: "assignment_returned", title: "Reclasificar documento", action: "Reclasificar", data: "" },
    { icon: "convert_to_text", title: "Referenciar en otro", action: "referenciar", data: "" },
    { icon: "post_add", title: "Crear nuevo documento", action: "createDoc", data: "" }

  ];

  menuButtonsSelectDocumentPdf: any = [
    /* { icon: "work_off", title: "Excluir documentos", action: "excludeTheFile", data: "" }, */
    { icon: "remove_red_eye", title: "Ver", action: "Ver", data: "" },
    { icon: "lock", title: "Seguridad", action: "seguridad", data: "" },
    { icon: "insert_chart", title: "Trazabilidad", action: "traza", data: "" },
    { icon: "description", title: "Información del documento", action: "infoDoc", data: "" },
    { icon: "cloud_download", title: "Descargar", action: "Descargar", data: "" },
    { icon: "assignment_returned", title: "Reclasificar documento", action: "Reclasificar", data: "" },
    { icon: "assignment_returned", title: "Referenciar en otro", action: "referenciar", data: "" },
    { icon: "post_add", title: "Crear nuevo documento", action: "createDoc", data: "" },

  ];

  eventSelectData: any;

  // boton paar referencia cruzada // note_alt // folder_special
  buttonCrossReference: any = { icon: "text_snippet", title: "Referencia cruzada", action: "crossReference", data: "" };
  existeFisicamenteGdExpediente: boolean = false; // indica si el expediente existe físicamente (híbrido)
  statusModalCrossReference: boolean = false; // Muestra u oculta el modal de referencia cruzada
  havePermissionCrossReference: boolean = false; // Permiso para referencia cruzada
  havePermissionUpdate: boolean = false; // Permiso para update

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectOne;
  eventClickButtonSelectedData: any;
  operationDialogObserva: string; // Menu seleccionado

  /** Variables para modal de carga de documentos */
  statusUploadFileAneMasive: boolean = false; // muestra o oculta el modal
  // Upload Documents Anexos
  ruoteServiceDocumentsAne: string =
    environment.apiUrl + this.versionApi + "radicacion/transacciones/upload-document-to-expedient";
  validateFileAnexos: any = environment.validateFile.anexosRadicado;
  dataSend: any; // Data que se le envia al front de los radicados
  textForm: string; // Titulo del modal
  textFormLabel: string; // Muestra el nombre del Expediente

  routeServicePeaceAndSafe = "gestionDocumental/expedientes/peace-and-safe";

  /** Descarga paquete de documentos asociados al expediente */
  resServicesDownloadExpedientPackage: any;
  resServicesDownloadExpedientPackageErr: any;
  resServicesDownload: any;
  resServicesDownloadErr: any;
  /** variables para excluir expediente */
  resSerExcludeExp: any;
  resSerExcludeExpErr: any;

  resSerChangeStatus: any;
  resSerChangeStatusErr: any;
  resSerCloseFolder: any;
  resSerCloseFolderErr: any;
  resSerOpenFolder: any;
  resSerOpenFolderErr: any;

  /** Variables para internacionalizacion */
  activeLang: string;
  languageReceive: any;
  subscriptionTranslateService$: Subscription;

  // Muestra el campo de fecha documento en el formulario de cargar documentos
  showFechaDoc: boolean = true;
  // Estado del expediente
  statusExpedient: any;
  dataDepen: any; // data depenendcia, serie, subserie

  // Variables de modal
  statusModalMain = false; // Muestra o oculta el modal
  showPass = true; // Muestra o oculta el campo password en el modal
  textFormObservaHeader = ""; // Titulo del modal
  initialNotificationMessageArray = []; // Mensaje de notificación
  textPassword = "Digite su contraseña";
  observacionModal: boolean = true; // muestra el campo observacion del modal

  /** Variables para el modal pdf */
  statusModalviewPdf: boolean = false;
  ruoteServiceDownloadFile: string = "";
  paramsDownload: any; // Esta variable toma el valor del id del documento seleccionado y lo pasa opción de descaga
  dataExpediente: any;
  IdDocumentExpedienteSelected: any
  statusModalIncludeInFile: boolean = false; // Status del modal incluir en expediente
  resSerIncludeFiles: any;
  resSerIncludeFilesErr: any;


  textCustomizer: string
  urlMapa = "";

  constructor(
    private route: ActivatedRoute,
    public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    private router: Router,
    public globalAppService: GlobalAppService,
    private translate: TranslateService,
    private activateTranslateService: ActivateTranslateService,
    private changeChildrenService: ChangeChildrenService,
    private ps: ParamsService,
    private as: AuthorizationService,
    private toast: ToastService,
    private modal: ModalService
  ) {
    this.paramiD = this.route.snapshot.paramMap.get("id"); // SE recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
    this.ps.setValue(this.paramOID);
    this.routeBotonUpdateView = this.routeBotonUpdateView + this.paramiD;
    this.routeIndIndex = this.routeIndIndex + this.paramiD;

    /** Idioma inical */
    this.detectLanguageInitial();
  }

  ngOnInit() {
    /** Detectando si se ejecuta cambio de idioma */
    this.detectLanguageChange();

    // Hace el llamado del token
    this.getTokenLS();
    this.eventClickButtonSelectedData = [];
    this.getTrazabilidad();

    this.cts$.getChangeTraza().subscribe(res => {

      if (res.dep) {
        this.getTrazabilidad();
        this.cts$.setDepende(false);
      }

      if (res.user) {
        this.getTrazabilidad();
        this.cts$.setUsuario(false);
      }

      if (res.recla) {
        this.getTrazabilidad();
        this.cts$.setReclasificar(false);
      }
    })
  }


  getTrazabilidad(): void {
    this.ats.getTrazabilidad().subscribe({
      next: (res) => {
        this.dataRowsHistorico = res.data;
        if (this.dataRowsHistorico.length > this.minLimit) {
          this.statusSeeMoreHistory = true;
          this.numberLimitHistory = this.minLimit;
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.as.setAuth(res);
      this.authorization = res;
      if (this.paramOID != 0) {
        this.getCallUrl(this.authorization);
      }
    });
  }

  getCallUrl(authori) {
    let params = {
      id: this.paramOID,
    };


    this.restService.restGetParams(this.versionApi + this.reuteLoadView, params, authori).subscribe(
      (res) => {
        this.responseServiceView = res;

        // console.log(this.responseServiceView);
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.responseServiceView, false, this.redirectionPath).then((res) => {
          let responseResolveResponse = res;

          if (responseResolveResponse) {
            if (this.responseServiceView.data) {
              this.dataRows = this.responseServiceView.data;

              this.responseServiceView.data.forEach(item => {
                if (item.alias === 'URL ArcGIS') {
                  this.menuButtonsSelectOneOpen = [
                    ...this.menuButtonsSelectOneOpen,
                    { icon: "location_on", title: "Localizacion", action: "localizacion", data: "" }
                  ]
                  this.urlMapa = item.value;
                }
              })

              this.dataExpediente = {
                id: this.paramOID,
                numeroExpediente: this.dataRows[0].value,
              };
              this.statusExpedient = this.responseServiceView.statusExpedient;
              this.existeFisicamenteGdExpediente = this.responseServiceView.existeFisicamenteGdExpediente;
              this.havePermissionCrossReference = this.responseServiceView.havePermissionCrossReference;
              this.havePermissionUpdate = this.responseServiceView.havePermissionUpdate;

              // asigna los botones
              if (
                this.statusExpedient == environment.statusExpedienteText.Abierto ||
                this.statusExpedient == environment.statusExpedienteText.PendienteCerrar
              ) {
                this.menuButtonsSelectOne = JSON.parse(JSON.stringify(this.menuButtonsSelectOneOpen));

                if (this.existeFisicamenteGdExpediente == true && this.havePermissionCrossReference == true) {
                  this.menuButtonsSelectOne.push(this.buttonCrossReference);
                }

                if (this.havePermissionUpdate == false) {
                  /*                   this.menuButtonsSelectOne.splice(1, 1);
                                    this.menuButtonsSelectOne.splice(5, 1); */
                }

              } else {
                this.menuButtonsSelectOne = this.menuButtonsSelectOneClose;
              }

              // Valida que tenga mensajes para que los muestre en notificacion
              if (this.responseServiceView.notificacion.length > 0) {
                this.responseServiceView.notificacion.forEach((dataSer) => {
                  this.sweetAlertService.showNotification(dataSer.type, dataSer.message);
                });
              }

              // Asigna los botones
              this.menuButtons = this.menuButtonsSelectOne;

              if (this.responseServiceView.dataHistorico) {
                /*                 this.dataRowsHistorico = this.responseServiceView.dataHistorico; */
                /* 
                                if (this.dataRowsHistorico.length > this.minLimit) {
                                  this.statusSeeMoreHistory = true;
                                  this.numberLimitHistory = this.minLimit;
                                } */
                // Asigna la dataDepen que necesita para mostrar los tipos documentales
                if (this.responseServiceView.dataDepen) {
                  this.dataDepen = this.responseServiceView.dataDepen;
                }
              }
            }
          }
        });
      },
      (err) => {
        this.responseServiceViewErr = err;
        // Evaluar respuesta de error del servicio

        this.globalAppService
          .resolveResponseError(this.responseServiceViewErr, true, this.redirectionPath)
          .then((res) => { });
      }
    );
  }

  /**
   * Fuincion que cambia el estado de ver mas en Documentos
   * @param status // Estado
   * @param module // Modulo a consultar
   */
  seeMoreAndLess(status, module) {
    if (status) {
      // Valida modulo
      switch (module) {
        case "History":
          this.numberLimitHistory = this.dataRowsHistorico.length;
          break;
      }
    } else {
      // Valida modulo
      switch (module) {
        case "History":
          this.numberLimitHistory = this.minLimit;
          break;
      }
    }
    // Asigna el valor contrario
    switch (module) {
      case "History":
        this.statusSeeHistory = !this.statusSeeHistory;
        break;
    }
  }

  menuPrimaryReceiveData(event) {
    this.router.navigate(["/" + this.routeBotonUpdateView]);
  }

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  menuReceiveData(event) {
    // Asigna el valor para utilizar lo en otras funciones
    this.operationDialogObserva = event.action;
    this.statusModalIncludeInFile = false;

    switch (event.action) {
      case "add":
        this.router.navigate(["/" + this.initBotonCreateRoute]);
        break;
      case "edit":
        this.router.navigate(["/" + this.initBotonUpdateRoute + "/" + this.paramiD]);
        break;
      case "changeStatus":
        this.changeStatus();
        break;
      case "attachment":
        this.dataSend = [{ id: this.paramOID }];
        this.textForm = event.title;
        // Nombre del expediente y TRD
        this.textFormLabel = "";
        this.statusUploadFileAneMasive = true;
        break;
      case "downloadExpedientPackage":
        this.downloadDocumentPackage(this.paramOID);
        break;
      case "excludeTheFile":
        this.transactionExcludeExpedient(this.paramOID);
        break;
      case "closeFolder":
        // Cerrar expediente
        this.textFormObservaHeader = event.title;
        this.observacionModal = true;
        this.initialNotificationMessageArray = ["textCierreFolder"]; // Mensaje de notificación
        this.confirmaCloseFolder();
        break;
      case "openFolder":
        // Abrir expediente
        this.textFormObservaHeader = event.title;
        this.observacionModal = false;
        this.initialNotificationMessageArray = ["textOpenFolder"]; // Mensaje de notificación
        this.confirmarOpenFolder();
        break;
      case "crossReference":
        this.eventSelectData = {
          0: {
            id: this.paramOID,
            // idInitialList: this.paramOID
          },
        };
        this.statusModalCrossReference = true;
        break;
      case "Ver":
        this.statusModalviewPdf = true;
        break;
      case "createDoc":
        this.crearDocumento();
        break;
      case "Descargar":
        this.dowloadDocuments(this.paramsDownload);
        break;
      case "controlSheet":
        this.ruoteServiceDownloadFile = "gestionDocumental/expedientes/download-electronic-index";
        this.dowloadDocuments(this.paramOID);
        break;
      case "indice":
        this.ruoteServiceDownloadFile = "gestionDocumental/expedientes/download-electronic-index";
        this.dowloadDocuments(this.paramOID);
        break;
      case "peaceAndSafe":
        this.processPeaceAndSafe();
        break;
      case "infoDoc":
        this.infoDoc();
        break;
      case "seguridad":
        this.seguridadDoc();
        break;
      case "Reclasificar":
        this.textCustomizer = "¿Está seguro que desea incluir el documento en el expediente seleccionado?"
        this.statusModalIncludeInFile = true;
        break;
      case "referenciar":
        this.textCustomizer = "¿Está seguro que desea referenciar el documento en el expediente seleccionado?"
        this.statusModalIncludeInFile = true;
        break;
      case "traza":
        this.infoTrazabilidad();
        break;

      case "localizacion":
        this.viewMap();
        break;
    }
  }

  viewMap(): void {
    console.log('url', this.urlMapa)
    this.dialog.open(ModalMapComponent, {
      data: {
        url: this.urlMapa
      }
    });
  }

  crearDocumento(): void {
    const refDialog = this.dialog.open(ModalSelectDocComponent);
    refDialog.afterClosed().subscribe(res => {
      if (res) {
        refDialog.close();
      }

    })

  }


  infoTrazabilidad(): void {

    this.dialog.open(ModalTrasbilidadDocComponent, {
      data: {
        idDocumentoIncluidoPivot: this.eventClickButtonSelectedData[0].idDocumentoIncluidoPivot,
        idDocumentoIncluido: this.eventClickButtonSelectedData[0].idDocumentoIncluido
      }
    });
  }

  /**
   * Referencia documentos
   * @param dataObserva
   * Falta integración Backend - HU005 Expedientes
   */
  referenciarDocumentosExp(dataObserva: any) {
    this.sweetAlertService.sweetLoading();

    if (!this.eventClickButtonSelectedData?.length) {
      console.error('No se encontró el ID del documento seleccionado');
      this.toast.open({
        title: 'Ha ocurrido un error al procesar su solicitud',
      });
      return;
    }

    let params = {
      idDocumentoIncluidoPivot: this.eventClickButtonSelectedData[0].idDocumentoIncluidoPivot,
      idExpediente: dataObserva.data.idExpediente,
    };

    this.expedienteService.referenciarDocumentoExpedient(params).subscribe({
      next: (res) => {
        this.resSerIncludeFiles = res;
        console.log('this.resSerIncludeFiles', this.resSerIncludeFiles)

        this.globalAppService.resolveResponse(this.resSerIncludeFiles, false).then(
          (res) => {
            const responseResolveResponse = res;
            if (responseResolveResponse === true) {
              this.sweetAlertService.showNotification('success', this.resSerIncludeFiles['message']);
              this.toast.open({
                title: 'Confirmación inclusión de documento en expediente'
              });
            }
            // Cargando false
            this.sweetAlertService.sweetClose();
            this.changeChildrenService.changeProcess({ proccess: "reload" });
          }
        ).catch((error) => {
          console.error('Error en resolveResponse', error);
          this.sweetAlertService.sweetClose();
        });

      }, error: (err) => {
        this.resSerIncludeFilesErr = err;
        this.toast.open({
          title: 'Ha ocurrido un error al procesar su solicitud'
        });
        this.globalAppService.resolveResponseError(this.resSerIncludeFilesErr).then(
          (res) => {
            // Manejo de la respuesta de error
          }
        ).catch((error) => {
          console.error('Error en resolveResponseError', error);
        });
      }
    })
  }

  /**
   * Funcion que incluye los radicados a expedientes
   * @param dataObserva
   */
  transactionIncludeFiles(dataObserva: any) {
    this.sweetAlertService.sweetLoading();


    if (!this.eventClickButtonSelectedData?.length) {
      console.error('No se encontró el ID del documento seleccionado');
      this.toast.open({
        title: 'Ha ocurrido un error al procesar su solicitud',
      });
      return;
    }

    let params = {
      idDocumentoIncluidoPivot: this.eventClickButtonSelectedData[0].idDocumentoIncluidoPivot,
      idExpediente: dataObserva.data.idExpediente,
    };



    this.expedienteService.reclasificarDocumentoExpedient(params).subscribe({
      next: (res) => {
        this.resSerIncludeFiles = res;
        console.log('this.resSerIncludeFiles', this.resSerIncludeFiles)

        this.globalAppService.resolveResponse(this.resSerIncludeFiles, false).then(
          (res) => {
            const responseResolveResponse = res;
            if (responseResolveResponse === true) {
              this.sweetAlertService.showNotification('success', this.resSerIncludeFiles['message']);
              this.toast.open({
                title: 'Confirmación inclusión de documento en expediente'
              });
            }
            // Cargando false
            this.sweetAlertService.sweetClose();
            this.changeChildrenService.changeProcess({ proccess: "reload" });
          }
        ).catch((error) => {
          console.error('Error en resolveResponse', error);
          this.sweetAlertService.sweetClose();
        });

      }, error: (err) => {
        this.resSerIncludeFilesErr = err;
        this.toast.open({
          title: 'Ha ocurrido un error al procesar su solicitud'
        });
        this.globalAppService.resolveResponseError(this.resSerIncludeFilesErr).then(
          (res) => {
            // Manejo de la respuesta de error
          }
        ).catch((error) => {
          console.error('Error en resolveResponseError', error);
        });
      }
    })
  }

  seguridadDoc(): void {
    this.dialog.open(ModalSecurityComponent, {
      data: {
        asunto: this.eventClickButtonSelectedData[0].asunto,
        nombreDocumento: this.eventClickButtonSelectedData[0].nombreDocumento
      }
    });
  }

  infoDoc(): void {
    this.tds$.setTypeDoc(0);

    this.dialog.open(ModalDocInfoComponent, {
      data: {
        idDocumentoIncluidoPivot: this.eventClickButtonSelectedData[0].idDocumentoIncluidoPivot
      }
    });
  }

  processPeaceAndSafe() {
    const data = {
      data: this.dataExpediente, // Data de los expedientes seleccionados
    };

    this.sweetAlertService.sweetLoading();

    this.restService.restPost(`${this.versionApi}${this.routeServicePeaceAndSafe}`, data, this.authorization).subscribe(
      (responseApi) => {
        this.globalAppService.resolveResponse(responseApi, false).then((responseGlobal) => {
          if (responseGlobal === true) {
            this.downloadFile(responseApi.datafile, responseApi.fileName);
            this.sweetAlertService.showNotification("success", responseApi.message);
          }

          this.sweetAlertService.sweetClose();
        });
      },
      (err) => this.globalAppService.resolveResponseError(err)
    );
  }

  /**
   * Función de descarga del documento seleccionado
   * @param idDocument
   */
  dowloadDocuments(idDocument) {
    let data = {
      ButtonSelectedData: {
        0: {
          id: idDocument,
        },
      },
    };
    this.sweetAlertService.sweetLoading();

    this.restService.restPut(this.versionApi + this.ruoteServiceDownloadFile, data, this.authorization).subscribe(
      (res) => {
        this.resServicesDownload = res;
        this.globalAppService.resolveResponse(this.resServicesDownload, false).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {
            this.downloadFile(this.resServicesDownload.datafile, this.resServicesDownload.fileName);
            this.sweetAlertService.showNotification("success", this.resServicesDownload["message"]);
          }
          // Cargando false
          this.sweetAlertService.sweetClose();
        });
      },
      (err) => {
        this.resServicesDownloadErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resServicesDownloadErr).then((res) => { });
      }
    );
  }

  /** Cerrar o desdruir componente observaciones */
  closeObserva(dataObserva) {
    this.statusUploadFileAneMasive = false;
    this.statusModalMain = false;

    // dataObserva es la data que retorna el componente de observaciones
    if (dataObserva.status) {
      switch (this.operationDialogObserva) {
        case "closeFolder":
          this.tansacctionCloseFolder(dataObserva.data);
          break;
        case "openFolder":
          this.transacctionOpenFolder(dataObserva.data);
          break;
        case 'Reclasificar':
          this.transactionIncludeFiles(dataObserva);
          break;
        case 'referenciar':
          this.referenciarDocumentosExp(dataObserva);
          break;
      }
    } else {
      this.getCallUrl(this.authorization);
    }

    this.statusModalIncludeInFile = false; // Oculta el modal incluir en expediente
  }

  closeCrossReferenceModal(data) {
    this.getCallUrl(this.authorization);
    this.changeChildrenService.changeProcess({ proccess: "reload" });
    this.statusModalCrossReference = false;
  }

  // Función que muestra el mensaje de confirmación antes de mostrar el modal de la transacción Cerrar expediente
  confirmaCloseFolder() {
    /* const titleMsg = this.translate.instant("titleMsg");
    const textMsg = this.translate.instant("textMsgFolderClose"); */
    /*     const bntCancelar = this.translate.instant("bntCancelar");
        const btnConfirmacion = this.translate.instant("btnConfirmacion");
     */
    // const bntCancelar = "NO";
    // const btnConfirmacion = "SI";
    // const titleMsg = "";
    // const textMsg = "¿Desea realizar el cierre del expediente - contrato 652 de 2024 para la prestacion de servicios se vigilacia de la sede central?";
    // console.log(titleMsg, textMsg)
    // swal({
    //   title: titleMsg,
    //   text: textMsg,
    //   type: "warning",
    //   showCancelButton: true,
    //   cancelButtonText: bntCancelar,
    //   confirmButtonText: btnConfirmacion,
    //   cancelButtonClass: "btn btn-danger",
    //   confirmButtonClass: "btn btn-success",
    //   buttonsStyling: false,
    // }).then((result) => {
    //   if (result.value) {
    //     this.statusModalMain = true; // Muestra el modal
    //   }
    // });
    this.modal.openAction("", `¿Desea realizar el cierre del expendienté ${this.dataExpediente['numeroExpediente']} - contrato 652 de 2024 para la prestación de servicios de vigilancia de la sede central?`, () => {
      this.statusModalMain = true; // Muestra el modal
    })
  }

  confirmarOpenFolder() {
    const titleMsg = this.translate.instant("titleMsg");
    const textMsg = this.translate.instant("textMsgFolderOpen");
    const bntCancelar = this.translate.instant("bntCancelar");
    const btnConfirmacion = this.translate.instant("btnConfirmacion");
    console.log(titleMsg, textMsg)
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
        this.statusModalMain = true; // Muestra el modal
      }
    });
  }

  /** Cambia el estado del expediente a Cerrado */
  tansacctionCloseFolder(data) {
    let ButtonSelectedData: any = {
      0: {
        id: this.paramOID,
        idInitialList: this.paramOID,
      },
    };

    let params = {
      ButtonSelectedData: ButtonSelectedData, // Data de los expedientes seleccionados
      data: data, // Data de las observaciones
    };
    // Cargando true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(this.versionApi + "gestionDocumental/expedientes/closed-expedient", params, this.authorization)
      .subscribe(
        (res) => {
          this.resSerCloseFolder = res;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerCloseFolder, false).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.sweetAlertService.showNotification("success", this.resSerCloseFolder.message);
              this.downloadFile(this.resSerCloseFolder.datafile, this.resSerCloseFolder.fileName);
              this.getCallUrl(this.authorization);
            }
            // Cargando false
            this.sweetAlertService.sweetClose();
          });
        },
        (err) => {
          this.resSerCloseFolderErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerCloseFolderErr, false).then((res) => { });
        }
      );
  }

  /** Cambia el estado del expediente a Cerrado */
  transacctionOpenFolder(data) {
    let ButtonSelectedData: any = {
      0: {
        id: this.paramOID,
        idInitialList: this.paramOID,
      },
    };

    let params = {
      ButtonSelectedData: ButtonSelectedData, // Data de los expedientes seleccionados
      data: data, // Data de las observaciones
    };
    // Cargando true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restPost(this.versionApi + "gestionDocumental/expedientes/open-expedient", params, this.authorization)
      .subscribe(
        (res) => {
          this.resSerOpenFolder = res;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerOpenFolder, false).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.sweetAlertService.showNotification("success", this.resSerOpenFolder.message);
              if (this.resSerOpenFolder.datafile) {
                this.downloadFile(this.resSerOpenFolder.datafile, this.resSerOpenFolder.fileName);
              }
              this.getCallUrl(this.authorization);
            }
            // Cargando false
            this.sweetAlertService.sweetClose();
          });
        },
        (err) => {
          this.resSerOpenFolderErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerOpenFolderErr, false).then((res) => { });
        }
      );
  }

  /** Descarga de paquete de documentos de los radicados asociados al expediente */
  downloadDocumentPackage(idExpediente) {
    const titleMsg = this.translate.instant("titleMsg");
    const textMsg = this.translate.instant("textMsgDownloadDocumentPackage");
    const bntCancelar = this.translate.instant("bntCancelar");
    const btnConfirmacion = this.translate.instant("btnConfirmacionDownloadDocumentPackage");

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
        /** Se asigna el valor del id del expediente seleccionado */
        let data = {
          id: idExpediente,
        };
        // Cargando true
        this.sweetAlertService.sweetLoading();

        this.restService
          .restPost(this.versionApi + "gestionDocumental/expedientes/download-file-documents", data, this.authorization)
          .subscribe(
            (res) => {
              this.resServicesDownloadExpedientPackage = res;
              // Evaluar respuesta del servicio
              this.globalAppService.resolveResponse(this.resServicesDownloadExpedientPackage, false).then((res) => {
                let responseResolveResponse = res;
                if (responseResolveResponse == true) {
                  this.downloadFile(
                    this.resServicesDownloadExpedientPackage.datafile,
                    this.resServicesDownloadExpedientPackage.fileName
                  );
                }
                // Cargando false
                this.sweetAlertService.sweetClose();
              });
            },
            (err) => {
              this.resServicesDownloadExpedientPackageErr = err;
              // Evaluar respuesta de error del servicio
              this.globalAppService
                .resolveResponseError(this.resServicesDownloadExpedientPackageErr, false)
                .then((res) => { });
            }
          );
      }
    });
  }

  /**
   * Transacción excluir documentos del expediente
   */
  transactionExcludeExpedient(idExpediente) {
    const titleMsg = this.translate.instant("titleMsgExcluir");
    const textMsg = this.translate.instant("textMsgExcluir");
    const bntCancelar = this.translate.instant("bntCancelar");
    const btnConfirmacion = this.translate.instant("btnConfirmar");

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
        /** Se asigna el valor del id del expediente seleccionado */
        let data = {
          idGdExpediente: idExpediente,
          ButtonSelectedData: this.eventClickButtonSelectedData,
        };
        // Cargando true
        this.sweetAlertService.sweetLoading();

        this.restService
          .restPost(this.versionApi + "gestionDocumental/expedientes/exclude-expedient", data, this.authorization)
          .subscribe(
            (res) => {
              this.resSerExcludeExp = res;
              // Evaluar respuesta del servicio
              this.globalAppService.resolveResponse(this.resSerExcludeExp, false).then((res) => {
                let responseResolveResponse = res;
                if (responseResolveResponse == true) {
                  this.getCallUrl(this.authorization);
                  this.changeChildrenService.changeProcess({ proccess: "reload" });
                }
                // Cargando false
                this.sweetAlertService.sweetClose();
              });
            },
            (err) => {
              this.resSerExcludeExpErr = err;
              // Evaluar respuesta de error del servicio
              this.globalAppService.resolveResponseError(this.resSerExcludeExpErr, false).then((res) => { });
            }
          );
      }
    });
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

  /** Cambiar estado del expediente */
  changeStatus() {
    // loading Active
    this.sweetAlertService.sweetLoading();
    let params = [this.paramOID + "|0"];

    this.restService
      .restPut(this.versionApi + "gestionDocumental/expedientes/change-status", params, this.authorization)
      .subscribe(
        (res) => {
          this.resSerChangeStatus = res;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerChangeStatus, true, this.redirectionPath).then((res) => {
            let resResolveResponse = res;
            if (resResolveResponse == true) {
              this.sweetAlertService.sweetClose();
              this.sweetAlertService.showNotification("success", this.resSerChangeStatus.message);
              this.getCallUrl(this.authorization);
              this.changeChildrenService.changeProcess({ proccess: "reload" });
            }
          });
        },
        (err) => {
          this.resSerChangeStatusErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerChangeStatusErr, true, this.redirectionPath)
            .then((res) => { });
        }
      );
  }

  /**
   *
   * @param event
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {


    this.eventClickButtonSelectedData = event

    if (event.length > 0) {
      this.dps$.setDataDocParams({
        idDocumentoIncluidoPivot: event[0].idDocumentoIncluidoPivot
      })
      if (
        this.statusExpedient == environment.statusExpedienteText.Abierto ||
        this.statusExpedient == environment.statusExpedienteText.PendienteCerrar
      ) {
        this.analizeReceiveData(this.eventClickButtonSelectedData);
      } else {
        this.menuButtons = this.menuButtonsSelectOne;
      }
    } else {
      // Ningun registro seleccionado
      this.menuButtons = this.menuButtonsSelectOne;
    }
  }

  /** Analiza la data de los documentos seleccionados para definir las rutas de descarga y las acciones a permitir */
  analizeReceiveData(dataSelected) {

    if (dataSelected.length == 1) {

      this.paramsDownload = dataSelected[0].id;
      if (dataSelected[0].extension == "pdf") {
        this.menuButtons = this.menuButtonsSelectDocumentPdf;
      } else {
        this.menuButtons = this.menuButtonsSelectDocumentNoPdf;

      }

      if (dataSelected[0].model == "GdExpedienteDocumentos") {
        this.ruoteServiceDownloadFile = "gestionDocumental/expedientes/download-document";
      } else if (dataSelected[0].model == "RadiDocumentos") {
        this.ruoteServiceDownloadFile = "radicacion/documentos/download-document";
      } else if (dataSelected[0].model == "RadiDocumentosPrincipales") {
        this.ruoteServiceDownloadFile = "radicacion/documentos/download-doc-principal";
      } else if (dataSelected[0].model == "GdReferenciasCruzadas") {
        this.ruoteServiceDownloadFile = "gestionDocumental/expedientes/download-cross-reference";
      } else {
        this.ruoteServiceDownloadFile = "";
      }
    } else {
      this.menuButtons = this.menuButtonsSelectDocumentMasive;
    }
  }

  /**
   * Solo debe llegar el action
   * @param data idInitialList
   */
  eliminarRegistro(data) {
    /** Recorrido de la data de los buttons */
    this.menuButtons.forEach((element, index) => {
      if (element.action == data) {
        this.menuButtons.splice(index, 1);
      }
    });
  }

  closePdfModal(data) {
    this.statusModalviewPdf = false;
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
    this.subscriptionTranslateService$ = this.activateTranslateService.activateLanguageChange.subscribe((language) => {
      this.languageReceive = language;
      this.translate.setDefaultLang(this.languageReceive);
    });
  }


  // Convertir datos a formato CSV
  private convertToCSV(objArray: any[]): string {
    const header = ['usuario', 'dependencia', 'operacion', 'observacion', 'fecha'];
    const rows = objArray.map(item => [
      item.usuario,
      item.dependencia,
      item.operacion,
      item.observacion,
      item.fecha,

    ]);

    let csv = header.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });

    return csv;
  }

  exportExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataRowsHistorico);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'trasaviliadadExpediente');
  }

  // Guardar archivo Excel
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const EXCEL_EXTENSION = '.xlsx';
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = fileName + EXCEL_EXTENSION;
    link.click();
  }

  // Método para exportar a CSV
  exportCVS() {
    const csvData = this.convertToCSV(this.dataRowsHistorico);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = 'trasaviliadadExpediente.csv';
    link.click();
  }


  exportPDF() {

    const dataTiposDocumentales = {
      id: this.paramOID
    };

    this.generatePdf.generatePdfTrazabilidad(dataTiposDocumentales).pipe(
      catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error); // Propaga el error
      })
    ).subscribe(res => {
      const base64String = res.data;
      const blob = this.b64toBlob(base64String);
      const nombreArchivo = 'trasabilidad.pdf';
      saveAs(blob, nombreArchivo);
    })

  }

  imprimirPDF() {
    const dataTiposDocumentales = {
      id: this.paramOID
    };

    this.generatePdf.generatePdfTrazabilidad(dataTiposDocumentales).pipe(
      catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error); // Propaga el error
      })
    ).subscribe(res => {


      // Decodificar el base64 para formar un Blob de tipo PDF
      const byteCharacters = atob(res.data);
      const byteNumbers = new Array(byteCharacters.length);


      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // Crear un iframe oculto y asignar la URL del blob como su src
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;

      // Agregar el iframe al DOM
      document.body.appendChild(iframe);

      // Esperar a que el iframe cargue y luego activar la impresión
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          // Limpiar después de imprimir
          /* document.body.removeChild(iframe);
          window.URL.revokeObjectURL(url); */
        }, 2000); // Aumentar el tiempo de espera a 2 segundos
      };

    })

  }

  b64toBlob(b64Data: string, contentType = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



  /** Fin Métodos para el uso de la internacionalización */

  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

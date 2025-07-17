import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { FloatingButtonService } from 'src/app/services/floating-button.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RestService } from 'src/app/services/rest.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { ActivateTranslateService } from '../../../services/activate-translate.service';
import { NotificationService } from '../../../services/notification/notification.service';

import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ChangeChildrenService } from '../../../services/change-children.service';
import { CooperativeEditModalComponent } from '@app/modules/components/cooperative-edit-modal/cooperative-edit-modal.component';


@Component({
  selector: 'app-filling-coop-works',
  templateUrl: './filling-coop-works.component.html',
  styleUrls: ['./filling-coop-works.component.css']
})
export class FillingCoopWorksComponent implements OnInit {

  public titleSubmit: string = 'GUARDAR';


  statusModalUploadFile: boolean = false // Muestra el componente de Envio de Documentos
  statusModalMain: boolean = false;  // Muestra el componente de anexos main
  showAgenda: boolean = false;  // Muestra el input de fecha
  showReasignacion: boolean = false;  // Muestra los inputs de reasignacion
  isRejected: boolean // Id Estado del radicado
  residingId: number; // Id para consultar causal radicado rechazado
  showVOBO: boolean = false;  // Muestra los inputs de VOBO (Visto bueno)
  showCopyInformaded: boolean = false;  // Muestra los inputs de copiar informado
  textFormObservaHeader: string = ''; // Titulo del botón inteligente tambien titulo del dialog observacion
  operationDialogObserva: string; // operacion que se utiliza para las trasferencias
  // showSendMail: boolean = false; // muestra el modal
  dataSendObserva: any; // Data para enviar al formulario
  isActo: boolean = true;

  statusModalIncludeInFile: boolean = false; // Status del modal incluir en expediente

  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'description';
  initCardHeaderTitle = 'Pendiente trabajo colaborativo';
  // Nombre del módulo donde se esta accediendo al initialList
  redirectionPath: string = '/filing/filing-coop-works/false';
  route: string = '/filing/filing-coop-works/false';

  /** Formulario index */
  initBotonCreateRoute: string = '/filing/filing-create'; // Ruta del botón crear
  initBotonUpdateRoute: string = '/filing/filing-update'; // Ruta editar usuario
  initBotonViewRoute: string = '/filing/filing-view'; // Ruta ver usuario
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Radicación', 'route': '/filing' },
  ];
  breadcrumbRouteActive = 'Trabajo colaborativo';
  // Version api
  versionApi = environment.versionApiDefault;

  textFormAttachment = 'Cargar anexos';
  maxRowsFilesAttachment: number = 5;
  showButtonCleanAttachment: boolean = true;
  showButtonClearAttachment: boolean = true;

  // Autentificacion
  authorization: string;
  /** Variables respuesta Servicios */
  resServices: any;
  resErrServices: any;
  resServicesVobo: any;
  resServicesVoboErr: any;
  resServicesAnnulment: any;
  resServicesAnnulmentErr: any;
  resServicesDiscardConsecutive: any;
  resServicesDiscardConsecutiveErr: any;
  resServicesSendEmailCli: any;
  resServicesSendEmailCliErr: any;
  resServicesDownloadDocumentPackage: any;
  resServicesDownloadDocumentPackageErr: any;
  resSerIncludeFiles: any;
  resSerIncludeFilesErr: any;
  resSerPrintStickers: any;
  resSerPrintStickersErr: any;
  resServicesSgdeaScan: any;
  resServicesSgdeaScanErr: any;

  validateFile: any = [{ type: 'xls' }, { type: 'xlsx' }, { type: 'pdf' }, { type: 'doc' }, { type: 'docx' }, { type: 'odt' }, { type: 'ods' }];
  validateFileAnexos: any = environment.validateFile.anexosRadicado;
  statusUploadFileAne: boolean = false; // Muestra el modal para adjuntar anexos
  statusUploadFileAneMasive: boolean = false; // Muestra el modal para adjuntar anexos masivos
  statusSendReplyMailModal: boolean = false; // Muestra el modal de envio de respuesta por correo
  showTipoDocumental: boolean = true; // Se muestra el campo  tipo documental de anexos
  showObservacion: boolean = true; // Muestra el campo observacion de anexos
  statusNameFile: boolean = false; // Muestra el campo nombre archivo de anexos
  dataSend: any; // Data que se le envia al front de los radicados
  // Documents
  ruoteServiceDocuments: string = environment.apiUrl + this.versionApi + 'radicacion/transacciones/upload-file';
  // Route Templaste
  ruoteServiceDocumentsTemplate: string = environment.apiUrl + this.versionApi + 'radicacion/transacciones/load-format';
  // Upload Documents Anexos
  ruoteServiceDocumentsAne: string = environment.apiUrl + this.versionApi + 'radicacion/documentos/upload-document';
  // Route Documents modal
  ruoteServiceDocumentsModal: any;
  // Ruta para la carga del documento firmado físicamente
  routeServiceUploadSignedDocument = `${environment.apiUrl + this.versionApi}radicacion/documentos/upload-signed-document`;

  // Configuraciones para datatables
  routeLoadDataTablesService: string = this.versionApi + 'radicacion/radicados/index-coop';
  // Configuración para el proceso change status
  routeChangeStatus: string = this.versionApi + 'radicacion/radicados/change-status';
  routeReasing = this.versionApi + 'radicacion/transacciones/re-asign';
  routeVobo = this.versionApi + 'radicacion/transacciones/solicita-vobo';
  routeCopyInformaded = this.versionApi + 'radicacion/informados/copy';
  routeFinalizeFiling = this.versionApi + 'radicacion/transacciones/finalize-filing';
  routeShippingReady = this.versionApi + 'radicacion/transacciones/shipping-ready';

  dtTitles: any = [
    { 'title': 'Tipo de solicitud', 'data': 'TipoRadicado' },
    { 'title': 'Consecutivo', 'data': 'numeroRadiRadicado' },
    { 'title': 'Fecha Creación', 'data': 'creacionRadiRadicado' },
  ];
  /** Fin Configuraciones para datatables */
  /** Fin Initial List */

  messageUnderConstruction: string = 'funcionalidad en construcción';

  /**
   * Configuración para el botón flotante
   */
 
  menuButtonsSelectNull: any = [];

  menuButtonsSelectOne: any = [
    { icon: 'handshake', title: 'Trabajo colaborativo', action: 'cooperative', data: ""},
    { icon: 'remove_red_eye', title: 'Ver', action: 'view', data: '' },
  ];

  menuButtonsSelectMasive: any = [];

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;

  // Data a enviar de los radicados
  dataIdRadicados: any = [];

  /** Variables para internacionalizacion */
  activeLang: string;
  languageReceive: any;
  subscriptionTranslateService$: Subscription;

  /** Variables para traer el texto de confirmacion */
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;
  tipoRadicado: string;
  hashLocalStorage: any;

  /**
   * Valida si el filtro debe mostrarse automaticamente
   */
  paramFilterActive: any;

  constructor(
    private router: Router,
    public lhs: LocalStorageService,
    private authService: AuthService,
    private floatingButtonService: FloatingButtonService,
    public restService: RestService,
    private translate: TranslateService,
    private activateTranslateService: ActivateTranslateService,
    public globalAppService: GlobalAppService,
    public sweetAlertService: SweetAlertService,
    public transaccionesService: TransaccionesService,
    private routeActi: ActivatedRoute,
    private changeChildrenService: ChangeChildrenService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {
    /** Idioma inical */
    this.detectLanguageInitial();

    this.paramFilterActive = this.routeActi.snapshot.paramMap.get('params');
    console.log(this.paramFilterActive);
    this.tipoRadicado = 'actoAdmin';
  }

  ngOnInit() {
    /** Detectando si se ejecuta cambio de idioma */
    this.detectLanguageChange();

    // Hace el llamado del token
    this.getTokenLS();
    /**
     *  remover vista anterior al select multiple RadiRadicadoHijos
     */
    localStorage.removeItem(environment.hashRadiAsociados);
    this.eventClickButtonSelectedData = [];

    this.hashLocalStorage = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  public menuReceiveData(event) {

    this.dataIdRadicados = [];
    // Agrega los id's de los radicados para tratarlos
    let selecRadi = this.eventClickButtonSelectedData;
    if (selecRadi) {
      selecRadi.forEach(element => {
        if (this.dataIdRadicados.indexOf(element.id) < 0) {
          this.dataIdRadicados.push(element.id);
        }
      });
    }
    // Le asigna la operacion a ejecutar
    this.operationDialogObserva = event.action;
    switch (event.action) {
      
      case 'view':
        this.router.navigate(['/' + this.initBotonViewRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]]);
      break;
      
      case 'attachment':
        this.textFormAttachment = event.title;
        this.maxRowsFilesAttachment = 5;
        this.showButtonCleanAttachment = true;
        this.showButtonClearAttachment = true;

        this.showTipoDocumental = false; // Oculta el campo tipo documental
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        this.ruoteServiceDocumentsModal = this.ruoteServiceDocumentsAne; // Ruta de anexos
        this.dataSend = this.eventClickButtonSelectedData;
        this.statusUploadFileAneMasive = true;
        break;
      case 'attachmentMain':
        this.textFormAttachment = event.title;
        this.maxRowsFilesAttachment = 1;
        this.showButtonCleanAttachment = false;
        this.showButtonClearAttachment = false;

        this.showTipoDocumental = false; // Oculta el campo tipo documental
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        this.ruoteServiceDocumentsModal = this.ruoteServiceDocumentsAne; // Ruta de anexos
        this.dataSend = this.eventClickButtonSelectedData;
        this.statusUploadFileAneMasive = true;
        break;
      case 'cooperative':
        this.dataSend = this.eventClickButtonSelectedData;
        this.openCooperativeModal()
        break;
    }
  }


  openDialog(file, width, data) {
    const dialogRef = this.dialog.open(file, {
      disableClose: true,
      width: width,
      data: data
    });
    dialogRef.afterClosed().subscribe(res => { });
  }


  /**
   * Funcion que recibe el parametro event y retorna la estructura de los botones a mostrar
   * @param event
   */
  operacionesTiposRadicados(event: any) {


  }

  /**
   *
   * @param event
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {
    this.eventClickButtonSelectedData = event;
    if (event.length > 0) {
      if (event.length == 1) { // Un registro seleccionado
        this.menuButtons = this.menuButtonsSelectOne;
      } else { // Varios registros seleccionados
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else { // Ningun registro seleccionado
      localStorage.removeItem(environment.hashRadiAsociados);
      this.menuButtons = this.menuButtonsSelectNull;
    }
    this.operacionesTiposRadicados(event);
  }


  matDrawerContainerStyle: any;
  ngAfterViewInit() {
    // Obtenemos los estilos del mat-drawe-container
    const matDrawerContainer = document.querySelector('.mat-drawer-container') as HTMLElement;
    const style = window.getComputedStyle(matDrawerContainer);
    this.matDrawerContainerStyle = [style.width, style.maxWidth,style.height, style.maxHeight];
    console.log("matDrawerContainerStyle", this.matDrawerContainerStyle);
  }


  /** Métodos para el uso de la internacionalización */
  detectLanguageInitial() {
    if (localStorage.getItem('language')) {
      this.activeLang = localStorage.getItem('language');
    } else {
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.activeLang);
  }

  detectLanguageChange() {
    this.subscriptionTranslateService$ = this.activateTranslateService.activateLanguageChange.subscribe(language => {
      this.languageReceive = language;
      this.translate.setDefaultLang(this.languageReceive);
    });
  }
  /** Fin Métodos para el uso de la internacionalización */


  /**
   * Mensaje de confirmación para continuar con la trasacciones
   */
  continueTransaccion() {

    // Cambia el los mensajes de texto del componete para confirmar la eliminacion
    this.globalAppService.text18nGet().then((res) => {
      this.resSerLenguage = res;
      // console.log( this.resSerLenguage );
      this.titleMsg = '';
      this.textMsg = this.resSerLenguage['textMsContinuarPro'];
      let textReasignar = this.resSerLenguage['Reasignar'];
      let textDevolver = this.resSerLenguage['Devolver'];

      swal({
        title: this.titleMsg,
        text: this.textMsg,
        type: 'success',
        showCancelButton: true,
        cancelButtonText: textReasignar,
        confirmButtonText: textDevolver,
        cancelButtonClass: 'btn btn-success',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      }).then((result) => {

        if (String(result.dismiss) === 'overlay') {
          this.changeChildrenService.changeProcess({ proccess: "reload" });
        }

        if (result.value) {
          // Transacion Devolver
          // Le asigna la operacion a ejecutar
          this.operationDialogObserva = 'returnFiling';
          this.textFormObservaHeader = 'Devolver radicado';
          this.statusModalMain = true;

        }
        // Si el valor es igual a cancelar entonces es reasignar
        if (String(result.dismiss) === 'cancel') {

          // Transaccion send - reasignar
          this.showReasignacion = true; // Transaccion reasignacion
          // Le asigna la operacion a ejecutar
          this.operationDialogObserva = 'send';
          // Titulo del modal segun el title del boton
          this.textFormObservaHeader = 'Reasignar';
          this.routeChangeStatus = this.routeReasing;
          // muestra el componente
          this.statusModalMain = true;

        }
      });

    });

  }

  openCooperativeModal(): void {
    const dialogRef = this.dialog.open(CooperativeEditModalComponent, {
      width: '90%', // Changed to full width
      data: { iconMenu: 'handshake', dataSend: this.dataSend }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The modal was closed', result);
    });
  }


  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }

}

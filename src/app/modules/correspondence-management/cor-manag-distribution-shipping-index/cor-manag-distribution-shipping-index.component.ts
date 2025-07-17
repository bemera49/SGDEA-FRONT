/**

 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FloatingButtonService } from 'src/app/services/floating-button.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RestService } from 'src/app/services/rest.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ModalService } from '@app/services/modal/modal.service';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-cor-manag-distribution-shipping-index',
  templateUrl: './cor-manag-distribution-shipping-index.component.html',
  styleUrls: ['./cor-manag-distribution-shipping-index.component.css']
})

export class CorManagDistributionShippingIndexComponent implements OnInit {

  // Version api
  versionApi = environment.versionApiDefault;

  // Autentificacion
  authorization: string;

  // Variables respuesta Servicios 
  resServices: any;
  resErrServices: any;
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  tipo: any;

  /// Breadcrumb ///
  breadcrumbOn = [
    { 'name': 'Gestión correspondencia', 'route': '/correspondenceManagement' },
  ];
  breadcrumbRouteActive = 'Distribución y envío';
  /// Breadcrumb ///


  /// Initial List ///
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'dynamic_feed';
  initCardHeaderTitle = 'Listado de radicados';

  /* dtTitles: any = [
    { 'title': 'Tipo radicado', 'data': 'TipoRadicado' },
    { 'title': 'Número radicado', 'data': 'numeroRadiRadicado' },
    { 'title': 'Fecha creación', 'data': 'creacionRadiRadicado' },
    { 'title': 'Cliente', 'data': 'nombreCliente' },
    { 'title': 'Asunto', 'data': 'asuntoRadiRadicado' },
    { 'title': 'Tipo documental', 'data': 'nombreTipoDocumental' },
    { 'title': 'Fecha vencimiento', 'data': 'fechaVencimientoRadiRadicados' },
    { 'title': 'Prioridad',         'data': 'prioridadRadicados' },
  ]; */

  dtTitles: any = [
    { 'title': 'Radicado Entrada', 'data': 'numeroRadiRadicadoEntrada' },
    { 'title': 'Usuario', 'data': 'usuario' },
    { 'title': 'N° Cuenta Contrato', 'data': 'cuentaContrato' },
    { 'title': 'Radicado Salida', 'data': 'numeroRadiRadicadoSalida' },
    { 'title': 'N° Guía', 'data': 'guia' },
    { 'title': 'Fecha Radicado Salida', 'data': 'creacionRadiRadicado' },
    { 'title': 'Vencimiento Rad Salida', 'data': 'fechaVencimientoRadiRadicados' },
  ];

  // Configuraciones para datatables
  routeLoadDataTablesService: string = this.versionApi + 'radicacion/distribuciony-envio/index';
  // Formulario index 
  initBotonCreateRoute: string = '/filing/filing-create';

  // Configuración para el proceso change status
  routeChangeStatus: string = this.versionApi + 'radicacion/distribuciony-envio/change-status';

  // Nombre del módulo donde se esta accediendo al initialList
  redirectionPath: string = '/correspondenceManagement/distribution-shipping-index';
  route: string = '/correspondenceManagement/distribution-shipping-index';
  /// Initial List ///

  /// Configuración para el botón flotante ///
  menuButtonsSelectNull: any = [];
  menuButtonsSelectOne: any = [];
  menuButtonsSelectMasive: any = [];

  // Variable que controla botón flotante 
  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;
  /// Configuración para el botón flotante ///

  statusModalUploadFile: boolean = false // Muestra el componente de Envio de Documentos
  ruoteServiceDocumentsAne: string = environment.apiUrl + this.versionApi + 'radicacion/documentos/upload-document';
  ruoteServiceDocuments: string = environment.apiUrl + this.versionApi + 'radicacion/transacciones/upload-file';    // Documents
  //routeUploadGuias: string = environment.apiUrl + this.versionApi + 'api/v1/correspondencia/upload-guias'; // Carga de guia masiva


  dataIdRadicados: any = []; // Data a enviar de los radicados

  statusModalObserva: boolean = false; // modal de observacion para devolucion de radicado
  textFormObservaHeader: string;      // Titulo del botón inteligente tambien titulo del dialog observacion
  operationDialogObserva: string; // operacion que se utiliza para las trasferencias
  showMotivoDevolucion: boolean = false; // lista de motivos de devolucion
  showUploadGuiasMasivo: boolean = false;
  fileLabel: string = 'Seleccione el soporte de guía asignada'; // Label para la seleccion del archivo en el modal

  initBotonViewRoute: string = '/correspondenceManagement/distribution-shipping-view'; // Ruta ver usuario

  /** Variables para traer el texto de confirmacion */
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;

  constructor(

    private router: Router,
    private floatingButtonService: FloatingButtonService,
    private authService: AuthService,
    private routeActi: ActivatedRoute,
    public lhs: LocalStorageService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public sweetAlertService: SweetAlertService,
    private modal: ModalService,
    private notificationService: NotificationService,
    public transaccionesService: TransaccionesService) {
    let id = this.routeActi.snapshot.paramMap.get('id');
    if (id)
      this.tipo = {
        "tipoComunicacionId": id,
      };
    if (parseInt(id) == 1) {
      this.menuButtonsSelectNull = [
        {
          icon: "upload_file",
          title: "Carga masiva de guias",
          action: "uploadGuias",
          data: "",
        }
      ]
    } else {
      this.menuButtonsSelectNull = []
    }
    this.menuButtons = this.menuButtonsSelectNull;

    switch (parseInt(id)) {
      case 1:
        this.breadcrumbRouteActive = 'Envío Físico';
        break;
      case 2:
        this.breadcrumbRouteActive = 'Envío Electrónico';
        break;
      case 3:
        this.breadcrumbRouteActive = 'Notificación Física';
        break;
      case 4:
        this.breadcrumbRouteActive = 'Notificación Electrónica';
        break;
      case 5:
        this.breadcrumbRouteActive = 'Entrega Personal';
        break;
      default:
        this.breadcrumbRouteActive = 'En tramite';
    }



  }

  ngOnInit() {
    // Hace el llamado del token
    //console.log(this.routeUploadGuias)
    this.getTokenLS();

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
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {

    if (event.length == 0) {
      this.menuButtons = this.menuButtonsSelectNull;
    }

    this.dataIdRadicados = [];
    // Agrega los id's de los radicados para tratarlos
    let selecRadi = event;
    if (selecRadi) {
      selecRadi.forEach(element => {
        if (this.dataIdRadicados.indexOf(element.id) < 0) {
          this.dataIdRadicados.push(element.id);
        }
      });
    }

    this.transaccionesCorrespondencia(event);
  }

  /**
   * Funcion que recibe el parametro event y retorna la estructura de los botones a mostrar
   * @param event
   */
  transaccionesCorrespondencia(event) {

    if (event.length > 0) {

      // Un registro seleccionado -    // Varios registros seleccionados
      let params = {
        dataIdRadicados: this.dataIdRadicados
      };

      this.restService.restPost(this.versionApi + 'radicacion/distribuciony-envio/transacciones', params, this.authorization).subscribe((res) => {

        this.resServices = res;
        // la estructura de los botones llega por backend se asigna a la variable de botones
        this.menuButtonsSelectOne = this.resServices.dataTransacciones;

        this.eventClickButtonSelectedData = event;
        this.menuButtons = this.menuButtonsSelectOne.concat(this.menuButtonsSelectNull);

        // Guarda en localStorage
        localStorage.setItem(environment.hashMenuButtonRadiCor, this.authService.encryptAES(this.menuButtons, false));

      }, (err) => {
        this.resErrServices = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resErrServices).then((res) => { });
      }
      );

      // Ningun registro seleccionado
    } else {
      this.menuButtons = this.menuButtonsSelectNull;
    }

  }

  /**
   * Procesando las opciones del menu flotante
   * @param event
   */
  public menuReceiveData(event) {

    this.operationDialogObserva = event.action;

    switch (event.action) {

      case 'view':
        this.router.navigate(['/' + this.initBotonViewRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]]);
        break
      case 'shipping':
        this.statusModalUploadFile = true;
        break;

      case 'PersonalNotification':
        this.getSignPersonal(this.eventClickButtonSelectedData, 'notificacionpersonal');
        break;
      case 'AdviceNotification':
        this.getSignPersonal(this.eventClickButtonSelectedData, 'notificacionaviso');
        break;
      case 'SignPersonal':
        this.getSignPersonal(this.eventClickButtonSelectedData, 'sellopersonal');
        break;

      case 'shippingElectronic':
        this.shippingElectronic()
        break;

      case 'uploadGuias':
        this.uploadGuiasMasivo();
        break;

      case 'delivered':

        // Cambia el los mensajes de texto del componete para confirmar la eliminacion
        this.globalAppService.text18nGet().then((res) => {
          this.resSerLenguage = res;
          // console.log( this.resSerLenguage );
          this.titleMsg = this.resSerLenguage.titleMsg;
          this.textMsg = this.resSerLenguage['textMsgRadiReturn'];
          this.bntCancelar = this.resSerLenguage['bntCancelarSendMail'];
          this.btnConfirmacion = this.resSerLenguage['btnConfirmar'];

          swal({
            title: this.titleMsg,
            text: this.textMsg,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: this.bntCancelar,
            confirmButtonText: this.btnConfirmacion,
            cancelButtonClass: 'btn btn-danger',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          }).then((result) => {

            if (result.value) {
              this.floatingButtonService.changeDelivered(this.eventClickButtonSelectedData);
            }

          });
        });

        break;

      case 'returnDelivery':
        this.statusModalObserva = true;
        this.textFormObservaHeader = event.title;
        this.showMotivoDevolucion = true;
        break;
      case 'correspondenceTemplate':
        this.transaccionesService.transactionTempleteCorrespondence(this.eventClickButtonSelectedData, this.authorization, 'correspondenceTemplate');
        break;
      case 'correspondenceTemplateExcel':
        this.transaccionesService.transactionTempleteCorrespondence(this.eventClickButtonSelectedData, this.authorization, 'correspondenceTemplateExcel');
        break;

    }


  }

  /** Cerrar o desdruir componente observaciones */
  closeObserva(dataObserva) {

    // dataObserva es la data que retorna el componente de observaciones
    if (dataObserva.status) {
      switch (this.operationDialogObserva) {

        case 'shipping':
          this.floatingButtonService.changeShipping(this.eventClickButtonSelectedData, dataObserva.data);
          break

        case 'returnDelivery':
          // Cambia el los mensajes de texto del componete para confirmar la eliminacion
          this.globalAppService.text18nGet().then((res) => {

            this.resSerLenguage = res;
            // console.log( this.resSerLenguage );
            this.titleMsg = this.resSerLenguage.titleMsg;
            this.textMsg = this.resSerLenguage['textMsgRadiReturn'];
            this.bntCancelar = this.resSerLenguage['bntCancelarSendMail'];
            this.btnConfirmacion = this.resSerLenguage['btnConfirmar'];

            swal({
              title: this.titleMsg,
              text: this.textMsg,
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: this.bntCancelar,
              confirmButtonText: this.btnConfirmacion,
              cancelButtonClass: 'btn btn-danger',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            }).then((result) => {

              if (result.value) {
                this.floatingButtonService.changeReturnDelivered(this.eventClickButtonSelectedData, dataObserva.data);
              }

            });
          });
          break;

      }

    }

    this.statusModalObserva = false;
    this.statusModalUploadFile = false;
  }

  uploadGuiasMasivo() {
    this.showUploadGuiasMasivo = true
  }

  shippingElectronic() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.sendEmail().subscribe((event) => {
        let data = event[0]['message']['data']
        this.modal.openNotify("", event[0]['response'], true);
        this.floatingButtonService.changeShippingElectonic(this.eventClickButtonSelectedData, data);
        (err => {
          this.modal.openNotify("", event[0]['response'] + err?.error, true);
        })
      });

    })
  }

  sendEmail(): Observable<any> {
    let currentID = this.eventClickButtonSelectedData[0]['id'];
    return this.restService.restGetNotDecrypt(`api/v1/4-72/correo-certificado/${currentID}`, this.authorization)
  }

  closeModalEmiter(event) {
    this.showUploadGuiasMasivo = false
    this.floatingButtonService.changeShippingElectonic(this.eventClickButtonSelectedData, []);

  }


  getSignPersonal(data, carta) {
    let id = data[0].id
    if (id) {
      this.notificationService.getSignPersonal(id, carta).subscribe(
        (response: any) => {
          console.log('response', response)
          this.downloadFile(response.dataArchivo, response.nomArchivo);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  /**
 * Descarga el archivo que llega en base64
 * @param file el  en base 64
 * @param nameDownload nombre del archivo
 */
  downloadFile(file, nameDownload) {

    const linkSource = `data:application/octet-stream;base64,${file}`;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = nameDownload;
    downloadLink.click();
    // Cierra el loading
    // this.sweetAlertService.showNotificationClose();
  }
}

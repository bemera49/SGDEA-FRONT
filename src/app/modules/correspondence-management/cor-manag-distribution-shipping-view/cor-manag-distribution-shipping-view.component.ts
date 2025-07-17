/**

 */

import { Component, OnInit, Input } from '@angular/core';
import { ConvertParamsBase64Helper } from 'src/app/helpers/convert-params-base64.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { FloatingButtonService } from 'src/app/services/floating-button.service';
import swal from 'sweetalert2';
import { EncryptService } from 'src/app/services/encrypt.service';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

import { ChangeChildrenService } from 'src/app/services/change-children.service';
import { param } from 'jquery';
import { ModalService } from '@app/services/modal/modal.service';
import { Observable } from 'rxjs';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-cor-manag-distribution-shipping-view',
  templateUrl: './cor-manag-distribution-shipping-view.component.html',
  styleUrls: ['./cor-manag-distribution-shipping-view.component.css']
})
export class CorManagDistributionShippingViewComponent implements OnInit {

  // Autorizacion de localstorage
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  // Nombre del formulario
  textFormView = 'Detalle del Radicado'; // i18n
  dtCollapStatus = true;
  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList

  reuteLoadView: string = 'radicacion/radicados/view';
  reuteLoadViewHistorico: string = 'radicacion/radicados/historical-filing';
  // Icono del ViewList
  initCardHeaderIcon = 'dynamic_feed';
  // Ruta a redirigir
  redirectionPath = '/correspondenceManagement/distribution-shipping-index';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión correspondencia', 'route': '/correspondenceManagement' },
    { 'name': 'Distribución y envío', 'route': '/correspondenceManagement/distribution-shipping-index' }
  ];
  breadcrumbRouteActive = 'Detalles';

  /** Variable que controla botón flotante */
  menuButtonsSelectOne: any = [];
  menuButtons: any = [];
  menuButtonsSelectNull: any = [];

  statusRadicado: boolean = true; // Muestra el historico y los documentos
  statusModalMain: boolean = false;  // Muestra el componente de anexos main
  showAgenda: boolean = false;  // Muestra el input de fecha
  urlEndSend: any;
  showFuntionButtonRadi = false; // oculta los botones de las funciones de los documentos del radicado

  // Version api
  versionApi = environment.versionApiDefault;

  /** Variables respuesta Servicios */
  resServices: any;
  resServicesErr: any;
  resErrServices: any;
  resServicesVobo: any;
  resServicesVoboErr: any;
  resServicesReasign: any;
  resServicesReasignErr: any;
  resServicesAnnulment: any;
  resServicesAnnulmentErr: any;
  resServicesCopyInfo: any;
  resServicesCopyInfoErr: any;

  resServiceReturnFil: any;
  resServiceReturnFilErr: any;
  resServiceDelivered: any;
  resServiceDeliveredErr: any;
  resServiceReturnDelivered: any;
  resServiceReturnDeliveredErr: any;
  resServiceShipping: any;
  resServiceShippingErr: any;

  /*** Config para los modales  ***/
  fileDownload: any;
  statusViewPdf: boolean = false;

  showCorrespondencia: boolean = true;
  showMotivoDevolucion: boolean = false; // lista de motivos de devolucion
  statusModalUploadFile: boolean = false // Muestra el componente de Envio de Documentos
  statusModalObserva: boolean = false; // modal de observacion para devolucion de radicado
  eventClickButtonSelectedData: any;
  ruoteServiceDocuments: string = environment.apiUrl + environment.versionApiDefault + 'radicacion/transacciones/upload-file';

  routeBotonUpdateView: boolean = false;
  showReasignacion: boolean = false;  // Muestra los inputs de reasignacion
  showVOBO: boolean = false;  // Muestra los inputs de VOBO (Visto bueno)
  showCopyInformaded: boolean = false;  // Muestra los inputs de copiar informado
  textFormObservaHeader: string = ''; // Titulo del botón inteligente tambien titulo del dialog observacion
  operationDialogObserva: string; // operacion que se utiliza para las trasferencias

  @Input() messageUnderConstruction = 'funcionalidad en construcción';

  /** Data seleccionada en la tabla principal */
  @Input() dataIdRadicados: any = [];

  // Estados que controlar mostrar o no los botones de ver y eliminar
  statusActionDocDelete: boolean = false;
  statusActionDocView: boolean = false;

  /** Variables para traer el texto de confirmacion */
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;
  paramsDownload: any; // Esta variable toma el valor del id del documento seleccionado y lo pasa opción de descaga
  //dowloadDocuments: any;
  /**
   * Configuración para el botón flotante
   */
  iconMenu: string = 'menu';

  nameCollapsOne: string = 'Trazabilidad';
  nameCollapsTwo: string = 'Documentos';

  /** Variables para el modal pdf */
  statusModalviewPdf: boolean = false;
  statusModalDetail472: boolean = false;
  ruoteServiceDownloadFile: string = '';

  dataSend: any; // Data que se le envia al front de los radicados
  statusSimpleTableModal: boolean = false;
  statusMenuButton: boolean = true;
  // Data user tramitador
  dataUserTramitador: any;
  // Download documents
  ruoteServiceDownloadDocuments: string = environment.versionApiDefault + 'radicacion/documentos/download-doc-principal';
  // Ruta para ejecutar servicio de initial list modal
  routeLoadDataTablesServiceMod = environment.versionApiDefault + 'radicacion/radicados/get-document-versing';

  constructor(private authService: AuthService, private route: ActivatedRoute, private floatingButtonService: FloatingButtonService, public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService, public restService: RestService, private router: Router, public globalAppService: GlobalAppService,
    public transaccionesService: TransaccionesService, private changeChildrenService: ChangeChildrenService, private encryptService: EncryptService,
    private http: HttpClient,
    private modal: ModalService,
    private notificationService: NotificationService) {
    this.paramiD = this.route.snapshot.paramMap.get('id'); // SE recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
  }

  ngOnInit() {

    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });

    if (this.paramiD) {
      let dataLocalStorage = [];
      dataLocalStorage = this.authService.decryptAES(localStorage.getItem(environment.hashMenuButtonRadiCor));
      // localStorage.removeItem(environment.hashMenuButtonRadiCor);
      // Elimina el action view
      if (Array.isArray(localStorage)) {
        dataLocalStorage.forEach(element => {
          if (element.action != 'view') {
            this.menuButtons.push(element);
          }
        });
      } else {
        if (this.authorization) {
          this.transaccionesCorrespondencia();
        } else {
          this.lhs.getToken().then((res: string) => {
            this.authorization = res;
            this.transaccionesCorrespondencia();
          });
        }
      }
    }

  }

  getDataUserTramitador(data) {
    this.dataUserTramitador = data;
  }

  /**
 * Procesando las opciones del menu flotante
 * @param event
 */
  public menuReceiveData(event) {

    this.operationDialogObserva = event.action;

    this.eventClickButtonSelectedData = {
      0: {
        id: this.paramOID,
        idInitialList: this.paramOID,
      }
    }

    switch (event.action) {

      case 'shipping':
        this.statusModalUploadFile = true;
        break;
      case 'shippingElectronic':
        this.shippingElectronic()
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
              this.transactionDelivered(this.eventClickButtonSelectedData);
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

      case 'Descargar':
        this.dowloadDocuments(this.paramsDownload);
        break;
      case 'Ver':
        this.statusModalviewPdf = true;
        break;

      case 'DescargarCor':
        this.dowloadDocumentsCor(this.paramsDownload);
        break;
      case 'detalle472':
        console.log("statusModalDetail472")
        this.statusModalDetail472 = true;
        break;

      case 'versionFormat':
        this.dataSend = {
          id: this.paramOID,
          nameFile: event.data,
        };
        this.statusSimpleTableModal = true;
        this.statusMenuButton = false; // Ocultar botón flotante
        break;

    }


  }

  /** Cerrar o desdruir componente observaciones */
  closeObserva(dataObserva) {

    // dataObserva es la data que retorna el componente de observaciones
    if (dataObserva.status) {
      switch (this.operationDialogObserva) {

        case 'shipping':
          this.transactionShipping(dataObserva.data);
          // this.floatingButtonService.changeShipping(this.eventClickButtonSelectedData, dataObserva.data);
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
                this.transactionReturnDelivery(this.eventClickButtonSelectedData, dataObserva.data);
              }

            });
          });
          break;
      }

    }

    this.statusMenuButton = true; // Mostrar Boton flotante
    this.statusSimpleTableModal = false;
    this.statusModalObserva = false;
    this.statusModalUploadFile = false;
  }

  closeModalSendDocs(data) {
    this.statusModalUploadFile = false;
  }

  /** Toma la información emitida desde el componente de documentos */
  actionsDocsButton(params) {
    if (params.focus) {

      this.menuButtons = [];

      params.menuButtonsSelect.forEach(element => {
        // Valida que no esten estos botones si esta entonces no los asigne ya que son solo para radicados
        if (element.action == 'Ver' || element.action == 'Descargar' || element.action == 'DescargarCor' || element.action == 'detalle472' || element.action == 'versionFormat' || element.action == 'Actualizar') {
          this.menuButtons.push(element);
        }
      });
    } else {
      // Llama los botones del localstorage
      let dataLocalStorage = this.authService.decryptAES(localStorage.getItem(environment.hashMenuButtonRadiCor));
      if (Array.isArray(dataLocalStorage)) {
        this.saveButtons(dataLocalStorage).then((res) => {
          if (res) {
            // Guarda en localStorage
            localStorage.setItem(environment.hashMenuButtonRadiCor, this.authService.encryptAES(this.menuButtons, false));
          }
        });
      }

    }

    if (params.card == 'cardCorrespondence') {
      this.ruoteServiceDownloadFile = 'radicacion/documentos/download-document-cor';
    } else if (params.card == 'cardAnex') {
      this.ruoteServiceDownloadFile = 'radicacion/documentos/download-document';
    }

    this.paramsDownload = params.id;
  }

  /**
   * Transaccion Entrega de correspondencia
   * @param data recibe que contiene los id de los radicados y la observacion que digita el usuario
   */
  transactionDelivered(data) {

    // loading true
    this.sweetAlertService.sweetLoading();

    let params = {
      ButtonSelectedData: data
    };

    this.restService.restPost(this.versionApi + 'radicacion/transacciones/delivered', params, this.authorization).subscribe((res) => {
      this.resServiceDelivered = res;

      this.globalAppService.resolveResponse(this.resServiceDelivered, false).then((res) => {
        const responseResolveResponse = res;

        if (responseResolveResponse == true) {
          for (let key in this.resServiceDelivered.notificacion) {
            this.sweetAlertService.showNotification(this.resServiceDelivered.notificacion[key]['type'], this.resServiceDelivered.notificacion[key]['message']);
          }
        }
        // Consulta las transacciones del boton
        this.transaccionesCorrespondencia();

        this.sweetAlertService.sweetClose();
      });

    }, (err) => {
      this.resServiceDeliveredErr = err;
      // Evaluar respuesta de error del servicio
      this.globalAppService.resolveResponseError(this.resServiceDeliveredErr).then((res) => { });
      //
      // this.sweetAlertService.sweetClose();
    }
    );

  }

  /**
   * Metodo Devolver radicado
   * @param data Parametros de la peticion
   * @param dataIdRadicados array id radicados 
   */
  transactionReturnDelivery(ButtonSelectedData, data) {

    let params = {
      data: data,
      ButtonSelectedData: ButtonSelectedData
    };

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService.restPost(this.versionApi + 'radicacion/transacciones/return-delivery', params, this.authorization).subscribe((res) => {
      this.resServiceReturnDelivered = res;

      this.globalAppService.resolveResponse(this.resServiceReturnDelivered, false).then((res) => {
        const responseResolveResponse = res;

        //this.sweetAlertService.showNotificationClose();
        if (responseResolveResponse == true) {
          for (let key in this.resServiceReturnDelivered.notificacion) {
            this.sweetAlertService.showNotification(this.resServiceReturnDelivered.notificacion[key]['type'], this.resServiceReturnDelivered.notificacion[key]['message']);
          }
        }
        // Cargando false
        this.sweetAlertService.sweetClose();
        // Consulta las transacciones del boton
        this.transaccionesCorrespondencia();

      });

    }, (err) => {
      this.resServiceReturnDeliveredErr = err;
      // Evaluar respuesta de error del servicio
      this.globalAppService.resolveResponseError(this.resServiceReturnDeliveredErr).then((res) => { });
    }
    );
  }



  dowloadDocuments(idDocuments) {

    let data = {
      ButtonSelectedData: {
        0: {
          id: idDocuments
        }
      }
    };

    this.sweetAlertService.sweetLoading();

    this.restService.restPut(this.versionApi + 'radicacion/documentos/download-document', data, this.authorization).subscribe((res) => {

      this.resServices = res;
      this.globalAppService.resolveResponse(this.resServices, false).then((res) => {
        let responseResolveResponse = res;
        if (responseResolveResponse == true) {
          if (this.resServices.datafile) {
            this.downloadFile(this.resServices.datafile, this.resServices.fileName);
            this.sweetAlertService.showNotification('success', this.resServices['message']);
          }
        }
        // Cargando false
        this.sweetAlertService.sweetClose();
      });

    }, (err) => {
      this.resErrServices = err;
      // Evaluar respuesta de error del servicio
      this.globalAppService.resolveResponseError(this.resErrServices).then((res) => { });
    }
    );
  }

  dowloadDocumentsCor(idDocuments) {

    let data = {
      ButtonSelectedData: {
        0: {
          id: idDocuments
        }
      }
    };

    this.sweetAlertService.sweetLoading();

    this.restService.restPut(this.versionApi + 'radicacion/documentos/download-document-cor', data, this.authorization).subscribe((res) => {

      this.resServices = res;

      this.globalAppService.resolveResponse(this.resServices, false).then((res) => {
        let responseResolveResponse = res;
        if (responseResolveResponse == true) {
          if (this.resServices.datafile) {
            this.downloadFile(this.resServices.datafile, this.resServices.fileName);
            this.sweetAlertService.showNotification('success', this.resServices['message']);
          }
        }
        // Cargando false
        this.sweetAlertService.sweetClose();
      });

    }, (err) => {
      this.resErrServices = err;
      // Evaluar respuesta de error del servicio
      this.globalAppService.resolveResponseError(this.resErrServices).then((res) => { });
    }
    );

  }

  /**
   * Transaccion de enviar correspondencia
   * @param data recibe que contiene los id de los radicados y la observacion que digita el usuario
   */
  transactionShipping(dataObserva) {

    // loading true
    this.sweetAlertService.sweetLoading();
    // Se asignan los  valores al json
    let dataSend = {
      formValue: dataObserva,
      eventSelectData: this.eventClickButtonSelectedData
    };

    const formData = new FormData();
    formData.append('fileUpload', dataObserva.fileUpload);

    this.encryptService.generateRouteGetParams(this.ruoteServiceDocuments, dataSend, this.authorization).then((res) => {
      this.urlEndSend = res;

      /** Comsumo de servicio  */
      this.http.post(this.urlEndSend, formData, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.authorization,
          'language': 'es'
        }),
        reportProgress: true,
        observe: 'events'

      }).subscribe((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress: // Cuando el archivo está siendo cargado
            const progress = Math.round(100 * event.loaded / event.total);
            break;
          case HttpEventType.Response: // Cuando termina la carga
            if (event.body) {
              this.resServiceShipping = event.body;
              // Desencriptar respuesta del servicio
              this.encryptService.decryptAES(this.resServiceShipping.encrypted, this.authorization).then((res) => {
                let resUploadFileDecrypt: any = res;
                // console.log(resUploadFileDecrypt);
                // Evaluar respuesta del servicio
                this.globalAppService.resolveResponse(resUploadFileDecrypt, true, this.redirectionPath).then((res) => {
                  let responseResolveResponse = res;

                  if (responseResolveResponse == true) {
                    this.sweetAlertService.showNotification('success', resUploadFileDecrypt.message);
                  }
                  // loading flase
                  this.sweetAlertService.sweetClose();
                  // Consulta las transacciones del boton
                  this.transaccionesCorrespondencia();
                });
                // Fin Evaluar respuesta del servicio
              });
              // Fin Desencriptar respuesta del servicio
            }
            break;
        }

      }, (err) => {
        this.resServiceShippingErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resServiceShippingErr, true, this.redirectionPath).then((res) => { });
      });
      /** Fin Comsumo de servicio  */

    });
  }

  /**
   * Funcion que recibe el parametro event y retorna la estructura de los botones a mostrar
   * @param event
   */
  transaccionesCorrespondencia() {

    // Se limpian los botones
    this.menuButtons = this.menuButtonsSelectNull;

    // Un registro seleccionado -    // Varios registros seleccionados
    let params = {
      dataIdRadicados: [this.paramOID]
    };

    this.restService.restPost(this.versionApi + 'radicacion/distribuciony-envio/transacciones', params, this.authorization).subscribe((res) => {

      this.resServices = res;
      // la estructura de los botones llega por backend se asigna a la variable de botones
      this.eventClickButtonSelectedData = event;
      // Recorre los botones y quita el del view
      let buttonsNew = this.resServices.dataTransacciones;
      this.saveButtons(buttonsNew).then((res) => {
        if (res) {
          // Guarda en localStorage
          localStorage.setItem(environment.hashMenuButtonRadiCor, this.authService.encryptAES(this.menuButtons, false));
          // Recarga el componente
          this.changeChildrenService.changeProcess({ proccess: 'reload' });
        }
      });

    }, (err) => {
      this.resErrServices = err;
      // Evaluar respuesta de error del servicio
      this.globalAppService.resolveResponseError(this.resErrServices).then((res) => { });
    }
    );

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

  closePdfModal(data) {
    this.statusModalviewPdf = false;
  }

  close472Modal(data) {
    this.statusModalDetail472 = false;
  }

  saveButtons(data) {
    this.menuButtons = [];
    return new Promise(resolve => {
      data.forEach(element => {
        // Elimina el view
        if (element.action != 'view') {
          this.menuButtons.push(element);
        }
      });
      resolve(true);
    });
  }


  shippingElectronic() {

    console.log(this.eventClickButtonSelectedData)
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.sendEmail().subscribe((event) => {
        this.modal.openNotify("", event[0]['response'], true);
        // Regargar la data
        this.changeChildrenService.changeProcess({ proccess: "reload" });
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


}




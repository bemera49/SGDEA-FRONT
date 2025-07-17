/**

 */

import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arc-manag-mass-transfer',
  templateUrl: './arc-manag-mass-transfer.component.html',
  styleUrls: ['./arc-manag-mass-transfer.component.css']
})
export class ArcManagMassTransferComponent implements OnInit {

  // Nombre del formulario
  textForm = 'Traslado masivo';
  // Icono del formulario
  initCardHeaderIcon = 'settings_applications';
  // Autentificacion
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  paramName: string;
  paramOName: string;
  filesUploadCount: any;

  /** Las variables para mostrar la alerta informativa  */
  subMenuNotificationStatus: boolean = true;
  subMenuNotificationMessage: string = 'notificationHeaderUploadMasive';

  dataSend: object; // Objeto que se envia al back como parametro request
  redirectActive = true; // redirecciona
  redirectionPath = '/documentManagement/dependencies-index'; // Ruta a redirigir en caso de no poseer permisos para realizar la accion
  showButtonDowload: boolean = false; // Muestra el boton para descargar formato
  validateFile: any = [{ type: 'xls' }, { type: 'xlsx' }];

  /** Boton flotante */
  iconMenu: string = 'save';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión documental', 'route': '/documentManagement' },
  ];
  breadcrumbRouteActive = 'Traslado masivo';
  /**
   * Configuraciones para los servicios
   */
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;
  /** Archivos */
  ruoteServiceDocuments: string = environment.apiUrl + environment.versionApiDefault + 'api/gestion-archivo/traslado-masivo'

  timerShowNotification: number = 9000; // Tiempo de visualización de la notificacion en pantalla

  constructor() { }

  ngOnInit() {
  }

}

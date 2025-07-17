/**

 */

import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arc-manag-bulk-load',
  templateUrl: './arc-manag-bulk-load.component.html',
  styleUrls: ['./arc-manag-bulk-load.component.css']
})
export class ArcManagBulkLoadComponent implements OnInit {

  // Nombre del formulario
  textForm = 'Cargue masivo de archivos';
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
  breadcrumbRouteActive = 'Cargue masivo';
  /**
   * Configuraciones para los servicios
   */
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;
  /** Archivos */
  ruoteServiceDocuments: string = environment.apiUrl + environment.versionApiDefault + 'api/gestion-archivo/carga-masiva'

  timerShowNotification: number = 9000; // Tiempo de visualización de la notificacion en pantalla

  constructor() { }

  ngOnInit() {
  }

}

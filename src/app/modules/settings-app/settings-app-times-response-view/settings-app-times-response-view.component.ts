/**

 */

import { Component, OnInit } from '@angular/core';
import { ConvertParamsBase64Helper } from 'src/app/helpers/convert-params-base64.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-app-times-response-view',
  templateUrl: './settings-app-times-response-view.component.html',
  styleUrls: ['./settings-app-times-response-view.component.css']
})
export class SettingsAppTimesResponseViewComponent implements OnInit {

  
  // Autorizacion de localstorage
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  // Nombre del formulario
  textFormView = 'Detalle horario laboral'; // i18n
  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList
  reuteLoadView: string = 'configuracionApp/cg-tiempos-respuesta/view';
  // Rutas
  routeBotonUpdateView: string = '/setting/times-response-update/'; // Ruta editar
  // Icono del ViewList
  initCardHeaderIcon = 'query_builder';
  // Ruta a redirigir
  redirectionPath = '/setting/times-response-index';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Configuración', 'route': '/setting' },
    { 'name': 'Horario laboral', 'route': this.redirectionPath }
  ];
  breadcrumbRouteActive = 'Detalles';

  checkListAcordeon: boolean = true;
  checkListAcordeonCardHeaderIcon: string = 'description';
  checkListAcordeonTexForm: string = 'Transacciones asociadas al tipo de radicado';

  /**
   * Configuración para el botón flotante
   */
  iconMenu: string = 'edit';

  constructor(private route: ActivatedRoute, public lhs: LocalStorageService, public sweetAlertService: SweetAlertService, public restService: RestService, private router: Router) { 
    this.paramiD = this.route.snapshot.paramMap.get('id'); // SE recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
    this.routeBotonUpdateView = this.routeBotonUpdateView + this.paramiD;
  }

  ngOnInit() {
  }

  menuPrimaryReceiveData(event) {
    this.router.navigate(['/' + this.routeBotonUpdateView]);
  }

}

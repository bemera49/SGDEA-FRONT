/**

 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FloatingButtonService } from 'src/app/services/floating-button.service';

@Component({
  selector: 'app-arc-manag-physical-space-index',
  templateUrl: './arc-manag-physical-space-index.component.html',
  styleUrls: ['./arc-manag-physical-space-index.component.css']
})
export class ArcManagPhysicalSpaceIndexComponent implements OnInit {

  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'business';
  initCardHeaderTitle = 'Listado de espacio físico';
  // Nombre del módulo donde se esta accediendo al initialList
  route: string = 'Providers';
  // Autorizacion de localstorage
  authorization: string;
  // Version api
  versionApi = environment.versionApiDefault;
  // Ruta a redirigir
  redirectionPath = '/archiveManagement/physical-space-index';
  /** Formulario index */
  initBotonCreateRoute: string = '/archiveManagement/physical-space-create'; // Ruta del botón crear
  initBotonUpdateRoute: string = '/archiveManagement/physical-space-update'; // Ruta editar
  initBotonViewRoute: string = '/archiveManagement/physical-space-view'; // Ruta ver
  initBtnVersioningIndexteRoute: string = this.redirectionPath; // Ruta Index de versionamiento
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión de archivo', 'route': '/archiveManagement' },
  ];
  breadcrumbRouteActive = 'Asignación de espacio físico';
  // Configuraciones para datatables
  routeLoadDataTablesService: string = environment.versionApiDefault + 'gestionArchivo/espacio-fisico/index';
  // Configuración para el proceso change status
  routeChangeStatus: string = environment.versionApiDefault + 'gestionArchivo/espacio-fisico/change-status';

  dtTitles: any = [
    { 'title': 'Edificio', 'data': 'buildingName' },
    { 'title': 'Piso', 'data': 'floorNumber' },
    { 'title': 'Área de archivo', 'data': 'warehouseLocation' },
    { 'title': 'Pasillos', 'data': 'hall' },
    { 'title': 'Módulos', 'data': 'module' },
    { 'title': 'Entrepaños', 'data': 'shelf' },
    { 'title': 'Utilización', 'data': 'boxesInUse'},
    { 'title': 'Disponibilidad', 'data': 'boxAvailability' },
  ];
  /** Fin Configuraciones para datatables */
  /** Fin Initial List */

  /**
   * Configuración para el botón flotante
   */
  menuButtonsSelectNull: any = [
    { icon: 'add', title: 'Agregar', action: 'add', data: '' },
  ];
  menuButtonsSelectOne: any = [
    { icon: 'add', title: 'Agregar', action: 'add', data: '' },
    { icon: 'edit', title: 'Editar', action: 'edit', data: '' },
    { icon: 'remove_red_eye', title: 'Ver', action: 'view', data: '' },
/*     { icon: 'autorenew', title: 'Cambiar estado', action: 'changeStatus', data: '' },
 */  ];
  menuButtonsSelectMasive: any = [
    { icon: 'add', title: 'Agregar', action: 'add', data: '' },
    { icon: 'autorenew', title: 'Cambiar estado', action: 'changeStatus', data: '' },
  ];

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;

  constructor( private router: Router, private floatingButtonService: FloatingButtonService)  { }

  ngOnInit() {
  }

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  menuReceiveData(event) {

    switch (event.action) {
      case 'add':
        this.router.navigate(['/' + this.initBotonCreateRoute]);
      break;
      case 'edit':
        this.router.navigate(['/' + this.initBotonUpdateRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]]);
      break;
      case 'view':
        this.router.navigate(['/' + this.initBotonViewRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]]);
      break;
      case 'changeStatus':
        this.floatingButtonService.changeStatus(this.eventClickButtonSelectedData);
      break;
    }
  }

  /**
   *
   * @param event
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {
    if (event.length > 0) {
      if (event.length == 1) { // Un registro seleccionado
        this.eventClickButtonSelectedData = event;
        this.menuButtons = this.menuButtonsSelectOne;
      } else { // Varios registros seleccionados
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else { // Ningun registro seleccionado
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }

}

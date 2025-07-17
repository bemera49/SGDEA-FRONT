import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FloatingButtonService } from 'src/app/services/floating-button.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-e-filing-form',
  templateUrl: './e-filing-form.component.html',
  styleUrls: ['./e-filing-form.component.css']
})
export class EFilingFormComponent implements OnInit {

  breadcrumbOn = [
    { 'name': 'Configuración', 'route': '/e-filing' },
  ];

  breadcrumbRouteActive = 'Parametrizas tiempos de respuesta';

  initCardHeaderStatus = true;
  NoDecrypt = true;
  showButtonFiltrer = false;
  showButtonRequest = true;
  showButtonNew = true;
  showButtonEdit = false;
  initCardHeaderIcon = 'local_shipping';
  initCardHeaderTitle = 'Listado de tiempos de respuesta';
  dtTitles: any = [
    { 'title': 'Tipo de solicitud', 'data': 'nombre' },
    { 'title': 'Días parámetrizados', 'data': 'dias_vencimiento' },
    { 'title': 'Fecha creación', 'data': 'created_at' },
    { 'title': 'Usuario', 'data': 'user' },
    { 'title': 'Estado', 'data': 'activo' },
  ];
  routeLoadDataTablesService: string = environment.versionApiDefault + 'api/v1/tipo-solicitudes'; // api/v1/tipo-solicitudes - configuracionApp/cg-proveedores/index
  initBotonCreateRoute: string = '/e-filing/index'; // Ruta del botón crear
  routeChangeStatus: string = environment.versionApiDefault + 'configuracionApp/cg-proveedores/change-status';
  initBotonUpdateRoute: string = '/e-filing/form'; // Ruta editar
  eventClickButtonSelectedData: any;
  initBotonViewRoute: string = '/setting/providers-view'; // Ruta ver

  route: string = 'Providers';

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
    { icon: 'autorenew', title: 'Cambiar estado', action: 'changeStatus', data: '' },
  ];
  menuButtonsSelectMasive: any = [
    { icon: 'add', title: 'Agregar', action: 'add', data: '' },
    { icon: 'autorenew', title: 'Cambiar estado', action: 'changeStatus', data: '' },
  ];

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectNull;

  constructor(
    private router: Router,
    private floatingButtonService: FloatingButtonService,
    public sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

   /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
   menuReceiveData(event) {

    console.log({"menu data": event});

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
    console.log({"recibe data": event});
    if (event.length > 0) {
      this.showButtonNew = false;
      if (event.length == 1) { // Un registro seleccionado
        this.showButtonEdit = true;
        this.eventClickButtonSelectedData = event;
        this.menuButtons = this.menuButtonsSelectOne;
      } else { // Varios registros seleccionados
        this.showButtonEdit = false;
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else { // Ningun registro seleccionado
      this.menuButtons = this.menuButtonsSelectNull;
      this.showButtonNew = true;
      this.showButtonEdit = false;
    }
  }

  buttonRequestReceiveData(event) {
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
}

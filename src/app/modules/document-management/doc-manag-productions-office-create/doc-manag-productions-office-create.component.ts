import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-manag-productions-office-create',
  templateUrl: './doc-manag-productions-office-create.component.html',
  styleUrls: ['./doc-manag-productions-office-create.component.css']
})
export class DocManagProductionsOfficeCreateComponent implements OnInit {
    // Ruta a redirigir
    redirectionPath = '/documentManagement/dependencies-index';
    /** BreadcrumbOn  */
    breadcrumbOn = [
      { 'name': 'Gestión documental', 'route': '/documentManagement' },
      { 'name': 'Gestión Oficinas Productoras', 'route': this.redirectionPath }
    ];

    breadcrumbRouteActive = 'Crear'; // i18n

    // Variables para el boton flotante
    iconMenu: string = 'save';

    /** Initial List */
    initCardHeaderStatus = true;
    initCardHeaderIcon = 'bookmarks';
    initCardHeaderTitle = 'Oficina Productora';
  constructor() { }

  ngOnInit(): void {
  }

}

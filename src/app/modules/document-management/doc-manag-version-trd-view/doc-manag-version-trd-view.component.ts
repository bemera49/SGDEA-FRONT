/**

 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-manag-version-trd-view',
  templateUrl: './doc-manag-version-trd-view.component.html',
  styleUrls: ['./doc-manag-version-trd-view.component.css']
})
export class DocManagVersionTrdViewComponent implements OnInit {

  // Ruta para consultar
  reuteLoadView: string = 'gestionDocumental/trd-tmp/view';
  // Ruta a redirigir
  redirectionPath = '/documentManagement/version-trd-index';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión documental', 'route': '/documentManagement' },
    { 'name': 'Versionamiento TRD', 'route': this.redirectionPath }
  ];
  breadcrumbRouteActive = 'Detalles';

  constructor() { }

  ngOnInit() {
  }

}
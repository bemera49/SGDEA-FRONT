/**

 */

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings-app-templates-isolucion-index',
  templateUrl: './settings-app-templates-isolucion-index.component.html',
  styleUrls: ['./settings-app-templates-isolucion-index.component.css']
})
export class SettingsAppTemplatesIsolucionIndexComponent implements OnInit {

  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Configuración', 'route': '/setting' },
  ];
  breadcrumbRouteActive = 'Plantillas Isolución';

  youtubeVideoLink: any = 'http://isolucion.aerocivil.gov.co/Isolucion/PaginaLogin.aspx';

  constructor(public sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
  }

  getLink(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeVideoLink);
  }

}

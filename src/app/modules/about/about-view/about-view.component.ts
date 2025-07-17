/**

 */

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about-view",
  templateUrl: "./about-view.component.html",
  styleUrls: ["./about-view.component.css"],
})
export class AboutViewComponent implements OnInit {
  // Autorizacion de localstorage
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  textFormView = "Acerca de";
  textFormViewDos = "Créditos";
  // Ruta a consultar en el ViewList
  reuteLoadView: string = "default/about";
  // Icono del ViewList
  initCardHeaderIcon = "info";
  /** BreadcrumbOn  */
  breadcrumbOn = [];
  breadcrumbRouteActive = "Acerca del sistema";
  redirectionPath = "";

  constructor() {}

  ngOnInit(): void {}
}

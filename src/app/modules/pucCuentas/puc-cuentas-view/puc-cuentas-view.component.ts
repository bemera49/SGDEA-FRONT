import { Component, OnInit } from "@angular/core";
import { ConvertParamsBase64Helper } from "src/app/helpers/convert-params-base64.helper";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { RestService } from "src/app/services/rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-puc-cuentas-view",
  templateUrl: "./puc-cuentas-view.component.html",
  styleUrls: ["./puc-cuentas-view.component.css"],
})
export class PucCuentasViewComponent {
  // Autentificacion
  authorization: string;
  // Parametro de operaciones
  paramOID = 0;
  // Nombre del boton
  textButtonView = "Actualizar";
  // Nombre del formulario
  textFormView = "Detalle de la cuenta";
  // variable que guarda el id que llega por Get
  paramiD: string;

  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList
  reuteLoadView: string = "pucCuentas/puc-cuentas/view";
  // Ruta a actualizar en el ViewList
  routeBotonUpdateView: string = "pucCuentas/puc-cuentas-update/";
  // Icono del ViewList
  initCardHeaderIcon = "preview";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Propiedad Horizontal", route: "/pucCuentas" },
    { name: "Plan de cuentas", route: "/pucCuentas/puc-cuentas-index" },
  ];
  breadcrumbRouteActive = "Detalles Cuenta";
  redirectionPath: string = "/pucCuentas/puc-cuentas-index"; // ruta a redirigir en caso de que el usuario no posea permisos para realizar la accion

  /**
   * Configuración para el botón flotante
   */
  iconMenu: string = "edit";

  constructor(
    private route: ActivatedRoute,
    public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    private router: Router,
  ) {
    this.paramiD = this.route.snapshot.paramMap.get("id"); // SE recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
    this.routeBotonUpdateView = this.routeBotonUpdateView + this.paramiD;
  }

  ngOnInit() {}

  menuPrimaryReceiveData(event) {
    this.router.navigate(["/" + this.routeBotonUpdateView]);
  }
}

import { Component, OnInit } from "@angular/core";
import { ConvertParamsBase64Helper } from "src/app/helpers/convert-params-base64.helper";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { RestService } from "src/app/services/rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-ph-terceros-apartamentos-view",
  templateUrl: "./ph-terceros-apartamentos-view.component.html",
  styleUrls: ["./ph-terceros-apartamentos-view.component.css"],
})
export class PhTercerosApartamentosViewComponent {
  // Autentificacion
  authorization: string;
  // Parametro de operaciones
  paramOID = 0;
  // Nombre del boton
  textButtonView = "Ver";
  // Nombre del formulario
  textFormView = "Detalle del apartamento";
  // variable que guarda el id que llega por Get
  paramiD: string;

  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList
  reuteLoadView: string = "phTerceroApartamentos/ph-tercero-apartamentos/view";
  // Ruta a actualizar en el ViewList
  routeBotonUpdateView: string = "pucCuentas/ph-terceros-apartamentos-update/";
  // Icono del ViewList
  initCardHeaderIcon = "preview";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Propiedad Horizontal", route: "/pucCuentas" },
    {
      name: "Catalogo Terceros",
      route: "/pucCuentas/ph-terceros-apartamentos-index",
    },
  ];
  breadcrumbRouteActive = "Detalles Tercero";
  redirectionPath: string = "/pucCuentas/ph-terceros-apartamentos-index"; // ruta a redirigir en caso de que el usuario no posea permisos para realizar la accion

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

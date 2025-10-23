import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { FloatingButtonService } from "src/app/services/floating-button.service";
import { AuthService } from "@app/services/auth.service";

@Component({
  selector: "app-ph-terceros-apartamentos-index",
  templateUrl: "./ph-terceros-apartamentos-index.component.html",
  styleUrls: ["./ph-terceros-apartamentos-index.component.css"],
})
export class PhTercerosApartamentosIndexComponent implements OnInit {
  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderIcon = "apartment";
  initCardHeaderTitle = "Gestión de Unidades";
  redirectionPath: string = "/pucCuentas/ph-terceros-apartamentos-index";
  route: string = "PucCuentas";
  /** BreadcrumbOn  */
  breadcrumbOn = [{ name: "Propiedad Horizontal", route: "/pucCuentas" }];
  breadcrumbRouteActive = "Gestión de Unidades";
  /** Formulario index */
  initBotonCreateText: string = "Crear"; // Texto del botón crear
  initBotonCreateRoute: string = "/pucCuentas/ph-terceros-apartamentos-create"; // Ruta del botón crear
  initBotonUpdateRoute: string = "/pucCuentas/ph-terceros-update"; // Ruta editar usuario
  initBotonViewRoute: string = "/pucCuentas/ph-terceros-apartamentos-view"; // Ruta ver usuario
  //initBotonViewRoute: string = "/pucCuentas/puc-cuentas-view"; // Ruta ver usuario

  /** Configuraciones para datatables */
  routeLoadDataTablesService: string =
    environment.versionApiDefault +
    "phTerceroApartamentos/ph-tercero-apartamentos/index";
  dtTitles: any = [
    { title: "Tercero", data: "idph_tercero" },
    { title: "Torre", data: "torre" },
    { title: "Apartamento", data: "apartamento" },
    { title: "Referencia", data: "referencia" },
    { title: "Principal", data: "principal" },
    { title: "Tipo Zona", data: "tipo_zona" },
    { title: "Dirección Completa", data: "direccion_completa" },
    { title: "Ciudad", data: "ciudad" },
    { title: "Departamento", data: "departamento" },
    { title: "Fecha Inicio", data: "fecha_inicio" },
    { title: "Fecha Fin", data: "fecha_fin" },
  ];
  /** Fin Configuraciones para datatables */
  /** Fin Initial List */

  /**
   * Configuración para el botón flotante
   */
  menuButtonsSelectNull: any = [
    { icon: "add", title: "Agregar", action: "add", data: "" },
  ];
  menuButtonsSelectOne: any = [
    { icon: "add", title: "Agregar", action: "add", data: "" },
    { icon: "edit", title: "Editar", action: "edit", data: "" },
    { icon: "remove_red_eye", title: "Ver", action: "view", data: "" },
    {
      icon: "autorenew",
      title: "Cambiar estado",
      action: "changeStatus",
      data: "",
    },
  ];
  menuButtonsSelectMasive: any = [
    { icon: "add", title: "Agregar", action: "add", data: "" },
    {
      icon: "autorenew",
      title: "Cambiar estado",
      action: "changeStatus",
      data: "",
    },
  ];

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;

  /**
   * Configuración para el proceso change status
   */
  routeChangeStatus: string =
    environment.versionApiDefault + "phTercero/ph-tercero/change-status";

  constructor(
    private router: Router,
    private floatingButtonService: FloatingButtonService,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  menuReceiveData(event) {
    switch (event.action) {
      case "add":
        this.router.navigate(["/" + this.initBotonCreateRoute]);
        break;
      case "edit":
        this.router.navigate([
          "/" +
            this.initBotonUpdateRoute +
            "/" +
            this.eventClickButtonSelectedData[0]["data"][0],
        ]);
        break;
      case "view":
        this.router.navigate([
          "/" +
            this.initBotonViewRoute +
            "/" +
            this.eventClickButtonSelectedData[0]["data"][0],
        ]);
        break;
      case "changeStatus":
        this.floatingButtonService.changeStatus(
          this.eventClickButtonSelectedData,
        );
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
      if (event.length == 1) {
        // Un registro seleccionado
        this.eventClickButtonSelectedData = event;
        this.menuButtons = this.menuButtonsSelectOne;
      } else {
        // Varios registros seleccionados
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else {
      // Ningun registro seleccionado
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }
}

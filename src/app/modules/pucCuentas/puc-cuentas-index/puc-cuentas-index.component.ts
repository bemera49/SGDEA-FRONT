import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { FloatingButtonService } from "src/app/services/floating-button.service";
import { AuthService } from "@app/services/auth.service";

@Component({
  selector: "app-puc-cuentas-index",
  templateUrl: "./puc-cuentas-index.component.html",
  styleUrls: ["./puc-cuentas-index.component.css"],
})
export class PucCuentasIndexComponent implements OnInit {
  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderIcon = "apartment";
  initCardHeaderTitle = "Catalogo de cuentas";
  //redirectionPath: string = "/pucCuentas/puc-cuentas-index";
  route: string = "PucCuentas";
  /** BreadcrumbOn  */
  breadcrumbOn = [{ name: "Propiedad Horizontal", route: "/pucCuentas" }];
  breadcrumbRouteActive = "Plan de cuentas";
  /** Formulario index */
  initBotonCreateText: string = "Crear"; // Texto del botón crear
  initBotonCreateRoute: string = "/pucCuentas/puc-cuentas-create"; // Ruta del botón crear
  initBotonUpdateRoute: string = "/pucCuentas/puc-cuentas-update"; // Ruta editar usuario
  initBotonViewRoute: string = "/pucCuentas/puc-cuentas-view"; // Ruta ver usuario

  /** Configuraciones para datatables */
  routeLoadDataTablesService: string =
    environment.versionApiDefault + "pucCuentas/puc-cuentas/index";
  dtTitles: any = [
    { title: "Codigo", data: "codigo" },
    { title: "Nombre", data: "nombre" },
    { title: "Moneda", data: "moneda_nacional" },
    { title: "Naturaleza", data: "naturaleza" },
    { title: "Requiere Tercero", data: "requiere_tercero" },
    //{ title: "Estado", data: "status" },
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
    environment.versionApiDefault + "pucCuentas/puc-cuentas/change-status";

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

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { FloatingButtonService } from "src/app/services/floating-button.service";
import { AuthService } from "@app/services/auth.service";

@Component({
  selector: "app-ph-terceros-index",
  templateUrl: "./ph-terceros-index.component.html",
  styleUrls: ["./ph-terceros-index.component.css"],
})
export class PhTercerosIndexComponent implements OnInit {
  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderIcon = "groups_2";
  initCardHeaderTitle = "Catalogo Terceros";
  redirectionPath: string = "/pucCuentas/ph-terceros-index";
  route: string = "PucCuentas";
  /** BreadcrumbOn  */
  breadcrumbOn = [{ name: "Propiedad Horizontal", route: "/pucCuentas" }];
  breadcrumbRouteActive = "Catalogo de terceros";
  /** Formulario index */
  initBotonCreateText: string = "Crear"; // Texto del botón crear
  initBotonCreateRoute: string = "/pucCuentas/ph-terceros-create"; // Ruta del botón crear
  initBotonUpdateRoute: string = "/pucCuentas/ph-terceros-update"; // Ruta editar usuario
  initBotonViewRoute: string = "/pucCuentas/ph-terceros-view"; // Ruta ver usuario
  //initBotonViewRoute: string = "/pucCuentas/puc-cuentas-view"; // Ruta ver usuario

  /** Configuraciones para datatables */
  routeLoadDataTablesService: string =
    environment.versionApiDefault + "phTercero/ph-tercero/index";
  dtTitles: any = [
    { title: "Regimen Tributario", data: "idPhRegimenTributario" },
    { title: "Tipo Persona", data: "tipoPersona" },
    { title: "Tipo Identificación", data: "idTipoIdentificacion" },
    { title: "Identificación", data: "numeroIdentificacion" },
    { title: "Nombre", data: "nombre" },
    { title: "Pais", data: "nivelGeografico1" },
    { title: "Departamento", data: "nivelGeografico2" },
    { title: "Municipio", data: "nivelGeografico3" },
    { title: "Copropiedad", data: "idPhCopropiedad" },
    { title: "Dirreción", data: "direccion1" },
    { title: "Celular", data: "celular" },
    { title: "Correo", data: "email" },
    { title: "Fecha Entrega Apto", data: "fechaEntregaApartamento" },
    { title: "Genero", data: "genero" },
    { title: "Estado Civil", data: "idEstadoCivil" },
    { title: "Impuesto Ventas", data: "idPhImpuestoVentas" },
    { title: "Obsevaciones", data: "obsevaciones" },
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

import { Component, OnInit } from "@angular/core";
import { SweetAlertService } from "../../../services/sweet-alert.service";
import { RestService } from "../../../services/rest.service";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router } from "@angular/router";
import { GlobalAppService } from "src/app/services/global-app.service";

@Component({
  selector: "app-puc-cuentas-create",
  templateUrl: "./puc-cuentas-create.component.html",
  styleUrls: ["./puc-cuentas-create.component.css"],
})
export class PucCuentasCreateComponent implements OnInit {
  // Autorizacion de localstorage
  authorization: string;
  // Nombre del boton
  textButtonForm = "Crear";
  // Nombre del formulario
  textFormCodigo = "Crear cuenta";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Propiedad Horizontal", route: "/pucCuentas" },
    { name: "Plan de cuentas", route: "/pucCuentas/puc-cuentas-index" },
  ];
  breadcrumbRouteActive = "Crear";
  /**
   * Configuraciones para los servicios
   */
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;

  constructor(
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public lhs: LocalStorageService,
    private router: Router,
    public globalAppService: GlobalAppService,
  ) {}

  ngOnInit() {
    // Hace el llamado del token
    this.getTokenLS();
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  submitFormReceive(data) {
    /**
     * Cargando true
     */
    this.sweetAlertService.sweetLoading();
    let versionApi = environment.versionApiDefault;

    this.restService
      .restPost(
        versionApi + "pucCuentas/puc-cuentas/create",
        data,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.responseServiceFormSubmit = res;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.responseServiceFormSubmit,
              true,
              "/pucCuentas/puc-cuentas-index",
            )
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                // Guarda en el local storage el mensaje
                localStorage.setItem(
                  "setFlashText",
                  this.responseServiceFormSubmit.message,
                );
                // Redirecciona a la pagina principal
                this.router.navigate(["/pucCuentas/puc-cuentas-index"]);
                // Cargando false
                this.sweetAlertService.sweetClose();
              }
            });
        },
        (err) => {
          this.responseServiceFormSubmitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(
              this.responseServiceFormSubmitErr,
              true,
              "/pucCuentas/puc-cuentas-index",
            )
            .then((res) => {});
        },
      );
  }
}

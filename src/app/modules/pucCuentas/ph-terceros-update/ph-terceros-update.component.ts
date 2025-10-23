import { Component, OnInit } from "@angular/core";
import { SweetAlertService } from "../../../services/sweet-alert.service";
import { RestService } from "../../../services/rest.service";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConvertParamsBase64Helper } from "src/app/helpers/convert-params-base64.helper";
import { GlobalAppService } from "src/app/services/global-app.service";

@Component({
  selector: "app-ph-terceros-update",
  templateUrl: "./ph-terceros-update.component.html",
  styleUrls: ["./ph-terceros-update.component.css"],
})
export class PhTercerosUpdateComponent {
  // Nombre del boton
  textButtonForm = "Actualizar";
  // Nombre del formulario
  textFormCodigo = "Modificar Cuenta";
  // Autentificacion
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Catalogo Terceros", route: "/pucCuentas" },
    { name: "Propiedad Horizontal", route: "/pucCuentas/puc-cuentas-index" },
  ];
  breadcrumbRouteActive = "Actualizar";
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
    private route: ActivatedRoute,
    public globalAppService: GlobalAppService,
  ) {
    this.paramiD = this.route.snapshot.paramMap.get("id"); // Se recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
  }

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
    console.log(data);
    this.sweetAlertService.sweetLoading();
    data["id"] = this.paramOID;
    //data["idRolModuloOperacion"] = data["idRolModuloOperacion"].id;
    /**
     * Cargando true
     */
    let versionApi = environment.versionApiDefault;

    this.restService
      .restPut(
        versionApi + "phTercero/ph-tercero/update",
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
              "/pucCuentas/ph-terceros-index",
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
                this.router.navigate(["/pucCuentas/ph-terceros-index"]);
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
              "/pucCuentas/ph-terceros-index",
            )
            .then((res) => {});
        },
      );
  }
}

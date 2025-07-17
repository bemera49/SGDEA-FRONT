/**

 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EncryptService } from "src/app/services/encrypt.service";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-doc-manag-folder-create",
  templateUrl: "./doc-manag-folder-create.component.html",
  styleUrls: ["./doc-manag-folder-create.component.css"],
})
export class DocManagFolderCreateComponent implements OnInit {
  // Version api
  versionApi = environment.versionApiDefault;
  // Autentificacion
  authorization: string;
  statusBreadcrumbOn = false; // Muestra los BreadcrumbOn
  // Nombre del formulario
  textForm = "Nuevo expediente"; // i18n
  // Redired path
  redirectionPath = "/documentManagement/folder-index/false";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Gestión documental", route: "/documentManagement" },
    { name: "Expedientes", route: this.redirectionPath },
  ];
  breadcrumbRouteActive = "Crear"; // i18n
  // Variables de servicios
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  resSerlistRadicados: any;
  resSerlistRadicadosErr: any;

  paramRadiSelected: string;
  cardRadiStatus: boolean = false;
  dataRadicados: any = [];

  constructor(
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public lhs: LocalStorageService,
    private router: Router,
    public route: ActivatedRoute,
    private encryptService: EncryptService
  ) { }

  ngOnInit() {
    // Hace el llamado del token
    this.getTokenLS();
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      this.decryptParams();
    });
  }

  /** Función que desencripta los parámetros que llegan por GET */
  decryptParams() {
    this.paramRadiSelected = this.route.snapshot.paramMap.get("radiSelected");
    if (this.paramRadiSelected != null) {
      this.encryptService.decryptAES(this.paramRadiSelected, this.authorization, true).then((res) => {
        let data = res;
        if (data != null && typeof data[0] != "undefined") {
          this.searchRadicados(data);
        }
      });
    }
  }

  // Consultar Radicados
  searchRadicados(data) {
    this.sweetAlertService.sweetLoading();
    let params = {
      radicados: data,
    };

    this.restService
      .restGetParams(this.versionApi + "radicacion/radicados/list-radicados", params, this.authorization)
      .subscribe(
        (data) => {
          this.resSerlistRadicados = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistRadicados).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              if (this.resSerlistRadicados.count > 0) {
                this.dataRadicados = this.resSerlistRadicados.data;
                this.cardRadiStatus = true;
              }
              this.sweetAlertService.sweetClose();
            }
          });
        },
        (err) => {
          this.resSerlistRadicadosErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistRadicadosErr).then((res) => { });
        }
      );
  }

  submitFormReceive(data) {
    let dataSubmit = {
      data: data,
      dataRadicados: this.dataRadicados,
    };

    console.log('SUBMIT', dataSubmit);
    this.sweetAlertService.sweetLoading();
    /**
     * Cargando true
     */
    /** Se reasigna el valor para enviar la estructura correcta al backend */

    this.restService
      .restPost(this.versionApi + "gestionDocumental/expedientes/create", dataSubmit, this.authorization)
      .subscribe(
        (res) => {
          this.resSerFormSubmit = res;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerFormSubmit, false).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              // Muestra el mensaje
              this.sweetAlertService.showNotification("success", this.resSerFormSubmit.message);
              // Redirecciona a la pagina principal
              this.router.navigate([this.redirectionPath]);
            }
          });
        },
        (err) => {
          this.resSerFormSubmitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerFormSubmitErr, false).then((res) => {});
        }
      );
  }
}

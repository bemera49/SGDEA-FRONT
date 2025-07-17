/**

 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConvertParamsBase64Helper } from "src/app/helpers/convert-params-base64.helper";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-doc-manag-folder-update",
  templateUrl: "./doc-manag-folder-update.component.html",
  styleUrls: ["./doc-manag-folder-update.component.css"],
})
export class DocManagFolderUpdateComponent implements OnInit {
  // Autorizacion de localstorage
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  // Nombre del formulario
  textForm = "Actualizar expediente"; // i18n
  // Redired path
  redirectionPath = "/documentManagement/folder-index/false";
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { name: "Gestión documental", route: "/documentManagement" },
    { name: "Expedientes", route: this.redirectionPath },
  ];
  breadcrumbRouteActive = "Actualizar"; // i18n

  // Version api
  versionApi = environment.versionApiDefault;
  /**
   * Configuraciones para los servicios
   */
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  metadatos = [];


  constructor(
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public lhs: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public globalAppService: GlobalAppService
  ) {
    // Se recibe el id
    this.paramiD = this.route.snapshot.paramMap.get("id");
    // Se pasa al html como componete para que reciba el ID
    this.paramOID = ConvertParamsBase64Helper(this.paramiD);
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

  metaDataReactive(meta): void {
    this.metadatos = meta
  }

  submitFormReceive(data) {

    /** Se asigna el valor del id que se está actualizando */
    data["id"] = this.paramOID;
    // Cargando true
    this.sweetAlertService.sweetLoading();

    const updateData = {
      id: this.paramOID,
      estadoGdExpediente: data.estadoGdExpediente,
      existeFisicamenteGdExpediente: data.existeFisicamenteGdExpediente,
      idGdTrdSerie: data.idGdTrdSerie,
      idGdTrdSubserie: data.idGdTrdSubserie,
      nombreGdExpediente: data.nombreGdExpediente,
      ubicacionGdExpediente: data.ubicacionGdExpediente,
      user: data.user
    }

    if (this.metadatos.length > 0) {
      this.metadatos.forEach(item => {
        console.log('item')
        updateData[`metadata_${item.id}`] = data[`metadata_${item.id}`];

      })
    }

    
    this.restService
      .restPut(this.versionApi + "gestionDocumental/expedientes/update", updateData, this.authorization)
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
              // Cargando false
            //  this.sweetAlertService.sweetClose();
            }
          });
        },
        (err) => {
          this.resSerFormSubmitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerFormSubmitErr, false).then((res) => { });
        }
      );
  }
}

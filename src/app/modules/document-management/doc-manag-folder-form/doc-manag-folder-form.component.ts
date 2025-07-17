/**

 */

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { environment } from "src/environments/environment";

import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReplaySubject, Subject } from "rxjs";

export interface ListaBusq {
  id: string;
  val: string;
}
@Component({
  selector: "app-doc-manag-folder-form",
  templateUrl: "./doc-manag-folder-form.component.html",
  styleUrls: ["./doc-manag-folder-form.component.css"],
})
export class DocManagFolderFormComponent implements OnInit {
  @Output() public submitFormEmit = new EventEmitter<any>();
  @Output() public metaData = new EventEmitter<any>();
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Nombre de tarjetas del formulario
  @Input() textForm = "Formulario principal expediente";
  // Iconos del formulario
  @Input() initCardHeaderIcon = "fact_check";
  @Input() initCardHeaderIconDatos = "library_books";
  /** BreadcrumbOn  */
  @Input() statusBreadcrumbOn: boolean = true; // Muestra los BreadcrumbOn
  @Input() breadcrumbOn = [{ name: "Gestión documental", route: "/documentManagement" }];
  @Input() breadcrumbRouteActive = "Expedientes";
  @Input() cardRadiStatus: boolean = false;
  @Input() dataRadicados: any = [];
  // Valida typo
  validTextType: boolean = false;
  metaDataText = 'Metadatos'
  menuButtons = [

    { icon: "save", title: "Guardar", action: "save", data: "" },
    { icon: "close", title: "Cancelar", action: "close", data: "" },


  ]

  url = "";
  params = "";
  // Variable del formulario
  moduleForm: UntypedFormGroup;
  resResolveResponse: any;
  resResolveResponseErr: any;
  resSerlistSeries: any;
  resSerlistSeriesErr: any;
  resSerlistSubseries: any;
  resSerlistSubseriesErr: any;
  resSerlistDependencia: any;
  resSerlistDependenciaErr: any;
  resSerlistUser: any;
  resSerlistUserErr: any;
  metadatos: any;


  // Autentificacion
  authorization: string;
  // Version api
  versionApi = environment.versionApiDefault;
  // Ruta a redirigir
  redirectionPath = "/setting/folder-index";
  // Variables de consumo de servicios
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  // Variables para el boton flotante
  iconMenu: string = "save";

  listSeries: any;
  listSubseries: any;
  listDependencias: any;
  listUsuarios: any;
  gdExpedientesDependencias: any;


  public minDate: Date;
  public maxDate: Date;


  dependencia: ListaBusq[] = [];
  series: ListaBusq[] = [];
  subSeries: ListaBusq[] = [];
  /** slide-toggle  */
  color: ThemePalette = "primary";
  msgExisteFisicamente: string = "No";

  /** lists filtered + namelist by search keyword */
  filteredlistSeries: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistSubseries: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistDependencias: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredgdExpedientesDependencias: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistUsuarios: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    public lhs: LocalStorageService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public sweetAlertService: SweetAlertService,
    private rest: RestService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    /**
     * Configuración del formulario
     */
    this.moduleForm = this.formBuilder.group({
      user: new UntypedFormControl(""),
      idUser: new UntypedFormControl(0),
      estadoGdExpediente: new UntypedFormControl("", Validators.compose([Validators.required])),
      numeroGdExpediente: new UntypedFormControl(""),
      fechaProcesoGdExpediente: new UntypedFormControl(""),
      nombreGdExpediente: new UntypedFormControl("", Validators.compose([Validators.required])),
      existeFisicamenteGdExpediente: new UntypedFormControl(false, Validators.compose([Validators.required])),
      idGdTrdSerie: new UntypedFormControl("", Validators.compose([Validators.required])),
      idGdTrdSubserie: new UntypedFormControl(""),
      idGdTrdDependencia: new UntypedFormControl("", Validators.compose([Validators.required])),
      creacionGdExpediente: new UntypedFormControl("", Validators.compose([Validators.required])),
      fechaCierre: new UntypedFormControl(""),
      fechaFin: new UntypedFormControl("", Validators.compose([Validators.required])),
      fechaInicio: new UntypedFormControl("", Validators.compose([Validators.required])),
      ubicacionGdExpediente: new UntypedFormControl("", Validators.compose([Validators.required]))

    });
    // Asignación de fechas por defecto
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.metadatos = [];
  }

  ngOnInit() {
    // Hace el llamado del token
    this.getTokenLS();
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;

      if (this.paramOID !== 0) {
        this.onSearchId(this.paramOID, this.authorization);
        this.validateInputsDisabled();
        this.getListSeries();

        /* this.getSubSerie(this.moduleForm.get('idGdTrdSerie').value); */
        this.url = "/documentManagement/folder-view";
        this.params = this.route.snapshot.paramMap.get("id");
      } else {
        /** Llamado de los servicios para las listas */
        /*         this.getListSeries();
                this.getListDependencia(); */
        this.cargarFecha();
        this.dataUser();
        this.inputsDisabledCreate()
        this.getListDependenciaAll();
        this.url = "/documentManagement/folder-index";
        this.params = "false"

      }
    });
  }

  dataUser(): void {
    this.moduleForm.get("user").setValue(this.rest.getUserData().username);
    this.moduleForm.get("idUser").setValue(this.rest.getUserData().idDataCliente);
  }


  formatearFecha(date) {

    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript son base 0
      const day = dateObj.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    return "";

  }

  cargarFecha(): void {
    const date = new Date();
    this.moduleForm.get("creacionGdExpediente").setValue(date);
    this.moduleForm.get("fechaProcesoGdExpediente").setValue(this.formatearFecha(date));

  }

  inputsDisabledCreate(): void {

    this.moduleForm.get("fechaInicio").disable();
    this.moduleForm.get("creacionGdExpediente").disable();
    this.moduleForm.get("numeroGdExpediente").disable();
    this.moduleForm.get("user").disable();
    this.moduleForm.get("fechaCierre").disable();
    this.moduleForm.get("fechaFin").disable();

  }

  /** Campos a desactivar cuando es una actualización */
  validateInputsDisabled() {
    this.moduleForm.controls["user"].disable();
    this.moduleForm.controls["idGdTrdDependencia"].disable();
    this.moduleForm.controls["numeroGdExpediente"].disable();
    this.moduleForm.controls["fechaFin"].disable();
    this.moduleForm.controls["fechaCierre"].disable();
    this.moduleForm.controls["fechaProcesoGdExpediente"].disable();
    this.moduleForm.controls["creacionGdExpediente"].disable();
    this.moduleForm.controls["fechaInicio"].disable();


  }


  submitForm() {
    if (this.moduleForm.valid) {
      this.metaData.emit(this.metadatos);
      this.submitFormEmit.emit(this.moduleForm.value);
    } else {
      this.sweetAlertService.sweetInfo("Por favor diligencie los campos obligatorios", "");
    }
  }

  parseDate(dateCreate: string): Date {

    const [anio, mes, dia, hora, minutos, segundos] = dateCreate.split(/[- :]/).map(Number);

    // Crea un objeto Date
    const date = new Date(anio, mes - 1, dia, hora, minutos, segundos);

    return date;
  }

  /*
   * param - id del rol a buscar
   * param - authori variable de la autorizacion del localstorage
   */
  onSearchId(id, authori) {
    // loading Active
    this.sweetAlertService.sweetLoading();
    const params = {
      id: this.paramOID,
    };

    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/index-one", params, authori)
      .subscribe(
        (res) => {
          this.resSerFormSubmit = res;

          // console.log( this.resSerFormSubmit );
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerFormSubmit, true, this.redirectionPath).then((res) => {
            let resResolveResponse = res;
            if (resResolveResponse == true) {
              if (this.resSerFormSubmit.data) {

                for (let name in this.resSerFormSubmit.data) {
                  if (this.moduleForm.controls[name]) {
                    if (name !== 'metadatos') {
                      if (name === 'creacionGdExpediente') {
                        this.moduleForm.get(name).setValue(this.parseDate(this.resSerFormSubmit.data['creacionGdExpediente']));
                      }

                      this.moduleForm.get(name).setValue(this.resSerFormSubmit.data[name]);
                    }
                  }
                }
                this.getListSeriesId(this.resSerFormSubmit.data['idGdTrdDependencia']);
                this.getSubSerie(this.resSerFormSubmit.data['idGdTrdSerie'])

                if (this.resSerFormSubmit.data['metadatos'] && this.resSerFormSubmit.data['metadatos'].length > 0) {
                  const metaData = this.resSerFormSubmit.data['metadatos'].map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    etiqueta: "",
                    descripcion: " ",
                    serie_id: 0,
                    tipo: item.tipo,
                    requerido: 1,
                    created_at: null,
                    updated_at: null,
                    deleted_at: null,
                    valor: item.valor
                  }));
                  this.cargarMetadatos(metaData);
                  this.cargarValoresMetaDatos(metaData);

                }

              }

              /** Procesar listados que llegan en el mismo servicio */
              /* if (typeof this.resSerFormSubmit.listService != "undefined") {
                this.listSeries = this.resSerFormSubmit.listService.listSeries;
                this.filteredlistSeries.next(this.listSeries.slice());

                this.listSubseries = this.resSerFormSubmit.listService.listSubseries;
                this.filteredlistSubseries.next(this.listSubseries.slice());

                this.listDependencias = this.resSerFormSubmit.listService.listDependencias;
                this.filteredlistDependencias.next(this.listDependencias.slice());

                this.listUsuarios = this.resSerFormSubmit.listService.listUsuarios;
                this.filteredlistUsuarios.next(this.listUsuarios.slice());
              } */
              /** Procesar listados que llegan en el mismo servicio */

              /*  const paramsDepeAll = {
                 idGdTrdDependencia: this.resSerFormSubmit.data.idGdTrdDependencia,
               };
  */
              this.getListDependencia();
              /*      this.getListDependenciaAll("gestionDocumental/expedientes/dependencias-list-all-update", paramsDepeAll);
      */
              this.sweetAlertService.sweetClose();
            }
          });
        },
        (err) => {
          this.resSerFormSubmitErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerFormSubmitErr, true, this.redirectionPath)
            .then((res) => { });
        }
      );
  }

  /**
   * Cuando se hace clic en el botón se envia el formulario
   * @param event
   */
  menuPrimaryReceiveData(event) {

    switch (event.action) {
      case "save":
        let buttonSubmit = <HTMLFormElement>document.getElementById("sendForm");
        buttonSubmit.click();
        break;
      case "close":
        this.router.navigate([this.url, this.params]);

        break;
    }
  }


  getListSeriesId(event): void {

    let data = {
      idGdTrdDependencia: event
    }

    this.restService.restGetParams(this.versionApi
      + "gestionDocumental/expedientes/series-list-by-dependencia", data, this.authorization).subscribe(
        (serie) => {
          /* this.series = data; */
          this.globalAppService.resolveResponse(serie).then((res) => {
            if (res && serie.status === 200) {
              this.series = serie.data;
            }
          });

          if (serie.status === 322) {
            this.series = [];
          }
        },
        (err) => {

          this.resSerlistSeriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistSeriesErr).then((res) => { });
        }
      )

  }


  // Llama la lista de las servicios
  getListSeries() {
    let params = {

    }
    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/series-list-by-dependencia", params, this.authorization)
      .subscribe(
        (data) => {
          this.resSerlistSeries = data;

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistSeries).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.series = this.resSerlistSeries.data;
              // load the list initial

            }
          });
        },
        (err) => {
          this.resSerlistSeriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistSeriesErr).then((res) => { });
        }
      );
  }


  getMetaData(id: number): void {

    let params = {
      idGdTrdSerie: this.moduleForm.get('idGdTrdSerie').value,
      idGdTrdSubserie: id
    };

    console.log('params de los metadatos', params)

    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/serie-subserie-metadata", params, this.authorization)
      .subscribe(
        (meta) => {
          /*           this.resSerlistSubseries = data; */
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(meta).then((res) => {
            if (res) {
              console.log('data', meta);
              if (meta.status === 200 && meta.metadata.length > 0) {
                this.cargarMetadatos(meta.metadata);
              }

              if (meta.status === 200 && meta.metadata.length === 0) {
                this.eliminarMetaDatos(this.metadatos);
              }
            }
          });

        },
        (err) => {

          this.resSerlistSubseriesErr = err;
          this.metadatos = [];
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistSubseriesErr).then((res) => { });
        }
      );
  }

  setIdSubSeries(event): void {

    this.getMetaData(event);
  }

  getSubSerie(event): void {

    let params = {
      idGdTrdSerie: event,
      idGdTrdDependencia: this.moduleForm.get('idGdTrdDependencia').value
    };

    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/subseries-list-by-serie", params, this.authorization)
      .subscribe(
        (subSerie) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(subSerie).then((res) => {
            if (res) {

              if (subSerie.status === 200) {
                this.subSeries = subSerie.data
              }
            }
          });
        },
        (err) => {
          this.resSerlistSubseriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistSubseriesErr).then((res) => { });
        }
      );
  }

  // Llama la lista de las servicios
  getListSuberies(event) {
    let data = {

      idGdTrdSerie: event,
    };


    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/subseries-list-by-serie", data, this.authorization)
      .subscribe(
        (data) => {
          this.resSerlistSubseries = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistSubseries).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {

              this.listSubseries = this.resSerlistSubseries.data;
              if (typeof this.resSerlistSubseries.metadata !== 'undefined')
                this.cargarMetadatos(this.resSerlistSubseries.metadata);
              // load the list initial
              this.filteredlistSubseries.next(this.listSubseries.slice());
            }
          });
        },
        (err) => {
          this.resSerlistSubseriesErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistSubseriesErr).then((res) => { });
        }
      );
  }

  // Llama la lista de las Dependencias
  getListDependencia() {
    this.restService
      .restGet(this.versionApi + "gestionDocumental/trd-dependencias/dependencias", this.authorization)
      .subscribe(
        (data) => {
          this.resSerlistDependencia = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistDependencia).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.dependencia = data.dataDependencias

              this.listDependencias = this.resSerlistDependencia.dataDependencias;
              // load the list initial
              this.filteredlistDependencias.next(this.listDependencias.slice());
            }
          });
        },
        (err) => {
          this.resSerlistDependenciaErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistDependenciaErr).then((res) => { });
        }
      );
  }



  getListDependenciaAll(route = "gestionDocumental/trd-dependencias/dependencias-expedientes", params = {}) {
    this.restService.restGetParams(`${this.versionApi}${route}`, params, this.authorization).subscribe(
      (responseApi) => {
        this.globalAppService.resolveResponse(responseApi).then((responseGlobal) => {
          if (responseGlobal == true) {
            this.gdExpedientesDependencias = responseApi.data;
            this.dependencia = responseApi.dataDependencias

          }
        });
      },
      (err) => this.globalAppService.resolveResponseError(err)
    );
  }

  // Llama la lista de las Funcionarios
  getListFuncionarios(value) {
    this.restService
      .restGet(this.versionApi + "gestionDocumental/expedientes/funcionarios-list", this.authorization)
      .subscribe(
        (data) => {
          this.resSerlistUser = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistUser).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.listUsuarios = this.resSerlistUser.data;
              // load the list initial
              this.filteredlistUsuarios.next(this.listUsuarios.slice());
            }
          });
        },
        (err) => {
          this.resSerlistUserErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistUserErr).then((res) => { });
        }
      );
  }

  /**
   * Recibe el nombre de la lista para realizar la busqueda segun el filtro
   * @param nomList nombre lista
   */
  filterBanks(nomList) {
    if (!this[nomList]) {
      return;
    }
    // get the search keyword
    let search = this.moduleForm.controls[nomList + "Filter"].value;
    if (!search) {
      this["filtered" + nomList].next(this[nomList].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this["filtered" + nomList].next(
      this[nomList].filter((listOption) => listOption.val.toLowerCase().indexOf(search) > -1)
    );
  }

  MatSlideToggleChangeMulti(event) {
    /** Evaluar si el imput esta checkeado como true o false */
    if (event.checked) {
      this.msgExisteFisicamente = "Si";
    } else {
      this.msgExisteFisicamente = "No";
    }
    /** Fin Evaluar si el imput esta checkeado como true o false */
  }


  cargarMetadatos(metadatos) {
    this.metadatos = metadatos;
    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;
      this.moduleForm.addControl(
        controlName,
        new UntypedFormControl('')
      );
    }
  }

  cargarValoresMetaDatos(metadatos): void {
    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;
      this.moduleForm.get(controlName)?.setValue(metadata.valor);
    }
  }

  eliminarMetaDatos(metadatos): void {
    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;
      this.moduleForm.removeControl(controlName);
    }
    this.metadatos = [];
  }
}
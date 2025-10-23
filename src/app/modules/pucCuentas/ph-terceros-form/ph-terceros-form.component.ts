import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from "@angular/forms";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { SweetAlertService } from "../../../services/sweet-alert.service";
import { environment } from "src/environments/environment";
import { RestService } from "../../../services/rest.service";
import { GlobalAppService } from "../../../services/global-app.service";

import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: "app-ph-terceros-form",
  templateUrl: "./ph-terceros-form.component.html",
  styleUrls: ["./ph-terceros-form.component.css"],
})
export class PhTercerosFormComponent implements OnInit {
  @Output() public submitFormEmit = new EventEmitter<any>();
  // Autentificacion
  authorization: string;
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Nombre del boton
  @Input() textButtonForm = "Enviar";
  // Nombre del formulario
  @Input() textFormTercero = "Formulario principal de crear tercero";
  // Valida nombre rol
  validTextType: boolean = false;
  // Icono del formulario
  @Input() initCardHeaderIcon = "contacts";
  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    { name: "Propiedad Horizontal", route: "/phTercero/ph-terceros-index" },
  ];
  @Input() breadcrumbRouteActive = "Catalogo de terceros";

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  messageProspecto = "No";
  messageEmpleado = "No";
  messageAsociado = "No";
  messageVendedor = "No";
  messageProveedor = "No";
  messageCliente = "No";
  messageGranContribuyente = "No";
  messageDeclaranteRenta = "No";
  messageAgenteRetenedor = "No";
  messageAutorretenedor = "No";
  messageAgenteRetenedorICA = "No";
  messageAplicarReteIva = "No";
  messageNoAplicarSobretasa = "No";
  messageNoGeneraIva = "No";
  messageNoGeneralAdValorem = "No";
  messageNoAplicaImpuestoAutoRenta = "No";
  messageAplicarRetencionesIva = "No";
  messageAplicarRetencionIca = "No";

  /** list of banks filtered by
  /**
   * Configuraciones para los servicios
   */
  resSerFormSubmit: any;
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;
  responseServiceListModule: any;
  responseServiceListModuleErr: any;
  listModuleMenu: any;
  idNivelGeografico2: any;
  idNivelGeografico3: any;
  idNivelGeografico1: any;

  //listas generales
  listTipoPersona: any;
  listTipoIdentificacion: any;
  listNivelGeografico1: any;
  listNivelGeografico2: any;
  listNivelGeografico3: any;
  listEstadoCivil: any;

  listGenero = [
    { id: "M", val: "Masculino" },
    { id: "F", val: "Femenino" },
    { id: "O", val: "Otro" },
  ];

  resServicesNivelGeografico2: any;
  resServicesNivelGeografico2Err: any;
  resServicesNivelGeografico3: any;
  resServicesNivelGeografico3Err: any;

  //informacion tributaria
  filteredlistActividadPrincipal: any;
  filteredlistActividadSecundaria: any;
  listRegimenTributario: any;
  listImpuestoVentas: any;
  listTarifaICA: any;

  filteredlistTipoPersona: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistTipoIdentificacion: ReplaySubject<ListaBusq[]> =
    new ReplaySubject<ListaBusq[]>(1);

  filteredlistNivelGeografico1: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistNivelGeografico2: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredlistNivelGeografico3: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredEstadoCivil: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredRegimenTributario: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  filteredImpuestoVentas: ReplaySubject<ListaBusq[]> = new ReplaySubject<
    ListaBusq[]
  >(1);

  moduleForm: UntypedFormGroup;
  /** Boton flotante */
  iconMenu: string = "save";

  constructor(
    private formBuilder: UntypedFormBuilder,
    public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
  ) {}

  ngOnInit() {
    window.scroll(0, 0); // Posicionando scroll al inicio
    // Hace el llamado del token
    this.getTokenLS();

    /**
     * Configuración del formulario para el login
     */
    this.moduleForm = this.formBuilder.group({
      nombre: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      nombreComercial: new UntypedFormControl("", Validators.compose([])),
      genero: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idNivelGeografico1: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idNivelGeografico2: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idNivelGeografico3: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      tipoPersona: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idTipoIdentificacion: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      numeroIdentificacion: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      //idPhCopopropiedad: new UntypedFormControl("", Validators.compose([])),
      barrio: new UntypedFormControl("", Validators.compose([])),
      direccion1: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      direccion2: new UntypedFormControl("", Validators.compose([])),
      telefono1: new UntypedFormControl("", Validators.compose([])),
      telefono2: new UntypedFormControl("", Validators.compose([])),
      celular: new UntypedFormControl("", Validators.compose([])),
      codigoPostal: new UntypedFormControl("", Validators.compose([])),
      email: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      idEstadoCivil: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      fechaNacimiento: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),

      cliente: new UntypedFormControl(false),
      proveedor: new UntypedFormControl(false),
      vendedor: new UntypedFormControl(false),
      asosiado: new UntypedFormControl(false),
      empleado: new UntypedFormControl(false),
      prospecto: new UntypedFormControl(false),

      representanteLegal: new UntypedFormControl("", Validators.compose([])),
      observaciones: new UntypedFormControl("", Validators.compose([])),
      listTipoPersonaFilter: new UntypedFormControl("", Validators.compose([])),
      listNivelGeografico1Filter: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      listNivelGeografico2Filter: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      listNivelGeografico3Filter: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      idPhRegimenTributario: new UntypedFormControl("", Validators.compose([])),
      idPhImpuestoVentas: new UntypedFormControl("", Validators.compose([])),
      idTarifaICA: new UntypedFormControl("", Validators.compose([])),
      idActividadPrincipal: new UntypedFormControl("", Validators.compose([])),
      listActividadPrincipalFilter: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      idActividadSecundaria: new UntypedFormControl("", Validators.compose([])),
      listActividadSecundariaFilter: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      granContribuyente: new UntypedFormControl("", Validators.compose([])),
      esDeclaranteRenta: new UntypedFormControl("", Validators.compose([])),
      esAgenteRetenedor: new UntypedFormControl("", Validators.compose([])),
      esAutorretenedor: new UntypedFormControl("", Validators.compose([])),
      noAplicaImpuestoAutoRenta: new UntypedFormControl(
        "",
        Validators.compose([]),
      ),
      esAgenteRetenedorICA: new UntypedFormControl("", Validators.compose([])),
      aplicarReteIva: new UntypedFormControl("", Validators.compose([])),
      noAplicarSobretasa: new UntypedFormControl("", Validators.compose([])),
      noGeneraIva: new UntypedFormControl("", Validators.compose([])),
      noGeneralAdValorem: new UntypedFormControl("", Validators.compose([])),
      aplicarRetencionesIva: new UntypedFormControl("", Validators.compose([])),
      aplicarRetencionIca: new UntypedFormControl("", Validators.compose([])),
    });

    // Tipo de persona
    this.moduleForm.controls["listTipoPersonaFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTipoPersona");
      });
    // Nivel geografico 1 - Pais
    this.moduleForm.controls["listNivelGeografico1Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico1");
      });
    // Nivel geografico 2 - Departamento
    this.moduleForm.controls["listNivelGeografico2Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico2");
      });
    // Nivel geografico 3 - Municipio
    this.moduleForm.controls["listNivelGeografico3Filter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listNivelGeografico3");
      });
  }

  ValidateTelefonoCelular(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("celular")?.setValue(sanitizedValue);
  }

  ValidateTelefono1(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("telefono1")?.setValue(sanitizedValue);
  }

  ValidateTelefono2(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("telefono2")?.setValue(sanitizedValue);
  }

  verificarCorreo(event: any) {
    const email = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
      this.validTextType = true;
    } else {
      this.validTextType = false;
    }
  }

  ValidateNumeroIdentificacion(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, "");
    input.value = sanitizedValue;
    this.moduleForm.get("numeroIdentificacion")?.setValue(sanitizedValue);
  }

  /** Realiza el filtro de busqueda */
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
      this[nomList].filter(
        (listOption) => listOption.val.toLowerCase().indexOf(search) > -1,
      ),
    );
  }

  getListmodules(authori) {
    this.sweetAlertService.sweetLoading();
    let versionApi = environment.versionApiDefault;

    this.restService
      .restGet(versionApi + "phTercero/ph-tercero/index", authori)
      .subscribe(
        (res) => {
          this.responseServiceListModule = res;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.responseServiceListModule,
              true,
              "/phTercero/ph-terceros-index",
            )
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                if (this.responseServiceListModule.data) {
                  this.listModuleMenu = this.responseServiceListModule.data;
                  this.sweetAlertService.sweetClose();
                  if (this.paramOID != 0) {
                    this.onSearchId(this.paramOID, this.authorization);
                  }
                }
              }
            });
        },
        (err) => {
          this.responseServiceListModuleErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(
              this.responseServiceListModuleErr,
              true,
              "/pucCuentas/ph-terceros-index",
            )
            .then((res) => {});
        },
      );
  }

  /*
   * param - id del rol a buscar
   * param - authori variable de la autorizacion del localstorage
   */
  onSearchId(id, authori) {
    let versionApi = environment.versionApiDefault;
    let params = {
      id: this.paramOID,
    };

    this.restService
      .restGetParams(
        versionApi + "phTercero/ph-tercero/index-one",
        params,
        authori,
      )
      .subscribe(
        (res) => {
          this.responseServiceFormSubmit = res;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.responseServiceFormSubmit,
              true,
              "/pucCuenta/ph-terceros-index",
            )
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                if (this.responseServiceFormSubmit.data) {
                  for (let name in this.responseServiceFormSubmit.data) {
                    if (this.moduleForm.controls[name]) {
                      this.moduleForm.controls[name].setValue(
                        this.responseServiceFormSubmit.data[name],
                      );
                    }
                    if (name == "id") {
                      let toSelect = this.listModuleMenu.find(
                        (c) =>
                          c.id == this.responseServiceFormSubmit.data[name],
                      );
                      this.moduleForm.controls[name]?.setValue(toSelect);
                    }

                    // Busca nivel geografico 2 y 3 en el primer registro
                    if (name == "nivelGeografico1") {
                      this.nivelGeografico2(
                        this.responseServiceFormSubmit.data[name],
                      );
                    }
                    /**
                    if (name == "idNivelGeografico2") {
                      this.nivelGeografico3(this.resSerFormSubmit.data[name]);
                    }
                    */
                  }
                }
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

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      this.getListmodules(this.authorization);
      this.getListGeneral(this.authorization);
    });
  }

  submitTercero() {
    console.log(this.moduleForm.value);
    if (this.moduleForm.valid) {
      this.submitFormEmit.emit(this.moduleForm.value);
    } else {
      this.sweetAlertService.sweetInfo(
        "Algo está mal o hay campos obligatorios",
        "",
      );
    }
  }

  /**
   *
   * @param event
   * Cuando se hace clic en el botón se envia el formulario
   */
  menuPrimaryReceiveData(event) {
    var buttonSubmit = <HTMLFormElement>document.getElementById("sendForm");
    buttonSubmit.click();
  }

  // Funciones para manejar los cambios de estado

  MatSlideToggleGranContribuyente(event) {
    if (event.checked) {
      this.messageGranContribuyente = "Si";
    } else {
      this.messageGranContribuyente = "No";
    }
  }

  MatSlideToggleDeclaranteRenta(event) {
    if (event.checked) {
      this.messageDeclaranteRenta = "Si";
    } else {
      this.messageDeclaranteRenta = "No";
    }
  }

  MatSlideToggleAgenteRetenedor(event) {
    if (event.checked) {
      this.messageAgenteRetenedor = "Si";
    } else {
      this.messageAgenteRetenedor = "No";
    }
  }

  MatSlideToggleAutorretenedor(event) {
    if (event.checked) {
      this.messageAutorretenedor = "Si";
    } else {
      this.messageAutorretenedor = "No";
    }
  }

  MatSlideToggleAgenteRetenedorICA(event) {
    if (event.checked) {
      this.messageAgenteRetenedorICA = "Si";
    } else {
      this.messageAgenteRetenedorICA = "No";
    }
  }

  MatSlideToggleAplicarReteIva(event) {
    if (event.checked) {
      this.messageAplicarReteIva = "Si";
    } else {
      this.messageAplicarReteIva = "No";
    }
  }

  MatSlideToggleNoAplicarSobretasa(event) {
    if (event.checked) {
      this.messageNoAplicarSobretasa = "Si";
    } else {
      this.messageNoAplicarSobretasa = "No";
    }
  }

  MatSlideToggleNoGeneraIva(event) {
    if (event.checked) {
      this.messageNoGeneraIva = "Si";
    } else {
      this.messageNoGeneraIva = "No";
    }
  }

  MatSlideToggleNoGeneralAdValorem(event) {
    if (event.checked) {
      this.messageNoGeneralAdValorem = "Si";
    } else {
      this.messageNoGeneralAdValorem = "No";
    }
  }

  MatSlideToggleNoAplicaImpuestoAutoRenta(event) {
    if (event.checked) {
      this.messageNoAplicaImpuestoAutoRenta = "Si";
    } else {
      this.messageNoAplicaImpuestoAutoRenta = "No";
    }
  }

  MatSlideToggleAplicarRetencionesIva(event) {
    if (event.checked) {
      this.messageAplicarRetencionesIva = "Si";
    } else {
      this.messageAplicarRetencionesIva = "No";
    }
  }

  MatSlideToggleAplicarRetencionIca(event) {
    if (event.checked) {
      this.messageAplicarRetencionIca = "Si";
    } else {
      this.messageAplicarRetencionIca = "No";
    }
  }

  MatSlideToggleCliente(event) {
    if (event.checked) {
      this.messageCliente = "Si";
    } else {
      this.messageCliente = "No";
    }
  }

  //MatSlideToggles
  MatSlideToggleProveedor(event) {
    if (event.checked) {
      this.messageProveedor = "Si";
    } else {
      this.messageProveedor = "No";
    }
  }

  MatSlideToggleVendedor(event) {
    if (event.checked) {
      this.messageVendedor = "Si";
    } else {
      this.messageVendedor = "No";
    }
  }

  MatSlideToggleAsociado(event) {
    if (event.checked) {
      this.messageAsociado = "Si";
    } else {
      this.messageAsociado = "No";
    }
  }

  MatSlideToggleEmpleado(event) {
    if (event.checked) {
      this.messageEmpleado = "Si";
    } else {
      this.messageEmpleado = "No";
    }
  }

  MatSlideToggleProspecto(event) {
    if (event.checked) {
      this.messageProspecto = "Si";
    } else {
      this.messageProspecto = "No";
    }
  }

  async getListGeneral(authori) {
    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restGetNotDecrypt(
        environment.versionApiDefault +
          "phTercero/ph-tercero/index-general-filing-lists-not-encrypt",
        authori,
      )
      .subscribe(
        (data) => {
          const responseService: any = data;
          this.globalAppService
            .resolveResponse(responseService)
            .then((dataGlobal) => {
              const responseGlobal = dataGlobal;

              if (responseService.tipoPersonal) {
                this.listTipoPersona = responseService.tipoPersonal;
                // load the list initial
                this.filteredlistTipoPersona.next(this.listTipoPersona.slice());
              }

              if (responseService.tiposIdentificacion) {
                this.listTipoIdentificacion =
                  responseService.tiposIdentificacion;
                // load the list initial
                this.filteredlistTipoIdentificacion.next(
                  this.listTipoIdentificacion.slice(),
                );
              }

              if (responseService.dataNivelGeografico1) {
                this.listNivelGeografico1 =
                  responseService.dataNivelGeografico1;
                // load the list initial
                this.filteredlistNivelGeografico1.next(
                  this.listNivelGeografico1.slice(),
                );
              }

              if (responseService.dataNivelGeografico2) {
                this.listNivelGeografico2 =
                  responseService.dataNivelGeografico2;
                this.filteredlistNivelGeografico2.next(
                  this.listNivelGeografico2.slice(),
                );
              }

              if (responseService.dataNivelGeografico3) {
                this.listNivelGeografico3 =
                  responseService.dataNivelGeografico3;
                this.filteredlistNivelGeografico3.next(
                  this.listNivelGeografico3.slice(),
                );
              }

              if (responseService.estadosCiviles) {
                this.listEstadoCivil = responseService.estadosCiviles;
                this.filteredEstadoCivil.next(this.listEstadoCivil.slice());
              }

              if (responseService.regimenTributario) {
                this.listRegimenTributario = responseService.regimenTributario;
                this.filteredRegimenTributario.next(
                  this.listRegimenTributario.slice(),
                );
              }

              if (responseService.impuestoVentas) {
                this.listImpuestoVentas = responseService.impuestoVentas;
                this.filteredImpuestoVentas.next(
                  this.listImpuestoVentas.slice(),
                );
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

  /**
   * Funcion que consulta el nivel geografico segun el departamento muestra los municipios
   * @param nivel1 nivel geografico 1
   */
  nivelGeografico2(nivel1) {
    let params = {
      idNivelGeografico1: nivel1,
    };

    this.restService
      .restPost(
        environment.versionApiDefault +
          "radicacion/radicados/nivel-geografico2",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesNivelGeografico2 = res;
          console.log(this.resServicesNivelGeografico2);

          // lista Municipios
          if (this.resServicesNivelGeografico2.dataNivelGeografico2) {
            this.listNivelGeografico2 =
              this.resServicesNivelGeografico2.dataNivelGeografico2;
            console.log(this.listNivelGeografico2);
            // load the list initial
            this.filteredlistNivelGeografico2.next(
              this.listNivelGeografico2.slice(),
            );
          }
        },
        (err) => {
          this.resServicesNivelGeografico2Err = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesNivelGeografico2Err)
            .then((res) => {});
        },
      );
  }

  /**
   * Funcion que consulta el nivel geografico segun el departamento muestra los municipios
   * @param nivel2 nivel geografico 2
   */
  nivelGeografico3(nivel2) {
    let params = {
      idNivelGeografico2: nivel2,
    };

    this.restService
      .restPost(
        environment.versionApiDefault +
          "radicacion/radicados/nivel-geografico3",
        params,
        this.authorization,
      )
      .subscribe(
        (res) => {
          this.resServicesNivelGeografico3 = res;

          // lista Departamentos
          if (this.resServicesNivelGeografico3.dataNivelGeografico3) {
            this.listNivelGeografico3 =
              this.resServicesNivelGeografico3.dataNivelGeografico3;
            // load the list initial
            this.filteredlistNivelGeografico3.next(
              this.listNivelGeografico3.slice(),
            );
          }
        },
        (err) => {
          this.resServicesNivelGeografico3Err = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resServicesNivelGeografico3Err)
            .then((res) => {});
        },
      );
  }
}

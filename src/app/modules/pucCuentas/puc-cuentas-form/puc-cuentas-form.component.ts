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

export interface ListaRoles {
  id: string;
  val: string;
}

@Component({
  selector: "app-puc-cuentas-form",
  templateUrl: "./puc-cuentas-form.component.html",
  styleUrls: ["./puc-cuentas-form.component.css"],
})
export class PucCuentasFormComponent implements OnInit {
  @Output() public submitFormEmit = new EventEmitter<any>();
  // Autentificacion
  authorization: string;
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Nombre del boton
  @Input() textButtonForm = "Enviar";
  // Nombre del formulario
  @Input() textFormCodigo = "Formulario principal de crear cuenta";
  // Valida nombre rol
  validTextType: boolean = false;
  // Icono del formulario
  @Input() initCardHeaderIcon = "note_stack_add";
  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    { name: "Propiedad Horizontal", route: "/pucCuentas/puc-cuentas-index" },
  ];
  @Input() breadcrumbRouteActive = "Plan de cuentas";

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  /** list of banks filtered by search keyword */
  filteredBanks: ReplaySubject<ListaRoles[]> = new ReplaySubject<ListaRoles[]>(
    1,
  );

  /**
   * Configuraciones para los servicios
   */
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;
  responseServiceListModule: any;
  responseServiceListModuleErr: any;
  listModuleMenu: any;

  opciones = [
    { name: "Requiere y acumula saldos por tercero", value: false },
    { name: "Requiere y acumula saldos por centro de costo", value: false },
    {
      name: "Requiere y acumula saldos por documento relacionado",
      value: false,
    },
    {
      name: "Requiere y acumula saldos por referencia (mcías y activos fijos)",
      value: false,
    },
    { name: "Requiere articulo", value: false },
    { name: "Cuenta de impuestos", value: false },
    { name: "Aplicar depreciaciones", value: false },
    { name: "Establecer presupuesto", value: false },
    { name: "Es corriente", value: false },
    { name: "Es una cuenta recíproca", value: false },
    { name: "No acumular saldos por tercero", value: false },
    { name: "No validar documento afectado", value: false },
    { name: "Validar saldos contrarios a la naturaleza", value: false },
    {
      name: "No reclasificar, causar o provisionar (Cartera financiera)",
      value: false,
    },
    { name: "Codigo Dian formato 2516", value: false },
  ];

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
      codigo: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      nombre: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),
      naturaleza: new UntypedFormControl(
        "",
        Validators.compose([Validators.required]),
      ),

      // Aquí cada checkbox como booleano
      requiere_tercero: new UntypedFormControl(false),
      requiere_centro_costo: new UntypedFormControl(false),
      requiere_documento: new UntypedFormControl(false),
      requiere_articulo: new UntypedFormControl(false),
      requiere_referencia: new UntypedFormControl(false),
      cuenta_impuestos: new UntypedFormControl(false),
      aplicar_depreciaciones: new UntypedFormControl(false),
      establecer_presupuesto: new UntypedFormControl(false),
      es_corriente: new UntypedFormControl(false),
      es_reciproca: new UntypedFormControl(false),
      no_acumular_saldos_tercero: new UntypedFormControl(false),
      no_validar_documento_afectado: new UntypedFormControl(false),
      validar_saldos_contrarios: new UntypedFormControl(false),
      no_reclasificar_causar_provisionar: new UntypedFormControl(false),
    });
  }

  /*
   * param - authori variable de la autorizacion del localstorage
   */
  getListmodules(authori) {
    this.sweetAlertService.sweetLoading();
    let versionApi = environment.versionApiDefault;
    console.log(authori);

    this.restService
      .restGet(versionApi + "pucCuentas/puc-cuentas/index", authori)
      .subscribe(
        (res) => {
          this.responseServiceListModule = res;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.responseServiceListModule,
              true,
              "/pucCuentas/puc-cuentas-index",
            )
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse == true) {
                if (this.responseServiceListModule.data) {
                  this.listModuleMenu = this.responseServiceListModule.data;

                  // load the initial bank list
                  this.filteredBanks.next(this.listModuleMenu.slice());

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
              "/pucCuentas/puc-cuentas-index",
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
    // this.sweetAlertService.sweetLoading();
    let versionApi = environment.versionApiDefault;
    let params = {
      id: this.paramOID,
    };

    this.restService
      .restGetParams(
        versionApi + "pucCuentas/puc-cuentas/index-one",
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
              "/pucCuenta/puc-cuentas-index",
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
              "/pucCuentas/puc-cuentas-index",
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
    });
  }

  submitCuenta() {
    console.log(this.moduleForm.value);
    if (this.moduleForm.valid) {
      this.submitFormEmit.emit(this.moduleForm.value);
    } else {
      this.sweetAlertService.sweetInfo("Algo está mal", "");
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
}

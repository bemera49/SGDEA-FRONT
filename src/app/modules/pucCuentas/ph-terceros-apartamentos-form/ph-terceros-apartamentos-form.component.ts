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
  selector: "app-ph-terceros-apartamentos-form",
  templateUrl: "./ph-terceros-apartamentos-form.component.html",
  styleUrls: ["./ph-terceros-apartamentos-form.component.css"],
})
export class PhTercerosApartamentosFormComponent {
  @Output() public submitFormEmit = new EventEmitter<any>();
  // Autentificacion
  authorization: string;
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Nombre del boton
  @Input() textButtonForm = "Enviar";
  // Nombre del formulario
  @Input() textFormTercero = "Formulario principal de crear apartamentos";
  // Valida nombre rol
  validTextType: boolean = false;
  // Icono del formulario
  @Input() initCardHeaderIcon = "domain";
  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    {
      name: "Propiedad Horizontal",
      route: "/phTercero/ph-terceros-apartamentos-index",
    },
  ];
  @Input() breadcrumbRouteActive = "Gestión de Unidades";

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  resSerFormSubmit: any;
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;
  responseServiceListModule: any;
  responseServiceListModuleErr: any;
  listModuleMenu: any;
  departamentosList: any;
  ciudadesList: any;

  torre: number;
  apartamento: number;
  referencia: string;
  tipo_zona: string; // enum('Urbana','Rural')
  tipo_via: string;
  via_numero: string;
  via_letra: string;
  via_sufijo: string;
  bis: string;
  bis_letra: string;
  bis_sufijo: string;
  placa_numero: string;
  placa_letra: string;
  placa_sufijo: string;
  complemento: string;
  direccion_completa: string;
  ciudad: number; // bigint(20) unsigned
  departamento: number; // bigint(20) unsigned
  codigo_postal: string;
  principal: boolean; // tinyint(1)
  fecha_inicio: string; // date
  fecha_fin: string; // date
  listTerceroFilter: any;

  filteredlistTercero: ReplaySubject<ListaBusq[]> = new ReplaySubject<
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

    this.moduleForm = this.formBuilder.group({
      idph_tercero: new UntypedFormControl("", Validators.compose([])),
      listTerceroFilter: new UntypedFormControl("", Validators.compose([])),
      torre: new UntypedFormControl("", Validators.compose([])),
      apartamento: new UntypedFormControl("", Validators.compose([])),
      referencia: new UntypedFormControl("", Validators.compose([])),
      tipo_zona: new UntypedFormControl("Urbana", Validators.compose([])),
      tipo_via: new UntypedFormControl("", Validators.compose([])),
      via_numero: new UntypedFormControl("", Validators.compose([])),
      via_letra: new UntypedFormControl("", Validators.compose([])),
      via_sufijo: new UntypedFormControl("", Validators.compose([])),
      bis: new UntypedFormControl("", Validators.compose([])),
      bis_letra: new UntypedFormControl("", Validators.compose([])),
      bis_sufijo: new UntypedFormControl("", Validators.compose([])),
      placa_numero: new UntypedFormControl("", Validators.compose([])),
      placa_letra: new UntypedFormControl("", Validators.compose([])),
      placa_sufijo: new UntypedFormControl("", Validators.compose([])),
      complemento: new UntypedFormControl("", Validators.compose([])),
      direccion_completa: new UntypedFormControl("", Validators.compose([])),
      ciudad: new UntypedFormControl("", Validators.compose([])),
      departamento: new UntypedFormControl("", Validators.compose([])),
      codigo_postal: new UntypedFormControl("", Validators.compose([])),
      principal: new UntypedFormControl(false, Validators.compose([])),
      fecha_inicio: new UntypedFormControl("", Validators.compose([])),
      fecha_fin: new UntypedFormControl("", Validators.compose([])),
    });

    // Lista Tercero
    this.moduleForm.controls["listTerceroFilter"].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks("listTercero");
      });
  }

  tiposDeViaOptions = [
    { value: "AC", viewValue: "Avenida Calle" },
    { value: "AK", viewValue: "Avenida Carrera" },
    { value: "CL", viewValue: "Calle" },
    { value: "KR", viewValue: "Carrera" },
    { value: "DG", viewValue: "Diagonal" },
    { value: "TV", viewValue: "Transversal" },
  ];

  letraOptions = [
    { value: "", viewValue: "" },
    { value: "A", viewValue: "A" },
    { value: "B", viewValue: "B" },
    { value: "C", viewValue: "C" },
    { value: "D", viewValue: "D" },
    { value: "E", viewValue: "E" },
    { value: "F", viewValue: "F" },
    { value: "G", viewValue: "G" },
    { value: "H", viewValue: "H" },
    { value: "I", viewValue: "I" },
    { value: "J", viewValue: "J" },
    { value: "K", viewValue: "K" },
    { value: "L", viewValue: "L" },
    { value: "M", viewValue: "M" },
    { value: "N", viewValue: "N" },
    { value: "Ñ", viewValue: "Ñ" },
    { value: "O", viewValue: "O" },
    { value: "P", viewValue: "P" },
    { value: "Q", viewValue: "Q" },
    { value: "R", viewValue: "R" },
    { value: "S", viewValue: "S" },
    { value: "T", viewValue: "T" },
    { value: "U", viewValue: "U" },
    { value: "V", viewValue: "V" },
    { value: "W", viewValue: "W" },
    { value: "X", viewValue: "X" },
    { value: "Y", viewValue: "Y" },
    { value: "Z", viewValue: "Z" },
  ];

  sufijoOptions = [
    { value: "", viewValue: "" },
    { value: "SUR", viewValue: "Sur" },
    { value: "ESTE", viewValue: "Este" },
  ];

  bisOptions: any = [
    { value: "SI", viewValue: "SI" },
    { value: "NO", viewValue: "NO" },
  ];

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

  onSearchId(id, authori) {
    let versionApi = environment.versionApiDefault;
    let params = {
      id: this.paramOID,
    };

    this.restService
      .restGetParams(
        versionApi + "phTerceroApartamentos/ph-tercero-apartamentos/index-one",
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
              "/pucCuenta/ph-terceros-apartamentos-index",
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
              "/pucCuentas/ph-terceros-apartamentos-index",
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

  menuPrimaryReceiveData(event) {
    var buttonSubmit = <HTMLFormElement>document.getElementById("sendForm");
    buttonSubmit.click();
  }

  getListmodules(authori) {
    this.sweetAlertService.sweetLoading();
    let versionApi = environment.versionApiDefault;

    this.restService
      .restGet(versionApi + "phTercero/ph-tercero-apartamentos/index", authori)
      .subscribe(
        (res) => {
          this.responseServiceListModule = res;
          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(
              this.responseServiceListModule,
              true,
              "/phTercero/ph-terceros-apartamentos-index",
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
              "/pucCuentas/ph-terceros-apartamentos-index",
            )
            .then((res) => {});
        },
      );
  }

  // Funciones para manejar los cambios de estado
  async getListGeneral(authori) {
    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService
      .restGetNotDecrypt(
        environment.versionApiDefault +
          "phTerceroApartamentos/ph-tercero-apartamentos/index-general-filing-lists-not-encrypt",
        authori,
      )
      .subscribe(
        (data) => {
          const responseService: any = data;
          this.globalAppService
            .resolveResponse(responseService)
            .then((dataGlobal) => {
              const responseGlobal = dataGlobal;
              if (responseService.dataTercero) {
                this.listTerceroFilter = responseService.dataTercero;
                // load the list initial
                this.filteredlistTercero.next(this.listTerceroFilter.slice());
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
              "/pucCuentas/ph-terceros-apartamentos-index",
            )
            .then((res) => {});
        },
      );
  }
}

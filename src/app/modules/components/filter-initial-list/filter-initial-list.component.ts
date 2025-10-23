import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { AuthService } from "src/app/services/auth.service";
import { GlobalAppService } from "src/app/services/global-app.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RestService } from "src/app/services/rest.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { environment } from "src/environments/environment";

export interface DialogData {
  dataDialog: any;
}

@Component({
  selector: "app-filter-initial-list",
  template: "",
  styleUrls: ["./filter-initial-list.component.css"],
})
export class FilterInitialListComponent implements OnInit, AfterViewChecked {
  @Input() dataFilterSchema: any; // Data del filtro
  @Output() public closeFilterEmiter = new EventEmitter<any>(); // Data a retornar al initial list
  dataFilterOK: any; // Data para enviar al dialogo que trae la informacion del schena
  storageKey: string = "filterDates";
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.openDialog();
  }

  ngAfterViewChecked() {
    $(".cdk-global-overlay-wrapper").css("z-index", "1000");
    $(".cdk-overlay-pane").css("overflow", "auto");
  }

  /** Metodo que abre el dialogo para digitar los filtros */
  openDialog() {
    if (this.dataFilterSchema) {
      this.dataFilterOK = this.dataFilterSchema;
    } else {
      this.dataFilterOK = this.authService.decryptAES(
        localStorage.getItem(environment.hashDataFilter),
      );
    }

    // console.log( this.dataFilterOK );

    const dialogRef = this.dialog.open(FilterInitialListDialog, {
      disableClose: false,
      width: "95%",
      data: {
        dataConfig: this.dataFilterOK.configGlobal,
        dataFilter: this.dataFilterOK.schema,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      let respuesta = res;
      if (!respuesta) {
        respuesta = { event: "close", status: false, data: [] };
      }
      // console.log('Respuesta al cerrar el dialogo');
      // console.log(respuesta);
      this.closeComponent(respuesta);
    });
  }

  /*** Método para cerrar o destruir el componente desde el padre ***/
  closeComponent(respuesta) {
    this.closeFilterEmiter.emit(respuesta);
  }
}

@Component({
  selector: "app-filter-initial-list-dialog",
  templateUrl: "./filter-initial-list.component.html",
  styleUrls: ["./filter-initial-list.component.css"],
})
export class FilterInitialListDialog implements OnInit {
  /** Propiedades del Filter List */
  // Propiedades agregadas

  @Input() initCardHeaderStatus: boolean = true; // Controla el header del panel/card
  initCardHeaderIcon: string = "pageview"; // Icono del header del panel/card
  initCardHeaderTitle: string = "Filtros de búsqueda"; // Título del header del panel/card
  botonSubmitIcon: string = "search"; // icono del botón
  trashIcon: string = "delete";
  notificationType: string; // Tipo de notificación
  routeSubmit: string; // Ruta del submit

  form = new UntypedFormGroup({});
  model = {
    filterOperation: [{ fechaInicial: null, fechaFinal: null }],
  };

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  // Version api
  versionApi = environment.versionApiDefault;
  // Autentificacion
  authorization: string;
  // variables para servicios
  routeServiceChange: any; // Ruta a ejecutar en el OnChange
  params: any;
  resSerChange: any;
  resSerChangeErr: any;
  metadatos = [];

  constructor(
    public dialogRef: MatDialogRef<FilterInitialListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public lhs: LocalStorageService,
    public toastService: ToastService,
  ) {}

  ngOnInit() {
    this.fields = this.data["dataFilter"]; // schema

    if (this.fields) {
      const valFiels = this.fields[0]["fieldArray"]["fieldGroup"].map((f) => {
        if (f.templateOptions && f.templateOptions.changeExpr) {
          f.templateOptions.change = Function(
            f.templateOptions.changeExpr,
          ).bind(this);
        }
        return f;
      });
    }

    const storedData = this.getData();

    if (storedData) {
      // Set the retrieved data to the form model
      this.model.filterOperation[0] = storedData;
    }
    console.log(this.routeServiceChange);
    // Configuracion del diseño del filtro
    this.routeServiceChange = this.data["dataConfig"]["routeChange"];
    this.initCardHeaderTitle = this.data["dataConfig"]["titleCard"];
    this.initCardHeaderIcon = this.data["dataConfig"]["icon"];
    this.routeSubmit = this.data["dataConfig"]["routeSubmit"];
    this.botonSubmitIcon = this.data["dataConfig"]["botonSubmitIcon"];

    // Hace el llamado del token
    this.getTokenLS();
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  modificarForm(): void {
    this.metadatos.forEach((meta) => {
      const value = this.form.get(`metadata_${meta.id}`).value;
      if (value) {
        this.form.value.filterOperation[0][`metadata_${meta.id}`] = value;
      }
      delete this.form.value[`metadata_${meta.id}`];
    });
  }

  submit() {
    this.modificarForm();

    if (this.form.valid) {
      if (
        this.model.filterOperation[0].fechaInicial &&
        this.model.filterOperation[0].fechaFinal
      ) {
        const fechaInicial = new Date(
          this.model.filterOperation[0].fechaInicial,
        );
        const fechaFinal = new Date(this.model.filterOperation[0].fechaFinal);
        if (fechaInicial > fechaFinal) {
          this.toastService.open({
            title: "Error",
            description:
              "La fecha inicial no puede ser mayor que la fecha final.",
            duration: 2000,
            success: false,
          });
          return;
        }
        const today = new Date();
        if (fechaFinal > today) {
          this.toastService.open({
            title: "Error",
            description:
              "La fecha final no puede ser mayor que la fecha actual.",
            duration: 2000,
            success: false,
          });
          return;
        }
      }
      this.saveData(this.form.value?.filterOperation[0]);
      this.dialogRef.close({
        event: "close",
        status: true,
        data: this.form.value,
      });
    } else {
      this.dialogRef.close({ event: "close", status: false, data: [] });
    }
  }

  saveData(data: any) {
    localStorage.setItem(this.data["dataFilter"], JSON.stringify(data));
  }

  cancel() {
    this.form.reset();
    this.model = {
      filterOperation: [{ fechaInicial: null, fechaFinal: null }],
    };
    localStorage.removeItem(this.data["dataFilter"]);

    this.dialogRef.close({
      event: "close",
      status: true,
      data: this.form.value,
    });
  }

  getData(): any | null {
    const storedData = localStorage.getItem(this.data["dataFilter"]);
    return storedData ? JSON.parse(storedData) : null;
  }

  /**
   * Consulta para los usuarios dependiendo las dependencias
   * @param camOrig Campo Origen donde se tomara el valor para consultar la información
   * @param camDes Campo Destino donde quedara lo que retorne el backend
   * @param option Campo option como opcional
   */
  consultaListChange(camOrig, camDes, option: any = "") {
    let valOrigen = this.form.controls["filterOperation"]["value"][0][camOrig];

    this.params = {
      id: valOrigen,
      option: option,
    };

    this.restService
      .restGetParams(
        this.versionApi + this.routeServiceChange,
        this.params,
        this.authorization,
      )
      .subscribe(
        (data) => {
          this.resSerChange = data;

          // Evaluar respuesta del servicio
          this.globalAppService
            .resolveResponse(this.resSerChange)
            .then((res) => {
              let responseResolveResponse = res;
              if (responseResolveResponse === true) {
                if (this.resSerChange.metadata.length > 0) {
                  this.cargarMetadatos(this.resSerChange.metadata);
                } else {
                  this.metadatos = [];
                }
                // this.form.controls['filterOperation']['value'][0][camDes] = this.resSerChange.data;

                const valFielsg = this.fields[0]["fieldGroup"][0][
                  "fieldGroup"
                ].map((g) => {
                  if (g.key == camDes) {
                    g.templateOptions.options = this.resSerChange.data;
                  }
                  return g;
                });
              }
            });
        },
        (err) => {
          this.resSerChangeErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService
            .resolveResponseError(this.resSerChangeErr)
            .then((res) => {});
        },
      );
  }

  cargarMetadatos(metadatos) {
    this.metadatos = metadatos;
    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;

      this.form.addControl(
        controlName,
        new UntypedFormControl("", [
          metadata.requerido ? Validators.required : null,
          Validators.maxLength(250),
        ]),
      );
    }
  }
}

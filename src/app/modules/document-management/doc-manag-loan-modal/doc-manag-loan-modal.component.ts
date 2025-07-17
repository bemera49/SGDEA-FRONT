import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ModalService } from "@app/services/modal/modal.service";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
import { Router } from "@angular/router";
import { BreadcrumbComponent } from "@app/modules/components/breadcrumb/breadcrumb.component";
import { RestService } from "@app/services/rest.service";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "@app/services/local-storage.service";
import { GlobalAppService } from "@app/services/global-app.service";
import { AprovedComponent } from "../modal/aproved/aproved.component";
import { ProrrogaPrestamoDocComponent } from "../modal/prorroga-prestamo-doc/prorroga-prestamo-doc.component";
import { CanDirective } from "@app/directives/can.directive";

@Component({
  selector: "app-doc-manag-loan-modal",
  templateUrl: "./doc-manag-loan-modal.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FormsModule,
    CanDirective,
  ],
  styleUrls: ["./doc-manag-loan-modal.component.scss"],
})
export class DocManagLoanModalComponent implements OnInit {
  formSolicitud: FormGroup;
  fechaActual: string;
  arrayExpedientesSolicitados!: any[];
  infoData!: any;
  versionApi = environment.versionApiDefault;
  infoSend: any[] = [];
  reuteLoadView: string =
    "gestionArchivo/prestamo-documental/request-loan-files";
  routeUpdateLoan: string = "gestionArchivo/prestamo-documental/update";
  userData = this.restService.getUserData();
  authentication = this.userData;
  breadcrumbOn = [{ name: "Expediente", route: "/documentManagement" }];
  authorization: string;
  urlActive: string;
  btnDerechoDefault: string = "Solicitar préstamo";
  btnIzquierdoDefault: string = "Listado de préstamos";
  breadcrumbRouteActive = "Crear solicitud de préstamo documental";
  constructor(
    private reciveDataService: ProrrogaService,
    private modal: ModalService,
    private fb: FormBuilder,
    private router: Router,
    private _postService: RestService,
    public lhs: LocalStorageService,
    public restService: RestService
  ) {
    const today = new Date();
    this.infoData = this.reciveDataService.getData();
    if (this.infoData === undefined) {
      this.router.navigate(["/documentManagement/folder-index/open"]);
    }
    this.fechaActual = today.toISOString().slice(0, 10);
    this.urlActive = this.router.url.split("/").pop();
  }

  ngOnInit(): void {
    this.initForm();
    this.inputsDisabled();
    this.getTokenLS();
    if (this.urlActive === "editViewDetail") {
      this.infoData.title = "Aprobar solicitud de préstamo documental";
      this.breadcrumbRouteActive = "Aprobar solicitud de préstamo documental";
      this.patchValueForm();
    }
    if (this.infoData.estado === 1) {
      this.infoData.title = "Solicitud de préstamo documental aprobada";
      this.breadcrumbRouteActive = "Solicitud de préstamo documental";
    } else if (this.infoData.estado === 0) {
      this.infoData.title = "Solicitud de préstamo documental rechazado";
      this.breadcrumbRouteActive = "Solicitud de préstamo documental";
    }
    if (this.infoData.estado === 3 && this.infoData.estadoRegPro === 1) {
      this.btnDerechoDefault = "APROBAR PRÓRROGA";
      this.btnIzquierdoDefault = "RECHAZAR PRÓRROGA";
      this.breadcrumbRouteActive =
        "Aprobar solicitud de prórroga préstamo documental";
      this.infoData.title = "Aprobar solicitud de prórroga préstamo documental";
    }
  }
  initForm() {
    this.formSolicitud = this.fb.group({
      fsolicitud: [this.fechaActual, [Validators.required]], // Asigna la fecha actual aquí si quieres inicializar el campo
      dependencia: [
        this.authentication.dependencia.nombreGdTrdDependencia,
        [Validators.required],
      ],
      nombreSolicitante: [
        this.authentication.nombre || "",
        [Validators.required],
      ],
      avisoSap: [""],
      fInicial: [""],
      fFinal: [""],
      motivo: [""],
    });
  }

  patchValueForm() {
    this.formSolicitud.patchValue({
      fsolicitud: this.infoData.fechaSolicitudGaPrestamoExpediente,
      dependencia: this.infoData.dependency,
      nombreSolicitante: this.infoData.user,
      avisoSap: this.infoData.numeroSap,
      fInicial: this.formatDate(this.infoData.fechaInicioPrestamo),
      fFinal: this.formatDate(this.infoData.fechaFinPrestamo),
      motivo: this.infoData.observacionGaPrestamoExpediente,
    });

    this.btnDerechoDefault = "APROBAR PRÉSTAMO";
    this.btnIzquierdoDefault = "RECHAZAR PRÉSTAMO";
  }
  goBack(): void {
    this.router.navigate(["/documentManagement/folder-index/close"]);
  }

  get fInicial() {
    return this.formSolicitud.get("fInicial");
  }

  // Método para obtener el FormControl de la fecha final
  get fFinal() {
    return this.formSolicitud.get("fFinal");
  }
  inputsDisabled() {
    this.formSolicitud.get("fsolicitud").disable();
    this.formSolicitud.get("dependencia").disable();
    this.formSolicitud.get("nombreSolicitante").disable();
    if (this.urlActive === "editViewDetail") {
      this.formSolicitud.get("avisoSap").disable();
      this.formSolicitud.get("fInicial").disable();
      this.formSolicitud.get("fFinal").disable();
      this.formSolicitud.get("motivo").disable();
    }
  }
  submit() {
    if (
      this.btnDerechoDefault === "APROBAR PRÉSTAMO" ||
      this.btnDerechoDefault === "APROBAR PRÓRROGA"
    ) {
      if (this.btnDerechoDefault === "APROBAR PRÉSTAMO") {
        const data = {
          id: this.infoData.id,
          estado: 1,
        };
        this.modal.open(AprovedComponent, {
          title: "Aprobar préstamo",
          data: data,
        });
      }
      if (this.btnDerechoDefault === "APROBAR PRÓRROGA") {
        const data = {
          id: this.infoData.id,
          estadoRegPro: 4,
        };
        this.modal.open(AprovedComponent, {
          title: "Aprobar prórroga",
          data: data,
        });
      }
    } else {
      if (
        this.formSolicitud.get("fInicial").value &&
        this.formSolicitud.get("fFinal").value &&
        this.formSolicitud.get("motivo").value &&
        this.formSolicitud.get("avisoSap").value
      ) {
        const fInicialValue = this.formSolicitud.get("fInicial").value;
        const fFinalValue = this.formSolicitud.get("fFinal").value;

        if (this.isValidDate(fInicialValue) && this.isValidDate(fFinalValue)) {
          this.modal.openAction(
            "",
            "¿Está seguro de la acción a realizar?",
            () => {
              this.formSolicitud.patchValue({
                fInicial: this.formatDate(fInicialValue),
                fFinal: this.formatDate(fFinalValue),
              });

              this.infoSend = this.infoData.data.map((info) => ({
                id: info.id, //id expediente
                fileName: info.nombreExpediente, //nombre expediente
                idInitialList: info.idInitialList, //revisar
                dependency: String(
                  this.authentication.dependencia.idGdTrdDependencia
                ), //nombre dependencia
              }));

              this.postInfo(this.formSolicitud.value, this.infoSend);
            }
          );
        } else {
          this.formSolicitud.markAllAsTouched();
          this.modal.openNotify(
            "Aviso",
            `Por favor verifique, las fechas ingresadas no son válidas.`,
            false
          );
        }
      } else {
        this.formSolicitud.markAllAsTouched();
        this.modal.openNotify(
          "Aviso",
          `Por favor verifique, datos obligatorios incompletos`,
          false
        );
      }
    }
  }
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  listadoPrestamo() {
    if (
      this.btnIzquierdoDefault === "RECHAZAR PRÉSTAMO" ||
      this.btnIzquierdoDefault === "RECHAZAR PRÓRROGA"
    ) {
      if (this.btnIzquierdoDefault === "RECHAZAR PRÉSTAMO") {
        const data = {
          id: this.infoData.id,
          estado: 0,
        };
        this.modal.open(AprovedComponent, {
          title: "Rechazar préstamo",
          data: data,
        });
      }
      if (this.btnIzquierdoDefault === "RECHAZAR PRÓRROGA") {
        const data = {
          id: this.infoData.id,
          estadoRegPro: 4,
        };
        this.modal.open(AprovedComponent, {
          title: "Rechazar prórroga",
          data: data,
        });
      }
    } else {
      this.router.navigate(["/documentManagement/folder-view-loan"]);
    }
  }
  openModalProrroga(text: string) {
    this.modal.open(ProrrogaPrestamoDocComponent, {
      title: text,
      data: this.infoData,
    });
  }
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }
  postInfo(info: any, ButtonSelectedData: any) {
    const data = {
      jsonSend: {
        ButtonSelectedData,
        data: {
          observacion: info.motivo, //motivo solicitud
          tipoPrestamo: 3, // tipo 'PrestamoDigital'
          requerimiento: 1, // requerimiento 'Carpeta',
          numeroSap: info.avisoSap || "", //aviso sap
          fechaInicioPrestamo: info.fInicial, //fecha inicial del prestamo
          fechaFinPrestamo: info.fFinal,
          username: this.authentication.username, // fecha final del prestamo
        },
      },
    };
    this._postService
      .restPost(this.versionApi + this.reuteLoadView, data, this.authorization)
      .subscribe((data: any) => {
        if (data.status === 200) {
          this.modal.openNotify(
            "Éxito",
            "Solicitud de préstamo documental realizada exitosamente",
            true
          );
          setTimeout(() => {
            this.goBack();
          }, 3000);
        } else {
          this.modal.openNotify("Error", data.data.error[0], false);
          setTimeout(() => {
            this.goBack();
          }, 3000);
        }
      });
  }
  formatDate(date: Date): string {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }
}

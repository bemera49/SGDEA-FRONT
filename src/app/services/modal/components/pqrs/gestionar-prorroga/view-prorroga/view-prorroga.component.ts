import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { ModalService } from "@app/services/modal/modal.service";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
import { RestService } from "@app/services/rest.service";
import { ToastService } from "@app/services/toast/toast.service";
import { BreadcrumbComponent } from "@app/modules/components/breadcrumb/breadcrumb.component";

@Component({
  selector: "app-view-prorroga",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbComponent,
  ],
  templateUrl: "./view-prorroga.component.html",
  styleUrls: ["./view-prorroga.component.scss"],
})
export class ViewProrrogaComponent implements OnInit {
  userData = this.restService.getUserData();
  authentication = this.userData.accessToken;
  objInfo: any;
  fechaVencimientoRadiRadicados: any;
  actualDate: any;
  errorDate: boolean = false;
  formViewProrroga: FormGroup;
  arrayAprobadores: any;
  authorization: string;
  arraySolicitudes: any;
  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
    { name: "Listado de PQRS", route: "/pqrs/log-pqrs-index" },
    { name: "Detalle", route: "/pqrs/pqrs-view/1" },
  ];
  breadcrumbRouteActive = "Ampliación de terminos";
  public areasOptions;
  arrayAprobadores2: any;
  constructor(
    public restService: RestService,
    private _prorrogaService: ProrrogaService,
    private modal: ModalService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(ToastService) private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.objInfo = this._prorrogaService.getData();
    this.initForm();
    this.actualDate = this.getDate();
    this.fechaVencimientoRadiRadicados = this.objInfo.dateVencimiento;
    this.compareDates(this.fechaVencimientoRadiRadicados, this.actualDate);
    this.disabledInput();
    this.getAprobadores();
    this.getInfoTerminos();
  }
  initForm() {
    this.formViewProrroga = this.fb.group({
      ampliacion: [this.objInfo.ampliacion],
      justification: [this.objInfo.justification],
      aprobador: ["", Validators.required],
      tipoSolicitud: ["Solicitar Amplición de Términos"],
    });
  }
  getDate() {
    let fecha = new Date();
    let desdeStr = `${fecha.getFullYear()}-${(
      "0" +
      (fecha.getMonth() + 1)
    ).slice(-2)}-${fecha.getDate()}`;
    return desdeStr;
  }
  compareDates(dateVencimiento: any, dateActual: any) {
    let parsedDate1 = this.parseDate(dateVencimiento);
    let parsedDate2 = this.parseDate(dateActual);

    if (parsedDate1 === null || parsedDate2 === null) {
      alert("Una o ambas fechas son inválidas.");
      return;
    }

    if (parsedDate1.getTime() === parsedDate2.getTime()) {
      this.modal
        .openNotify(
          "",
          "No se puede solicitar ampliación de términos porque la fecha está por fuera del plazo permitido",
          false
        )
        .afterClosed()
        .subscribe((res) =>
          this.router.navigate(["/pqrs/pqrs-view/" + this.objInfo.id])
        );
      this.errorDate = true;
    } else if (parsedDate2 > parsedDate1) {
      this.modal
        .openNotify(
          "",
          "No se puede solicitar ampliación de términos porque la fecha esta por fuera del plazo permitido",
          false
        )
        .afterClosed()
        .subscribe((res) =>
          this.router.navigate(["/pqrs/pqrs-view/" + this.objInfo.id])
        );
      this.errorDate = true;
    }
    this.cdr.detectChanges();
  }
  parseDate(dateString: string): Date | null {
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  }
  goBack(): void {
    this.modal.openAction(
      "",
      "¿Está seguro de cancelar la ampliación de terminos?",
      () => {
        this.router.navigate(["/pqrs/pqrs-view/" + this.objInfo.id]);
        this.toast.open({
          title: "Cancelación exitosa",
          duration: 2000,
          success: true,
        });
      }
    );
  }

  disabledInput() {
    this.formViewProrroga.get("ampliacion")?.disable();
    this.formViewProrroga.get("justification")?.disable();
    this.formViewProrroga.get("tipoSolicitud")?.disable();
    if (this.errorDate) {
      this.formViewProrroga.get("aprobador")?.disable();
    }
  }
  getAprobadores() {
    const idDependencia =
      this.restService.getUserData().dependencia.idGdTrdDependencia;

    this._prorrogaService.getAprobadores().subscribe({
      next: (response: any) => {
        this.arrayAprobadores = response;
        console.log(response);
        if (response.length == 0) {
          this.modal.openNotify(
            "",
            "No hay usuarios con el rol seleccionado",
            false
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.restService
    //   .restGetNotDecrypt(
    //     "api/usuarios?&rol_id=9&dependencia_id=" + idDependencia,
    //     this.authorization
    //   )
    //   .subscribe((response: any) => {
    //     console.log(response);
    //     this.arrayAprobadores = response;
    //     if (response.length == 0) {
    //       this.modal.openNotify(
    //         "",
    //         "No hay usuarios con el rol seleccionado",
    //         false
    //       );
    //     }
    //   });
  }
  submit() {
    if (this.formViewProrroga.valid) {
      this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
        const idAuth = this.formViewProrroga.get("aprobador").value.id;
        const data = {
          autorizacion_id: 7,
          radicado_id: this.objInfo.id,
          autorizador_id: idAuth,
          observaciones: this.formViewProrroga.get("justification").value,
          diasAmpliacionTerminos: this.formViewProrroga.get("ampliacion").value,
        };
        console.log(data);

        this._prorrogaService.postProrroga(data).subscribe({
          next: (result: any) => {
            console.log(result);
            this.modal.openNotify("Aviso", `${result.mensaje}`, false);
            this.router.navigate(["/pqrs/pqrs-view/" + this.objInfo.id]);
            this.toast.open({
              title: "Envío exitoso",
              duration: 2000,
              success: true,
            });
          },
          error: (err: any) => {
            this.modal.openNotify("", "Hubo un error al guardar", false);
          },
        });
        this.changeState(data.autorizador_id);
      });
    } else {
      this.formViewProrroga.markAllAsTouched();
      this.modal.openNotify(
        "Aviso",
        `Por favor verifique, datos obligatorios incompletos`,
        false
      );
    }
  }

  changeState(idaprobador: any) {
    const data = {
      radicado_id: this.objInfo.id,
      autorizadorId: idaprobador,
    };
    this._prorrogaService.requestProrroga(data).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err: any) => {
        this.modal.openNotify("", "Hubo un error", false);
      },
    });
  }
  getInfoTerminos() {
    this._prorrogaService.getAmpliacionTerminos(this.objInfo.id).subscribe({
      next: (result: any) => {
        console.log(result.ampliacion_terminos);

        if (result.ampliacion_terminos.length > 0) {
          this.arraySolicitudes = result.ampliacion_terminos;
          console.log(this.arraySolicitudes);

          this.avalibleRquest(this.arraySolicitudes);
        }
      },
      error: (err: any) => {
        this.modal.openNotify("", "Hubo un error", false);
      },
    });
  }

  avalibleRquest(array: any) {
    console.log(array);

    let sumadias: number = 0;
    let pendiente: boolean = false;
    const ampliacion = this.formViewProrroga.get("ampliacion").value;

    array.forEach((element: any) => {
      pendiente = element.estado === "Pendiente" ? true : false;
      console.log(pendiente);
      if (element.estado !== "Rechazada")
        sumadias += element.diasAmpliacionTerminos;
    });

    if (array.length > 1 || sumadias + ampliacion > 30) {
      const label =
        array.length > 1 || sumadias + ampliacion > 30
          ? "El número de solicitudes de ampliación de términos ha sido superado"
          : "La solicitud tiene una ampliación de términos anterior y el tiempo solicitado supera el tiempo permitido.";
      this.modal
        .openNotify("", `${label}`, false)
        .afterClosed()
        .subscribe((res) => {
          this.router.navigate(["/pqrs/pqrs-view/", this.objInfo.id]);
        });
    }
    if (pendiente) {
      this.modal
        .openNotify(
          "",
          `Este radicado ya tiene una ampliación de términos pendiente`,
          false
        )
        .afterClosed()
        .subscribe((res) => {
          this.router.navigate(["/pqrs/pqrs-view/", this.objInfo.id]);
        });
    }
  }
}

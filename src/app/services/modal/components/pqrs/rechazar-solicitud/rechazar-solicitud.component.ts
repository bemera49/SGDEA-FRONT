import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ModalService } from "@app/services/modal/modal.service";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
import { RestService } from "@app/services/rest.service";
import { ToastService } from "@app/services/toast/toast.service";

@Component({
  selector: "app-rechazar-solicitud",
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
  ],
  templateUrl: "./rechazar-solicitud.component.html",
  styleUrls: ["./rechazar-solicitud.component.css"],
})
export class RechazarSolicitudComponent implements OnInit {
  causal: string = '';
  constructor(
    public dialogRef: MatDialogRef<RechazarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
    private modal: ModalService,
    private restService: RestService,
  ) { }
  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {

      if (this.causal !== '') {
        this.restService.get(`api/autorizaciones?radicado_id=${this.data.data.id}`)
          .subscribe({
            next: (res) => {
              this.restService.put(`api/autorizacion`, res[0]['id'], { estado: "Rechazada", observaciones: this.data.observaciones, motivo_rechazo: this.causal })
                .subscribe({
                  next: (res) => {
                    this.toast.open({
                      title: ``,
                      description: `Rechazo exitoso`,
                      success: true,
                      duration: 3000,
                    })
                    this.dialogRef.close();
                  },

                  error: (err: any) => {
                    this.toast.open({
                      title: '',
                      description: `Ha ocurrido un error al procesar su solicitud, inténtelo nuevamente`,
                      success: false,
                      duration: 5000,
                    })
                  },
                })
            },
            error: (err: any) => {
              this.toast.open({
                title: '',
                description: `Ha ocurrido un error al consultar las autorizaciones pendientes`,
                success: false,
                duration: 5000,
              })
            },
          })
      } else {
        this.modal.openNotify(
          "Aviso",
          `Por favor verifique, datos obligatorios incompletos`,
          false
        );
      }
    });
  }
}

import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalStorageService } from "@app/services/local-storage.service";
import { ModalService } from "@app/services/modal/modal.service";
import { RestService } from "@app/services/rest.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-prorroga-prestamo-doc",
  templateUrl: "./prorroga-prestamo-doc.component.html",
  styleUrls: ["./prorroga-prestamo-doc.component.scss"],
})
export class ProrrogaPrestamoDocComponent implements OnInit {
  formProrroga!: FormGroup;
  urlProrroga =
    environment.versionApiDefault +
    "gestionArchivo/prestamo-documental/update-prorroga";
  userData = this.restService.getUserData();
  authorization: string;
  labelDate: string = "prórroga";
  constructor(
    public dialogRef: MatDialogRef<ProrrogaPrestamoDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalSvc: ModalService,
    private restService: RestService,
    public lhs: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    console.log(data);
    console.log(this.userData);
    if (data.title !== "Solicitud de Prórroga") this.labelDate = "devolución";
  }

  ngOnInit(): void {
    this.initForm();
    this.getTokenLS();
  }
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  initForm() {
    this.formProrroga = this.fb.group({
      solicitante: [{ value: this.userData.nombre, disabled: true }],
      fProrroga: [""],
      justificacion: [""],
    });
  }

  close() {
    this.modalSvc.openAction(
      "",
      "¿Está seguro de la acción a realizar?",
      () => {
        this.dialogRef.close();
      }
    );
  }
  submit() {
    if (
      this.formProrroga.get("justificacion").value !== "" &&
      this.formProrroga.get("fProrroga").value !== ""
    ) {
      const state = this.data.title === "Solicitud de Prórroga" ? 1 : 0;
      const data = {
        id: this.data.data.id,
        justificaPrestamo: this.formProrroga.get("justificacion").value,
        fechaSolicitud: this.formatDate(
          this.formProrroga.get("fProrroga").value
        ),
        estadoRegPro: state,
        idSolicitante: this.userData.idDataCliente,
      };
      console.log(data);

      this.restService
        .restPost(this.urlProrroga, data, this.authorization)
        .subscribe({
          next: (res) => {
            console.log(res);
            const message =
              this.data.title === "Solicitud de Prórroga"
                ? "Prórroga exitosa"
                : "El registro de la devolución se realizó de manera correcta";
            this.modalSvc.openNotify("Éxito", `${message}`, false);
            setTimeout(() => {
              this.router.navigate(["/documentManagement/folder-view-loan"]);
            }, 3000);
            this.dialogRef.close();
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.modalSvc.openNotify(
        "",
        "Diligencie todos los campos obligatorios",
        false
      );
      return;
    }
  }
  formatDate(date: Date): string {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }
}

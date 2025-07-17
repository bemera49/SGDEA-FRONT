import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalStorageService } from "@app/services/local-storage.service";
import { ModalService } from "@app/services/modal/modal.service";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
import { RestService } from "@app/services/rest.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-aproved",
  templateUrl: "./aproved.component.html",
  styleUrls: ["./aproved.component.scss"],
})
export class AprovedComponent implements OnInit {
  description: string = "";
  versionApi = environment.versionApiDefault;
  routeUpdateLoan: string = "gestionArchivo/prestamo-documental/update";
  routeUpdateProroga: string =
    "gestionArchivo/prestamo-documental/update-prorroga";
  authorization: string;
  labelbtn: string = "Rechazar";
  infoData: any;

  constructor(
    public dialogRef: MatDialogRef<AprovedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalSvc: ModalService,
    private restService: RestService,
    public lhs: LocalStorageService,
    private router: Router,
    private reciveDataService: ProrrogaService
  ) {
    if (data.data.estado == 1 || data.data.estadoRegPro !== 4)
      this.labelbtn = "Aprobar";
    this.infoData = this.reciveDataService.getData();
  }

  ngOnInit(): void {
    this.getTokenLS();
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
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }
  submit() {
    if (this.description !== "") {
      const field =
        this.data.title === "Aprobar préstamo"
          ? "aprobacionSolicitud"
          : this.data.title === "Aprobar prórroga" ||
            this.data.title === "Rechazar prórroga"
          ? "justificaPrestamo"
          : "rechazoSolicitud";
      const sendData = {
        ...this.data.data,
        [field]: this.description,
        idSolicitante: this.infoData.idSolicitante,
        fechaSolicitud: this.formatDate(new Date()),
      };
      this.modalSvc.openAction(
        "",
        "¿Está seguro de la acción a realizar?",
        () => {
          const ruta =
            this.data.data.estado === 1 || this.data.data.estado === 0
              ? this.routeUpdateLoan
              : this.routeUpdateProroga;
          this.restService
            .restPost(this.versionApi + ruta, sendData, this.authorization)
            .subscribe({
              next: (response) => {
                this.modalSvc.openNotify(
                  "Éxito",
                  `Solicitud de préstamo documental ha sido procesada con éxito.`,
                  false
                );

                setTimeout(() => {
                  this.router.navigate([
                    "/documentManagement/folder-view-loan",
                  ]);
                }, 3000);
                this.dialogRef.close();
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      );
    } else {
      this.modalSvc.openNotify(
        "",
        "Debe ingresar un objetivo/justificación.",
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

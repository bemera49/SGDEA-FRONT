import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModalService } from "@app/services/modal/modal.service";
import { RequestPublicationService } from "../../services/request-publication/request-publication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SweetAlertService } from "@app/services/sweet-alert.service";

@Component({
  selector: "app-modal-solicitud-publicacion",
  templateUrl: "./modal-solicitud-publicacion.component.html",
  styleUrls: ["./modal-solicitud-publicacion.component.scss"],
})
export class ModalSolicitudPublicacionComponent implements OnInit {
  formSolicitud!: FormGroup;
  id: number;
  infoData: any;
  acumposted: number = 0;
  value_docs: number = 0;
  constructor(
    private modalSvc: ModalService,
    public dialogRef: MatDialogRef<ModalSolicitudPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _serviceDocument: RequestPublicationService,
    private fb: FormBuilder,
    public sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.id = this.data.data.id;
    this.initForm();
    console.log(this.id);
    this.getInfoDocument();
  }

  initForm() {
    this.formSolicitud = this.fb.group({
      email: ["", [Validators.required]],
      file: [null],
      observations: ["", [Validators.required]],
    });
  }

  getInfoDocument() {
    this._serviceDocument.getDocumentById(this.id).subscribe({
      next: (resp: any) => {
        this.infoData = resp.data;
        console.log(this.infoData);
      },
      error: (err) => {
        this.modalSvc.openNotify("error", "Error en la consulta", false);
      },
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    if (file && file.type === "application/pdf") {
      this.formSolicitud.get("file").setValue(file);
    } else {
      this.modalSvc.openNotify(
        "error",
        "Solo se permiten archivos PDF.",
        false
      );
      this.formSolicitud.get("file").setValue(null);
      return;
    }
  }
  submit() {
    if (this.formSolicitud.valid) {
      const formData = new FormData();

      // Agregar cada campo del formulario al FormData
      formData.append("email", this.formSolicitud.get("email").value);
      formData.append(
        "observations",
        this.formSolicitud.get("observations").value
      );

      // Agregar el archivo al FormData
      const file = this.formSolicitud.get("file").value;
      if (file) {
        formData.append("file", file);
      }
      this.modalSvc.openAction(
        "",
        "¿Está seguro de la acción a realizar?",
        () => {
          this._serviceDocument.postDocument(this.id, formData).subscribe({
            next: (resp) => {
              // Incrementar el contador de peticiones exitosas en el localStorage
              let successCount =
                parseInt(
                  localStorage.getItem(`cantidad-${this.data.data.type}`)
                ) || 0;
              successCount++;
              localStorage.setItem(
                `cantidad-${this.data.data.type}`,
                successCount.toString()
              );

              this.sweetAlertService.showNotification(
                "success",
                "La información ha sido guardada con éxito."
              );
              this.modalSvc.openNotify(
                "",
                "La información ha sido guardada con éxito.",
                false
              );
              this.closeDialog();
            },
            error: (error) =>
              console.error("Error al guardar las divulgaciones:", error),
          });
        }
      );
    } else {
      this.formSolicitud.markAllAsTouched();
      this.modalSvc.openNotify(
        "Aviso",
        "Debe completar todos los campos requeridos",
        false
      );
    }
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
  closeDialog() {
    this.dialogRef.close();
  }
}

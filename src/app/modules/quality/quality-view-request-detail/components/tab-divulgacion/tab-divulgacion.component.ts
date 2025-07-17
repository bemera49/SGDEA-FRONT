import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
import { DivulgacionesService } from "./services/divulgaciones.service";
import { ModalService } from "@app/services/modal/modal.service";
import { SweetAlertService } from "@app/services/sweet-alert.service";

@Component({
  selector: "app-tab-divulgacion",
  templateUrl: "./tab-divulgacion.component.html",
  styleUrls: ["./tab-divulgacion.component.css"],
})
export class TabDivulgacionComponent implements OnInit {
  formDivulgacion: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private _serviceisclosure: DivulgacionesService,
    private modal: ModalService,
    public sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.formDivulgacion = this.fb.group({
      divulgaciones: this.fb.array([this.createDivulgacion()]),
    });
    this.getDisclosure();
  }

  get divulgaciones(): FormArray {
    return this.formDivulgacion.get("divulgaciones") as FormArray;
  }

  createDivulgacion(): FormGroup {
    return this.fb.group({
      file_date: [""],
      file_file: [null], // Almacenar el archivo seleccionado
      file_observation: [""],
    });
  }

  addDivulgacion(): void {
    this.divulgaciones.push(this.createDivulgacion());
  }

  removeDivulgacion(index: number): void {
    if (this.divulgaciones.length > 1) {
      this.divulgaciones.removeAt(index);
    } else {
      // Puedes mostrar una notificación o alerta si intentan eliminar el último registro
      this.sweetAlertService.showNotification(
        "error",
        "No se puede eliminar el último registro."
      );
    }
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      // Almacenar el archivo en el control "evidecia"
      this.divulgaciones.at(index).get("file_file").setValue(file);
    }
  }

  save(): void {
    if (
      (this.formDivulgacion.get("file_file")?.value !== null &&
        this.formDivulgacion.get("file_date")?.value !== "",
      this.formDivulgacion.get("file_observation")?.value !== "" &&
        this.isValidDate(this.formDivulgacion.get("file_date")?.value))
    ) {
      this.router.paramMap.subscribe((params) => {
        const id = params.get("id"); // Obtener el ID de la solicitud
        const formValue = this.formDivulgacion.value;
        const sgc_solicitud_id = id;
        const cant_files = formValue.divulgaciones.length;

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append("sgc_solicitud_id", sgc_solicitud_id);
        formData.append("cant_files", cant_files.toString());

        // Procesar cada divulgación y agregar archivos a FormData
        const processFiles = async () => {
          const filesPromises = formValue.divulgaciones.map(
            async (divulgacion, index) => {
              if (divulgacion.file_file instanceof File) {
                formData.append(`file_file${index}`, divulgacion.file_file);
              }
              formData.append(
                `file_date${index}`,
                this.formatDate(divulgacion.file_date)
              );
              formData.append(
                `file_observation${index}`,
                divulgacion.file_observation
              );
              formData.append(`file_id${index}`, null);
            }
          );

          await Promise.all(filesPromises);
        };

        processFiles().then(() => {
          this.modal.openAction(
            "",
            "¿Está seguro de la acción a realizar?",
            () => {
              this._serviceisclosure.postDisclosures(formData).subscribe({
                next: (resp) => {
                  this.sweetAlertService.showNotification(
                    "success",
                    "La información ha sido guardada con éxito."
                  );
                  this.modal.openNotify(
                    "",
                    "La información ha sido guardada con éxito.",
                    false
                  );
                },
                error: (error) =>
                  console.error("Error al guardar las divulgaciones:", error),
              });
            }
          );
        });
      });
    } else {
      this.modal.openNotify(
        "",
        "Por favor verifique, datos obligatorios incompletos",
        false
      );
    }
  }

  getDisclosure() {
    this.router.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._serviceisclosure.getDisclosuresById(id).subscribe((resp: any) => {

        if (resp.archivos.length > 0) {
          this.divulgaciones.clear();

          resp.archivos.forEach((element) => {
            const divulgacion = this.createDivulgacion();

            divulgacion.patchValue({
              file_date: element.fecha_divulgacion,
              file_observation: element.observacion,
            });
            divulgacion.disable();
            this.divulgaciones.push(divulgacion);
          });
        }
      });
    });
  }

  formatDate(date: Date): string {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  disabledInputs() {
    this.formDivulgacion.controls["file_observation"].disable();
    this.formDivulgacion.controls["file_file"].disable();
    this.formDivulgacion.controls["file_date"].disable();
  }
}

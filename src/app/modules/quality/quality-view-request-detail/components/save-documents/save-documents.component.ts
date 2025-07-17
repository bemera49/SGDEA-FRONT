import { Component, Input, inject, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalAcceptComponent } from "@app/modules/components/modal-accept/modal-accept.component";
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";
import { ModalService } from "@app/services/modal/modal.service";
import { DocumentFile } from "../../model/view-reques-detail";
import { Proposed } from "./interface/update-documents";
import { UpdateDataService } from "./services/updata-data/update-data.service";
import { ActivatedRoute } from "@angular/router";
import { WaterMarkService } from "@app/services/quality/water-mark.service";
import { ToastService } from "@app/services/toast/toast.service";

@Component({
  selector: "app-save-documents",
  templateUrl: "./save-documents.component.html",
  styleUrls: ["./save-documents.component.css"],
})
export class SaveDocumentsComponent implements OnInit{
  private ud = inject(UpdateDataService);
  private modal = inject(ModalService);
  stateDiagrama = false;
  stateOffice = false;
  stateUpdate = false;
  public isModifiable:boolean = false;
  private dialog = inject(MatDialog);
  @Input() idParam: number = 0;
  @Input() documentoOffice: DocumentFile;
  @Input() documentoDiagram: DocumentFile;
  @Input() idTypeTask: number = 0;

  fileOffice: File | null = null;
  fileDiagram: File | null = null;
  update: Proposed;
  ngOnInit(): void {

    if (this.idTypeTask == 3 || this.idTypeTask ==  19 || this.idTypeTask == 11 ||  this.idTypeTask == 6 || this.idTypeTask == 7 || this.idTypeTask == 13) {
        this.isModifiable = true;
    }
    console.log(this.idParam, this.idTypeTask)
  }
  constructor(private waterMarkSvc:WaterMarkService, private toastSvc:ToastService){}
  parseDateFormData(data: Proposed): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  parseDataProposed(): Proposed {
    const data: Proposed = {
      request_id: this.idParam,
      diagram_file: this.fileDiagram,
      proposed_document: this.fileOffice,
    };

    return data;
  }
  onStateUpdateChange(newState: boolean) {
    console.log("Nuevo estado de actualización:", newState);
    this.stateUpdate = newState;
  }

  updateFiles(office: DocumentFile, diagram: DocumentFile | null): void {
    const dialogRef = this.dialog.open(ModalAcceptComponent, {
      width: "50%",
      data: { paragraph: "El documento ha sido reemplazado" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.documentoOffice = office;
        this.documentoDiagram = diagram;
      }
    });
  }

  finalizeProcess(): void {
    if (this.fileOffice && (this.stateDiagrama || this.stateOffice)) {
      const dialogRef = this.modal.open(ActionModalComponent, {
        title: "",
        description: `¿Esta seguro de la acción al realizar?`,
        onConfirmAction: () => {
          if (this.idTypeTask === 7) {
            this.uploadWaterMarkDoc()
          } else {

          const documents = this.parseDateFormData(this.parseDataProposed());
          this.ud.updateDocumentsProposed(documents).subscribe({
            next: (res) => {
              if (res.status) {
                const documents = res.data;
                this.updateFiles(
                  documents.proposed_file,
                  documents.diagram_file
                  );
                }
              },
            });
          }
        },
      });

      // Esperamos a que el modal se cierre para ver qué decidió el usuario
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);

        if (
          result === "confirm" &&
          dialogRef.componentInstance.data.onConfirmAction
        ) {
          // Si el usuario confirmó, ejecutamos la acción de confirmación
          dialogRef.componentInstance.data.onConfirmAction();
          window.location.reload();
        }
      });
    }
  }

  onSubmit(): void {
    this.finalizeProcess();
  }

  uploadWaterMarkDoc(){
    const fd = new FormData();
    fd.append('id', this.idParam.toString());
    fd.append('proposed_document', this.fileOffice)

    this.waterMarkSvc.uploadWaterMarkDoc(fd)
      .subscribe({
        error: (err: any) => {
          console.log(err);
          this.toastSvc.open({
            description: err.error.message,
            success: false,
            duration: 3000,
            title: ''
          });
        },
        next: (resp: any) => {
          this.toastSvc.open({
            description: resp.message,
            success: false,
            duration: 3000,
            title: ''
          });
          console.log(resp);
        }
      })

  }
}

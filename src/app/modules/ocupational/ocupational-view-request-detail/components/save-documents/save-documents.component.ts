import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { DocumentFile } from '../../model/view-reques-detail';
import { Proposed } from './interface/update-documents';
import { UpdateDataService } from './services/updata-data/update-data.service';

@Component({
  selector: 'app-save-documents',
  templateUrl: './save-documents.component.html',
  styleUrls: ['./save-documents.component.css']
})
export class SaveDocumentsComponent {

  private ud = inject(UpdateDataService);
  private modal = inject(ModalService);
  stateDiagrama = false;
  stateOffice = false;

  private dialog = inject(MatDialog);
  @Input() idParam: number = 0;
  @Input() documentoOffice: DocumentFile;
  @Input() documentoDiagram: DocumentFile;



  fileOffice: File | null = null;
  fileDiagram: File | null = null;
  update: Proposed;

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
      proposed_document: this.fileOffice
    }

    return data;
  }


  updateFiles(office: DocumentFile, diagram: DocumentFile | null): void {

    const dialogRef = this.dialog.open(ModalAcceptComponent, {
      width: '50%',
      data: { paragraph: 'El documento ha sido reemplazado' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentoOffice = office;
        this.documentoDiagram = diagram;
      }
    });

  }


  finalizeProcess(): void {
    if (this.fileOffice && (this.stateDiagrama || this.stateOffice)) {
      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '',
        description: `¿Esta seguro de la acción al realizar?`,
        onConfirmAction: () => {
          const documents = this.parseDateFormData(this.parseDataProposed());
          this.ud.updateDocumentsProposed(documents).subscribe({
            next: (res) => {
              if (res.status) {
                const documents = res.data;
                this.updateFiles(documents.proposed_file, documents.diagram_file);
              }
            }
          });

        },
      });

      // Esperamos a que el modal se cierre para ver qué decidió el usuario
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
          // Si el usuario confirmó, ejecutamos la acción de confirmación
          dialogRef.componentInstance.data.onConfirmAction();
        }
      });

    }

  }

  onSubmit(): void {

    this.finalizeProcess();

  }
}

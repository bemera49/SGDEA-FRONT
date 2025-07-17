import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { TypeDocuments } from "@app/modules/quality/enum/type.documents";
import {
  MessageError,
  ValidateFileService,
} from "@app/modules/quality/quality-create-request/services/validate-file.service";
import { ToastService } from "@app/services/toast/toast.service";
import { DocumentFile } from "../../model/view-reques-detail";
import { RequestDetailService } from "../../services/request-detail/request-detail.service";
import { DocumentService } from "@app/services/quality/document.service";
import {
  Proposed,
  UploadDocument,
} from "../save-documents/interface/update-documents";

enum formatFile {
  VX = "vx",
  OFFICE = "office",
}

@Component({
  selector: "app-document-modifiable",
  templateUrl: "./document-modifiable.component.html",
  styleUrls: ["./document-modifiable.component.css"],
})
export class DocumentModifiableComponent {
  @Input() title: string;
  @Input() document: DocumentFile;
  // valida el formato del documento vision(vx)  o w,e,p(office)
  @Input() acceptFile: string;
  @Input() valueFile: File | null;
  @Input() stateDownload: boolean = true;
  stateUpdate: boolean = true;
  @Input() idTask: number = 0;
  @Input() isModifiable:boolean = false;

  @Output() valueFileChange = new EventEmitter<File>();
  @Output() stateDownloadChange = new EventEmitter<boolean>();
  @Output() stateUpdateChange = new EventEmitter<boolean>();

  private vf = inject(ValidateFileService);
  private toast = inject(ToastService);
  private _documentService = inject(DocumentService);
  view_atachment = false;

  typeDocument = TypeDocuments;
  downloadCount = 0;

  constructor(private requestSC: RequestDetailService) {}

  private updateFile(file: File): void {
    this.valueFile = file;
    if (this.idTask == 19 || this.view_atachment) {
      this.uploadDocument(this.valueFile, this.document.id);
      this.stateUpdate = this.view_atachment;
      this.stateUpdateChange.emit(this.stateUpdate);
    }
    this.valueFileChange.emit(this.valueFile);
  }


  private changeStateDownload(): void {
    this.stateDownload = true;
    this.stateDownloadChange.emit(this.stateDownload);
  }

  downloadFile() {
    if (this.downloadCount <= 3) {
      this.requestSC.downloadFile(this.document.id).subscribe({
        next: (item: Blob) => {
          console.log(item);
          this.view_atachment = true;
          this.saveFile(item);
          this.downloadCount++;
          this.changeStateDownload();
        },
        error: (err) => {
          this.toast.open({
            title: "Error",
            description: "No se pudo descargar el archivo",
          });
        },
      });
    }
  }

  uploadFile(event: Event): void {

    const file = (event.target as HTMLInputElement).files[0];
    let validateTypes: MessageError;

    if (this.acceptFile === formatFile.VX) {
      validateTypes = this.vf.validateFileTypesDiagram(file);
    }

    if (this.acceptFile === formatFile.OFFICE) {
      validateTypes = this.vf.validateFileTypes(file);
    }

    this.vf
      .validateCorrupt(file)
      .then((response) => {
        console.log(response);
        if (response.status) {
          this.toast.open({
            title: response.num,
            description: response.message,
          });
        }

        if (!validateTypes.status) {
          this.toast.open({
            title: validateTypes.num,
            description: validateTypes.message,
          });
        }

        if (!response.status && validateTypes.status) {
          this.updateFile(file);
        }
      })
      .catch((err) => {
        this.toast.open({
          title: err.num,
          description: err.message,
        });
      });
  }

  private saveFile(blob: Blob): void {
    const downloadLink = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = this.document.original_name; // Nombre del archivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }

  parseDateFormData(data: UploadDocument): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  uploadDocument(file: File, id: number) {
    const data = {
      file: file,
    };

    const documents = this.parseDateFormData(data);
    this._documentService.uploadDocument(documents, id).subscribe({
      next: (res) => {
        this.stateUpdate = true;
        console.log(res, "res al succes");
        this.document.original_name = file.name;
        this.toast.open({
          title: "087",
          description: "El documento ha sido remplazado",
        });
      },
    });
  }
}

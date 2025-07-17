import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TypeDocuments } from '@app/modules/quality/enum/type.documents';
import { MessageError, ValidateFileService } from '@app/modules/quality/quality-create-request/services/validate-file.service';
import { ToastService } from '@app/services/toast/toast.service';
import { DocumentFile } from '../../model/view-reques-detail';
import { RequestDetailService } from '../../services/notification-detail/notification-detail.service';

enum formatFile {
  VX = "vx",
  OFFICE = 'office'
}


@Component({
  selector: 'app-document-modifiable',
  templateUrl: './document-modifiable.component.html',
  styleUrls: ['./document-modifiable.component.css']
})

export class DocumentModifiableComponent {
  @Input() title: string;
  @Input() document: DocumentFile;
  // valida el formato del documento vision(vx)  o w,e,p(office)
  @Input() acceptFile: string;
  @Input() valueFile: File | null;
  @Input() stateDownload: boolean = false;

  @Output() valueFileChange = new EventEmitter<File>();
  @Output() stateDownloadChange = new EventEmitter<boolean>()

  private vf = inject(ValidateFileService);
  private toast = inject(ToastService);

  typeDocument = TypeDocuments;
  downloadCount = 0;

  private requestSC = inject(RequestDetailService);

  private updateFile(file: File): void {
    this.valueFile = file;
    this.valueFileChange.emit(this.valueFile);
  }

  private changeStateDownload(): void {
    this.stateDownload = true;
    this.stateDownloadChange.emit(this.stateDownload);
  }

  downloadFile(): void {
    if (this.downloadCount <= 3) {
      this.requestSC.downloadFile(this.document.id).subscribe(item => {
        this.saveFile(item);
        this.downloadCount++;
        this.changeStateDownload();
      })
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

    this.vf.validateCorrupt(file)
      .then(response => {

        if (response.status) {
          this.toast.open({
            title: response.num,
            description: response.message,
          })
        }

        if (!validateTypes.status) {
          this.toast.open({
            title: validateTypes.num,
            description: validateTypes.message,
          })
        }

        if (!response.status && validateTypes.status) {
          this.updateFile(file);
        }

      }).catch(err => {

        this.toast.open({
          title: err.num,
          description: err.message,
        })
      })

  }

  private saveFile(blob: Blob): void {
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = this.document.original_name; // Nombre del archivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }

}

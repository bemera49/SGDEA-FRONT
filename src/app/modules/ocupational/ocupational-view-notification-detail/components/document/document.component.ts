import { Component, Input, inject } from '@angular/core';
import { TypeDocuments } from '@app/modules/quality/enum/type.documents';
import { RequestDetailService } from '../../services/notification-detail/notification-detail.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  @Input() title!: string;
  @Input() nameDocument!: string;
  @Input() idDocument!: number;
  @Input() typeDoc!: string;
  private requestSC = inject(RequestDetailService);
  typeDocument = TypeDocuments;

  downloadFile(): void {
    if (this.idDocument) {
      this.requestSC.downloadFile(this.idDocument).subscribe(item => {
        this.saveFile(item);
      })
    }
  }

  private saveFile(blob: Blob): void {
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = this.nameDocument; // Nombre del archivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }
}

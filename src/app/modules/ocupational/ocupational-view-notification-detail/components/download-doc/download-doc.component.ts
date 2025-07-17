import { Component, Input, inject } from '@angular/core';
import { RequestDetailService } from '../../services/notification-detail/notification-detail.service';

@Component({
  selector: 'app-download-doc',
  templateUrl: './download-doc.component.html',
  styleUrls: ['./download-doc.component.css']
})
export class DownloadDocComponent {

  private requestSC = inject(RequestDetailService);
  @Input() fileDoc!: any;
  @Input() idDoc!: number;



  downloadFile(): void {
    this.requestSC.downloadFile(this.idDoc).subscribe(item => {
      this.saveFile(item);
    })
  }

  private saveFile(blob: Blob): void {
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = this.fileDoc.original_name; // Nombre del archivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }

}

import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalMap } from './model/modal-map';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.css']
})
export class ModalMapComponent {
  private sanitizer = inject(DomSanitizer);
  safe: SafeResourceUrl;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalMap) {
    this.safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);

  }
}

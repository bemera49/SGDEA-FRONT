import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-redirect',
  templateUrl: './modal-redirect.component.html',
  styleUrls: ['./modal-redirect.component.css']
})
export class ModalRedirectComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

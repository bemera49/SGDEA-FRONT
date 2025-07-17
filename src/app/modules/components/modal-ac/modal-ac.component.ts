import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


/* modal con botones aceptar y cancelar*/

@Component({
  selector: 'app-modal-ac',
  templateUrl: './modal-ac.component.html',
  styleUrls: ['./modal-ac.component.css']
})
export class ModalACComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    paragraph: string,
    img: string
  }) { }

}

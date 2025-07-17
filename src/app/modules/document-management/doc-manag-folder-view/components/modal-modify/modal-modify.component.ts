import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-modify',
  templateUrl: './modal-modify.component.html',
  styleUrls: ['./modal-modify.component.css']
})
export class ModalModifyComponent {

  valueTextArea = "";

  formTextAre = new FormGroup({
    justificacion: new FormControl("", Validators.required)
  })


  onSubmit(): void {
    
  }
}

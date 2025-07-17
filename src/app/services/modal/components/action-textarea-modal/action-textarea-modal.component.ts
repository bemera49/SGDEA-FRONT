import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';
import { ModalService } from '../../modal.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-action-textarea-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './action-textarea-modal.component.html',
  styleUrls: ['./action-textarea-modal.component.css']
})
export class ActionTextareaModalComponent implements OnInit {

  constructor(
    public toast$: ToastService,
    public modal$: ModalService,
    public dialogRef: MatDialogRef<ActionTextareaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ){
    if(this.data.btnCancelIsHide == undefined)
    {
      this.data.btnCancelIsHide = false;
    }

    if(this.data.showIcon == undefined)
      {
        this.data.showIcon = 'help';
      }
  }
  //dataModal = this.data

  public form = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    
  }

  handleSubmit() {
    this.dialogRef.close(this.form.get('textarea')?.value)
  }

  close() {
    this.dialogRef.close(null); 

}
}

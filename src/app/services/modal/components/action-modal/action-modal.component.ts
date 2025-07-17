import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  handleSubmit() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close()
  }

}

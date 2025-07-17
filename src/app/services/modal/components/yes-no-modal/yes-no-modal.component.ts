import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class YesNoModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<YesNoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  dataModal = this.data

  handleSubmit(){
    this.dialogRef.close('confirm');
    this.data.void()
  }

  close(){
    this.dialogRef.close()
  }

}

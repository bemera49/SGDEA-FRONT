// @ts-nocheck

import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notify-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.css']
})
export class NotifyModalComponent {

  constructor(
    public dialogRef: MatDialogRef<NotifyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){} 

  dataModal = this.data

  close(){
    this.dialogRef.close()
    // @ts-ignore
    this.dataModal?.void()
  }

}

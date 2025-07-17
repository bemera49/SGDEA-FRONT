import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aprobar-pqrs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprobar-pqrs.component.html',
  styleUrls: ['./aprobar-pqrs.component.css']
})
export class AprobarPqrsComponent {

  constructor(
    public dialogRef: MatDialogRef<AprobarPqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){} 

  dataModal = this.data

  close(){
    this.dialogRef.close()
  }

  accept() {
    this.dialogRef.close()
    this.dataModal.void()   
  }

}

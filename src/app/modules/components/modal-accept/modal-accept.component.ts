import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-accept',
  templateUrl: './modal-accept.component.html',
  styleUrls: ['./modal-accept.component.css']
})
export class ModalAcceptComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { paragraph: string },
    public dialogRef: MatDialogRef<ModalAcceptComponent>
  ) { }

  close(): void {
    this.dialogRef.close(true);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFileExpComponent } from './components/dialog-file-exp/dialog-file-exp.component';

@Component({
  selector: 'app-include-file-exp',
  templateUrl: './include-file-exp.component.html',
  styleUrls: ['./include-file-exp.component.css']
})
export class IncludeFileExpComponent implements OnInit {
  @Output() public closeIncludeInFileEmiter = new EventEmitter<any>();
  @Input() eventClickButtonSelectedData: any = [];
  @Input() confirmTitle: string;

  widthDialog = '95%';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log('Confirm Title in IncludeFileExpComponent:', this.confirmTitle);  // Verifica que el valor no es undefined
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFileExpComponent, {
      disableClose: false,
      width: this.widthDialog,
      data: {
        eventClickButtonSelectedData: this.eventClickButtonSelectedData,
        confirmTitle: this.confirmTitle  // Asegúrate de que se está pasando confirmTitle aquí
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      let respuesta = res;
      if (!respuesta) {
        respuesta = { event: 'close', status: false, data: [] };
      }
      this.closeComponent(respuesta);
    });
  }

  closeComponent(respuesta) {
    this.closeIncludeInFileEmiter.emit(respuesta);
  }
}

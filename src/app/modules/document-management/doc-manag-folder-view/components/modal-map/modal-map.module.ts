import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMapComponent } from './modal-map.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ModalMapComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[ModalMapComponent]
})
export class ModalMapModule { }

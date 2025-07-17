import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalDeleteComponent } from './modal-delete.component';
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  declarations: [
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ModalDeleteComponent]
})
export class ModalDeleteModule { }

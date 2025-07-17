import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogModule } from '@angular/material/dialog';
import { ModalFileComponent } from './modal-file.component';
import { TableFileModule } from '../table-file/table-file.module';

@NgModule({
  declarations: [
    ModalFileComponent,
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TableFileModule
  ],
  exports: [ModalFileComponent]
})
export class ModalFileModule { }

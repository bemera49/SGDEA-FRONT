import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFileComponent } from './table-file.component';



@NgModule({
  declarations: [
    TableFileComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[TableFileComponent]
})
export class TableFileModule { }

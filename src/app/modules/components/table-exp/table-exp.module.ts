import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableExpComponent } from './table-exp.component';


@NgModule({
  declarations: [
    TableExpComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [TableExpComponent]
})
export class TableExpModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableRequestComponent } from './table-request.component';

import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component'

@NgModule({
  declarations: [TableRequestComponent],
  imports: [
    PaginationComponent, //test
    CommonModule,
    MatTableModule
  ],
  exports: [TableRequestComponent]
})
export class TableRequestModule { }

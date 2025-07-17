import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableTraceabilitysComponent } from './table-traceabilitys.component';

import { PaginatorModule } from 'src/app/modules/quality/quality-view-request/components/paginator/paginator.module';

//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [TableTraceabilitysComponent],
  imports: [
    PaginationComponent, //test
    CommonModule,
    MatTableModule,
    PaginatorModule,
    FormsModule
  ],
  exports: [TableTraceabilitysComponent],

})
export class TableTraceabilitysModule { }

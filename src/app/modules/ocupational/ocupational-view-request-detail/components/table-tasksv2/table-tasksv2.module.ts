import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableTasksv2Component } from './table-tasksv2.component';

//import { PaginatorModule } from 'src/app/modules/quality/quality-view-request/components/paginator/paginator.module';

//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';

@NgModule({
  declarations: [TableTasksv2Component],
  imports: [
    PaginationComponent, //test
    CommonModule,
    MatTableModule,
    //PaginatorModule
  ],
  exports: [TableTasksv2Component],

})
export class TableTasksv2Module { }

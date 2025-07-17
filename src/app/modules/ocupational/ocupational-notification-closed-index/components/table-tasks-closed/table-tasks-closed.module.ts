import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableTasksClosedComponent } from './table-tasks-closed.component';

//import { PaginatorModule } from 'src/app/modules/quality/quality-view-request/components/paginator/paginator.module';

//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';

@NgModule({
  declarations: [TableTasksClosedComponent],
  imports: [
    PaginationComponent, //test
    CommonModule,
    MatTableModule,
    //PaginatorModule
  ],
  exports: [TableTasksClosedComponent],

})
export class TableTasksClosedModule { }

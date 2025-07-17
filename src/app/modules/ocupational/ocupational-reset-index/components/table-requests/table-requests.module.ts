import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableRequestComponent } from './table-requests.component';

//import { PaginatorModule } from 'src/app/modules/quality/quality-view-request/components/paginator/paginator.module';

//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';

@NgModule({
  declarations: [TableRequestComponent],
  imports: [
    PaginationComponent, //test
    CommonModule,
    MatTableModule,
    //PaginatorModule
  ],
  exports: [TableRequestComponent],

})
export class TableRequestModule { }

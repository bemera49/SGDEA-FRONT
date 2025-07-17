import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CleanNameModule } from '@app/modules/quality/pipes/clean-name/clean-name.module';
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';
import { TableProcessTreeComponent } from './table-process-tree.component';

@NgModule({
  declarations: [
    TableProcessTreeComponent
  ],
  imports: [
    CommonModule,
    CleanNameModule,
    PaginationComponent
  ],
  exports: [TableProcessTreeComponent]
})
export class TableProcessTreeModule { }

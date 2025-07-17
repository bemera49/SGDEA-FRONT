import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from '@app/modules/components/table/pagination/pagination-component/pagination.component';
import { TraceabilityTableComponent } from './traceability-table.component';

@NgModule({
  declarations: [
    TraceabilityTableComponent
  ],
  imports: [
    CommonModule,
    PaginationComponent,
  ],
  exports: [TraceabilityTableComponent]
})
export class TraceabilityTableModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestStatusModule } from '@app/modules/quality/quality-view-request-detail/components/request-status/request-status.module';
import { FiltersViewRequestModule } from '../filters-view-request/filters-view-request.module';

import { ToastQualityModule } from '../toast-quality/toast-quality.module';
import { TableRequestComponent } from './table-request.component';


import { PaginationComponent } from '@app/modules/components/table/pagination/pagination-component/pagination.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    TableRequestComponent],
  imports: [
    DropdownModule,
    ButtonModule,
    CommonModule,
    FiltersViewRequestModule,
    RouterModule,
    RequestStatusModule,
    ToastQualityModule,
    PaginationComponent

  ],
  exports: [TableRequestComponent]
})
export class TableRequestModule { }

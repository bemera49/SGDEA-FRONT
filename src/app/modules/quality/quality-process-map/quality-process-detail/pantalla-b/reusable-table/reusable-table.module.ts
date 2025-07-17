import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReusableTableComponent } from './reusable-table.component';


@NgModule({
  declarations: [ReusableTableComponent],
  imports: [
    CommonModule
  ],
  exports: [ReusableTableComponent]
})
export class ReusableTableModule { }

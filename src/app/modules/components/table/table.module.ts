import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { CanDirective } from '@app/directives/can.directive';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CanDirective
  ]
})
export class TableModule { }

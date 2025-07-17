import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RowInformationComponent } from './row-information.component';
@NgModule({
  declarations: [RowInformationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RowInformationComponent]
})
export class RowInformationModule { }

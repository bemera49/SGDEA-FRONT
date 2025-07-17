import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectMultipleFilesComponent } from './select-multiple-files.component';
@NgModule({
  declarations: [SelectMultipleFilesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SelectMultipleFilesComponent]
})
export class SelectMultipleFilesModule { }

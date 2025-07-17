import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMultipleFilesComponent } from './input-multiple-files.component';


@NgModule({
  declarations: [InputMultipleFilesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputMultipleFilesComponent]
})
export class InputMultipleFilesModule { }

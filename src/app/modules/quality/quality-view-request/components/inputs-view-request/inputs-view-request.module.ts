import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsViewRequestComponent } from './inputs-view-request.component';

@NgModule({
  declarations: [InputsViewRequestComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputsViewRequestComponent]
})
export class InputsViewRequestModule { }

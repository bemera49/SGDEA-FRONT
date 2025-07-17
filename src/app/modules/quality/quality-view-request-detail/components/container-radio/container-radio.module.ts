import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ContainerRadioComponent } from './container-radio.component';


@NgModule({
  declarations: [ContainerRadioComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  exports: [ContainerRadioComponent]
})
export class ContainerRadioModule { }

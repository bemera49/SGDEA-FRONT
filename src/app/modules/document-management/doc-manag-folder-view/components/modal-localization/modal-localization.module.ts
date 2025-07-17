import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalLocalizationComponent } from './modal-localization.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ModalLocalizationComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ModalLocalizationComponent]
})
export class ModalLocalizationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRedirectComponent } from './modal-redirect.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ModalRedirectComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[ModalRedirectComponent]
})
export class ModalRedirectModule { }

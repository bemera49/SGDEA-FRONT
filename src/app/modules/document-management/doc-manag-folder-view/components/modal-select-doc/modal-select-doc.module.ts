import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalSelectDocComponent } from './modal-select-doc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalDocInfoModule } from '../modal-doc-info/modal-doc-info.module';
import { ModalUploadDocumentModule } from '../modal-upload-document/modal-upload-document.module';


@NgModule({
  declarations: [ModalSelectDocComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    ModalDocInfoModule,
    ModalUploadDocumentModule
  ],
  exports: [ModalSelectDocComponent]
})
export class ModalSelectDocModule { }

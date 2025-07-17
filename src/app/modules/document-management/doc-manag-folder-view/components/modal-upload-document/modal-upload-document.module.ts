import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ModalDocInfoModule } from '../modal-doc-info/modal-doc-info.module';
import { ModalUploadDocumentComponent } from './modal-upload-document.component';

@NgModule({
  declarations: [
    ModalUploadDocumentComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ModalDocInfoModule
  ],
  exports: [ModalUploadDocumentComponent]
})
export class ModalUploadDocumentModule { }

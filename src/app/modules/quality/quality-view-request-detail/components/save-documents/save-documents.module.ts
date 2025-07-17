import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { DocumentModifiableModule } from '../document-modifiable/document-modifiable.module';
import { SaveDocumentsComponent } from './save-documents.component';
@NgModule({
  declarations: [SaveDocumentsComponent],
  imports: [
    CommonModule,
    DocumentModifiableModule,
    ButtonContinueModule,
    FormsModule
  ],
  exports: [SaveDocumentsComponent]
})
export class SaveDocumentsModule { }

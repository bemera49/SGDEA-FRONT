import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableDocumentsComponent } from './table-documents.component';
import { CleanNameModule } from '@app/modules/quality/pipes/clean-name/clean-name.module';


@NgModule({
  declarations: [
    TableDocumentsComponent
  ],
  imports: [
    CommonModule,
    CleanNameModule
  ],
  exports: [TableDocumentsComponent]
})
export class TableDocumentsModule { }

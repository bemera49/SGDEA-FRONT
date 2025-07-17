import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchDocumentComponent } from './search-document.component';
import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
  declarations: [SearchDocumentComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [SearchDocumentComponent]
})
export class SearchDocumentModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DocumentModifiableComponent } from './document-modifiable.component';

@NgModule({
  declarations: [DocumentModifiableComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [DocumentModifiableComponent]
})
export class DocumentModifiableModule { }

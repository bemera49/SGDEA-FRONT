import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentComponent } from './document.component';


@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule
  ],
  exports: [DocumentComponent]
})

export class DocumentModule { }

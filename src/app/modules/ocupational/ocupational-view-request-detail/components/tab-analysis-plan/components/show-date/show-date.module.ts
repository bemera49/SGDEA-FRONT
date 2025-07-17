import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ShowDateComponent } from './show-date.component';

@NgModule({
  declarations: [ShowDateComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ShowDateComponent]
})
export class ShowDateModule { }

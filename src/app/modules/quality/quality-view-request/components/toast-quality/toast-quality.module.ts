import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastQualityComponent } from './toast-quality.component';

@NgModule({
  declarations: [ToastQualityComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ToastQualityComponent]
})
export class ToastQualityModule { }

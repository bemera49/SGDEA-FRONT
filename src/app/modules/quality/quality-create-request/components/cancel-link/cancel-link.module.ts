import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CancelLinkComponent } from './cancel-link.component';

@NgModule({
  declarations: [CancelLinkComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CancelLinkComponent]
})
export class CancelLinkModule { }

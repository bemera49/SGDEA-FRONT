import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RequestStatusComponent } from './request-status.component';


@NgModule({
  declarations: [RequestStatusComponent],
  imports: [
    CommonModule
  ],
  exports: [RequestStatusComponent]
})
export class RequestStatusModule { }

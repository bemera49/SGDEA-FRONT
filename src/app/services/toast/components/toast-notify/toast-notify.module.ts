import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotifyComponent } from './toast-notify.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    ToastNotifyComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ], 
  exports: [
    ToastNotifyComponent
  ]
})
export class ToastNotifyModule { }

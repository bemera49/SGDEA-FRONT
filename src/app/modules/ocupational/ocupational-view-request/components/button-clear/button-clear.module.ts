import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonClearComponent } from './button-clear.component';

@NgModule({
  declarations: [ButtonClearComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [ButtonClearComponent]
})
export class ButtonClearModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CanDirective } from '@app/directives/can.directive';
import { ButtonFilterComponent } from './button-filter.component';

@NgModule({
  declarations: [ButtonFilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    CanDirective
  ],
  exports: [ButtonFilterComponent]
})
export class ButtonFilterModule { }

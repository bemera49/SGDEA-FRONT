import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubMenuOcupationalComponent } from './sub-menu-ocupational.component';
@NgModule({
  declarations: [SubMenuOcupationalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SubMenuOcupationalComponent]
})
export class SubMenuOcupationalModule { }

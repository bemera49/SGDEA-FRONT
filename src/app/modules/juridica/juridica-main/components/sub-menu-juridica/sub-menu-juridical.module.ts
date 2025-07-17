import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubMenuJuridicalComponent } from './sub-menu-juridical.component';

@NgModule({
  declarations: [SubMenuJuridicalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SubMenuJuridicalComponent]
})
export class SubMenuJuridicalModule { }

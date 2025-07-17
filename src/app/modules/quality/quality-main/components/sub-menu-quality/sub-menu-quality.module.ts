import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubMenuQualityComponent } from './sub-menu-quality.component';
@NgModule({
  declarations: [SubMenuQualityComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SubMenuQualityComponent]
})
export class SubMenuQualityModule { }

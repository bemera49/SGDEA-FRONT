import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutSectionComponent } from './layout-section.component';


@NgModule({
  declarations: [LayoutSectionComponent],
  imports: [
    CommonModule
  ],
  exports: [LayoutSectionComponent]
})
export class LayoutSectionModule { }

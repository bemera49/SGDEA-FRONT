import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlternateViewOneComponent } from './alternate-view-one.component';



@NgModule({
  declarations: [
    AlternateViewOneComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlternateViewOneComponent]
})
export class AlternateViewOneModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeProcessModule } from '../tree-process/tree-process.module';
import { ScreenOneComponent } from './screen-one.component';  


@NgModule({
  declarations: [
    ScreenOneComponent
  ],
  imports: [
    CommonModule,
    TreeProcessModule
  ],
  exports: [ScreenOneComponent]
})
export class ScreenOneModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CleanNameModule } from '@app/modules/quality/pipes/clean-name/clean-name.module';
import { TreeProcessComponent } from './tree-process.component';


@NgModule({
  declarations: [
    TreeProcessComponent
  ],
  imports: [
    CommonModule,
    CleanNameModule
  ],
  exports: [TreeProcessComponent]
})
export class TreeProcessModule { }

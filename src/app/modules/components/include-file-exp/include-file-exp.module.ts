import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogFileExpModule } from './components/dialog-file-exp/dialog-file-exp.module';
import { IncludeFileExpComponent } from './include-file-exp.component';

@NgModule({
  declarations: [
    IncludeFileExpComponent
  ],
  imports: [
    CommonModule,
    DialogFileExpModule
  ],
  exports: [IncludeFileExpComponent]
})
export class IncludeFileExpModule { }

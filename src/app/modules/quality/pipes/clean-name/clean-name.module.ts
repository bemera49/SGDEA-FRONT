import { NgModule } from '@angular/core';
import { CleanNamePipe } from './clean-name.pipe';



@NgModule({
  declarations: [
    CleanNamePipe
  ],
  exports: [CleanNamePipe]
})
export class CleanNameModule { }

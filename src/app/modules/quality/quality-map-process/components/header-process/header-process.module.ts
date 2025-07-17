import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CleanNameModule } from '@app/modules/quality/pipes/clean-name/clean-name.module';
import { HeaderProcessComponent } from './header-process.component';


@NgModule({
  declarations: [
    HeaderProcessComponent
  ],
  imports: [
    CommonModule,
    CleanNameModule
  ],
  exports: [HeaderProcessComponent]
})

export class HeaderProcessModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScreenOneModule } from './components/screen-one/screen-one.module'; 
import { ScreenTwoModule } from './components/screen-two/screen-two.module';
import { QualityMapProcessComponent } from './quality-map-process.component'; 

@NgModule({
  declarations: [
    QualityMapProcessComponent
  ],
  imports: [
    CommonModule,
    ScreenOneModule,
    ScreenTwoModule
  ],
  exports: [QualityMapProcessComponent]
})
export class QualityMapProcessModule { }

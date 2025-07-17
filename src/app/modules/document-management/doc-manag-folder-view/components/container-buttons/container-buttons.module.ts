import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContainerButtonsComponent } from './container-buttons.component';


@NgModule({
  declarations: [
    ContainerButtonsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [ContainerButtonsComponent]
})
export class ContainerButtonsModule { }

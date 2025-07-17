import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { TreeProcessComponent } from './tree-process.component';


@NgModule({
  declarations: [TreeProcessComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [TreeProcessComponent]
})
export class TreeProcessModule { }

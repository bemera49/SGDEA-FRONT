import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutSectionModule } from '../layout-section/layout-section.module';
import { ValidacionesDGCPComponent } from './validaciones-dgcp.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ValidacionesDGCPComponent],
  imports: [
    CommonModule,
    LayoutSectionModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,

  ],
  exports: [ValidacionesDGCPComponent]
})
export class ValidacionesDGCPModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';
import { LayoutSectionModule } from '@app/modules/quality/quality-view-request-detail/components/layout-section/layout-section.module';
import { ButtonContinueModule } from '../button-continue/button-continue.module';
import { InputMultipleFilesModule } from '../input-multiple-files/input-multiple-files.module';
import { SelectMultipleFilesModule } from '../select-multiple-files/select-multiple-files.module';
import { MultiFilesComponent } from './multi-files.component';
@NgModule({
  declarations: [MultiFilesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputMultipleFilesModule,
    SelectMultipleFilesModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MaterialModule,
    ButtonContinueModule,
    LayoutSectionModule
  ],
  exports: [MultiFilesComponent]
})
export class MultiFilesModule { }

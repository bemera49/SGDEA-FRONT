import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';
import { SortAlphabeticalModule } from '@app/modules/quality/pipes/sort-alphabetical/sort-alphabetical.module';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { TableARItemsModule } from '../table-ar-items/table-ar-items.module';
import { ContainerFormTableComponent } from './container-form-table.component';

@NgModule({
  declarations: [ContainerFormTableComponent],
  imports: [
    CommonModule,
    TableARItemsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonContinueModule,
    MatSelectModule,
    MatFormFieldModule,
    MaterialModule,
    SortAlphabeticalModule
  ],
  exports: [ContainerFormTableComponent]
})
export class ContainerFormTableModule { }

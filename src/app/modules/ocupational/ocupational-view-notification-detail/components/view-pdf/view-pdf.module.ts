import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { SortAlphabeticalModule } from '@app/modules/quality/pipes/sort-alphabetical/sort-alphabetical.module';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { LayoutSectionModule } from '../layout-section/layout-section.module';
import { TableARItemsModule } from '../table-ar-items/table-ar-items.module';
import { TableTabMeetingsModule } from '../table-tab-meetings/table-tab-meetings.module';
//import { TraceabilityTableModule } from './components/traceability-table/traceability-table.module';
import { ViewPdfFileComponent } from './view-pdf.component';
@NgModule({
  declarations: [ViewPdfFileComponent],
  imports: [
    CommonModule,
    LayoutSectionModule,
    TableTabMeetingsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    TableARItemsModule,
    MatSelectModule,
    MaterialModule,
    MatDatepickerModule,
    ButtonContinueModule,
    MatAutocompleteModule,
    SortAlphabeticalModule,
    MatChipsModule,
    //TraceabilityTableModule,
    FormsModule,
  ],
  exports: []
})

export class ViewPdfFileModule { }

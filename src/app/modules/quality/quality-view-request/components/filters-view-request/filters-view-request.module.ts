import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';
import { SortAlphabeticalModule } from '@app/modules/quality/pipes/sort-alphabetical/sort-alphabetical.module';
import { ButtonClearModule } from '../button-clear/button-clear.module';
import { ButtonFilterModule } from '../button-filter/button-filter.module';
import { InputsViewRequestModule } from '../inputs-view-request/inputs-view-request.module';
import { ToastQualityModule } from '../toast-quality/toast-quality.module';
import { FiltersViewRequestComponent } from './filters-view-request.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [FiltersViewRequestComponent],
  imports: [
    CommonModule,
    InputsViewRequestModule,
    ReactiveFormsModule,
    ToastQualityModule,
    ButtonClearModule,
    ButtonFilterModule,
    MatFormFieldModule,
    MatSelectModule,
    MaterialModule,
    MatDatepickerModule,
    SortAlphabeticalModule
  ],

  exports: [FiltersViewRequestComponent],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class FiltersViewRequestModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EFilingMainComponent } from './e-filing-main/e-filing-main.component';
import { EFilingRoutingModule } from './e-filing-routing.module';
import { EFilingIndexComponent } from './e-filing-index/e-filing-index.component';
import { MaterialModule } from '@app/app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { ComponentsModule } from '../components/components.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { EFilingFormComponent } from './e-filing-form/e-filing-form.component';


@NgModule({
  declarations: [
    EFilingMainComponent,
    EFilingIndexComponent,
    EFilingFormComponent
  ],
  imports: [
    CommonModule,
    EFilingRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    /**
     * Modulos
     */
    AdminLayoutModule,
    ComponentsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgxMaterialTimepickerModule,
    BreadcrumbComponent
  ],
  providers: [BnNgIdleService]
})
export class EFilingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredialRoutingModule } from './predial-routing.module';
import { MaterialModule } from '@app/app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { ComponentsModule } from '../components/components.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { TableComponent } from '../components/table/table.component';
import { CanDirective } from '@app/directives/can.directive';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { SgdaEditorComponent } from '../components/sgda-editor/sgda-editor.component';
import { PredialCreateRequestComponent } from './predial-create-request/predial-create-request.component';
import { PredialMainComponent } from './predial-main/predial-main.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { LayoutSectionComponent } from './components/layout-section/layout-section.component';


@NgModule({
  declarations: [
    PredialMainComponent,
    PredialCreateRequestComponent,
    LayoutSectionComponent,
  ],
  imports: [
    CommonModule,
    CanDirective,
    PredialRoutingModule,
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
    BreadcrumbComponent,
    TableComponent,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    SgdaEditorComponent
  ],
  providers: [BnNgIdleService]
})
export class PredialModule { }

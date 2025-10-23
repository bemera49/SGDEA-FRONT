import {
  MAT_DATETIME_FORMATS,
  MatDatetimepickerModule,
} from "@mat-datetimepicker/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CanDirective } from "@app/directives/can.directive";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BnNgIdleService } from "bn-ng-idle";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MaterialModule } from "../../app.material.module";
/**
 * Importación de modulos
 */
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
import { FilingRoutingModule } from "./filing-routing.module";
/**
 * Radicación
 */
import { MatMomentDatetimeModule } from "@mat-datetimepicker/moment";
import { SanitizeHtmlPipe } from "../../pipes/sanitize-html.pipe";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { SignatureComponent } from "../components/signature/signature.component";
import { TableComponent } from "../components/table/table.component";
import { FilingCreateDetailResolutionComponent } from "./filing-create-detail-resolution/filing-create-detail-resolution.component";
import { FilingCreateComponent } from "./filing-create/filing-create.component";
import { FilingEmailFormComponent } from "./filing-email-form/filing-email-form.component";
import { FilingEmailIndexComponent } from "./filing-email-index/filing-email-index.component";
import { FilingEmailLoginComponent } from "./filing-email-login/filing-email-login.component";
import {
  FilingEmailViewContentComponent,
  FilingEmailViewContentDialog,
} from "./filing-email-view-content/filing-email-view-content.component";
import { FilingFormComponent } from "./filing-form/filing-form.component";
import { FilingIndexComponent } from "./filing-index/filing-index.component";
import { FilingMainComponent } from "./filing-main/filing-main.component";
import { FilingRadicadosEmailIndexComponent } from "./filing-radicados-email-index/filing-radicados-email-index.component";
import { FilingRequestDistributionIndexComponent } from "./filing-request-distribution-index/filing-request-distribution-index.component";
import { FilingUpdateRequestComponent } from "./filing-update-request/filing-update-request.component";
import { FilingUpdateComponent } from "./filing-update/filing-update.component";
import { FilingViewComponent } from "./filing-view/filing-view.component";
import { FilingWebPageIndexComponent } from "./filing-web-page-index/filing-web-page-index.component";
import { FilingActsComponent } from "./filing-acts/filing-acts.component";
import { SgdaEditorComponent } from "@app/modules/components/sgda-editor/sgda-editor.component";
import { FillingCoopWorksComponent } from "./filling-coop-works/filling-coop-works.component";

@NgModule({
  declarations: [
    FilingMainComponent,
    FilingIndexComponent,
    FilingFormComponent,
    FilingCreateComponent,
    FilingUpdateComponent,
    FilingViewComponent,
    FilingEmailFormComponent,
    FilingEmailLoginComponent,
    FilingEmailIndexComponent,
    FilingEmailViewContentComponent,
    FilingEmailViewContentDialog,
    SanitizeHtmlPipe,
    FilingCreateDetailResolutionComponent,
    FilingRequestDistributionIndexComponent,
    FilingUpdateRequestComponent,
    FilingWebPageIndexComponent,
    SignatureComponent,
    FilingRadicadosEmailIndexComponent,
    FilingActsComponent,
    FillingCoopWorksComponent,
  ],
  imports: [
    CommonModule,
    FilingRoutingModule,
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
    CanDirective, //Necesaria para activar las operaciones
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    SgdaEditorComponent,
  ],
  exports: [FilingCreateDetailResolutionComponent],
  providers: [
    BnNgIdleService,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {
          // Ajusta estos formatos según necesites para la entrada de datos
          dateInput: "DD/MM/YYYY",
          monthInput: "MMMM",
          timeInput: "hh:mm a",
          datetimeInput: "DD/MM/YYYY hh:mm a",
        },
        display: {
          // Ajusta estos formatos para la visualización de datos
          dateInput: "DD/MM/YYYY",
          monthInput: "MMMM",
          datetimeInput: "DD/MM/YYYY hh:mm a",
          timeInput: "hh:mm a",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY",
          popupHeaderDateLabel: "ddd, DD MMM",
        },
      },
    },
  ],
})
export class FilingModule {}

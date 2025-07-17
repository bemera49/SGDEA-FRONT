/**

 */

import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./app.material.module";
/**
 * Importación de servio socket
 */

/**
 * Importación de servicios
 */
import { ValidateTokenGuard } from "./guards/validate-token.guard";
import { AuthService } from "./services/auth.service";
import { ChangeChildrenService } from "./services/change-children.service";
import { FloatingButtonService } from "./services/floating-button.service";
import { SweetAlertService } from "./services/sweet-alert.service";
/**
 * Importación de módulos
 */
import { AboutModule } from "./modules/about/about.module";
import { ArchiveManagementModule } from "./modules/archive-management/archive-management.module";
import { AuditModule } from "./modules/audit/audit.module";
import { CorrespondenceManagementModule } from "./modules/correspondence-management/correspondence-management.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DocumentManagementModule } from "./modules/document-management/document-management.module";
import { DocumentaryLoansModule } from "./modules/documentary-loans/documentary-loans.module";
import { FilingModule } from "./modules/filing/filing.module";
import { HelpModule } from "./modules/help/help.module";
import { LoginModule } from "./modules/login/login.module";
import { PqrsModule } from "./modules/pqrs/pqrs.module";
import { QrviewModule } from "./modules/qrview/qrview.module";
import { QualityModule } from "./modules/quality/quality.module";
import { QueryViewFinderModule } from "./modules/query/query-view-finder.module";
import { RegisterModule } from "./modules/register/register.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { ResetPassModule } from "./modules/reset-pass/reset-pass.module";
import { ResetTokenPassModule } from "./modules/reset-token-pass/reset-token-pass.module";
import { SettingsAppModule } from "./modules/settings-app/settings-app.module";
import { UnlockModule } from "./modules/unlock/unlock.module";
import { UsersModule } from "./modules/users/users.module";
import { OcupationalModule } from "./modules/ocupational/ocupational.module";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { FormlyModule } from "@ngx-formly/core";
import { DynamicFormsTypesNotRepeatComponent } from "./modules/components/dynamic-forms-types-not-repeat/dynamic-forms-types-not-repeat.component";
import { DynamicFormsTypesRepeatComponent } from "./modules/components/dynamic-forms-types-repeat/dynamic-forms-types-repeat.component";

import { BnNgIdleService } from "bn-ng-idle"; // import bn-ng-idle service
import { environment } from "src/environments/environment";

import { AuthInterceptor } from 'src/app/app.interceptor';
import { ToastNotifyModule } from "./services/toast/components/toast-notify/toast-notify.module";

import { AdminLayoutModule } from "./modules/admin-layout/admin-layout.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.frontUrl + "assets/i18n/", ".json");
}

@NgModule({

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MaterialModule,
    /**
     * Módulos
     */
    ToastNotifyModule,
    UnlockModule,
    LoginModule,
    QrviewModule,
    RegisterModule,
    ResetPassModule,
    ResetTokenPassModule,
    DashboardModule,
    UsersModule,
    SettingsAppModule,
    FilingModule,
    DocumentManagementModule,
    CorrespondenceManagementModule,
    ArchiveManagementModule,
    DocumentaryLoansModule,
    ReportsModule,
    QueryViewFinderModule,
    AuditModule,
    PqrsModule,
    HelpModule,
    AboutModule,
    QualityModule,
    OcupationalModule,
    AdminLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        /* useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        }, */

        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),

    FormlyModule.forRoot({
      types: [
        { name: "repeat", component: DynamicFormsTypesRepeatComponent },
        { name: "notrepeat", component: DynamicFormsTypesNotRepeatComponent },
      ],
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ValidateTokenGuard,
    AuthService,
    SweetAlertService,
    FloatingButtonService,
    ChangeChildrenService,
    BnNgIdleService,
  ],
  declarations: [AppComponent, DynamicFormsTypesRepeatComponent, DynamicFormsTypesNotRepeatComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

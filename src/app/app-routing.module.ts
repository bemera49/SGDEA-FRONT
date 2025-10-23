/**

 */

import { RouterModule, Routes } from "@angular/router";

/**
 * Importación de componentes
 */
// import { MailboxComponent } from './modules/auth-layout/mailbox/mailbox.component';
// import { UnlockMainComponent } from './modules/unlock/unlock-main/unlock-main.component';
import { LoginMainComponent } from "./modules/login/login-main/login-main.component";
import { QrviewMainComponent } from "./modules/qrview/qrview-main/qrview-main.component";
import { RegisterMainComponent } from "./modules/register/register-main/register-main.component";
import { ResetPassMainComponent } from "./modules/reset-pass/reset-pass-main/reset-pass-main.component";
import { ResetTokenPassMainComponent } from "./modules/reset-token-pass/reset-token-pass-main/reset-token-pass-main.component";
import { DashboardMainComponent } from "./modules/dashboard/dashboard-main/dashboard-main.component";
import { UsersMainComponent } from "./modules/users/users-main/users-main.component";
import { SettingsAppMainComponent } from "./modules/settings-app/settings-app-main/settings-app-main.component";
import { FilingMainComponent } from "./modules/filing/filing-main/filing-main.component";
import { DocManagMainComponent } from "./modules/document-management/doc-manag-main/doc-manag-main.component";
import { CorrespondenceManagementMainComponent } from "./modules/correspondence-management/correspondence-management-main/correspondence-management-main.component";
import { ArchiveManagementMainComponent } from "./modules/archive-management/archive-management-main/archive-management-main.component";
import { DocumentaryLoansMainComponent } from "./modules/documentary-loans/documentary-loans-main/documentary-loans-main.component";
import { ReportMainComponent } from "./modules/reports/report-main/report-main.component";
import { QueryViewfinderMainComponent } from "./modules/query/query-viewfinder-main/query-viewfinder-main.component";
import { AuditMainComponent } from "./modules/audit/audit-main/audit-main.component";
import { PqrsMainComponent } from "./modules/pqrs/pqrs-main/pqrs-main.component";
import { QualityMainComponent } from "./modules/quality/quality-main/quality-main.component";
import { HelpMainComponent } from "./modules/help/help-main/help-main.component";
import { ManagementProcedureModule } from "./modules/management-procedure/management-procedure.module";
import { AdminSideNavBarComponent } from "./modules/admin-layout/admin-side-nav-bar/admin-side-nav-bar.component";
import { OcupationalMainComponent } from "./modules/ocupational/ocupational-main/ocupational-main.component";
/**
 * Importación de servicios
 */
import { ValidateTokenGuard } from "./guards/validate-token.guard";
import { NgModule } from "@angular/core";
import { ExternalPqrsComponent } from "./modules/external-pqrs/external-pqrs.component";
import { ExternalPqrsMainComponent } from "./modules/external-pqrs-main/external-pqrs-main.component";
import { ExternalPqrsConsultComponent } from "./modules/external-pqrs-consult/external-pqrs-consult.component";

const routes: Routes = [
  /** Módulos de la plantilla base que pueden ser utilizados */
  // { path: 'mailbox', component: MailboxComponent },
  // { path: 'unlock', component: UnlockMainComponent },

  /** Módulos donde NO se necesita estar logueado */

  { path: "login", component: LoginMainComponent },
  { path: "register", component: RegisterMainComponent },
  { path: "qrview/:params", component: QrviewMainComponent },
  { path: "resetpass", component: ResetPassMainComponent },
  { path: "resettokenpass/:params", component: ResetTokenPassMainComponent },
  { path: "external-pqrs", component: ExternalPqrsComponent },
  { path: "external-pqrs-main", component: ExternalPqrsMainComponent },
  { path: "external-pqrs-consult", component: ExternalPqrsConsultComponent },

  /** Módulos donde se necesita estar logueado */
  {
    path: "",
    component: AdminSideNavBarComponent,
    canActivate: [ValidateTokenGuard],
    children: [
      { path: "dashboard", component: DashboardMainComponent },
      {
        path: "users",
        loadChildren: () =>
          import("./modules/users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "filing",
        loadChildren: () =>
          import("./modules/filing/filing.module").then((m) => m.FilingModule),
      },
      {
        path: "e-filing",
        loadChildren: () =>
          import("./modules/e-filing/e-filing.module").then(
            (m) => m.EFilingModule,
          ),
      },
      {
        path: "setting",
        loadChildren: () =>
          import("./modules/settings-app/settings-app.module").then(
            (m) => m.SettingsAppModule,
          ),
      },
      {
        path: "documentManagement",
        loadChildren: () =>
          import(
            "./modules/document-management/document-management.module"
          ).then((m) => m.DocumentManagementModule),
      },
      {
        path: "correspondenceManagement",
        loadChildren: () =>
          import(
            "./modules/correspondence-management/correspondence-management.module"
          ).then((m) => m.CorrespondenceManagementModule),
      },
      {
        path: "archiveManagement",
        loadChildren: () =>
          import("./modules/archive-management/archive-management.module").then(
            (m) => m.ArchiveManagementModule,
          ),
      },
      {
        path: "documentaryLoans",
        loadChildren: () =>
          import("./modules/documentary-loans/documentary-loans.module").then(
            (m) => m.DocumentaryLoansModule,
          ),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./modules/reports/reports.module").then(
            (m) => m.ReportsModule,
          ),
      },
      { path: "query", component: QueryViewfinderMainComponent },
      { path: "audit", component: AuditMainComponent },
      {
        path: "pqrs",
        loadChildren: () =>
          import("./modules/pqrs/pqrs.module").then((m) => m.PqrsModule),
      },
      {
        path: "predial",
        loadChildren: () =>
          import("./modules/predial/predial.module").then(
            (m) => m.PredialModule,
          ),
      },
      { path: "quality", component: QualityMainComponent },
      {
        path: "juridica",
        loadChildren: () =>
          import("./modules/juridica/juridica.module").then(
            (m) => m.JuridicaModule,
          ),
      },
      {
        path: "signin",
        loadChildren: () =>
          import(
            "./modules/management-processing/management-processing.module"
          ).then((m) => m.ManagementProcessingModule),
      },
      { path: "help", component: HelpMainComponent },
      { path: "users", component: UsersMainComponent },
      {
        path: "ocupational",
        loadChildren: () =>
          import("./modules/ocupational/ocupational.module").then(
            (m) => m.OcupationalModule,
          ),
      },
      {
        path: "pucCuentas",
        loadChildren: () =>
          import("./modules/pucCuentas/puc.module").then((m) => m.PucModule),
      },
      // { path: 'filing', component: FilingMainComponent, },
      // { path: 'setting', component: SettingsAppMainComponent, },
      // { path: 'documentManagement', component: DocManagMainComponent, },
      // { path: 'correspondenceManagement', component: CorrespondenceManagementMainComponent, },
      // { path: 'archiveManagement', component: ArchiveManagementMainComponent, },
      // { path: 'documentaryLoans', loadChildren: () => import('./modules/documentary-loans/documentary-loans.module').then(m => m.DocumentaryLoansModule) },
      // { path: 'reports', component: ReportMainComponent, },
      // { path: 'query', component: QueryViewfinderMainComponent, },
      // { path: 'audit', component: AuditMainComponent, },
      // { path: 'pqrs', loadChildren: () => import('./modules/pqrs/pqrs.module').then(m => m.PqrsModule), },
      // { path: 'quality', component: QualityMainComponent, },
      // { path: 'juridical', loadChildren: () => import('./modules/juridica/juridica.module').then(m => m.JuridicaModule), },
      // { path: 'help', component: HelpMainComponent, },
      { path: "**", redirectTo: "login", pathMatch: "full" },
      { path: "", redirectTo: "pqrs/log-pqrs-index", pathMatch: "full" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

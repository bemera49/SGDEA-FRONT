import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
/**
 * Importación de componentes Generales
 */
import { FilingMainComponent } from "./filing-main/filing-main.component";
// Standard Filing
import { FilingIndexComponent } from "./filing-index/filing-index.component";
import { FilingCreateComponent } from "./filing-create/filing-create.component";
import { FilingUpdateComponent } from "./filing-update/filing-update.component";
import { FilingViewComponent } from "./filing-view/filing-view.component";
// Email Filing
import { FilingEmailIndexComponent } from "./filing-email-index/filing-email-index.component";
import { FilingEmailFormComponent } from "./filing-email-form/filing-email-form.component";
import { FilingEmailLoginComponent } from "./filing-email-login/filing-email-login.component";

import { FilingRequestDistributionIndexComponent } from "./filing-request-distribution-index/filing-request-distribution-index.component";
import { FilingUpdateRequestComponent } from "./filing-update-request/filing-update-request.component";
import { FilingWebPageIndexComponent } from "./filing-web-page-index/filing-web-page-index.component";
import { FilingRadicadosEmailIndexComponent } from "./filing-radicados-email-index/filing-radicados-email-index.component";
import { FilingActsComponent } from "./filing-acts/filing-acts.component";
import { FillingCoopWorksComponent } from "./filling-coop-works/filling-coop-works.component";

const routes: Routes = [
  { path: "filing-index/:params", component: FilingIndexComponent },
  { path: "filing-index/:params/:id", component: FilingIndexComponent },
  { path: "filing-create", component: FilingCreateComponent },
  { path: "filing-create/:id", component: FilingCreateComponent },
  { path: "filing-clone/:id", component: FilingCreateComponent },
  { path: "filing-update/:id", component: FilingUpdateComponent },
  { path: "filing-view/:id", component: FilingViewComponent },
  // Email Filing
  { path: "filing-email-login", component: FilingEmailLoginComponent },
  { path: "filing-email-index", component: FilingEmailIndexComponent },
  { path: "filing-email-form", component: FilingEmailFormComponent },
  // SDQD
  {
    path: "sdqs-requests-index",
    component: FilingRequestDistributionIndexComponent,
  },
  {
    path: "filing-update-request/:id/:menu",
    component: FilingUpdateRequestComponent,
  },
  // Página web
  { path: "filing-web-index", component: FilingWebPageIndexComponent },
  {
    path: "filing-update-web-page/:id",
    component: FilingUpdateRequestComponent,
  },
  // Radicados Email
  {
    path: "filing-radicados-email-index",
    component: FilingRadicadosEmailIndexComponent,
  },
  {
    path: "filing-update-radicados-email/:id",
    component: FilingUpdateRequestComponent,
  },
  // Actos administrativo
  { path: "filing-acts/:params", component: FilingActsComponent },
  //trabajo coolaborativo
  { path: "filing-coop-works/:params", component: FillingCoopWorksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilingRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
/**
 * Importación de componentes Generales
 */
import { CorrespondenceManagementMainComponent } from "./correspondence-management-main/correspondence-management-main.component";
// Mass Reassignment
import { CorManagMassReassignmentIndexComponent } from "./cor-manag-mass-reassignment-index/cor-manag-mass-reassignment-index.component";
// Annulment
import { CorManagAnnulmentIndexComponent } from "./cor-manag-annulment-index/cor-manag-annulment-index.component";
// Distribution and Shipping
import { CorManagDistributionShippingIndexComponent } from "./cor-manag-distribution-shipping-index/cor-manag-distribution-shipping-index.component";
import { CorManagDistributionShippingViewComponent } from "./cor-manag-distribution-shipping-view/cor-manag-distribution-shipping-view.component";
import { RadicatePqrsComponent } from "@app/modules/correspondence-management/radicate-pqrs/radicate-pqrs.component";

const routes: Routes = [
  // Mass Reassignment
  {
    path: "mass-reassignment-index",
    component: CorManagMassReassignmentIndexComponent,
  },
  // Annulment
  { path: "annulment-index", component: CorManagAnnulmentIndexComponent },
  // Distribution and Shipping
  {
    path: "distribution-shipping-index-ee/:id",
    component: CorManagDistributionShippingIndexComponent,
  },
  {
    path: "distribution-shipping-index-ef/:id",
    component: CorManagDistributionShippingIndexComponent,
  },
  {
    path: "distribution-shipping-index-ne/:id",
    component: CorManagDistributionShippingIndexComponent,
  },
  {
    path: "distribution-shipping-index-nf/:id",
    component: CorManagDistributionShippingIndexComponent,
  },
  {
    path: "distribution-shipping-index",
    component: CorManagDistributionShippingIndexComponent,
  },
  {
    path: "distribution-shipping-view/:id",
    component: CorManagDistributionShippingViewComponent,
  },
  { path: "radicate-pqrs", component: RadicatePqrsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrespondenceManagementRoutingModule {}

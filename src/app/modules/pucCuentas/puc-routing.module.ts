import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhTercerosApartamentosCreateComponent } from "./ph-terceros-apartamentos-create/ph-terceros-apartamentos-create.component";
import { PhTercerosApartamentosIndexComponent } from "./ph-terceros-apartamentos-index/ph-terceros-apartamentos-index.component";
import { PhTercerosApartamentosViewComponent } from "./ph-terceros-apartamentos-view/ph-terceros-apartamentos-view.component";
import { PhTercerosCreateComponent } from "./ph-terceros-create/ph-terceros-create.component";
import { PhTercerosFormComponent } from "./ph-terceros-form/ph-terceros-form.component";
import { PhTercerosIndexComponent } from "./ph-terceros-index/ph-terceros-index.component";
import { PhTercerosUpdateComponent } from "./ph-terceros-update/ph-terceros-update.component";
import { PhTercerosViewComponent } from "./ph-terceros-view/ph-terceros-view.component";
import { PucCuentasCreateComponent } from "./puc-cuentas-create/puc-cuentas-create.component";
import { PucCuentasFormComponent } from "./puc-cuentas-form/puc-cuentas-form.component";
import { PucCuentasIndexComponent } from "./puc-cuentas-index/puc-cuentas-index.component";
import { PucCuentasUpdateComponent } from "./puc-cuentas-update/puc-cuentas-update.component";
import { PucCuentasViewComponent } from "./puc-cuentas-view/puc-cuentas-view.component";

const routes: Routes = [
  {
    path: "ph-terceros-apartamentos-view/:id",
    component: PhTercerosApartamentosViewComponent,
  },
  {
    path: "ph-terceros-apartamentos-create",
    component: PhTercerosApartamentosCreateComponent,
  },
  {
    path: "ph-terceros-apartamentos-index",
    component: PhTercerosApartamentosIndexComponent,
  },
  { path: "ph-terceros-index", component: PhTercerosIndexComponent },
  { path: "ph-terceros-create", component: PhTercerosCreateComponent },
  { path: "ph-terceros-form", component: PhTercerosFormComponent },
  { path: "ph-terceros-view/:id", component: PhTercerosViewComponent },
  { path: "ph-terceros-update/:id", component: PhTercerosUpdateComponent },
  { path: "puc-cuentas-index", component: PucCuentasIndexComponent },
  { path: "puc-cuentas-create", component: PucCuentasCreateComponent },
  { path: "puc-cuentas-form", component: PucCuentasFormComponent },
  { path: "puc-cuentas-view/:id", component: PucCuentasViewComponent },
  { path: "puc-cuentas-update/:id", component: PucCuentasUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PucRoutingModule {}

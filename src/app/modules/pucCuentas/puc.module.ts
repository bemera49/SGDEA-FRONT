import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { MaterialModule } from "../../app.material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BnNgIdleService } from "bn-ng-idle";

//modules
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
import { PucRoutingModule } from "./puc-routing.module";
import { PucCuentasIndexComponent } from "./puc-cuentas-index/puc-cuentas-index.component";
import { PucCuentasCreateComponent } from "./puc-cuentas-create/puc-cuentas-create.component";
import { PucCuentasFormComponent } from "./puc-cuentas-form/puc-cuentas-form.component";
import { PucCuentasViewComponent } from './puc-cuentas-view/puc-cuentas-view.component';
import { PucCuentasUpdateComponent } from './puc-cuentas-update/puc-cuentas-update.component';
import { PhTercerosIndexComponent } from './ph-terceros-index/ph-terceros-index.component';
import { PhTercerosCreateComponent } from './ph-terceros-create/ph-terceros-create.component';
import { PhTercerosFormComponent } from './ph-terceros-form/ph-terceros-form.component';
import { PhTercerosViewComponent } from './ph-terceros-view/ph-terceros-view.component';
import { PhTercerosUpdateComponent } from './ph-terceros-update/ph-terceros-update.component';
import { PhTercerosApartamentosIndexComponent } from './ph-terceros-apartamentos-index/ph-terceros-apartamentos-index.component';
import { PhTercerosApartamentosCreateComponent } from './ph-terceros-apartamentos-create/ph-terceros-apartamentos-create.component';
import { PhTercerosApartamentosFormComponent } from './ph-terceros-apartamentos-form/ph-terceros-apartamentos-form.component';
import { PhTercerosApartamentosViewComponent } from './ph-terceros-apartamentos-view/ph-terceros-apartamentos-view.component';

@NgModule({
  declarations: [
    PucCuentasIndexComponent,
    PucCuentasCreateComponent,
    PucCuentasFormComponent,
    PucCuentasViewComponent,
    PucCuentasUpdateComponent,
    PhTercerosIndexComponent,
    PhTercerosCreateComponent,
    PhTercerosFormComponent,
    PhTercerosViewComponent,
    PhTercerosUpdateComponent,
    PhTercerosApartamentosIndexComponent,
    PhTercerosApartamentosCreateComponent,
    PhTercerosApartamentosFormComponent,
    PhTercerosApartamentosViewComponent,
  ],
  imports: [
    PucRoutingModule,
    MatSelectModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    CommonModule,

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
    //modulos
    AdminLayoutModule,
    ComponentsModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
  ],

  exports: [],
  providers: [BnNgIdleService],
})
export class PucModule {}

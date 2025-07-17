/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MaterialModule } from "../../app.material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BnNgIdleService } from 'bn-ng-idle';

import { AuditRoutingModule } from "./audit-routing.module";
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
import { AuditMainComponent } from "./audit-main/audit-main.component";
/** Audit log */
import { AuditLogIndexComponent } from "./audit-log-index/audit-log-index.component";
import { AuditLogViewComponent } from "./audit-log-view/audit-log-view.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";

@NgModule({
  declarations: [AuditLogIndexComponent, AuditLogViewComponent, AuditMainComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
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
    BreadcrumbComponent
  ],
  exports: [],
  providers: [BnNgIdleService]
})
export class AuditModule { }

/**

 */
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { CanDirective } from "@app/directives/can.directive";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MaterialModule } from "../../app.material.module";
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { CardOcupationalComponent } from "../components/card-ocupational/card-ocupational.component";
import { ComponentsModule } from "../components/components.module";
import { SubMenuOcupationalModule } from "./ocupational-main/components/sub-menu-ocupational/sub-menu-ocupational.module";
import { OcupationalMainComponent } from "./ocupational-main/ocupational-main.component";
import { OcupationalRoutingModule } from './ocupational-routing.module';
//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';
/** Analistas-Inactivar */
import { OcupationalNotificationIndexComponent } from './ocupational-notification-index/ocupational-notification-index.component';
import { TableTasksModule } from "./ocupational-notification-index/components/table-tasks/table-tasks.module";
import { OcupationalRequestIndexComponent } from './ocupational-request-index/ocupational-request-index.component';
import { TableRequestModule } from "./ocupational-request-index/components/table-requests/table-requests.module";
import { OcupationalViewRequestDetailComponent } from './ocupational-view-request-detail/ocupational-view-request-detail.component';
import { OcupationalViewRequestComponent } from './ocupational-view-request/ocupational-view-request.component';
import { TableViewRequestModule } from "./ocupational-view-request/components/table-request/table-request.module";
import { TypeRequestModule } from "./ocupational-view-notification-detail/components/type-request/type-request.module";
import { ObservationModule } from "./ocupational-view-notification-detail/components/observation/observation.module";
import { ConfirmationModule } from "./ocupational-view-notification-detail/components/confirmation/confirmation.module";
//import { SgdaEditorComponent } from "@app/modules/components/sgda-editor/sgda-editor.component";
import { SgdaEditorV2Component } from "@app/modules/ocupational/ocupational-view-notification-detail/components/sgda-editor/sgda-editor.component";
import { ListFileModule } from "./ocupational-view-notification-detail/components/list-file/list-file.module";
import { ListFileReqModule } from "./ocupational-view-notification-detail/components/list-file-req/list-file-req.module";
import { TableAnalystsModule } from "./ocupational-view-notification-detail/components/table-analysts/table-analysts.module";
import { TableTasksv2Module } from "./ocupational-view-notification-detail/components/table-tasksv2/table-tasksv2.module";
import { OcupationalViewNotificationDetailComponent } from './ocupational-view-notification-detail/ocupational-view-notification-detail.component';
import { RowInformationModule } from "./ocupational-view-notification-detail/components/row-information/row-information.module";
import { ListObservationModule } from "./ocupational-view-notification-detail/components/list-observation/list-observation.module";
import { ListAclarationModule } from "./ocupational-view-notification-detail/components/list-aclaration/list-aclaration.module";
import { ViewPdfFileComponent } from "./ocupational-view-notification-detail/components/view-pdf/view-pdf.component";
import { TableTasksClosedModule } from "./ocupational-notification-closed-index/components/table-tasks-closed/table-tasks-closed.module";
import { OcupationalNotificationClosedIndexComponent } from './ocupational-notification-closed-index/ocupational-notification-closed-index.component';


@NgModule({
  declarations: [OcupationalMainComponent, CardOcupationalComponent,
     OcupationalNotificationIndexComponent, OcupationalRequestIndexComponent, OcupationalViewRequestDetailComponent,
    OcupationalViewRequestComponent, OcupationalViewNotificationDetailComponent, ViewPdfFileComponent, OcupationalNotificationClosedIndexComponent],

  imports: [
    CanDirective,
    PaginationComponent, //test
    CommonModule,
    OcupationalRoutingModule,
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
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatStepperModule,
    MatRadioModule,
    NgxMatSelectSearchModule,
    SubMenuOcupationalModule,
    BreadcrumbComponent,
    NgxDocViewerModule,
    MatAutocompleteModule,
    TableTasksModule,
    TableRequestModule,
    SgdaEditorV2Component,
    TableViewRequestModule,
    TypeRequestModule,
    ObservationModule,
    ConfirmationModule,
    ListFileModule,
    TableAnalystsModule,
    TableTasksv2Module,
    ListFileReqModule,
    RowInformationModule,
    ListObservationModule,
    ListAclarationModule,
    TableTasksClosedModule
  ],
  exports: [],
  providers: [BnNgIdleService]
})
export class OcupationalModule { }

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
import { CardQualityComponent } from "../components/card-quality/card-quality.component";
import { ComponentsModule } from "../components/components.module";
import { ButtonContinueModule } from "./quality-create-request/components/button-continue/button-continue.module";
import { CancelLinkModule } from "./quality-create-request/components/cancel-link/cancel-link.module";
import { MultiFilesModule } from "./quality-create-request/components/multi-files/multi-files.module";
import { QualityCreateRequestComponent } from "./quality-create-request/quality-create-request.component";
import { QualityDownloadTemplateComponent } from './quality-download-template/quality-download-template.component';
import { SubMenuQualityModule } from "./quality-main/components/sub-menu-quality/sub-menu-quality.module";
import { QualityMainComponent } from "./quality-main/quality-main.component";
import { QualityModifyComponent } from "./quality-modify/quality-modify.component";
import { TreeProcessModule } from "./quality-process-map/quality-process-detail/components/tree-process/tree-process.module";
import { Step2Component } from "./quality-process-map/quality-process-detail/pantalla-a/Components/step2/step2.component";
import { Step3Component } from "./quality-process-map/quality-process-detail/pantalla-a/Components/step3/step3.component";
import { PantallaAComponent } from "./quality-process-map/quality-process-detail/pantalla-a/pantalla-a.component";
import { AlternateDataViewerStepOneComponent } from "./quality-process-map/quality-process-detail/pantalla-b/Components/alternate-data-viewer-step-one/alternate-data-viewer-step-one.component";
import { AlternateDataViewerStepTwoComponent } from "./quality-process-map/quality-process-detail/pantalla-b/Components/alternate-data-viewer-step-two/alternate-data-viewer-step-two.component";
import { PantallaBComponent } from "./quality-process-map/quality-process-detail/pantalla-b/pantalla-b.component";
import { QualityProcessDetailComponent } from "./quality-process-map/quality-process-detail/quality-process-detail.component";
import { QualityProcessMapComponent } from "./quality-process-map/quality-process-map.component";
import { QualityRoutingModule } from './quality-routing.module';
import { TableTasksModule } from "./quality-tasks-received/components/table-tasks/table-tasks.module";
import { QualityTasksReceivedComponent } from "./quality-tasks-received/quality-tasks-received.component";

import { SortAlphabeticalModule } from "./pipes/sort-alphabetical/sort-alphabetical.module";
import { DatePickerMeetingsComponent } from './quality-view-request-detail/components/date-picker-meetings/date-picker-meetings.component';
import { DocumentModule } from "./quality-view-request-detail/components/document/document.module";
import { InputAnalysisModule } from "./quality-view-request-detail/components/input-analysis/input-analysis.module";
import { LayoutSectionModule } from "./quality-view-request-detail/components/layout-section/layout-section.module";
import { RequestStatusModule } from "./quality-view-request-detail/components/request-status/request-status.module";
import { RowInformationModule } from "./quality-view-request-detail/components/row-information/row-information.module";
import { TabAnalysisPlanModule } from "./quality-view-request-detail/components/tab-analysis-plan/tab-analysis-plan.module";
import { TableDAModule } from "./quality-view-request-detail/components/table-da/table-da.module";
import { QualityViewRequestDetailComponent } from './quality-view-request-detail/quality-view-request-detail.component';
import { ButtonClearModule } from "./quality-view-request/components/button-clear/button-clear.module";
import { ButtonFilterModule } from "./quality-view-request/components/button-filter/button-filter.module";
import { TableRequestModule } from "./quality-view-request/components/table-request/table-request.module";
import { ToastQualityModule } from "./quality-view-request/components/toast-quality/toast-quality.module";
import { QualityViewRequestComponent } from './quality-view-request/quality-view-request.component';
//test
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';
import { QualityMapProcessModule } from "./quality-map-process/quality-map-process.module";
import { HeaderProcessMapComponent } from './quality-process-map/quality-process-detail/components/header-process-map/header-process-map.component';
import { TableStyle2Module } from "./quality-process-map/quality-process-detail/components/table-style2/table-style2.module";
import { TableStyle3Module } from "./quality-process-map/quality-process-detail/components/table-style3/table-style3.module";
import { ReusableTableModule } from "./quality-process-map/quality-process-detail/pantalla-b/reusable-table/reusable-table.module";
import { ContainerFormTableModule } from "./quality-view-request-detail/components/container-form-table/container-form-table.module";
import { DesignationsModule } from "./quality-view-request-detail/components/designations/designations.module";
import { ExtensionModule } from './quality-view-request-detail/components/extension/extension.module';
import { SaveDocumentsModule } from "./quality-view-request-detail/components/save-documents/save-documents.module";
import { ValidacionesDGCPModule } from "./quality-view-request-detail/components/validaciones-dgcp/validaciones-dgcp.module";
/** Analistas-Inactivar */
import { QualityAnalystsIndexComponent } from './quality-analyst-index/quality-analyst-index.component';
import { TableAnalystsModule } from "./quality-analyst-index/components/table-analysts/table-analysts.module";
import { TableTraceabilitysModule } from "./quality-analyst-index/components/table-traceabilitys/table-traceabilitys.module";
import { QualityMapProcessComponent } from "./quality-map-process/quality-map-process.component";
import { QualityDocMetadataComponent } from './quality-doc-metadata/quality-doc-metadata.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TabDivulgacionComponent } from "./quality-view-request-detail/components/tab-divulgacion/tab-divulgacion.component";
import { ModalSolicitudPublicacionComponent } from './quality-view-request-detail/components/modal-solicitud-publicacion/modal-solicitud-publicacion.component';


@NgModule({
  declarations: [QualityMainComponent, QualityProcessMapComponent,
    QualityCreateRequestComponent, CardQualityComponent,
    QualityViewRequestComponent, QualityViewRequestDetailComponent,
    QualityModifyComponent, QualityTasksReceivedComponent, QualityDownloadTemplateComponent,
    QualityProcessDetailComponent, PantallaAComponent,
    PantallaBComponent,
    AlternateDataViewerStepOneComponent, AlternateDataViewerStepTwoComponent,
    Step2Component, Step3Component, DatePickerMeetingsComponent,
    HeaderProcessMapComponent, QualityAnalystsIndexComponent, TabDivulgacionComponent, ModalSolicitudPublicacionComponent,
    QualityDocMetadataComponent
  ],

  imports: [
    CanDirective,
    PaginationComponent, //test
    CommonModule,
    ButtonContinueModule,
    QualityRoutingModule,
    MaterialModule,
    FormsModule,
    TreeProcessModule,
    ReactiveFormsModule,
    CancelLinkModule,
    HttpClientModule,
    DocumentModule,
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
    RowInformationModule,
    TableDAModule,
    LayoutSectionModule,
    RequestStatusModule,
    TabAnalysisPlanModule,
    InputAnalysisModule,
    TableTasksModule,
    SubMenuQualityModule,
    TableRequestModule,
    ButtonFilterModule,
    ButtonClearModule,
    ToastQualityModule,
    BreadcrumbComponent,
    NgxDocViewerModule,
    MultiFilesModule,
    MatAutocompleteModule,
    SortAlphabeticalModule,
    SaveDocumentsModule,
    ContainerFormTableModule,
    ValidacionesDGCPModule,
    DesignationsModule,
    ExtensionModule,
    ReusableTableModule,
    TableStyle2Module,
    TableStyle3Module,
    TableAnalystsModule,
    TableTraceabilitysModule,
    QualityMapProcessModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule

  ],
  exports: [],
  providers: [BnNgIdleService]
})
export class QualityModule { }

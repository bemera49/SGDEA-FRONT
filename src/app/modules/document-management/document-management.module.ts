/**

 */

import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MaterialModule } from "../../app.material.module";
/**
 * Importación de modulos
 */
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
import { DocManagMainComponent } from "./doc-manag-main/doc-manag-main.component";
import { DocumentManagementRoutingModule } from "./document-management-routing.module";
/**
 * Dependencias
 */
import { DocManagDependenciesCreateComponent } from "./doc-manag-dependencies-create/doc-manag-dependencies-create.component";
import { DocManagDependenciesFormComponent } from "./doc-manag-dependencies-form/doc-manag-dependencies-form.component";
import { DocManagDependenciesIndexComponent } from "./doc-manag-dependencies-index/doc-manag-dependencies-index.component";
import { DocManagDependenciesUpdateComponent } from "./doc-manag-dependencies-update/doc-manag-dependencies-update.component";
import { DocManagDependenciesVersionEditComponent } from "./doc-manag-dependencies-version-edit/doc-manag-dependencies-version-edit.component";
import { DocManagDependenciesVersionViewComponent } from "./doc-manag-dependencies-version-view/doc-manag-dependencies-version-view.component";
import { DocManagDependenciesViewComponent } from "./doc-manag-dependencies-view/doc-manag-dependencies-view.component";
import { DocManagUploadTrdComponent } from "./doc-manag-upload-trd/doc-manag-upload-trd.component";
import { DocManagVersionTrdIndexComponent } from "./doc-manag-version-trd-index/doc-manag-version-trd-index.component";
import { DocManagVersionTrdViewComponent } from "./doc-manag-version-trd-view/doc-manag-version-trd-view.component";
// Expedientes
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import {
  DocManagCrossReferenceModalComponent,
  DocManagCrossReferenceModalDialog,
} from "./doc-manag-cross-reference/doc-manag-cross-reference-modal.component";
import { DocManagFolderCreateComponent } from "./doc-manag-folder-create/doc-manag-folder-create.component";
import { DocManagFolderFormComponent } from "./doc-manag-folder-form/doc-manag-folder-form.component";
import { DocManagFolderIndIndexComponent } from "./doc-manag-folder-ind-index/doc-manag-folder-ind-index.component";
import { DocManagFolderIndexComponent } from "./doc-manag-folder-index/doc-manag-folder-index.component";
import { DocManagFolderUpdateComponent } from "./doc-manag-folder-update/doc-manag-folder-update.component";
import { DocManagFolderViewComponent } from "./doc-manag-folder-view/doc-manag-folder-view.component";
import { DocManagProductionsOfficeCreateComponent } from './doc-manag-productions-office-create/doc-manag-productions-office-create.component';
import { DocManagProductionsOfficeIndexComponent } from './doc-manag-productions-office-index/doc-manag-productions-office-index.component';
import { AddMetadatosComponent } from './doc-manag-series-inactivation/add-metadatos/add-metadatos.component';
import { AddUpdateSerieSubComponent } from './doc-manag-series-inactivation/add-update-serie-sub/add-update-serie-sub.component';
import { DocManagSeriesInactivationComponent } from './doc-manag-series-inactivation/doc-manag-series-inactivation.component';
import { DocManagTrdMigrationsComponent } from './doc-manag-trd-migrations/doc-manag-trd-migrations.component';
import { AddMetadatosTypeDocumentalComponent } from './doc-manag-type-document/add-metadatos/add-metadatos.component';
import { AddUpdateTypeDocumentComponent } from './doc-manag-type-document/add-update-type-document/add-update-type-document.component';
import { DocManagTypeDocumentComponent } from './doc-manag-type-document/doc-manag-type-document.component';
import { DocManagUploadTrdErrorsComponent } from './doc-manag-upload-trd-errors/doc-manag-upload-trd-errors.component';
import { DocManagVersionTrdCreateComponent } from './doc-manag-version-trd-create/doc-manag-version-trd-create.component';

import { ModalDocInfoModule } from "./doc-manag-folder-view/components/modal-doc-info/modal-doc-info.module";
import { ModalFileModule } from "./doc-manag-folder-view/components/modal-file/modal-file.module";
import { ModalSecurityModule } from "./doc-manag-folder-view/components/modal-security/modal-security.module";
import { ModalSelectDocModule } from "./doc-manag-folder-view/components/modal-select-doc/modal-select-doc.module";
import { ModalTrasbilidadDocModule } from "./doc-manag-folder-view/components/modal-trasbilidad-doc/modal-trasbilidad-doc.module";
import { SecurityModule } from "./doc-manag-folder-view/components/security/security.module";
import { TableFileModule } from "./doc-manag-folder-view/components/table-file/table-file.module";
import { AprovedComponent } from './modal/aproved/aproved.component';
import { ProrrogaPrestamoDocComponent } from './modal/prorroga-prestamo-doc/prorroga-prestamo-doc.component';
import { IncludeFileExpModule } from "../components/include-file-exp/include-file-exp.module";
import { ModalMapModule } from "./doc-manag-folder-view/components/modal-map/modal-map.module";
@NgModule({
  declarations: [
    DocManagMainComponent,
    DocManagDependenciesIndexComponent,
    DocManagDependenciesFormComponent,
    DocManagDependenciesCreateComponent,
    DocManagDependenciesUpdateComponent,
    DocManagDependenciesViewComponent,
    DocManagUploadTrdComponent,
    DocManagDependenciesVersionViewComponent,
    DocManagDependenciesVersionEditComponent,
    DocManagVersionTrdIndexComponent,
    DocManagVersionTrdViewComponent,
    DocManagFolderIndexComponent,
    DocManagFolderFormComponent,
    DocManagFolderCreateComponent,
    DocManagFolderUpdateComponent,
    DocManagFolderViewComponent,
    DocManagFolderIndIndexComponent,
    DocManagCrossReferenceModalComponent,
    DocManagCrossReferenceModalDialog,
    DocManagVersionTrdCreateComponent,
    DocManagProductionsOfficeIndexComponent,
    DocManagProductionsOfficeCreateComponent,
    DocManagSeriesInactivationComponent,
    AddUpdateSerieSubComponent,
    AddMetadatosComponent,
    DocManagTypeDocumentComponent,
    DocManagUploadTrdErrorsComponent,
    DocManagTrdMigrationsComponent,
    AddMetadatosTypeDocumentalComponent,
    AddUpdateTypeDocumentComponent,
    AprovedComponent,
    ProrrogaPrestamoDocComponent
  ],
  imports: [
    CommonModule,
    SecurityModule,
    DocumentManagementRoutingModule,
    MaterialModule,
    FormsModule,
    TableFileModule,
    ModalFileModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalSecurityModule,
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
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ModalDocInfoModule,
    ModalTrasbilidadDocModule,
    ModalSelectDocModule,
    IncludeFileExpModule,
    ModalMapModule
  ],
  exports: [],
  providers: [BnNgIdleService]
})
export class DocumentManagementModule { }

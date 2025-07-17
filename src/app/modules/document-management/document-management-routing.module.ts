/**

 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
/**
 * Importación de componentes
 */
import { DocManagMainComponent } from "./doc-manag-main/doc-manag-main.component";
/** Dependences */
import { DocManagDependenciesIndexComponent } from "./doc-manag-dependencies-index/doc-manag-dependencies-index.component";
import { DocManagDependenciesCreateComponent } from "./doc-manag-dependencies-create/doc-manag-dependencies-create.component";
import { DocManagDependenciesUpdateComponent } from "./doc-manag-dependencies-update/doc-manag-dependencies-update.component";
import { DocManagDependenciesViewComponent } from "./doc-manag-dependencies-view/doc-manag-dependencies-view.component";
import { DocManagDependenciesVersionViewComponent } from "./doc-manag-dependencies-version-view/doc-manag-dependencies-version-view.component";
import { DocManagDependenciesVersionEditComponent } from "./doc-manag-dependencies-version-edit/doc-manag-dependencies-version-edit.component";
/** Carga de TRD */
import { DocManagUploadTrdComponent } from "./doc-manag-upload-trd/doc-manag-upload-trd.component";
/** Versionamiento de TRD */
import { DocManagVersionTrdIndexComponent } from "./doc-manag-version-trd-index/doc-manag-version-trd-index.component";
import { DocManagVersionTrdViewComponent } from "./doc-manag-version-trd-view/doc-manag-version-trd-view.component";
// Expedientes
import { DocManagFolderIndexComponent } from "./doc-manag-folder-index/doc-manag-folder-index.component";
import { DocManagFolderUpdateComponent } from "./doc-manag-folder-update/doc-manag-folder-update.component";
import { DocManagFolderViewComponent } from "./doc-manag-folder-view/doc-manag-folder-view.component";
// import { DocManagFolderFormComponent } from './doc-manag-folder-form/doc-manag-folder-form.component';
import { DocManagFolderCreateComponent } from "./doc-manag-folder-create/doc-manag-folder-create.component";
import { DocManagFolderIndIndexComponent } from "./doc-manag-folder-ind-index/doc-manag-folder-ind-index.component";
import { DocManagVersionTrdCreateComponent } from './doc-manag-version-trd-create/doc-manag-version-trd-create.component';
import { DocManagProductionsOfficeIndexComponent } from './doc-manag-productions-office-index/doc-manag-productions-office-index.component';
import { DocManagProductionsOfficeCreateComponent } from './doc-manag-productions-office-create/doc-manag-productions-office-create.component';
import { DocManagLoanViewComponent } from "./doc-manag-loan-view/doc-manag-loan-view.component";
import { DocManagLoanModalComponent } from "./doc-manag-loan-modal/doc-manag-loan-modal.component";

//HU-022 Inactivación serie subserie 
import { DocManagSeriesInactivationComponent } from './doc-manag-series-inactivation/doc-manag-series-inactivation.component';
//HU-024 Inactivación serie subserie 
import { DocManagTypeDocumentComponent } from './doc-manag-type-document/doc-manag-type-document.component';
import { DocInventoryComponent } from "./doc-inventory/doc-inventory.component";

const routes: Routes = [

  // Dependencias
  { path: "dependencies-index", component: DocManagDependenciesIndexComponent },
  { path: "dependencies-create", component: DocManagDependenciesCreateComponent },
  { path: "dependencies-update/:id", component: DocManagDependenciesUpdateComponent },
  { path: "dependencies-view/:id", component: DocManagDependenciesViewComponent },
  { path: "dependencies-version-view/:id", component: DocManagDependenciesVersionViewComponent },
  { path: "dependencies-version-edit/:id", component: DocManagDependenciesVersionEditComponent },
  /** Carga TRG */
  { path: "upload-trd", component: DocManagUploadTrdComponent },
  /** Versionamiento TRG */
  { path: "version-trd-index", component: DocManagVersionTrdIndexComponent },
  { path: "version-trd-view/:id", component: DocManagVersionTrdViewComponent },
  { path: "version-trd-create", component: DocManagVersionTrdCreateComponent },
  { path: "version-trd-update/:id", component: DocManagVersionTrdCreateComponent },
  // Expedientes
  { path: "folder-index/:params", component: DocManagFolderIndexComponent },
  { path: "folder-create", component: DocManagFolderCreateComponent },
  { path: "folder-create/:radiSelected", component: DocManagFolderCreateComponent },
  { path: "folder-update/:id", component: DocManagFolderUpdateComponent },
  { path: "folder-view/:id", component: DocManagFolderViewComponent },
  { path: "folder-ind-index/:id", component: DocManagFolderIndIndexComponent },
  { path: "folder-series-inactivation", component: DocManagSeriesInactivationComponent },
  { path: "folder-type-documental", component: DocManagTypeDocumentComponent },
  /* Oficinas productoras  */
  { path: "production-office-trd-index", component: DocManagProductionsOfficeIndexComponent },
  { path: "production-office-trd-create", component: DocManagProductionsOfficeCreateComponent },
  { path: "production-office-trd-update/:id", component: DocManagProductionsOfficeCreateComponent },
  { path: "folder-view-loan", component: DocManagLoanViewComponent},
  { path: 'folder-loan/:edit', component: DocManagLoanModalComponent },
  { path: 'doc-inventory/:id', component: DocInventoryComponent }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentManagementRoutingModule { }

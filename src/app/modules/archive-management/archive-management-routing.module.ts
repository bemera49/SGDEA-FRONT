/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes Generales
 */
import { ArchiveManagementMainComponent } from './archive-management-main/archive-management-main.component';
// physical space
import { ArcManagPhysicalSpaceIndexComponent } from './arc-manag-physical-space-index/arc-manag-physical-space-index.component';
import { ArcManagPhysicalSpaceCreateComponent } from './arc-manag-physical-space-create/arc-manag-physical-space-create.component';
import { ArcManagPhysicalSpaceUpdateComponent } from './arc-manag-physical-space-update/arc-manag-physical-space-update.component';
import { ArcManagPhysicalSpaceViewComponent } from './arc-manag-physical-space-view/arc-manag-physical-space-view.component';
// Archive filing
import { ArcManagArchiveFilingIndexComponent } from './arc-manag-archive-filing-index/arc-manag-archive-filing-index.component';
import { ArcManagArchiveLocationComponent } from './arc-manag-archive-location/arc-manag-archive-location.component';
// Documentary transfer
import { ArcManagDocuTransferIndexComponent } from './arc-manag-docu-transfer-index/arc-manag-docu-transfer-index.component';
import { ArcManagMassTransferComponent } from './arc-manag-mass-transfer/arc-manag-mass-transfer.component';
import { ArcManagBulkLoadComponent } from './arc-manag-bulk-load/arc-manag-bulk-load.component';

const routes: Routes = [
 
      // physical space
      { path: 'physical-space-index', component: ArcManagPhysicalSpaceIndexComponent },
      { path: 'physical-space-create', component: ArcManagPhysicalSpaceCreateComponent },
      { path: 'physical-space-update/:id', component: ArcManagPhysicalSpaceUpdateComponent },
      { path: 'physical-space-view/:id', component: ArcManagPhysicalSpaceViewComponent },
      // Archive filing
      { path: 'archive-filing-index', component: ArcManagArchiveFilingIndexComponent },
      { path: 'archive-location/:id', component: ArcManagArchiveLocationComponent },
      // Documentary transfer
      { path: 'documentary-transfer-index', component: ArcManagDocuTransferIndexComponent },
      { path: 'documentary-transfer-index/:params', component: ArcManagDocuTransferIndexComponent },
      { path: 'upload-mass-transfer',  component: ArcManagMassTransferComponent },
      { path: 'bulk-load',  component: ArcManagBulkLoadComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveManagementRoutingModule { }

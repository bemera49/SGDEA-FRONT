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

/**
 * Importación de modulos
 */
import { ArchiveManagementRoutingModule } from "./archive-management-routing.module";
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
// Physical Space
import { ArchiveManagementMainComponent } from "./archive-management-main/archive-management-main.component";
import { ArcManagPhysicalSpaceIndexComponent } from "./arc-manag-physical-space-index/arc-manag-physical-space-index.component";
import { ArcManagPhysicalSpaceFormComponent } from "./arc-manag-physical-space-form/arc-manag-physical-space-form.component";
import { ArcManagPhysicalSpaceCreateComponent } from "./arc-manag-physical-space-create/arc-manag-physical-space-create.component";
import { ArcManagPhysicalSpaceUpdateComponent } from "./arc-manag-physical-space-update/arc-manag-physical-space-update.component";
import { ArcManagPhysicalSpaceViewComponent } from "./arc-manag-physical-space-view/arc-manag-physical-space-view.component";
// Archive filing
import { ArcManagArchiveFilingIndexComponent } from "./arc-manag-archive-filing-index/arc-manag-archive-filing-index.component";
import {
    ArcManagModalArchiveComponent,
    ArchiveDialog,
} from "./arc-manag-modal-archive/arc-manag-modal-archive.component";
import { ArcManagArchiveLocationComponent } from "./arc-manag-archive-location/arc-manag-archive-location.component";
import { ArcManagDocuTransferIndexComponent } from "./arc-manag-docu-transfer-index/arc-manag-docu-transfer-index.component";
import { ArcManagMassTransferComponent } from "./arc-manag-mass-transfer/arc-manag-mass-transfer.component";
import { ArcManagBulkLoadComponent } from "./arc-manag-bulk-load/arc-manag-bulk-load.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { TableComponent } from "../components/table/table.component";
import { AddFileComponent } from './arc-manag-physical-space-form/add-file/add-file.component';
import { MoveFileComponent } from './arc-manag-physical-space-form/move-file/move-file.component';
import { RemoveFileComponent } from './arc-manag-physical-space-form/remove-file/remove-file.component';
import { AddBoxComponent } from './arc-manag-physical-space-form/add-box/add-box.component';
import { MoveBoxComponent } from './arc-manag-physical-space-form/move-box/move-box.component';
import { RemoveBoxComponent } from './arc-manag-physical-space-form/remove-box/remove-box.component';

@NgModule({
    declarations: [
        ArchiveManagementMainComponent,
        ArcManagPhysicalSpaceIndexComponent,
        ArcManagPhysicalSpaceFormComponent,
        ArcManagPhysicalSpaceCreateComponent,
        ArcManagPhysicalSpaceUpdateComponent,
        ArcManagPhysicalSpaceViewComponent,
        ArcManagArchiveFilingIndexComponent,
        ArcManagModalArchiveComponent,
        ArchiveDialog,
        ArcManagArchiveLocationComponent,
        ArcManagDocuTransferIndexComponent,
        ArcManagMassTransferComponent,
        ArcManagBulkLoadComponent,
        AddFileComponent,
        MoveFileComponent,
        RemoveFileComponent,
        AddBoxComponent,
        MoveBoxComponent,
        RemoveBoxComponent,
    ],
    imports: [
        CommonModule,
        ArchiveManagementRoutingModule,
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
        BreadcrumbComponent,
        TableComponent
    ],
    providers: [BnNgIdleService]
})
export class ArchiveManagementModule { }

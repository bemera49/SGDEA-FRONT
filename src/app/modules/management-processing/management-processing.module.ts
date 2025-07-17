import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { ManagementProcessingRoutingModule } from './management-processing-routing.module';
import { ManagementProcessingMainComponent } from './management-processing-main/management-processing-main.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CanDirective } from '@app/directives/can.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ComponentsModule } from '../components/components.module';
import { TableComponent } from '../components/table/table.component';
import { DocumentForSignatureComponent } from './document-for-signature/document-for-signature.component';
import { SignatureFlowGenerationComponent } from './signature-flow-generation/signature-flow-generation.component';
import { DraggableTableComponent } from '../components/draggable-table/draggable-table.component';
import { VisualizeDocumentComponent } from './signature-flow-generation/visualize-document/visualize-document.component';
import { FlowVisualizationModalComponent } from './signature-flow-generation/flow-visualization-modal/flow-visualization-modal.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FlowForeignUserModalComponent } from './signature-flow-generation/flow-foreign-user-modal/flow-foreign-user-modal.component';
import { SignatureCardComponent } from './signature-flow-generation/visualize-document/signature-card/signature-card.component';
import { TablecopyComponent } from '../components/tablecopy/tablecopy.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FlowForeignUserViewModalComponent } from './signature-flow-generation/flow-foreign-user-view-modal/flow-foreign-user-view-modal.component';
import { SignatureEditComponent } from './signature-edit/signature-edit.component';
import { DraggableTableCopyComponent } from '../components/draggable-table-copy/draggable-table-copy.component';
import { SignatureHomeComponent } from './signature-home/signature-home.component';
import { SignatureInternalSignComponent } from './signature-internal-sign/signature-internal-sign.component';

@NgModule({
  declarations: [
    ManagementProcessingMainComponent,
    DocumentForSignatureComponent,
    SignatureFlowGenerationComponent,
    VisualizeDocumentComponent,
    FlowVisualizationModalComponent,
    FlowForeignUserModalComponent,
    SignatureCardComponent,
    FlowForeignUserViewModalComponent,
    SignatureEditComponent,
    SignatureHomeComponent,
    SignatureInternalSignComponent
  ],
  imports: [
    CommonModule,
    ManagementProcessingRoutingModule,
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
    AdminLayoutModule,
    ComponentsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    BreadcrumbComponent,
    TableComponent,
    CanDirective,
    AsyncPipe,
    MatRadioModule,
    DraggableTableComponent,
    DraggableTableCopyComponent,
    NgxDocViewerModule,
    TablecopyComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})
export class ManagementProcessingModule { }

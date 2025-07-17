/**

 */

import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EcoFabSpeedDialModule } from "@ecodev/fab-speed-dial";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DataTablesModule } from "angular-datatables";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MaterialModule } from "../../app.material.module";
import { BulkLoadComponent } from "./bulk-load/bulk-load.component";
import { ButtonBackArrowComponent } from "./button-back-arrow/button-back-arrow.component";
import { ComponentsRoutingModule } from "./components-routing.module";
import { DynamicFormsComponent } from "./dynamic-forms/dynamic-forms.component";
import { ErrorsFormsComponent } from "./errors-forms/errors-forms.component";
import {
  FilterInitialListComponent,
  FilterInitialListDialog,
} from "./filter-initial-list/filter-initial-list.component";
import { FlashViewComponent } from "./flash-view/flash-view.component";
import { FloatingButtonComponent } from "./floating-button/floating-button.component";
import { FormModalComponent, modalDialog } from "./form-modal/form-modal.component";
import { IncludeInFileComponent, IncludeInFileDialog } from "./include-in-file/include-in-file.component";
import { InitialListComponent } from "./initial-list/initial-list.component";
import { LoadingAppComponent } from "./loading-app/loading-app.component";
import { LoadingAuthComponent } from "./loading-auth/loading-auth.component";

import { ModalACComponent } from "./modal-ac/modal-ac.component";
import { ObservationComponent, ObservationDialog } from "./observation-dialog/observation-dialog.component";
import {
  ObservationLoansComponent,
  ObservationLoansDialog,
} from "./observation-loans-dialog/observation-loans-dialog.component";
import { SendMailComponent } from "./send-mail/send-mail.component";
import { SendReplyMailComponent, SendReplyMailDialog } from "./send-reply-mail-dialog/send-reply-mail-dialog.component";
import {
  DigitalSignDialog,
  SimpleDialog,
  SimpleDialogOption,
  SimpleTableDialog,
  SimpleTableModalComponent,
  ViewImageDialog,
} from "./simple-table-modal/simple-table-modal.component";
import { SimpleTextDialog, SimpleTextModalComponent } from "./simple-text-modal/simple-text-modal.component";
import { SubMenuComponent } from "./sub-menu/sub-menu.component";
import { TextViewerComponent } from "./text-viewer/text-viewer.component";
import { TourComponent } from "./tour/tour.component";
import { UploadFilesDialog, UploadFilesModalComponent } from "./upload-files-modal/upload-files-modal.component";
import { UploadFilesQuestionComponent } from "./upload-files-question/upload-files-question.component";
import { UploadFilesComponent } from "./upload-files/upload-files.component";
import { UploadMassTransferComponent } from "./upload-mass-transfer/upload-mass-transfer.component";
import { UploadMassiveFilesDetailModalComponent } from "./upload-massive-files-detail-modal/upload-massive-files-detail-modal.component";
import {
  UploadMassiveFilesDialog,
  UploadMassiveFilesModalComponent,
} from "./upload-massive-files-modal/upload-massive-files-modal.component";
import { ViewDependenciesComponent } from "./view-dependencies/view-dependencies.component";
import { ViewHistoryComponent } from "./view-history/view-history.component";
import { ViewListComponent } from "./view-list/view-list.component";
import { ViewPdfModalComponent, ViewPdfModalDialog } from "./view-pdf-modal/view-pdf-modal.component";
import { ViewPdfComponent } from "./view-pdf/view-pdf.component";
import { ModalAcceptComponent } from "./modal-accept/modal-accept.component";
import { TableExpModule } from "./table-exp/table-exp.module";
import { ModalConfirmModule } from "./modal-confirm/modal-confirm.module";
import { SirenIconComponent } from './siren-icon/siren-icon.component';
import { CooperativeModalComponent } from './cooperative-modal/cooperative-modal.component';
import { CooperativeEditModalComponent } from './cooperative-edit-modal/cooperative-edit-modal.component';
import {SgdaEditorComponent} from "@app/modules/components/sgda-editor/sgda-editor.component";
import { CanDirective } from "@app/directives/can.directive";
import { ModalRedirectModule } from "./modal-redirect/modal-redirect.module";

@NgModule({
  declarations: [
    LoadingAppComponent,
    LoadingAuthComponent,
    ErrorsFormsComponent,
    SubMenuComponent,
    InitialListComponent,
    FlashViewComponent,
    ViewListComponent,
    FloatingButtonComponent,
    TourComponent,
    TextViewerComponent,
    UploadFilesComponent,
    UploadMassTransferComponent,
    BulkLoadComponent,
    UploadFilesQuestionComponent,
    DynamicFormsComponent,
    FilterInitialListComponent,
    FilterInitialListDialog,
    ObservationComponent,
    ObservationDialog,
    ViewDependenciesComponent,
    modalDialog,
    FormModalComponent,
    UploadFilesModalComponent,
    UploadFilesDialog,
    UploadMassiveFilesModalComponent,
    UploadMassiveFilesDetailModalComponent,
    UploadMassiveFilesDialog,
    ViewPdfComponent,
    ViewPdfModalComponent,
    ViewPdfModalDialog,
    IncludeInFileComponent,
    IncludeInFileDialog,
    SimpleTableModalComponent,
    SimpleTableDialog,
    SimpleDialog,
    DigitalSignDialog,
    SimpleDialogOption,
    ViewImageDialog,
    ObservationLoansComponent,
    ObservationLoansDialog,
    ViewHistoryComponent,
    SimpleTextModalComponent,
    SimpleTextDialog,
    SendReplyMailComponent,
    SendReplyMailDialog,
    SendMailComponent,
    /*     PqrsFormComponent, */
    ModalACComponent,
    ButtonBackArrowComponent,
    UploadMassTransferComponent,
    BulkLoadComponent,
    ModalAcceptComponent,
    SirenIconComponent,
    CooperativeModalComponent,
    CooperativeEditModalComponent,
  ],
  imports: [
    CanDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsRoutingModule,
    DataTablesModule,
    MatButtonModule,
    MatIconModule,
    EcoFabSpeedDialModule,
    MatProgressSpinnerModule,
    MaterialModule,
    MatDialogModule,
    FormlyMaterialModule,
    NgxMatSelectSearchModule,
    FormlyModule,
    HttpClientModule,
    TableExpModule,
    ModalConfirmModule,
    ModalRedirectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    SgdaEditorComponent,
  ],
  exports: [
    LoadingAppComponent,
    LoadingAuthComponent,
    ErrorsFormsComponent,
    SubMenuComponent,
    InitialListComponent,
    FlashViewComponent,
    ViewListComponent,
    FloatingButtonComponent,
    TourComponent,
    TextViewerComponent,
    UploadFilesComponent,
    UploadMassTransferComponent,
    BulkLoadComponent,
    UploadFilesQuestionComponent,
    ObservationComponent,
    ViewDependenciesComponent,
    FormModalComponent,
    UploadFilesModalComponent,
    UploadMassiveFilesModalComponent,
    UploadMassiveFilesDetailModalComponent,
    ViewPdfComponent,
    ViewPdfModalComponent,
    IncludeInFileComponent,
    SimpleTableModalComponent,
    ObservationLoansComponent,
    ViewHistoryComponent,
    SimpleTextModalComponent,
    SimpleDialogOption,
    ViewImageDialog,
    SendReplyMailComponent,
    SendMailComponent,
    ModalACComponent,
    ButtonBackArrowComponent
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "es-ES" },]
})
export class ComponentsModule { }

/**
 * @description dependencias y librerias
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BnNgIdleService } from 'bn-ng-idle';
import { MatTabsModule } from '@angular/material/tabs';
import { CanDirective } from "@app/directives/can.directive";

//Formularios
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';


/**
 * @description declaración de componentes
 */
import { JuridicaRoutingModule } from './juridica-routing.module';
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { MaterialModule } from '@app/app.material.module';
import { ComponentsModule } from '../../modules/components/components.module';

// modulos
import { JuridicaMainComponent } from './juridica-main/juridica-main.component';
import { JuridicaViewRequestComponent } from './juridica-view-request/juridica-view-request.component';
import { JuridicaDetailRequestComponent } from './juridica-detail-request/juridica-detail-request.component';

// componentes de modulos
import { SubMenuJuridicalModule } from './juridica-main/components/sub-menu-juridica/sub-menu-juridical.module';
import { TableRequestModule } from './juridica-view-request/components/table-request/table-request.module';
import { GeneralInformationComponent } from './juridica-detail-request/components/general-information/general-information.component';
import { RequestExtensionComponent } from './juridica-detail-request/components/request-extension/request-extension.component';
import { AttachmentsComponent } from './juridica-detail-request/components/view-attachments/attachments.component';
import { SearchConceptComponent } from './juridica-detail-request/components/search-concept/search-concept.component';
import { PaginationComponent } from 'src/app/modules/components/table/pagination/pagination-component/pagination.component';
import { ModifyAttachmentsComponent } from './juridica-detail-request/components/modify-attachments/modify-attachments.component';
import { GeneralInformationFillComponent } from './juridica-detail-request/components/general-information-fill/general-information-fill.component';
import { ProfessionalAssignmentsComponent } from './juridica-detail-request/components/professional-assignments/professional-assignments.component'
import { SgdaEditorComponent } from '../components/sgda-editor/sgda-editor.component';
import { TemplateSecurityComponent } from './juridica-detail-request/components/template-security/template-security.component';
import { FichaRelatoriaComponent } from './juridica-detail-request/components/ficha-relatoria/ficha-relatoria.component';
import { ObservacionesComponent } from './juridica-detail-request/components/observaciones/observaciones.component';
import { DetailAnexosComponent } from './juridica-detail-request/components/detail-anexos/detail-anexos.component';

@NgModule({
  declarations: [
    JuridicaMainComponent,
    JuridicaViewRequestComponent,
    JuridicaDetailRequestComponent,
    GeneralInformationComponent,
    RequestExtensionComponent,
    AttachmentsComponent,
    SearchConceptComponent,
    ModifyAttachmentsComponent,
    GeneralInformationFillComponent,
    ProfessionalAssignmentsComponent,
    TemplateSecurityComponent,
    FichaRelatoriaComponent,
    ObservacionesComponent,
    DetailAnexosComponent,
    
  ],
  imports: [
    JuridicaRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatStepperModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    PaginationComponent,
    SgdaEditorComponent,
    TableRequestModule,
    SubMenuJuridicalModule,

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
    ComponentsModule,
    CanDirective //Necesaria para activar las operaciones
  ],
  exports: [],
  providers: [BnNgIdleService, NativeDateAdapter, DatePipe]
})
export class JuridicaModule { }

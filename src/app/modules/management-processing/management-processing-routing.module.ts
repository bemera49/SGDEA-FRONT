import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementProcessingMainComponent } from './management-processing-main/management-processing-main.component';
import { DocumentForSignatureComponent } from './document-for-signature/document-for-signature.component';
import { SignatureFlowGenerationComponent } from './signature-flow-generation/signature-flow-generation.component';
import { VisualizeDocumentComponent } from './signature-flow-generation/visualize-document/visualize-document.component';
import { SignatureDetailComponent } from './signature-detail/signature-detail.component';
import { SignatureEditComponent } from './signature-edit/signature-edit.component';
import { SignatureHomeComponent } from './signature-home/signature-home.component';
import { SignatureInternalSignComponent } from './signature-internal-sign/signature-internal-sign.component';
const routes: Routes = [

  { path: '', component: DocumentForSignatureComponent },
  { path: 'home', component: SignatureHomeComponent},
  { path: 'internal-signin/:id', component: SignatureInternalSignComponent},
  { path: 'detail/:id', component: SignatureDetailComponent },
  { path: 'create/:id', component: SignatureFlowGenerationComponent },
  { path: 'create/:id/document', component: VisualizeDocumentComponent },
  { path: 'edit/:id', component: SignatureEditComponent }


];
ManagementProcessingMainComponent
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementProcessingRoutingModule { }

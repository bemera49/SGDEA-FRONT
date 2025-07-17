import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentSigningComponent } from './document-signing/document-signing.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'document-signing',
      component: DocumentSigningComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementProcedureRoutingModule { }

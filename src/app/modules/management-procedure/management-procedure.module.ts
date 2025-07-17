import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementProcedureRoutingModule } from './management-procedure-routing.module';
import { DocumentSigningComponent } from './document-signing/document-signing.component';


@NgModule({
  declarations: [
    DocumentSigningComponent
  ],
  imports: [
    CommonModule,
    ManagementProcedureRoutingModule
  ]
})
export class ManagementProcedureModule { }

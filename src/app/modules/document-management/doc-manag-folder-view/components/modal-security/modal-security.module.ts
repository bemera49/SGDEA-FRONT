import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalModifyModule } from '../modal-modify/modal-modify.module';
import { TableAuthDocModule } from '../table-auth-doc/table-auth-doc.module';
import { TableDependencyDocModule } from '../table-dependency-doc/table-dependency-doc.module';
import { ModalSecurityComponent } from './modal-security.component';
import { ModalConfirmModule } from '@app/modules/components/modal-confirm/modal-confirm.module';
@NgModule({
  declarations: [
    ModalSecurityComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    TableDependencyDocModule,
    TableAuthDocModule,
    ModalModifyModule,
    ModalConfirmModule
  ],
  exports: [ModalSecurityComponent]
})
export class ModalSecurityModule { }

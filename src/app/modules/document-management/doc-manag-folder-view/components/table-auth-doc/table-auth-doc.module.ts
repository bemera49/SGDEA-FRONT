import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { JoinPermissionsModule } from '../../pipe/join-permissions/join-permissions.module';
import { ContainerButtonsModule } from '../container-buttons/container-buttons.module';
import { ModalAuthDocModule } from '../modal-auth-doc/modal-auth-doc.module';
import { TableAuthDocComponent } from './table-auth-doc.component';
import { ModalDeleteModule } from '../modal-delete/modal-delete.module';

@NgModule({
  declarations: [
    TableAuthDocComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ContainerButtonsModule,
    ModalAuthDocModule,
    JoinPermissionsModule,
    ModalDeleteModule
  ],
  exports: [TableAuthDocComponent]
})
export class TableAuthDocModule { }

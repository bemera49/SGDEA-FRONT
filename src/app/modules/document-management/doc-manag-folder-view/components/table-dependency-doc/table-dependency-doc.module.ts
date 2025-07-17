import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { JoinPermissionsModule } from '../../pipe/join-permissions/join-permissions.module';
import { ContainerButtonsModule } from '../container-buttons/container-buttons.module';
import { ModalDeleteModule } from '../modal-delete/modal-delete.module';
import { ModalDependencyDocModule } from '../modal-dependency-doc/modal-dependency-doc.module';
import { TableDependencyDocComponent } from './table-dependency-doc.component';


@NgModule({
  declarations: [
    TableDependencyDocComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ContainerButtonsModule,
    JoinPermissionsModule,
    ModalDeleteModule,
    ModalDependencyDocModule
  ],
  exports: [TableDependencyDocComponent]
})
export class TableDependencyDocModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ContainerButtonsModule } from '../container-buttons/container-buttons.module';
import { ModalDependencyModule } from '../modal-dependency/modal-dependency.module';
import { TableDependencyComponent } from './table-dependency.component';
import { JoinPermissionsModule } from '../../pipe/join-permissions/join-permissions.module';
import { ModalDeleteModule } from '../modal-delete/modal-delete.module';

@NgModule({
  declarations: [
    TableDependencyComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ContainerButtonsModule,
    ModalDependencyModule,
    JoinPermissionsModule,
    ModalDeleteModule
  ],
  exports: [TableDependencyComponent]
})
export class TableDependencyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAuthComponent } from './table-auth.component';
import { MatTableModule } from '@angular/material/table';
import { ContainerButtonsModule } from '../container-buttons/container-buttons.module';
import { ModalAuthModule } from '../modal-auth/modal-auth.module';
import { JoinPermissionsModule } from '../../pipe/join-permissions/join-permissions.module';

@NgModule({
  declarations: [
    TableAuthComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ContainerButtonsModule,
    ModalAuthModule,
    JoinPermissionsModule
  ],
  exports:[TableAuthComponent]
})
export class TableAuthModule { }

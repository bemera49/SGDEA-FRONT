import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalModifyModule } from '../modal-modify/modal-modify.module';
import { TableAuthModule } from '../table-auth/table-auth.module';
import { TableDependencyModule } from '../table-dependency/table-dependency.module';
import { SecurityComponent } from './security.component';
/* import {ModalModifyModule} from './' */

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    ModalModifyModule,
    TableDependencyModule,
    TableAuthModule,


  ],
  exports: [SecurityComponent]
})
export class SecurityModule { }


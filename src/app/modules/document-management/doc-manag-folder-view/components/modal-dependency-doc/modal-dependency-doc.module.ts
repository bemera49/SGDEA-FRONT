import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDependencyDocComponent } from './modal-dependency-doc.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ModalDependencyDocComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports:[ModalDependencyDocComponent]
})
export class ModalDependencyDocModule { }

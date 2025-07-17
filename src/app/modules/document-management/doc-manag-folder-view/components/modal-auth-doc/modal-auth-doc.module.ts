import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAuthDocComponent } from './modal-auth-doc.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ModalAuthDocComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatOptionModule
  ],
  exports:[ModalAuthDocComponent]
})
export class ModalAuthDocModule { }

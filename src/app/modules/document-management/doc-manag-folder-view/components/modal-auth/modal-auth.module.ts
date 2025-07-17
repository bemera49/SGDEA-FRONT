import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAuthComponent } from './modal-auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
@NgModule({
  declarations: [
    ModalAuthComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatOptionModule
  ],
  exports:[ModalAuthComponent]
})
export class ModalAuthModule { }

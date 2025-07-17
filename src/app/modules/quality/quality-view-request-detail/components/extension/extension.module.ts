import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestExtensionComponent } from './components/request-extension/request-extension.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutSectionModule } from '../layout-section/layout-section.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@app/app.material.module';



@NgModule({
  declarations: [
    RequestExtensionComponent
  ],
  exports: [
    RequestExtensionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutSectionModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
  ]
})
export class ExtensionModule { }

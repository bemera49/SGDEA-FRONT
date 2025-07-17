/**

 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RegisterRoutingModule } from "./register-routing.module";
//import { MaterialModule } from '../../app.material.module';

/**
 * Importación de componentes
 */
import { RegisterMainComponent } from "./register-main/register-main.component";

/**
 * Importación de módulos
 */
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthLayoutModule } from "../auth-layout/auth-layout.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [RegisterMainComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    //MaterialModule,
    /**
     * Modulos
     */
    AuthLayoutModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class RegisterModule { }

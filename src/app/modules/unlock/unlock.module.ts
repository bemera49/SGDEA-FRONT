/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UnlockRoutingModule } from "./unlock-routing.module";
import { MatInputModule } from "@angular/material/input";

/**
 * Importación de componentes
 */
import { UnlockMainComponent } from "./unlock-main/unlock-main.component";

/**
 * Importación de módulos
 */
import { AuthLayoutModule } from "../auth-layout/auth-layout.module";

@NgModule({
  declarations: [UnlockMainComponent],
  imports: [
    CommonModule,
    UnlockRoutingModule,
    MatInputModule,
    /**
     * Modulos
     */
    AuthLayoutModule,
  ],
})
export class UnlockModule {}

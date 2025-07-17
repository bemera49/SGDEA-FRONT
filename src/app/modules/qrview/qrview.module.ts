/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";

import { QrviewRoutingModule } from "./qrview-routing.module";
import { QrviewMainComponent } from "./qrview-main/qrview-main.component";

import { AuthLayoutModule } from "../auth-layout/auth-layout.module";

@NgModule({
  declarations: [QrviewMainComponent],
  imports: [
    CommonModule,
    QrviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    AuthLayoutModule,
  ],
})
export class QrviewModule {}

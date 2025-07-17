/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { MaterialModule } from '../../app.material.module';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";

// Librería recaptcha de google
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from "ng-recaptcha";

/**
 * Importación de componentes
 */
import { ResetPassMainComponent } from "./reset-pass-main/reset-pass-main.component";

/**
 * Importación de módulos
 */
import { AuthLayoutModule } from "../auth-layout/auth-layout.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [ResetPassMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),

    //MaterialModule,
    /**
     * Modulos
     */
    AuthLayoutModule,
    RecaptchaModule,
  ],
})
export class ResetPassModule {}

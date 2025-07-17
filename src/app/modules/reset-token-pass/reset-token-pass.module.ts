/**

 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { MaterialModule } from '../../app.material.module';

/**
 * Importación de componentes
 */
import { ResetTokenPassMainComponent } from './reset-token-pass-main/reset-token-pass-main.component';

/**
 * Importación de módulos
 */
import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ResetTokenPassMainComponent],
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
        deps: [ HttpClient ]
      }
    }),
    //MaterialModule,
    /**
     * Modulos
     */
    AuthLayoutModule,
  ]
})
export class ResetTokenPassModule { }

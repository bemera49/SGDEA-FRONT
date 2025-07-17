/**

 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpMainComponent } from './help-main/help-main.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';

/**
 * Importación de módulos
 */
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [HelpMainComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    /**
     * Modulos
     */
    AdminLayoutModule,
    ComponentsModule,
  ],
  providers: [BnNgIdleService]
})
export class HelpModule { }

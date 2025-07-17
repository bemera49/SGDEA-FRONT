/**

 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

/**
 * Importación de módulos
 */
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { ComponentsModule } from '../components/components.module';
import { BnNgIdleService } from 'bn-ng-idle';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
export class DashboardModule { }

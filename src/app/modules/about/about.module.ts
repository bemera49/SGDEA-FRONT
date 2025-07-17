/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BnNgIdleService } from 'bn-ng-idle';

import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";

import { AboutRoutingModule } from "./about-routing.module";
import { AboutMainComponent } from "./about-main/about-main.component";
import { AboutViewComponent } from "./about-view/about-view.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";

@NgModule({
  declarations: [AboutMainComponent, AboutViewComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
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
    AdminLayoutModule,
    ComponentsModule,
    BreadcrumbComponent
  ],
  providers: [BnNgIdleService]
})
export class AboutModule { }

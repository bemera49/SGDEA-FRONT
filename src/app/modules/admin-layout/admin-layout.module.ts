import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AdminLayoutRoutingModule } from "./admin-layout-routing.module";
import { AdminTopNavBarComponent } from "./admin-top-nav-bar/admin-top-nav-bar.component";
import { AdminAsideNavBarComponent } from "./admin-aside-nav-bar/admin-aside-nav-bar.component";
import { AdminFooterNavBarComponent } from "./admin-footer-nav-bar/admin-footer-nav-bar.component";
import { AdminTopNavAlfrescoComponent } from "./admin-top-nav-alfresco/admin-top-nav-alfresco.component";
import { AdminMenuAsideNavComponent } from "./admin-menu-aside-nav/admin-menu-aside-nav.component";
import { AdminSideNavBarComponent } from "./admin-side-nav-bar/admin-side-nav-bar.component";
import { MaterialModule } from "@app/app.material.module";
import { SocketHelper } from "@app/services/socket.helper";

@NgModule({
  declarations: [
    AdminTopNavBarComponent,
    AdminAsideNavBarComponent,
    AdminFooterNavBarComponent,
    AdminTopNavAlfrescoComponent,
    AdminMenuAsideNavComponent,
    AdminSideNavBarComponent,
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    AdminTopNavBarComponent,
    AdminAsideNavBarComponent,
    AdminFooterNavBarComponent,
    AdminTopNavAlfrescoComponent,
    AdminMenuAsideNavComponent,
    AdminSideNavBarComponent,
  ],
  providers: [SocketHelper],
})
export class AdminLayoutModule {}

/**

 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';

/**
 * Importación de componentes
 */
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';

import { MailboxComponent } from './mailbox/mailbox.component';

@NgModule({
  declarations: [
    AuthNavComponent,
    AuthFooterComponent,
    MailboxComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule
  ],
  exports: [
    AuthNavComponent,
    AuthFooterComponent
  ]
})
export class AuthLayoutModule { }

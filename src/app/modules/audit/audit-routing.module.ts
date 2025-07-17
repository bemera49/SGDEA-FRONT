/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes
 */
import { AuditMainComponent } from './audit-main/audit-main.component';
// Audit Log
import { AuditLogIndexComponent } from './audit-log-index/audit-log-index.component';
import { AuditLogViewComponent } from './audit-log-view/audit-log-view.component';

const routes: Routes = [
  {
    path: 'audit', component: AuditMainComponent,
    children: [
      // Audit Log
      { path: 'log-audit-index', component: AuditLogIndexComponent },
      { path: 'log-audit-view/:id', component: AuditLogViewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }

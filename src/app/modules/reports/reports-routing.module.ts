/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes
 */
import { ReportMainComponent } from './report-main/report-main.component';
// Reports
import { ReportIndexComponent } from './report-index/report-index.component';
import { ReportsCustomComponent } from './reports-custom/reports-custom.component';

const routes: Routes = [
 
      // Audit Log
      { path: 'reports-index', component: ReportIndexComponent },
      { path: 'reports-custom', component: ReportsCustomComponent },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

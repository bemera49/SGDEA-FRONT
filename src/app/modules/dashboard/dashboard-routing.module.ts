/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [BnNgIdleService],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

/**
 * @description dependencias y librerias
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * @description declaración de componentes
 */
import { JuridicaMainComponent } from './juridica-main/juridica-main.component';
import { JuridicaViewRequestComponent } from './juridica-view-request/juridica-view-request.component';
import { JuridicaDetailRequestComponent } from './juridica-detail-request/juridica-detail-request.component';

const routes: Routes = [
  { path: 'view-request', component: JuridicaViewRequestComponent },
  { path: 'detail-request', component: JuridicaDetailRequestComponent },
  { path: 'detail-request/:id', component: JuridicaDetailRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuridicaRoutingModule { }


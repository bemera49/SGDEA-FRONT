/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes Generales
 */
import { EFilingMainComponent } from './e-filing-main/e-filing-main.component';
import { EFilingIndexComponent } from './e-filing-index/e-filing-index.component';
import { EFilingFormComponent } from './e-filing-form/e-filing-form.component';



 const routes: Routes = [
    {
        path: '',
        component: EFilingMainComponent,
        children: [
            { path: 'index', component: EFilingIndexComponent },
            { path: 'form', component: EFilingFormComponent }
        ]
    }
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EFilingRoutingModule { }
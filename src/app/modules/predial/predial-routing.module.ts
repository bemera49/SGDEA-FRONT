import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredialCreateRequestComponent } from './predial-create-request/predial-create-request.component';
import { PredialMainComponent } from './predial-main/predial-main.component';

const routes: Routes = [
  {
    path: '',
    component: PredialMainComponent,
    children: [
      { 
        path: 'predial-create-request', 
        component: PredialCreateRequestComponent 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredialRoutingModule { }

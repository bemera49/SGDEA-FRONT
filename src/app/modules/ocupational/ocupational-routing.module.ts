import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcupationalMainComponent } from './ocupational-main/ocupational-main.component';
/** Analistas-Inactivar */
import { OcupationalNotificationIndexComponent } from './ocupational-notification-index/ocupational-notification-index.component';
import { OcupationalRequestIndexComponent } from './ocupational-request-index/ocupational-request-index.component';
import { OcupationalViewRequestDetailComponent } from './ocupational-view-request-detail/ocupational-view-request-detail.component';
import { OcupationalViewRequestComponent } from './ocupational-view-request/ocupational-view-request.component';
import { OcupationalViewNotificationDetailComponent } from './ocupational-view-notification-detail/ocupational-view-notification-detail.component';
import { OcupationalNotificationClosedIndexComponent } from './ocupational-notification-closed-index/ocupational-notification-closed-index.component';


const routes: Routes = [
      // physical space
      { path: 'ocupational-notification-index', component: OcupationalNotificationIndexComponent },
      { path: 'ocupational-request-index', component: OcupationalRequestIndexComponent },
      { path: 'ocupational-view-request', component: OcupationalViewRequestComponent, },
      { path: 'ocupational-view-request/:id/:idTypeTask', component: OcupationalViewRequestDetailComponent, },
      { path: 'ocupational-view-requestuser/:idUsuario/:idRequest', component: OcupationalViewRequestDetailComponent, },
      { path: 'ocupational-view-notification/:id/:idTypeTask', component: OcupationalViewNotificationDetailComponent, },
      { path: 'ocupational-reset-index', component: OcupationalRequestIndexComponent },
      { path: 'ocupational-notification-closed-index', component: OcupationalNotificationClosedIndexComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcupationalRoutingModule { }

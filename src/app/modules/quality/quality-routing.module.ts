import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityCreateRequestComponent } from './quality-create-request/quality-create-request.component';
import { QualityDownloadTemplateComponent } from './quality-download-template/quality-download-template.component';
import { QualityMainComponent } from './quality-main/quality-main.component';
import { QualityMapProcessComponent } from './quality-map-process/quality-map-process.component';
import { QualityModifyComponent } from './quality-modify/quality-modify.component';
import { Step2Component } from './quality-process-map/quality-process-detail/pantalla-a/Components/step2/step2.component';
import { Step3Component } from './quality-process-map/quality-process-detail/pantalla-a/Components/step3/step3.component';
import { PantallaAComponent } from './quality-process-map/quality-process-detail/pantalla-a/pantalla-a.component';
import { AlternateDataViewerStepOneComponent } from './quality-process-map/quality-process-detail/pantalla-b/Components/alternate-data-viewer-step-one/alternate-data-viewer-step-one.component';
import { AlternateDataViewerStepTwoComponent } from './quality-process-map/quality-process-detail/pantalla-b/Components/alternate-data-viewer-step-two/alternate-data-viewer-step-two.component';
import { PantallaBComponent } from './quality-process-map/quality-process-detail/pantalla-b/pantalla-b.component';
import { QualityProcessDetailComponent } from './quality-process-map/quality-process-detail/quality-process-detail.component';
import { QualityProcessMapComponent } from './quality-process-map/quality-process-map.component';
import { QualityTasksReceivedComponent } from './quality-tasks-received/quality-tasks-received.component';
import { QualityViewRequestDetailComponent } from './quality-view-request-detail/quality-view-request-detail.component';
import { QualityViewRequestComponent } from './quality-view-request/quality-view-request.component';
/** Analistas-Inactivar */
import { QualityAnalystsIndexComponent } from './quality-analyst-index/quality-analyst-index.component';
import { QualityDocMetadataComponent } from './quality-doc-metadata/quality-doc-metadata.component';


const routes: Routes = [
  {
    path: 'quality', component: QualityMainComponent,
    children: [
      // physical space
      { path: 'quality-process-map', component: QualityProcessMapComponent, },
      { path: 'quality-create-request', component: QualityCreateRequestComponent, },
      { path: 'quality-view-request', component: QualityViewRequestComponent, },
      { path: 'quality-view-request/:id', component: QualityViewRequestDetailComponent, },
      { path: 'quality-doc-metadata/:docId/:taskId', component: QualityDocMetadataComponent, },
      { path: 'quality-tasks-received', component: QualityTasksReceivedComponent, },
      { path: 'quality-modify/:id', component: QualityModifyComponent },
      { path: 'quality-download-template', component: QualityDownloadTemplateComponent },
      { path: 'quality-process-map/:id', component: QualityProcessDetailComponent },
      { path: 'quality-process-map/pantalla-a', component: PantallaAComponent },
      { path: 'quality-process-map/pantalla-a/step2', component: Step2Component },
      { path: 'quality-process-map/pantalla-a/step3', component: Step3Component },
      { path: 'quality-process-map/pantalla-b', component: PantallaBComponent },
      { path: 'quality-process-map/pantalla-b/step2b', component: AlternateDataViewerStepOneComponent },
      { path: 'quality-process-map/pantalla-b/step3b', component: AlternateDataViewerStepTwoComponent },
      { path: 'quality-map-test/:id', component: QualityMapProcessComponent },
      { path: 'quality-analyst-index', component: QualityAnalystsIndexComponent },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule { }

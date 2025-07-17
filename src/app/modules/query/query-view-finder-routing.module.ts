/**

 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
/**
 * Importación de componentes
 */
import { QueryViewfinderMainComponent } from "./query-viewfinder-main/query-viewfinder-main.component";
// Query viewfinder
import { QueryViewfinderIndexComponent } from "./query-viewfinder-index/query-viewfinder-index.component";
import { QueryViewfinderViewComponent } from "./query-viewfinder-view/query-viewfinder-view.component";
// Folder ADI
import { QueryFolderAdiIndexComponent } from "./query-folder-adi-index/query-folder-adi-index.component";
import { QueryFolderAdiViewComponent } from "./query-folder-adi-view/query-folder-adi-view.component";
// advanced-index
import { AdvancedIndexComponent } from "./advanced-index/advanced-index.component";
import { QueryOldOrfeoIndexComponent } from "./query-old-orfeo-index/query-old-orfeo-index.component";
import { QueryOldOrfeoViewComponent } from "./query-old-orfeo-view/query-old-orfeo-view.component";
import { AccumulatedFundComponent } from "./accumulated-fund/accumulated-fund.component";

const routes: Routes = [
  {
    path: "query",
    component: QueryViewfinderMainComponent,
    children: [
      // viewfinder ADI
      { path: "viewfinder-index", component: QueryViewfinderIndexComponent },
      { path: "viewfinder-view/:id/:dab", component: QueryViewfinderViewComponent },
      // Folder ADI
      { path: "folder-adi-index", component: QueryFolderAdiIndexComponent },
      { path: "folder-adi-view/:id", component: QueryFolderAdiViewComponent },
      // advanced-index
      { path: "advanced-index", component: AdvancedIndexComponent },
      { path: "query-old-orfeo", component: QueryOldOrfeoIndexComponent },
      { path: "query-old-orfeo-view/:id", component: QueryOldOrfeoViewComponent },
      { path: "accumulated-fund", component: AccumulatedFundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryViewFinderRoutingModule {}

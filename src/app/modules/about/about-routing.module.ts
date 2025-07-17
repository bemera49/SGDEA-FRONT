/**

 */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutMainComponent } from "./about-main/about-main.component";
import { AboutViewComponent } from "./about-view/about-view.component";

const routes: Routes = [
  {
    path: "about",
    component: AboutMainComponent,
    children: [{ path: "about-view/:id", component: AboutViewComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}

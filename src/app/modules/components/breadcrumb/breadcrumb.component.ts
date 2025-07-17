/**

 */

import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbOn: any;
  @Input() breadcrumbRouteActive: string;

  constructor() { }

  ngOnInit() {
  }

}

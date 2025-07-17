import { Component, Input } from '@angular/core';
import { Items } from './items';

@Component({
  selector: 'app-sub-menu-ocupational',
  templateUrl: './sub-menu-ocupational.component.html',
  styleUrls: ['./sub-menu-ocupational.component.css']
})
export class SubMenuOcupationalComponent {
  @Input() ItemsMenu!: Items[];
}

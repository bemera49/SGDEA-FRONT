import { Component, Input } from '@angular/core';
import { Items } from './items';

@Component({
  selector: 'app-sub-menu-juridical',
  templateUrl: './sub-menu-juridical.component.html',
  styleUrls: ['./sub-menu-juridical.component.css']
})
export class SubMenuJuridicalComponent {
  @Input() ItemsMenu: Items[];
}

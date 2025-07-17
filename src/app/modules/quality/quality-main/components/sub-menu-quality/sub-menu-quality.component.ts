import { Component, Input } from '@angular/core';
import { Items } from './items';

@Component({
  selector: 'app-sub-menu-quality',
  templateUrl: './sub-menu-quality.component.html',
  styleUrls: ['./sub-menu-quality.component.css']
})
export class SubMenuQualityComponent {
  @Input() ItemsMenu!: Items[];
}

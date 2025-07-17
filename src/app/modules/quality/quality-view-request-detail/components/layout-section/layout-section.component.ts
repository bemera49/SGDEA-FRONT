import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-section',
  templateUrl: './layout-section.component.html',
  styleUrls: ['./layout-section.component.css']
})
export class LayoutSectionComponent {
  @Input() title: string = '';
}

import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-row-information',
  templateUrl: './row-information.component.html',
  styleUrls: ['./row-information.component.css']
})
export class RowInformationComponent {
  @Input() label!: string;
  @Input() info!: string;

}

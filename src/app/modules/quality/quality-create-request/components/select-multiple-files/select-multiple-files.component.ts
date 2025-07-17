import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-multiple-files',
  templateUrl: './select-multiple-files.component.html',
  styleUrls: ['./select-multiple-files.component.css']
})
export class SelectMultipleFilesComponent {
  @Input() data: any[] = [];
  @Input() nameFR: string;
}

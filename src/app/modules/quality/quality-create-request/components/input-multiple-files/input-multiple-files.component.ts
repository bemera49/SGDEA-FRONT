import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-multiple-files',
  templateUrl: './input-multiple-files.component.html',
  styleUrls: ['./input-multiple-files.component.css']
})
export class InputMultipleFilesComponent {
  @Input() type!: string;
  @Input() nameFR!: string;
  @Input() formGroup: FormGroup;
}

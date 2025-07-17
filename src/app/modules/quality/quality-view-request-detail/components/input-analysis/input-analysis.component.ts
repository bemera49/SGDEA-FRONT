import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-analysis',
  templateUrl: './input-analysis.component.html',
  styleUrls: ['./input-analysis.component.css']
})
export class InputAnalysisComponent {
  @Input() type!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
}

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-container-radio',
  templateUrl: './container-radio.component.html',
  styleUrls: ['./container-radio.component.css']
})
export class ContainerRadioComponent {
  @Input() label!: string;
  @Input() control!: FormControl;

}

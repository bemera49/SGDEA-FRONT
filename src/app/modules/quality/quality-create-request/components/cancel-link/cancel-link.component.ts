import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cancel-link',
  templateUrl: './cancel-link.component.html',
  styleUrls: ['./cancel-link.component.css']
})
export class CancelLinkComponent {
  @Input() link!: string;
  @Input() text!: string;
}

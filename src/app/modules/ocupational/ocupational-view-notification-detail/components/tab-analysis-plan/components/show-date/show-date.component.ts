import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-date',
  templateUrl: './show-date.component.html',
  styleUrls: ['./show-date.component.css']
})
export class ShowDateComponent {
  @Input() typeDate: string;
  @Input() requestDate: string | null;

}


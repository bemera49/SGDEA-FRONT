import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-meetings',
  templateUrl: './text-meetings.component.html',
  styleUrls: ['./text-meetings.component.css']
})
export class TextMeetingsComponent {
  @Input() text!: string;
  @Input() placeholder!: string

}

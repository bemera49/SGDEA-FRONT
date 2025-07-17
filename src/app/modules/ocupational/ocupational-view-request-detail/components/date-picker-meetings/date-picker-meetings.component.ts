import { Component, Input, OnInit, } from '@angular/core';

@Component({
  selector: 'app-date-picker-meetings',
  templateUrl: './date-picker-meetings.component.html',
  styleUrls: ['./date-picker-meetings.component.css']
})
export class DatePickerMeetingsComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() model: any;
  constructor() { }

  ngOnInit(): void {
  }
}

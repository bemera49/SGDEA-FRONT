import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-meetings',
  templateUrl: './select-meetings.component.html',
  styleUrls: ['./select-meetings.component.css']
})
export class SelectMeetingsComponent {
  @Input() data: any[] = [];
  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  required = false;

  onInputChange(event: Event): void {
    const selectEvent = event.target as HTMLSelectElement;
    this.model = selectEvent.value;
    this.required = this.model.trim() === '';
    this.modelChange.emit(this.model);
  }

}

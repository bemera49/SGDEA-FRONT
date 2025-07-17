import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pqrs-table',
  templateUrl: './pqrs-table.component.html',
  styleUrls: ['./pqrs-table.component.css']
})

export class PqrsTableComponent {
  @Input() data: any[];
  @Input() columns: string[];
  @Input() title: string;
}

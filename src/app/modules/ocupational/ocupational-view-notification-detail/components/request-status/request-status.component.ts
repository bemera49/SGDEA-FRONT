import { Component, Input } from '@angular/core';
import { StateRequest } from './state-request';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent {
  @Input() stateProp: string;
  state = StateRequest;
}

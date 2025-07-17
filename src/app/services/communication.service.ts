import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private refreshTraceabilitySubject = new Subject<void>();
  refreshTraceability$ = this.refreshTraceabilitySubject.asObservable();

  triggerRefreshTraceability() {
    this.refreshTraceabilitySubject.next();
  }
}

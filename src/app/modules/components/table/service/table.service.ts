import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  private eventSubject = new Subject<void>(); 
  private eventSubjectData = new BehaviorSubject<boolean>(false);

  emitEvent() {
    this.eventSubject.next();
  }

  getEvent(): Observable<any> {
    return this.eventSubject.asObservable();
  }

  refrescarCambios(): Observable<boolean> {
    return this.eventSubjectData.asObservable();
  }

  emitEventWithData(data: boolean) {
    this.eventSubjectData.next(data);
  }
}

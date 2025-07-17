import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataFileDoc } from '../../model/data-file-doc';

@Injectable({
  providedIn: 'root'
})
export class DataFileDocService {
  private data$ = new BehaviorSubject<DataFileDoc>(null);

  setDataFileDoc(value: DataFileDoc): void {
    this.data$.next(value);
  }

  getDataFileDoc(): Observable<DataFileDoc> {
    return this.data$.asObservable()
  }

}

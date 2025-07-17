import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataDocParams, ParamsDoc } from '../../model/data-doc-params';

@Injectable({
  providedIn: 'root'
})
export class DataDocParamsService {

  private dataDoc$ = new BehaviorSubject<ParamsDoc>(null);

  getDataDocParams(): Observable<ParamsDoc> {
    return this.dataDoc$.asObservable();
  }

  setDataDocParams(value: ParamsDoc): void {
    this.dataDoc$.next(value);
  }
}

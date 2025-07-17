import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private value$ = new BehaviorSubject<number>(0);
  constructor() { }

  getValue(): number {
    return this.value$.value;
  }

  setValue(value: number): void {
    this.value$.next(value);
  }

}

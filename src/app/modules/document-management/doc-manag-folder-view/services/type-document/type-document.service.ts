import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {

  private typeDoc$ = new BehaviorSubject<number>(0);

  getTypeDoc(): Observable<number> {
    return this.typeDoc$.asObservable()
  }

  setTypeDoc(value: number): void {
    this.typeDoc$.next(value);
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubProcessService {

  private idSubProcess$ = new Subject<number>();

  setIdSubProcess(id: number): void {
    this.idSubProcess$.next(id);
  }

  getIdSubProcess(): Observable<number> {
    return this.idSubProcess$.asObservable();
  }





}

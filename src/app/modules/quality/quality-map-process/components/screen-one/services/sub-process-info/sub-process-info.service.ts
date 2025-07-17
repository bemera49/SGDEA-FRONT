import { Injectable } from '@angular/core';
import { SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubProcessInfoService {

  private info$ = new Subject<SubprocessDetail | null>();


  setSubProcess(info: SubprocessDetail): void {
    this.info$.next(info);
  }

  getSubProcess(): Observable<SubprocessDetail> {
    return this.info$.asObservable();
  }



}

import { Injectable } from '@angular/core';
import { DocumentDetail, ProcessData, SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { BehaviorSubject, Observable } from 'rxjs';
import { Interceptor } from '../../interface/interceptor-data';

@Injectable({
  providedIn: 'root'
})

export class InterceptorDataService {

  private interceptor$ = new BehaviorSubject<Interceptor>(null);


  setInterceptor(type: string, data: SubprocessDetail | DocumentDetail | ProcessData): void {
    this.interceptor$.next({
      type,
      data
    })

  }


  getInterceptorObservable(): Observable<Interceptor> {
    return this.interceptor$.asObservable();
  }

}

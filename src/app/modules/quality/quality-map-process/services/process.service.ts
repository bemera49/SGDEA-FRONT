
import { Injectable } from '@angular/core';
import { ResponseInterface } from '@app/services/quality-details/Interfaces/detailsConfig';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private process$ = new Subject<ResponseInterface>();


  setProcess(process: ResponseInterface): void {
    this.process$.next(process);
  }



  getProcess(): Observable<ResponseInterface> {
    return this.process$.asObservable();
  }




}

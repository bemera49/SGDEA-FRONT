import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeTraza } from '../../model/change-traza';

@Injectable({
  providedIn: 'root'
})
export class ChangeTrazaService {

  private changeTraza$ = new BehaviorSubject<ChangeTraza>({
    dep: false,
    user: false
  });


  setDepende(value: boolean): void {
    const newData = { ...this.changeTraza$.value, dep: value }
    this.changeTraza$.next(newData);
  }

  setUsuario(value: boolean): void {
    const newData = { ...this.changeTraza$.value, user: value }
    this.changeTraza$.next(newData);
  }

  setReclasificar(value:boolean):void{
    const newData = { ...this.changeTraza$.value, recla: value }
    this.changeTraza$.next(newData);
  }


  getChangeTraza(): Observable<ChangeTraza> {
    return this.changeTraza$.asObservable()
  }
}

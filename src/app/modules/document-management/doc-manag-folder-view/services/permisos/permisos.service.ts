import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Permisos } from '../../model/permisos';
@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private premisos$ = new BehaviorSubject<Permisos[]>([]);

  getPermisos(): Observable<Permisos[]> {
    return this.premisos$.asObservable();
  }

  setPermisos(value: Permisos[]): void {
    this.premisos$.next(value);
  }
}

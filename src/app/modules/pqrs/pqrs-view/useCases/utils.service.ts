import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    private reloadSubject = new BehaviorSubject<any[]>([]);
    reloadAction$ = this.reloadSubject.asObservable();

    constructor(){}

    reloadTable(value): void{
        this.reloadSubject.next(value);
    }
}

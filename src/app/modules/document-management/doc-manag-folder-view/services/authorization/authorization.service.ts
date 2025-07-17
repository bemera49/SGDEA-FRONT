import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private auth = new BehaviorSubject<string>("");
  constructor() { }

  getAuth(): string {
    return this.auth.value;
  }

  setAuth(value: string): void {
    this.auth.next(value);
  }

}

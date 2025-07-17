/**

 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { catchError, map, } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * Imortanción de servicios
 */
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate {

  hashLocalStorage: any;

  constructor(public authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.hashLocalStorage = localStorage.getItem(environment.hashSgdea);

    if(this.hashLocalStorage != null) {
      return this.authService.isAuthenticated(this.hashLocalStorage)
      .pipe(
        map(response => {
          return true;
        }),
        catchError((err) => {
          localStorage.clear();
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}

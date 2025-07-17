import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RestService } from '@app/services/rest.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoveBoxService {
  temparr = [];
  constructor(
    private http: HttpClient,
    public restService: RestService,
  ) { }

  getEntrepanos(name: string): Observable<string[]> {

    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    if(typeof name == "object"){
      return of(this.temparr)
    }
    return this.http
      .get<any[]>(environment.apiUrlBasePath + `api/gestion-archivo/v1/entrepanos?q=${name}`, httpOptions)
      .pipe(
        map(
          (countryList: any) => {
            this.temparr= countryList.data.map(
              (e: any) => {
                return e/* {
                  id: e.area,
                  name: e.name.common
                } */
              });
            return  this.temparr
          }
        ),
        catchError(err => of(this.temparr))
        
      );
  }
}


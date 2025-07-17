import { HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { RestService } from '../rest.service';
interface httpOptions {
  headers: HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {


  constructor(private rest: RestService) { }

  getHttpHeadersOptions(): httpOptions {
    const token = this.rest.getUserData().accessToken;
    const httpOptions: httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })

    };

    return httpOptions;
  }

  getToken(): string {
    return this.rest.getUserData().accessToken;

  }


  getAuthHeader(): HttpHeaders {
    const token = this.rest.getUserData().accessToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return headers;
  }

  getHttpHeadersOptionsWithPagination(page:any,limit:any): httpOptions {
    const token = this.rest.getUserData().accessToken;
    const httpOptions: httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Page': page.toString(),
        'Limit': limit.toString()
      })

    };

    return httpOptions;
  }


}

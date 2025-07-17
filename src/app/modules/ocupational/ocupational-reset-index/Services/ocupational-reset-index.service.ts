import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OcupationalResetIndexService {
  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);
  
  constructor(

  ) { }




  getResetHco(): Observable<any> {
    return this.http.get(`${this.URL}api/hco/reset`, this.headerAuthServices.getHttpHeadersOptions())
  }



}


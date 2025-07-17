import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class TrdVersionAdministrationService {
  public baseUrl:string = environment.apiUrl;
  constructor(private http:HttpClient,   private authHeaderService: AuthHeaderService) { }

  createTrdVersion(data:{}){
    const url = `${this.baseUrl}api/v1/gestion-documental/trds`;
    return this.http.post(url, {data},  this.authHeaderService.getHttpHeadersOptions() );
  };

  updateTrdVersion(data:{}){
    const url = `${this.baseUrl}api/v1/gestion-documental/trd`;
    return this.http.put(url, {data},  this.authHeaderService.getHttpHeadersOptions() );
  };

  getTrdVersions( page:number, limit:number , data){
    const url = `${this.baseUrl}api/v1/gestion-documental/trdf`;
    return this.http.post(url,data ,this.authHeaderService.getHttpHeadersOptionsWithPagination(page, limit));
  };

  getTrdVersion(  data:{}){
    const url = `${this.baseUrl}api/v1/gestion-documental/trd`;
    return this.http.post(url, {data} ,this.authHeaderService.getHttpHeadersOptions());
  };

  deleteTrdVersion(data:{}){
    const url = `${this.baseUrl}api/v1/gestion-documental/trds`;
    return this.http.put(url, {data}, this.authHeaderService.getHttpHeadersOptions() );
  };

  migrateTrd(data:FormData, trdId:any){
    const url = `${this.baseUrl}gestionDocumental/trd/load-trd-file?request=${trdId}`;
    return this.http.post(url, data, this.authHeaderService.getHttpHeadersOptions());
  };
}

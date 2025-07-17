import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, RequestTypeRequest, RequestTypeNoRequest } from '../Interfaces/view-pdf';



@Injectable({
  providedIn: 'root'
})
export class ViewPdfService {
  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);
  
  constructor(

  ) { }

  getRespuesta(params: number): Observable<Response> {
    return this.http.get<Response>(`${this.URL}api/hco/tarea/respuesta/${params}`, this.headerAuthServices.getHttpHeadersOptions())
  }

  
  
  postverifyRequest(body: RequestTypeRequest): Observable<any> {
    return this.http.post(`${this.URL}api/hco/tarea/verificacion`,body,  this.headerAuthServices.getHttpHeadersOptions());
  }

  postverifyNoRequest(body: RequestTypeNoRequest): Observable<any> {
    return this.http.post(`${this.URL}api/hco/tarea/verificacion`,body,  this.headerAuthServices.getHttpHeadersOptions());
  }

}


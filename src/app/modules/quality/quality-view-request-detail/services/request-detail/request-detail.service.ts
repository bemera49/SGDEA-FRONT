import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../../model/view-reques-detail';
@Injectable({
  providedIn: 'root'
})
export class RequestDetailService {

  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);
  constructor() { }

  getData(params: string): Observable<Response> {
    return this.http.get<Response>(`${this.URL}api/sgc/solicitud/show/${params}`, this.headerAuthServices.getHttpHeadersOptions())
  }


  exportFile(id: number): Observable<Blob> {
    const headers = this.headerAuthServices.getAuthHeader();
    return this.http.get(`${this.URL}api/sgc/solicitud/download/${id}`, { headers: headers, responseType: 'blob' });
  }

  downloadFile(id: number): Observable<Blob> {
    const headers = this.headerAuthServices.getAuthHeader();
    return this.http.get(`${this.URL}api/sgc/file/download/${id}`, { headers: headers, responseType: 'blob' });
  }

  downloadFileV1(id: number): Observable<Blob> {
    const headers = this.headerAuthServices.getAuthHeader();
    return this.http.get(`${this.URL}api/sgc/file/v1/download/${id}`, { headers: headers, responseType: 'blob' });
  }

}

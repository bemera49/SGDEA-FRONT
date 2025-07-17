import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomaticData } from '../model/automatic-data';
import { ApiResponse } from '../model/response-filter';

@Injectable({
  providedIn: 'root'
})
export class ViewRequestService {

  private URL = `${environment.apiUrl}`;
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService)

  constructor() { }


  getAutomaticDataFilter(): Observable<AutomaticData> {
    return this.http.get<AutomaticData>(`${this.URL}api/sgc/solicitud/shows`, this.authHeaderService.getHttpHeadersOptions());
  }


  getSearchRequests(params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.URL}api/sgc/solicitud/search`, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.authHeaderService.getToken()}`
        },
      ),
      params: params
    });
  }


  getExportPDF(): Observable<Blob> {
    const headers = this.authHeaderService.getAuthHeader();
    return this.http.get(`${this.URL}api/sgc/solicitud/download/exportar/pdf`, { headers: headers, responseType: 'blob' });
  }

}

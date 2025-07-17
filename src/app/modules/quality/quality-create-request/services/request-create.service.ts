import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { RestService } from '@app/services/rest.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomaticData, SubProcessResponse } from '../model/automatic-data';
import { DataPredictiveText } from '../model/create-request';
@Injectable({
  providedIn: 'root'
})
export class RequestCreateService {

  private URL = `${environment.apiUrlBasePath}api/sgc`;

  private http = inject(HttpClient);
  private authHeaderServices = inject(AuthHeaderService);
  private rest = inject(RestService);
  constructor() { }


  getAutomaticData(): Observable<AutomaticData> {
    return this.http.get<AutomaticData>(`${this.URL}/solicitud/create`, this.authHeaderServices.getHttpHeadersOptions());
  }

  getSubProcess(idProcesos: number): Observable<SubProcessResponse> {
    return this.http.get<SubProcessResponse>(`${this.URL}/proceso/${idProcesos}/subprocesos`, this.authHeaderServices.getHttpHeadersOptions());
  }

  postCreateRequest(body: FormData): Observable<any> {

    return this.http.post(`${this.URL}/solicitud/create`, body, this.authHeaderServices.getHttpHeadersOptions());
  }

  postValidate(data: FormData): Observable<any> {
    return this.http.post(`${this.URL}/file/validate-upload`, data, this.authHeaderServices.getHttpHeadersOptions());
  }

  getPredictiveText(params: any): Observable<DataPredictiveText> {

    return this.http.get<DataPredictiveText>(`${this.URL}/solicitud/documentos/search`, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.authHeaderServices.getToken()}`
        },
      ),
      params: params
    })


  }
}

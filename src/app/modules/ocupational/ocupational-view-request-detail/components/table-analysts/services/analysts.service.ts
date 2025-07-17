import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '@app/services/rest.service';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';

import { AnalystsElement } from '../analysts-element'
import { TableAnalysts } from '../Interfaces/table-analysts';



@Injectable({
  providedIn: 'root'
})
export class AnalystsService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }

  /*
  obtenerDatos(): Observable<QualityAnalystsIndexComponent> {
    return this.http.get<QualityAnalystsIndexComponent>(`${this.apiUrl}shows1`, { headers: this.authHeaderService.getAuthHeader() });
  }
  */

  /*
  getTaskReceivedOld(): Observable<AnalystsElement> {
    return this.http.get<AnalystsElement>(`${this.URL}api/sgc/tarea/shows`, this.authHeaderService.getHttpHeadersOptions());
  }
  */

  getAnalystReceived(): Observable<AnalystsElement> {
    return this.http.get<AnalystsElement>(`${this.URL}api/hco/tarea/profesional/listar`, this.authHeaderService.getHttpHeadersOptions());
  }


  postAnalystAssign(body: TableAnalysts): Observable<any> {

    return this.http.post(`${this.URL}api/hco/tarea/profesional/asignar`, body, this.authHeaderService.getHttpHeadersOptions());
  }


  //return this.http.get<DataPredictiveText>(`${this.URL}/solicitud/documentos/search`, {

  postAnalystInactiveOld(params: any): Observable<any> {

    console.log(this.URL);

    return this.http.post(`${this.URL}api/sgc/analistas/inactivar`, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.authHeaderService.getToken()}`
        },
      ),
      params: params
    })
  }




}






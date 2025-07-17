import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityAnalystsIndexComponent } from '@app/modules/quality/quality-analyst-index/quality-analyst-index.component';

import { AnalystsElement } from '../../modules/quality/quality-analyst-index/components/table-analysts/analysts-element'




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
    return this.http.get<AnalystsElement>(`${this.URL}api/sgc/analistas/listar`, this.authHeaderService.getHttpHeadersOptions());
  }


  postAnalystInactive(body: any): Observable<any> {

    return this.http.post(`${this.URL}api/sgc/analistas/inactivar`, body, this.authHeaderService.getHttpHeadersOptions());
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






import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityAnalystsIndexComponent } from '@app/modules/quality/quality-analyst-index/quality-analyst-index.component';

import { TiposolicitudElement } from '../../modules/ocupational/ocupational-view-request-detail/tiposolicitud-element'


@Injectable({
  providedIn: 'root'
})
export class TiposolicitudService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }


  getTiposolicitudReceived(): Observable<TiposolicitudElement> {
    return this.http.get<TiposolicitudElement>(`${this.URL}api/hco/solicitud/tipos`, this.authHeaderService.getHttpHeadersOptions());
  }


}





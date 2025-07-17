import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityAnalystsIndexComponent } from '@app/modules/quality/quality-analyst-index/quality-analyst-index.component';

import { TraceabilitysElement } from '../../modules/quality/quality-analyst-index/components/table-traceabilitys/traceabilitys-element'


@Injectable({
  providedIn: 'root'
})
export class TraceabilitysService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }


  getTraceabilityReceived(): Observable<TraceabilitysElement> {
    return this.http.get<TraceabilitysElement>(`${this.URL}api/sgc/solicitud/v2/analista/trazabilidad/shows`, this.authHeaderService.getHttpHeadersOptions());
  }


}





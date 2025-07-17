import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { OcupationalNotificationIndexComponent } from '@app/modules/ocupational/ocupational-notification-index/ocupational-notification-index.component';

import { EstadoSolicitud, Semaforo, RequestElement } from '../../modules/ocupational/ocupational-request-index/components/table-requests/requests-element'




@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/hco/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerDatos(): Observable<OcupationalNotificationIndexComponent> {
    return this.http.get<OcupationalNotificationIndexComponent>(`${this.apiUrl}shows`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getRequestReceived(): Observable<RequestElement> {
    return this.http.get<RequestElement>(`${this.URL}api/hco/tarea/showsrequests`, this.authHeaderService.getHttpHeadersOptions());
  }

}






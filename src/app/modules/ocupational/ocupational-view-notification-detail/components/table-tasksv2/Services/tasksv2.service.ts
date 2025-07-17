import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '@app/services/rest.service';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { OcupationalNotificationIndexComponent } from '@app/modules/ocupational/ocupational-notification-index/ocupational-notification-index.component';

import { EstadoSolicitud, Semaforo, TasksElement, TasksUser } from '../tasksv2-element'




@Injectable({
  providedIn: 'root'
})
export class Tasksv2Service {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/hco/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerDatos(): Observable<OcupationalNotificationIndexComponent> {
    return this.http.get<OcupationalNotificationIndexComponent>(`${this.apiUrl}shows`, { headers: this.authHeaderService.getAuthHeader() });
  }


  getTaskReceived(body: TasksUser): Observable<any> {
    return this.http.post(`${this.URL}api/hco/tarea/usuario/showstask`,body,  this.authHeaderService.getHttpHeadersOptions());
  }


}






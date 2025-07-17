import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { OcupationalNotificationIndexComponent } from '@app/modules/ocupational/ocupational-notification-index/ocupational-notification-index.component';

import { EstadoSolicitud, Semaforo, TasksElement } from '../../modules/ocupational/ocupational-notification-index/components/table-tasks/tasks-element'




@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/hco/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerDatos(): Observable<OcupationalNotificationIndexComponent> {
    return this.http.get<OcupationalNotificationIndexComponent>(`${this.apiUrl}shows`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getTaskReceived(): Observable<TasksElement> {
    return this.http.get<TasksElement>(`${this.URL}api/hco/tarea/showstask`, this.authHeaderService.getHttpHeadersOptions());
  }

}






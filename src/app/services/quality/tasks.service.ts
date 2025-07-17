import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityTasksReceivedComponent } from '@app/modules/quality/quality-tasks-received/quality-tasks-received.component';

import { EstadoSolicitud, Semaforo, TasksElement } from '../../modules/quality/quality-tasks-received/components/table-tasks/tasks-element'




@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerDatos(): Observable<QualityTasksReceivedComponent> {
    return this.http.get<QualityTasksReceivedComponent>(`${this.apiUrl}shows`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getTaskReceived(): Observable<TasksElement> {
    return this.http.get<TasksElement>(`${this.URL}api/sgc/tarea/shows`, this.authHeaderService.getHttpHeadersOptions());
  }

}






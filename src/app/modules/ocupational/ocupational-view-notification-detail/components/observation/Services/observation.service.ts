import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Observation } from '../Interfaces/observation';



@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);
  
  constructor(

  ) { }
  getdatatraceability(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.URL}api/sgc/solicitud/v2/analista/trazabilidad/shows`, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.headerAuthServices.getToken()}`
        },
      ),
    })
  }
  

  postverifyObservacion(body: Observation): Observable<any> {
    return this.http.post(`${this.URL}api/hco/tarea/verificacion`,body,  this.headerAuthServices.getHttpHeadersOptions());
  }

}


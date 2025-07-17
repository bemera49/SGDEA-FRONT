import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Confirmation } from '../Interfaces/confirmation';



@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
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
  

  postverifyConfirmation(body: Confirmation): Observable<any> {
    return this.http.post(`${this.URL}api/hco/tarea/aclaracion`,body,  this.headerAuthServices.getHttpHeadersOptions());
  }

}


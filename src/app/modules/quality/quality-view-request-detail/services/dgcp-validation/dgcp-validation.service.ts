import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../../../../../services/auth-header/auth-header.service';
import { headers } from '@app/modules/pqrs/pqrs-log-index/uses/asociar-solicitudes-hu13/util/data';

@Injectable({
  providedIn: 'root'
})
export class DgcpValidationService {
  private URL = environment.apiUrlBasePath;
  constructor(private http:HttpClient, private headerAuthServices:AuthHeaderService) { }

  validateRequestCriteria(data:any){
      const url = `${this.URL}api/sgc/solicitud/validate/criterios`;
      return this.http.post(url, {}, {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${this.headerAuthServices.getToken()}`
          },
          ),
          params: data
        }
      )
    };

  requestExtension(data:any){
    const url = `${this.URL}api/sgc/solicitud/add/prorroga`;
    return this.http.post(url, {}, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.headerAuthServices.getToken()}`
        },
        ),
        params: data
      }
    );
  };

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestExtensionService {
  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);
  constructor() { }

  requestExtensionChoice(data:{}){
    const url = `${this.URL}api/sgc/solicitud/create/prorroga`;
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

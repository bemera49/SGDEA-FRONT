import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { environment } from 'src/environments/environment';
import { BodyPredial } from '../model/predial';

@Injectable({
  providedIn: 'root'
})
export class PredialService {

  private URL = `${environment.apiUrlBasePath}`;

  private http = inject(HttpClient);
  private authHeaderServices = inject(AuthHeaderService);

  constructor() { }

  postCreateRequest(body: BodyPredial) {
    return this.http.post(`${this.URL}api/v1/predial-solicitudes`, body, this.authHeaderServices.getHttpHeadersOptions());
  }
  
}

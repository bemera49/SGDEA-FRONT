import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  private urlBase = environment.apiUrl
  private http = inject(HttpClient);
  private ahs = inject(AuthHeaderService);

  constructor() { }

  generatePdfTrazabilidad(data: unknown): Observable<any> {
    const header = this.ahs.getAuthHeader();
    return this.http.post(`${this.urlBase}api/v1/expedientes/trazabilidad`, data, {
      headers: header
    })
  }
}



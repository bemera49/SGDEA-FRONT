import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsService } from '../params/params.service';
import { ResponseTrazabilidad } from '../../model/trazabildad';
@Injectable({
  providedIn: 'root'
})
export class ActulizarTrazabilidadService {
  private urlBase = environment.apiUrl;
  private http = inject(HttpClient);
  private auth = inject(AuthHeaderService);
  private parmsId = inject(ParamsService)

  getTrazabilidad(): Observable<ResponseTrazabilidad> {

    return this.http.get<ResponseTrazabilidad>(`${this.urlBase}api/v1/expedientes/trazabilidad-expediente`, {
      params: {
        idGdExpediente: this.parmsId.getValue(),
      },
      headers: this.auth.getAuthHeader()
    })
  }
}

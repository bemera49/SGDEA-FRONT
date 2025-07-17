import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsInfoDoc } from '../../../modal-doc-info/model/info';
import { BodyPdf, ResponseTrazabilidad } from '../../model/trazabilidad';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);

  getTrazabilidad(data: ParamsInfoDoc): Observable<ResponseTrazabilidad> {

    return this.http.get<ResponseTrazabilidad>(`${this.urlBase}api/v1/expedientes/documentos/trazabilidad`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluido
      }
    })
  }

  getPdf(data: BodyPdf): Observable<any> {
    const header = this.auth.getAuthHeader();
    return this.http.post(`${this.urlBase}api/v1/expedientes/documentos/trazabilidad-pdf`, data, {
      headers: header
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BodyArchivoFisico, ParamsInfoDoc, ResponseInfo, UpdateInfoDoc } from '../../model/info';

@Injectable({
  providedIn: 'root'
})
export class InfoDocService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);

  getInfoDoc(data: ParamsInfoDoc): Observable<ResponseInfo> {
    console.log('del servicio', data);
    return this.http.get<ResponseInfo>(`${this.urlBase}api/v1/expedientes/documentos/detalle`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    })
  }

  updateInfoDoc(data: UpdateInfoDoc): Observable<any> {
    console.log('update',data)
    return this.http.put(`${this.urlBase}api/v1/expedientes/documentos`, data, this.auth.getHttpHeadersOptions());
  }

  postDocFisicos(data: BodyArchivoFisico): Observable<any> {
    return this.http.post(`${this.urlBase}api/v1/expedientes/documentos/documento-fisico`, data, this.auth.getHttpHeadersOptions())
  }

  getUnidadesConservacion(idExp: number): Observable<any> {
    return this.http.get(`${this.urlBase}api/v1/expedientes/unidades/${idExp}`, this.auth.getHttpHeadersOptions()
    )
  }
}

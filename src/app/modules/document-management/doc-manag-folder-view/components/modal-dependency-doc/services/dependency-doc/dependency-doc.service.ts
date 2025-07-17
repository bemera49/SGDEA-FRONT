import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BodyDependency, ParamsDependency, ResponseDependency } from '../../model/dependencias-doc';
import { ParamsDoc } from '@app/modules/document-management/doc-manag-folder-view/model/data-doc-params';

@Injectable({
  providedIn: 'root'
})
export class DependencyDocService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);

  postDependency(data: BodyDependency): Observable<any> {
    return this.http.post(`${this.urlBase}api/v1/expedientes/documentos/permisos-dependencias`, data, this.auth.getHttpHeadersOptions())
  }

  getDependency(data: ParamsDoc): Observable<ResponseDependency> {
    return this.http.get<ResponseDependency>(`${this.urlBase}api/v1/expedientes/documentos/permisos-dependencias/dependencias`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DependencyParams, ResponseDependency } from '../../model/dependency';
import { ParamsDoc } from '@app/modules/document-management/doc-manag-folder-view/model/data-doc-params';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);

  getDependency(data: ParamsDoc): Observable<ResponseDependency> {
    return this.http.get<ResponseDependency>(`${this.urlBase}api/v1/expedientes/documentos/permisos-dependencias`, {
      headers: this.auth.getAuthHeader(),
      params: {  
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    })
  }

  deleteDependency(idExpediente: number): Observable<any> {
    return this.http.delete(`${this.urlBase}api/v1/expedientes/documentos/permisos-dependencias`, {
      body: {
        idGdExpedientesDocumentosDependencias: idExpediente
      },
      headers: this.auth.getAuthHeader()
    })
  }
}

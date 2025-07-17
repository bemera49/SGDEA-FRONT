import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsDependency } from '../../../modal-dependency-doc/model/dependencias-doc';
import { BodyUsuariosDoc, ParamsAuthUsuarios, ResponseUsuarios } from '../../model/auth-doc';

@Injectable({
  providedIn: 'root'
})
export class AuthDocService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);

  getUsuarios(data: ParamsAuthUsuarios): Observable<ResponseUsuarios> {
    return this.http.get<ResponseUsuarios>(`${this.urlBase}api/v1/expedientes/documentos/permisos-usuarios/usuarios`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot,
        name: data.name
      }
    });
  }

  

  postPermisosUsuarios(data: BodyUsuariosDoc): Observable<any> {
    return this.http.post(`${this.urlBase}api/v1/expedientes/documentos/permisos-usuarios`, data, this.auth.getHttpHeadersOptions())
  }

} 

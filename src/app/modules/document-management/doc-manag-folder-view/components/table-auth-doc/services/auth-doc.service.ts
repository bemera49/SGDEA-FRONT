import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsDependency } from '../../modal-dependency-doc/model/dependencias-doc';
import { UsuariosPermisosRespuesta } from '../model/auth-doc';

@Injectable({
  providedIn: 'root'
})
export class AuthDocService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);


  getUsuarios(data: ParamsDependency): Observable<UsuariosPermisosRespuesta> {
    return this.http.get<UsuariosPermisosRespuesta>(`${this.urlBase}api/v1/expedientes/documentos/permisos-usuarios`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot,

      }
    });
  }

  deletePermisosUsuarios(idExpedientes: number): Observable<any> {
    return this.http.delete(`${this.urlBase}api/v1/expedientes/documentos/permisos-usuarios`, {
      body: {
        idGdExpedientesDocumentosUsuarios: idExpedientes
      },
      headers: this.auth.getAuthHeader()
    })
  }

}

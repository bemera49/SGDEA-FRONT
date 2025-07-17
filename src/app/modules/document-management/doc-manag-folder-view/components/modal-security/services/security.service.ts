import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseSecurity, Security, SecurityBody } from '../model/security';
import { ParamsDoc } from '../../../model/data-doc-params';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);


  getClasificacionSeguridad(data: ParamsDoc): Observable<ResponseSecurity> {
    return this.http.get<ResponseSecurity>(`${this.urlBase}api/v1/expedientes/documentos/seguridad`, {
      headers: this.auth.getAuthHeader(),
      params: {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    }
    )
  }


  postClasificacionSeguridad(data:SecurityBody):Observable<any>{
    return this.http.post(`${this.urlBase}api/v1/expedientes/documentos/seguridad`,data,this.auth.getHttpHeadersOptions())
  }
}

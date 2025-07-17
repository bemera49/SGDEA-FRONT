import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestPermisosDoc } from '../../model/permisos-doc';

@Injectable({
  providedIn: 'root'
})
export class PermisosDocService {

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl;
  private auth = inject(AuthHeaderService);


  getPermisos(): Observable<RequestPermisosDoc> {
    return this.http.get<RequestPermisosDoc>(`${this.urlBase}api/v1/expedientes/documentos/permisos`, {
      headers: this.auth.getAuthHeader()
    })
  }
}

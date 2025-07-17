import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseRequest } from '../../interface/update-documents';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {
  private URL_BASE = environment.apiUrlBasePath;
  private PATH = 'api/sgc/solicitud/update/'
  private http = inject(HttpClient);
  private ah = inject(AuthHeaderService);

  constructor() { }

  updateDocumentsProposed(body: FormData): Observable<ResponseRequest> {
    return this.http.post<ResponseRequest>(`${this.URL_BASE}${this.PATH}documento-propuesto`, body, this.ah.getHttpHeadersOptions());
  }

  updateAdditionalDocuments(body: FormData): Observable<ResponseRequest> {

    return this.http.post<ResponseRequest>(`${this.URL_BASE}${this.PATH}documento-adicionales`, body, this.ah.getHttpHeadersOptions());
  }

  deleteAditionalDocumnets(id: number) {
    return this.http.put<any>(`${this.URL_BASE}api/sgc/file/v1/eliminate-fiile/${id}`, { headers: this.ah.getAuthHeader() });

  }
}

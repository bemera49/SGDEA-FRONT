import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestAnalysis, ResponseAnalysisCreate, ResponseAnalysisUpdate, ResponseNameDocuments } from '../../interface/analysis-requests';
@Injectable({
  providedIn: 'root'
})

export class AnalysisRequestsService {
  private URL = environment.apiUrlBasePath;
  private http = inject(HttpClient);
  private headerAuthServices = inject(AuthHeaderService);

  constructor() { }

  getPredictiveNameDocuments(params: any): Observable<ResponseNameDocuments> {
    return this.http.get<ResponseNameDocuments>(`${this.URL}api/sgc/plan-analisis/documentos/search`, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.headerAuthServices.getToken()}`
        },
      ),
      params: params
    })
  }




  postCreateAnalysis(body: FormData): Observable<ResponseAnalysisCreate> {
    return this.http.post<ResponseAnalysisCreate>(`${this.URL}api/sgc/plan-analisis/create`, body, this.headerAuthServices.getHttpHeadersOptions());
  }

  putUpdateAnalysis(body: FormData): Observable<ResponseAnalysisUpdate> {
    return this.http.put<ResponseAnalysisUpdate>(`${this.URL}api/sgc/plan-analisis/update`, body, this.headerAuthServices.getHttpHeadersOptions());
  }

}

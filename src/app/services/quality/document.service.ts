import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { Data } from '@app/modules/quality/quality-view-request-detail/model/view-reques-detail';
import { CommentModel, UpdateMetadataModel } from '../modal/components/metadata-document-modal/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private URL = environment.apiUrlBasePath;

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }


  searchFile(query: any): Observable<Data> {
    return this.http.get<Data>(`${this.URL}api/search?code=${query.code}&name=${query.name}`, this.authHeaderService.getHttpHeadersOptions());
  }

  getMetadata(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.URL}api/sgc/documento-propuesto/v1/metadatos/${id}`, this.authHeaderService.getHttpHeadersOptions());
  }

  getCommentMetadata(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.URL}api/sgc/v1/comments/${id}`, this.authHeaderService.getHttpHeadersOptions());
  }


  saveCommentMetadata(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<any>(`${this.URL}api/sgc/v1/comment`, comment, { headers: this.authHeaderService.getAuthHeader() });
  }

  saveSomeMetadata(metadata: UpdateMetadataModel, id: number): Observable<UpdateMetadataModel> {
    return this.http.put<any>(`${this.URL}api/sgc/documento-propuesto/v1/some-metadatos/${id}`, metadata, { headers: this.authHeaderService.getAuthHeader() });
  }

  validateSolicitude(id: number): Observable<any> {
    return this.http.put<any>(`${this.URL}api/sgc/solicitud/v1/validation/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  backSolicitude(id: number): Observable<any> {
    return this.http.put<any>(`${this.URL}api/sgc/solicitud/v1/back-solicitude/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  endSolicitude(id: number): Observable<any> {
    return this.http.put<any>(`${this.URL}api/sgc/tarea/v1/assign-task/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  uploadDocument(data: FormData, id: number): Observable<any> {
    return this.http.post<any>(`${this.URL}api/sgc/file/v1/upload/${id}`, data, { headers: this.authHeaderService.getAuthHeader() });
  }
}

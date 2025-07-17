import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthHeaderService } from "@app/services/auth-header/auth-header.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RequestPublicationService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;
  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {}

  getDocumentById(id: any) {
    return this.http.get(
      `${this.apiUrl}sgc/documento-propuesto/v1/posted-data/${id}`,
      {
        headers: this.authHeaderService.getAuthHeader(),
      }
    );
  }

  postDocument(id: number, data: any) {
    return this.http.post(
      `${this.apiUrl}sgc/documento-propuesto/v1/post/${id}`,
      data,
      {
        headers: this.authHeaderService.getAuthHeader(),
      }
    );
  }

  putFinished(id: number){
    return this.http.put(
      `${this.apiUrl}sgc/tarea/v1/posted-task/${id}`,
      {},
      {
        headers: this.authHeaderService.getAuthHeader(),
      }
    );
  }
}

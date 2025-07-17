import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthHeaderService } from "@app/services/auth-header/auth-header.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DivulgacionesService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/v1/`;
  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {}

  getDisclosuresById(id: string) {
    return this.http.get(`${this.apiUrl}sgcDisclosureFiles/listFiles/${id}`, {
      headers: this.authHeaderService.getAuthHeader(),
    });
  }

  postDisclosures(data: any) {
    return this.http.post(`${this.apiUrl}sgcDisclosureFiles/store`, data, {
      headers: this.authHeaderService.getAuthHeader(),
    });
  }

  /* Esto es de inventario documental */
  getInventarioDocumental(id: any) {
    return this.http.get(
      `${this.apiUrl}expedientes/inventario-documental/${id}`,
      {
        headers: this.authHeaderService.getAuthHeader(),
      }
    );
  }

  postInventarioDocumental(id:any) {
    return this.http.post(
      `${this.apiUrl}expedientes/inventario-documental-pdf`,
      id,
      {
        headers: this.authHeaderService.getAuthHeader(),
      }
    );
  }
}

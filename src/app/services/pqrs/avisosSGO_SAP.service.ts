import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";
import { Observable } from 'rxjs/internal/Observable';
import { aviso } from "../modal/components/pqrs/gestionar-traslado/models/traslado-competencia";

@Injectable({
  providedIn: "root",
})
export class AvisosService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerAvisoSAP(id: string): Observable<aviso> {
    console.log('Token - Eliminar', this.authHeaderService.getToken())
    return this.http.get<aviso>(`${this.apiUrl}consulta-avisoSAP/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  obtenerAvisoSGO(id: string): Observable<aviso> {
    return this.http.get<aviso>(`${this.apiUrl}consulta-avisoSGO/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

}

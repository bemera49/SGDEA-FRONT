import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";
import { Observable } from 'rxjs/internal/Observable';
import { roles, userByRol, vacaciones } from '../../modules/settings-app/vacaciones-modal/models/vacaciones'


@Injectable({
  providedIn: "root",
})
export class VacacionesService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) { }

  getAllRoles(): Observable<roles> {
    console.log('Token - Eliminar', this.authHeaderService.getToken())
    return this.http.get<roles>(`${this.apiUrl}roles`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getUserByIdRol(rol: number): Observable<userByRol> {
    return this.http.get<userByRol>(`${this.apiUrl}usuarios-roles?roles%5B%5D=${rol}`, { headers: this.authHeaderService.getAuthHeader(), });
  }

  getDateVacationsTest(id: number): Observable<userByRol> {
    return this.http.get<userByRol>(`${this.apiUrl}test-get-usuarios-vacaciones?id=${id}`, { headers: this.authHeaderService.getAuthHeader(), });
  }

  addVacacionesReemplazo(solicitud?: vacaciones): Observable<vacaciones> {
    return this.http.post<vacaciones>(`${this.apiUrl}programar-reemplazo-vacaciones`, solicitud, { headers: this.authHeaderService.getAuthHeader(), });
  }

  updateVacacionesReemplazo(idReemplazo: number, solicitud?: vacaciones): Observable<vacaciones> {
    return this.http.put<vacaciones>(`${this.apiUrl}actualizar-reemplazo-vacaciones/${idReemplazo}`, solicitud, { headers: this.authHeaderService.getAuthHeader(), });
  }


}

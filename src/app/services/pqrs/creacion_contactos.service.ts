import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";
import { Observable } from 'rxjs/internal/Observable';
import { contactos, cuentaContrato } from "../../modules/pqrs/radicados-cuenta-contrato/creacion-contactos/models/contactos";

@Injectable({
  providedIn: "root",
})
export class CreacionContactosService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) { }

  obtenerCuentasContratoByIdRadiRadicado(id: number): Observable<contactos> {
    console.log('Token - Eliminar', this.authHeaderService.getToken())
    return this.http.get<contactos>(`${this.apiUrl}radi-radicados-cuenta-contrato/info/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getCuentaContratoByNumber(cuentas: number): Observable<contactos> {
    return this.http.get<contactos>(`${this.apiUrl}radi-radicados-cuenta-contrato/search/${cuentas}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  getCuentasContratoByCuentasContrato(cuentas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}radi-radicados-cuenta-contrato/searchIn`, cuentas, { headers: this.authHeaderService.getAuthHeader() });
  }

  addAccountContract(solicitud: any): Observable<cuentaContrato> {
    return this.http.post<cuentaContrato>(`${this.apiUrl}radi-radicados-cuenta-contrato/create`, solicitud, { headers: this.authHeaderService.getAuthHeader(), });
  }

  updateAccountContract(solicitud: any): Observable<cuentaContrato> {
    return this.http.post<cuentaContrato>(`${this.apiUrl}radi-radicados-cuenta-contrato/update`, solicitud, { headers: this.authHeaderService.getAuthHeader(), });
  }

  deleteAccountContract(solicitud: any): Observable<cuentaContrato> {
    return this.http.post<cuentaContrato>(`${this.apiUrl}radi-radicados-cuenta-contrato/delete`, solicitud, { headers: this.authHeaderService.getAuthHeader(), });
  }

}

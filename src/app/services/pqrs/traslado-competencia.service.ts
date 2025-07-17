import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";
import {
  Pais,
  RegistrarEmpresa,
  ResponseCliente,
  ResponseEmpresa,
  Usuarios,
} from "../modal/components/pqrs/gestionar-traslado/models/traslado-competencia";

@Injectable({
  providedIn: "root",
})
export class TrasladoCompetenciaService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {}

  getEmpresas() {
    return this.http.get<ResponseEmpresa>(
      `${this.apiUrl}empresa`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  getAprobadores(id: number) {
    return this.http.get<Usuarios[]>(
      `${this.apiUrl}usuarios?&rol_id=${id}`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  getDestinatariosxEmpresas(id: number) {
    return this.http.get<ResponseCliente>(
      `${this.apiUrl}empresa/${id}/clientes`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  /* form other company */

  getPais() {
    return this.http.get<Pais[]>(
      `${this.apiUrl}paises`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  getDepartamentos(pais_id: string) {
    return this.http.get<any>(`${this.apiUrl}departamentos/${pais_id}`);
  }

  getMunicipios(departamento_id: string) {
    return this.http.get<any>(`${this.apiUrl}municipios/${departamento_id}`);
  }

  registrarEmpresa(data: RegistrarEmpresa) {
    return this.http.post(
      `${this.apiUrl}empresa`,
      data,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";

@Injectable({
  providedIn: "root",
})
export class ProrrogaService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;
  private info: any;
  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {}

  senData(data: any) {
    console.log(data);
    this.info = data;
  }
  getData() {
    return this.info;
  }

  getAprobadores() {
    return this.http.get(
      `${this.apiUrl}usuarios-roles-disponibles?roles%5B%5D=9&roles%5B%5D=10`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  getAmpliacionTerminos(id: any) {
    return this.http.get(
      `${this.apiUrl}sgc/ampliacion-terminos/${id}`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }
  requestProrroga(data: any) {
    return this.http.post(
      `${this.apiUrl}sgc/ampliacion-terminos/solicitar`,
      data,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  postProrroga(data: any) {
    return this.http.post(
      `${this.apiUrl}sgc/ampliacion-terminos`,
      data,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

  aprobarRechazar(data: any) {
    return this.http.post(
      `${this.apiUrl}sgc/ampliacion-terminos/aprobar-rechazar`,
      data,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }
  gestionarAprobacion(data: any) {
    return this.http.post(
      `${this.apiUrl}sgc/ampliacion-terminos/gestionar-aprobada`,
      data,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }
}

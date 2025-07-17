import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthHeaderService } from "../auth-header/auth-header.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private URL = environment.apiUrlBasePath;
  private apiUrl = `${environment.apiUrlBasePath}api/`;

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {}


  getSignPersonal(id,carta) {
    return this.http.get(
      `${this.apiUrl}notificacion/SignPersonal/${id}/${carta}`,
      this.authHeaderService.getHttpHeadersOptions()
    );
  }

}

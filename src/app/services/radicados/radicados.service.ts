import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs';
import { TipoNotificacion } from '@app/interfaces/radicados/tipo-notificacion.interface.';
import { ResNivelesPrivacidad } from '@app/interfaces/radicados/nivel-privacidad.interface';


@Injectable({
  providedIn: 'root'
})
export class RadicadosService {

  private URL = environment.apiUrlBasePath;

  constructor(private http: HttpClient, private authHeaderService: AuthHeaderService) { }

  public getNotificaciones():Observable<TipoNotificacion[]>{
    return this.http.get<TipoNotificacion[]>(`${this.URL}api/tipos_notificacion`, this.authHeaderService.getHttpHeadersOptions());
  }

  public getNivelesPrivacidad():Observable<ResNivelesPrivacidad>{
    return this.http.get<ResNivelesPrivacidad>(`${this.URL}api/niveles_privacidad`, this.authHeaderService.getHttpHeadersOptions());
  }
}

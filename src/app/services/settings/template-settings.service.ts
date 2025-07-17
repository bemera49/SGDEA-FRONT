import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateSettingsService {

  private baseURL = environment.apiUrlBasePath;

  constructor(
      private http: HttpClient,
      private authHeaderService: AuthHeaderService
  ) { }

  getTemplateTypes(): Observable<any> {
    const url = `${this.baseURL}api/v1/tipo-plantillas/list`
    return this.http.get<any>(url,{ headers: this.authHeaderService.getAuthHeader() });
  };

  getModules(){
    const url = `${this.baseURL}api/v1/modulo-operaciones/list`
    return this.http.get<any>(url,{ headers: this.authHeaderService.getAuthHeader() });
  };

  createTemplate(data:{}){
    const url = `${this.baseURL}api/v1/plantillas`;
    return this.http.post(url, data, {headers: this.authHeaderService.getAuthHeader()})
  };

  getTemplate(id:any){
    const url = `${this.baseURL}api/v1/plantillas/${id}`;
    return this.http.get<any>(url,{ headers: this.authHeaderService.getAuthHeader() });
  };

  updateTemplate(data:{}, id:any){
    const url = `${this.baseURL}api/v1/plantillas/${id}`;
    return this.http.put<any>(url, data, { headers: this.authHeaderService.getAuthHeader() });
  }

  changeTemplateStatus(id:any){
    const url = `${this.baseURL}api/v1/plantillas/${id}/change-status`;
    return this.http.patch<any>(url,{},  { headers: this.authHeaderService.getAuthHeader() });
  }
}

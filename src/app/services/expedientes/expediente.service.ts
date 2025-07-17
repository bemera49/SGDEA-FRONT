// path: src/app/services/series-subseries.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class ExpedienteService {
    private URL = environment.apiUrlBasePath;
    private apiUrl = environment.apiUrlBasePath + 'api/v1/expedientes/documentos/';

    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    reclasificarDocumentoExpedient(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}reclasificarDocumentoExpedient`, data, { headers: this.authHeaderService.getAuthHeader() });
    }

    referenciarDocumentoExpedient(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}referenciarDocumentoExpedient`, data, { headers: this.authHeaderService.getAuthHeader() });
    }



}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

/**
 * @description Modelos 
 */
import { filtrosTiposDocumentales, addTipoDocumental } from './models/tipos_documentales';

@Injectable({
    providedIn: 'root'
})
export class TiposDocumentalesService {
    private URL = environment.apiUrlBasePath;
    private apiUrl = environment.apiUrlBasePath + 'api/gd-trd-tipo-documental/';

    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    getTiposDocumentalesByFilters(formulario?: filtrosTiposDocumentales): Observable<filtrosTiposDocumentales> {
        return this.http.post<filtrosTiposDocumentales>(`${this.apiUrl}list`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    addTipoDocumental(formulario?: any): Observable<addTipoDocumental> {
        return this.http.post<addTipoDocumental>(`${this.apiUrl}save`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    updateTipoDocumental(formulario?: any): Observable<addTipoDocumental> {
        return this.http.post<addTipoDocumental>(`${this.apiUrl}update`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    deleteTipoDocumental(id?: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}delete/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    //___ Services metadatos
    getListMetadatos(id: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}listMetadatos`, id, { headers: this.authHeaderService.getAuthHeader() });
    }

    addMetadatos(formulario?: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}updateMetadatos`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }


    generatePDFTypeDocumental(dataSeries: any): Observable<string> {
        const url = `${this.apiUrl}generarPdfBlob`;
        const headers = this.authHeaderService.getAuthHeader();
        return this.http.post(url, dataSeries, { headers: headers, responseType: 'text' });
    }

}

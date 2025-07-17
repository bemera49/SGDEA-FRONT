// path: src/app/services/series-subseries.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

/**
 * @description Modelos 
 */
import { filtrosSubseries, addSerieSubseries } from './models/series_subseries';

@Injectable({
    providedIn: 'root'
})
export class SeriesSubseriesService {
    private URL = environment.apiUrlBasePath;
    private apiUrl = environment.apiUrlBasePath + 'api/gd-trd-serie-subserie/';

    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    getSubSeriesOrSeriesByFilters(formulario?: filtrosSubseries): Observable<filtrosSubseries> {
        return this.http.post<filtrosSubseries>(`${this.apiUrl}list`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    addSubSeriesSeries(formulario?: any): Observable<addSerieSubseries> {
        return this.http.post<addSerieSubseries>(`${this.apiUrl}save`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    updateSubSeriesSeries(formulario?: any): Observable<addSerieSubseries> {
        return this.http.post<addSerieSubseries>(`${this.apiUrl}update`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }

    deleteSubSerie(id?: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}deleteSubserie/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    generatePDFSeries(dataSeries: any): Observable<string> {
        const url = `${this.apiUrl}generarPdfBlob`;
        const headers = this.authHeaderService.getAuthHeader();
        return this.http.post(url, dataSeries, { headers: headers, responseType: 'text' });
    }


    //___ Services metadatos series
    getListMetadatos(id: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}listMetadatos`, id, { headers: this.authHeaderService.getAuthHeader() });
    }

    addMetadatos(formulario?: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}updateMetadatos`, formulario, { headers: this.authHeaderService.getAuthHeader() });
    }



}

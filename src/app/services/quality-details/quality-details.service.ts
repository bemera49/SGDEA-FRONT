import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { ProcessData, ResponseInterface } from './Interfaces/detailsConfig';

@Injectable({
  providedIn: 'root'
})

export class QualityDetailsService {
  pathDoc: string = '';
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/' // URL de la API
  private api = environment.apiUrlBasePath  // agregada pendidente la para el Post
  private downloadUrl = environment.apiUrlBasePath + 'api/sgc/file/download/'
  
  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService,
  ) { }

  MapDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}mapa/shows`, { headers: this.authHeaderService.getAuthHeader() })
  }

  getProcessDetailsById(id: string): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`${this.apiUrl}proceso/show/${id}`, { headers: this.authHeaderService.getAuthHeader() });
  }

  
   // Método para descargar un archivo utilizando el ID
  descargarArchivo(id: string): Observable<Blob> {
    const url = `${this.downloadUrl}${id}`;
    const headers = this.authHeaderService.getAuthHeader();
    const token = headers.get('Authorization');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }




  
  updateDetails(newDetails: any[]) {
    console.error('No se puede actualizar los detalles en la API externa.');
    // Aquí puedes implementar la lógica para actualizar los detalles mediante HTTP si es necesario
  }
  
}


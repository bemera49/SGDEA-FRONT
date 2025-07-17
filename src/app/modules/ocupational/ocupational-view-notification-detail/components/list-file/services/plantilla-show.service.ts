import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from '@app/services/rest.service';
import { ApiResponse} from './Showdonwload.config';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { environment } from 'src/environments/environment';
import { ListFile } from '../Interfaces/list-file';

@Injectable({
  providedIn: 'root'
})
export class PlantillaShowService {
  private apiUrl = environment.apiUrlBasePath+'api/hco/plantilla/';
  private downloadUrl = environment.apiUrlBasePath+'api/hco/plantilla/download/';
  private mostrarUrl = environment.apiUrlBasePath+'api/hco/plantilla/show/';
  private headerAuthServices = inject(AuthHeaderService);

  // Inyecta RestService correctamente
  constructor(private http: HttpClient, private rest: RestService,  private authHeaderService:AuthHeaderService) {}

  obtenerDatos(body: ListFile): Observable<any> {
    return this.http.post(`${this.apiUrl}shows`,body,  this.headerAuthServices.getHttpHeadersOptions());
  }


  // Método para obtener datos de la API de información
  obtenerDatosV1(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}shows`, { headers: this.authHeaderService.getAuthHeader()});

  }

  // Método para descargar un archivo utilizando el ID
  descargarArchivo(id: string): Observable<Blob> {
    console.log("Recibo ID antes de descargar documentos: " + id);
    const url = `${this.downloadUrl}${id}`;
    const headers = this.authHeaderService.getAuthHeader();
    const token = headers.get('Authorization')
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  // Método para descargar un archivo utilizando el ID
  mostrarArchivo(id: string): Observable<ApiResponse> {
    console.log("Recibo ID antes de mostrar documento: " + id);
    const url = `${this.mostrarUrl}${id}`;
    const headers = this.authHeaderService.getAuthHeader();
    const token = headers.get('Authorization')
    return this.http.get<ApiResponse>(url, { headers: headers });
  }


}

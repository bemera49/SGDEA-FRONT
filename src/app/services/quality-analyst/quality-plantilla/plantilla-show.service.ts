import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestService } from '@app/services/rest.service';
import { ApiResponse} from './Showdonwload.config';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantillaShowService {
  private apiUrl = environment.apiUrlBasePath+'api/sgc/plantilla/';
  private downloadUrl = environment.apiUrlBasePath+'api/sgc/plantilla/download/';

  // Inyecta RestService correctamente
  constructor(private http: HttpClient, private rest: RestService,  private authHeaderService:AuthHeaderService) {}

  // Método para obtener datos de la API de información
  obtenerDatos(): Observable<ApiResponse> {
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

}

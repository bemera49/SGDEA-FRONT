import { Injectable, inject } from '@angular/core';
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableService } from '@app/modules/components/table/service/table.service';
import { RestService } from '@app/services/rest.service';
@Injectable({
  providedIn: 'root'
})
export class ClasificacionInternaService {

  public tableService = inject(TableService)

  constructor(
    private http: HttpClient,
    public restService: RestService,
  ) { }

  getClasificacionesInternas(): Observable<any>{
    return this.http.get(environment.apiUrl+'api/clasificaciones_internas');
  }

  updateRadicacionClasificacionesInterna(idRadicacion: number, clasificacionInternaId: number): Observable<any>{
    return this.http.put(environment.apiUrl+'api/clasificacion_interna/'+idRadicacion, {clasificacionInternaId});
  }

  updateRadicacionClasificacionesInternaMasivo(idsRadicacion: number[], clasificacionInternaId: number, sapContact:string): Observable<any>{
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(environment.apiUrl+'api/clasificacion_interna_masiva/', {
      radicados: idsRadicacion,
      clasificacionInternaId: clasificacionInternaId,
      contacto_sap: sapContact
    },httpOptions);
  }


}

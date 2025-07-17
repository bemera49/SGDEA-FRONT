import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(private http: HttpClient) { }


  getPaises() {
    return this.http.get<any>(`${environment.apiUrl}api/paises`)
  }
  getDepartamentos(pais_id: string) {
    return this.http.get<any>(`${environment.apiUrl}api/departamentos/${pais_id}`)
  }
  getCiudades(dep_id: string) {
    return this.http.get<any>(`${environment.apiUrl}api/municipios/${dep_id}`)
  }

  getDependencias() {
    return this.http.get<any>(`${environment.apiUrl}api/dependencias`)
  }

  getUserByDependencia(dep_id: string) {
    return this.http.get<any>(`${environment.apiUrl}api/dependencia/${dep_id}/usuarios`)
  }

  getTipoServicio() {
    return this.http.get<any>(`${environment.apiUrl}api/tipos_servicios`)
  }

  getTipoSolicitudes() {
    return this.http.get<any>(`${environment.apiUrl}api/tipos_solicitudes`)
  }

  getTiposVia() {
    return of([
      { value: 'avenida_calle', viewValue: 'Avenida Calle' },
      { value: 'avenida_carrera', viewValue: 'Avenida Carrera' },
      { value: 'calle', viewValue: 'Calle' },
      { value: 'carrera', viewValue: 'Carrera' },
      { value: 'diagonal', viewValue: 'Diagonal' },
      { value: 'transversal', viewValue: 'Transversal' }
    ])
  }

  getLetraDireccion() {
    return of([
      { value: 'A', viewValue: 'A' },
      { value: 'B', viewValue: 'B' },
      { value: 'C', viewValue: 'C' },
      { value: 'D', viewValue: 'D' },
      { value: 'E', viewValue: 'E' },
      { value: 'F', viewValue: 'F' },
      { value: 'G', viewValue: 'G' },
      { value: 'H', viewValue: 'H' },
      { value: 'I', viewValue: 'I' },
      { value: 'J', viewValue: 'J' },
      { value: 'K', viewValue: 'K' },
      { value: 'L', viewValue: 'L' },
      { value: 'M', viewValue: 'M' },
      { value: 'N', viewValue: 'N' },
      { value: 'Ñ', viewValue: 'Ñ' },
      { value: 'O', viewValue: 'O' },
      { value: 'P', viewValue: 'P' },
      { value: 'Q', viewValue: 'Q' },
      { value: 'R', viewValue: 'R' },
      { value: 'S', viewValue: 'S' },
      { value: 'T', viewValue: 'T' },
      { value: 'U', viewValue: 'U' },
      { value: 'V', viewValue: 'V' },
      { value: 'W', viewValue: 'W' },
      { value: 'X', viewValue: 'X' },
      { value: 'Y', viewValue: 'Y' },
      { value: 'Z', viewValue: 'Z' }
    ]);
  }

  getSufijos() {
    return of([
      { value: 'sur', viewValue: 'Sur' },
      { value: 'este', viewValue: 'Este' }
    ]);
  }
}

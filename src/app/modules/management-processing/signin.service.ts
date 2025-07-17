import { Injectable } from '@angular/core';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { IUsuarioFirma } from '../components/draggable-table/draggable-table.component';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';


export interface IUsuarioExterno {
  id: number; // integer
  documento: string; // string
  tipo_persona_id: number; // integer
  tipo_identificacion_id: number; // integer
  nombre: string; // string
  representante_legal?: string; // string
  email: string; // string
  telefono: string; // string
}


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    public restService: RestService,
    public http$: HttpClient,
  ) { }

public userData = this.restService.getUserData()
public token = this.userData.accessToken;

private registrosUsuariosSubject = new BehaviorSubject<any[][] | null>([[], [], []]);
public formData = new BehaviorSubject<any>('');
public selectedTabIndexSubject = new BehaviorSubject<number>(0);
public userInfo = new BehaviorSubject<any>({});

// Observable para que los componentes se puedan suscribir
public userInfo$: Observable<any> = this.userInfo.asObservable()
public formData$: Observable<any> = this.formData.asObservable()
public registrosUsuarios$: Observable<any[][] | null> = this.registrosUsuariosSubject.asObservable();
public selectedTabIndex$: Observable<number> = this.selectedTabIndexSubject.asObservable();
// Método para obtener el valor actual
public getValue(): any[][] | null {
  return this.registrosUsuariosSubject.getValue();
}

public setData(data: any) {
  this.formData.next(data)
  localStorage.setItem('formData', JSON.stringify(data))
}

public getData() {
  return this.formData.getValue()
}

// Método para establecer un nuevo valor
public setValue(value: any[][]): void {
  this.registrosUsuariosSubject.next(value);
}

public setValueTabIndex(value: number): void {
  this.selectedTabIndexSubject.next(value);
}

public getValueTabIndex(): number {
  return this.selectedTabIndexSubject.getValue();
}

public setUserInfo(value: any) {
  this.userInfo.next(value)
}

public getUserInfo() {
  return this.userInfo.getValue()
}


public userNamesOfCurrentGroup(): string[] {
  const registros = this.getValue()[this.getValueTabIndex()];
  return registros.reduce((acc, subArray) => acc.concat(subArray.map(usuario => usuario.nombreUsuario)), []);
}

public plainSubArray(index: number): IUsuarioFirma[] {
  const registros = this.getValue();
  if (index < 0 || index >= registros.length) {
    throw new Error('Índice fuera de rango');
  }
  return registros[index].reduce((acumulador, subArreglo) => acumulador.concat(subArreglo), []);
}
  getParticipantes() {
    return this.restService.restGetNotDecrypt('api/flujo/participantes', this.token)
  }

  getTiposFirma() {
    return this.restService.restGetNotDecrypt('api/flujo/tipoFirma', this.token)
  }

  getEstados () {
    return this.restService.restGetNotDecrypt('api/flujo/estados', this.token)

  }

  getUsuarios(idRol: string) {
    return this.restService.restGetNotDecrypt('api/flujo/participantes/' + idRol, this.token)
  } 

  editForeginUser(body: IUsuarioExterno) {

    // let formData = new FormData();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    };

    // for (const key in body) {
    //     if (body.hasOwnProperty(key) && body[key] !== undefined && body[key] !== null) {
    //         formData.append(key, body[key].toString());
    //     }
    // }

    return this.http$.put(`${environment.apiUrl}api/flujo/usuarios/externos/edit`, body, httpOptions)
  }

  
  public buildHttpParams(form: FormGroup): HttpParams {
    let params = new HttpParams();

    Object.keys(form.controls).forEach(key => {
      const controlValue = form.get(key).value;
      if (controlValue !== null && controlValue !== '' && controlValue !== 0) {
        params = params.set(key, controlValue);
      }
    });
    return params;
  }

  public getSignatures() {

   
  
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.userData.accessToken,
      }),
    };
      const currentUserId = this.userData.idDataCliente;
      return this.http$.get(`${environment.apiUrl}api/flujo/radicado/bandeja/${currentUserId}`, httpOptions)
   
  }

}

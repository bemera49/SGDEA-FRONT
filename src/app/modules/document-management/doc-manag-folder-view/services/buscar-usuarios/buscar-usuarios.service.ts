import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Observable } from 'rxjs';
/** Librería para encriptar y desencriptar */
import CryptoJS from "crypto-js";
/** Importación de environment */
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService {

  private http = inject(HttpClient);
  private auth = inject(AuthHeaderService);
  private urBase = environment.apiUrl;

  constructor() { }

  public encryptAES(data: any, authorization: string, base64: boolean = false) {
    try {
      let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        authorization + environment.llaveAES
        // ,{
        //   keySize: 128 / 8,
        //   iv: environment.llaveAES,
        //   mode: CryptoJS.mode.CBC,
        //   padding: CryptoJS.pad.Pkcs7
        // }
      ).toString();
      if (base64 == true) {
        encrypted = btoa(encrypted);
        encrypted = encrypted.replace(/_/g, "/");
        encrypted = encrypted.replace(/-/g, "+");
        return encrypted;
      } else {
        return encrypted;
      }
    } catch (error) {
      //console.log('error en la encriptación front-end');
      return "null";
    }
  }


  getUsuarios(params): Observable<any> {
 
    let dataEncypt = this.encryptAES(params, this.auth.getToken(), true);
    let urlParams = "?request=" + dataEncypt;
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.auth.getToken()}`,
        language: localStorage.getItem("language") ? localStorage.getItem("language") : "es",
      }),
    };


    return this.http.get(`${this.urBase}gestionDocumental/expedientes/get-available-usuarios` + urlParams, httpOptions)


  }
}

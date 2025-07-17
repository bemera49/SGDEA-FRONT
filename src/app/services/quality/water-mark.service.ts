import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class WaterMarkService {
  public baseUrl:string = environment.apiUrl;

  constructor(private http:HttpClient, private authHeaderSvc:AuthHeaderService) { }

  updateWaterMarkMetadataDoc(data:{}, id:any){
    const url = `${this.baseUrl}api/sgc/documento-propuesto/v1/update/metadatos-marca/${id}`;
    return this.http.put(url, data, {headers: this.authHeaderSvc.getAuthHeader()});
  };

  uploadWaterMarkDoc(data:FormData){
    const url = `${this.baseUrl}api/sgc/v1/add/file-marca-agua/update`;
    return this.http.post(url, data, {headers: this.authHeaderSvc.getAuthHeader()});
  };

  endWaterMarkDocEdit(id:any){
    const url = `${this.baseUrl}api/sgc/documento-propuesto/v1/end/edit-metadatos-marca/${id}`;
    return this.http.put(url, {}, {headers: this.authHeaderSvc.getAuthHeader()});
  };

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  public baseUrl:string = environment.apiUrl;

  constructor(private http:HttpClient, private authHeaderSvc:AuthHeaderService) { }

  getDocMetadata(id:any){
    const url = `${this.baseUrl}api/sgc/documento-propuesto/v1/metadatos/${id}/`;
    return this.http.get(url,{headers: this.authHeaderSvc.getAuthHeader()});
  };


  updateDocMetadata(data:{}, id:any){
    const url = `${this.baseUrl}api/sgc/documento-propuesto/v1/update/metadatos-version/${id}/`;
    return this.http.put(url, data, {headers: this.authHeaderSvc.getAuthHeader()});
  };

  endMetadataDocEdit(id:any){
    const url = `${this.baseUrl}api/sgc/documento-propuesto/v1/end/edit-metadatos-version/${id}`;
    return this.http.put(url, {}, {headers: this.authHeaderSvc.getAuthHeader()});
  };
}

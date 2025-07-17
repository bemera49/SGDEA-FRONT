import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityAnalystsIndexComponent } from '@app/modules/quality/quality-analyst-index/quality-analyst-index.component';

import { ProviderElement } from '../../modules/ocupational//ocupational-view-request-detail/components/type-request/provider-element'


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private URL = environment.apiUrlBasePath;
  private apiUrl = environment.apiUrlBasePath + 'api/sgc/solicitud/';

  constructor(
    private http: HttpClient, private rest: RestService,
    private authHeaderService: AuthHeaderService
  ) { }


  getProviderReceived(): Observable<ProviderElement> {
    return this.http.get<ProviderElement>(`${this.URL}api/hco/proveedore/proveedores`, this.authHeaderService.getHttpHeadersOptions());
  }


}





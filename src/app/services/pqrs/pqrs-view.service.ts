import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrsViewService {




  constructor(
    public restService: RestService,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { }

  getDocumentUrl(url: string): string {
    const toBeReplaced = '/app/public/';
    return url?.replace(toBeReplaced, 'http://3.225.70.18:8111/');
  };

  public getDocument(docsArr: any[]) {
    if (docsArr) {
      let documentoParaFirmar = docsArr.filter(item => item.estadoRadiDocumentoPrincipal === 21);
      if (documentoParaFirmar.length == 0) {
        documentoParaFirmar = docsArr.filter(doc => doc.estadoRadiDocumentoPrincipal === 6);
      }
      return documentoParaFirmar[documentoParaFirmar.length - 1];
    }
  }

  public fetchPqrsById(id: string) {

    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    return this.http.get(`${environment.apiUrlBasePath}api/radicado/${id}`, httpOptions)
  }

  public fetchPqrs() {

    const id = this.activatedRoute.snapshot.params['id']
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };


    return this.http.get(`${environment.apiUrlBasePath}api/radicado/${id}`, httpOptions)
  }

  // Logica para saber si estamos en una vista principal o una vista asociada

  public detailFatherId = new BehaviorSubject(null)
  public detailFatherId$ = this.detailFatherId.asObservable()

  setDetailFatherId(id: string) {
    this.detailFatherId.next(id)
  }

  getDetailFatherId() {
    return this.detailFatherId.getValue()
  }

  // Logica para recargar el detalle cuando se realiza una accion
  private reloadRequestedSubject = new Subject<void>();
  public reloadRequested$ = this.reloadRequestedSubject.asObservable();

  requestReload() {
    this.reloadRequestedSubject.next();
  }



}

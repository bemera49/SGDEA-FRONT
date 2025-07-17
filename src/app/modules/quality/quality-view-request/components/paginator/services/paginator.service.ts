import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse } from '../../../model/response-filter';
import { ResponsePaginator } from '../model/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  quantityPages = new BehaviorSubject<number[]>([]);
  private groupPages = new Subject<number[][]>();
  private dataPagination = new BehaviorSubject<ResponsePaginator>(null);

  private page = new BehaviorSubject<string>('1');
  private rowPage = new BehaviorSubject<string>('5');
  private http = inject(HttpClient)
  private authHead = inject(AuthHeaderService)
  constructor() { }

  getPages(): BehaviorSubject<number[]> {
    return this.quantityPages;
  }


  getData(path: string, params?: any): Observable<ApiResponse> {

    return this.http.get<ApiResponse>(path, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.authHead.getToken()}`
        },
      ),
      params
    });

  }


  changePages(path: string, params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(path, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.authHead.getToken()}`
        },
      ),

      params
    },
    )
  }

  setPage(num: string): void {
    this.page.next(num);
  }


  setRowPage(num: string) {
    this.rowPage.next(num);
  }

  getPage(): Observable<string> {
    return this.page.asObservable();
  }

  getPageRowP(): string {
    return this.rowPage.value;
  }

  getPageP(): string {
    return this.page.value;
  }

  getRowPages(): Observable<string> {
    return this.rowPage.asObservable();
  }

  generatePages(totalPages: number): void {
    const cantidadGrupos = Math.ceil(totalPages / 6);

    // Crear un array con los grupos de páginas
    const paginas: number[][] = [];
    for (let i = 0; i < cantidadGrupos; i++) {
      const start = i * 6 + 1;
      const end = Math.min((i + 1) * 6, totalPages);
      const grupo = Array.from({ length: end - start + 1 }, (_, index) => index + start);
      paginas.push(grupo);
    }


    this.groupPages.next(paginas);

    // Emitir el array de páginas
    this.quantityPages.next(paginas[0]);

  }

  setDataPagination(data: ResponsePaginator): void {
    this.dataPagination.next(data);
  }

  getDataPagination(): ResponsePaginator {
    return this.dataPagination.value;
  }

  observerPages(): Observable<ResponsePaginator> {
    return this.dataPagination.asObservable();
  }

}


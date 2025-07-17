import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestData, RequestParams } from '../../model/response-filter';

@Injectable({
  providedIn: 'root'
})
export class ShareInformationFiltersService {

  private dataFilter = new BehaviorSubject<RequestParams>({
    area: '',
    end_date: '',
    filed: '',
    process: '',
    request_type: '',
    start_date: '',
    state: '',
    perPage: '5'

  })

  private dataTable = new BehaviorSubject<RequestData[]>([])

  constructor() { }

  setDataFilter(data: RequestParams): void {
    this.dataFilter.next({ ...this.dataFilter.value, ...data });
  }

  getDataFilter(): RequestParams {
    return this.dataFilter.value;
  }

  setDataTableItems(data: RequestData[]): void {
    this.dataTable.next(data);
  }

  getDataTableItems(): RequestData[] {
    return this.dataTable.value;
  }



}

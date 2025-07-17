import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MultipleFile } from '../model/create-request';

@Injectable({
  providedIn: 'root'
})
export class ShareDataTableService {

  private dataTableDA = new BehaviorSubject<MultipleFile[]>([]);
  private dataFormSolicitud = new BehaviorSubject<boolean>(false);
  private url = new BehaviorSubject<string>('');

  constructor() { }


  setData(data: MultipleFile[]): void {
    console.log('data', data);
    this.dataTableDA.next(data);
  }

  setDataFormSolicitud(valid: boolean): void {
    this.dataFormSolicitud.next(valid);
  }

  getDataFormSolicitud(): boolean {
    return this.dataFormSolicitud.value;
  }

  getDataLength(): number {
    return this.dataTableDA.value.length;
  }

  getDataTable(): MultipleFile[] {
    return this.dataTableDA.value;
  }

  setUrl(val: string) {
    this.url.next(val);
  }

  getUrl(): string {
    return this.url.value;
  }
}

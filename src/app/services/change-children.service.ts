/**

 */

import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeChildrenService {

  @Output() reloadComponent: EventEmitter<any> = new EventEmitter<any>();
  @Output() openFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeComponent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  changeProcess(data) {
    if(data.proccess === "reload") {
      this.reloadComponent.emit(data);
    }
  }

  /** Método para emitir la variable que controla la apertura del modal para los filtros */
  onSearchFilter(data) {
    if(data.status === true) {
      this.openFilter.emit(data);
    }
  }

  /** Método utilizado para enviar peticiones a los componentes modal */
  requestToModal(data) {
    if(data.proccess === "close") {
      this.closeComponent.emit(data);
    }
  }
}

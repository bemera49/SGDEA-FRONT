import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {

  public totalItems: BehaviorSubject<any[]> = new BehaviorSubject([])
  public ItemsPaginados: BehaviorSubject<any[]> = new BehaviorSubject([])


  /**
   * @description Nos permite obtener todos los datos inicialmente antes de paginarlos
   * Si desea implementar un filtro debe asignar la información a este service
   */
  setTotalItems(collection: any[]) {
    this.totalItems.next(collection)
  }

  /**
   * @description Nos permite obtener todos los datos que ya han sido paginados
   */
  setItemsPaginados(collection: any[]) {
    this.ItemsPaginados.next(collection)
  }

  /**
 * @description Nos permite devolver todos los datos que ya han sido paginados
 */
  getItems() {
    return this.ItemsPaginados.asObservable()
  }


  constructor() { }


}
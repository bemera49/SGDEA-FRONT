import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoSolicitud, Semaforo, RequestElement } from './requests-element';

import { RequestService } from '@app/services/ocupational/requests.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';

@Component({
  selector: 'app-table-requests',
  templateUrl: './table-requests.component.html',
  styleUrls: ['./table-requests.component.css']
})

export class TableRequestComponent implements OnInit {

  colorSemaforo = Semaforo;
  colorEstado = EstadoSolicitud;
  requestElement: RequestElement | null;
  public itemsPerDefault: number = 5;

  RequestReceived: any[] = [];


  constructor(
    private paginationService: PaginationServiceService,
    private requestServices: RequestService,
    public router: Router) { }

  ngOnInit(): void {
    this.getRequestReceived();
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.RequestReceived = res
      }
    })
  }


  getColorClass(semaforo: string): string {
    switch (semaforo) {
      case this.colorSemaforo.AMARILLO:
        return 'amarillo';
      case this.colorSemaforo.ROJO:
        return 'rojo';
      case this.colorSemaforo.VERDE:
        return 'verde';
      default:
        return '';
    }
  }

  getColorEstadoClass(estado: string): string {
    switch (estado) {
      case this.colorEstado.EN_ELAMBORACION:
        return 'en-elaboracion';
      case this.colorEstado.EN_ESPERA_DE_APROBACION:
        return 'espera-aprobacion';
      case this.colorEstado.APROBADO:
        return 'aprobado';
      case this.colorEstado.EN_TRAMITE:
        return 'en-tramite';
      default:
        return '';
    }
  }



  redireccionar(id_request: number, id_type_task: number) {
    this.router.navigate(['/ocupational/ocupational-view-request', id_request, id_type_task], { queryParams: { state: 'create' } });
  }


  getRequestReceived() {
    this.requestServices.getRequestReceived().subscribe({
      next: (res: any) => {
        this.paginationService.setTotalItems(res.data)
      },
      error: (error) => {
        console.log('error getRequestReceived: ', error);
      }
    });
  }

  //Decorador OUTPUT
  refreshRequestReceived() {
    this.getRequestReceived();
  }


}
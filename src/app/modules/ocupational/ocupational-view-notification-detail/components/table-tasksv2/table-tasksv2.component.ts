import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoSolicitud, Semaforo, TasksElement, TasksUser } from './tasksv2-element';

import { Tasksv2Service } from './Services/tasksv2.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';

@Component({
  selector: 'app-table-tasksv2',
  templateUrl: './table-tasksv2.component.html',
  styleUrls: ['./table-tasksv2.component.css']
})

export class TableTasksv2Component implements OnInit {

  @Input() idUsuario: number = 0;

  colorSemaforo = Semaforo;
  colorEstado = EstadoSolicitud;
  tasksElement: TasksElement | null;
  public itemsPerDefault: number = 5;

  TaskReceived: any[] = [];


  constructor(
    private paginationService: PaginationServiceService,
    private tasksServices: Tasksv2Service,
    public router: Router) { }

  ngOnInit(): void {
    this.getTaskReceived();
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.TaskReceived = res
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


  redireccionar(id_request: number) {
    this.router.navigate(['/ocupational/ocupational-view-request', id_request], { queryParams: { state: 'create' } });
  }

  getTaskReceived() {
    
    const valueForm: TasksUser = {
      idusuario: this.idUsuario,
    };

    this.tasksServices.getTaskReceived(valueForm).subscribe({
      next: (res: any) => {
        this.paginationService.setTotalItems(res.data)
      },
      error: (error) => {
        console.log('error getTaskReceived: ', error);
      }
    });
  }

  //Decorador OUTPUT
  refreshTaskReceived() {
    this.getTaskReceived();
  }


}
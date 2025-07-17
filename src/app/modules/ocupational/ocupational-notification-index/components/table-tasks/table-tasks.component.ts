import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoSolicitud, Semaforo, TasksElement } from './tasks-element';

import { TasksService } from '@app/services/ocupational/tasks.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.css']
})

export class TableTasksComponent implements OnInit {

  colorSemaforo = Semaforo;
  colorEstado = EstadoSolicitud;
  tasksElement: TasksElement | null;
  public itemsPerDefault: number = 5;

  TaskReceived: any[] = [];


  constructor(
    private paginationService: PaginationServiceService,
    private tasksServices: TasksService,
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


  redireccionar(id_request: number, id_type_task: number) {
    this.router.navigate(['/ocupational/ocupational-view-notification', id_request, id_type_task], { queryParams: { state: 'create' } });
  }

  getTaskReceived() {
    this.tasksServices.getTaskReceived().subscribe({
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
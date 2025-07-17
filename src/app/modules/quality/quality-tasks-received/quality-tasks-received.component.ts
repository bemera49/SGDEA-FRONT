import { Component, OnInit } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';

import { EstadoSolicitud, Semaforo, TasksElement } from './components/table-tasks/tasks-element';
import { Items } from '../quality-main/components/sub-menu-quality/items';
@Component({
  selector: 'app-quality-tasks-received',
  templateUrl: './quality-tasks-received.component.html',
  styleUrls: ['./quality-tasks-received.component.css']
})
export class QualityTasksReceivedComponent implements OnInit {

  items: Items[] = [{
    link: 'quality-tasks-received',
    text: 'Tareas recibidas'
  }]

  //Variables
  statusButton: boolean = false;

  TaskReceived: any[] = [];
  elementPaginator: any = {};

  constructor(
    public toast: ToastService,
  ) { }


  ngOnInit(): void {
    (!navigator.onLine) ? this.showToastError() : console.log('Conexión estable');
    this.setupConnectionEvents();
  }

  setupConnectionEvents(): void {
    window.addEventListener('online', () => {
      console.log('Conexión restablecida');
    });

    window.addEventListener('offline', () => {
      this.showToastError();
    });
  }

  showToastError(): void {
    this.toast.open({ title: '¡Error!', description: '022.Conexión inestable ' });
  }
}

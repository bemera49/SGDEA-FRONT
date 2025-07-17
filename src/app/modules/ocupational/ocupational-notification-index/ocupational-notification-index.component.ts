import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Items } from '../ocupational-main/components/sub-menu-ocupational/items';

@Component({
  selector: 'app-ocupational-notification-index',
  templateUrl: './ocupational-notification-index.component.html',
  styleUrls: ['./ocupational-notification-index.component.css']
})
export class OcupationalNotificationIndexComponent implements OnInit {

  items: Items[] = [{
    link: 'ocupational-notification-index',
    text: 'Notificaciones'
  }]

  @ViewChild('stepper') stepper!: MatTabGroup;

  //Variables
  statusButton: boolean = false;


  AnalystReceived: any[] = [];
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


  // Asumiendo que el evento $event contiene el índice de la pestaña a mostrar
  onSelectionChange(selectedTabIndex: number) {
    this.stepper.selectedIndex = selectedTabIndex;
  }



}

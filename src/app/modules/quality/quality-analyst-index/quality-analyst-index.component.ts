import { Component, OnInit } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';
//import { AnalystsElement } from './components/table-analysts/analysts-element';
//import { TraceabilitysElement } from './components/table-traceabilitys/traceabilitys-element';

import { Items } from '../quality-main/components/sub-menu-quality/items';
@Component({
  selector: 'app-quality-analyst-index',
  templateUrl: './quality-analyst-index.component.html',
  styleUrls: ['./quality-analyst-index.component.css']
})
export class QualityAnalystsIndexComponent implements OnInit {

  items: Items[] = [{
    link: 'quality-analyst-index',
    text: 'Inactivar Analistas'
  }]



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
}

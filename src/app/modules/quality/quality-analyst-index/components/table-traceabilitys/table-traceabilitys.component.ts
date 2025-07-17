import { CommunicationService } from '@app/services/communication.service'; 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TraceabilitysElement } from './traceabilitys-element';

import { TraceabilitysService } from '@app/services/quality-traceability/traceabilitys.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';

import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ToastService } from "src/app/services/toast/toast.service";



@Component({
  selector: 'app-table-traceabilitys',
  templateUrl: './table-traceabilitys.component.html',
  styleUrls: ['./table-traceabilitys.component.css']
})

export class TableTraceabilitysComponent implements OnInit {

  traceabilitysElement: TraceabilitysElement | null;
  public itemsPerDefault: number = 5;

  TraceabilityReceived: any[] = [];


  constructor(
    private communicationService: CommunicationService,    
    private paginationService: PaginationServiceService,
    private traceabilitysServices: TraceabilitysService,
    public router: Router,
    private validateOnline: ValidateInternetService,
    private toast: ToastService,


  ) { }

  ngOnInit(): void {
    this.getTraceabilityReceived();
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.TraceabilityReceived = res
      }
    })
    this.communicationService.refreshTraceability$.subscribe(() => {
      this.refreshTraceabilityReceived();
    });    
  }



  getTraceabilityReceived() {
    this.traceabilitysServices.getTraceabilityReceived().subscribe({
      next: (res: any) => {
        this.paginationService.setTotalItems(res.data)


          console.log(res.data)


      },
      error: (error) => {
        console.log('error getTraceabilityReceived: ', error);
      }
    });
  }

  //Decorador OUTPUT
  refreshTraceabilityReceived() {
    this.getTraceabilityReceived();
    
  }

  displayState(state: boolean): string {
    return state ? 'Activo' : 'Inactivo';
  }

  refreshTaskReceived(): void {
    //this.updatatraceability();
    //this.getDataRequest();
  }

  isNoEmptyObject(obj: any): boolean {
    return obj && Object.keys(obj).length !== 0;
  }

 
}
import { CommunicationService } from '@app/services/communication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalystsElement } from './analysts-element';

import { AnalystsService } from '@app/services/quality-analyst/analysts.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';

import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ToastService } from "src/app/services/toast/toast.service";


interface Analyst {
  id: number;
  inactivo: boolean | null;
  checkbox1?: boolean;
  checkbox2?: boolean;
  checkbox3?: boolean;
}


@Component({
  selector: 'app-table-analysts',
  templateUrl: './table-analysts.component.html',
  styleUrls: ['./table-analysts.component.css']
})

export class TableAnalystsComponent implements OnInit {

  analystsElement: AnalystsElement | null;
  public itemsPerDefault: number = 20;

  AnalystReceived: any[] = [];


  constructor(
    private communicationService: CommunicationService,
    private paginationService: PaginationServiceService,
    private analystsServices: AnalystsService,
    public router: Router,
    private validateOnline: ValidateInternetService,
    private toast: ToastService,


  ) { }

  ngOnInit(): void {
    this.getAnalystReceived();
    /*
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.AnalystReceived = res
      }
    })
    */
  }


  guardarSeleccionados() {
      this.seleccionados();
      /*
      if (this.validateOnline.validateConnection()) {
      }
      */
  }

  seleccionados() {
    const seleccionados = this.AnalystReceived.filter(item =>
      item.checkbox1 && (item.checkbox2 || item.checkbox3) && !(item.checkbox2 && item.checkbox3)
    ).map(item => ({
      user_id: item.id,
      desactivar: item.checkbox1,
      diauno: item.checkbox2,
      diados: item.checkbox3,
    }));
    

    this.analystsServices.postAnalystInactive(seleccionados).subscribe({
      next: (res) => {
        this.toast.open({
          title: '001',
          description: 'Registro exitoso.'
        });
        this.refreshAnalystReceived();
        this.communicationService.triggerRefreshTraceability();
      },
      error: err => {
        this.toast.open({
          title: 'Error',
          description: `Petición fallida ${err.error.message}.`
        });
      },
    });


  }


  getAnalystReceived() {
    this.analystsServices.getAnalystReceived().subscribe({
      next: (res: any) => {
        this.AnalystReceived = res.data.data.map(item => ({
          ...item,
          checkbox1: false,
          checkbox2: false,
          checkbox3: false
        }));
        /*
        this.paginationService.setTotalItems(res.data.data)
          console.log(res.data.data)
        */

        },
      error: (error) => {
        console.log('error getAnalystReceived: ', error);
      }
    });
  }

  //Decorador OUTPUT
  refreshAnalystReceived() {
    this.getAnalystReceived();
    
  }

  onCheckboxChange(item: any) {
    // Si checkbox1 no está seleccionado, deseleccionar checkbox2 y checkbox3
    if (!item.checkbox1) {
      item.checkbox2 = false;
      item.checkbox3 = false;
    }
  
    // Si se selecciona checkbox2, deseleccionar checkbox3
    if (item.checkbox2) {
      item.checkbox3 = false;
    }
  
    // Si se selecciona checkbox3, deseleccionar checkbox2
    if (item.checkbox3) {
      item.checkbox2 = false;
    }
  }

}
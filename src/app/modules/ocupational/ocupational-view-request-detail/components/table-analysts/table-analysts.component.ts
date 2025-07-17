import { CommunicationService } from '@app/services/communication.service';
import { Component, OnInit, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnalystsElement } from './analysts-element';

import { AnalystsService } from './services/analysts.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';

import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ToastService } from "src/app/services/toast/toast.service";
import { TableAnalysts } from './Interfaces/table-analysts';


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

  private validateIt = inject(ValidateInternetService);
  private modal = inject(ModalService);

  analystsElement: AnalystsElement | null;
  public itemsPerDefault: number = 20;

  AnalystReceived: any[] = [];
  selectedAnalystId: number | null = null;

  @Input() idRequest: number = 0;

  constructor(
    private communicationService: CommunicationService,
    private paginationService: PaginationServiceService,
    private analystsServices: AnalystsService,
    public router: Router,
    private validateOnline: ValidateInternetService,
    private toast: ToastService,
    private routerRedirect: Router,


  ) { 
    this.validateIt.connect();
  }

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


  redireccionar(id_user: number) {
    this.router.navigate(['/ocupational/ocupational-view-requestuser', id_user, this.idRequest], { queryParams: { state: 'create' } });
  }

  guardarSeleccionadosOld() {
    // Lógica para guardar el analista seleccionado
    this.seleccionados();
  }


  seleccionados() {
    const selectedAnalyst = this.AnalystReceived.find(item => item.id === this.selectedAnalystId);

    const valueForm: TableAnalysts = {
      request_id: this.idRequest,
      user_id: selectedAnalyst

    };

    //console.log('Analista seleccionado:', selectedAnalyst);

    this.analystsServices.postAnalystAssign(valueForm).subscribe({
      next: (res) => {
        this.toast.open({
          title: '001',
          description: 'Registro exitoso.'
        });
      },
      error: err => {
        this.toast.open({
          title: 'Error',
          description: `Petición fallida ${err.error.message}.`
        });
      },
    });
  }



  guardarSeleccionados(): void {
    
      if (this.validateIt.validateConnection()) {
        //const selectedAnalyst = this.AnalystReceived.find(item => item.id === this.selectedAnalystId);

        if (this.selectedAnalystId) {
          const dialogRef = this.modal.open(ActionModalComponent, {
            title: '004',
            description: `¿Está seguro de la acción a realizar?`,
            onConfirmAction: () => {

              const valueForm: TableAnalysts = {
                request_id: this.idRequest,
                user_id: this.selectedAnalystId
          
              };
                        this.analystsServices.postAnalystAssign(valueForm).subscribe({
                next: (response) => {
                  this.toast.open({
                    title: '001',
                    description: 'Registro exitoso.'
                  });
                  this.routerRedirect.navigate(['/ocupational/ocupational-notification-index']);
  
                  console.log('respuesta de la API:', response);
                },
                error: (err) => {
                  this.toast.open({
                    title: 'Error',
                    description: `Petición fallida ${err.error.message}.`
                  });
                },
              });
            }
          });
  
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
              dialogRef.componentInstance.data.onConfirmAction();
            }
          });
        } else {
          this.toast.open({
            title: '¡007!',
            description: 'Por favor verifique, datos obligatorios incompletos.'
          });
        }
      }
  
  
    

  }


  
  getAnalystReceived() {
    this.analystsServices.getAnalystReceived().subscribe({
      next: (res: any) => {
        this.AnalystReceived = res.data.data;
        console.log(res.data.data);
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
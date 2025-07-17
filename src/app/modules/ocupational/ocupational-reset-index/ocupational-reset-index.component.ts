import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Items } from '../ocupational-main/components/sub-menu-ocupational/items';
import { OcupationalResetIndexService } from "./Services/ocupational-reset-index.service";
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { NotifyModalComponent } from '@app/services/modal/components/pqrs/notify-modal/notify-modal.component';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ocupational-reset-index',
  templateUrl: './ocupational-reset-index.component.html',
  styleUrls: ['./ocupational-reset-index.component.css']
})
export class OcupationalResetIndexComponent implements OnInit {

  items: Items[] = [{
    link: 'ocupational-reset-index',
    text: 'Solicitudes'
  }]

  @ViewChild('stepper') stepper!: MatTabGroup;

  private modal = inject(ModalService);
  
  //Variables
  statusButton: boolean = false;
  

  AnalystReceived: any[] = [];
  elementPaginator: any = {};
  editorContent = "";

  constructor(
    public toast: ToastService,
    private viewServices: OcupationalResetIndexService,
    public sweetAlertService: SweetAlertService,
    private routers: Router,

  ) { }


  ngOnInit(): void {


      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '004',
        description: `¿Está seguro de Resetear las pruebas?`,
        onConfirmAction: () => {
          this.viewServices.getResetHco().subscribe(event => {
            if(event) {
              this.modal.open(NotifyModalComponent, {
                title: 'Reset exitoso'
              });
          
              this.routers.navigate(["/ocupational/ocupational-request-index"]);
            }        
      
      
          }, error => {
            this.sweetAlertService.sweetInfoText('Error durante el reset', error.error.error);
          });
                


        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
          dialogRef.componentInstance.data.onConfirmAction();
        }
      });
    


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

  changeDocument(content: string) {
    this.editorContent = content;
    console.log("Contenido del editor: ", this.editorContent)
  }


}

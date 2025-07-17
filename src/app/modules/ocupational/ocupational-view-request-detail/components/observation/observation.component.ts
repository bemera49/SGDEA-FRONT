import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { ModalACComponent } from "@app/modules/components/modal-ac/modal-ac.component";
import { Router } from '@angular/router';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ListAnalyst } from '../../model/view-reques-detail';
import { ApiResponse, Observation } from './Interfaces/observation';
import { ObservationService } from './Services/observation.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';


/**
 * 
 */
@Component({
  selector: 'app-observation-request',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit, OnChanges {
  //variables de flujo
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  @Input() listAnalyst: ListAnalyst[] = [];
  @Input() idParam: number = 0;
  @Input() idRequest: number = 0;
  
  observationdata: ApiResponse | [] = [];
  ProviderReceived: any[] = [];
  selectedProveedorEmail: string = '';



  // titulos de la tabla
  headertableitem = [
    'Analista DGCP',
    'Estado SAP',
    '# Radicado',
    'Tipo de solicitud',
    'Nombre del documento',
    'Fecha designación',
    'Estado de la solicitud',
  ]


  ObservationForm = new FormGroup({
    request_id: new FormControl(null),
    observacion: new FormControl(null),
    aprobado: new FormControl(null),
  });

  tipoSolicitudForm = new FormGroup({
    // otros controles del formulario
    // más controles
  })


  constructor(
    private observationservices: ObservationService,
    private cd: ChangeDetectorRef,
    private vi: ValidateInternetService,
    private router: Router,
    public dialog: MatDialog,
    private paginationService: PaginationServiceService,


  ) {
    this.vi.connect();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.idParam) {
      this.ObservationForm.get('request_id').setValue(this.idParam);
    }
  }

  ngOnInit(): void {


  }

  //parte superior formulario
  onSubmit(): void {

    if (this.vi.validateConnection()) {
      if (this.ObservationForm.valid) {
        const dialogRef = this.modal.open(ActionModalComponent, {
          title: '004',
          description: `¿Está seguro de la acción a realizar?`,
          onConfirmAction: () => {
            const valueForm: Observation = {
              request_id: this.idRequest,
              observacion: this.ObservationForm.get('observacion')?.value!,
              aprobado: 0,
              
            };
            this.observationservices.postverifyObservacion(valueForm).subscribe({
              next: (response) => {
                this.toast.open({
                  title: '001',
                  description: 'Registro exitoso.'
                });
                this.router.navigate(['/ocupational/ocupational-notification-index']);

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

    // Método que determina si se seleccionó "Externo"
    isExternoSelected(): boolean {
      return this.ObservationForm.get('tipoSolicitud')?.value === '2';
    }

    onProveedorChange(event: any) {
      const selectedProveedorId = event.value;
      const selectedProveedor = this.ProviderReceived.find(proveedor => proveedor.id === selectedProveedorId);
      this.selectedProveedorEmail = selectedProveedor ? selectedProveedor.email : '';
    }


  
    openModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
      const modalRef = this.dialog.open(ModalACComponent, {
        width: '515px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          img: 'assets/img/questionIcon.svg',
          paragraph: '004. ¿Estas seguro de la acción a realizar?'
        }
      });
  
      modalRef.afterClosed().subscribe(result => {
  
        alert('Generar un nueva solicitud')
      })
    }




  
}

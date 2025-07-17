import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ListAnalyst, TraceabilityItem } from '../../model/view-reques-detail';
import { ApiResponse, RequestDesignation } from './Interfaces/Designation-requets';
import { DesignationsService } from './Services/designations.service';
import { Subject } from 'rxjs';
import { PaginationServiceService } from '@app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { Observable, Subscription } from 'rxjs';

/**
 * 
 */
@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent implements OnInit, OnChanges {
  //variables de flujo
  private pag = inject(PaginationServiceService);
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  @Input() listAnalyst: ListAnalyst[] = [];
  @Input() idParam: number = 0;
  @Input() dataViewAll: any[] = [];
  traceabilitydata: ApiResponse | [] = [];
  showSaveButton:boolean = true;
  eventSubjectReloadTable: Subject<void> = new Subject<void>();
  private paginationSubscription: Subscription;





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

  DesignationForm = new FormGroup({
    request_id: new FormControl(null),
    analyst_id: new FormControl(null, Validators.required),
  });


  constructor(
    private traceabilityservices: DesignationsService,
    private cd: ChangeDetectorRef,
    private vi: ValidateInternetService,
    private router: ActivatedRoute,
  ) {
    this.vi.connect();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.idParam) {
      this.DesignationForm.get('request_id').setValue(this.idParam);
    }
  }

  ngOnInit(): void {
    this.vi.checkConnection();
    if(this.dataViewAll['state'] == "En elaboración"){
      this.showSaveButton = false;
      this.paginationSubscription = this.pag.getItems().subscribe(data => {
        // Paso 1: Consolidar todas las solicitudes en un solo array con el analista correspondiente
        const allRequests = data
          // Mapear cada objeto en el array `data` para extraer todas las solicitudes
          .map(obj => 
            obj.solicitude.map(request => ({
              // Copiar todas las propiedades de la solicitud original
              ...request,
              // Añadir el ID del analista al que pertenece la solicitud
              analystId: obj.id,       
              // Añadir el nombre del analista al que pertenece la solicitud
              analystName: obj.name_analyst 
            }))
          )
          // Combinar todos los arrays de solicitudes en un solo array plano
          .reduce((acc, requests) => acc.concat(requests), []); 
  
        // Paso 2: Ordenar todas las solicitudes por fecha
        // Convertir las fechas a milisegundos para compararlas y ordenar de la más reciente a la más antigua
        allRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 
  
        // Imprimir las solicitudes ordenadas para depuración
        console.log('Solicitudes ordenadas:', allRequests);
  
        // Verificar si hay al menos una solicitud en el array ordenado
        if(allRequests.length > 0) {
          // Obtener la primera solicitud (la más reciente) en el array ordenado
          const firstTraceabilityItem = allRequests[0];
          // Buscar el analista correspondiente a la primera solicitud en la lista de analistas
          const defaultAnalyst = this.listAnalyst.find(analyst => analyst.nombre === firstTraceabilityItem.analystName);
          // Si se encuentra el analista, establecer su ID en el formulario de DesignationForm
          if (defaultAnalyst) {
            this.DesignationForm.get('analyst_id')?.setValue(defaultAnalyst.id);
          }
        }
      });
    }
  }


  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente para evitar fugas de memoria
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
  }

  //parte superior formulario
  onSubmit(): void {

    if (this.vi.validateConnection()) {
      if (this.DesignationForm.valid) {
        const dialogRef = this.modal.open(ActionModalComponent, {
          title: '',
          description: `¿Está seguro de la acción a realizar?`,
          onConfirmAction: () => {
            const valueForm: RequestDesignation = {
              request_id: this.DesignationForm.get('request_id')?.value!,
              analyst_id: this.DesignationForm.get('analyst_id')?.value!
            };
            this.traceabilityservices.postasignAnalyst(valueForm).subscribe({
              next: (response) => {
                this.showSaveButton = false;
                this.toast.open({
                  title: '',
                  description: 'Registro exitoso.'
                });
                console.log('respuesta de la API:', response);
                this.reloadTableTrazabilidad();
                window.location.reload();
              },
              error: (err) => {
                this.toast.open({
                  title: '',
                  description: `Conexión inestable.`
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
          title: '',
          description: 'Por favor verifique, datos obligatorios incompletos.'
        });
      }
    }

  }

  reloadTableTrazabilidad() {
    this.eventSubjectReloadTable.next();
  }
}

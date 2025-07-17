import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ListAnalyst } from '../../model/view-reques-detail';
import { ApiResponse, RequestDesignation } from './Interfaces/Designation-requets';
import { DesignationsService } from './Services/designations.service';


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
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  @Input() listAnalyst: ListAnalyst[] = [];
  @Input() idParam: number = 0;
  traceabilitydata: ApiResponse | [] = [];




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

  }

  //parte superior formulario
  onSubmit(): void {

    if (this.vi.validateConnection()) {
      if (this.DesignationForm.valid) {
        const dialogRef = this.modal.open(ActionModalComponent, {
          title: '004',
          description: `¿Está seguro de la acción a realizar?`,
          onConfirmAction: () => {
            const valueForm: RequestDesignation = {
              request_id: this.DesignationForm.get('request_id')?.value!,
              analyst_id: this.DesignationForm.get('analyst_id')?.value!
            };
            this.traceabilityservices.postasignAnalyst(valueForm).subscribe({
              next: (response) => {
                this.toast.open({
                  title: '001',
                  description: 'Registro exitoso.'
                });
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
}

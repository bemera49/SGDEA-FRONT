import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { ModalACComponent } from "@app/modules/components/modal-ac/modal-ac.component";
import { Router } from '@angular/router';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ListAnalyst } from '../../model/view-notification-detail';
import { ApiResponse, Confirmation } from './Interfaces/confirmation';
import { ConfirmationService } from './Services/confirmation.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';


/**
 * 
 */
@Component({
  selector: 'app-confirmation-request',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnChanges {
  //variables de flujo
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  @Input() listAnalyst: ListAnalyst[] = [];
  @Input() idParam: number = 0;
  @Input() idRequest: number = 0;
  
  confirmationdata: ApiResponse | [] = [];

  ConfirmationForm = new FormGroup({
    request_id: new FormControl(null),
    aclaracion: new FormControl(null),
    fecha_tarea: new FormControl('', [Validators.required, this.noPastDateValidator]),
    hora_tarea: new FormControl('', [Validators.required]),
  });

noPastDateValidator(control: FormControl): { [key: string]: boolean } | null {
  const today = new Date(); 
  const selectedDate = new Date(control.value);

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate.getTime() > today.getTime()) {
    return { pastDate: true };
  }

  return null; 
}


  constructor(
    private confirmationservices: ConfirmationService,
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
      this.ConfirmationForm.get('request_id').setValue(this.idParam);
    }
  }

  ngOnInit(): void {


  }

  onSubmit(): void {

    if (this.vi.validateConnection()) {
      if (this.ConfirmationForm.valid) {
        const dialogRef = this.modal.open(ActionModalComponent, {
          title: '004',
          description: `¿Está seguro de confirmar que se realizo la tarea?`,
          onConfirmAction: () => {
            const valueForm: Confirmation = {
              request_id: this.idRequest,
              aclaracion: this.ConfirmationForm.get('aclaracion')?.value!,
              fecha_tarea: this.ConfirmationForm.get('fecha_tarea')?.value!,
              hora_tarea: this.ConfirmationForm.get('hora_tarea')?.value!,
              
            };
            this.confirmationservices.postverifyConfirmation(valueForm).subscribe({
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

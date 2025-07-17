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
import { ApiResponse, RequestTypeRequest, RequestTypeNoRequest } from './Interfaces/type-request-requets';
import { TypeRequestService } from './Services/type-request.service';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { ProviderService } from '@app/services/ocupational/provider.service';


/**
 * 
 */
@Component({
  selector: 'app-type-request',
  templateUrl: './type-request.component.html',
  styleUrls: ['./type-request.component.css']
})
export class TypeRequestComponent implements OnInit, OnChanges {
  //variables de flujo
  private toast = inject(ToastService);
  private modal = inject(ModalService);
  @Input() listAnalyst: ListAnalyst[] = [];
  @Input() idParam: number = 0;
  @Input() idRequest: number = 0;
  
  typerequestdata: ApiResponse | [] = [];
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

  TypeRequestForm = new FormGroup({
    request_id: new FormControl(null),
    tipoSolicitud: new FormControl('', [Validators.required]),
    proveedor: new FormControl(null),
    observation: new FormControl(null),
    cuerpocorreo: new FormControl(null),
    aprobado: new FormControl(null),
  });

  TypeRequestNoForm = new FormGroup({
    request_id: new FormControl(null),
    aprobado: new FormControl(null),
  });

  tipoSolicitudForm = new FormGroup({
    // otros controles del formulario
    // más controles
  })


  constructor(
    private typerequestservices: TypeRequestService,
    private cd: ChangeDetectorRef,
    private vi: ValidateInternetService,
    private router: Router,
    public dialog: MatDialog,
    private paginationService: PaginationServiceService,
    private providerServices: ProviderService,


  ) {
    this.vi.connect();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.idParam) {
      this.TypeRequestForm.get('request_id').setValue(this.idParam);
    }
  }

  ngOnInit(): void {
    this.vi.checkConnection();
    this.getProviderReceived();
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.ProviderReceived = res
      }
    })

    this.refreshProviderReceived();


  }

  //parte superior formulario
  onSubmit(): void {

    if (this.vi.validateConnection()) {
      if (this.TypeRequestForm.valid) {
        const dialogRef = this.modal.open(ActionModalComponent, {
          title: '004',
          description: `¿Está seguro de la acción a realizar?`,
          onConfirmAction: () => {
            const valueForm: RequestTypeRequest = {
              request_id: this.idRequest,
              tipoSolicitud: this.TypeRequestForm.get('tipoSolicitud')?.value!,
              proveedor: this.TypeRequestForm.get('proveedor')?.value!,
              cuerpocorreo: this.TypeRequestForm.get('cuerpocorreo')?.value!,
              aprobado: 1,
              
            };
            this.typerequestservices.postverifyRequest(valueForm).subscribe({
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
      return this.TypeRequestForm.get('tipoSolicitud')?.value === '2';
    }

    onProveedorChange(event: any) {
      const selectedProveedorId = event.value;
      const selectedProveedor = this.ProviderReceived.find(proveedor => proveedor.id === selectedProveedorId);
      this.selectedProveedorEmail = selectedProveedor ? selectedProveedor.email : '';
    }


    saveChanges() {
      if (this.tipoSolicitudForm.valid) {
        this.openModal('100ms', '100ms')
      } else {
        alert('Por favor, completa todos los campos requeridos.');
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


    getProviderReceived() {
      this.providerServices.getProviderReceived().subscribe({
        next: (res: any) => {
          
          this.paginationService.setTotalItems(res.data)
  
  
            console.log(res.data)
  
  
        },
        error: (error) => {
          console.log('error getProviderReceived: ', error);
        }
      });
    }
  
    //Decorador OUTPUT
    refreshProviderReceived() {
      this.getProviderReceived();
      
    }

    guardarDevolver() {

      if (this.vi.validateConnection()) {
          const dialogRef = this.modal.open(ActionModalComponent, {
            title: '004',
            description: `¿Está seguro de la acción a realizar?`,
            onConfirmAction: () => {
              const valueFormNo: RequestTypeNoRequest = {
                request_id: this.idRequest,
                aprobado: 0,
                
              };
              this.typerequestservices.postverifyNoRequest(valueFormNo).subscribe({
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
      }
  


    }

  
}

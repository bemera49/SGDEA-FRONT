import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-asociar-documentos',
  templateUrl: './asociar-documentos.component.html',
  styleUrls: ['./asociar-documentos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule
  ],
})
export class AsociarDocumentosComponent implements OnInit {
  public expedientName: string = '';
  public expedientSerie: string = '';
  public subExpedientSerie: string = '';
  public expedients: any[] = [];
  // Version api
  public versionApi = environment.versionApiDefault;
  public authorization: string;
  public expedientId!: number;
  public isSend: boolean = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTokenLS();
    console.log(this.expedientId)
  }

  constructor(
    public dialogRef: MatDialogRef<AsociarDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public lhs: LocalStorageService,
    private toastService: ToastService,
    private router: Router,
    private modalService: ModalService,
  ) { }

  dataModal = this.data


  close(redirect: boolean) {
    this.dialogRef.close();
    if (redirect) {
      this.router.navigateByUrl('/documentManagement/folder-create')
    }
  };

  getExpedients() {
    this.sweetAlertService.sweetLoading();
    let params = {
      nombreExpediente: this.expedientName,
      nombreGdTrdSerie: this.expedientSerie,
      nombreGdTrdSubserie: this.subExpedientSerie,
    };
    this.restService.restGetParams(this.versionApi + 'gestionDocumental/expedientes/index-list', params, this.authorization)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.expedients = resp.data;
          this.sweetAlertService.sweetClose();
        }
      });
  };

  associate() {
   
    this.isSend = true;
    this.sweetAlertService.sweetLoading();
    let params = {
      "data": {
        "idExpediente": this.expedientId
      },
      "ButtonSelectedData": this.dataModal.data

    };
    
    this.restService.restPost(this.versionApi + 'radicacion/transacciones/include-expedient', params, this.authorization)
      .subscribe({
        error: (err: any) => {
          this.toastService.open({
            description: 'Error en la peticion',
            success: false,
            duration: 3000,
            title: 'Peticion fallida'
          })
          this.sweetAlertService.sweetClose();
        },
        next: (resp: any) => {
          this.sweetAlertService.sweetClose();
          if (resp.data.Error) {
            resp.data.Error.forEach(message => {
              this.toastService.open({
                description: message,
                success: false,
                duration: 3000,
                title: ''
              });
            });
          } else {
            this.dialogRef.close(true);
          }
        }
      });
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;

      /** Llamado de los servicios que necesitan el token */
      // this.generateUrl();
      this.getExpedients();
    });
  };

  selectExpedient(id: any) {
    if (id === this.expedientId) {
      this.expedientId = undefined;
    } else {
      this.expedientId = id;
    };

  };

  onConfirm() {
    this.modalService.openAction("", "¿Está seguro de la acción a realizar?", () => { this.associate() });
  };
}

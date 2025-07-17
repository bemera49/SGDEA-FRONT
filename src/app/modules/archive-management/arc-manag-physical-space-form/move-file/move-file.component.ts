import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalAppService } from '@app/services/global-app.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-move-file',
  templateUrl: './move-file.component.html',
  styleUrls: ['./move-file.component.css']
})
export class MoveFileComponent implements OnInit {

  moduleForm = new FormGroup({
  
    codigoUnidad: new FormControl('', Validators.compose([
      Validators.required
    ])),

  });
  validatecliente = false
  isSaving: boolean = false;
  boxCode: string = "";
  unidadCampoGaArchivo: string = "";

  constructor(
    public sweetAlertService: SweetAlertService, 
    public dialogRef: MatDialogRef<any>, 
    private http: HttpClient,
    private toast: ToastService,
    public globalAppService: GlobalAppService,
    public restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,

  ) { }

  ngOnInit(): void {
    this.boxCode = this.data.boxCode;
    this.unidadCampoGaArchivo = this.data.unidadCampoGaArchivo;
  }

  submitForm() {
    
    if (!this.moduleForm.valid) {

      this.toast.open({
        title: "",
        description: "Por favor verifique, datos obligatorios incompletos.",
      });
      return;
    } 

    this.modalService.openAction("", "¿Está seguro de la acción a realizar?", () => { 
        this.transladarArchivo(this.moduleForm.value.codigoUnidad)
    }).afterClosed().subscribe(() => {
      
    })

    console.log(this.moduleForm.value);

  }

  closeDialog(showCancelacion = true) {
    this.dialogRef.close({event: 'close', status: false , data: [] });
    if(showCancelacion){
      this.toast.open({
        title: "",
        description: "Cancelación exitosa",
      });
    }
  }

  transladarArchivo(codigoUnidad){

    let codigosDisponibles = this.data.dataUnidadesAlmaceamiento.map(e => e.box.code);

    if(!codigosDisponibles.includes(codigoUnidad)){
      this.toast.open({
        title: "",
        description: "El codigo ingresado no coincide con una unidad de almacenamiento",
      });
      return;
    }

    let unidadFound = this.data.dataUnidadesAlmaceamiento.find(e => e.box.code == codigoUnidad)
    this.isSaving = true;
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    this.http.put(environment.apiUrlBasePath + `api/gestion-archivo/traslado-archivo/${this.data.idgaArchivo}`, {
      caja_id: unidadFound.box.id
    },  httpOptions)
    .subscribe({
      next: (response) => {
        this.toast.open({
          title: "",
          description: "La información ha sido guardada con éxito",
        });
        this.isSaving = false
        this.moduleForm.reset()
        this.closeDialog(false)
      },
      error: (error) => {
        this.toast.open({
          title: "",
          description: "Ha ocurrido un error al procesar su solicitud, inténtelo nuevamente",
        });
        this.isSaving = false
      },

    })
    
  }


}

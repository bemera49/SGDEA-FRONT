import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { map, Observable, startWith } from 'rxjs';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.css']
})
export class AddBoxComponent implements OnInit {

  moduleForm = new FormGroup({
  
    codigoUnidadAlmacenamiento: new FormControl('', Validators.compose([
      Validators.required
    ])),
    tipoUnidadAlmacenamiento: new FormControl(null, Validators.compose([
      Validators.required
    ])),
    codigoUnidadConservacion: new FormControl('', Validators.compose([
      Validators.required
    ])),
    tipoUnidadConservacion: new FormControl(null, Validators.compose([
      Validators.required
    ])),
    codigoExpediente: new FormControl(null, Validators.compose([
      Validators.required
    ])),
    tomo: new FormControl(null, Validators.compose([
      Validators.maxLength(10)
    ])),
    frecuenciaConsulta: new FormControl(null, Validators.compose([
      Validators.required
    ])),
    notas: new FormControl(null),


  });
  isSaving: boolean = false;
  tiposUnidadAlmacenamiento: any[] = [];
  tiposUnidadConservacion: any[] = [];
  // Version api
  versionApi = environment.versionApiDefault;
  filteredOptions: Observable<string[]>;
  expedients: any[] = [];
  frecuenciasConsulta: any[] = [
    {
      value: 1,
      name: "Baja"
    },
    {
      value: 2,
      name: "Media"
    },
    {
      value: 3,
      name: "Alta"
    },
  ];

  constructor(
    public sweetAlertService: SweetAlertService, 
    public dialogRef: MatDialogRef<any>, 
    private http: HttpClient,
    private toast: ToastService,
    public globalAppService: GlobalAppService,
    public restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getTiposUnidadesAlmacenamiento()
    this.getTiposUnidadConservacion()
    this.getExpedients()

  }

  submitForm() {
    if (this.moduleForm.valid) {
    
      let idGdExpediente = this.expedients.find(e => e.nombreExpediente == this.moduleForm.value.codigoExpediente).id;
      let data = {
        ...this.data.datosEntrepano,
        descripcion: "registro caja",
        codigo: this.moduleForm.value.codigoUnidadAlmacenamiento,
        tipo_id: this.moduleForm.value.tipoUnidadAlmacenamiento,
        unidadConservacionGaArchivo: this.moduleForm.value.codigoUnidadConservacion,
        tipoArchivoId: this.moduleForm.value.tipoUnidadConservacion,
        idGdExpediente,
        tomo: this.moduleForm.value.tomo,
        frecuencia_consulta: this.moduleForm.value.frecuenciaConsulta ,
        notas: this.moduleForm.value.notas
      }
      this.saveStorageUnit(data)
      return;
    } 

    this.toast.open({
      title: "",
      description: "Por favor verifique, datos obligatorios incompletos.",
    });
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

  saveStorageUnit(data){
    this.isSaving = true;
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    this.http.post(environment.apiUrlBasePath + `api/gestion-archivo/caja`, data,  httpOptions)
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

  getTiposUnidadesAlmacenamiento() {

    
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    this.http.get(environment.apiUrlBasePath +'api/gestion-archivo/v1/tipos-caja', httpOptions)
    .subscribe({
      next: (response: any) => {

        this.tiposUnidadAlmacenamiento = response.data;
        console.log(this.tiposUnidadAlmacenamiento);
        
      },
      error: (error) => {
        console.log(error)
      },

    })
  }

  getTiposUnidadConservacion() {
    
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    this.http.get(environment.apiUrlBasePath +'api/gestion-archivo/v1/tipo-archivos', httpOptions)
    .subscribe({
      next: (response: any) => {

        this.tiposUnidadConservacion = response.data;
        console.log(this.tiposUnidadConservacion);
        
      },
      error: (error) => {
        console.log(error)
      },

    })
  }

  getExpedients() {
    let params = {
      filterOperation: []
    };

    const token = this.restService.getUserData().accessToken;
    
    this.restService.restGetParams(this.versionApi + 'gestionDocumental/expedientes/index', params, token)
      .subscribe({
        error: (err: any) => {
          console.log(err);
        },
        next: (resp: any) => {
          console.log(resp)
          this.expedients = resp.data;

          this.filteredOptions = this.moduleForm.controls.codigoExpediente.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
      });
  };

  private _filter(value: any): any[] {
    const filterValue = value//?.toLowerCase();
    let res = this.expedients.filter(option => option?.nombreExpediente/* ?.toLowerCase() */.includes(filterValue));
    console.log({res});
    
    return res;
  }

}

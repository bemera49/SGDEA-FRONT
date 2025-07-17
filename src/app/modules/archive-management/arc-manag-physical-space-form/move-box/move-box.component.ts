import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalAppService } from '@app/services/global-app.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from "src/environments/environment";
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';
import { MoveBoxService } from './move-box.service';

@Component({
  selector: 'app-move-box',
  templateUrl: './move-box.component.html',
  styleUrls: ['./move-box.component.css']
})
export class MoveBoxComponent implements OnInit {

  moduleForm = new FormGroup({
  
    codigoUnidad: new FormControl('', Validators.compose([
      Validators.required
    ])),
    entrepano: new FormControl('', Validators.compose([
      Validators.required
    ])),

  });
  validatecliente = false
  isSaving: boolean = false;
  boxCode: string = "";
  unidadCampoGaArchivo: string = "";
  entrepanos$: Observable<any[]>;

  constructor(
    public sweetAlertService: SweetAlertService, 
    public dialogRef: MatDialogRef<any>, 
    private http: HttpClient,
    private toast: ToastService,
    public globalAppService: GlobalAppService,
    public restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    private moveBoxService: MoveBoxService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.boxCode = this.data.row.box.code;
    
    this.entrepanos$ = this.moduleForm.get('entrepano')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      filter((name) => !!name),
      switchMap((name: any) => this.moveBoxService.getEntrepanos(name)),
      tap( (res: any) => console.log('HTTP response:', res)),
    );
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

    let selectedEntrepano: any = this.moduleForm.value.entrepano;
    delete selectedEntrepano.name;

    let data = {
      ...this.data.datosEntrepano,
      trasladoArchivos: selectedEntrepano
    }
    console.log(data);

    this.http.put(environment.apiUrlBasePath + `api/gestion-archivo/cajas-archivo/${this.data.row.box.id}`, data,  httpOptions)
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

  getOptionText(option: any) {
    return option?.name;
  }
}

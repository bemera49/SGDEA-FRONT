import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-remove-box',
  templateUrl: './remove-box.component.html',
  styleUrls: ['./remove-box.component.css']
})
export class RemoveBoxComponent implements OnInit {
  isSaving: boolean = false;
  boxCode: string = "";


  constructor(
    public sweetAlertService: SweetAlertService, 
    public dialogRef: MatDialogRef<any>, 
    private http: HttpClient,
    private toast: ToastService,
    public globalAppService: GlobalAppService,
    public restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  confirm(){
    this.retirarCaja()
  }

  ngOnInit(): void {
    console.log(this.data);
   
     this.boxCode = this.data. row.box.code;

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

  retirarCaja(){
    this.isSaving = true;
    const token = this.restService.getUserData().accessToken;


    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: this.data.datosEntrepano,
    };
    
    this.http.delete(environment.apiUrlBasePath + `api/gestion-archivo/caja/${this.data.row.box.id}`,  options)
    .subscribe({
      next: (response) => {
        this.toast.open({
          title: "",
          description: "La información ha sido guardada con éxito",
        });
        this.isSaving = false
        this.closeDialog(false)
      },
      error: (error) => {
        console.error(error);
        this.toast.open({
          title: "",
          description: error.error.message,
        });
        this.isSaving = false
      },

    })
    
  }

}

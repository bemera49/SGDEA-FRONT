import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-asociar-solicitudes-hu13-confirm',
  templateUrl: './asociar-solicitudes-hu13-confirm.component.html',
  styleUrls: ['./asociar-solicitudes-hu13-confirm.component.css']
})
export class AsociarSolicitudesHu13ConfirmComponent implements OnInit {

  desasociar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AsociarSolicitudesHu13ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private authService: AuthService,
    public restService: RestService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.desasociar = this.data?.desasociar;
    
  }

  submit(){
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let data = this.data;
    

    this.desasociar = data?.desasociar;

    if(data?.desasociar){
      delete data?.desasociar;
    }

    this.http.post(`${environment.apiUrlBasePath}api/asociar-solicitudes/radicados-${this.desasociar? 'des' : ''}asociar`,data, httpOptions)
    .subscribe({
      next: (res) => {
        this.toast.open({
          title: this.desasociar ? 'Se realizó desasociación de manera exitosa' : 'Asociación Exitosa',
          description: ``,
          success: true,
          duration: 3000,
        })
        this.dialogRef.close();
        this.data['isClosedWithCancelButton'] = false;
      },
  
      error: (err: any) => { 
        this.toast.open({
          title: '',
          description: `Ha ocurrido un error al procesar su solicitud, inténtelo nuevamente`,
          success: false,
          duration: 5000,
        })
      },
    })
  }

  onCloseModal(){
    this.dialogRef.close();
    this.data['isClosedWithCancelButton'] = true;
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-desaprobar-radicado',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-desaprobar-radicado.component.html',
  styleUrls: ['./confirm-desaprobar-radicado.component.css']
})
export class ConfirmDesaprobarRadicadoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDesaprobarRadicadoComponent>,
    private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public restService: RestService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  desaprobar() {
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    this.http.get(`${environment.apiUrlBasePath}api/autorizaciones?radicado_id=${this.data.radicado_id}`, httpOptions)
      .subscribe({
        next: (res) => {
          console.log(res, 'res')
          this.data['id'] = res[0]['id']
          let data = {
            estado: "Rechazada",
            observaciones: this.data.observaciones,
          }
          this.http.put(`${environment.apiUrlBasePath}api/autorizacion/${this.data['id']}`, data, httpOptions)
            .subscribe({
              next: (res) => {
                this.toast.open({
                  title: ``,
                  description: `Rechazo exitoso`,
                  success: true,
                  duration: 3000,
                })
                this.dialogRef.close();
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
        },
        error: (err: any) => {
          this.toast.open({
            title: '',
            description: `Ha ocurrido un error al consultar las autorizaciones pendientes`,
            success: false,
            duration: 5000,
          })
        },
      })
  }

  onCloseModal() {
    this.dialogRef.close();
    this.data['isClosedWithCancelButton'] = true;
    this.toast.open({
      title: '',
      description: `Cancelación exitosa`,
      success: true,
      duration: 3000,
    })
  }
}

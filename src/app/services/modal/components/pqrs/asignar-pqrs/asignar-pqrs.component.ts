/**
 * HU 008 - Asignar PQRS o solicitud
 */

import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthService } from '@app/services/auth.service';
import { ModalService } from '@app/services/modal/modal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestService } from '@app/services/rest.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { ToastService } from '@app/services/toast/toast.service';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { TableService } from '@app/modules/components/table/service/table.service';

@Component({
  selector: 'app-asignar-pqrs',
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
  ],
  templateUrl: './asignar-pqrs.component.html',
  styleUrls: ['./asignar-pqrs.component.css']
})
export class AsignarPqrsComponent implements OnInit {

  public tableService: TableService = inject(TableService);

  form: FormGroup = this.fb.group({
    area: [{ value: null, disabled: true }, Validators.required],
    us_proyector: [null, Validators.required],
  });
  authorization: string;
  versionApi = environment.apiUrl;
  idRolProyector = 12
  listProyectores = []

  modalOpen = false

  constructor(
    public dialogRef: MatDialogRef<AsignarPqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalSvc: ModalService,
    private lhs: LocalStorageService,
    private httpClient: HttpClient,
    private restSvc: RestService,
    private toastSvc: ToastService,
    private pqrsService: PqrsViewService,
    private router: Router
  ) {
    this.getTokenLS()
  }



  ngOnInit(): void {
    this.getProyectores()
    let dataUser = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
    this.form.controls['area'].enable();
    this.form.controls['area'].setValue(dataUser.data.dependencia.sgc_centro_costo_id + "-" + dataUser.data.dependencia.nombreGdTrdDependencia);
    this.form.controls['area'].disable();
  }

  getProyectores() {
    this.httpClient.get(this.versionApi + 'api/usuarios?rol_id=12', { headers: { Authorization: "Bearer " + this.authorization } }).subscribe((data: any) => {
      this.listProyectores = data.map(p => ({ name: p.user_detalle.nombreUserDetalles + ' ' + p.user_detalle.apellidoUserDetalles, value: p.id }));
    })
  }

  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }


  close() {
    this.modalOpen = true
    this.modalSvc.openAction("", "¿Está seguro de cancelar la asignación?", () => {
      this.dialogRef.close()
      this.dialogRef.afterClosed().subscribe(() => { this.toastSvc.open({ title: 'Cancelación exitosa', success: true, duration: 2000 }) })
    }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.modalOpen = true
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => { this.onConfirm() }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  onConfirm() {
    let jsonSend = {
      data: {
        idUsuarioTramitador: this.form.get('us_proyector').value,
        idDependenciaTramitador: this.form.get('area').value.split('-')[0],
        observacion: ""
      },
      ButtonSelectedData: [
        ...this.data.data.map(p => ({ id: p, idInitialList: 0 })),
      ]
    }
    let dataEncypt = this.restSvc.encryptAES(jsonSend, this.authorization);
    let dataSend = encodeURIComponent(JSON.stringify(dataEncypt));
    let jsonParams = "jsonSend=" + dataSend;
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + this.authorization,
      })
    };


    console.log(jsonSend, httpOptions)

    this.httpClient.post(`${this.versionApi}radicacion/transacciones/re-asign`, jsonParams, httpOptions).pipe(catchError((error) => {
      this.toastSvc.open({
        description: 'Error en la peticion',
        success: false,
        duration: 3000,
        title: 'Peticion fallida'
      })
      console.error(error)
      throw new Error
    })).subscribe(() => {
      this.pqrsService.requestReload()
      this.tableService.emitEvent()
      this.dialogRef.close()
      this.toastSvc.open({
        success: true,
        duration: 3000,
        title: "Asignación exitosa"
      })
      this.router.navigate(['/pqrs/log-pqrs-index']);
    })
  }

}

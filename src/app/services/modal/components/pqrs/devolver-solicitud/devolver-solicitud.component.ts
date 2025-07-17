/**
 * HU 003 - Devolver PQRS o solicitud
 */
import { Component, Inject, OnInit } from '@angular/core';
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
import { LocalStorageService } from '@app/services/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { RestService } from '@app/services/rest.service';
import { Router } from '@angular/router';
import { GlobalAppService } from '@app/services/global-app.service';
import { catchError } from 'rxjs';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
@Component({
  selector: 'app-devolver-solicitud',
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
  templateUrl: './devolver-solicitud.component.html',
  styleUrls: ['./devolver-solicitud.component.css']
})
export class DevolverSolicitudComponent implements OnInit {

  form: FormGroup = this.fb.group({
    causales: [null, Validators.required],
    observaciones: [null]
  });

  listCausales = []
  listAreas = []

  authorization: string;
  versionApi = environment.apiUrl;

  isProyector = true
  isNoCorresponde = false
  isCausalOtro = false

  constructor(
    public dialogRef: MatDialogRef<DevolverSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lhs: LocalStorageService,
    private httpClient: HttpClient,
    private modalSvc: ModalService,
    private toastSvc: ToastService,
    private restSvc: RestService,
    private router: Router,
    private authService: AuthService,
    private pqrsService: PqrsViewService
  ) {
    this.getTokenLS()
  }

  ngOnInit(): void {
    if (!this.data.data.isProyector) {
      this.isProyector = false
      this.form.removeControl('area')
    }
    this.getAreas()
    this.getCausales()
  }

  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  getCausales() {
    if (this.data.data.actionDefault == false) {
      this.listCausales = this.data.data.causales_rechazo_lista
    } else {
      this.httpClient.get(this.versionApi + 'api/causales_de_rechazo', { headers: { Authorization: "Bearer " + this.authorization } }).subscribe((data: any) => {
        this.listCausales = data.map(p => ({ name: p, value: p }));
      })
    }
  }
  getAreas() {
    this.httpClient.get(this.versionApi + 'api/dependencias', { headers: { Authorization: "Bearer " + this.authorization } }).subscribe((data: any) => {
      this.listAreas = data.map(p => ({ name: p.nombreGdTrdDependencia, value: p.idGdTrdDependencia }));
    })
  }

  changeCausales(event) {
    this.form.removeControl('causal_otro')
    this.form.removeControl('area')
    this.isNoCorresponde = false
    this.isCausalOtro = false
    if (event.value == 'Asignación a área no corresponde') {
      this.isNoCorresponde = true
      if (this.isProyector)
        this.form.addControl('area', this.fb.control(null))
      else
        this.form.addControl('area', this.fb.control(null, Validators.required))
    } else if (event.value == 'Otro' || event.value == 5) {
      this.isCausalOtro = true
      this.form.addControl('causal_otro', this.fb.control(null, Validators.required))
    }
  }

  close() {
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => { this.dialogRef.close() })
  }

  submit() {
    this.modalSvc.openAction("", "¿Está seguro de rechazar esta respuesta?", () => { this.onConfirm() })
  }

  onConfirm() {
    let dataUser = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
    let jsonSend = {
      radicado_id: parseInt(this.data.data.id),
      causal_de_rechazo: this.form.get('causales').value,
      user_id: dataUser.data.idRol,
      observaciones: this.form.get('observaciones').value,
      area_sugerida_id: this.form.controls['area'] ? this.form.get('area').value : null,
      causal_rechazo_otro: this.form.controls['causal_otro'] ? this.form.get('causal_otro').value : null,
    }
    //validamos si requerimos retornar la data o enviar los datos directamente
    if (this.data.data.actionDefault == false) {
      Object.keys(jsonSend).forEach(key => {
        if (jsonSend[key] == null) delete jsonSend[key];
      })
      this.dialogRef.close(jsonSend)
      return
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authorization,
      })
    };
    this.httpClient.post(`${this.versionApi}api/asignacion/rechazo/`, jsonSend, httpOptions).pipe(catchError((error) => {
      this.toastSvc.open({
        description: error.error.message,
        success: false,
        duration: 3000,
        title: 'Peticion fallida'
      })
      console.error(error)
      throw new Error
    })).subscribe((r: any) => {
      this.pqrsService.requestReload()
      this.dialogRef.close()
      this.toastSvc.open({
        description: r.mensaje,
        success: true,
        duration: 3000,
        title: "Operación exitosa"
      })
      this.router.navigate(['/pqrs/log-pqrs-index']);
    })
  }

}

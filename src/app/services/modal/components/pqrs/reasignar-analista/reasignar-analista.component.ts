
/**
 * HU 009 - Reasignacion general analista
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClasificacionInternaService } from '@app/services/modal/components/pqrs/clasificacion-interna/clasificacion-interna.service';
import { ToastService } from '@app/services/toast/toast.service';
import { TableService } from '@app/modules/components/table/service/table.service';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { ModalService } from '@app/services/modal/modal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RestService } from '@app/services/rest.service';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from '@app/services/local-storage.service';
@Component({
  selector: 'app-reasignar-analista',
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
    FormsModule
  ],
  templateUrl: './reasignar-analista.component.html',
  styleUrls: ['./reasignar-analista.component.css']
})
export class ReasignarAnalistaComponent implements OnInit {

  funcionarios: any[] = [];

  form: FormGroup = this.fb.group({
    funcionario: [null, [Validators.required]], // Acepta solo números
    motivo: [null, Validators.required], // Acepta cualquier string
  });


  constructor(
    public dialogRef: MatDialogRef<ReasignarAnalistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cInternaSvc: ClasificacionInternaService,
    private toastService: ToastService,
    private TableService: TableService,
    private pqrsService: PqrsViewService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    public restService: RestService,
    private lhs: LocalStorageService
  ) { }

  dataModal = this.data

  ngOnInit(): void {
    console.log(this.dataModal)
    this.getFuncionarios()
  }

  getFuncionarios() {

    //ROL_PROYECTOR
    let rol = 12;
    if (this.dataModal.data?.funcionarioSelected) {
      rol = this.dataModal.data?.funcionarioSelected?.rol;
    }

    this.lhs.getUser().then((user: any) => {
      this.http.get(`${environment.apiUrlBasePath}api/usuarios?rol_id=${12}&dependencia_id=${user.dependencia.idGdTrdDependencia}`).
        subscribe({
          next: (resp: any) => {

            if (this.dataModal.data?.funcionarioSelected) {
              this.funcionarios = resp.filter(e => e.id !== this.dataModal.data?.funcionarioSelected?.funcionario_actual)
              return;
            }
            this.funcionarios = resp;

          },
          error: (err: any) => {
            console.log(err)
          }
        });
    })

    //this.http.get(`${environment.apiUrlBasePath}api/usuarios?rol_id=${rol}`).
  };

  onConfirmClose() {
    this.toastService.open({ title: 'Cancelación exitosa', duration: 2000, success: true });
    this.dialogRef.close()
    /* this.modalService.openAction("", "¿Está seguro de cancelar la retipificación en curso?", () => {
      
      this.dialogRef.afterClosed().subscribe(() => {
        
      })
     }); */
  };

  onConfirm() {
    if (this.form.invalid) {
      this.toastService.open({
        description: 'Por favor verifique datos obligatorios incompletos',
        success: false,
        duration: 3000,
        title: ''
      })
      return;
    }

    this.modalService.openAction("", "¿Está seguro de la acción a realizar?", () => { this.submit() });
  };

  submit() {
    let data = {
      tramitador_id: this.form.value.funcionario,
      fileds: this.data.data.solicitudesSelected,
      motivo: this.form.value.motivo
    }

    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    this.http.post(`${environment.apiUrlBasePath}api/sgc/reasignar`, data, httpOptions)
      .subscribe({
        next: (resp: any) => {
          this.dialogRef.close();
          this.toastService.open({
            description: 'Reasignación exitosa',
            success: false,
            duration: 3000,
            title: ''
          })
        },
        error: (err: any) => {
          this.toastService.open({
            description: 'Ha ocurrido un error al procesar su solicitud, inténtelo nuevamente',
            success: false,
            duration: 3000,
            title: ''
          })
        },

      });
  };
}

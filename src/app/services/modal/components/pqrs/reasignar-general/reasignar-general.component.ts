/**
 * HU 009 - Reasignar PQRS o solicitud a analista para su trámite
 */

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastService } from '@app/services/toast/toast.service';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import * as moment from 'moment'
import { URLSearchParams } from 'url';
@Component({
  selector: 'app-reasignar-general',
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
  templateUrl: './reasignar-general.component.html',
  styleUrls: ['./reasignar-general.component.css']
})
export class ReasignarGeneralComponent {


  funcionarios: any[] = [];
  listRoles = []
  token: string = '';

  form: FormGroup = this.fb.group({
    fecha_inicial: [null, Validators.required],
    fecha_final: [null, Validators.required],
    rol: [null, Validators.required],
    funcionario_actual: [{value: null, disabled: true}, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<ReasignarGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService:ToastService,
    public restService: RestService,
  ){} 
  

  ngOnInit(): void {
    this.token =  this.restService.getUserData().accessToken;
    this.getRoles();

    this.form.get('rol').valueChanges.subscribe(rol_id => {
      this.form.controls['funcionario_actual'].setValue(null);
      this.form.controls['funcionario_actual'].enable();
      this.getFuncionarios(rol_id)
    })
  }


  
  close(){
    this.dialogRef.close()
  }

  submit() {

    if(this.form.invalid){
      this.toastService.open({
        description: 'Por favor verifique datos obligatorios incompletos',
        success: false,
        duration: 3000,
        title: ''
      })
      return;
    }

    if(!moment(this.form.value.fecha_final).isSameOrAfter(this.form.value.fecha_inicial)){
      this.toastService.open({
        description: 'El rango de fechas seleccionado no es válido',
        success: false,
        duration: 3000,
        title: ''
      })
      return;
    }


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };


    this.http.get(`${environment.apiUrlBasePath}api/sgc/reasignar?fecha_inicial_de_registro=${this.form.value.fecha_inicial}&fecha_final_de_registro=${this.form.value.fecha_final}&funcionario_actual=${this.form.value.funcionario_actual}`, httpOptions )
          .subscribe({
            error:(err:any) => {
              this.toastService.open({
                description: 'Ha ocurrido un error al procesar su solicitud, inténtelo nuevamente',
                success: false,
                duration: 3000,
                title: ''
              })
            },
            next:(resp:any) => {
              if(resp.data.length == 0){
                this.toastService.open({
                  description: 'No se encontraron registros que coincidad con su consulta',
                  success: false,
                  duration: 3000,
                  title: ''
                })
              }else{
                this.data['soliciutesFiltradas'] = resp.data;
                this.data['funcionarioSelected'] = {
                  funcionario_actual: this.form.value.funcionario_actual,
                  rol: this.form.value.rol
                }
                
                this.dialogRef.close()
              }
         
            }
          });
    

  }

  getFuncionarios(rol_id){
    //?rol_id=${rol_id}
    this.http.get(`${environment.apiUrlBasePath}api/usuarios?rol_id=${rol_id}`).
           subscribe({
            next:(resp:any) => {
              this.funcionarios = resp;
            },
            error:(err:any) => {
              console.log(err)
            }
          });
  };

  getRoles(){
    this.http.get(`${environment.apiUrlBasePath}api/roles`).
           subscribe({
            next:(resp:any) => {
              this.listRoles = resp;
            },
            error:(err:any) => {
              console.log(err)
            }
          });
  };


}

import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninService } from '../../signin.service';
import { IUsuarioFirma } from '@app/modules/components/draggable-table/draggable-table.component';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { catchError, retry } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-flow-foreign-user-modal',
  templateUrl: './flow-foreign-user-modal.component.html',
  styleUrls: ['./flow-foreign-user-modal.component.css']
})
export class FlowForeignUserModalComponent implements OnInit {

  constructor(
    public signinService: SigninService,
    public modalService: ModalService,
    public rest$: RestService,
    public dialogRef: MatDialogRef<FlowForeignUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){} 

  dataModal = this.data

  public form = new FormGroup({
    nombresApellidos: new FormControl('', Validators.required),
    tipoIdentificacion: new FormControl<string | number>('', Validators.required),
    numeroIdentificacion: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telefonoCelular: new FormControl('', Validators.pattern("^[0-9]+$")),
    correoElectronico: new FormControl('', Validators.required)
  })

  identificacionTipos = [
   { id: 1, name: 'Cédula de Ciudadanía' },
  { id: 2, name: 'Cédula de Extranjería' },
  { id: 3, name: 'Nit' },
  { id: 4, name: 'Tarjeta de Identidad' },
  { id: 5, name: 'Registro Civil' },
  { id: 6, name: 'Pasaporte' },
  { id: 7, name: 'NUIP (Número único de Identificación Personal)' }
  ]



  ngOnInit(): void {
    this.form.get('numeroIdentificacion').setValue(this.data.userCI)

    this.form.get('tipoIdentificacion').setValue(this.identificacionTipos[0].id)
  }

  submitForm() {

    if(this.form.valid) { 
      const userInfo = this.signinService.getUserInfo()
      const index = this.signinService.getValueTabIndex()
      const registros = this.signinService.getValue()
  
      const form = this.form.getRawValue()
  
      const body = {
        documento: form.numeroIdentificacion,
        tipo_persona_id: 1,
        tipo_identificacion_id: 1,
        nombre: form.nombresApellidos,
        email: form.correoElectronico,
        telefono: form.telefonoCelular
        }
  
      this.rest$.post('api/flujo/usuarios/externos', body)
      .pipe(
        retry(3),
        catchError((err) => {
        this.modalService.openNotify('Error', 'Error durante la creacion del usuario interno. Por favor intentelo de nuevo', false)
        console.error(err)
        throw new Error(err)
      }))
      .subscribe((response: any) => {
        this.modalService.openNotify('', 'Registro de usuario externo exitoso.', true).afterClosed().subscribe(response => this.close())
        return;
      })
    } 

  }

  close(){
    this.dialogRef.close()
  }

}

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
import { OnDestroy } from '@angular/core';
import { duration } from 'moment';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-flow-foreign-user-view-modal',
  templateUrl: './flow-foreign-user-view-modal.component.html',
  styleUrls: ['./flow-foreign-user-view-modal.component.css']
})
export class FlowForeignUserViewModalComponent implements OnInit {

  constructor(
    public signinService: SigninService,
    public modalService: ModalService,
    public rest$: RestService,
    public toast$: ToastService,
    public dialogRef: MatDialogRef<FlowForeignUserViewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){} 

  dataModal = this.data

  public userData = this.dataModal.userData[0];
  public sendMethod = this.dataModal.sendForeignUser;

  public allowEditing = false;
  public disabledButton = false;
  public allowSubmit = true;

  public switchEditing() {
    if(this.allowEditing) {

      if(!this.form.valid) {
        this.form.markAllAsTouched();
        this.toast$.open({title: 'Datos para usuario externo inválidos', duration: 2000, success: false})
        return;
      }

        this.modalService.openAction('Atención', '¿Está seguro de editar el usuario externo actual con estos datos?', () => {
          this.disabledButton = true;    
          const form = this.form;

            this.signinService.editForeginUser({
              id: this.userData.id, 
              documento: form.get('numeroIdentificacion')?.value, 
              tipo_persona_id: 1, // integer
              tipo_identificacion_id: this.form.get('tipoIdentificacion')?.value, // integer
              nombre: form.get('nombresApellidos')?.value,
              email: form.get('correoElectronico')?.value, 
              telefono: form.get('telefonoCelular')?.value
            }).subscribe(response => {
              console.log(response)

              this.allowEditing = false;
              this.disabledButton = false;

              this.modalService.openAction('Exito', 'Edicion de usuario externo exitoso. ¿Desea agregarlo al flujo de firma?', () => {
                this.dataModal.method()
                this.form.disable()

                this.close()
              })

            })

        })


      return;
    }
    this.allowEditing = true;
    this.form.enable();
    this.allowSubmit = false;
  }

  public form = new FormGroup({
    nombresApellidos: new FormControl({value: '', disabled: true}, Validators.required),
    tipoIdentificacion: new FormControl({value: 0, disabled: true}, Validators.required),
    numeroIdentificacion: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(8)]),
    telefonoCelular: new FormControl({value: '', disabled: true}, Validators.pattern("^[0-9]+$")),
    correoElectronico: new FormControl({value: '', disabled: true}, Validators.required)
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
    this.form.patchValue({
      nombresApellidos: this.userData.nombre,
      tipoIdentificacion: this.identificacionTipos.find(item => item.id === this.userData.tipo_identificacion.idTipoIdentificacion).id,
      numeroIdentificacion: this.userData.documento,
      telefonoCelular: this.userData.telefono,
      correoElectronico: this.userData.email,
    })
  }

  submitForm() {
    if(this.allowEditing) {

    

    } else {
      this.dataModal.method()
      this.close()
    }



  }

  close(){
    this.dialogRef.close()
  }


  ngOnDestroy() {
    this.close()
  }
}

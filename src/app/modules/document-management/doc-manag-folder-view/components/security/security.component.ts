import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { ChangeTrazaService } from '../../services/change-traza/change-traza.service';
import { ParamsService } from '../../services/params/params.service';
import { PermisosService } from '../../services/permisos/permisos.service';
import { ModalModifyComponent } from '../modal-modify/modal-modify.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  private as = inject(AuthorizationService)
  private dialog = inject(MatDialog);
  private restService = inject(RestService);
  private globalAppService = inject(GlobalAppService);
  private ps = inject(ParamsService);
  private auth = inject(AuthHeaderService);
  private dialogRef: MatDialogRef<ModalModifyComponent, any>;
  private ms = inject(ModalService);
  private pms = inject(PermisosService);
  private toast = inject(ToastService);
  private cts$ = inject(ChangeTrazaService);

  modalOpen: boolean;

  formSecurity = new FormGroup({
    id: new FormControl(0),
    clasificacionSeguridad: new FormControl("", Validators.required),
    justificacion: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.formSecurity.get('id').setValue(this.ps.getValue());
    this.getClisficacionSeguridad();
    this.getPermisos();
  }

  openModalModify(): void {

    this.dialogRef = this.dialog.open(ModalModifyComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const valueJust = this.dialogRef.componentInstance.formTextAre.get('justificacion').value;
        this.formSecurity.get('justificacion').setValue(valueJust);
        this.onSubmit()
      }
    })

  }
  /* gestionDocumental/expedientes/get-permisos-expedientes */


  getPermisos(): void {
    this.restService.restGet('gestionDocumental/expedientes/get-permisos-expedientes', this.auth.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            this.pms.setPermisos(data.data);
          }

        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }


  getClisficacionSeguridad(): void {
    const params = {
      id: this.ps.getValue()
    }

    this.restService.restGetParams('gestionDocumental/expedientes/get-clasificacion-seguridad', params, this.auth.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            if (data.data.clasificacionSeguridad && data.data.justificacion) {
              this.formSecurity.get('clasificacionSeguridad').setValue(data.data.clasificacionSeguridad);

            }

          }

        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }

  onSubmit(): void {

    if (this.formSecurity.valid) {

      this.restService.restPost('gestionDocumental/expedientes/reclasificar-seguridad-expediente', this.formSecurity.value, this.auth.getToken()).subscribe(
        (data) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(data).then((res) => {
            this.toast.open({
              title: 'Registro exitoso'
            })

            this.cts$.setReclasificar(true);
          });
        }, (err) => {

          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        });
    }
  }

}

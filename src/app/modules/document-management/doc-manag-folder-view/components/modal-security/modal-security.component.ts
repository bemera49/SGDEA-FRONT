import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmComponent } from '@app/modules/components/modal-confirm/modal-confirm.component';
import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { ParamsDoc } from '../../model/data-doc-params';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { ModalModifyComponent } from '../modal-modify/modal-modify.component';
import { InfoDoc } from './model/info-doc';
import { SecurityBody } from './model/security';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-modal-security',
  templateUrl: './modal-security.component.html',
  styleUrls: ['./modal-security.component.css']
})
export class ModalSecurityComponent implements OnInit, OnDestroy {


  private security = inject(SecurityService);
  private dps$ = inject(DataDocParamsService);
  private dialog = inject(MatDialog)
  private dialogRef: MatDialogRef<ModalModifyComponent, any>;
  private toast = inject(ToastService);
  dataParams: ParamsDoc = null;
  private dataSubs$: Subscription[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDoc) { }


  formSecurity = new FormGroup({
    idDocumentoIncluidoPivot: new FormControl(0),
    asunto: new FormControl(''),
    nombreDocuemento: new FormControl('', Validators.required),
    clasificacionSeguridad: new FormControl('', Validators.required),
    justificacion: new FormControl('', Validators.required)
  })

  disabledInputs(): void {
    this.formSecurity.get('asunto').disable();
    this.formSecurity.get('nombreDocuemento').disable();
  }

  ngOnInit(): void {
    const subs = this.dps$.getDataDocParams().subscribe(res => {
      this.dataParams = {
        idDocumentoIncluidoPivot: res.idDocumentoIncluidoPivot
      }
      this.formSecurity.get('idDocumentoIncluidoPivot').setValue(res.idDocumentoIncluidoPivot);
    })

    this.dataSubs$.push(subs);

    this.formSecurity.get('asunto').setValue(this.data.asunto);
    this.formSecurity.get('nombreDocuemento').setValue(this.data.nombreDocumento);

    const subsSe = this.security.getClasificacionSeguridad(this.dataParams).subscribe({
      next: (res) => {
        if (res.data) {
          this.formSecurity.get('clasificacionSeguridad').setValue(res.data.clasificacionSeguridad);
          this.formSecurity.get('justificacion').setValue(res.data.justificacion);

        }

      },
      error: (err) => {
        console.log(`Erro ${err}`)
      }
    })

    this.dataSubs$.push(subsSe);

    this.disabledInputs();
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


  onConfirm(): void {
    const body: SecurityBody = {
      idDocumentoIncluidoPivot: this.dataParams.idDocumentoIncluidoPivot,
      clasificacionSeguridad: this.formSecurity.get('clasificacionSeguridad').value,
      justificacion: this.formSecurity.get('justificacion').value

    }


    this.security.postClasificacionSeguridad(body).subscribe({
      next: () => {
        this.toast.open({
          title: 'Registro exitoso'
        })
        
      },
      error: (err) => {
        console.log(`Erro ${err}`);
        this.toast.open({
          title: 'Algo salio mal :('
        })
      }

    });

  }

  onSubmit(): void {

    const refDialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: '¿Está seguro que desea incluir el documento en el expediente seleccionado?'
      }
    })

    refDialog.afterClosed().subscribe(res => {
      if (res) {
        this.onConfirm()
      } else {
        this.toast.open({
          title: 'Cancelación exitosa'
        })
      }
    })



  }

  ngOnDestroy(): void {
    this.dataSubs$.forEach(sub => {
      sub.unsubscribe();
    })
  }
}

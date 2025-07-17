import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { RestService } from '@app/services/rest.service';
import { forkJoin, Observable } from 'rxjs';
import { ToastService } from '@app/services/toast/toast.service';
import { ModalService } from '@app/services/modal/modal.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  listTipoMetadatos = []

  form: FormGroup = this.fb.group({
    tipoMetadato: [null, [Validators.required]],
    subSerie: [null],
    titulo: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
    obligatorio: [null, [Validators.required]],
    tipoDato: [null, [Validators.required]],
    conservarMetadato: [null, [Validators.required]],
    enbebido: [null, [Validators.required]],
    estado: [null, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialog: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    public restSvc: RestService,
    private toastSvc: ToastService,
    private modal: ModalService
  ) { }

  ngOnInit(): void {
    forkJoin({
      tiposMetadato: this.restSvc.get(`api/tipo_metadato`) as Observable<any>,
    }).subscribe({
      next: ({ tiposMetadato }) => {
        this.listTipoMetadatos = tiposMetadato;
        if (this.data != null) {
          this.form.patchValue({
            tipoMetadato: this.data[0].tipo_metadato_id,
            titulo: this.data[0].nombre,
            descripcion: this.data[0].descripcion,
            obligatorio: this.data[0].requerido == 1 ? true : false,
            tipoDato: this.data[0].tipo,
            conservarMetadato: this.data[0].conservar_metadato == 1 ? true : false,
            enbebido: this.data[0].embebido_documento == 1 ? true : false,
            estado: this.data[0].estado
          })
        }
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const form = {
      tipo_metadato_id: this.form.get('tipoMetadato').value,
      nombre: this.form.get('titulo').value,
      descripcion: this.form.get('descripcion').value,
      tipo: this.form.get('tipoDato').value,
      requerido: this.form.get('obligatorio').value,
      conservar_metadato: this.form.get('conservarMetadato').value,
      embebido_documento: this.form.get('enbebido').value,
      estado: this.form.get('estado').value,
      etiqueta: ''
    }
    this.modal.openAction('', `¿Está seguro de la accion a realizar?`, () => {
      if (this.data == null) {
        // crear
        this.restSvc.post(`api/metadatoTrdSerie`, form).subscribe({
          next: (data) => {
            this.matDialog.close();
            this.toastSvc.open({
              description: 'Metadato creado correctamente',
            })
          },
          error: (error) => {
            console.log(error.error);

            this.toastSvc.open({
              description: error.error.error,
            })
          }
        })
      } else {
        // editar
        this.restSvc.put(`api/metadatoTrdSerie`, this.data[0].id, form).subscribe({
          next: (data) => {
            this.matDialog.close();
            this.toastSvc.open({
              description: 'Metadato editado correctamente',
            })
          },
          error: (error) => {
            this.toastSvc.open({
              description: error.error[0],
            })
            console.log(error);
          }
        })
      }
    })

  }

}

import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';


/**
 * @description Importacion de servicios
 */
import { ToastService } from "src/app/services/toast/toast.service";
import { TiposDocumentalesService } from 'src/app/services/gestion documental/tipos_documentales.service'
import { error } from 'console';


@Component({
  selector: 'app-add-update-type-document',
  templateUrl: './add-update-type-document.component.html',
  styleUrls: ['./add-update-type-document.component.css']
})
export class AddUpdateTypeDocumentComponent implements OnInit {
  public disableFields: boolean = false;
  public config: any;


  public typeDocumentalForm = new FormGroup({
    idGdTrdTipoDocumental: new FormControl('',),
    codigo_documento_calidad: new FormControl('', [Validators.maxLength(12), Validators.required]),
    nombreTipoDocumental: new FormControl('', [Validators.maxLength(255), Validators.required]),
    nombre_corto: new FormControl('', [Validators.maxLength(255), Validators.required]),
    clasificacion_seguridad: new FormControl('', [Validators.maxLength(50), Validators.required]),
    estadoTipoDocumental: new FormControl('', [Validators.maxLength(50), Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddUpdateTypeDocumentComponent>,
    @Inject(ToastService) private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tiposDocumentalesService: TiposDocumentalesService
  ) {
    this.config = data;
  }

  ngOnInit(): void {
    console.log('this.config',this.config)
    if (this.config.action === 'editar') {

      this.typeDocumentalForm.get('idGdTrdTipoDocumental')?.setValue(this.config.data['idGdTrdTipoDocumental']);
      this.typeDocumentalForm.get('codigo_documento_calidad')?.setValue(this.config.data['codigo_documento_calidad']);
      this.typeDocumentalForm.get('nombreTipoDocumental')?.setValue(this.config.data['nombreTipoDocumental']);
      this.typeDocumentalForm.get('nombre_corto')?.setValue(this.config.data['nombre_corto']);
      this.typeDocumentalForm.get('clasificacion_seguridad')?.setValue(this.config.data['clasificacion_seguridad']);
      this.typeDocumentalForm.get('estadoTipoDocumental')?.setValue(this.config.data['estadoTipoDocumental']);

      //Validar el estado de la subserie para asignar
      if (this.config.data['estadoTipoDocumental'] == 'Activo') {
        this.typeDocumentalForm.get('estadoTipoDocumental')?.setValue('10');
      } else {
        this.typeDocumentalForm.get('estadoTipoDocumental')?.setValue('0');
      }
    }
  }

  addTipoDocumental() {
    let formulario = {
      codigo_documento_calidad: parseInt(this.typeDocumentalForm.get('codigo_documento_calidad').value),
      nombreTipoDocumental: this.typeDocumentalForm.get('nombreTipoDocumental').value,
      nombre_corto: this.typeDocumentalForm.get('nombre_corto').value,
      clasificacion_seguridad: this.typeDocumentalForm.get('clasificacion_seguridad').value,
      estadoTipoDocumental: parseInt(this.typeDocumentalForm.get('estadoTipoDocumental').value)
    }

    this.tiposDocumentalesService.addTipoDocumental(formulario)
      .pipe(catchError((error) => {
        console.error('Error addTipoDocumental:', error);
        throw new Error(error);
      }))
      .subscribe(res => {
        this.toast.open({
          description: 'Se ha creado un nuevo tipo documental'
        });
        this.onClose();
      })
  }

  updateTipoDocumental() {
    this.tiposDocumentalesService.addTipoDocumental(this.typeDocumentalForm.value)
      .pipe(catchError((error) => {
        console.error('Error addTipoDocumental:', error);
        throw new Error(error);
      }))
      .subscribe(res => {
        this.toast.open({
          description: 'Actualización exitosa'
        });
        this.onClose();
      })
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

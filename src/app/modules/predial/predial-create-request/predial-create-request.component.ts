import { Component,  OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '@app/services/rest.service';
import { DatePipe } from '@angular/common';
import { PredialService } from '../services/predial.service';

@Component({
  selector: 'app-predial-create-request',
  templateUrl: './predial-create-request.component.html',
  styleUrls: ['./predial-create-request.component.css'],
  providers: [DatePipe]
})
export class PredialCreateRequestComponent implements OnInit {

  
  solicitudFormGroup: FormGroup;
  userData = this.restService.getUserData();
  fechaActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm');

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private datePipe: DatePipe,
    private predialService: PredialService
  ) {}

  ngOnInit(): void {
    this.solicitudFormGroup = this.fb.group({
      radicado: [{ value: 123456789, disabled: true }],
      fechaSolicitud: [{ value: this.fechaActual, disabled: true }],
      estado: [{ value: 'Verificación', disabled: true }],
      solicitante: [{ value: this.userData.nombre, disabled: true }],
      detalle: ['', [Validators.maxLength(150), Validators.required]],
      anexos_fisicos: this.fb.array([this.crearAnexo()])  // Empieza con un anexo obligatorio
    });
  }

  // Getter para acceder al FormArray de anexos_fisicos
  get anexos_fisicos(): FormArray {
    return this.solicitudFormGroup.get('anexos_fisicos') as FormArray;
  }

  // Función para crear un nuevo anexo
  crearAnexo(): FormGroup {
    return this.fb.group({
      titulo_anexo: ['', [Validators.required, Validators.maxLength(20)]],
      folios: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  // Función para agregar un nuevo anexo
  agregarAnexo() {
    this.anexos_fisicos.push(this.crearAnexo());
  }

  // Función para eliminar un anexo
  eliminarAnexo(i: number) {
    if (this.anexos_fisicos.length > 1) {  // Verificamos que quede al menos un anexo
      this.anexos_fisicos.removeAt(i);
    }
  }

  // Validar si el botón de Guardar debe estar habilitado
  esFormularioValido(): boolean {
    return this.solicitudFormGroup.valid && this.anexos_fisicos.length > 0;
  }

  onSubmit() {
    if (this.solicitudFormGroup.valid) {
      this.solicitudFormGroup.removeControl("fechaSolicitud");
      this.predialService.postCreateRequest(this.solicitudFormGroup.getRawValue()).subscribe( 
        {
          next: (resp: any) => {
            console.log('success', resp)
          },
          error: (error: any) => {
            console.log('err', error)
          }
        }
      );
    }
  }

  cancel() {
    
  }

}

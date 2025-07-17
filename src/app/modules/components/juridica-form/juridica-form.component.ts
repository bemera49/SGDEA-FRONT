import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-juridica-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './juridica-form.component.html',
  styleUrls: ['./juridica-form.component.css']
})
export class JuridicaFormComponent implements OnInit {

  @Input() disableForm = false

  form = this.fb.group({
    radicado: ['94783', [Validators.required]],
    fecha: [new Date(), [Validators.required]],
    tipo: ['tipo juridica', [Validators.required]],
    profesional: ['Arturo Vidal', [Validators.required]],
    fecha_asignacion: [new Date(), [Validators.required]],
    estado: ['Aprobada', [Validators.required]],
    fecha_creacion: [new Date(), [Validators.required]],
    status_aviso: ['Solicitud creada', [Validators.required]],
    hora_creacion: ['9:19 AM', [Validators.required]],
    fecha_inicio_deseado: [new Date(), [Validators.required]],
    fecha_fin_deseado: [new Date(), [Validators.required]],
    circunstancias: ['Se solicita elaboración de concepto jurídico según soportes anexos.', [Validators.required]],
    funcionarios: ['Pedro Pérez', [Validators.required]],
    descripcion: ['Se solicita elaboración de concepto jurídico.', [Validators.required]],
    numero_aviso: ['J003', [Validators.required]],
    clase_aviso: ['J2', [Validators.required]],
    autor_aviso: ['Pablo Casas', [Validators.required]],
    no_orden: ['575756', [Validators.required]],
    memorando_interno: ['Se retiene el papel', [Validators.required]],
    soportes: [null, [Validators.required]],
    observaciones: ['Inserte', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.disableForm)
      this.form.disable();
  }

  submitFormReceive() {

  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab-request',
  templateUrl: './tab-request.component.html',
  styleUrls: ['./tab-request.component.css']
})
export class TabRequestComponent {

  SolicitudFormGroup = new FormGroup({
    radicado: new FormControl(''),
    solicitante: new FormControl(''),
    tipoSolicitud: new FormControl('', Validators.required),
    fechaSolicitud: new FormControl(''),
    proceso: new FormControl(''),
    estadoSolicitud: new FormControl(''),
    documentoModificar: new FormControl(''),
    tipoDocumental: new FormControl(''),
    cargo: new FormControl(''),
    privacidad: new FormControl('', Validators.required),
    centroCostos: new FormControl(''),
    gerencia: new FormControl(''),
    direccionDivisionOficina: new FormControl(''),
    justificacion: new FormControl('', Validators.required),
    solicitudAplica: new FormControl('', Validators.required),
    documentoPropuesto: new FormControl('', Validators.required),
    diagramaUrl: new FormControl(''),
  })

  dataInformation = []

}

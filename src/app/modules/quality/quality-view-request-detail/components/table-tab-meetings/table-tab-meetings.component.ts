import { Component } from '@angular/core';
import { MeetingSheets } from './meeting-sheets';

@Component({
  selector: 'app-table-tab-meetings',
  templateUrl: './table-tab-meetings.component.html',
  styleUrls: ['./table-tab-meetings.component.css']
})



export class TableTabMeetingsComponent {

  headers = [
    {
      header: '+',
      key: 'action',
      action: true
    },
    {
      header: 'Area Involucrada',
      key: 'AreaInvolucrada'
    },
    {
      header: 'Código',
      key: 'Codigo'
    },
    {
      header: 'Documentos relación',
      key: 'DocumentosRelacionados'
    },
    {
      header: 'Enviar Correo',
      key: 'Correo'
    },
    {
      header: 'Fecha propuesta',
      key: 'FechaPropuesta'
    },
    {
      header: 'Ayuda de memoria',
      key: 'AyudaDeMemoria'
    }
  ];


  displayedColumns: string[] = ['Action', 'AreaInvolucrada', 'Codigo', 'DocumentosRelacionados',
    'Correo', 'FechaPropuesta', 'AyudaDeMemoria'];

  dataSource: MeetingSheets[] = [
    {
      AreaInvolucrada: 'ABCF',
      DocumentosRelacionados: 'Procedimiento XX',
      Correo: 'Usuario@acuaducto.com',
      FechaPropuesta: '24/11/2023',
      AyudaDeMemoria: 'Lorem',
      Codigo: 'MPF64430'
    },
    {
      AreaInvolucrada: 'ABCF',
      DocumentosRelacionados: 'Procedimiento XX',
      Correo: 'Usuario@acuaducto.com',
      FechaPropuesta: '24/11/2023',
      AyudaDeMemoria: 'Lorem',
      Codigo: 'MPF64430'
    },
  ]

  meetingForm = {
    AreInvolucrada: '',
    Codigo: '',
    DocumentosRelacionados: '',
    Correo: '',
    FAPropuesta: '',
    AyudaDeMoria: '',
    Observaciones: '',
  }
  /*   meetingForm = new FormGroup({
      AreInvolucrada: new FormControl('', Validators.required),
      Codigo: new FormControl('', Validators.required),
      DocumentosRelacionados: new FormControl('', Validators.required),
      Correo: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      FAPropuesta: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
      AyudaDeMoria: new FormControl(''),
      Observaciones: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    }) */


  inputsMeeting: MeetingSheets[] = [];

  onAddTask(): void {

    this.inputsMeeting.push({
      AreaInvolucrada: '',
      AyudaDeMemoria: '',
      Codigo: '',
      Correo: '',
      DocumentosRelacionados: '',
      FechaPropuesta: ''
    })
  }



}

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vacaciones-modal',
  templateUrl: './vacaciones-modal.component.html',
  styleUrls: ['./vacaciones-modal.component.css']
})
export class VacacionesModalComponent implements OnInit {

  rolFuncionario: string;
  funcionarioSale: string;
  funcionarioReemplazo: string;
  fechaInicial: Date;
  fechaFinal: Date;

  dataClasificacionRelatoria
  
  constructor() { }

  ngOnInit(): void {
  }

}

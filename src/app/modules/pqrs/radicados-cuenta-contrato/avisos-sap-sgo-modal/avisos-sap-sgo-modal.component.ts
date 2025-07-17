import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-avisos-sap-sgo-modal',
  templateUrl: './avisos-sap-sgo-modal.component.html',
  styleUrls: ['./avisos-sap-sgo-modal.component.css']
})
export class AvisosSapSgoModalComponent implements OnInit {
  aviso: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.aviso = data.aviso;
  }

  ngOnInit(): void {

  }

  descargarPDF(): void {
    // Lógica para descargar PDF
  }
}
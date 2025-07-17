import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { catchError, Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ParamsInfoDoc } from '../modal-doc-info/model/info';
import { Trazabilidad } from './model/trazabilidad';
import { InfoService } from './servicis/info/info.service';

@Component({
  selector: 'app-modal-trasbilidad-doc',
  templateUrl: './modal-trasbilidad-doc.component.html',
  styleUrls: ['./modal-trasbilidad-doc.component.css']
})
export class ModalTrasbilidadDocComponent implements OnInit, OnDestroy {

  private ins = inject(InfoService);
  private traza$: Subscription = null;
  dataRowsHistorico: Trazabilidad[] = [];
  minHistorico = 5;
  statusSeeMoreHistory = true;
  numberLimitHistory = 0;
  statusSeeHistory: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ParamsInfoDoc) { }



  ngOnInit(): void {
    this.traza$ = this.ins.getTrazabilidad(this.data).subscribe({
      next: (res) => {
        this.dataRowsHistorico = res.data;
        if (this.dataRowsHistorico.length > this.minHistorico) {
          this.statusSeeMoreHistory = this.dataRowsHistorico.length > 0;
          this.numberLimitHistory = this.dataRowsHistorico.length;
        }
      },
      error: (err) => {

      }
    })
  }


  seeMoreAndLess(status, module) {
    if (status) {
      // Valida modulo
      switch (module) {
        case "History":
          this.numberLimitHistory = this.dataRowsHistorico.length;
          break;
      }
    } else {
      // Valida modulo
      switch (module) {
        case "History":
          this.numberLimitHistory = this.minHistorico;
          break;
      }
    }
    // Asigna el valor contrario
    switch (module) {
      case "History":
        this.statusSeeHistory = !this.statusSeeHistory;
        break;
    }
  }

  // Convertir datos a formato CSV
  private convertToCSV(objArray: any[]): string {
    const header = ['usuario', 'dependencia', 'operacion', 'observacion', 'fecha'];
    const rows = objArray.map(item => [
      item.usuario,
      item.dependencia,
      item.operacion,
      item.observacion,
      item.fecha,

    ]);

    let csv = header.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });

    return csv;
  }

  // Guardar archivo Excel
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const EXCEL_EXTENSION = '.xlsx';
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = fileName + EXCEL_EXTENSION;
    link.click();
  }

  exportCVS(): void {
    const csvData = this.convertToCSV(this.dataRowsHistorico);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = 'trasaviliadadExpediente.csv';
    link.click();

  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataRowsHistorico);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'trasaviliadadExpediente');
  }

  exportPDF(): void {
    
    const dataTrazabilidad = {
      id: this.data.idDocumentoIncluido
    };

    this.ins.getPdf(dataTrazabilidad).pipe(
      catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error); // Propaga el error
      })
    ).subscribe(res => {
      console.log('pdf', res)
      const base64String = res.data;
      const blob = this.b64toBlob(base64String);
      const nombreArchivo = 'trasabilidad.pdf';
      saveAs(blob, nombreArchivo);
    })

  }

  imprimirPDF(): void {
    const dataTrazabilidad = {
      id: this.data.idDocumentoIncluido
    };

    this.ins.getPdf(dataTrazabilidad).pipe(
      catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error); // Propaga el error
      })
    ).subscribe(res => {

      // Decodificar el base64 para formar un Blob de tipo PDF
      const byteCharacters = atob(res.data);
      const byteNumbers = new Array(byteCharacters.length);


      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Crear un iframe oculto y asignar la URL del blob como su src
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;

      // Agregar el iframe al DOM
      document.body.appendChild(iframe);

      // Esperar a que el iframe cargue y luego activar la impresión
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          // Limpiar después de imprimir
          /* document.body.removeChild(iframe);
          window.URL.revokeObjectURL(url); */
        }, 2000); // Aumentar el tiempo de espera a 2 segundos
      };

    })
  }


  b64toBlob(b64Data: string, contentType = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  ngOnDestroy(): void {
    this.traza$?.unsubscribe();
  }

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-doc-manag-upload-trd-errors',
  templateUrl: './doc-manag-upload-trd-errors.component.html',
  styleUrls: ['./doc-manag-upload-trd-errors.component.css']
})
export class DocManagUploadTrdErrorsComponent implements OnInit {

  displayedColumns: string[] = ['Número de Linea', 'Contenido de la Celda', 'Columna', 'Error', 'Sugerencia'];
  dataSource = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = data;
  }
  ngOnInit(): void {
  }
  /**
    * @description Metodo para formatear la data this.getDataTable() para luego exportar a excel.
    */
  downloadFileExcel(): void {
    const dataTable = [];
    const data = this.dataSource;

    for (let i = 0; i < this.dataSource.length; i++) {
      const item = {
        "Número de Linea ": data[i].fila,
        "Hoja": data[i].hoja,
        "Oficina":data[i].oficina,
        "Error": data[i].error,
        "Sugerencia": data[i].verifique,
      };
      dataTable.push(item);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const fileName = `Novedades_Identificadas_${formattedDate}.xlsx`;

    // Escribir el archivo con el nombre que incluye la fecha actual
    XLSX.writeFile(wb, fileName);
  }

    /**
  * @description Metodo para formatear la fecha en YYYY-MM-DD HH:MM:SS
  * @param dateString
  */
  formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

}

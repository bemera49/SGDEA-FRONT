/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
/**
 * @description Modelos juridica
 */
import { Anexos } from '../../../../../services/juridical/models/detail-element'
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface FileElement {
  name: string;
  file?: any;
}

const ELEMENT_DATA: FileElement[] = [

];

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {

  @Input() attachmentsDetail: Anexos;
  @Output() attachmentsModify = new EventEmitter<{ nombreArchivo: string, dataArchivoBase64: string }>();
  @Input() uploadFile: boolean = false;
  allAttachment: { nomArchivo: string, dataArchivoBase64: string }[] = [];

  displayedColumns: string[] = ['select', 'name', 'ver'];
  dataSource = new MatTableDataSource<FileElement>(ELEMENT_DATA);
  selection = new SelectionModel<FileElement>(true, []);
  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachmentsDetail'] && changes['attachmentsDetail'].currentValue) {
      this.allAttachment = changes['attachmentsDetail'].currentValue

      console.log('Lista de docuemnto en attach components', this.allAttachment)
    }
  }

  downloadPdf(nombreArchivo: string, base64Data: string): void {
    const blob = this.base64ToBlob(base64Data, 'application/pdf');
    saveAs(blob, nombreArchivo);
  }

  base64ToBlob(base64: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }




  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FileElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  archivoSeleccionado: { name: string, file: any, controlName: string, nombreArchivo: string }[] = [];
  async onFileChange(event: any, controlName: string) {
    // Que solo acepte imagenes jpg, png o jpeg
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const extension = file.name.split('.')[file.name.split('.').length - 1];
      // Que no pese mas de 5MB
      if (file.size <= 5000000) {
        if (controlName === 'file') {
          // Que reciba word, excel o pdf
          if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'jpeg' || extension.toLowerCase() == 'doc' || extension.toLowerCase() == 'docx' || extension.toLowerCase() == 'xls' || extension.toLowerCase() == 'xlsx' || extension.toLowerCase() == 'pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.archivoSeleccionado.push({
                name: file.name,
                file: event.target.files[0],
                controlName: controlName,
                nombreArchivo: file.name || '',
              });

              // Validamos que no se repita el controlName
              let contador = 0;
              for (let i = 0; i < this.archivoSeleccionado.length; i++) {
                if (this.archivoSeleccionado[i].controlName === controlName) {
                  contador++;
                }
              }
              if (contador > 1) {
                // Validamos si en la lista de archivos seleccionados hay un archivo con el mismo nombre
                if (this.archivoSeleccionado.filter((archivo) => archivo.nombreArchivo === file.name).length > 1) {
                  this.archivoSeleccionado.splice(this.archivoSeleccionado.length - 1, 1);

                  const Swal = require('sweetalert2');
                  Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'El archivo ya ha sido seleccionado',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                  });
                }
              }
              this.dataSource.data = this.archivoSeleccionado.map((archivo) => {
                return { name: archivo.nombreArchivo, file: archivo.file };
              });

              this.attachmentsModify.emit({ nombreArchivo: file.name, dataArchivoBase64: reader.result as string });
            };
          } else {
            const Swal = require('sweetalert2');
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Solo se permiten archivos con extensión jpg, jpeg, doc, docx, xls, xlsx o pdf',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
            });
          }
        }
      } else {
        const Swal = require('sweetalert2');
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El archivo no debe pesar más de 5MB',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
      }
    }
  }

  url: SafeResourceUrl | undefined;
  async openFile(event: any) {
    const reader = new FileReader();

    const readFileAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    };

    try {
      const result = await readFileAsDataURL(event.file);
      const fileExtension = event.name.split('.').pop().toLowerCase();

      // if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      //   this.url = this.sanitizer.bypassSecurityTrustResourceUrl(result as string);
      //   const win = window.open('', '_blank');
      //   win.document.write(`<img src="${this.url}" style="width: 100%; height: 100%;" />`);
      // } else 
      if (fileExtension === 'pdf') {
        const win = window.open('', '_blank');
        win.document.write(`<embed src="${result}" width="100%" height="100%" />`);
      }
      else if (['doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
        const fileBlob = new Blob([event.file], { type: event.file.type });
        const fileUrl = URL.createObjectURL(fileBlob);

        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = event.file.name;  // El nombre del archivo para la descarga
        document.body.appendChild(link);
        link.click();

        // Limpiar el DOM
        document.body.removeChild(link);
        URL.revokeObjectURL(fileUrl); // Liberar memoria
        // if (fileExtension === 'doc' || fileExtension === 'docx') {

        //   this.url = this.sanitizer.bypassSecurityTrustResourceUrl(result as string);
        //   const win = window.open('', '_blank');
        //   win.document.write(`<embed src="${this.url}" width="100%" height="100%" />`);


        // } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        //   const reader = new FileReader();
        //   reader.readAsArrayBuffer(event.file);
        //   reader.onload = () => {
        //     const data = new Uint8Array(reader.result as ArrayBuffer);
        //     const workbook = XLSX.read(data, { type: 'array' });
        //     const sheetName = workbook.SheetNames[0];
        //     const sheet = workbook.Sheets[sheetName];
        //     const html = XLSX.utils.sheet_to_html(sheet);
        //     win.document.write(html);

        //   };


        // }
      }
      else {
        const win = window.open('', '_blank');
        win.document.write(`<p>Tipo de archivo no soportado para vista previa.</p>`);
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }
}

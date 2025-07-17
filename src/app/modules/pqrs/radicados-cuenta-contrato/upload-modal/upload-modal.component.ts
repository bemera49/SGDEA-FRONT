import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFile: File | null = null;

  constructor(private dialogRef: MatDialogRef<UploadModalComponent>) { }

  ngOnInit(): void { }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    if (this.uploadedFile) {
      return;
    }
    if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
      alert('Solo se permiten archivos Excel');
      return;
    }
    this.uploadedFile = file;
    this.readExcelFile(file);
  }

  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.processExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  processExcelData(data: any[]): void {
    const headerRow = data[0];
    const colIndex = headerRow.indexOf('numeroCuentaContratos');
    if (colIndex === -1) {
      alert('La columna numeroCuentaContratos no se encuentra en el archivo.');
      this.removeFile();
      return;
    }
    const values = data.slice(1).map(row => row[colIndex]);
    this.dialogRef.close(values); // Emitimos los valores y cerramos el diálogo
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';
  }
}

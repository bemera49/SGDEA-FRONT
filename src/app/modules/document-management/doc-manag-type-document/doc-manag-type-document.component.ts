import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { catchError, } from 'rxjs/operators';

/**
 * @description Importacion de servicios
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { TiposDocumentalesService } from 'src/app/services/gestion documental/tipos_documentales.service'
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";

/**
 * @description Componentes
 */
import { AddUpdateTypeDocumentComponent } from './add-update-type-document/add-update-type-document.component';

/**
 * @description Modelos 
 */
import { filtrosTiposDocumentales } from '../../../services/gestion documental/models/tipos_documentales';

@Component({
  selector: 'app-doc-manag-type-document',
  templateUrl: './doc-manag-type-document.component.html',
  styleUrls: ['./doc-manag-type-document.component.css']
})
export class DocManagTypeDocumentComponent implements OnInit {

  public filterTiposDocumentales = new FormGroup({
    codigo_documento_calidad: new FormControl(''),
    nombreTipoDocumental: new FormControl(''),
    estadoTipoDocumental: new FormControl(),
  });

  public dataFilter: filtrosTiposDocumentales;
  public estados: any[] = [{ label: 'Activo', value: 10 }, { label: 'Inactivo', value: 0 }];

  //variables tabla
  registrosTiposDocumentales: any[] = [];
  selectedIndex: number | null = null;
  selectedItem: any = null;
  selectedItemBoolean: Boolean = false;
  public idGdTrdTipoDocumental: number

  constructor(
    private dialog: MatDialog,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    private tiposDocumentalesService: TiposDocumentalesService
  ) { }

  ngOnInit(): void {
    this.getTypeDocumental();
  }

  getTypeDocumental() {
    this.tiposDocumentalesService.getTiposDocumentalesByFilters().subscribe({
      next: (res) => {
        this.registrosTiposDocumentales = res['data'];
      },
      error: (error) => {
        console.log('error getTypeDocumentalByFilters: ', error);
      }
    });
  }

  getTypeDocumentalByFilters() {
    const estadoTipoDocumentalValue = this.filterTiposDocumentales.get('estadoTipoDocumental')?.value;

    this.dataFilter = {
      codigo_documento_calidad: this.filterTiposDocumentales.get('codigo_documento_calidad').value,
      nombreTipoDocumental: this.filterTiposDocumentales.get('nombreTipoDocumental').value,
      estadoTipoDocumental: estadoTipoDocumentalValue !== undefined && !isNaN(estadoTipoDocumentalValue) ? estadoTipoDocumentalValue : null
    };

    this.tiposDocumentalesService.getTiposDocumentalesByFilters(this.dataFilter).subscribe({
      next: (res) => {
        this.registrosTiposDocumentales = res['data'];
        this.selectedIndex = null;
        this.selectedItem = null;
        this.selectedItemBoolean = false;
      },
      error: (error) => {
        console.log('error getTypeDocumentalByFilters: ', error);
      }
    });
  }

  selectItem(item: any, index: number): void {
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
      this.selectedItem = null;
      this.selectedItemBoolean = false;
    } else {
      this.selectedIndex = index;
      this.selectedItem = item;
      this.selectedItemBoolean = true;
      this.idGdTrdTipoDocumental = item.idGdTrdTipoDocumental;
    }
  }

  openDialogCrearTypeDocumental() {
    let config = {
      action: 'create'
    };
    const dialogRef = this.dialog.open(AddUpdateTypeDocumentComponent, {
      data: config,
      width: '1200px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getTypeDocumental();
    });
  }

  openDialogEditar() {
    let config = {
      metadatos: true,
      action: 'editar',
      data: this.selectedItem
    };
    const dialogRef = this.dialog.open(AddUpdateTypeDocumentComponent, {
      data: config,
      width: '1200px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getTypeDocumental();
    });
  }

  actionDeleteRegistro(): void {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: '¿Está seguro que desea eliminar tipo documental, recuerde que solamente se podrán tipo documental que no tengan expedientes asociados?',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteTypeDocumental();
      }
    });
  }

  deleteTypeDocumental() {
    this.tiposDocumentalesService.deleteTipoDocumental(this.idGdTrdTipoDocumental).subscribe({
      next: (res) => {
        this.getTypeDocumental();
        this.toast.open({
          description: 'Eliminación exitosa'
        });
      }, error: (errr) => {
        console.log('errr', errr)
        if (errr.error.errors == 400) {
          this.toast.open({
            description: 'Contiene expedientes, no se puede eliminar'
          });
        }
      }
    })
  }

  exportExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.registrosTiposDocumentales);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'tiposDocumentales');
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

  // Método para exportar a CSV
  exportCVS() {
    const csvData = this.convertToCSV(this.registrosTiposDocumentales);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = 'tiposDocumentales.csv';
    link.click();
  }

  // Convertir datos a formato CSV
  private convertToCSV(objArray: any[]): string {
    const header = ['#', 'Nombre del tipo documental', 'Nombre corto', 'Código documento de calidad', 'Estado'];
    const rows = objArray.map(item => [
      item.consecutivo,
      item.nombreTipoDocumental,
      item.nombre_corto,
      item.codigo_documento_calidad,
      item.estadoTipoDocumental,
    ]);
    let csv = header.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    return csv;
  }

  exportPDF() {
    const dataTiposDocumentales = {
      dataTiposDocumentales: this.registrosTiposDocumentales
    };

    this.tiposDocumentalesService.generatePDFTypeDocumental(dataTiposDocumentales)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los metadatos:', error);
          throw new Error(error); // Propaga el error
        })
      )
      .subscribe(res => {
        let response;
        try {
          response = JSON.parse(res); // Parsea la respuesta a un objeto JSON
        } catch (e) {
          console.error('Error al parsear la respuesta del servidor:', e);
          return;
        }

        if (response && response.status === 'success' && response.data) {
          const base64String = response.data;
          const blob = this.b64toBlob(base64String);
          const nombreArchivo = 'tiposDocumentales.pdf';
          saveAs(blob, nombreArchivo);
        } else {
          console.error('Error en la respuesta del servidor o data no disponible');
        }
      });
  }

  imprimirPDF() {
    const dataTiposDocumentales = {
      dataTiposDocumentales: this.registrosTiposDocumentales
    };

    this.tiposDocumentalesService.generatePDFTypeDocumental(dataTiposDocumentales)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los metadatos:', error);
          throw new Error(error);
        })
      )
      .subscribe(res => {
        let response;
        try {
          response = JSON.parse(res);
        } catch (e) {
          console.error('Error al parsear la respuesta del servidor:', e);
          return;
        }

        if (response && response.status === 'success' && response.data) {
          const base64String = response.data;

          // Decodificar el base64 para formar un Blob de tipo PDF
          const byteCharacters = atob(base64String);
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
              document.body.removeChild(iframe);
              window.URL.revokeObjectURL(url);
            }, 2000); // Aumentar el tiempo de espera a 2 segundos
          };

          // Abrir en una nueva pestaña como alternativa
          const newTab = window.open(url, '_blank');
          if (newTab) {
            newTab.focus();
            newTab.print();
          } else {
            console.error('No se pudo abrir una nueva pestaña. Verifica los permisos del navegador.');
          }
        } else {
          console.error('Error en la respuesta del servidor o data no disponible');
        }
      });
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

}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
export interface MessageError {
  status: boolean
  num: string;
  message: string;
}

@Injectable({

  providedIn: 'root'
})

export class ValidateFileService {

  private countMB = 20 * 1024 * 1024;
  private allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];



  constructor() { }


  validateFileMB(file: File): MessageError {
    return {
      status: file.size < this.countMB,
      message: 'El archivo seleccionado cuenta con un tamaño no permitido',
      num: '052'
    };
  }

  validateFileTypes(file: File): MessageError {
    return {
      status: this.allowedTypes.includes(file.type),
      message: 'Por favor verifique del archivo o documento a cargar . <.docx, .xlsx, .pptx>',
      num: '035'
    }
  }


  validateFileTypesDiagram(file: File): MessageError {
    return {
      status: file.type === 'application/vnd.ms-visio.viewer',
      message: 'Por favor verifique del archivo o documento a cargar . <.vsdx>',
      num: '035'
    }
  }

  validateFileTypePdf(file: File): MessageError {
  console.log(file.type === 'application/pdf','type');
    return {
      status: file.type == 'application/pdf',
      message: 'Por favor verifique el formato del archivo o documento a cargar. El formato permitido es PDF.',
      num: '035'
    }
  }



  async validateCorrupt(file: File): Promise<MessageError> {
    return new Promise<MessageError>((resolve, reject) => {
      const result: MessageError = {
        status: false,
        num: '',
        message: ''
      };

      if (!file) {
        result.message = 'Por favor, seleccione un archivo.';
        reject(result);
        return;
      }

      const extension = file.name.split('.').pop()?.toLowerCase();
      console.log(extension,'exte');
      let expectedStructure = '';
      switch (extension) {
        case 'docx':
          expectedStructure = 'word/document.xml';
          break;
        case 'xlsx':
          expectedStructure = 'xl/workbook.xml';
          break;
        case 'pptx':
          expectedStructure = 'ppt/presentation.xml';
          break;
        case 'vsdx':
          expectedStructure = 'visio/document.xml';
          break;
        case 'pdf':
          result.status = false;
          result.message = 'El archivo PDF es válido.';
          resolve(result);
          break;
        default:
          result.message = 'Por favor, seleccione un archivo <.docx, .xlsx , .pptx o . vsdx>';
          result.num = '035'
          result.status = true;
          reject(result);
          return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result as ArrayBuffer;

        JSZip.loadAsync(arrayBuffer).then((zip) => {
          if (zip.files[expectedStructure]) {
            result.status = false;
            resolve(result);
          }
        }).catch((error) => {

          const validateMb = this.validateFileMB(file);

          if (!validateMb.status) {
            result.status = !validateMb.status;
            result.num = validateMb.num;
            result.message = validateMb.message;
          } else {
            result.status = true;
            result.num = '060'
            result.message = `Archivo invalido por favor verifique los datos.`;
          }

          reject(result);
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }



}

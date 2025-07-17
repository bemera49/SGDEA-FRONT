import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { DocumentAdditional } from '../../model/view-reques-detail';
import { UpdateDataService } from '../save-documents/services/updata-data/update-data.service';
import { MultipleFile } from './interface/multiple.file';



@Component({
  selector: 'app-table-da',
  templateUrl: './table-da.component.html',
  styleUrls: ['./table-da.component.css']
})
export class TableDAComponent implements OnChanges {

  private ud = inject(UpdateDataService);

  headers = [
    {
      name: '+',
      key: '',
      action: true,
    },

    {

      name: 'Documento adicional',
      key: 'DocumentoAdicional',
    },
    {
      name: 'Tipo  documento',
      key: 'TipoDocumento',
    },
    {
      name: 'Tipo  Solicitud',
      key: 'TipoSolicitud',
    },
    {
      name: 'Justificación',
      key: 'Justificacion',
    },
    {
      name: 'Anexo',
      key: 'Anexo',
    },
  ]


  @Input() dataTable!: DocumentAdditional[];

  multipleFile: MultipleFile[] = [];
  files: File[] = [];
  fileDoc: File | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const dataFiles = this.dataTable.map(file => {
      return {
        document_id: file.id,
        file_id: file.document_file.id,
        proposed_document: null
      }
    })

    this.multipleFile = dataFiles;
  }


  parseFormData(): FormData {
    const formData = new FormData();

    this.multipleFile.forEach((documents, index) => {
      Object.entries(documents).forEach(([propiedad, val]) => {
        formData.append(`multiple_file[${index}][${propiedad}]`, val as string | Blob);
      })
    })


    return formData;
  }

  onSubmit(): void {

    console.log('multiple', this.multipleFile);
    const parseData = this.parseFormData();
    console.log('parseData', parseData);
    this.ud.updateAdditionalDocuments(parseData).subscribe({
      next: (res) => {
        if (res.status) {
          console.log('exito');
        }
      }
    })
  }

}

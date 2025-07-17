import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentaryType, RequestType } from '@app/modules/quality/quality-create-request/model/automatic-data';
import { MultipleFile } from '@app/modules/quality/quality-create-request/model/create-request';
import { RequestCreateService } from '@app/modules/quality/quality-create-request/services/request-create.service';
import { DocumentAdditional } from '../../model/view-reques-detail';

@Component({
  selector: 'app-container-form-table',
  templateUrl: './container-form-table.component.html',
  styleUrls: ['./container-form-table.component.css']
})
export class ContainerFormTableComponent implements OnInit, OnChanges {

  private fb = inject(FormBuilder);
  private rcs = inject(RequestCreateService);
  @Input() dataTable: DocumentAdditional[];

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
      name: 'Tipo  documental',
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
  requestType: RequestType[] = [];
  documentaryType: DocumentaryType[] = [];
  multipleFileForm = new FormGroup({
    request_id: new FormControl(),
    multiple_file: this.fb.array(
      [this.fb.group({
        name: ['', Validators.required],
        documentary_type: ['', Validators.required],
        request_type: ['', Validators.required],
        justification: ['', Validators.required],
        proposed_document: [null, Validators.required]
      })
      ])
  });


  ngOnChanges(changes: SimpleChanges): void {

    this.loadDataTable();

  }

  ngOnInit(): void {
    this.rcs.getAutomaticData().subscribe(res => {
      this.requestType = res.data.request_type;
      this.documentaryType = res.data.documentary_type.filter(item => item.id !== 2)
    })
  }

  adaptData(): void {
    const newData = this.dataTable.map(response => {
      const data: MultipleFile = {
        name: response.document_file.name,
        documentary_type: 0,
        justification: '',
        request_type: 0,
        proposed_document: null
      };
    })
  }

  loadDataTable(): void {

  }


  get multipleFile() {
    return this.multipleFileForm.get('multiple_file') as FormArray;
  }

  onAddItem(): void {

    const files = this.fb.group({
      name: ['', Validators.required],
      documentary_type: ['', Validators.required],
      request_type: ['', Validators.required],
      justification: ['', Validators.required],
      proposed_document: [null, Validators.required]
    });

    this.multipleFile.push(files);
  }

  onRemoveItem(index: number): void {
    this.multipleFile.removeAt(index);
  }


}

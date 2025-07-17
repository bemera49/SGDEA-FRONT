import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';
import { DocumentaryType, RequestType } from '../../model/automatic-data';
import { RequestCreateService } from '../../services/request-create.service';
import { ValidateFileService } from '../../services/validate-file.service';


@Component({
  selector: 'app-multi-files',
  templateUrl: './multi-files.component.html',
  styleUrls: ['./multi-files.component.css']
})

export class MultiFilesComponent implements OnInit {

  @Input() formGroupProps: FormGroup;
  @Output() submitEvent = new EventEmitter<void>();
  multipleFile: FormArray;
  requestType: RequestType[] = [];
  documentaryType: DocumentaryType[] = [];
  nameFile: string[] = [];
  characters = 0;
  constructor(private formBuilder: FormBuilder, private requestSc: RequestCreateService,
    private toast: ToastService, private validateSC: ValidateFileService
  ) { }

  ngOnInit() {

    this.multipleFile = this.formGroupProps.get('multiple_file') as FormArray;
    this.requestSc.getAutomaticData().subscribe(item => {
      this.requestType = item.data.request_type.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.documentaryType = item.data.documentary_type.filter(item => item.id !== 2).sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }


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



  uploadFile(event: Event, i: number): void {

    const archivo = (event.target as HTMLInputElement).files[0];



    const validateMb = this.validateSC.validateFileMB(archivo);
    const validateTypes = this.validateSC.validateFileTypes(archivo);
    this.validateSC.validateCorrupt(archivo).then(res => {

      if (res.status) {
        this.toast.open({
          title: res.num,
          description: res.message,
        })
      }

      if (!validateMb.status) {
        this.toast.open({
          title: validateMb.num,
          description: validateMb.message,
        });
      }

      if (!validateTypes.status) {
        this.toast.open({
          title: validateTypes.num,
          description: validateTypes.message,
        })
      }

      if (validateMb.status && !res.status && validateTypes.status) {
        const firsFomGroup = this.multipleFile.controls[i] as FormGroup;
        const proposedDocumentControl = firsFomGroup.get('proposed_document');
        proposedDocumentControl.setValue(archivo);
        this.nameFile[i] = archivo.name;
      }

    }).catch(err => {
      this.toast.open({
        title: err.num,
        description: err.message,
      })
    })

  }




  onAddItems() {
    const files = this.formBuilder.group({
      name: ['', Validators.required],
      documentary_type: ['', Validators.required],
      request_type: ['', Validators.required],
      justification: ['', [Validators.required, Validators.maxLength(2000)]],
      proposed_document: [null, Validators.required]
    });

    this.multipleFile.push(files);
  }

  onRemoveItem(index: number) {
    this.multipleFile.removeAt(index);
    this.nameFile.splice(index, 1);
  }


  getItems(): boolean {
    return this.multipleFile.length !== 0;
  }

  onSubmit(): void {
    this.formGroupProps.markAllAsTouched();
    this.submitEvent.emit();
  }

}

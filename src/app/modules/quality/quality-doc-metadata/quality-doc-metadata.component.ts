import { Component, Input, OnInit } from '@angular/core';
import { MetadataService } from '@app/services/quality/metadata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastService } from '../../../services/toast/toast.service';
import { ModalService } from '../../../services/modal/modal.service';
import { WaterMarkService } from '../../../services/quality/water-mark.service';

@Component({
  selector: 'app-quality-doc-metadata',
  templateUrl: './quality-doc-metadata.component.html',
  styleUrls: ['./quality-doc-metadata.component.css']
})
export class QualityDocMetadataComponent implements OnInit {
  public docId: string = '';
  public taskId: string = '';
  public metadata: any;
  public metadataForm: FormGroup;
  public modalOpen: boolean = false;
  public returnUrl: string = ``;

  constructor(
    private modalSvc: ModalService,
    private toastSvc: ToastService,
    private fb: FormBuilder,
    private metadataSvc: MetadataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private waterMarkSvc:WaterMarkService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.activatedRoute.params.subscribe((params: any) => {
      this.docId = params.docId;
      this.taskId = params.taskId;
      this.getDocMetadata();
      this.configureFormBasedOnTaskId();
    });
  }

  initializeForm(): void {
    this.metadataForm = this.fb.group({
      level: [{ value: '', disabled: true }],
      process: [{ value: '', disabled: true }],
      subprocess: [{ value: '', disabled: true }],
      procedure: [{ value: '', disabled: true }],
      name: ['', Validators.required], // Nombre del documento habilitado
      management: [{ value: '', disabled: true }],
      area: [{ value: '', disabled: true }],
      cost_center: [{ value: '', disabled: true }],
      type_request: [{ value: '', disabled: true }],
      type_documentary: [{ value: '', disabled: true }],
      privacy: ['', Validators.required], // Visualización de Privacidad habilitado
      approval_date: [{ value: '', disabled: true }],
      code: ['', [Validators.required, Validators.minLength(3)]], // Código habilitado
      folio: [0, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]], // Número de folios habilitado
      version: [0, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]], // Versión obligatorio
      start_date: [{ value: '', disabled: true }],
      end_date: [{ value: '', disabled: true }],
      description_change: ['', Validators.required], // Descripción del cambio habilitado
    });
  }

  configureFormBasedOnTaskId(): void {
    const taskId = this.taskId;

    // Deshabilitar todos los campos al inicio
    Object.keys(this.metadataForm.controls).forEach((control) => {
      this.metadataForm.get(control).disable();
      this.metadataForm.get(control).clearValidators();
    });

    if (taskId === '6') {
      this.setFieldsForTaskId6();
    } else if (taskId === '7') {
      this.setFieldsForTaskId7();
    }

    // Revalidar el formulario después de aplicar las configuraciones
    this.metadataForm.updateValueAndValidity();
  }

  setFieldsForTaskId6(): void {
    // Task ID 6: "Version" es obligatorio y otros campos son opcionales pero editables
    this.enableField('version', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]);
    this.enableField('name');
    this.enableField('code', [Validators.required, Validators.minLength(3)]);
    this.enableField('folio', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]);
    this.enableField('description_change');
    this.enableField('privacy');
  }

  setFieldsForTaskId7(): void {
    // Task ID 7: "Valid From" y "Valid Until" son obligatorios y otros campos son opcionales pero editables
    this.enableField('start_date', [Validators.required]);
    this.enableField('end_date', [Validators.required]);
    this.enableField('name');
    this.enableField('code', [Validators.required, Validators.minLength(3)]);
    this.enableField('folio', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]);
    this.enableField('description_change');
    this.enableField('privacy');
  }

  enableField(field: string, validators: any[] = []): void {
    const control = this.metadataForm.get(field);
    if (control) {
      control.enable();
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    this.metadataForm.markAllAsTouched();
    if (this.metadataForm.valid) {
      console.log(this.metadataForm.value);
      this.modalOpen = true;
      this.modalSvc.openAction('', '¿Estás seguro de los cambios a realizar?', () => {
        if (this.taskId == '6') {
          this.updateDocVersionMetadataInfo();
        } else if (this.taskId == '7'){
          this.updateDocWaterMarkMetadataInfo();
        } else {
          console.log('no soporte al task id' + this.taskId);
        };
      });
      this.modalOpen = false;
    } else {
      this.toastSvc.open({
        description: 'Revisa los campos',
        success: false,
        duration: 3000,
        title: ''
      });
    }
  }

  updateDocVersionMetadataInfo() {
    this.metadataSvc.updateDocMetadata(this.metadataForm.value, this.metadata.id).subscribe({
      error: (err: any) => {
        console.log(err);
        this.toastSvc.open({
          description: err.error.message,
          success: false,
          duration: 3000,
          title: ''
        });
      },
      next: (resp: any) => {
        this.toastSvc.open({
          description: resp.message,
          success: false,
          duration: 3000,
          title: ''
        });
        console.log(resp);
      }
    });
  };

  updateDocWaterMarkMetadataInfo(){
      this.waterMarkSvc.updateWaterMarkMetadataDoc(this.metadataForm.value, this.metadata.id).subscribe({
        error: (err: any) => {
          console.log(err);
          this.toastSvc.open({
            description: err.error.message,
            success: false,
            duration: 3000,
            title: ''
          });
        },
        next: (resp: any) => {
          this.toastSvc.open({
            description: resp.message,
            success: false,
            duration: 3000,
            title: ''
          });
          console.log(resp);
        }
      });
  }

  getDocMetadata() {
    this.metadataSvc.getDocMetadata(this.docId).subscribe({
      error: (err: any) => {
        console.log(err);
      },
      next: (resp: any) => {
        this.metadata = resp.data;
        this.populateFormWithMetadata();
      }
    });
  };

  populateFormWithMetadata(): void {
    this.metadataForm.patchValue({
      level: this.metadata.level[0].id,
      process: this.metadata.proces[0].id,
      subprocess: this.metadata.subproces[0].id,
      procedure: this.metadata.procedure,
      name: this.metadata.name,
      management: this.metadata.management[0].id,
      area: this.metadata.area,
      cost_center: this.metadata.cost_center[0].id,
      type_request: this.metadata.type_request[0].id,
      type_documentary: this.metadata.type_documentary[0].id,
      privacy: this.metadata.privacy[0].id,
      approval_date: this.metadata.approval_date,
      code: this.metadata.code,
      folio: this.metadata.folio,
      version: this.metadata.version,
      start_date: this.metadata.start_date,
      end_date: this.metadata.end_date,
      description_change: this.metadata.description_change,
    });

    // Deshabilitar campos de solo lectura
    this.metadataForm.get('level')?.disable();
    this.metadataForm.get('process')?.disable();
    this.metadataForm.get('subprocess')?.disable();
    this.metadataForm.get('procedure')?.disable();
    this.metadataForm.get('management')?.disable();
    this.metadataForm.get('area')?.disable();
    this.metadataForm.get('cost_center')?.disable();
    this.metadataForm.get('type_request')?.disable();
    this.metadataForm.get('type_documentary')?.disable();
    this.metadataForm.get('approval_date')?.disable();
  };
}

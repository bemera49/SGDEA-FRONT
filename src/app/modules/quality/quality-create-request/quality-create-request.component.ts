import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { ActionModalComponent } from 'src/app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { Items } from '../quality-main/components/sub-menu-quality/items';
import { parseFormData } from '../util/parseFormData.util';
import { AutomaticData, DocumentaryType, Level, Privacy, Process, RequestType, State } from './model/automatic-data';
import { CreateRequest, DataPredictiveText } from './model/create-request';
import { RequestCreateService } from './services/request-create.service';
import { ValidateFileService } from './services/validate-file.service';
@Component({
  selector: 'app-quality-create-request',
  templateUrl: './quality-create-request.component.html',
  styleUrls: ['./quality-create-request.component.css']
})
export class QualityCreateRequestComponent implements OnInit, OnDestroy {

  private requestCreateServices = inject(RequestCreateService);

  requestStep: boolean;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild('docIf') docIf: ElementRef;

  items: Items[] = [
    {
      link: 'quality-view-request',
      text: 'Solicitudes'
    },
    {
      link: 'quality-create-request',
      text: 'Crear solicitudes'
    }
  ]

  nameFile: string = '';
  diagramaFile: string = '';


  breadcrumbOn = [
    { name: "Calidad", route: "/quality" },
  ];
  breadcrumbRouteActive = "Solicitudes";
  id_task: string = '1';
  back: any;


  constructor(
    private modal: ModalService,
    private toast: ToastService,
    private validateSC: ValidateFileService,
    private validateOnline: ValidateInternetService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {

    this.validateOnline.connect();
  }

  SolicitudFormGroup = new FormGroup({
    radicado: new FormControl({ value: '', disabled: true }),
    solicitante: new FormControl({ value: '', disabled: true }),
    fechaSolicitud: new FormControl({ value: '', disabled: true }),
    estadoSolicitud: new FormControl({ value: '', disabled: true }),
    cargo: new FormControl({ value: '', disabled: true }),
    centroCostos: new FormControl({ value: '', disabled: true }),
    gerencia: new FormControl({ value: '', disabled: true }),
    direccionDivisionOficina: new FormControl({ value: '', disabled: true }),
    diagramaUrl: new FormControl(null),
    proceso: new FormControl(1, Validators.required),
    tipoDocumental: new FormControl('', Validators.required),
    tipoSolicitud: new FormControl('', Validators.required),
    privacidad: new FormControl('', Validators.required),
    justificacion: new FormControl('', [Validators.required, Validators.max(2000)]),
    solicitudAplica: new FormControl(null, Validators.required),
    documentoPropuesto: new FormControl(null, Validators.required),
    level: new FormControl('', Validators.required),
    subProceso: new FormControl(10, [Validators.required, Validators.max(100)]),
    nombreDelDocumento: new FormControl('', [Validators.required, Validators.max(100)])
  })

  private automaticDataSub: Subscription;
  private onDestroy$: Subject<void> = new Subject<void>();
  documentContent: string | ArrayBuffer = '';
  typedDocument: string = '';
  level: Level[] = [];
  requestType: RequestType[] = [];
  documentary_type: DocumentaryType[] = [];
  privacy: Privacy[] = [];
  process: Process[] = [];
  subProcess: Process[] = [];
  stateRequest: State = { id: 0, nombre: '' };
  visible: boolean = false;
  additionalDocuments = false;
  idSolicitud: number;
  documentSub!: Subscription;
  hiddenDiagram = false;
  hiddenPredictive = false;
  predictiveText: string[] = [];
  filteredOptions: Observable<DataPredictiveText>;
  typeDocument: string;

  ngOnInit() {
    this.initialData();
    this.addRequired();
    this.validateOnline.checkConnection();
    this.validateMultipleFiles();
    this.addSubProcess();

    this.requestCreateServices.getSubProcess(this.SolicitudFormGroup.get('proceso').value).subscribe(item => {
      this.subProcess = item.data;
    })



    this.SolicitudFormGroup.get('tipoSolicitud').valueChanges.subscribe(item => {
      let value = parseInt(item);
      this.typeDocument = item;
      if (value !== 1) {
        this.searchPredictiveText();
      } else {

        this.predictiveText = []
      }


    })

  }

  displayFn(value: string): string {
    return value ? value : '';
  }


  searchPredictiveText(): void {
    this.SolicitudFormGroup.get('nombreDelDocumento').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value.length >= 4 && Number(this.typeDocument) !== 1) {
          return this.requestCreateServices.getPredictiveText({
            name: value.trim().toLocaleUpperCase()
          });
        } else {
          return of(null);
        }
      }),
      takeUntil(this.onDestroy$)
    ).subscribe(item => {
      if (item) {
        this.predictiveText = item.data
      }
    })
  }



  public selectedOption;
  validateMultipleFiles(): void {
    this.SolicitudFormGroup.get('solicitudAplica').valueChanges.subscribe(value => {
      if (value === 1) {
        (this.SolicitudFormGroup as any).addControl('multiple_file', this.formBuilder.array(
          [this.formBuilder.group({
            name: ['', Validators.required],
            documentary_type: ['', Validators.required],
            request_type: ['', Validators.required],
            justification: ['', [Validators.required, Validators.maxLength(2000)]],
            proposed_document: [null, Validators.required]
          })
          ])
        );
      } else {
        (this.SolicitudFormGroup as any).removeControl('multiple_file');
      }

    });
  }


  addRequired(): void {

    this.SolicitudFormGroup.get('tipoDocumental').valueChanges.subscribe(value => {
      let documental = parseInt(value);
      if (documental === 1 || documental === 2) {
        this.hiddenDiagram = true;
      } else if (documental === 4 || documental === 3) {
        this.hiddenDiagram = false;
      }

    });
  }

  initialData(): void {   
    this.automaticDataSub = this.requestCreateServices.getAutomaticData().subscribe(item => {
      this.initDataForm(item);
      this.SolicitudFormGroup.get('fechaSolicitud').setValue(item.data.date);
      this.SolicitudFormGroup.get('radicado').setValue(item.data.filed);
      this.SolicitudFormGroup.get('solicitante').setValue(item.data.applicant.user);
      this.SolicitudFormGroup.get('cargo').setValue(item.data.applicant.position);
      this.SolicitudFormGroup.get('gerencia').setValue(item.data.applicant.management);
      this.SolicitudFormGroup.get('direccionDivisionOficina').setValue(item.data.applicant.dependence);
      this.SolicitudFormGroup.get('estadoSolicitud').setValue(item.data.state.nombre);
      this.SolicitudFormGroup.get('centroCostos').setValue(item.data.applicant.cost_center);
    })

  }

  initDataForm(item: AutomaticData): void {
    this.id_task = localStorage.getItem('id_task');
    this.back = `/quality/quality-view-request/${this.id_task}`;
    console.log(typeof this.id_task);
    console.log(this.id_task);
    
    this.level = item.data.level;
    this.requestType = item.data.request_type;
    this.documentary_type = item.data.documentary_type;
    this.privacy = item.data.privacy;
    this.stateRequest = { ...item.data.state };
    this.process = item.data.process;
  }


  onSubmit(): void {
    this.SolicitudFormGroup.markAllAsTouched();
    if (this.validateOnline.validateConnection()) {
      this.modal.openYesNoAction('', '¿Estás seguro de los cambios a realizar?', () => {
        this.finalizeProcess();
        this.requestStep = this.SolicitudFormGroup.get('solicitudAplica').value === 1;
      });
    }
  }


  addSubProcess(): void {
    this.SolicitudFormGroup.get('proceso').valueChanges.subscribe(id => {
      this.requestCreateServices.getSubProcess(Number(id)).subscribe(item => {
        this.subProcess = item.data;
      })

    })
  }


  parseData(): CreateRequest {

    const data: CreateRequest = {
      filed: this.SolicitudFormGroup.get('radicado').value,
      documentary_type: this.SolicitudFormGroup.get('tipoDocumental').value,
      justification: this.SolicitudFormGroup.get('justificacion').value,
      level: this.SolicitudFormGroup.get('level').value,
      multiple_choice: this.SolicitudFormGroup.get('solicitudAplica').value,
      name: this.SolicitudFormGroup.get('nombreDelDocumento').value,
      privacy: this.SolicitudFormGroup.get('privacidad').value,
      process: String(this.SolicitudFormGroup.get('proceso').value),
      request_type: this.SolicitudFormGroup.get('tipoSolicitud').value,
      state: this.stateRequest.id,
      sub_process: String(this.SolicitudFormGroup.get('subProceso').value),
      proposed_document: this.SolicitudFormGroup.get('documentoPropuesto').value,
    }


    if (this.SolicitudFormGroup.get('multiple_file') !== null) {
      const dataTable = this.SolicitudFormGroup.get('multiple_file').value;
      data.multiple_file = dataTable;

    }

    if (this.SolicitudFormGroup.get('diagramaUrl').value) {
      data.diagram_file = this.SolicitudFormGroup.get('diagramaUrl').value;
    }

    return data;
  }


  uploadFile(event: Event): void {

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
        this.nameFile = archivo.name;
        this.SolicitudFormGroup.get('documentoPropuesto').setValue(archivo);
      }

    }).catch(err => {
      this.toast.open({
        title: err.num,
        description: err.message,
      })
    })

  }


  uploadFileDiagrama(event: Event): void {
    this.addRequired();
    const archivo = (event.target as HTMLInputElement).files[0];


    const validateTypes = this.validateSC.validateFileTypesDiagram(archivo);


    this.validateSC.validateCorrupt(archivo).then(res => {

      if (res.status) {
        this.toast.open({
          title: res.num,
          description: res.message,
        })
      }

      if (!validateTypes.status) {
        this.toast.open({
          title: validateTypes.num,
          description: validateTypes.message,
        })
      }


      if (!res.status && validateTypes.status) {
        this.diagramaFile = archivo.name;
        this.SolicitudFormGroup.get('diagramaUrl').setValue(archivo);
      }

    }).catch(err => {

      this.toast.open({
        title: err.num,
        description: err.message,
      })
    })
  }

  getMultipleFile(): boolean {

    const multipleFile = this.SolicitudFormGroup.get('multiple_file').value as FormArray;
    if (multipleFile) {
      return multipleFile.length !== 0
    }

    return false;
  }

  finalizeProcess(): void {


    if (this.SolicitudFormGroup.valid && this.SolicitudFormGroup.get('multiple_file') === null
      || this.SolicitudFormGroup.get('multiple_file') &&
      this.SolicitudFormGroup.valid && this.getMultipleFile()) {

      // Si no hay errores, modal de confirmación
      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '004',
        description: `¿Esta seguro de la acción al realizar?`,
        onConfirmAction: () => {
          const data = this.parseData();
          const formData = parseFormData<CreateRequest>(data);
          this.requestCreateServices.postCreateRequest(formData).subscribe({
            next: (res) => {
              this.toast.open({
                title: '001',
                description: 'Registro exitoso.'
              });

              this.router.navigate(['/quality/quality-view-request/', res.data.id])
            },
            error: err => {
              this.toast.open({
                title: 'Error',
                description: `Petición fallida ${err.error.message}.`
              });
            },
            complete: () => {
              this.stepper.selectedIndex = this.stepper.selectedIndex + 1;
            }
          });
        },
      });

      // Esperamos a que el modal se cierre para ver qué decidió el usuario
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
          // Si el usuario confirmó, ejecutamos la acción de confirmación
          dialogRef.componentInstance.data.onConfirmAction();
        }
      });

    } else {

      this.toast.open({
        title: '¡007!',
        description: 'Por favor, verifique los datos obligatorios incompletos.'
      });
    }

  }



  ngOnDestroy(): void {
    this.automaticDataSub.unsubscribe();
    this.documentSub?.unsubscribe();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

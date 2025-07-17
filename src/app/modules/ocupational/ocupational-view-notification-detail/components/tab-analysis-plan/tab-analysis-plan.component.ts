import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { AnalysisPlan, Dependence } from '../../model/view-reques-detail';
import { Items } from '../table-ar-items/interface/items';
import { TypeRequest } from './enum/type-request';
import { Meetings, RequestAnalysis } from './interface/analysis-requests';
import { DataUserObservation } from './interface/visualization';
import { AnalysisRequestsService } from './services/analysis-requests/analysis-requests.service';
import { ValidateFileService } from '@app/modules/quality/quality-create-request/services/validate-file.service';
import { parseFormData } from '@app/modules/quality/util/parseFormData.util';
import { CreateRequest } from '@app/modules/quality/quality-create-request/model/create-request';
import { parseFormDataPlan } from '@app/modules/quality/util/parseFormDataPlan.util';

@Component({
  selector: 'app-tab-analysis-plan',
  templateUrl: './tab-analysis-plan.component.html',
  styleUrls: ['./tab-analysis-plan.component.css']
})
export class TabAnalysisPlanComponent implements OnInit, OnChanges {
  @Input() analysis_plan: AnalysisPlan
  @Input() dependence: Dependence[];
  @Input() typeRequest: string;
  // Define una bandera para determinar si las funciones deben ejecutarse o no
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastService);
  private analysisRequests = inject(AnalysisRequestsService);
  private router = inject(ActivatedRoute);
  private vi = inject(ValidateInternetService);
  private user = inject(RestService);
  private onDestroy$: Subject<void> = new Subject<void>();
  private onDestroyCode$: Subject<void> = new Subject<void>();
  private onDestroyWhich$: Subject<void> = new Subject<void>();
  private _validateSC= inject(ValidateFileService);
  indexDependence = 0;
  private modal = inject(ModalService);
  dataObservation: DataUserObservation[] = [];
  predictiveText: string[][] = [];
  enableFunctions: boolean = true;
  dataUpdate: boolean = false
  predictiveCode: string[][] = [];
  predictiveWhich: string[] = [];
  dateCreateId: number
  private idParam: number = 0;
  dateCreate: string | null = null;
  dateUpdate: string | null = null
  headerTablaItems: Items[] = [

    {
      name: '+',
      key: 'action',
      action: true
    },
    {
      name: 'Área Involucrada',
      key: ''
    },
    {
      name: 'Código',
      key: ''
    },
    {
      name: 'Documento relacionados',
      key: ''
    },
    {
      name: 'Enviar Correo',
      key: ''
    },
    {
      name: 'Fecha propuesta',
      key: ''
    },
    {
      name: 'Ayuda de memoria',
      key: ''
    }
  ];

  analysisForm = new FormGroup({
    question_i: new FormControl('', Validators.required),
    question_ii: new FormControl('', Validators.required),
    which: new FormControl({ value: '', disabled: true }, Validators.required),
    meetings: this.formBuilder.array(
      [this.formBuilder.group({
        area: ['', Validators.required],
        code: ['', Validators.required],
        document_name: ['', Validators.required],
        email: [[], [Validators.required, Validators.minLength(1)]],
        date_hrs: ['', Validators.required],
        help_file: ['']
      })
      ]),
    observation: new FormControl('', Validators.required)
  })


  constructor() {
    this.vi.connect();
  }

  ngOnChanges(): void {

    if (this.analysis_plan) {
      this.analysisForm.get('question_i').setValue(this.analysis_plan.questions[0].respuesta);
      this.analysisForm.get('question_ii').setValue(this.analysis_plan.questions[1].respuesta);
      this.analysisForm.get('which').setValue(this.analysis_plan.questions[0].cual);

      // Limpiar las reuniones actuales
      if (this.analysis_plan && this.analysis_plan.meetings && this.analysis_plan.meetings.length > 0) {
        const meetingsControl = this.analysisForm.get('meetings') as FormArray;
        meetingsControl.clear();

        // Agregar nuevas reuniones
        this.analysis_plan.meetings.forEach(meeting => {

          meetingsControl.push(this.formBuilder.group({
            id: [meeting.id],
            area: [meeting.area_id, Validators.required],
            code: [meeting.code, Validators.required],
            document_name: [meeting.name_document, Validators.required],
            email: [meeting.emails.split(','), [Validators.required, Validators.minLength(1)]], // Asumiendo que emails es una cadena separada por comas
            date_hrs: [meeting.date_hrs, Validators.required],
            help_file:['']
          }));

        });

        console.log('meetingsControl', meetingsControl.value);

      }

      //observación de chat
      if (this.analysis_plan.observations.length > 0 && this.analysis_plan.observations) {
        this.analysis_plan.observations.forEach(obs => {
          const newObservation: DataUserObservation = {
            user: obs.user,
            contenido: obs.contenido,
            fecha: obs.fecha
          };
          this.dataObservation.push(newObservation);
        });
      } else {
        console.log('datos observation el cambio:', this.analysis_plan.observations)
      }
      // Asumiendo que sólo hay una observación cual
      this.analysisForm.get('observation').setValue('');

      this.dateCreate = this.analysis_plan.date_hrs_create
      if (this.analysis_plan.date_hrs_update === '') {
        this.dateUpdate = null
      } else {
        this.dateUpdate = this.analysis_plan.date_hrs_update
      }
      this.disableForm()
    }


  }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idParam = parseInt(id)
    });
    this.vi.checkConnection();
    this.activateField();

  }



  activateField(): void {
    this.analysisForm.get('question_i').valueChanges.subscribe(response => {
      const value = parseInt(response);
      if (value === 1) {
        this.analysisForm.get('which').enable();

      } else {
        this.analysisForm.get('which').disable();
      }

    })
  }

  get meeting() {
    return this.analysisForm.get('meetings') as FormArray
  }

  get meetingLength(): number {
    return this.analysisForm.get('meetings').value.length;
  }

  onAddItems(): void {
    if (this.enableFunctions) {
      const meetings = this.formBuilder.group({
        area: ['', Validators.required],
        code: ['', Validators.required],
        document_name: ['', Validators.required],
        email: [[], [Validators.required, Validators.minLength(1)]],
        date_hrs: ['', Validators.required],
        help_file:['']
      });

      this.meeting.push(meetings);
    }
  }


  onRemoveItem(index: number) {
    if (this.enableFunctions) {
      this.meeting.removeAt(index);
      this.predictiveCode.splice(index, 1);
      this.predictiveText.splice(index, 1);
    }
  }



  searchPredictiveWhich(): void {

    this.analysisForm.get('which').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value.length >= 4) {
          return this.analysisRequests.getPredictiveNameDocuments({
            nombre: value.trim().toLocaleUpperCase(),

          });

        } else {
          return of(null);
        }
      }),
      takeUntil(this.onDestroyWhich$)
    ).subscribe(item => {
      if (item) {

        this.predictiveWhich = item.data
      }

    })

  }

  searchPredictiveCode(index: number): void {
    if (this.vi.validateConnection()) {
      if (this.vi.validateConnection()) {
        if (TypeRequest.CAMBIO_SIN_VERSIONAMIENTO === this.typeRequest ||
          TypeRequest.MODIFICAR === this.typeRequest || TypeRequest.PASO_OBSOLETO === this.typeRequest
        ) {
          this.analysisForm.get('meetings').get(index.toString()).get('code').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => {
              if (value.length >= 4) {

                return this.analysisRequests.getPredictiveNameDocuments({
                  codigo: value.trim().toLocaleUpperCase(),
                  dependence_id: this.analysisForm.get('meetings').get(index.toString()).get('area').value
                });

              } else {
                return of(null);
              }
            }),
            takeUntil(this.onDestroyCode$)
          ).subscribe(item => {
            if (item) {
              this.predictiveCode[index] = item.data;

            }

          })
        }
      }
    }
  }

  searchPredictiveText(index: number): void {
    if (this.vi.validateConnection()) {
      if (TypeRequest.CAMBIO_SIN_VERSIONAMIENTO === this.typeRequest ||
        TypeRequest.MODIFICAR === this.typeRequest || TypeRequest.PASO_OBSOLETO === this.typeRequest
      ) {
        this.analysisForm.get('meetings').get(index.toString()).get('document_name').valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(value => {
            if (value.length >= 4) {

              return this.analysisRequests.getPredictiveNameDocuments({
                nombre: value.trim().toLocaleUpperCase(),
                dependence_id: this.analysisForm.get('meetings').get(index.toString()).get('area').value
              });

            } else {
              return of(null);
            }
          }),
          takeUntil(this.onDestroy$)
        ).subscribe(item => {
          if (item) {
            this.predictiveText[index] = item.data;
          }

        })
      }
    }

  }

  onSubmit(): void {
    if (this.vi.validateConnection()) {
      //modificación para habilitar el boton editar
      if (this.enableFunctions) {
        if (this.dataUpdate) {
          this.PutdataUpdate()
        } else {
          if (this.analysisForm.valid && this.meetingLength !== 0) {

            const dialogRef = this.modal.open(ActionModalComponent, {
              title: '004',
              description: `¿Esta seguro de la acción al realizar?`,
              onConfirmAction: () => {
                const valueForm = this.parseData();
                const newForm = { ...valueForm, request_id: this.idParam }
                const formData = parseFormDataPlan<RequestAnalysis>(newForm);
                console.log('datos enviados:', formData)
                this.analysisRequests.postCreateAnalysis(formData).subscribe({
                  next: (response) => {
                    this.toast.open({
                      title: '001',
                      description: 'Registro exitoso.'
                    });
                    console.log('respuesta de guardar: ', response)
                    this.dateCreate = response.data.fecha_hrs_c;
                    this.onchangemeetings(response.data.meetings)
                    this.dateCreateId = response.data[1]
                    const observation: DataUserObservation = {
                      user: this.user.getUserData().username,
                      contenido: this.analysisForm.get('observation').value,
                      fecha: response.data.fecha_hrs_c,
                    }
                    this.dataObservation.push(observation);
                    this.dataUpdate = true

                  },

                  error: err => {
                    this.toast.open({
                      title: 'Error',
                      description: `Petición fallida ${err.error.message}.`
                    });
                  },
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
              description: 'Por favor verifique,  datos obligatorios incompletos.'
            });
          }
        }
      } else {
        this.enableForm()
      }

    }


  }


  onDateChange(event: any, index: number) {
    const fecha = event.target.value;
    if (fecha) {
      const fechaFormateada = this.parseDate(fecha);
      this.analysisForm.get('meetings').get(index.toString()).get('date_hrs').setValue(fechaFormateada);
    }
  }


  parseDate(fecha: string): string {
    const formato = 'yyyy-MM-dd HH:mm:ss';
    const locale = 'en-US';
    return formatDate(fecha, formato, locale);
  }

  add(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value.toLowerCase();

    // Agrega el correo electrónico si es válido
    if ((value || '').trim() && value.includes('@acueducto.com.co')) {
      const emails = this.analysisForm.get('meetings').get(index.toString()).get('email').value;
      emails.push(value.trim());
      this.analysisForm.get('meetings').get(index.toString()).get('email').setValue(emails); // Actualiza el FormControl
    }

    // Limpia el input
    if (input) {
      input.value = '';
    }
  }

  parseData(): RequestAnalysis {
    const data = this.analysisForm.value as RequestAnalysis;
    const meeting = this.analysisForm.get('meetings').value as Meetings[];
    const newMeeting = meeting.map((item,index) => {
      const email = item.email as string[];
      console.log(this.fileInput[index],'index')
      return {
        ...item,
        'email': email.join(','),
      }
    })
    const newData = { ...data, 'meetings': newMeeting }
    console.log(newMeeting,'meeting');

    return newData;
  }

  remove(email: string, indexForm: number): void {
    const emails = this.analysisForm.get('meetings').get(indexForm.toString()).get('email').value;
    const index = emails.indexOf(email);

    if (index >= 0) {
      emails.splice(index, 1);

      this.analysisForm.get('meetings').get(indexForm.toString()).get('email').setValue(emails); // Actualiza el FormControl
    }
  }
  // HU07 Modificación de campos
  private disableForm() {
    // Deshabilitar todos los controles del FormGroup
    Object.keys(this.analysisForm.controls).forEach(key => {
      const control = this.analysisForm.get(key);
      control.disable(); // Deshabilitar el control
    });


    // Deshabilitar todos los controles del FormArray "meetings"
    const meetingsControl = this.analysisForm.get('meetings') as FormArray;
    meetingsControl.controls.forEach(control => {
      control.disable(); // Deshabilitar el control dentro del FormArray
      //variable que desabilita las funciones de la pestaña.
      this.enableFunctions = false;
    });
  }
  //Funció para enviar los cambios realizados
  private PutdataUpdate(): void {

    if (this.analysisForm.valid && this.meetingLength !== 0) {

      const dialogRef = this.modal.open(ActionModalComponent, {
        title: '004',
        description: `¿Esta seguro de la acción al realizar?`,
        onConfirmAction: () => {
          const valueForm = this.parseDataUpdate();
          let newForm: any;
          /* console.log('datos value:', valueForm) */
          if (this.analysis_plan) {
            newForm = { ...valueForm, id: this.analysis_plan.id }
          } else {
            newForm = { ...valueForm, id: this.dateCreateId }

          }
          console.log('datos del formulario:', newForm)
          const formData =parseFormDataPlan<RequestAnalysis>(newForm);
          /* console.log('id solicitud:', newForm) */
          this.analysisRequests.putUpdateAnalysis(formData).subscribe({
            next: (response) => {
              this.toast.open({
                title: '001',
                description: 'Registro exitoso.'
              });
              this.dateUpdate = response.data.fecha_hrs_u;
              console.log('fecha update:', this.dateUpdate)
              // Agregar el nuevo comentario sin reemplazar los existentes
              const observation: DataUserObservation = {
                user: this.user.getUserData().username,
                contenido: this.analysisForm.get('observation').value,
                fecha: response.data.fecha_hrs_u,
              };
              this.dataObservation.push(observation); // Agregar el nuevo comentario
              this.analysisForm.get('observation').reset()
            },

            error: err => {
              this.toast.open({
                title: '018.',
                description: `Petición fallida ${err.error.message}.`
              });
            },
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
        description: 'Por favor verifique,  datos obligatorios incompletos.'
      });
    }



  }

  private enableForm(): void {
    // Habilitar todos los controles del FormGroup

    Object.keys(this.analysisForm.controls).forEach(key => {
      console.log('datos a habilitar', this.analysisForm)
      const control = this.analysisForm.get(key);
      control.enable(); // Habilitar el control
    });

    if (parseInt(this.analysis_plan.questions[0].respuesta) === 0) {
      this.analysisForm.get('which').disable();
    }
    // Habilitar todos los controles del FormArray "meetings"
    const meetingsControl = this.analysisForm.get('meetings') as FormArray;
    meetingsControl.controls.forEach(control => {
      control.enable(); // Habilitar el control dentro del FormArray
    });

    //variable que desabilita las funciones de la pestaña.

    this.enableFunctions = true;
    this.dataUpdate = true
  }
  parseDataUpdate(): RequestAnalysis {
    const data = this.analysisForm.value as RequestAnalysis;
    const meeting = this.analysisForm.get('meetings').value as Meetings[];
    const newMeeting = meeting.map(item => {
      const email = item.email as string[];
      return {
        ...item,
        'email': email.join(',')
      }
    })

    const newData = { ...data, 'meetings': newMeeting }

    return newData;
  }
  private onchangemeetings(response: any): void {
    const meetingsControl = this.analysisForm.get('meetings') as FormArray;
    meetingsControl.clear();
    response.forEach(meeting => {
      meetingsControl.push(this.formBuilder.group({
        id: [meeting.id],
        area: [meeting.gdTrdDependencia_id, Validators.required],
        code: [meeting.codigo, Validators.required],
        document_name: [meeting.nombre, Validators.required],
        email: [meeting.correos.split(','), [Validators.required, Validators.minLength(1)]], // Asumiendo que emails es una cadena separada por comas
        date_hrs: [meeting.fecha_hrs, Validators.required],
        help_file:['']
      }));
    });
  }


  fileNameInput:string[] = [];
  fileInput:File[] = [];

 
  onFileSelected(event: Event, index: number): void {

    const archivo = (event.target as HTMLInputElement).files[0];
   

    const validateMb = this._validateSC.validateFileMB(archivo);
    const validateTypes = this._validateSC.validateFileTypePdf(archivo);

    this._validateSC.validateCorrupt(archivo).then(res => {

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
        this.fileNameInput[index] = archivo.name;
        this.analysisForm.get('meetings').get(index.toString()).get('help_file').setValue(archivo);
      }

    }).catch(err => {
      this.toast.open({
        title: err.num,
        description: err.message,
      })
    })

  }
}

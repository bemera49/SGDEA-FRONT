import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { environment } from 'src/environments/environment';
import { EncryptService } from 'src/app/services/encrypt.service';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';

import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { ConvertParamsBase64Helper } from '../../../helpers/convert-params-base64.helper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivateTranslateService } from '../../../services/activate-translate.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepper, MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { diccionario, validateSteps } from './data';
import { MatDatepickerModule } from '@angular/material/datepicker';
import swal from 'sweetalert2';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ExternalService } from '@app/services/external/external.service';
import { ExternalDireccionComponent } from 'src/app/services/modal/components/pqrs/external-direccion/external-direccion.component';
import { NotifyModalComponent } from '@app/services/modal/components/pqrs/notify-modal/notify-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { FieldsValidator } from '@app/helpers/fields-validator';
import { ValidateInput } from '@app/helpers/input-patters';

@Component({
  selector: 'app-pqrs-form',
  templateUrl: './pqrs-form.component.html',
  styleUrls: ['./pqrs-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatRadioModule,
    RouterLink
  ]
})
export class PqrsFormComponent implements OnInit {

  @Input() title: string = "missing title";
  @Output() onSubmitPqrs = new EventEmitter<object>();
  colorAu: ThemePalette = "primary";

  // formulario
  diccionario = diccionario
  pqrsForm: FormGroup
  minDate: Date;
  maxDate: Date;

  maxChars: number = 10000;
  maxFileZise: number = 5242880;

  // streps
  @ViewChild('stepper') stepper: MatStepper;
  actualStep = 0
  stepperOrientation: Observable<StepperOrientation>;

  archivosSubidos: File[] = [];

  // listas desplegables
  listPaises: any[] = []
  listPaisesNoti: any[] = []
  listDepartamentos: any[] = []
  listDepartamentosNoti: any[] = []
  listCiudades: any[] = []
  listCiudadesNoti: any[] = []
  listDependencias: any[] = []
  listUserByDependencias: any[] = []
  listTipoServicios: any[] = []
  listTipoSolicitudes: any[] = []
  listTiposVia: any[] = []
  listTiposLetraDir: any[] = []
  listTiposSufijos: any[] = []

  // panel politicas
  panelOpenState = false

  private ruoteService = environment.apiUrl + 'api/v1/sede-electronica/radicar';

  titleName: string = 'Nombres y Apellidos';

  messageAutoriza: string = 'NO';

  constructor(
    private fb: FormBuilder,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    private http: HttpClient,
    public lhs: LocalStorageService,
    public globalAppService: GlobalAppService,
    private breakpointObserver: BreakpointObserver,
    private externalSvc: ExternalService,
    private modal: ModalService,
    private toastSvc: ToastService,
    public route: ActivatedRoute,
    private router: Router,
    public validateInput: ValidateInput
  ) {
  }

  ngOnInit(): void {

    this.getDepartamentos(1, false);
    this.getDepartamentos(1, true);

    this.stepperOrientation = this.breakpointObserver.observe('( min-width: 800px )')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'))
    if (!!localStorage.getItem("pqrsForm"))
      this.initForm(JSON.parse(localStorage.getItem("pqrsForm")))
    else
      this.initForm()
  }

  initForm(mockData?): void {
    // obtener drops 
    Promise.all([
      this.externalSvc.getPaises().toPromise(),
      this.externalSvc.getDependencias().toPromise(),
      this.externalSvc.getTipoServicio().toPromise(),
      this.externalSvc.getTipoSolicitudes().toPromise(),
      this.externalSvc.getTiposVia().toPromise(),
      this.externalSvc.getLetraDireccion().toPromise(),
      this.externalSvc.getSufijos().toPromise(),
    ]).then(([paises, dependencias, tipoServicio, tipoSolicitudes, tiposVia, letraDir, sufijos]) => {
      this.listPaises = paises.map(p => ({ value: p.nivelGeografico1, name: p.nomNivelGeografico1 }))
      this.listPaisesNoti = paises.map(p => ({ value: p.nivelGeografico1, name: p.nomNivelGeografico1 }))
      this.listDependencias = dependencias.map(p => ({ value: p.idGdTrdDependencia, name: p.nombreGdTrdDependencia }))
      this.listTipoServicios = tipoServicio.map(p => ({ value: p.id, name: p.nombre }))
      this.listTipoSolicitudes = tipoSolicitudes.map(p => ({ value: p.id, name: p.nombre }))
      this.listTiposVia = tiposVia.map(p => ({ value: p.value, name: p.viewValue }))
      this.listTiposLetraDir = letraDir.map(p => ({ value: p.value, name: p.viewValue }))
      this.listTiposSufijos = sufijos.map(p => ({ value: p.value, name: p.viewValue }))
    })

    // init formulario
    this.pqrsForm = this.fb.group({

      tipoSolicitudId: new FormControl('', [Validators.required]),
      numeroCuentaContrato: new FormControl('', []),
      tipoPersona: new FormControl('', [Validators.required]),
      tipoIdentificacion: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required]),
      nombresApellidos: new FormControl('', [Validators.required]),
      telefonoCelular: new FormControl('', [Validators.required]),
      telefonoFijo: new FormControl('', [Validators.required]),
      direccionResidencia: new FormControl('', []),
      paisResidencia: new FormControl(1, [Validators.required]),
      departamentoResidencia: new FormControl('', [Validators.required]),
      ciudadResidencia: new FormControl('', [Validators.required]),
      autorizacionnotificacion: new FormControl(false, []),
      tipoNotificacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [FieldsValidator.mailIsValid]),
      confirmEmail: new FormControl('', []),
      direccionNotificacion: new FormControl('', []),
      paisNotificacion: new FormControl(1, [Validators.required]),
      departamentoNotificacion: new FormControl('', [Validators.required]),
      ciudadNotificacion: new FormControl('', [Validators.required]),
      hechos: new FormControl('', [Validators.required]),
      pretensiones: new FormControl('', [Validators.required]),
      cuentaConAnexos: new FormControl(false),
      anexos: new FormControl(null),
      tratamientoDatos: new FormControl(false, [Validators.required]),
    },{
      validators: [FieldsValidator.fieldsEquals('email', 'confirmEmail')]
    });

    // valdiar si hay cambios sin guardar en el localstorage
    if (mockData) {
      swal({
        title: "Tienes cambios si guardar",
        text: "¿Deseas aplicar los datos existentes?",
        type: 'success',
        showCancelButton: true,
        cancelButtonText: "NO",
        confirmButtonText: "Si",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.pqrsForm.patchValue(mockData);

          // obtener las listas asociadas al padre
          if (mockData.idNivelGeografico1)
            this.getDepartamentos(mockData.idNivelGeografico1, false)
          if (mockData.idNivelGeografico2)
            this.getCiudades(mockData.idNivelGeografico2, false)
          if (mockData.paisNotificacion)
            this.getDepartamentos(mockData.paisNotificacion, true)
          if (mockData.departamentoNotificacion)
            this.getCiudades(mockData.departamentoNotificacion, true)
          this.onChangePersonType(mockData.tipoPersona);
        } else {
          localStorage.removeItem('pqrsForm')
        }
      });
    }
    this.pqrsForm.valueChanges.subscribe(changes => {
      localStorage.setItem('pqrsForm', JSON.stringify(changes))
    });

  }

  async getDepartamentos(pais_id, isNOti) {
    const departamentos = await this.externalSvc.getDepartamentos(pais_id).toPromise()
    if (!isNOti) {
      this.listDepartamentos = departamentos.map(dep => ({ value: dep.nivelGeografico2, name: dep.nomNivelGeografico2 }))
    } else
      this.listDepartamentosNoti = departamentos.map(dep => ({ value: dep.nivelGeografico2, name: dep.nomNivelGeografico2 }))
  }

  async getCiudades(dep_id, isNOti) {
    const ciudades = await this.externalSvc.getCiudades(dep_id).toPromise()
    if (!isNOti) {
      this.listCiudades = ciudades.map(dep => ({ value: dep.nivelGeografico3, name: dep.nomNivelGeografico3 }))

    } else
      this.listCiudadesNoti = ciudades.map(dep => ({ value: dep.nivelGeografico3, name: dep.nomNivelGeografico3 }))

  }

  async getUSsersByDependencia(dep_id) {
    const ussers = await this.externalSvc.getUserByDependencia(dep_id).toPromise()
    this.listUserByDependencias = ussers.map(dep => ({ value: dep.id, name: dep.username }))
  }

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    let archivosInvalidos = false;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const extension = file.name.split('.').pop().toLowerCase();

      var tam = file.size;

      if(this.maxFileZise < tam) {
        this.toastSvc.open({
          title: 'Error',
          description: 'El tamaño maximo por archivo es de ' + this.maxFileZise / 1024 / 1024 + "MB",
          success: false
        });

        return;

      }

      if (['png', 'jpg', 'jpeg', 'pdf'].includes(extension)) {
        this.archivosSubidos.push(file);
      } else {
        archivosInvalidos = true;
      }
    }

    if (archivosInvalidos) {
      this.toastSvc.open({
        title: 'Error',
        description: 'Solo se aceptan archivos .png, .jpg, .jpeg, .pdf. Por favor, valida los archivos seleccionados.',
        success: false
      });
    }

    this.pqrsForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  }


  // Método para eliminar un archivo de la lista.
  eliminarArchivo(index: number): void {
    this.archivosSubidos.splice(index, 1);
    // Actualizar el valor del formulario después de eliminar el archivo.
    this.pqrsForm.get('anexos').setValue(this.archivosSubidos.length > 0 ? this.archivosSubidos.length : null);
  }

  //arreglar: devuelve undefined
  openModalForDireccion(targetFormControlName: string): void {
    const dialogRef = this.modal.open(ExternalDireccionComponent, {
      title: 'Ingrese la dirección',
      description: 'Por favor, ingrese la dirección completa.',
    });

    dialogRef.afterClosed().subscribe(direccion => {
      if (direccion) {
        if (!direccion) {
          this.pqrsForm.get(targetFormControlName).markAsTouched()
          this.pqrsForm.get(targetFormControlName).setValue(null);
          return
        }
        this.pqrsForm.get(targetFormControlName).setValue(direccion);
      }
    });
  }

  onChangePersonType(value: any) {
    if(value == '3'){
      this.pqrsForm.controls['tipoIdentificacion'].disable();
      this.pqrsForm.controls['numeroDocumento'].disable();
      this.pqrsForm.controls['numeroCuentaContrato'].disable();
      this.pqrsForm.controls['numeroCuentaContrato'].reset();

      this.pqrsForm.controls['nombresApellidos'].disable();
      this.pqrsForm.controls['telefonoCelular'].disable();
      this.pqrsForm.controls['telefonoFijo'].disable();
      this.pqrsForm.controls['direccionResidencia'].disable();
      this.pqrsForm.controls['paisResidencia'].disable();

      this.pqrsForm.controls['departamentoResidencia'].disable();
      this.pqrsForm.controls['ciudadResidencia'].disable();
      this.pqrsForm.controls['tipoNotificacion'].disable();
      this.pqrsForm.controls['email'].disable();
      this.pqrsForm.controls['confirmEmail'].disable();

      this.pqrsForm.controls['direccionNotificacion'].disable();
      this.pqrsForm.controls['paisNotificacion'].disable();
      this.pqrsForm.controls['departamentoNotificacion'].disable();
      this.pqrsForm.controls['ciudadNotificacion'].disable();
    }else{
      this.pqrsForm.controls['tipoIdentificacion'].enable();
      this.pqrsForm.controls['numeroDocumento'].enable();
      this.pqrsForm.controls['numeroCuentaContrato'].enable();

      this.pqrsForm.controls['nombresApellidos'].enable();
      this.pqrsForm.controls['telefonoCelular'].enable();
      this.pqrsForm.controls['telefonoFijo'].enable();
      this.pqrsForm.controls['direccionResidencia'].enable();
      this.pqrsForm.controls['paisResidencia'].enable();

      this.pqrsForm.controls['departamentoResidencia'].enable();
      this.pqrsForm.controls['ciudadResidencia'].enable();
      this.pqrsForm.controls['tipoNotificacion'].enable();
      this.pqrsForm.controls['email'].enable();
      this.pqrsForm.controls['confirmEmail'].enable();

      this.pqrsForm.controls['direccionNotificacion'].enable();
      this.pqrsForm.controls['paisNotificacion'].enable();
      this.pqrsForm.controls['departamentoNotificacion'].enable();
      this.pqrsForm.controls['ciudadNotificacion'].enable();
    }

    if(value == '2'){
      this.titleName = 'Razón social';
    }else {
      this.titleName = 'Nombres y Apellidos';
    }
  }

  autorizaChange(event: any){
    console.log({"mensaje": event});
    if(event.checked == true){
      this.messageAutoriza = 'SI';
      this.pqrsForm.controls['tipoNotificacion'].setValue('1');
    } else {
      this.messageAutoriza = 'NO';
      this.pqrsForm.controls['tipoNotificacion'].setValue('2');
    }
  }

  submitFormReceive(): void {
    // Verificaciones previas, como la de anexos y la aceptación de la política.
    this.pqrsForm.markAllAsTouched()
    const cuentaConAnexos = this.pqrsForm.get('cuentaConAnexos').value;
    let anexos = this.pqrsForm.get('anexos').value;
    if (cuentaConAnexos && (!anexos || anexos.length === 0)) {
      this.toastSvc.open({
        title: 'Error',
        description: 'Se ha seleccionado la opción de anexos pero no se encuentran archivos adjuntos, por favor validar.',
        success: false
      });
      return; // Detener la ejecución si no se cumplen los criterios
    }

    if(this.pqrsForm.invalid){
      this.toastSvc.open({
        title: 'Error',
        description: 'Debe completar campos los obligatorios correctamente',
        success: false
      });
      return;
    }

    const aceptaTratamientoDatos = this.pqrsForm.get('tratamientoDatos').value;
    if (aceptaTratamientoDatos !== true) {
      this.toastSvc.open({
        title: 'Error',
        description: 'Debe aceptar la política de tratamiento de datos para continuar.',
        success: false
      });
      return; // Detener la ejecución si no se acepta la política
    }

    let email = this.pqrsForm.get('email').value;

    if(email == '' || email == null){
      email = 'anominous@mail.com';
    }

    let direcionRecidencia = this.pqrsForm.get('direccionResidencia').value;
    if(direcionRecidencia == '' || direcionRecidencia == null){
      direcionRecidencia = 'anominous address';
    }

    let direccionNotificacion = this.pqrsForm.get('direccionNotificacion').value;

    if(direccionNotificacion == '' || direccionNotificacion == null){
      direccionNotificacion = 'anominous address';
    }

    if(anexos == null) {
      anexos = 0;
    }

    let NumCuentaContrato: number = this.pqrsForm.get('numeroCuentaContrato').value;

    if(NumCuentaContrato == null){
      NumCuentaContrato = 0;
    }

    let tipoIdentificacion: number = +this.pqrsForm.get('tipoIdentificacion').value;
    let numeroDocumento = this.pqrsForm.get('numeroDocumento').value + '';
    
    let nombres = this.pqrsForm.get('nombresApellidos').value;
    let telefonoCelular: string = this.pqrsForm.get('telefonoCelular').value;
    let telefonoFijo: string = this.pqrsForm.get('telefonoFijo').value;
    let pais: number = +this.pqrsForm.get('paisResidencia').value;
    let depatamento: number = +this.pqrsForm.get('departamentoResidencia').value;
    let municipio: number = +this.pqrsForm.get('ciudadResidencia').value;
    let tipoNotificacion: number = +this.pqrsForm.get('tipoNotificacion').value;
    email = email;
    direccionNotificacion = direccionNotificacion;
    let paisNotificacion: number = +this.pqrsForm.get('paisNotificacion').value;
    let depatamentoNotificacion: number = +this.pqrsForm.get('departamentoNotificacion').value;
    let municipioNotificacion: number = +this.pqrsForm.get('ciudadNotificacion').value;
    

    let tipoPersona: number = +this.pqrsForm.get('tipoPersona').value;

    if(tipoPersona == 3){
      tipoIdentificacion = +0;
      numeroDocumento = '0';
      NumCuentaContrato = +0;
      nombres = 'anominous';
      telefonoCelular = '0';
      telefonoFijo = '0';
      direcionRecidencia = 'anominous address';
      pais = +1;
      depatamento = +1;
      municipio = +1;
      tipoNotificacion = +0;
      email = email;
      direccionNotificacion = direccionNotificacion;
      paisNotificacion = +1;
      depatamentoNotificacion = +1;
      municipioNotificacion = +1;
    }

    let formData = {
      "tipoSolicitud": this.pqrsForm.get('tipoSolicitudId').value + 0,
      "NumCuentaContrato": NumCuentaContrato,
      "tipoPersona": tipoPersona,
      "tipoIdentificacion": tipoIdentificacion,
      "numeroDocumento": numeroDocumento,
      "nombres": nombres,
      "telefonoCelular": telefonoCelular,
      "telefonoFijo": telefonoFijo,
      "direcionRecidencia": direcionRecidencia,
      "pais": pais,
      "depatamento": depatamento,
      "municipio": municipio,
      "tipoNotificacion": tipoNotificacion,
      "email": email,
      "direccionNotificacion": direccionNotificacion,
      "paisNotificacion": paisNotificacion,
      "depatamentoNotificacion": depatamentoNotificacion,
      "municipioNotificacion": municipioNotificacion,
      "hechos": this.pqrsForm.get('hechos').value,
      "pretenciones": this.pqrsForm.get('pretensiones').value,
      "anexos": anexos.toString()
    }

    let request = {
      "files[]": this.archivosSubidos,
      "json_data" : JSON.stringify(formData)
    }

    this.http.post(this.ruoteService, request, {
        reportProgress: true,
        //observe: 'events',
        headers: new HttpHeaders({
            //'Authorization': 'Bearer ' + this.authorization,
        })
    }).subscribe(event => {

      if((typeof event['data'] !== undefined || typeof event['data']['exception'] !== undefined) && event['envioCorreo'] != true){
        this.toastSvc.open({
          title: 'Error',
          description: 'Ocurrio un error al crear el radicado',
          success: false
        });
        return; // Detener la ejecución si no se acepta la política
      }

      if(event) {
        this.modal.open(NotifyModalComponent, {
          title: 'Registro exitoso',
          description: 'Se genera radicado: ' + event['numeroRadicado'] + ' Fecha:  ' + event['fechaCreacion'] + ' Código de verificación: ' + event['codigoVerificacion'],
          data: {
            dataKey: '',
            void: function(){}
          }
        });
    
        // Resetear el formulario.
        localStorage.removeItem("pqrsForm");
        this.pqrsForm.reset();
        this.router.navigate(["/external-pqrs-main"]);
      }        
    }, error => {
        this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.error);
        //this.uploadProcess = false;
    });

    // Mostrar modal de notificación de registro exitoso.
    /*this.modal.open(NotifyModalComponent, {
      title: 'Registro exitoso',
      description: 'Se genera radicado E-2024-000000198 01/02/2024 13:34:55',
    });

    // Resetear el formulario.
    this.pqrsForm.reset();*/
  }


  // control de stepper
  nextStep(): void {
    const actualSteps = validateSteps[this.stepper.selectedIndex]
    const cantNextStep = !actualSteps.map(formControl => {
      this.pqrsForm.get(formControl).markAsTouched()
      if (this.pqrsForm.get(formControl).invalid)
        this.toastSvc.open({
          title: 'Valida que todos los campos esten completos',
          success: false
        })

      return this.pqrsForm.get(formControl)
    }).every(control => control.valid === true)
    if (!cantNextStep == true)
      this.stepper.next();
  }

  previousStep(): void {
    this.stepper.previous();
  }
  // control de stepper

  dataModal(): void {}

}

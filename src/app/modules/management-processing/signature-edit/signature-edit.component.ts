import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { tableHeadersEdit } from './headers/headers-edit';
import { data } from '../signature-flow-generation/utils/table-headers';
import { catchError, forkJoin } from 'rxjs';
import { SigninService } from '../signin.service';
import { ModalService } from '@app/services/modal/modal.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowVisualizationModalComponent } from '../signature-flow-generation/flow-visualization-modal/flow-visualization-modal.component';
import { FlowForeignUserModalComponent } from '../signature-flow-generation/flow-foreign-user-modal/flow-foreign-user-modal.component';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { FlowForeignUserViewModalComponent } from '../signature-flow-generation/flow-foreign-user-view-modal/flow-foreign-user-view-modal.component';
import { DraggableTableCopyComponent } from '@app/modules/components/draggable-table-copy/draggable-table-copy.component';
import { SignatureEditService } from './signature-edit.service';

export interface IUsuarioFirmaTabla {
  nombreUsuario: string
  tipoUsuario: string
  actividad: string
  dependencia: string
  posicion: number
  idTipoFirma: string
  tipoFirma: string
  user_id: string
  tipo_participante_id: string
}


@Component({
  selector: 'app-signature-edit',
  templateUrl: './signature-edit.component.html',
  styleUrls: ['./signature-edit.component.css'],

})
export class SignatureEditComponent implements OnInit {

  breadcrumbOn = [
    { name: "Gestión y trámite", route: "/managementProcessing" },
  ];
  breadcrumbRouteActive = "Generación de flujo de firma";

  public headers = tableHeadersEdit;
  public userData = this.rest$.getUserData()
  public minimunDate = new Date();
  public currentUsers = [];
  public currentID = this.activatedRoute.snapshot.params['id']
  public arrayData = []; // Arreglo de los usuarios que enviamos a la tabla de edicion 

  formUsuarioExterno = new FormGroup({
    identificacionUsuarioExterno: new FormControl('', [Validators.pattern("^[0-9]+$"), Validators.required, Validators.minLength(8)])
  })

  submitUsuarioExterno() {

    if(this.form.get('tipoFirma').value && this.formUsuarioExterno.valid) {

      this.rest$.get
      (`api/flujo/usuarios/externos/busqueda?identificacion=${this.formUsuarioExterno.get('identificacionUsuarioExterno').value}`)
            .pipe(catchError((err) => {
        
              console.error(err)
              throw new Error
            }))
            .subscribe((response: any) => {
              if(response === null) {
                console.log(response)
                this.modal.openAction('Usuario no encontrado', 'Usuario no encontrado. ¿Desea registrarlo?', () => {
                  this.modal.open(FlowForeignUserModalComponent, {
                    userCI: this.formUsuarioExterno.get('identificacionUsuarioExterno')?.value
                  })
                })
              } else {

                this.toast.open({
                  title: 'Usuario encontrado',
                  description: 'Usuario externo encontrado exitosamente',
                  success: true,
                  duration: 3000
                })

              this.modal.open(FlowForeignUserViewModalComponent, {
                userData: response,
                method: () => {
                  this.sendForeignUser(response)
                  this.toast.open({title: 'Envio exitoso', success: true, duration: 2000})
                } ,
              })
              }
      })
    } else {
      this.toast.open({title: 'Número de identificación inválido', success: false, duration: 2000})
    }
  }

    sendForeignUser(response: any){
      const { tipoFirma, rol } = this.form.getRawValue()

      let tabIndex = this.signinService.getValueTabIndex();
      let group = this.signature$.sortedGroupedArraySubject.getValue();

      this.signature$.addUsuarioFirma({
        "name": response[0].nombre,
        "tipo_usuario": "Externo",
        "tipo_participante": (rol as any).nombre,
        "tipo_participante_id": (rol as any).id,
        "dependencia": "No posee",
        "posicion":  group[tabIndex].length + 1, 
        "tipoFrma": (tipoFirma as any).nombre,
        "idTipoFirma": (tipoFirma as any).id,
        "user_externos_id": response[0].id,
      
      }, tabIndex)

    }

  formFecha = this.fb.group({
    asunto:  [{
      value: null,
      disabled: true,
    }, Validators.required],
    proyector:  [{
      value: null,
      disabled: true,
    }, Validators.required],
    fechaLimite: ['', Validators.required],
  })

  form = this.fb.group({
    tipoUsuario: [{
      value: {},
    }, Validators.required],
    tipoFirma: [{
      value:'',
      disabled: true
    }, Validators.required],
    rol: [{
      value: null,
      disabled: true,
    }, Validators.required],
    usuario: ['', Validators.required],
    ordenFirma: [1, Validators.required],
  })

  public goBack() {
    this.modal.openAction('Confirmación', '¿Está seguro que desea cancelar el flujo de firma en curso?', () => {  
      this.router.navigate([`/signin`])
      })
  }

  public object = {
    "n": "",
    "nombreDeUsuario": "",
    "tipoDeUsuario": "",
    "actividad": "",
    "dependencia": "",
    "estado": "",
    "nOrdenDeFirma": "",
    "tipoDeOrden": "",
    "tipoDeFirma": "",
    "fechaDeFirma": ""
}



  listTypeUs = [
    {
      nombre: 'Interno',
      id: 1,
    },
    {
      nombre: 'Externo',
      id: 2,
    }
  ]



  public registros = this.signinService.getValue();

  lisTypeFirma;
  listRoles;
  listUsers;
  allUsers;
  listOrdFirma;

  public isUsuarioExterno = false; 

  dataConfig: any = ''

  constructor(
    private fb: FormBuilder,
    public signinService: SigninService,
    public modal: ModalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public rest$: RestService,
    public toast: ToastService,
    public signature$: SignatureEditService,
  ) { }

  selectedTabIndex = new FormControl(0);

  onTabChanged(event: MatTabChangeEvent): void {
    // Actualiza el índice seleccionado si es necesario
    this.selectedTabIndex.setValue(event.index);
    this.signinService.setValueTabIndex(event.index)
    console.log(this.signinService.getValueTabIndex())

  }

  addValidation = false;

  get selectedIndex(): number {
    return this.selectedTabIndex.value;
  }

  set selectedIndex(index: number) {
    this.selectedTabIndex.setValue(index);
  }

  isStepReady() {
    return this.signinService.getValue()[2].length > 0
  }

  getAllData() {
    return forkJoin([
      this.signinService.getEstados(), 
      this.signinService.getParticipantes(), 
      this.signinService.getTiposFirma()
                  ])
        .pipe(
      catchError((err) => {
        console.error(err)
        this.modal.openNotify('', 'Error en el fetch inicial', false).afterClosed().subscribe(res => this.router.navigate(['/signin']))
         throw new Error()
      })
    )
  }

  setCurrentIndex() {
  
}

  submit(index) {
    if(this.form.valid) {
      const { tipoFirma, rol, tipoUsuario, usuario } = this.form.getRawValue();

      let tabIndex = this.signinService.getValueTabIndex();
      let group = this.signature$.sortedGroupedArraySubject.getValue();

       this.signature$.addUsuarioFirma({
        "name": (usuario as any).user_detalle.nombreUserDetalles + ' ' + (usuario as any).user_detalle.apellidoUserDetalles,
        "tipo_usuario": (tipoUsuario as any).nombre,
        "tipo_participante": (rol as any).nombre,
        "dependencia": (usuario as any).dependencia.nombreGdTrdDependencia,
        "posicion": group[tabIndex].length + 1,
        "idTipoFirma": (tipoFirma as any).id,
        "tipoFrma": (tipoFirma as any).nombre,
        "user_id": (usuario as any).id,
        "tipo_participante_id": (rol as any).id, 
    }, tabIndex)

        this.resetForm()

        if(this.isStepReady()) {
          this.form.get('usuario').clearValidators()
        }

      } else {
        this.modal.openNotify('', 'Diligencia todos los campos obligatorios', false)
       
    } 
}

visualize() {
  this.modal.open(FlowVisualizationModalComponent, {
     
      revisores: this.signinService.plainSubArray(0),
      aprobadores: this.signinService.plainSubArray(1),
      aprobadoresFirmantes: this.signinService.plainSubArray(2),
    
  })
}

resetForm() {

  this.form.get('usuario').reset()

}

parseDateFromGet(date: string) {
    let dateSplited = date.split(' ')
    return `${dateSplited[0]}T${dateSplited[1]}`
}
  
parseDateToPut(date$: string) {
    const fechaConEspacio = date$.replace('T', ' ');
    return `${fechaConEspacio}`;
}


nextStep() {
    console.log(this.signature$.originalArraySubject.getValue())

    let body$ = this.signature$.originalArraySubject.getValue()

    let updatedBody = body$.map(item => {
      let userProperty = item.tipo_usuario === 'Interno' ? { "user_id": item.user_id } : { "user_externos_id": item.user_externos_id };
  
      return {
        "cg_tipo_firma_id": item.idTipoFirma,
        "sgc_participante_id": item.tipo_participante_id,
        "cg_estado_flujo_id": 1,
        "posicion": item.posicion,
        "coordenada": "{\"x\": 0, \"y\": 0}",
        "fecha_maxima_firma": this.parseDateToPut(this.formFecha.get('fechaLimite').value),
        ...userProperty  // Se agrega la propiedad adecuada (user_id o user_externos_id)
      };
    });

    console.log(updatedBody)

    this.modal.openAction('¿Está seguro de la acción a realizar?', '', () => {
      this.signature$.editSignature(this.currentID, updatedBody)
      .pipe(
        catchError((err) => {
          this.toast.open({title: 'Guardado fallido', duration: 3000, success: false})
          throw new Error(err)          
        })
      )
      .subscribe((res: any) => {
        this.modal.openNotify('Éxito', 'Guardado de información exitosoo', true).afterClosed().subscribe(res => this.router.navigate(['/signin']))
      })
    })

}
  ngOnInit(): void {
        this.rest$.get(`api/flujo/radicado/lista/mejorado?idRadicado=${this.currentID}`).pipe(
        ).subscribe(res => {
          let maximunDate = res.flujo_firma[0].fecha_maxima_firma;
          this.formFecha.get('fechaLimite').setValue(this.parseDateFromGet(maximunDate))
          this.minimunDate = maximunDate;

          let body = res.flujo_firma.map(item => {

            let userProperty = (item.tipo_usuario === "Interno") ? { "user_id": item.usuario.id } : { "user_externos_id": item.id };
            let secondUserProperty = (item.tipo_usuario === "Interno") ? { "id": item.usuario.id } : { "id": item.id };
            let nameProperty = (item.tipo_usuario === "Interno") ? { "name": item.usuario.user_detalle.full_name } : { "name": item.usuario.nombre };

            return {
              ...item, 
              idTipoFirma: item.tipoFrma_id,
              ...userProperty,
              ...nameProperty,
              ...secondUserProperty
              
            }
          })
          this.signature$.setInitialArray(body);
        })


// Escuchamos los cambios de los registros en el servicio para actualizar

this.signinService.registrosUsuarios$.subscribe((newUsers) => {
  this.registros = newUsers;
})


this.form.get('tipoUsuario').valueChanges.subscribe((response: {nombre: any, id: number}) => {

  let control = this.form.get('usuario');

  if(response.id !== 1) {
    control?.setValue('')
    control.disable()
    this.addValidation = true;
    return;
  }

  control.enable()
  this.addValidation = false;


})

// Esto para recordar los valores del primer formulario. Asi cuando avanzas al segundo y regresas al primero, tendrás los datos cargados
    const value = this.signinService.getValue();
    if (value && value.length > 0) {
      this.registros = value;
    }

    // Se hacen todas las peticiones iniciales para alimentar los select de las maquetas
    this.getAllData().subscribe(([respuestaEstado, respuestaParticipantes, respuestaTiposFirmas]) => {

      this.lisTypeFirma = respuestaTiposFirmas;
      this.form.get('tipoFirma').setValue(this.lisTypeFirma[0])
      this.listRoles = respuestaParticipantes;

 
      this.form.get('rol').setValue(this.listRoles[this.selectedTabIndex.value])


// Logica para mantener que siempre el tipo de firma sea electronica mientras no sea un usuario interno aprobador y firmante
      this.form.get('rol')?.valueChanges.subscribe(newId => {
        if(newId.id !== 3) {
         this.form.get('tipoFirma').disable()
         this.form.get('tipoFirma').setValue(this.lisTypeFirma[0])
         
        } else {
          this.form.get('tipoFirma').enable()
        }
      })

// Logica para que el usuario externo siempre tenga tipo de firma electronica 

      this.form.get('tipoUsuario')?.setValue(this.listTypeUs[0])
      this.form.get('tipoUsuario')?.valueChanges.subscribe((newValue: any) => {
        if(newValue.id !== 1) {
          this.form.get('tipoFirma').setValue(this.lisTypeFirma[0])
          this.form.get('tipoFirma').disable()
        }
      })

// .

      this.formFecha.get('proyector').setValue(this.rest$.getUserData().nombre)


      this.signinService.getUsuarios(`${this.selectedTabIndex.value + 1}`).subscribe((response: any) => {
  
        // const nombresExistentes = this.signinService.userNamesOfCurrentGroup()
        this.allUsers = response;
        this.listUsers = response;
        
      })

    })

    // Aqui filtramos los usuarios de la lista de usuarios para que no se repitan sin haber cambiado la tab

    this.signinService.registrosUsuarios$.subscribe(newValue => {
      const nombresExistentes = this.signinService.userNamesOfCurrentGroup()
      this.listUsers = this.allUsers?.filter((user: any) => !nombresExistentes?.includes(user?.user_detalle.full_name));
    
    })


// Aqui actualizamos el campo de rol cada vez que cambia el index de la tab y filtramos los datos cada vez que cambia la tab

    this.selectedTabIndex.valueChanges.subscribe((value: any) => {
      this.form.get('usuario').setValue('')
      this.signinService.getUsuarios(value + 1).subscribe((response: any) => {
        

        this.listUsers = response;

        let collection = this.signinService.getValue()[value];

      })
      this.form.get('rol').setValue(this.listRoles[value])
    })


    this.form.get('tipoUsuario').valueChanges.subscribe((newValue:any) => {
      if(newValue.id == 2) {
        this.isUsuarioExterno = true;

      } else {
        this.isUsuarioExterno = false
        this.form.get('usuario').enable()
      }
    })

    
  }

  public isError(FormGroup: FormGroup, controlName: string, errorName: string): boolean {
    const control = FormGroup.get(controlName) as FormControl;

    return control?.errors?.[errorName];
  }

}

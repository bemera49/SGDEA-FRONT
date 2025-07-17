import { Component, Inject, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { TrdVersionAdministrationService } from '../../../services/trd/trd-version-administration.service';
import { formatDate } from '@angular/common';
import { ToastService } from '../../../services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-doc-manag-version-trd-create',
  templateUrl: './doc-manag-version-trd-create.component.html',
  styleUrls: ['./doc-manag-version-trd-create.component.css']
})
export class DocManagVersionTrdCreateComponent implements OnInit {

  // Ruta a redirigir
  redirectionPath = '/documentManagement/dependencies-index';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión documental', 'route': '/documentManagement' },
    { 'name': 'Versionamiendo TRD', 'route': this.redirectionPath }
  ];

  breadcrumbRouteActive = 'Crear'; // i18n

  // Variables para el boton flotante
  iconMenu: string = 'save';


  // Migrations
  migrations:any[] =[];

  // Form declaration

  public form = this.fb.group({
    nameVersion:[null, [Validators.required, Validators.maxLength(255)]],
    instrumentType:[null, [Validators.required, Validators.maxLength(100)]],
    applicationInitDate:[null, [Validators.required]],
    applicationFinalDate:[null],
    approvementDate:[null, [Validators.required]],
    approvementAct:[null],
    adoptionDate:[null],
    adoptionAct:[null],
    status:[null]
  },
  )

  //
  versionId:any ;
  modalOpen:boolean = false;
  public alertMsg:string = '';
  constructor(private router:Router,  private modalSvc:ModalService, private trdVersionAdminSvc:TrdVersionAdministrationService,  private fb: FormBuilder, private  toastSvc:ToastService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}:any) => {
      this.versionId = id;
      if (this.versionId === undefined) {
          this.form.controls['status'].setValue('Borrador')
          this.form.controls['status'].disable({onlySelf: true, emitEvent: false});
          this.form.controls['applicationFinalDate'].disable({onlySelf: true, emitEvent: false});
          this.form.controls['approvementAct'].disable({onlySelf: true, emitEvent: false});
          this.form.controls['adoptionDate'].disable({onlySelf: true, emitEvent: false});
          this.form.controls['adoptionAct'].disable({onlySelf: true, emitEvent: false});
      } else {
        this.getTrdVersion();
      }

    });
    this.updateValidators(); // Llamar a la función para aplicar los validadores iniciales
  };


  save(){
    this.form.markAllAsTouched();
    if ( this.versionId !== undefined) {
      this.confirmUpdate();

    } else {
      this.newTrdVersion();
    }
  }

  confirmDelete(){
    this.modalOpen = true;
    this.modalSvc.openAction("", "¿Está seguro que desea eliminar la Tabla de Retención Documental, recuerda que adicionalmente se podrán eliminar tablas de retención documental que no tengan expedientes asociados?", () => { this.deleteTrdVersion() })
    this.modalOpen = false;
  };

  confirmUpdate(){
    if (this.form.valid ) {
      if (this.form.controls['status'].value === 'Activa' ) {
        this.alertMsg = '!Recuerde que para aprobar una nueva versión de Tabla de Retención Documental usted debe registrar la siguiente información: fecha de aprobación, acto administrativo de aprobación, Fecha de adopción, acto administrativo de adopción. Una vez realizada la activación no se podran modificar las Oficinas Productoras, Series / Subseries o tipologías documentales'
      } else if (this.form.controls['status'].value === 'Inactiva') {
        this.alertMsg = '¡Recuerde que para inactivar una nueva versión de Tabla de Retención Documental usted debe registrar la siguiente información: Fecha final de aplicación!'
      } else {
          this.alertMsg = '¿Está seguro que desea editar la tabla de retención documental?'
      } {
      }
      this.modalOpen = true;
      this.modalSvc.openAction("",  this.alertMsg, () => { this.updateTrdVersion() })
      this.modalOpen = false;
    } else {
      this.toastSvc.open({
        description: 'La fecha final de aplicacion debe ser mayor a la de inicio',
        success: false,
        duration: 3000,
        title: 'Revisa los campos'
      })
    }
  };

  deleteTrdVersion(){
    const data = {
      id: Number(this.versionId)
    };
    this.trdVersionAdminSvc.deleteTrdVersion(data)
      .subscribe({
        error:(err:any) => {
          this.toastSvc.open({
            description: err.error.message,
            success: false,
            duration: 3000,
            title: ''
          })
        },
        next:(resp:any) => {
          this.router.navigateByUrl('/documentManagement/version-trd-create');
          this.form.controls['status'].setValue(null);
          this.form.controls['nameVersion'].setValue(null);
          this.form.controls['instrumentType'].setValue(null);
          this.form.controls['applicationInitDate'].setValue(null);
          this.form.controls['applicationFinalDate'].setValue(null);
          this.form.controls['approvementDate'].setValue(null);
          this.form.controls['approvementAct'].setValue(null);
          this.form.controls['adoptionDate'].setValue(null);
          this.form.controls['adoptionAct'].setValue(null);
          this.toastSvc.open({
            description: resp.message,
            success: false,
            duration: 3000,
            title: ''
          });
          this.router.navigateByUrl('/documentManagement/version-trd-index')

        }
      });
  };

  updateTrdVersion(){
    const data = {
      "id": this.versionId,
      "version_nombre": this.form.controls['nameVersion'].value,
      "tipo_instrumento": this.form.controls['instrumentType'].value,
      "fecha_aprobacion": formatDate(this.form.controls['approvementDate'].value, 'yyyy-MM-dd', 'en-US'),
      "fecha_inicio_aplicacion": this.form.controls['applicationInitDate'].value !== null ? formatDate(this.form.controls['applicationInitDate'].value, 'yyyy-MM-dd', 'en-US') : null,
      "fecha_final_aplicacion": this.form.controls['applicationFinalDate'].value !== null ? formatDate(this.form.controls['applicationFinalDate'].value, 'yyyy-MM-dd', 'en-US') : null,
      "fecha_adopcion": this.form.controls['adoptionDate'].value !== null ? formatDate(this.form.controls['adoptionDate'].value, 'yyyy-MM-dd', 'en-US') :null,
      "acto_aprobacion": this.form.controls['approvementAct'].value,
      "acto_adopcion": this.form.controls['adoptionAct'].value,
      "estado": this.form.controls['status'].value
    };

    this.trdVersionAdminSvc.updateTrdVersion(data)
          .subscribe({
            error:(err:any) => {
              this.toastSvc.open({
                description: err.error.errors,
                success: false,
                duration: 3000,
                title: err.error.message
              })
            },
            next:(resp:any) => {
              this.toastSvc.open({
                description: resp.message,
                success: false,
                duration: 3000,
              })
              this.router.navigateByUrl('/documentManagement/version-trd-index')

            }
          })
  };

  newTrdVersion(){
    if (this.form.valid) {
      const data = {
        "version_nombre": this.form.controls['nameVersion'].value,
        "tipo_instrumento": this.form.controls['instrumentType'].value,
        "fecha_aprobacion": formatDate(this.form.controls['approvementDate'].value, 'yyyy-MM-dd', 'en-US'),
        "fecha_inicio_aplicacion": formatDate(this.form.controls['applicationInitDate'].value, 'yyyy-MM-dd', 'en-US')
      };
      this.trdVersionAdminSvc.createTrdVersion(data)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.toastSvc.open({
              description: err.error.message,
              success: false,
              duration: 3000,
              title: 'Peticion fallida'
            })
          },
          next:(resp:any) => {
            this.form.get('status').setValue(resp.data.estado);
            console.log(this.form)
            this.toastSvc.open({
              description: resp.message,
              success: false,
              duration: 3000,
            });
            this.router.navigateByUrl('/documentManagement/version-trd-index')
          }
        })
    } else {
      this.toastSvc.open({
        description: 'Revisa los campos requeridos',
        success: false,
        duration: 3000,
        title: 'Peticion fallida'
      })
    }
  };


  getTrdVersion(){
    const data = {
      id: this.versionId
    }
    this.trdVersionAdminSvc.getTrdVersion(data)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.migrations  = resp.data.migraciones
              console.log(resp)
              this.form.controls['status'].setValue(resp.data.estado);
              this.form.controls['nameVersion'].setValue(resp.data.version_nombre);
              this.form.controls['instrumentType'].setValue(resp.data.tipo_instrumento);
              this.form.controls['applicationInitDate'].setValue(resp.data.fecha_inicio_aplicacion);
              this.form.controls['applicationFinalDate'].setValue(resp.data.fecha_final_aplicacion);
              this.form.controls['approvementDate'].setValue(resp.data.fecha_aprobacion);
              this.form.controls['approvementAct'].setValue(resp.data.acto_aprobacion);
              this.form.controls['adoptionDate'].setValue(resp.data.fecha_adopcion);
              this.form.controls['adoptionAct'].setValue(resp.data.acto_adopcion);
            }
          })
  };

  reloadData(event:any){
    if (event === true) {
      this.getTrdVersion();
    };
  };

  /**
 *
 * @param event
 * Cuando se hace clic en el botón se envia el formulario
 */
  menuPrimaryReceiveData(event) {
    let buttonSubmit = <HTMLFormElement>document.getElementById('sendForm');
    buttonSubmit.click();
  };

  updateValidators(): void {
    switch (this.form.controls['status'].value) {
      case 'Activa':
        console.log(this.form.get('approvementDate').addValidators([Validators.required]));
        this.form.get('approvementAct').addValidators([Validators.required]);
        this.form.get('adoptionDate').addValidators([Validators.required]);
        this.form.get('adoptionAct').addValidators([Validators.required]);
        this.form.get('applicationFinalDate').addValidators([Validators.required]);
        break;
      case 'Inactiva':
        this.form.get('approvementAct').clearValidators();
        this.form.get('adoptionDate').clearValidators();
        this.form.get('adoptionAct').clearValidators();
        this.form.get('applicationFinalDate').addValidators(Validators.required);
        break;
      case 'Borrador':
        this.form.get('approvementAct').clearValidators();
        this.form.get('adoptionDate').clearValidators();
        this.form.get('adoptionAct').clearValidators();
        this.form.get('applicationFinalDate').clearValidators();
        break;
    }
    this.form.get('approvementAct').updateValueAndValidity();
    this.form.get('adoptionDate').updateValueAndValidity();
    this.form.get('adoptionAct').updateValueAndValidity();
    this.form.get('applicationFinalDate').updateValueAndValidity();
  };

  // dateLessThanValidator() {
  //   console.log('hola entre')
  //   let date1Key = this.form.get('applicationInitDate')
  //   let date2Key = this.form.get('applicationFinalDate').value
  //   return (control: AbstractControl) => {
  //     const date1 = control.get(date1Key)?.value;
  //     const date2 = control.get(date2Key)?.value;

  //     console.log(new Date(date1) < new Date(date2) ? null :  true )
  //     if (!date1 || !date2) {
  //       return null; // Devolver null si alguna de las fechas no está definida
  //     }
  //     return new Date(date1) < new Date(date2) ? null : true
  //   };
  // }




  // Iconos del formulario
  @Input() initCardHeaderIcon = 'dns';
  @Input() initCardHeaderIconDatos = 'library_books';

}

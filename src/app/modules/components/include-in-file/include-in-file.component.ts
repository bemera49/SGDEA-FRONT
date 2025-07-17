/**

 */
import { AfterViewChecked, Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncryptService } from 'src/app/services/encrypt.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RestService } from 'src/app/services/rest.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

// List
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalRedirectComponent } from '../modal-redirect/modal-redirect.component';
import { dataTable } from '../table-exp/model/table';

export interface DialogData {
  eventClickButtonSelectedData: any;
}

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: 'app-include-in-file',
  template: '',
  styleUrls: ['./include-in-file.component.css']
})
export class IncludeInFileComponent implements OnInit {

  @Output() public closeIncludeInFileEmiter = new EventEmitter<any>(); // Data a retornar al initial list
  @Input() eventClickButtonSelectedData: any = [];

  widthDialog = '95%'; // Variable para dar tamaño al dialog

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.openDialog();
  }

  /** Metodo que abre el dialogo para digitar los filtros */
  openDialog() {

    const dialogRef = this.dialog.open(IncludeInFileDialog, {
      disableClose: false,
      width: this.widthDialog,
      data: {
        eventClickButtonSelectedData: this.eventClickButtonSelectedData,
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      let respuesta = res;
      if (!respuesta) {
        respuesta = { event: 'close', status: false, data: [] };
      }
      // console.log('Respuesta al cerrar el dialogo');
      // console.log(respuesta);
      this.closeComponent(respuesta);
    });
  }

  /*** Método para cerrar o destruir el componente desde el padre ***/
  closeComponent(respuesta) {
    this.closeIncludeInFileEmiter.emit(respuesta);
  }
}

@Component({
  selector: 'app-include-in-file-dialog',
  templateUrl: './include-in-file.component.html',
  styleUrls: ['./include-in-file.component.css']
})

export class IncludeInFileDialog implements OnInit, AfterViewChecked {

  public minDate: Date;
  public maxDate: Date;

  private toast = inject(ToastService);

  /**Variable del formulario */
  moduleForm: UntypedFormGroup;
  // Version api
  versionApi = environment.versionApiDefault;
  // Autentificacion
  authorization: string;

  // Variables se consumos de servicios
  resSerlistExpedientes: any; // Lista de expedientes
  resSerlistExpedientesErr: any; // Error en lista de expedientes

  // Variables para las listas
  listExpedientesInfo: any;
  listExpedientes: any;

  params: any = {}; // parametros que envia en un servici

  dependencia: ListaBusq[] = [];
  series: ListaBusq[] = [];
  metadatos: any;
  subSeries: ListaBusq[] = [];

  eventClickButtonSelectedData: any = []; // Data seleccionada
  textFormHeader: string = 'Incluir en expediente';
  initCardHeaderIcon = 'assignment_turned_in';
  botonSubmitIcon: string = 'check_circle_outline'; // Icono del boton

  /** slide-toggle  */
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  disabledSelect: boolean = true;
  statusCreateFolder: boolean = false; // Muestra el dialogo de crear expediente

  isNuevoExpediente: boolean = false;
  tittleSelectTipoExpeidiente = 'Nuevo expediente';
  messageSelectTipoExpeidiente = 'No';
  routeCreateFolder: string = '/documentManagement/folder-create';
  informacionNew = 'informacionNew';
  informacionUpdate = 'informacionUpdate';
  informacionMsg = this.informacionUpdate;

  /** lists filtered + namelist by search keyword */
  // Filtros de informacion
  filteredlistExpedientesInfo: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistExpedientes: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  /** Variables para traer el texto de confirmacion */
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;
  validateDuplicate = true; // Valida si el radicado se puede duplicar

  dataExp: dataTable[] = [];
  modalOpen: boolean = false;

  private ms = inject(ModalService);

  constructor(
    public dialogRef: MatDialogRef<IncludeInFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: UntypedFormBuilder,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    public lhs: LocalStorageService,
    private encryptService: EncryptService,
    private dialog: MatDialog,
    private router: Router

  ) {
    /**
    * Configuración del formulario
    */
    this.eventClickButtonSelectedData = this.data.eventClickButtonSelectedData;

    this.moduleForm = this.formBuilder.group({
      idFase: new UntypedFormControl(""),
      fechaInicial: new UntypedFormControl(""),
      fechaFinal: new UntypedFormControl(""),
      user: new UntypedFormControl(""),
      status: new UntypedFormControl(""),
      idGdTrdSubserie: new UntypedFormControl(""),
      idGdTrdDependencia: new UntypedFormControl(""),
      idGdTrdSerie: new UntypedFormControl(""),
      nombreGdExpediente: new UntypedFormControl(""),
      /*       nombreGdTrdSerie: new UntypedFormControl('', Validators.compose([
              // Validators.required,
            ])),
            nombreGdTrdSubserie: new UntypedFormControl('', Validators.compose([
              // Validators.required,
            ])),
            numeroExpediente: new UntypedFormControl('', Validators.compose([
              // Validators.required,
            ])),
 */
      archivado: new UntypedFormControl(null, Validators.compose([
        // Validators.required,
      ])),
      newFile: new UntypedFormControl(false, Validators.compose([
        // Validators.required,
      ])),
      idExpediente: new UntypedFormControl('', Validators.compose([
        Validators.required,
      ])),
      listExpedientesFilter: new UntypedFormControl('', Validators.compose([
        // Validators.required,
      ])),
    });

  }

  ngOnInit() {

    // Hace el llamado del token
    this.getTokenLS();

    this.moduleForm.controls['listExpedientesFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks('listExpedientes');
      });
  }

  /** Función que procesa solo los parámetros que se van a enviar por GET */
  proccessData(data) {
    //sguarin
    //return data;
    return new Promise((resolve) => {
      let dataList = [];
      data.forEach(element => {
        dataList.push({
          id: element.id,
          archivado: element.archivado
        });
      });
      resolve(dataList);
    });
  }

  /**
   * Función que genera la URL para la creación de un expediente
   * Se encriptan los radicados seleccionados para pasarlos por el método GET
   */
  generateUrl() {
    this.proccessData(this.eventClickButtonSelectedData).then((res) => {
      let params = res;
      let paramsEncrypt = this.encryptService.encryptAES(params, this.authorization, true);
      this.routeCreateFolder = this.routeCreateFolder + '/' + paramsEncrypt;
    });
  };

  ngAfterViewChecked() {
    $('.cdk-global-overlay-wrapper').css('z-index', '1000');
    $('.cdk-overlay-pane').css('overflow', 'auto');
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;

      /** Llamado de los servicios que necesitan el token */
      this.generateUrl();
      this.getListDependenciaAll();

    });
  }

  getListDependenciaAll(route = "gestionDocumental/trd-dependencias/dependencias-expedientes", params = {}) {
    this.restService.restGetParams(`${this.versionApi}${route}`, params, this.authorization).subscribe(
      (responseApi) => {
        this.globalAppService.resolveResponse(responseApi).then((responseGlobal) => {
          if (responseGlobal == true) {
            this.dependencia = responseApi.dataDependencias

            /*             this.filteredgdExpedientesDependencias.next(this.gdExpedientesDependencias.slice()); */
          }
        });
      },
      (err) => this.globalAppService.resolveResponseError(err)
    );
  }

  getMetaData(id: number): void {

    let params = {
      idGdTrdSerie: this.moduleForm.get('idGdTrdSerie').value,
      idGdTrdSubserie: id
    };



    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/serie-subserie-metadata", params, this.authorization)
      .subscribe(
        (meta) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(meta).then((res) => {
            if (res) {
              if (meta.status === 200 && meta.metadata.length > 0) {
                this.cargarMetadatos(meta.metadata);
              }

              if (meta.status === 200 && meta.metadata.length === 0) {
                this.eliminarMetaDatos(this.metadatos);
              }
            }
          });

        },
        (err) => {

          this.metadatos = [];
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        }
      );
  }

  removerMetadata(): void {
    if (this.metadatos !== undefined && this.metadatos.length > 0) {
      for (const metadata of this.metadatos) {
        this.moduleForm.removeControl(`metadata_${metadata.id}`);
      }
    }
  }


  eliminarMetaDatos(metadatos): void {
    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;
      this.moduleForm.removeControl(controlName);
    }
    this.metadatos = [];
  }

  setIdSubSerie(event): void {
    this.getMetaData(event);
    /* this.removerMetadata(); */
  }

  getSubSerie(event): void {

    let params = {
      idGdTrdSerie: event,
      idGdTrdDependencia: this.moduleForm.get('idGdTrdDependencia').value
    };


    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/subseries-list-by-serie", params, this.authorization)
      .subscribe(
        (subSerie) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(subSerie).then((res) => {
            if (res) {
              if (subSerie.status === 200) {
                this.subSeries = subSerie.data

              }
            }
          });

          if (subSerie.status === 322) {
            this.subSeries = [];
          }

        },
        (err) => {

          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        }
      );
  }

  getListSeriesId(event: Event): void {

    let data = {
      idGdTrdDependencia: event
    }

    this.restService.restGetParams(this.versionApi
      + "gestionDocumental/expedientes/series-list-by-dependencia", data, this.authorization).subscribe(
        (serie) => {
          /* this.series = data; */
          this.globalAppService.resolveResponse(serie).then((res) => {
            if (res && serie.status === 200) {
              this.series = serie.data;
            }
          });

          if (serie.status === 322) {
            this.series = [];
          }
        },
        (err) => {

          /* this.resSerlistSeriesErr = err; */
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        }
      )

  }


  onConfirm(): void {

    if (this.moduleForm.controls['archivado'].value == null) {
      this.dialogRef.close({ event: 'close', status: true, data: this.moduleForm.value });
    } else {

      this.globalAppService.text18nGet().then((res) => {
        this.resSerLenguage = res;
        // console.log( this.resSerLenguage );
        this.titleMsg = this.resSerLenguage['validarExpedienteArchivado'];
        this.textMsg = this.resSerLenguage['msgexpedienteArchivado'];
        let textAceptar = this.resSerLenguage['btnConfirmar'];
        let textCancelar = this.resSerLenguage['Cancelar'];

        swal({
          title: this.titleMsg,
          text: this.textMsg,
          type: 'success',
          showCancelButton: true,
          cancelButtonText: textCancelar,
          confirmButtonText: textAceptar,
          cancelButtonClass: 'btn btn-danger',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        }).then((result) => {

          // // Entra a dupliar el radicado por confirmación del usuario
          if (result.value) {

            this.dialogRef.close({ event: 'close', status: true, data: this.moduleForm.value });
          }

        });

      });

    }
  }

  submitForm() {

    if (this.moduleForm.valid) {
      const refDialog = this.dialog.open(ModalConfirmComponent, {
        data: {
          title: '¿Está seguro que desea incluir el documento en el expediente seleccionado?'
        }
      })

      refDialog.afterClosed().subscribe(res => {
        if (res) {
          this.onConfirm()
        } else {
          this.toast.open({
            title: 'Cancelación exitosa'
          })
        }
      })


    } else {
      this.sweetAlertService.sweetInfo('Error al diligenciar, por favor verifique e intente nuevamente', '');
    }
  }

  closeDialog() {
    this.statusCreateFolder = false; // Dejar modal como oculto
    this.dialogRef.close({ event: 'close', status: false, data: [] });
  }

  openDialogFolder() {
    this.statusCreateFolder = true; // Abre el dialogo de crear expediente
  }

  MatSlideToggleChange(event) {

    if (event.checked) {

      this.moduleForm.controls['idExpediente'].setValue(null);
      this.moduleForm.controls['status'].setValidators([Validators.required]);
      this.moduleForm.controls['idFase'].setValidators([Validators.required]);
      this.moduleForm.controls['fechaInicial'].setValidators([Validators.required]);
      this.moduleForm.controls['fechaFinal'].setValidators([Validators.required]);
      this.moduleForm.controls['user'].setValidators([Validators.required]);
      this.moduleForm.controls['estadoGdExpediente'].setValidators([Validators.required]);
      this.moduleForm.controls['idGdTrdDependencia'].setValidators([Validators.required]);
      this.moduleForm.controls['idGdTrdSubserie'].setValidators([Validators.required]);

      this.moduleForm.controls['idGdTrdSerie'].setValidators([Validators.required]);
      this.moduleForm.controls['numeroExpediente'].setValidators([Validators.required]);
      this.moduleForm.controls['archivado'].setValidators([Validators.required]);
      this.moduleForm.controls['nombreExpediente'].setValidators([Validators.required]);
      this.moduleForm.controls['nombreGdTrdSerie'].setValidators([Validators.required]);
      this.moduleForm.controls['nombreGdTrdSubserie'].setValidators([Validators.required]);
      this.moduleForm.controls['idExpediente'].clearValidators();

      this.moduleForm.controls['numeroExpediente'].updateValueAndValidity();
      this.moduleForm.controls['archivado'].updateValueAndValidity();
      this.moduleForm.controls['nombreExpediente'].updateValueAndValidity();
      this.moduleForm.controls['nombreGdTrdSerie'].updateValueAndValidity();;
      this.moduleForm.controls['nombreGdTrdSubserie'].updateValueAndValidity();;
      this.moduleForm.controls['idExpediente'].updateValueAndValidity();

      this.isNuevoExpediente = true;
      this.messageSelectTipoExpeidiente = 'Si';
      this.informacionMsg = this.informacionNew;

    } else {

      this.moduleForm.controls['numeroExpediente'].clearValidators();
      this.moduleForm.controls['archivado'].clearValidators();
      this.moduleForm.controls['nombreExpediente'].clearValidators();
      this.moduleForm.controls['nombreGdTrdSerie'].clearValidators();
      this.moduleForm.controls['nombreGdTrdSubserie'].clearValidators();
      this.moduleForm.controls['idExpediente'].setValidators([Validators.required]);

      this.moduleForm.controls['numeroExpediente'].updateValueAndValidity();
      this.moduleForm.controls['archivado'].updateValueAndValidity();
      this.moduleForm.controls['nombreExpediente'].updateValueAndValidity();
      this.moduleForm.controls['nombreGdTrdSerie'].updateValueAndValidity();
      this.moduleForm.controls['nombreGdTrdSubserie'].updateValueAndValidity();
      this.moduleForm.controls['idExpediente'].updateValueAndValidity();

      this.isNuevoExpediente = false;
      this.messageSelectTipoExpeidiente = 'No';
      this.informacionMsg = this.informacionUpdate;

    }
  }


  formatearFecha(date) {
    if (date) {

      if (date._d instanceof Date) {
        const dateObj = new Date(date._d);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript son base 0
        const day = dateObj.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    }
    return "";

  }


  // Consultar Expedientes cuando se da click en la lupa
  searchExpedientes() {

    this.sweetAlertService.sweetLoading();

    let params = {
      fechaInicial: this.moduleForm.get('fechaInicial').value,
      fechaFinal: this.moduleForm.get('fechaFinal').value,
      user: this.moduleForm.controls['user'].value,
      status: this.moduleForm.controls['status'].value,
      /*   estadoGdExpediente: this.moduleForm.controls['estadoGdExpediente'].value, */
      idGdTrdSubserie: this.moduleForm.controls['idGdTrdSubserie'].value,
      idGdTrdSerie: this.moduleForm.controls['idGdTrdSerie'].value,
      idGdTrdDependencia: this.moduleForm.controls['idGdTrdDependencia'].value,
      /* numeroExpediente: this.moduleForm.controls['numeroExpediente'].value, */
      idFase: this.moduleForm.controls['idFase'].value,
      nombreGdExpediente: this.moduleForm.controls['nombreGdExpediente'].value,
      /*       nombreGdTrdSerie: this.moduleForm.controls['nombreGdTrdSerie'].value,
            nombreGdTrdSubserie: this.moduleForm.controls['nombreGdTrdSubserie'].value, */
    };

    this.checkDates(this.moduleForm.controls['fechaInicial'].value, this.moduleForm.controls['fechaFinal'].value)

    if (this.metadatos !== undefined && this.metadatos.length > 0) {
      this.metadatos.forEach(meta => {
        const value = this.moduleForm.get(`metadata_${meta.id}`).value;
        params[`metadata_${meta.id}`] = value;
      })
    }


    this.restService.restGetParams(this.versionApi + 'gestionDocumental/expedientes/index-list', params, this.authorization).subscribe(
      (data) => {
        this.resSerlistExpedientes = data;
        // Evaluar respuesta del servicio

        /* this.globalAppService.resolveResponse(this.resSerlistExpedientes).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {
          
          }
        }); */


        let listExpetientesRes = this.resSerlistExpedientes.data;

        this.dataExp = data.data

        this.listExpedientes = [];

        listExpetientesRes.forEach(element => {
          this.listExpedientes.push({
            id: element.idGdExpediente,
            val: element.numeroGdExpediente + ' - ' + element.nombreGdExpediente,
            archivado: element.archivado,

          });
        });
        this.filteredlistExpedientes.next(this.listExpedientes.slice());
        this.moduleForm.controls['idExpediente'].enable();

        this.sweetAlertService.sweetClose();


      }, (err) => {
        if (err.status === 404) {

          const refDialog = this.dialog.open(ModalRedirectComponent, {
            data: {
              title: 'No se encontraron expedientes con los criterios seleccionados, ¿Desea crear un expediente?'
            }
          })

          refDialog.afterClosed().subscribe(res => {
            if (res) {
              this.onRedirect();
              this.closeDialog();
            }
          })

        }
        this.sweetAlertService.sweetClose();


        // this.resSerlistExpedientesErr = err;
        // Evaluar respuesta de error del servicio
        //this.globalAppService.resolveResponseError(this.resSerlistExpedientesErr).then((res) => { });
      }
    );

  }

  onRedirect(): void {
    this.router.navigate(['/documentManagement/folder-create'])
  }

  reset(): void {
    this.moduleForm.reset();
    this.moduleForm.get('fechaInicial').reset("");
    this.moduleForm.get('fechaFinal').reset("");
    /*     fechaInicial: new UntypedFormControl(""),
        fechaFinal: */
    this.removerMetadata();
    this.metadatos = [];
  }

  //Ejecutor cuando se presiona el boton de submit que lo llamo en mi html y lo que hace
  //es asignar mi consulta de archivado que viene en mi back y lo asigna a mi variable archivado
  //de mi front
  onChangeExp(expedienteId: any) {
    this.moduleForm.controls['idExpediente'].setValue(expedienteId);
    const expediente = this.dataExp.find(exp => exp.idGdExpediente === expedienteId);
    //console.log('archivado', expediente.archivado)
    if (expediente) {
      this.moduleForm.controls['archivado'].setValue(expediente.archivado);
    }
  }

  /**
   * Recibe el nombre de la lista para realizar la busqueda segun el filtro
   * @param nomList nombre lista
   */
  filterBanks(nomList) {
    if (!this[nomList]) {
      return;
    }
    // get the search keyword
    let search = this.moduleForm.controls[nomList + 'Filter'].value;
    if (!search) {
      this['filtered' + nomList].next(this[nomList].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this['filtered' + nomList].next(
      this[nomList].filter(listOption => listOption.val.toLowerCase().indexOf(search) > -1)
    );
  }

  selectExpediente(expedienteId: any) {
    // Handle selection of expediente
    // You can assign the selected expedienteId to your form control or do any necessary action
  }


  cargarMetadatos(metadatos) {
    this.metadatos = metadatos;

    for (const metadata of metadatos) {
      const controlName = `metadata_${metadata.id}`;
      this.moduleForm.addControl(
        controlName,
        new UntypedFormControl('', [
          Validators.maxLength(250)
        ])
      );
    }
  }


  checkDates(startDate: string, endDate: string): void {

    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);



    if (startDate && endDate) {
      if (end.getDate() > currentDate.getDate() || end.getFullYear() > currentDate.getFullYear() || end.getMonth() > currentDate.getMonth()) {
        this.toast.open({
          title: '067',
          description: 'El rango de fechas seleccionado no es válido.'
        });
      }


      if (start > end) {
        this.toast.open({
          title: '067',
          description: 'El rango de fechas seleccionado no es válido.'
        });
      }


      if (end < start) {
        this.toast.open({
          title: '067',
          description: 'El rango de fechas seleccionado no es válido.'
        });
      }


    }

    if (start > currentDate) {
      this.toast.open({
        title: '067',
        description: 'El rango de fechas seleccionado no es válido.'
      });
    }


  }


}

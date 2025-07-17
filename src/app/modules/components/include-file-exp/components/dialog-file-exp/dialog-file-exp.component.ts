import { Component, Inject, inject, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmComponent } from '@app/modules/components/modal-confirm/modal-confirm.component';
import { dataTable } from '@app/modules/components/table-exp/model/table';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
export interface DialogData {
  eventClickButtonSelectedData: any;
  confirmTitle: any
}
export interface ListaBusq {
  id: string;
  val: string;
}
@Component({
  selector: 'app-dialog-file-exp',
  templateUrl: './dialog-file-exp.component.html',
  styleUrls: ['./dialog-file-exp.component.css']
})
export class DialogFileExpComponent implements OnInit {

  public confirmTitle: string;

  private formBuilder = inject(UntypedFormBuilder);
  private dialog = inject(MatDialog);
  private globalAppService = inject(GlobalAppService);
  private toast = inject(ToastService);
  public minDate: Date;
  public maxDate: Date;

  versionApi = environment.versionApiDefault;
  titleMsg: string;
  textMsg: string;
  bntCancelar: string;
  btnConfirmacion: string;
  resSerLenguage: any;
  validateDuplicate = true; // Valida si el radicado se puede duplicar

  dataExp: dataTable[] = [];
  modalOpen: boolean = false;
  params: any = {}; // parametros que envia en un servici

  dependencia: ListaBusq[] = [];
  series: ListaBusq[] = [];
  metadatos: any;
  subSeries: ListaBusq[] = [];


  isNuevoExpediente: boolean = false;
  tittleSelectTipoExpeidiente = 'Nuevo expediente';
  messageSelectTipoExpeidiente = 'No';
  routeCreateFolder: string = '/documentManagement/folder-create';
  informacionNew = 'informacionNew';
  informacionUpdate = 'informacionUpdate';
  informacionMsg = this.informacionUpdate;
  authorization = "";
  eventClickButtonSelectedData: any = []; // Data seleccionada
  textFormHeader: string = 'Incluir en expediente';
  initCardHeaderIcon = 'assignment_turned_in';
  botonSubmitIcon: string = 'check_circle_outline'; // Icono del boton


  constructor(
    public dialogRef: MatDialogRef<DialogFileExpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public sweetAlertService: SweetAlertService,
    public lhs: LocalStorageService,
    public restService: RestService,
  ) {
    console.log('data aaaaaaaaaaaaaaaaaaaa',data)
    this.confirmTitle = data.confirmTitle;
  }

  moduleForm = this.formBuilder.group({
    idFase: new UntypedFormControl(""),
    fechaInicial: new UntypedFormControl(""),
    fechaFinal: new UntypedFormControl(""),
    user: new UntypedFormControl(""),
    status: new UntypedFormControl(""),
    idGdTrdSubserie: new UntypedFormControl(""),
    idGdTrdDependencia: new UntypedFormControl(""),
    idGdTrdSerie: new UntypedFormControl(""),
    nombreGdExpediente: new UntypedFormControl(""),
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


  ngOnInit() {

    // Hace el llamado del token
    this.getTokenLS();


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
  closeDialog() {
    this.dialogRef.close({ event: 'close', status: false, data: [] });
  }

  submitForm() {
    if (this.moduleForm.valid) {
      const refDialog = this.dialog.open(ModalConfirmComponent, {
        data: {
          title: this.confirmTitle
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

  /*   ngAfterViewChecked() {
      $('.cdk-global-overlay-wrapper').css('z-index', '1000');
      $('.cdk-overlay-pane').css('overflow', 'auto');
    } */

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;

      /** Llamado de los servicios que necesitan el token */

      this.getListDependenciaAll();

    });
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

  getListDependenciaAll(route = "gestionDocumental/trd-dependencias/dependencias", params = {}) {
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


  getSubSerie(id: number): void {
    let data = {
      id
    };

    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/subseries-list", data, this.authorization)
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

  getMetaData(id: number): void {

    let data = {
      idGdTrdSerie: id
    };

    this.restService
      .restGetParams(this.versionApi + "gestionDocumental/expedientes/serie-metadata", data, this.authorization)
      .subscribe(
        (meta) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(meta).then((res) => {
            if (res) {
              if (meta.status === 200 && meta.metadata.length > 0) {
                this.cargarMetadatos(meta.metadata);
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


  removerMetadata(): void {
    if (this.metadatos !== undefined && this.metadatos.length > 0) {
      for (const metadata of this.metadatos) {
        this.moduleForm.removeControl(`metadata_${metadata.id}`);
      }
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


  setIdSeries(event): void {
    this.getMetaData(event);
    this.getSubSerie(event);
    this.removerMetadata();

  }

  // Consultar Expedientes cuando se da click en la lupa
  searchExpedientes() {

    this.sweetAlertService.sweetLoading();

    let params = {
      fechaInicial: this.formatearFecha(this.moduleForm.get('fechaInicial').value),
      fechaFinal: this.formatearFecha(this.moduleForm.get('fechaFinal').value),
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

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {

            //console.log('expedientes', data);


            this.dataExp = data.data


            this.sweetAlertService.sweetClose();
          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      }
    );

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


  checkDates(startDate: string, endDate: string): void {

    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log('DATE COMPARACION', currentDate < end)

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

    if (end > currentDate) {
      this.toast.open({
        title: '067',
        description: 'El rango de fechas seleccionado no es válido.'
      });
    }

  }

}

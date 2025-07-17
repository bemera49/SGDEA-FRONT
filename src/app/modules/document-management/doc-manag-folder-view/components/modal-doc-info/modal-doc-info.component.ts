import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { EncryptService } from '@app/services/encrypt.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { DataFileDocService } from '../../services/data-file-doc/data-file-doc.service';
import { ParamsService } from '../../services/params/params.service';
import { TypeDocumentService } from '../../services/type-document/type-document.service';
import { BodyArchivoFisico, ParamsInfoDoc, TipoDocumental, UpdateInfoDoc } from './model/info';
import { UnidadesDeconservacion } from './model/unidad-conservacion';
import { InfoDocService } from './services/info-doc/info-doc.service';

@Component({
  selector: 'app-modal-doc-info',
  templateUrl: './modal-doc-info.component.html',
  styleUrls: ['./modal-doc-info.component.css']
})
export class ModalDocInfoComponent implements OnInit, OnDestroy {

  private ifd = inject(InfoDocService);
  private restService = inject(RestService);
  private auth = inject(AuthHeaderService);
  private globalAppService = inject(GlobalAppService);
  private prs = inject(ParamsService);
  private tds$ = inject(TypeDocumentService);
  private dfd$ = inject(DataFileDocService);
  private encryptService = inject(EncryptService);
  private http = inject(HttpClient);
  private toast = inject(ToastService)
  private baseUrl = environment.apiUrl;
  private ddps$ = inject(DataDocParamsService);
  typeOption = 0;
  idPivot: number | null = 0;

  tipoDocumental: TipoDocumental[] = [];
  minDate = new Date();
  maxDate = new Date();
  unidades: UnidadesDeconservacion[] = [];
  private infoSub$: Subscription = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ParamsInfoDoc) { }

  infoForm = new FormGroup({
    idDocumento: new FormControl(0),
    asuntoContenido: new FormControl('', Validators.required),
    codigoUnidadConservacion: new FormControl(''),
    fechaDeclaracion: new FormControl(''),
    fechaElaboracion: new FormControl(new Date()),
    fechaIncorporacion: new FormControl(new Date()),
    fechaTransmision: new FormControl(''),
    hashDocumento: new FormControl(''),
    nombreDocumento: new FormControl(''),
    nombreElaboradorRemitente: new FormControl('', Validators.required),
    numeroFolios: new FormControl(0),
    numeroRadicado: new FormControl(''),
    origen: new FormControl(0, Validators.required),
    otros: new FormControl(''),
    pesoDocumento: new FormControl('', Validators.required),
    tipoDocumento: new FormControl(0),
    tomo: new FormControl(''),
    tipoDeUnidad: new FormControl('')
  });



  transformData(date: string): string {

    if (date !== '') {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const day = ('0' + newDate.getDate()).slice(-2);


      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    }
    return '';
  }

  ngOnInit(): void {
    this.inputsDisabled();
    this.getTipoDocumental();
    this.initDateDoc();
    this.getUnidadesDeconservacion();
    this.validarUnidades();

    this.ddps$.getDataDocParams().subscribe(res => {

      this.idPivot = res.idDocumentoIncluidoPivot

    })
  }


  desableCodigoUnidad(value: number): void {
    if (value === 2) {
      this.infoForm.get('codigoUnidadConservacion').disable();
    }

    if (value === 1 || value === 3) {
      this.infoForm.get('codigoUnidadConservacion').enable();
    }
  }

  validarUnidades(): void {
    this.infoForm.get('origen').valueChanges.subscribe(origen => {
      this.desableCodigoUnidad(origen);
    })
  }


  initDateDoc(): void {
    this.tds$.getTypeDoc().subscribe(type => {
      this.typeOption = type;
      if (type === 0) {
        console.log('data', this.data)
        this.infoSub$ = this.ifd.getInfoDoc(this.data).subscribe(res => {
          const docInfo = Object.entries(res.data);
          for (const [key, value] of docInfo) {
            this.infoForm.get(key).setValue(value);
            if (key === 'fechaElaboracion') {
              this.infoForm.get('fechaElaboracion').disable()
            }
          }
        })
      }

      if (type === 1 || type === 3) {
        this.infoForm.get('origen').disable();
        this.infoForm.get('fechaElaboracion').enable();
        this.infoForm.get('origen').setValue(type);
        if (this.infoForm.get('numeroRadicado').value === '') {
          this.infoForm.get('nombreElaboradorRemitente').enable();
          this.dfd$.getDataFileDoc().subscribe(dataFile => {
            this.infoForm.get('asuntoContenido').setValue(dataFile.descripcion);


          });
        }
      }
      if (type === 2) {
        this.infoForm.get('origen').disable();
        this.infoForm.get('fechaElaboracion').enable();
        this.infoForm.get('origen').setValue(type);
        /*   this.infoForm.get('codigoUnidadConservacion').disable(); */
      }
    })
  }


  getData(event: UnidadesDeconservacion): void {
    this.infoForm.get('tomo').setValue(event.tomo);
    this.infoForm.get('tipoDeUnidad').setValue(event.tipoArchivo);
  }

  getUnidadesDeconservacion(): void {
    this.ifd.getUnidadesConservacion(this.prs.getValue()).subscribe({
      next: (res) => {
        this.unidades = res.data;

      },
      error: (error) => {
        console.error('error', error)
      }
    })
  }

  getTipoDocumental(): void {
    let params = {
      id: this.prs.getValue()
    };

    this.restService.restGetParams('configuracionApp/tipos-documental/index-all', params, this.auth.getToken())
      .subscribe((dep) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(dep).then((res) => {
          if (res) {
            this.tipoDocumental = dep.data.operaciones["Tipos Documentales"];
          }
        });
      }, (err) => {

        this.globalAppService.resolveResponseError(err).then((res) => { });
      }
      );
  }

  inputsDisabled(): void {
    this.infoForm.get('fechaTransmision').disable();
    this.infoForm.get('fechaDeclaracion').disable();
    this.infoForm.get('fechaIncorporacion').disable();
    this.infoForm.get('fechaTransmision').disable();
    this.infoForm.get('hashDocumento').disable();
    this.infoForm.get('nombreDocumento').disable();
    this.infoForm.get('nombreElaboradorRemitente').disable();
    this.infoForm.get('numeroRadicado').disable();
    this.infoForm.get('pesoDocumento').disable();
    this.infoForm.get('otros').disable();
    this.infoForm.get('fechaElaboracion').disable();
    this.infoForm.get('tomo').disable();
    this.infoForm.get('tipoDeUnidad').disable();
  }

  formatDate(date: Date): string {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }

  formatDataInfoDoc(): UpdateInfoDoc {
    return {
      idDocumento: this.infoForm.get('idDocumento').value,
      origen: this.infoForm.get('origen').value,
      fechaElaboracion: this.formatDate(this.infoForm.get('fechaElaboracion').value),
      tipoDocumento: this.infoForm.get('tipoDocumento').value,
      asuntoContenido: this.infoForm.get('asuntoContenido').value,
      numeroFolios: this.infoForm.get('numeroFolios').value,
      codigoUnidadConservacion: this.infoForm.get('codigoUnidadConservacion').value,
      tomo: this.infoForm.get('tomo').value,
      nombreDocumento: this.infoForm.get('nombreDocumento').value
    }
  }


  formatDataInfoDocArchFisicos(): BodyArchivoFisico {

    if (this.idPivot !== null) {
      return {
        idGdExpediente: this.prs.getValue(),
        origen: this.infoForm.get('origen').value,
        fechaElaboracion: this.formatDate(this.infoForm.get('fechaElaboracion').value),
        tipoDocumento: this.infoForm.get('tipoDocumento').value,
        asuntoContenido: this.infoForm.get('asuntoContenido').value,
        numeroFolios: Number(this.infoForm.get('numeroFolios').value),
        codigoUnidadConservacion: this.infoForm.get('codigoUnidadConservacion').value,
        tomo: this.infoForm.get('tomo').value,
        nombreDocumento: this.infoForm.get('nombreDocumento').value,
        idDocumentoIncluidoPivot: this.idPivot
      }
    }

    if (this.idPivot === null) {
      return {
        idGdExpediente: this.prs.getValue(),
        origen: this.infoForm.get('origen').value,
        fechaElaboracion: this.formatDate(this.infoForm.get('fechaElaboracion').value),
        tipoDocumento: this.infoForm.get('tipoDocumento').value,
        asuntoContenido: this.infoForm.get('asuntoContenido').value,
        numeroFolios: Number(this.infoForm.get('numeroFolios').value),
        codigoUnidadConservacion: this.infoForm.get('codigoUnidadConservacion').value,
        tomo: this.infoForm.get('tomo').value,
        nombreDocumento: this.infoForm.get('nombreDocumento').value,

      }
    }
  }

  onSubmit(): void {

    if (this.typeOption === 0) {
      this.ifd.updateInfoDoc(this.formatDataInfoDoc()).subscribe({
        next: (response) => {

          this.toast.open({
            title: "Registro actualizado"
          })
        },
        error: (err) => {
          console.error(`Error ${err}`);
        }
      });
    }

    if (this.typeOption === 2) {
      console.log('formatDataInfoDocArchFisicos', this.formatDataInfoDocArchFisicos());
      this.ifd.postDocFisicos(this.formatDataInfoDocArchFisicos()).subscribe({
        next: (response) => {
          this.toast.open({
            title: "Registro actualizado"
          })
        },
        error: (err) => {
          console.error(`Error ${err}`);
        }
      });
    }

    if (this.typeOption === 1 || this.typeOption === 3) {
      this.dfd$.getDataFileDoc().subscribe(dataFile => {
        const data = {
          dataForm: {
            origen: this.typeOption,
            descripcion: dataFile.descripcion,
            fechaTransmision: this.infoForm.get('fechaTransmision').value,
            tipoDocumento: this.infoForm.get('tipoDocumento').value,
            nombreElaboradorRemitente: this.infoForm.get('nombreElaboradorRemitente').value,
            nombreDocumento: this.infoForm.get('nombreDocumento').value,
            numeroFolios: Number(this.infoForm.get('numeroFolios').value),
            hashDocumento: this.infoForm.get('hashDocumento').value,
            codigoUnidadConservacion: this.infoForm.get('codigoUnidadConservacion').value,
            tomo: this.infoForm.get('tomo').value,
            otros: this.infoForm.get('otros').value,
            fechaElaboracion: this.formatDate(this.infoForm.get('fechaElaboracion').value),
            idDocumentoIncluidoPivot: this.idPivot
          },
          ButtonSelectedData: [
            {
              id: dataFile.id
            }
          ],
        }

        if (this.idPivot === null) {
          delete data.dataForm.idDocumentoIncluidoPivot
        }

      
        this.encryptService.generateRouteGetParams('radicacion/transacciones/upload-document-to-expedient', data, this.auth.getToken()).then(response => {
          console.log('url', response);
          const url = response as string;
          const formData = new FormData;
          formData.append('fileUpload', dataFile.fileUpload);
          this.http.post(this.baseUrl + url, formData, {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + this.auth.getToken(),
              'language': localStorage.getItem('language') ? localStorage.getItem('language') : 'es'
            }),
            reportProgress: true,
            observe: 'events'

          }).subscribe({
            next: (res) => {
              this.toast.open({
                title: "Registro actualizado"
              })
            },
            error: (err) => {
              console.error('error', err);
            }
          })

        })

      })
    }

  }

  ngOnDestroy(): void {
    this.infoSub$?.unsubscribe();
    this.ddps$.setDataDocParams({
      idDocumentoIncluidoPivot: null
    })
  }

}

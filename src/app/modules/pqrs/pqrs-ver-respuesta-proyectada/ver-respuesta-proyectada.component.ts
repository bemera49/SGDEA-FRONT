import { Component, OnInit } from '@angular/core';
import { RestService } from '@app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, forkJoin, of, switchMap } from 'rxjs';
import { ModalService } from '@app/services/modal/modal.service';
import { Location } from '@angular/common';
import { ResponseReasociarPlantilla } from '../pqrs-proyectar-respuesta/interfaces';
import { ToastService } from '@app/services/toast/toast.service';
import { PqrsActionsService } from '../pqrs-view/useCases/pqrs-actions.service';

@Component({
  selector: 'app-ver-respuesta-proyectada',
  templateUrl: './ver-respuesta-proyectada.component.html',
  styleUrls: ['./ver-respuesta-proyectada.component.css']
})
export class VerRespuestaProyectadaComponent implements OnInit {
  public currentSalidaItem;
  public currentItem;
  public currentId = this.activatedRoute.snapshot.params['id'];
  public currentIdSalida = this.activatedRoute.snapshot.params['idSalida'];
  public userData = this.restService.getUserData();
  public mainDoc: any;
  public modalOpen: boolean = false;
  public validFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  public maxFileSize = 5 * 1024 * 1024; // 5 MB;
  public LastfileObject: { name: string; data?: File, url?: string }[] = [];
  public doc: any;
  public hasMainDocs: boolean = false;
  public docUrl: string = '';

  usTrabajoColaborativo = []
  canInitTrabajoColaborativo = false

  constructor(
    public restService: RestService,
    public activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public router: Router,
    private location: Location,
    private teoast: ToastService,
    private pqrsActions: PqrsActionsService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getDocumentUrl(url: string): string {
    const toBeReplaced = '/app/public/';
    return url?.replace(toBeReplaced, 'http://3.225.70.18:8111/');
  }

  initFetch(): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/radicado/${this.currentId}`, this.userData.accessToken).pipe(
      catchError(err => {
        this.modalService.openNotify('', 'No es posible realizar la visualización en este momento.', false).afterClosed().subscribe((res) => {
          this.router.navigate(['/pqrs/pqrs-view/' + this.currentId])
        })
        console.error(err)
        throw new Error(err)
      })
    )
  }

  postReasociarPlantilla(idEstadoPlantilla: string) {
    const formData = new FormData();
    formData.append('idUser', this.restService.getUserData().idDataCliente)
    formData.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)
    formData.append('estado', idEstadoPlantilla)
    formData.append('file', this.LastfileObject[0].data)

    return this.restService.httpPostArchivo(`api/radicado/${this.currentId}/documento-principal-one-file`, formData, this.userData.accessToken).pipe(
      catchError(err => {
        this.modalService.openNotify('', err.error.error ?? 'Error en la peticion de reasociacion', false);
        throw new Error();
      })
    );
  }

  lastOnFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.length > 1) {
        this.modalService.openNotify(`Alerta`, `Solo puedes seleccionar máximo 1 archivo.`, false)
      } else {
        const file = files[i];
        if (this.validFileTypes.includes(file.type) && file.size <= this.maxFileSize) {
          const fileObj = {
            name: file.name,
            data: file
          };
          this.modalService.openAction('', `¿Está seguro de asociar el documento ${file.name}, al radicado ${this.currentItem.numeroRadiRadicado}?`, () => {
            this.LastfileObject.push(fileObj)
            const nextStatus =
              this.usTrabajoColaborativo.length > 0 ?
                this.usTrabajoColaborativo[this.usTrabajoColaborativo.length - 1].status == "finalizado" ?
                  '21'
                  : '6'
                : "21"
            this.postReasociarPlantilla(nextStatus).subscribe((res: ResponseReasociarPlantilla) => {
              console.log(res);
              // const url = res.data.rutaRadiDocumentoPrincipal;
              // const toBeReplaced = '/app/public/'
              // const linkSource = url.replace(toBeReplaced, 'http://3.225.70.18:8111/');
              // this.LastfileObject.push({ name: res.data.nombreRadiDocumentoPrincipal, url: linkSource });
              this.LastfileObject = []
              this.modalService.openNotify('', 'Plantilla asociada correctamente al radicado', true).afterClosed().subscribe()
              this.getData()
            })
          })
        } else {
          // Mensaje de error para archivos no válidos
          if (!this.validFileTypes.includes(file.type)) {
            this.modalService.openNotify(`Alerta`, `El archivo "${file.name}" no es de un tipo permitido.`, false)
          }
          if (file.size > this.maxFileSize) {
            this.modalService.openNotify(`Alerta`, `El archivo "${file.name}" excede el tamaño máximo permitido de 5 MB.`, false)
          };
        };
      };
    };
  }

  getData() {
    this.initFetch()
      .pipe(
        switchMap((responseEntrada) => {
          this.currentItem = responseEntrada;
          this.mainDoc = this.getDocument(this.currentItem.documentos_principales);
          if (this.mainDoc) {
            this.hasMainDocs = this.isMainDocument()
          }
          this.usTrabajoColaborativo = responseEntrada.usuarios_trabajo_colaborativo.filter(user => user.status != 'Finalizado').map(user => ({ id: user.user_id, name: user.user_name, status: user.status }));
          this.canInitTrabajoColaborativo =
            responseEntrada.user_creador_trabajo_colaborativo_id == this.restService.getUserData().idDataCliente &&
            responseEntrada.usuarios_trabajo_colaborativo.filter(user => user.status == 'Pendiente').length == responseEntrada.usuarios_trabajo_colaborativo.length
          if (this.currentIdSalida != 'undefined') {
            return this.restService.get(`api/radicado/${this.currentIdSalida}`,).pipe(
              catchError((err) => {
                console.error(err)
                throw new Error(err)
              })
            )
          } else return of(null)
        })
      )
      .subscribe(res => {
        this.currentSalidaItem = res;
        console.log(this.mainDoc);
        if (!this.mainDoc) {
          this.mainDoc = this.getDocument(this.currentSalidaItem.documentos_principales);

          if (this.mainDoc) {
            this.hasMainDocs = this.isMainDocument()
          }
        }
      });
  }

  public getDocument(docsArr: any[]) {
    if (docsArr) {
      let documentoParaFirmar = docsArr.filter(item => item.estadoRadiDocumentoPrincipal === 21);
      if (documentoParaFirmar.length == 0) {
        documentoParaFirmar = docsArr.filter(doc => doc.estadoRadiDocumentoPrincipal === 6);
      }
      return documentoParaFirmar[documentoParaFirmar.length - 1];
    }
  }

  async nextWorkflow() {
    const indexActualUser = this.usTrabajoColaborativo.findIndex(user => user.id === this.restService.getUserData().idDataCliente);
    forkJoin([

      // si no es el creador, cambiamos el estado del trabajo colaborativo actual a "finalizado" 
      indexActualUser != -1 ?
        this.changeStastusTrabajoColaborativo(this.currentId, this.restService.getUserData().idDataCliente, '3')
        : of(null),

      // si hay siguiente y no es el creador, cambiamos el estado del siguiente trabajo colaborativo  a "en proceso" 
      indexActualUser != -1 && !!this.usTrabajoColaborativo[indexActualUser + 1] ?
        this.changeStastusTrabajoColaborativo(this.currentId, this.usTrabajoColaborativo[indexActualUser + 1].id, '2') : of(null),

      // si no hay siguiente y no es el creador, cambiamos el estado del pqr trabajo colaborativo  a "finalizado" 
      indexActualUser != -1 && !this.usTrabajoColaborativo[indexActualUser + 1] ?
        this.postCambiarEstado(this.currentId, 'EST-046') : of(null),
      indexActualUser != -1 && !this.usTrabajoColaborativo[indexActualUser + 1] ?
        this.postCambiarEstado(this.currentIdSalida, 'EST-046') : of(null),

      // si hay siguiente y no es el creador,asginamos al siguiente usuario
      indexActualUser != -1 && !!this.usTrabajoColaborativo[indexActualUser + 1] ?
        this.pqrsActions.reasignarPqrs(this.usTrabajoColaborativo[indexActualUser + 1].id, null, this.currentId, false) : of(null),

      // si no hay siguiente y no es el creador, asignamos al creador.
      indexActualUser != -1 && !this.usTrabajoColaborativo[indexActualUser + 1] ?
        this.pqrsActions.reasignarPqrs(this.currentItem.user_creador_trabajo_colaborativo_id, null, this.currentId, false) : of(null),

      // si es el usuario creador cambiamos el estado del primero de la lista de trabajo colaborativo a en proceso
      indexActualUser == -1 ?
        this.changeStastusTrabajoColaborativo(this.currentId, this.usTrabajoColaborativo[0].id, '2') : of(null),

      // si es el usuario creador asignamos al primero de trabajo colaborativo.
      indexActualUser == -1 ?
        this.pqrsActions.reasignarPqrs(this.usTrabajoColaborativo[0].id, null, this.currentId, false) : of(null)

    ]).subscribe({
      next: () => {
        this.teoast.open({
          title: 'Envío exitoso',
        })
        this.router.navigate(['/pqrs/log-pqrs-index']);
      },
      error: (err) => {
        console.log(err);

        this.teoast.open({
          title: 'Ocurrio un error' + err.error,
        })
      }
    })
  }

  changeStastusTrabajoColaborativo(radicado_id, user_id, status) {
    return this.restService.httpPost(`api/changeStatusUserCollaborativeWork`, { radicado_id, user_id, status }, this.userData.accessToken)
  }

  reAsignar(userID) {
    let jsonSend = {
      data: {
        idUsuarioTramitador: this.currentItem.user_idTramitador,
        idDependenciaTramitador: this.currentItem.idTrdDepeUserTramitador,
        observacion: ""
      },
      ButtonSelectedData: [
        {
          id: userID,
          idInitialList: 0
        }
      ]
    }
    return this.restService.httpPost(`api/radicacion/transacciones/re-asign`, jsonSend, this.userData.accessToken)
  }

  postCambiarEstado(idRadicado: string, codigoEstado: string) {
    return this.restService.httpPut(`api/radicado/${idRadicado}/estado/${codigoEstado}`, {})
  }

  redirectFirma() {
    this.router.navigate([`/signin/create/${this.currentId}`])
  };

  isMainDocument(): boolean {
    return this.mainDoc.estadoRadiDocumentoPrincipal === 21 || (this.mainDoc.estadoRadiDocumentoPrincipal === 6 && this.currentItem.usuarios_trabajo_colaborativo.every(user => user.status == 'Finalizado'))
  };




}

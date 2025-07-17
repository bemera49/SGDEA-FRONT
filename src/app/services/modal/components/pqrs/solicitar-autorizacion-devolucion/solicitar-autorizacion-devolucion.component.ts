/**
 *  HU 004 - Solicitar autorización para devolución fuera de tiempo permitido
 *  HU 015 - Solicitar autorización para transaccion en sap
 *  HU 016 - Aprobación de solicitud para ejecutar transacción en SAP
 */

import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DevolverSolicitudComponent } from '../devolver-solicitud/devolver-solicitud.component';

@Component({
  selector: 'app-solicitar-autorizacion-devolucion',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    NgxDocViewerModule
  ],
  templateUrl: './solicitar-autorizacion-devolucion.component.html',
  styleUrls: ['./solicitar-autorizacion-devolucion.component.css']
})
export class SolicitarAutorizacionDevolucionComponent implements OnInit {
  private urlBase = environment.apiUrl;
  form: FormGroup = this.fb.group({
    tipo_sol: [null, Validators.required],
    justificacion: [null, Validators.required],
    urlFile: [null],
    id_doc_principal: [null],
    id_radicado: [null],
  });

  fileUpload = null

  listTipoSol = []
  listUsAprobadores = []
  listCausalesRechazo = []

  authorization: string;
  versionApi = environment.apiUrl;

  modalOpen = false

  displayedUsuarios = ["funcionario", "actividad"]
  dataSourceusuarios = new MatTableDataSource([])

  // variable para controlar si  la accion es para (aprobar o rechazar transaccion) o para (crearla).
  canAprove = false

  // variable para controlar si  la accion es para transaccion no aprovada
  canAproveNoAprovadas = false

  // variable para controlar si la transacción ya fue aprobada
  isAprove = false

  loading = false

  formDataPlantilla = new FormData()
  canSavePlantilla = false

  estadoDocumento = this.data.data.pqrs?.documentos_principales[this.data.data.pqrs.documentos_principales.length - 1]?.estadoRadiDocumentoPrincipal ?? null


  constructor(
    public dialogRef: MatDialogRef<SolicitarAutorizacionDevolucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private lhs: LocalStorageService,
    private modalSvc: ModalService,
    private toastSvc: ToastService,
    private router: Router,
    private restService: RestService,
  ) {
    this.getTokenLS()
  }

  ngOnInit(): void {
    this.loading = true

    // validamos el estado del documento para redirigir a firma
    if (this.estadoDocumento == 20) {
      this.dialogRef.close()
      this.router.navigateByUrl('/signin/create/' + this.data.data.id)
    }

    Promise.all([
      this.TipoSolis().toPromise(),
      this.getUsAprov().toPromise(),
      of(this.restService.getUserData().operaciones).toPromise(),
      this.getCausalesRechazo().toPromise(),
    ]).then((promises: any) => {
      this.listTipoSol = promises[0].map(p => ({ name: p.tipo, value: p.id }));
      this.listUsAprobadores = promises[1].map(p => ({ name: p.user_detalle.full_name, value: p.id }));
      this.listCausalesRechazo = promises[3].map(p => ({ name: p.causal, value: p.id }));

      const rolesCanAprove = ['pqrs%fromulario%sap']
      const rolesCanAproveNoAprovadas = ['pqrs%transaccionessap%noaprobadas']
      const namesCollection = promises[2].map(item => item.nombreRolOperacion)
      this.canAprove = rolesCanAprove.some(rolName => namesCollection.includes(rolName))
      this.canAproveNoAprovadas = rolesCanAproveNoAprovadas.some(rolName => namesCollection.includes(rolName))
      this.loading = false

      // si peude aprobar nos vamos por el flujo de la hu 16
      // si peude aprobar no aprobadas  nos vamos por el flujo de la hu 17
      if (this.data.data.pqrs.autorizacion_trans_sap_id != null ||
        ((this.canAprove || this.canAproveNoAprovadas) && this.data.data.from == 'aprobar')) {
        this.getSolicitud()
      }
    })

  }

  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  getUsAprov() {
    return this.httpClient.get(this.versionApi + 'api/usuarios?rol_id=9', { headers: { Authorization: "Bearer " + this.authorization } })
  }
  TipoSolis() {
    return this.httpClient.get(this.versionApi + 'api/PQRS/autorizaciones_tipos', { headers: { Authorization: "Bearer " + this.authorization } })
  }
  getCausalesRechazo() {
    return this.httpClient.get(this.versionApi + 'api/causales-rechazo', { headers: { Authorization: "Bearer " + this.authorization } })
  }

  close() {
    this.modalOpen = true
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.dialogRef.close()
    }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  onConfirm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.modalOpen = true
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => {
      let jsonSend = {
        autorizacion_id: this.form.get('tipo_sol').value,
        radicado_id: parseInt(this.data.data.id),
        autorizador_id: this.form.get('us_autorizador') ? this.form.get('us_autorizador').value : null,
        observaciones: this.form.get('justificacion').value,
        causales_rechazo_id: this.form.get('causal_rechazo') ? this.form.get('causal_rechazo').value : null,
        otras_causales: this.form.get('justificacion').value,
      }

      if (jsonSend.autorizador_id == null)
        delete jsonSend.autorizador_id


      let httpOptions = {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.authorization,
        })
      };
      this.httpClient.post(`${this.versionApi}api/autorizacion`, jsonSend, httpOptions).pipe(catchError((error) => {
        this.toastSvc.open({
          description: error.error.message ?? error.message,
          success: false,
          duration: 3000,
          title: 'Peticion fallida'
        })
        console.error(error)
        throw new Error
      })).subscribe(async (e: any) => {
        if (!!e.data?.path_doc_principal) {
          // seteamos la data para poder guardar la plantilla
          this.form.controls['id_doc_principal'].setValue(e.data.id_doc_principal)
          this.form.controls['id_radicado'].setValue(e.data.id_radicado)
          // combinacion de correspondencia
          let body = {
            jsonSend: 1,
            ButtonSelectedData: [
              {
                id: this.form.controls['id_radicado'].value,
              },
            ],
            data: {
              id: this.form.controls['id_doc_principal'].value,
            }
          }
          const authentication = this.restService.getUserData().accessToken
          let httpOptions = {
            headers: new HttpHeaders({
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + authentication,
              language: localStorage.getItem("language") ? localStorage.getItem("language") : "es",
            }),
          };
          let dataEncypt = this.restService.encryptAES(body, authentication);
          let dataSend = encodeURIComponent(JSON.stringify(dataEncypt));
          let jsonParams = "jsonSend=" + dataSend;
          const response: any = await this.httpClient.post(this.versionApi + 'radicacion/transacciones/correspondence-match-formato/', jsonParams, httpOptions).toPromise()
          console.log(response);
          this.form.controls['urlFile'].setValue(this.getDocumentUrl(response.decrypted.data))
        }
        this.toastSvc.open({
          description: "Envío exitoso",
          success: true,
          duration: 3000,
          title: "Operación exitosa"
        })
        if (!e.data?.path_doc_principal) {
          this.dialogRef.close()
          this.router.navigate(['/pqrs/log-pqrs-index']);
        }
      })
    }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  changeTipoSol(tipoSol) {
    switch (tipoSol) {
      case 1:
        this.form.addControl('us_autorizador', new FormControl(null, Validators.required));
        this.form.addControl('causal_rechazo', new FormControl(null, Validators.required));
        break;
      default:
        this.form.removeControl('us_autorizador');
        this.form.removeControl('causal_rechazo');
        this.form.removeControl('us_autorizador');
    }
  }

  getFormActividadesIndex(index?) {
    return (this.form.get('actividades') as FormArray).controls[index] as FormGroup
  }

  async getSolicitud() {
    try {
      this.loading = true
      let response: any = await this.httpClient.get(this.versionApi + 'api/autorizacion/' + this.data.data.pqrs.autorizacion_trans_sap_id, { headers: { Authorization: "Bearer " + this.authorization } }).toPromise()
      this.changeTipoSol(response.data.autorizacion_id)
      const documento = this.data.data.pqrs.documentos_principales.filter(d => d.nombreRadiDocumentoPrincipal == "Autorización para realizar transacción en SAP 4")
      const urlDocumento = this.getDocumentUrl(documento[documento.length - 1])
      this.form.patchValue({
        tipo_sol: response.data.autorizacion_id,
        justificacion: response.data.justificacion,
        urlFile: urlDocumento,
        id_doc_principal: documento.idradiDocumentoPrincipal,
        id_radicado: this.data.data.id
      })
      this.form.disable()
      this.loading = false
    } catch (error) {
      console.log(error);

      this.dialogRef.close()
      this.toastSvc.open({
        title: error?.error?.message ?? "error de servidor",
        success: false,
        duration: 3000
      })
      return
    }
  }

  action(action) {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.modalOpen = true
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => {
      switch (action) {
        case 'rechazar':
          this.modalSvc.open(DevolverSolicitudComponent, {
            title: 'Devolver solicitud',
            data: {
              isProyector: false,
              id: this.data.data.id,
              actionDefault: false,
              causales_rechazo_lista: this.listCausalesRechazo
            }
          }).afterClosed().subscribe(
            (data) => {
              let jsonSend = {
                id: this.data.data.pqrs.autorizacion_trans_sap_id,
                causal_de_rechazo: data.causal_de_rechazo,
                otras_causales: data.causal_rechazo_otro,
                observaciones: data.observaciones
              }

              let httpOptions = {
                headers: new HttpHeaders({
                  Authorization: "Bearer " + this.authorization,
                })
              };
              this.httpClient.post(`${this.versionApi}api/rechazar/autorizacion`, jsonSend, httpOptions).pipe(catchError((error) => {
                this.toastSvc.open({
                  description: error.error.message ?? error.message,
                  success: false,
                  duration: 3000,
                  title: 'Peticion fallida'
                })
                console.error(error)
                throw new Error
              })).subscribe((e: any) => {
                this.toastSvc.open({
                  title: e.message ?? "Operación completada con éxito",
                })
                this.dialogRef.close()
                this.router.navigate(['/pqrs/log-pqrs-index']);
              })
            }
          );
          break;
        case 'aprobar':
          let jsonSend = {
            id: this.data.data.pqrs.autorizacion_trans_sap_id
          }
          let httpOptions = {
            headers: new HttpHeaders({
              Authorization: "Bearer " + this.authorization,
            })
          };
          this.httpClient.post(`${this.versionApi}api/aprobar/autorizacion`, jsonSend, httpOptions).pipe(catchError((error) => {
            this.toastSvc.open({
              description: error.error.message ?? error.message,
              success: false,
              duration: 3000,
              title: 'Peticion fallida'
            })
            console.error(error)
            throw new Error
          })).subscribe((e: any) => {
            this.toastSvc.open({
              title: e.message ?? "Operación completada con éxito",
            })
            this.dialogRef.close()
            this.router.navigate(['/pqrs/log-pqrs-index']);
          })
          break;
      }
    }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  descargarPlantilla() {
    const link = document.createElement('a');
    link.href = this.form.controls['urlFile'].value;
    link.download = 'plantilla.doc';
    link.click();
  }

  cargarPlantilla(event) {
    if (event.target.files.length > 0) {
      this.validateFileExtension(event.target.files[0]).then((res) => {
        if (res) {
          try {
            this.formDataPlantilla.append('idUser', this.restService.getUserData().idDataCliente)
            this.formDataPlantilla.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)
            this.formDataPlantilla.append('estado', "21")
            this.formDataPlantilla.append('file', event.target.files[0])
            this.canSavePlantilla = true
          } catch (error) {
            console.log(error);
            this.toastSvc.open({
              title: 'Error',
              description: error.message,
              success: false,
              duration: 3000
            })
          }
        } else {
          this.toastSvc.open({
            title: 'Archivo no permitido',
            description: 'El archivo cargado no tiene la extensión permitida',
            success: false,
            duration: 3000
          })
        }
      });
    }
  }

  async savePlantilla() {
    this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", async () => {
      let httpOptions = {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.authorization,
          language: localStorage.getItem("language") ? localStorage.getItem("language") : "es",
        }),
      };
      await this.httpClient.post(`${this.versionApi}api/radicado/${this.data.data.id}/document-one-file-format-trans-sap`, this.formDataPlantilla, httpOptions).pipe(
        catchError(err => {
          console.error(err)
          this.toastSvc.open({
            title: 'Error',
            description: err.error.message ?? err.message,
            success: false,
            duration: 3000
          })
          throw new Error()
        })
      ).toPromise()
      await this.httpClient.put(`${environment.apiUrl}api/radicado/${this.data.data.id}/estado/${'EST-070'}`, {}, httpOptions).toPromise()
      this.dialogRef.close()
      this.router.navigateByUrl('/signin/create/' + this.data.data.id)
    }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })

  }

  validateFileExtension(nameFile) {
    return new Promise<boolean>((resolve) => {
      const extensionArr = nameFile.name.split('.');
      const extension = extensionArr.pop().toLowerCase();
      if (extension == 'docx' || extension == 'doc') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  getDocumentUrl(document): string {
    const url = document.path_doc_principal ?? document.rutaRadiDocumentoPrincipal ?? document.nombreRadiDocumentoPrincipal;
    const toBeReplaced = '/app/public/'
    return url.replace(toBeReplaced, this.urlBase);
  }

}

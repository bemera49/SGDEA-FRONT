import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '@app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { RestService } from '@app/services/rest.service';
import { AuthService } from '@app/services/auth.service';
import { catchError, finalize, map, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/services/toast/toast.service';
import { config } from '@app/modules/components/table/table.component';
import { ModalService } from '@app/services/modal/modal.service';
import { RechazarPqrsComponent } from '@app/services/modal/components/pqrs/rechazar-pqrs/rechazar-pqrs.component';
import { tableHeadersAsociadas, tableHeadersCuentasAsociadas, tableHeadersProceso } from '../solicitud-visto-bueno/utils/table-headers';


@Component({
  selector: 'app-rechazo-visto-bueno',
  templateUrl: './rechazo-visto-bueno.component.html',
  styleUrls: ['./rechazo-visto-bueno.component.css']
})
export class RechazoVistoBuenoComponent implements OnInit {

  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
    { name: "Listado de PQRS", route: "/pqrs/log-pqrs-index" }
  ];
  breadcrumbRouteActive = "Ver Comunicación Proyectada";

  versionApi = environment.apiUrl;
  authorization: string;

  // tablas
  cuentaContrato: any
  dataConfigCuentasAsociadas: config = null;
  dataConfigProceso: config = null;
  dataConfigSolAsociadas: config = null;

  listTipoAutorizacion = []
  usuarios = []
  listCausales = []

  form: FormGroup = this.fb.group({
    tipo: [null, [Validators.required]],
    usuario: [null, [Validators.required]],
    causales: [{ value: null, disabled: true }],
    causal_otro: [{ value: null, disabled: true }],
    observaciones: [{ value: null, disabled: true }],
  })

  constructor(
    public location: Location,
    private http: HttpClient,
    private lhs: LocalStorageService,
    private restService: RestService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private _modalSvc: ModalService,
    private toastSvc: ToastService,
    private fb: FormBuilder
  ) {
    this.getTokenLS()
  }
  ngOnInit(): void {
    this.fetchPqrs().pipe(take(1),
      catchError(error => {
        this.toast.open({
          description: 'Conexión con el servidor fallida. Intente de nuevo más tarde',
          title: 'Error de conexión',
          success: false,
          duration: null,
        })
        console.error(error)
        throw new Error
      }),
      finalize(() => {
      })).subscribe((res: any) => {
        console.log(res);

        this.cuentaContrato = res.numeroCuentaContrato;

        this.dataConfigCuentasAsociadas = {
          headers: tableHeadersCuentasAsociadas,
          texts: {
            title: 'Otras cuentas contrato asociadas al radicado',
            description: 'Descripcion'
          },
          setFatherId: false,
          fetch: this.fetchTableCuentasAsociadas(),
          idTracker: null,
          actions: null,
        }

        this.dataConfigProceso = {
          headers: tableHeadersProceso,
          texts: {
            title: 'Solicitudes en proceso para la cuenta contrato',
            description: 'Descripcion'
          },
          setFatherId: false,
          fetch: this.fetchTableCuentasProceso(),
          idTracker: null,
          actions: null,
        }

        this.dataConfigSolAsociadas = {
          headers: tableHeadersAsociadas,
          texts: {
            title: 'Solicitudes Asociadas',
            description: 'Descripcion'
          },
          fetch: this.fetchPqrsTableSolicitudesAsociadas(),
          setFatherId: true,
          idTracker: 'idRadicado',
          actions: null,
        }
      })
  }
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  getCausales() {
    this.http.get(this.versionApi + 'api/causales_de_rechazo', { headers: { Authorization: "Bearer " + this.authorization } }).subscribe((data: any) => {
      this.listCausales = data.map(p => ({ name: p, value: p }));
    })
  }

  public fetchPqrs(key?: string) {
    const id = this.activatedRoute.snapshot.params['id']
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    if (!!key)
      return this.http.get(`${environment.apiUrlBasePath}api/radicado/${id}`, httpOptions).pipe(map((res: any) => {
        return res.key ?? []
      }))
    else
      return this.http.get(`${environment.apiUrlBasePath}api/radicado/${id}`, httpOptions)
  }

  fetchTableCuentasAsociadas() {
    const token = this.restService.getUserData().accessToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(environment.apiUrlBasePath + `api/radicados?dependencia_id=${this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.dependencia.idGdTrdDependencia}&numero_cuenta_contrato=${this.cuentaContrato}`).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }
  fetchTableCuentasProceso() {
    const token = this.restService.getUserData().accessToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(environment.apiUrlBasePath + `api/radicados?dependencia_id=${this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.dependencia.idGdTrdDependencia}&numero_cuenta_contrato=${this.cuentaContrato}`).pipe(
      map((response: any) => {
        return response.data
      })
    )
  }

  fetchPqrsTableSolicitudesAsociadas() {
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const id = this.activatedRoute.snapshot.params['id']

    return this.http.get(environment.apiUrlBasePath + `api/asociar-solicitudes/radicados-asociados/${id}`, httpOptions).pipe(

      map((response: any) => {

        return response.data
      })
    )
  }

  gestion(gestion: string) {
    if (gestion == 'rechazar') {
      this._modalSvc.open(RechazarPqrsComponent, {
        title: 'Rechazar solicitud',
        void: () => {
          this.toast.open({
            title: 'Solicitud rechazada',
            description: 'La solicitud fue rechazada con éxito'
          })
        },
      }).afterClosed().subscribe((form) => {
        if (!!form) {
          const body = {
            filed: this.activatedRoute.snapshot.params['id'],
            estado: gestion,
            causal_rechazo: form.get('causal').value,
            causal_otro: form.get('causal_otro') ? form.get('causal_otro').value : null,
            observaciones: form.get('observaciones').value,
          }
          this.http.post(
            this.versionApi + 'api/gestionar-visto-bueno-aprobacion-firma',
            body,
            { headers: { Authorization: "Bearer " + this.authorization } }
          ).pipe(catchError((error) => {
            this.toastSvc.open({
              description: error.error.message,
              success: false,
              duration: 3000,
              title: 'Peticion fallida'
            })
            console.error(error)
            throw new Error
          })).subscribe((data: any) => {
            this._modalSvc.openNotify('027', 'Aprobacion exitosa', true)
          })
        }

      })
    }
    else {
      const body = {
        filed: this.activatedRoute.snapshot.params['id'],
        estado: gestion,
        causal_rechazo: null,
        causal_otro: null,
        observaciones: null
      }
      this.http.post(
        this.versionApi + 'api/gestionar-visto-bueno-aprobacion-firma',
        body,
        { headers: { Authorization: "Bearer " + this.authorization } }
      ).pipe(catchError((error) => {
        this.toastSvc.open({
          description: error.error.message,
          success: false,
          duration: 3000,
          title: 'Peticion fallida'
        })
        console.error(error)
        throw new Error
      })).subscribe((data: any) => {
        this._modalSvc.openNotify('027', 'Aprobacion exitosa', true)
      })
    }

  }

}

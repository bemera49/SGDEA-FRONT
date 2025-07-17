import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { pipe, of, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
@Component({
  selector: 'app-pqrs-view-associated',
  templateUrl: './pqrs-view-associated.component.html',
  styleUrls: ['./pqrs-view-associated.component.css']
})
export class PqrsViewAssociatedComponent implements OnInit {

  public restService = inject(RestService)
  public activatedRoute = inject(ActivatedRoute)
  public http = inject(HttpClient)
  public _formBuilder = inject(FormBuilder)
  public router = inject(Router)
  public pqrsViewService = inject(PqrsViewService)
  


  navigateTo() {
    this.router.navigate(['/pqrs/pqrs-view/' + this.pqrsViewService.getDetailFatherId()])
  }


  public fetchPqrs() {

    const id = this.activatedRoute.snapshot.params['id']
    const token = this.restService.getUserData().accessToken;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(`${environment.apiUrlBasePath}api/radicado/${id}`, httpOptions)
  }

  constructor() { }



 public pqrsForm = this._formBuilder.group({
    idRadiRadicado: [''],
    numeroCuentaContrato: ['', Validators.required],
    estadoRadiRadicado: ['', Validators.required],
    contactoSap: ['', Validators.required],
    creacionRadiRadicado: ['', Validators.required],
    tipo_solicitud: ['', Validators.required],
    cg_medio_recepcion: ['', Validators.required],
    clasificacionInternaId: ['', Validators.required],
    asignacionRadiRadicado: ['', Validators.required],
    user_idTramitador: ['', Validators.required],
    fechaDocumentoRadiRadicado: ['', Validators.required],
    user_idCreador: ['', Validators.required],
    returnCause: ['', Validators.required],
    anexos: ['', Validators.required]
  })


  ngOnInit(): void {
    this.fetchPqrs().pipe().subscribe((res:any) => {
      this.pqrsForm.patchValue({
                  idRadiRadicado: res.idRadiRadicado,
                  numeroCuentaContrato: res.numeroCuentaContrato,
                  estadoRadiRadicado: res.estado.estado,
                  contactoSap: res.contactoSap,
                  creacionRadiRadicado: res.creacionRadiRadicado,
                  tipo_solicitud: res.tipo_solicitud?.nombre,
                  cg_medio_recepcion: res.cg_medio_recepcion?.nombreCgMedioRecepcion,
                  clasificacionInternaId: res.clasificacion_interna?.detalle,
                  asignacionRadiRadicado: res.asignacionRadiRadicado,
                  user_idTramitador: res.usuario_que_asigna?.username,
                  fechaDocumentoRadiRadicado: res.fechaDocumentoRadiRadicado,
                  user_idCreador: res.usuarios_que_solicitan?.map(user => user.nombreCliente).join(", "),
                  returnCause: res.returnCause,
                  anexos: res.anexos,
      })
    })
  }

}


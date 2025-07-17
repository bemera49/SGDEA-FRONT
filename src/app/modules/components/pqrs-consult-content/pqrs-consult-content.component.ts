import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ExternalService } from '@app/services/external/external.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import { param } from 'jquery';

@Component({
  selector: 'app-pqrs-consult-content',
  templateUrl: './pqrs-consult-content.component.html',
  styleUrls: ['./pqrs-consult-content.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class PqrsConsultContentComponent implements OnInit {

  public pqrsForm: FormGroup;
  public isConsult: boolean = false;
  public isConsultImage: boolean = false;

  public  numeroRadiRadicado: string;
  public fechaDocumentoRadiRadicado: string;
  public estado: string;
  public fechaVencimientoRadiRadicados: string;
  public asuntoRadiRadicado: string;
  public numeroCuentaContrato: string;
  public numeroRadiRadicadoAsociado: string;
  public userName: string;
  public nombreRemitente: string;

  private ruoteService: string;
  private ruoteServiceImage: string;
  private ruoteServiceImageRemitente: string;
  private ruoteServiceImageRespuesta: string;

  public nameRad: string = 'Nombres y apellidos';

  public listDocuments: any[];

  constructor(
    private fb: FormBuilder,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public lhs: LocalStorageService,
    public globalAppService: GlobalAppService,
    private breakpointObserver: BreakpointObserver,
    private externalSvc: ExternalService,
    private modal: ModalService,
    private toastSvc: ToastService,
  ) { }

  ngOnInit(): void {
    this.ruoteService = "api/radicados-usuario";
    this.ruoteServiceImage = "api/radicados/documents";
    this.ruoteServiceImageRemitente = "api/download-doc-principal";
    this.ruoteServiceImageRespuesta = "api/download-doc";
    this.formInit();
  }

  formInit(mockData?): void {
    this.pqrsForm = this.fb.group({
      numeroRadiRadicado: new FormControl('', [Validators.required]),
      codigoVerificacion: new FormControl('', [Validators.required]),
    });
  }


  submitFormReceive(formDirective: FormGroupDirective): void {
    // Verificaciones previas, como la de anexos y la aceptación de la política.
    //this.pqrsForm.markAllAsTouched();

    let formData = {
      'numeroRadiRadicado': this.pqrsForm.get('numeroRadiRadicado').value,
      'codigoVerificacion': this.pqrsForm.get('codigoVerificacion').value,
    }

    let urlRoute = this.ruoteService + "?numeroRadiRadicado=" + formData.numeroRadiRadicado + "&codigoVerificacion=" + formData.codigoVerificacion;


    this.restService.getPublic(urlRoute).subscribe(response => {
      this.isConsult = true;

      let urlRouteConsultImage: string = "";

      if(response.radicadoPrincipal != undefined) {
        if(response.radicadoPrincipal.idTipoPersona	== 1){
          this.nameRad = 'Razón social';
        }
        this.numeroRadiRadicado = response.radicadoPrincipal.numeroRadiRadicado;
        this.fechaDocumentoRadiRadicado = response.radicadoPrincipal.fechaDocumentoRadiRadicado;
        this.fechaVencimientoRadiRadicados = response.radicadoPrincipal.fechaVencimientoRadiRadicados;
        this.asuntoRadiRadicado = response.radicadoPrincipal.asuntoRadiRadicado;
        this.numeroCuentaContrato = response.radicadoPrincipal.numeroCuentaContrato;
        this.numeroRadiRadicadoAsociado = response.radicadoPrincipal.numeroRadiRadicadoAsociado;
        this.estado = response.radicadoPrincipal.estado;
        this.userName	= response.radicadoPrincipal.userName;
        this.nombreRemitente = response.radicadoPrincipal.nombreRemitente;

        urlRouteConsultImage = this.ruoteServiceImage + "?idRadiRadicado=" + response.radicadoPrincipal.idRadiRadicado;

      } else {
        if(response[0].idTipoPersona	== 1){
          this.nameRad = 'Razón social';
        }
        this.numeroRadiRadicado = response[0].numeroRadiRadicado;
        this.fechaDocumentoRadiRadicado = response[0].fechaDocumentoRadiRadicado;
        this.fechaVencimientoRadiRadicados = response[0].fechaVencimientoRadiRadicados;
        this.asuntoRadiRadicado = response[0].asuntoRadiRadicado;
        this.numeroCuentaContrato = response[0].numeroCuentaContrato;
        this.numeroRadiRadicadoAsociado = response[0].numeroRadiRadicadoAsociado;
        this.estado = response[0].estado;
        this.userName	= response[0].userName;
        this.nombreRemitente = response[0].nombreRemitente;

        urlRouteConsultImage = this.ruoteServiceImage + "?idRadiRadicado=" + response.radicadoPrincipal.idRadiRadicado;
      }

      if(urlRouteConsultImage != "") {
        this.restService.getPublic(urlRouteConsultImage).subscribe(response => {
          this.isConsultImage = true;
          console.log({response});
          this.listDocuments = response.documentos;
        }, error => {
          this.isConsultImage = false;
        });
      }


    }, error => {
      this.isConsult = false;
      this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.message);
    });
    formDirective.resetForm();
    this.pqrsForm.reset();
  }

  viewdocument(idImage: number){


    /*this.restService.postPublic(this.ruoteServiceImageRemitente, param).subscribe(response => {
      this.isConsultImage = true;
      console.log({response});
      this.listDocuments = response.documentos;
    }, error => {
      this.isConsultImage = false;
    });*/
  }

}

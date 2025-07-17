import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '@app/services/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, finalize, forkJoin, Observable, switchMap } from 'rxjs';
import { ModalService } from '@app/services/modal/modal.service';
import { ToastService } from '@app/services/toast/toast.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-signature-internal-sign',
  templateUrl: './signature-internal-sign.component.html',
  styleUrls: ['./signature-internal-sign.component.css']
})
export class SignatureInternalSignComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public rest$: RestService,
    public modal$: ModalService,
    public toast$: ToastService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { }

      approvedButton = false;
      refuseButton = false;
      base64Data: SafeResourceUrl;
  public formGroup = new FormGroup({
    asunto: new FormControl({
      value: '', 
      disabled: true
    }),
    fechaLimite: new FormControl({
      value: '', 
      disabled: true,
    }),
    proyector: new FormControl({
      value: '',
      disabled: true,
    }),

  })

  public currentID: string = '';


  sanitizeBase64(base64: string, mimeType: string): SafeResourceUrl {
    const url = `data:${mimeType};base64,${base64}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Hace que la URL sea segura
  }

  parseDateFromGet(date: string) {
    console.log(date)
    let dateSplited = date.split(' ')
    return `${dateSplited[0]}T${dateSplited[1]}`
     }


     public idFlujo!: number;

  ngOnInit(): void {
    this.currentID = this.activatedRoute.snapshot.params['id'];

    forkJoin(
      this.fetchEstados(), 
      this.fetchRadicado(),
      this.fetchDocumento(this.currentID)
    )
    .subscribe(([respuestaEstados, respuestaRadicado, respuestaDocumento]) => {

      this.formGroup.patchValue({
        asunto: respuestaRadicado.asuntoRadiRadicado, 
        proyector: respuestaRadicado.tramitador.user_detalle.full_name,
        fechaLimite: this.parseDateFromGet(respuestaRadicado.flujo_firma[0].fecha_maxima_firma),
      })

      let currentUser = respuestaRadicado.flujo_firma.find((item: any) => item.usuario.id == this.rest$.getUserData().idDataCliente);
      this.idFlujo = currentUser.id

      this.base64Data = this.sanitizeBase64(respuestaDocumento.base64, 'application/pdf')

    });
  }


  fetchDocumento(idRadicado: string): Observable<any> {
    return this.rest$.get(`api/flujo/radicado/documento/${idRadicado}`)

  }


  fetchEstados(): Observable<any> {
    return this.rest$.get('api/flujo/estados')

  }

  fetchRadicado(): Observable<any> {
    return this.rest$.get(`api/flujo/radicado/lista/mejorado?idRadicado=${this.currentID}`)
  }
 
  postCambiarEstado(idFlujo: number, idButton: number){

    if(idButton == 1) {
      this.approvedButton = true;
    } else {
      this.refuseButton = true; 
    }

    this.modal$.openAction('¿Está seguro de realizar esta acción?', '', () => {
      this.rest$.put(`api/flujo/radicado/estado/${this.idFlujo}`, idFlujo, {}).pipe(
        catchError(err => {
          this.router.navigate(['/signin/home'])
          throw new Error(err)
        }),
        finalize(() => {
          this.approvedButton = false;
          this.refuseButton = false;
        })
      ).subscribe(res => {
        this.modal$.openNotify('Exito', 'Guardado de información exitoso', true).afterClosed().subscribe(res => this.router.navigate(['/signin/home']))
      })
    }
     )
}}

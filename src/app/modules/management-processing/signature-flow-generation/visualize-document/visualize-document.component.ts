 import { Component, OnInit } from '@angular/core';
import { SigninService } from '../../signin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { catchError, retry, switchMap, take } from 'rxjs';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-visualize-document',
  templateUrl: './visualize-document.component.html',
  styleUrls: ['./visualize-document.component.css']
})
export class VisualizeDocumentComponent implements OnInit {

  constructor(public signinService: SigninService,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public pqrs$: PqrsViewService,
              public modal: ModalService,
              public rest$: RestService,
              public fb: FormBuilder,
  ) { }

  public data: any = null;
  public currentID;
  public currentItem;

  public userData = this.rest$.getUserData()

  public mainDocument;

  formFecha = this.fb.group({
    asunto:  [{
      value: null,
      disabled: true,
    }, Validators.required],
    proyector:  [{
      value: null,
      disabled: true,
    }, Validators.required],
    fechaLimite: [{
      value: null,
      disabled: true,
    }, Validators.required],
  })

  ngOnInit(): void {

    if(localStorage.getItem('formData')) {
      let response = JSON.parse(localStorage.getItem('formData')); 

      this.formFecha.patchValue({
        asunto: response.asunto,
        fechaLimite: response.fechaLimite,
        proyector: response.proyector
      })
    }

    this.data = [
      this.signinService.plainSubArray(0),
      this.signinService.plainSubArray(1),
      this.signinService.plainSubArray(2)
    ];

    console.log(localStorage.getItem('formData'))
    const response = this.signinService.getData()
 

    console.log(this.formFecha.getRawValue())

    this.currentID = this.activatedRoute.snapshot.params['id']


    

    this.pqrs$.fetchPqrsById(this.currentID).pipe(
      retry(5),
      take(1),
    ).subscribe(
      (response: any) => {
        this.currentItem = response;
        console.log('Item de la respuesta:', response)
        this.mainDocument = this.pqrs$.getDocument(response.documentos_principales)
      }
    )


   

  }

   flattenNestedArrays(arrayOfArrays: any[][][]): any[] {
    return arrayOfArrays.reduce((acc, subarray) => {
      return acc.concat(...subarray);
    }, []);
  }
  
  parseDate(date$: string) {

    let date = new Date(date$)

    let year = date.getFullYear()
    let month = `${date.getMonth() + 1}`.length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = `${date.getDay()}`.length == 1 ? `0${date.getDay()}` : date.getDay()

    let result = `${year}-${month}-${day} 00:00:00`

    return result
  }

  public areAllSubarraysEmpty(arrays: any[][]): boolean {
    return arrays.some(subarray => subarray.length > 0);
  }
  crearFlujo() {

    const userData = this.rest$.getUserData()

    if(!this.areAllSubarraysEmpty(this.data)) {
      this.modal.openNotify('', 'No hay usuarios registrados para proceder con el flujo de firma', false)
    } else {
      const flatteredData = this.flattenNestedArrays(this.data)

      const body = flatteredData.map(item => {
        const result = {
          "cg_tipo_firma_id": item.idTipoFirma,
          "sgc_participante_id": item.participante_id,
          "cg_estado_flujo_id": 1,
          "posicion": item.ordenFirma,
          "coordenada": "{\"x\": 0, \"y\": 0}",
          "fecha_maxima_firma": this.parseDate(this.formFecha.get('fechaLimite')?.value)
        };
      
        if (item.tipoUsuario === 'Interno') {
          result["user_id"] = item.user_id;
        } else if (item.tipoUsuario === 'Externo') {
          result["user_externos_id"] = item.user_externos_id;
        }
        
        
        return result;
        
      }
    
    )
    console.log(body)

      this.rest$.post(`api/flujo/radicado/guardar/${this.currentID}/${userData.idDataCliente}/${userData.dependencia.idGdTrdDependencia}`, body)
      .pipe(
        catchError((err => {
          this.modal.openNotify('Error', 'Ha ocurrido un error durante la creacion del flujo de firma. Por favor intentelo de nuevo', false)
          console.error(err)
          throw new Error(err)
        }))
      )
      .subscribe(response => {
        this.modal.openNotify('Éxito', 'Flujo de firma creado exitosamente.', true).afterClosed().subscribe(response => {
          this.router.navigate(['/signin'])
        })
      })
    }
  }

  goBack() {
    console.log(`signin/create/${this.currentID}`)
    this.router.navigate([`/signin/create/${this.currentID}`])
  }

}

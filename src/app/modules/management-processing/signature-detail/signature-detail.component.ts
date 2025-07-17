import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DraggableTableComponent } from '@app/modules/components/draggable-table/draggable-table.component';

import { TableHeadersSignatureDetail } from '../signature-flow-generation/utils/table-headers';
import { RestService } from '@app/services/rest.service';
import { SigninService } from '../signin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PqrsActionsService } from '@app/modules/pqrs/pqrs-view/useCases/pqrs-actions.service';
import { TablecopyComponent } from '@app/modules/components/tablecopy/tablecopy.component';
import { catchError, finalize, map, of } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from '@app/services/modal/modal.service';
import { environment } from 'src/environments/environment';
import { ToastService } from '@app/services/toast/toast.service';

export interface Signature {
  user_id: number
  user_externos_id: number
  cg_tipo_firma_id: number
  sgc_participante_id: number
  cg_estado_flujo_id: number
  posicion: number
  coordenada: string
}

@Component({
  selector: 'app-signature-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DraggableTableComponent, TablecopyComponent],
  templateUrl: './signature-detail.component.html',
  styleUrls: ['./signature-detail.component.css']
})



export class SignatureDetailComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public http$: RestService,
    public signin$: SigninService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public pqrs$: PqrsActionsService,
    public dialogRef: MatDialogRef<SignatureDetailComponent>,
    public modal$: ModalService,
    public toast$: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

 
  public dataModal = this.data;
  public itemData = this.dataModal.itemData;
  public userData = this.http$.getUserData()

  public ableToErase: boolean = true;

  public deleteSignature(observacion: string) {

    const formGroup = new FormGroup({
      radi_radicado_id: new FormControl(this.itemData.idRadiRadicado),
      id_tramitador: new FormControl(this.userData.idDataCliente),
      id_dependencia: new FormControl(this.userData.dependencia.idGdTrdDependencia),
    })

    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.http$.getUserData().accessToken,
      }),
      params: this.http$.buildHttpParams(formGroup)
    }
    return this.http.delete(`${environment.apiUrlBasePath}api/flujo/radicado/eliminar`, {
      body: {observacion: observacion},
      ...httpOptions
    });
  }

  erase() {
    this.ableToErase = false;
    this.modal$.openActionTextArea('¿Está seguro de realizar esta acción?', '', 'Motivo',
             () => {

             }
    ).afterClosed().subscribe((res: any) => {
      console.log('Antes de entrar a res', res)
      if(res) {
        console.log(res)
        this.deleteSignature(res)
        .pipe(
          catchError((err: any) => {
          this.toast$.open({title: 'Eliminación fallida', success: false, duration: 3000})
          this.ableToErase = true;
          throw new Error(err)
        } ))
        .subscribe((res: any) => {
          this.toast$.open({title: 'Eliminación exitosa', success: true, duration: 3000})
          this.ableToErase = true;
          console.log(res)
        })
      } 

      this.ableToErase = true;
    })

   
  }

  getPeople(idParticipante: number) {
    let people = this.itemData.flujo_firma.filter(item => item.tipo_participante_id == idParticipante); 
    if(people) {
      return of(people).pipe(
        map((data: any) => data.map(item => {
          const nombre = item.tipo_usuario === 'Interno' 
            ? item.usuario.user_detalle.full_name 
            : item.usuario.nombre;

          const dependencia = item.tipo_usuario === 'Interno' ? '' : 'No posee';  
  
          return {
            ...item,
            nombre: nombre,
            dependencia: dependencia,
          };
        }))
      );
    } else {
      return of(null);
    }
  }

  close(){
    this.dialogRef.close()
  }

  public goBack() {
    this.router.navigate([`/signin`])
  }

  onRefresh() {
  }

  public revisoresTableConfig = {
    headers: TableHeadersSignatureDetail,
    texts: {
      title: 'Revisores',
      description: 'Descripcion'
    },
    fetch: () => this.getPeople(1),
    idTracker: 'idRadiRadicado',
    hideSelectColumn: true,

  };

  public aprobadoresTableConfig = {
    headers: TableHeadersSignatureDetail,
    texts: {
      title: 'Aprobadores',
      description: 'Descripcion'
    },
    fetch: () => this.getPeople(2),
    idTracker: 'idRadiRadicado',
    hideSelectColumn: true,
  };

  public aprobadoresFirmantesTableConfig = {
    headers: TableHeadersSignatureDetail,
    texts: {
      title: 'Aprobadores',
      description: 'Descripcion'
    },
    fetch: () => this.getPeople(3),
    idTracker: 'idRadiRadicado',
    hideSelectColumn: true,
  };
  

  public headers = TableHeadersSignatureDetail;

  ngOnInit(): void {
    console.log(this.itemData)

    
  }

}

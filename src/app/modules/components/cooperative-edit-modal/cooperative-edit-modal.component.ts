import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TrabajoColaborativoService } from 'src/app/services/cooperative/trabajo-colaborativo.service'; 
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders
import { ToastService } from "src/app/services/toast/toast.service";

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: 'app-cooperative-edit-modal',
  templateUrl: './cooperative-edit-modal.component.html',
  styleUrls: ['./cooperative-edit-modal.component.css']
})
export class CooperativeEditModalComponent implements OnInit {

  params: any;

  moduleForm: UntypedFormGroup;
  versionApi = environment.versionApiDefault;
  authorization: string = this.restService.getUserData().accessToken; 
  radicado_id: any;
  editorContent = "";
  trabajoColaborativoRegistros: any[] = [];

  listDependenciasInfo: any;
  listUsuariosInfo: any;
  listUsuariosInfoExt: any;
  listDependencias: any;
  listUsuarios: any;
  listMotivoDevolucion: any;

    /** lists filtered + namelist by search keyword */
  // Filtros de informacion

  _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CooperativeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private sweetAlertService: SweetAlertService,
    private restService: RestService,
    private globalAppService: GlobalAppService,
    public lhs: LocalStorageService,
    public trabajoColaborativoService: TrabajoColaborativoService,
    private http: HttpClient,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.moduleForm = this.formBuilder.group({
      editorHTML: new UntypedFormControl('', Validators.required),
      listUsuariosFilter: new UntypedFormControl('')
    });

    this.trabajoColaborativoService.trabajoColaborativoRegistros$.subscribe(registros => {
        this.trabajoColaborativoRegistros = registros;
    });
    // Initialize data
    this.getTokenLS();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      console.log(this.data)
      console.log(this.data.dataSend[0],'recibida')
      if (this.data.dataSend[0].id) {
        this.radicado_id = this.data.dataSend[0].id;
        this.plantillaTrabajoColaborativo(this.radicado_id);
      }
    });
  }

  changeDocument(content) {
    this.editorContent = content.data;
  }

  filterBanks(nomList) {
    if (!this[nomList]) {
      return;
    }
    let search = this.moduleForm.controls[nomList + 'Filter'].value;
    if (!search) {
      this['filtered' + nomList].next(this[nomList].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this['filtered' + nomList].next(
      this[nomList].filter(listOption => listOption.val.toLowerCase().indexOf(search) > -1)
    );
  }

  plantillaTrabajoColaborativo(radicadoId: number): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorization}`);
    console.log('HTTP Headers:', headers);
    
    this.http.get<{ html: string }>(`${environment.apiUrlBasePath}api/v1/colaborativo/getPlantillaHtml/${radicadoId}`, { headers })
      .subscribe(
        response => {
          if (response && response.html) {
            console.log('HTML data received:', response.html);
            this.editorContent = response.html
          } else {
            console.error('No HTML data found in the response.');
          }
        },
        error => {
          console.error('Error fetching collaborative work template:', error);
        }
      );
  }

  savePlantillaHtml(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorization}`);
    
    // Obteniendo el contenido del editor de HTML
    const body = {
      id : this.radicado_id,
      plantillaHTML: this.editorContent // El contenido que se ha editado
    };
  
    this.http.post(`${environment.apiUrlBasePath}api/v1/colaborativo/savePlantillaHtml`, body, { headers })
      .subscribe(
        response => {
          this.toastService.open({ title: 'Success', description: 'Plantilla guardada exitosamente', duration: 2000, success: false });
          
        },
        error => {
          this.toastService.open({ title: 'Error', description: 'No se guardo la plantilla', duration: 2000, success: false });
        }
      );
  }

  moveTrabajoColaborativo(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorization}`);
    
    const body = {
      radicado_id: this.radicado_id // Se envía el id del radicado que se va a mover
    };
  
    this.http.post(`${environment.apiUrlBasePath}api/v1/colaborativo/moveTrabajoColaborativo`, body, { headers })
      .subscribe(
        response => {
          this.toastService.open({ title: 'Success', description: 'Trabajo colaborativo movido correctamente', duration: 2000, success: true });
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        error => {
          this.toastService.open({ title: 'Error', description: 'Error al mover el trabajo colaborativo', duration: 2000, success: false });
        }
      );
  }

  
  
}

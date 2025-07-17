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

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: 'app-cooperative-modal',
  templateUrl: './cooperative-modal.component.html',
  styleUrls: ['./cooperative-modal.component.css']
})
export class CooperativeModalComponent implements OnInit {

  params: any;

  moduleForm: UntypedFormGroup;
  versionApi = environment.versionApiDefault;
  filteredlistDependencias: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistUsuarios: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  authorization: string;
  radicado_id: any;

  trabajoColaborativoRegistros: any[] = [];

  resSerlistDependencias: any; // Lista de pendencias
  resSerlistDependenciasErr: any; // Lista de pendencias
  resSerlistUsuarios: any; // Lista de usuarios
  resSerlistUsuariosErr: any; // Lista de usuarios
  resSerlistUsuariosExt: any; // Lista de usuarios externos
  resSerlistUsuariosExtErr: any; // Lista de usuarios externos

  listDependenciasInfo: any;
  listUsuariosInfo: any;
  listUsuariosInfoExt: any;
  listDependencias: any;
  listUsuarios: any;
  listMotivoDevolucion: any;

    /** lists filtered + namelist by search keyword */
  // Filtros de informacion
  filteredlistDependenciasInfo: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistUsuariosInfo: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistUsuariosInfoExt: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);

  _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CooperativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private sweetAlertService: SweetAlertService,
    private restService: RestService,
    private globalAppService: GlobalAppService,
    public lhs: LocalStorageService,
    public trabajoColaborativoService: TrabajoColaborativoService
  ) {}

  ngOnInit() {
    this.moduleForm = this.formBuilder.group({
      idDependenciaTramitador: new UntypedFormControl('', Validators.required),
      idUsuarioTramitador: new UntypedFormControl('', Validators.required),
      listDependenciasFilter: new UntypedFormControl(''),
      listUsuariosFilter: new UntypedFormControl('')
    });

    this.trabajoColaborativoService.trabajoColaborativoRegistros$.subscribe(registros => {
        this.trabajoColaborativoRegistros = registros;
    });
    

    // Initialize data
    this.getTokenLS();

    // Filter listeners
    this.moduleForm.controls['listDependenciasFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks('listDependencias');
      });

    this.moduleForm.controls['listUsuariosFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks('listUsuarios');
      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      this.getListDependencia();
      if(this.data.dataSend[0].id)
        this.radicado_id = this.data.dataSend[0].id
        this.trabajoColaborativoService.obtenerUsuariosTrabajoColaborativo(this.radicado_id);
        this.trabajoColaborativoService.getRegistros();
    });
  }


  // Llama la lista de las dependencias
  getListDependencia() {

    // loading true
    this.sweetAlertService.sweetLoading();

    this.restService.restGet(this.versionApi + 'gestionDocumental/trd-dependencias/index-list', this.authorization).subscribe(
      (data) => {
        this.resSerlistDependencias = data;
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.resSerlistDependencias).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {
            this.listDependencias = this.resSerlistDependencias.data;
            this.listDependenciasInfo = this.resSerlistDependencias.data;
            // load the list initial informacition
            this.filteredlistDependenciasInfo.next(this.listDependenciasInfo.slice());
            // load the list initial reasing
            this.filteredlistDependencias.next(this.listDependencias.slice());
          }
          // loading false
          this.sweetAlertService.sweetClose();
        });
      }, (err) => {
        this.resSerlistDependenciasErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerlistDependenciasErr).then((res) => { });
      }
    );
  }

  // Llama la lista de los usuarios
  getListUsuarios( dataDepe, campo, includeUserLogin = false ) {

    // loading true
    this.sweetAlertService.sweetLoading();

    this.params = {
      idDependencia: dataDepe,
      includeUserLogin: includeUserLogin, // true = Indica al servicio que retorne el usuario que se encuentra logueado
    };

    this.restService.restGetParams(this.versionApi + 'user/index-list-by-depe', this.params, this.authorization).subscribe(
      (data) => {
        this.resSerlistUsuarios = data;
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.resSerlistUsuarios).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {

            switch (campo) {
              case 'destino':
                  this.listUsuarios = this.resSerlistUsuarios.data;
                  // load the list initial
                  this.filteredlistUsuarios.next(this.listUsuarios.slice());
              break;
              case 'informa':
                  this.listUsuariosInfo = this.resSerlistUsuarios.data;
                  // load the list initial
                  this.filteredlistUsuariosInfo.next(this.listUsuariosInfo.slice());
              break;
            }

          }
          // loading false
          this.sweetAlertService.sweetClose();
        });
      }, (err) => {
        this.resSerlistUsuariosErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerlistUsuariosErr).then((res) => { });
      }
    );

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
}

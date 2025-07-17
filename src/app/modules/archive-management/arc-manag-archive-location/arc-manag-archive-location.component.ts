/**

 */

import { Component, OnInit } from '@angular/core';
import { ConvertParamsBase64Helper } from 'src/app/helpers/convert-params-base64.helper';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivateTranslateService } from 'src/app/services/activate-translate.service';
import swal from 'sweetalert2';
import { ChangeChildrenService } from 'src/app/services/change-children.service';
import { ToastService } from '@app/services/toast/toast.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: 'app-arc-manag-archive-location',
  templateUrl: './arc-manag-archive-location.component.html',
  styleUrls: ['./arc-manag-archive-location.component.css']
})
export class ArcManagArchiveLocationComponent implements OnInit {

  // Autorizacion de localstorage
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID = 0;
  // Nombre del formulario
  textFormView = 'Detalle'; // i18n
  textFormView2 = 'Localizacion'; // i18n
  /** Datos que solicita el ViewList */
  // Ruta a consultar en el ViewList
  reuteLoadView: string = 'gestionDocumental/expedientes/view';
  // Ruta a actualizar en el ViewList
  routeBotonUpdateView: string = '/setting/providers-update/';
  // Icono del ViewList
  initCardHeaderIcon = 'batch_prediction';
  // Ruta a redirigir
  redirectionPath = '/archiveManagement/archive-filing-index';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Gestión de archivo', 'route': '/archiveManagement' },
    { 'name': 'Archivar radicado', 'route': this.redirectionPath }
  ];
  breadcrumbRouteActive = 'Detalles';

  /** Initial List */
  initCardHeaderStatus = true;
  initCardHeaderTitle = 'Radicados del expediente';
  routeLoadDataTablesService: string = environment.versionApiDefault + 'gestionArchivo/gestion-archivo/view';
  routeIndIndex: string = '/documentManagement/folder-ind-index/';
  viewColumStatus: false; // Se olculta el campo status
  classMainConten: string = '';
  classContainerFluid: string = '';
  dtTitles: any = [
     { 'title': 'Número radicado', 'data': 'numeroRadicado' },
     { 'title': 'Asunto', 'data': 'asunto' },
     { 'title': 'Tipo documental', 'data': 'tipoDocumental' },
     { 'title': 'Fecha creacion', 'data': 'creacion' },
     { 'title': 'Estado', 'data': 'statusText' },
  ];


  /**  Variables Servicios*/
  dataRows: any;
  dataLocation: any;
  dataSend: any;
  // Version api
  versionApi = environment.versionApiDefault;
  // Variables de servicios
  responseServiceView: any;
  responseServiceViewErr: any;
  // Estado del expediente
  statusExpedient: any;
  moduleForm: UntypedFormGroup;
  idLocationFile: number;
  textForm = 'Archivar radicado';

  // Variables se consumos de servicios
  resSerlistDepart: any;
  resSerlistDepartErr: any;
  resSerlistMunicipios: any;
  resSerlistMunicipiosErr: any;
  resSerListGeneral: any;
  resSerListGeneralErr: any;

  // Variables para las listas
  listDepart: any;
  listMunicipios: any;
  listEdificio: any;
  listPiso: any;
  listBodega: any;
  listCajas: any;
  listPasillo: any;
  listModulo: any;
  listEntrepano: any;
  listCaja: any;

  valueConservacion = 0; // Id del value de conservación
  dataUConserva: any;
  idExpediente = 0; // Id del expediente
  viewDataForm = Object.keys;
  dataIdBodegaContenido: any;
  validTextType: boolean = false;


  /** lists filtered + namelist by search keyword */
  filteredlistDepart: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistMunicipios: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistEdificio: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistPiso: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistBodega: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistPasillo: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistModulo: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistEntrepano: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistCaja: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistCajas: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  
  constructor(private toast: ToastService,private route: ActivatedRoute, public lhs: LocalStorageService, public sweetAlertService: SweetAlertService, public restService: RestService, private router: Router, public globalAppService: GlobalAppService,private formBuilder: UntypedFormBuilder) { 
    this.paramiD = this.route.snapshot.paramMap.get('id'); // SE recibe el id
    this.paramOID = ConvertParamsBase64Helper(this.paramiD); // Se pasa al html como componete para que reciba el ID
    this.routeBotonUpdateView = this.routeBotonUpdateView + this.paramiD;
    this.dataSend = [
      {id: this.paramOID}
    ];
      this.moduleForm = this.formBuilder.group({
    idExpediente: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    idDepartamentoGaEdificio: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    idMunicipioGaEdificio: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    idGaEdificio: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    idGaPiso: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    idGaBodega: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    unidadConservacionGaArchivo: new UntypedFormControl(1, Validators.compose([
      Validators.required
    ])),
    pasilloGaArchivo: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    moduloGaArchivo: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    listRackFilter: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    entrepanoGaArchivo: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    cajaGaArchivo: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    unidadCampoGaArchivo: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    caja_id: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    idGaBodegaContenido: new UntypedFormControl('', Validators.compose([
      Validators.required
    ])),
    /** Campos para hacer la busqueda en las listas este deben llamarse
     * Como las listas  "nombreLista + Filter"
     */
    listDepartFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listMunicipiosFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listEdificioFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listPisoFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listBodegaFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listPasilloFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listModuloFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listEntrepanoFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listCajaFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),
    listCajasFilter: new UntypedFormControl('', Validators.compose([
      // Validators.required
    ])),

  });
  }




  ngOnInit() {
    // Hace el llamado del token
    this.getTokenLS();

   
  }

  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      if (this.paramOID != 0) {
        this.getCallUrl(this.authorization);
      }
       /** Llamado de los servicios para las listas */
       this.getListDepart();
       // envia data del idexpediente inicialmente
       this.getListGeneral(0);

    });
  }
  
  getCallUrl(authori) {

    let params = {
      id: this.paramOID
    };

    this.restService.restGetParams( this.versionApi + this.reuteLoadView, params, authori).subscribe(
      (res) => {
        this.responseServiceView = res;
        console.log(this.responseServiceView)
        // console.log(this.responseServiceView);
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.responseServiceView, false, this.redirectionPath).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {
            if (this.responseServiceView) {
              this.dataRows = this.responseServiceView.data;
              this.dataLocation = this.responseServiceView.dataExpArchivo;
              this.patchValuesForm();
              this.idLocationFile = this.dataLocation[0]['value']
              this.statusExpedient = this.responseServiceView.statusExpedient;
            }
          }
        });
      }, (err) => {
        this.responseServiceViewErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.responseServiceViewErr, true, this.redirectionPath).then((res) => { });
      }
    );

  }

  patchValuesForm(){
    

     this.moduleForm.controls['idDepartamentoGaEdificio'].valueChanges.subscribe((e) => {
      this.getListMunicipio(this.moduleForm.controls['idDepartamentoGaEdificio'].value)

      this.moduleForm.patchValue({
        /* idGdExpediente: this.dataLocation[0].value,
        idGaEdificio: this.dataLocation[1].value,
        idGaPiso: this.dataLocation[2].value,
        idGaBodega: this.dataLocation[3].value,
        unidadConservacionGaArchivo: this.dataLocation[4].value,
        moduloGaArchivo: this.dataLocation[5].value,
        pasilloGaArchivo: this.dataLocation[6].value,
        entrepanoGaArchivo: this.dataLocation[7].value,
        cajaGaArchivo: this.dataLocation[8].value,
        unidadCampoGaArchivo: this.dataLocation[9].value,
        caja_id: this.dataLocation[10].value,
        idGaBodegaContenido: this.dataLocation[11].value,
        idMunicipioGaEdificio: 1, */

        //TEST
        idGaPiso: this.dataLocation[2].value,
        idGaEdificio: 1, //TODO: Validate field with backend
        unidadCampoGaArchivo: "123",//TODO: Validate field with backend
        idMunicipioGaEdificio: 1,//bogota
        idGaBodega: 1,//TODO: Validate field with backend
        moduloGaArchivo: parseInt(this.dataLocation[5].value),
        pasilloGaArchivo: parseInt(this.dataLocation[4].value),
        entrepanoGaArchivo: parseInt(this.dataLocation[6].value),//TODO: Validate field with backend
        cajaGaArchivo: this.dataLocation[7].value,
        caja_id: 1 //TODO: Validate field with backend
      });
  
      this.getListGeneral(1)
    })


    this.moduleForm.patchValue({
      idDepartamentoGaEdificio: 1,//cundinamarca
    });

  }

  /**
   *
   * @param event
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {
   
  }

  editLocationForm (){
    // if (this.moduleForm.valid) {
      console.log( this.moduleForm.getRawValue() );
      // this.moduleForm.getRawValue() envia todos los valores del formulario aunque esten en disable
      const data = {
        idGdExpediente: this.dataLocation[0].value,
        idGaEdificio: this.moduleForm.getRawValue()['idGaEdificio'],
        idGaPiso: this.moduleForm.getRawValue()['idGaPiso'],
        idGaBodega: this.moduleForm.getRawValue()['idGaBodega'],
        unidadConservacionGaArchivo: this.moduleForm.getRawValue()['unidadConservacionGaArchivo'],
        moduloGaArchivo: this.moduleForm.getRawValue()['moduloGaArchivo'],
        pasilloGaArchivo: this.moduleForm.getRawValue()['pasilloGaArchivo'],
        entrepanoGaArchivo: this.moduleForm.getRawValue()['entrepanoGaArchivo'],
        cajaGaArchivo: this.moduleForm.getRawValue()['cajaGaArchivo'],
        unidadCampoGaArchivo: this.moduleForm.getRawValue()['unidadCampoGaArchivo'],
        caja_id: this.moduleForm.getRawValue()['caja_id'],
        idGaBodegaContenido: this.moduleForm.getRawValue()['idGaBodegaContenido']
      };
      console.log(this.paramOID, this.dataLocation, data, this.idLocationFile)
  
      this.restService.restPut(`${this.versionApi}api/gestion-archivo/archivo/${this.idLocationFile}`, data, this.authorization).subscribe(
        (response) => {
          console.log('La solicitud PUT se ha completado con éxito:', response);
          this.toast.open({
            title: 'Actualización éxitosa',
            description: 'El formulario se ha actualizado con exito.'
          })
          this.editMode = !this.editMode;
          // Realizar acciones adicionales si es necesario
        },
        (error) => {
          this.toast.open({
            title: 'Error',
            description: 'Error al realizar la solicitud.'
          })
          console.error('Error al realizar la solicitud PUT:', error);
          // Manejar el error apropiadamente
        }
      );
    // } else {
    //   console.log( this.moduleForm.getRawValue() );
    //   this.sweetAlertService.sweetInfo('Algo está mal', '');
    // }

  }

  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  submitForm() {
    if (this.moduleForm.valid) {
      console.log( this.moduleForm.getRawValue() );
      // this.moduleForm.getRawValue() envia todos los valores del formulario aunque esten en disable
    } else {
      console.log( this.moduleForm.getRawValue() );
      this.sweetAlertService.sweetInfo('Algo está mal', '');
    }
  }

    // Llama la lista de los departamentos
    getListDepart() {

      let dataCountry = {
        idNivelGeografico1: environment.defaultCountry,
      };
  
      this.restService.restPost(this.versionApi + 'radicacion/radicados/nivel-geografico2', dataCountry, this.authorization).subscribe(
        (data) => {
          this.resSerlistDepart = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistDepart).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.listDepart = this.resSerlistDepart.dataNivelGeografico2;
              // load the list initial
              this.filteredlistDepart.next(this.listDepart.slice());
            }
          });
        }, (err) => {
          this.resSerlistDepartErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistDepartErr).then((res) => { });
        }
      );
    }
  
    // Llama la lista de los Municipios
    getListMunicipio(val) {
  
      let dataMuni = {
        idNivelGeografico2: val,
      };
  
      this.restService.restPost(this.versionApi + 'radicacion/radicados/nivel-geografico3', dataMuni, this.authorization).subscribe(
        (data) => {
          this.resSerlistMunicipios = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerlistMunicipios).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              this.listMunicipios = this.resSerlistMunicipios.dataNivelGeografico3;
              // load the list initial
              this.filteredlistMunicipios.next(this.listMunicipios.slice());
            }
          });
        }, (err) => {
          this.resSerlistMunicipiosErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerlistMunicipiosErr).then((res) => { });
        }
      );
    }
  
    // Llama la lista de los edificios
    getListGeneral(val) {
  
      if (this.idExpediente != 0 ) {
        this.moduleForm.controls['idExpediente'].setValue(this.idExpediente);
      }

      this.restService.restGetParams(this.versionApi + 'gestionArchivo/gestion-archivo/get-general-list', this.moduleForm.value, this.authorization).subscribe(
        (data) => {
          this.resSerListGeneral = data;
          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(this.resSerListGeneral).then((res) => {
            let responseResolveResponse = res;
            if (responseResolveResponse == true) {
              // Lista edificios
              if (this.resSerListGeneral.dataGaEdificio) {
                this.listEdificio = this.resSerListGeneral.dataGaEdificio;
                // load the list initial
                this.filteredlistEdificio.next(this.listEdificio.slice());
              }
              // Lista piso
              if (this.resSerListGeneral.dataGaPiso) {
                this.listPiso = this.resSerListGeneral.dataGaPiso;
                // load the list initial
                this.filteredlistPiso.next(this.listPiso.slice());
              }
              // Lista del área de archivo (anteriromente bodega)
              if (this.resSerListGeneral.dataGaBodega) {
                this.listBodega = this.resSerListGeneral.dataGaBodega;
                // load the list initial
                this.filteredlistBodega.next(this.listBodega.slice());
              }
              // Lista u conservacion archivo
              if (this.resSerListGeneral.dataUConservacionGaArchivo) {
                this.dataUConserva = this.resSerListGeneral.dataUConservacionGaArchivo;
              }
              // Lista Estantes
              if (this.resSerListGeneral.dataPasilloGaBodega) {
                this.listPasillo = this.resSerListGeneral.dataPasilloGaBodega;
                // load the list initial
                this.filteredlistPasillo.next(this.listPasillo.slice());
              }
              // Lista Rack
              if (this.resSerListGeneral.dataModuloGaBodega) {
                this.listModulo = this.resSerListGeneral.dataModuloGaBodega;
                // load the list initial
                this.filteredlistModulo.next(this.listModulo.slice());
              }
              // Lista entrepaño
              if (this.resSerListGeneral.dataEntrepanoGaBodega) {
                this.listEntrepano = this.resSerListGeneral.dataEntrepanoGaBodega;
                // load the list initial
                this.filteredlistEntrepano.next(this.listEntrepano.slice());
              }
              // Lista caja
              if (this.resSerListGeneral.dataCajaGaBodega) {
                this.listCaja = this.resSerListGeneral.dataCajaGaBodega;
                // load the list initial
                this.filteredlistCaja.next(this.listCaja.slice());
              }
  
              // Lista cajas
              if (this.resSerListGeneral.dataCajas) {
                this.listCajas = this.resSerListGeneral.dataCajas;
                // load the list initial
                this.filteredlistCajas.next(this.listCajas.slice());
              }
  
              // asigna el valor de la configuracion de la bodega
              this.moduleForm.controls['idGaBodegaContenido'].setValue(this.resSerListGeneral.dataIdGaBodegaContenido);
  
              if ( this.resSerListGeneral.dataArchivo) {
                for (let name in this.resSerListGeneral.dataArchivo) {
                  if (this.moduleForm.controls[name] && this.resSerListGeneral.dataArchivo[name] != '' && this.resSerListGeneral.dataArchivo[name] != 0) {
                    // Asigna el valor
                    this.moduleForm.controls[name].setValue(this.resSerListGeneral.dataArchivo[name]);
                    // Bloquea el campo para que no sea editable
                    this.moduleForm.controls[name].disable();
                    // Consulta la lista de Municipio con el departamento
                    if ( name == 'idMunicipioGaEdificio'){
                      this.getListMunicipio(this.resSerListGeneral.dataArchivo[name]);
                    }
                    // ASigna el valor para el radio button 
                    if ( name == 'unidadConservacionGaArchivo'){
                      this.valueConservacion = this.resSerListGeneral.dataArchivo[name];
                    }
                  }
                }
              }
  
            }
          });
        }, (err) => {
          this.resSerListGeneralErr = err;
          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(this.resSerListGeneralErr).then((res) => { });
        }
      );
    }

}

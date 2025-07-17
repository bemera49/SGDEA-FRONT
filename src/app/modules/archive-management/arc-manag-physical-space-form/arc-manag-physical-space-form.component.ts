/**

 */

import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl, UntypedFormArray } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { RestService } from 'src/app/services/rest.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

import { of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ActivateTranslateService } from '../../../services/activate-translate.service';
import { ModalService } from "src/app/services/modal/modal.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddFileComponent } from './add-file/add-file.component';
import { MatDialog } from '@angular/material/dialog';
import { MoveFileComponent } from './move-file/move-file.component';
import { RemoveFileComponent } from './remove-file/remove-file.component';
import { AddBoxComponent } from './add-box/add-box.component';
import { MoveBoxComponent } from './move-box/move-box.component';
import { RemoveBoxComponent } from './remove-box/remove-box.component';

export interface ListaBusq {
  id: string;
  val: string;
}

@Component({
  selector: 'app-arc-manag-physical-space-form',
  templateUrl: './arc-manag-physical-space-form.component.html',
  styleUrls: ['./arc-manag-physical-space-form.component.css']
})
export class ArcManagPhysicalSpaceFormComponent implements OnInit, OnDestroy {

  @Output() public submitFormEmit = new EventEmitter<any>();
  // Parametro de operaciones
  @Input() paramOID = 0;
  // Parametro para agregar edificios
  @Input() statusButtonAdd: boolean = false;
  // Nombre de tarjetas del formulario
  @Input() textForm = 'Datos del edificio';
  // Iconos del formulario
  @Input() initCardHeaderIcon = 'business';
  @Input() initCardHeaderIconDatos = 'library_books';
  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    { 'name': 'Gestión de archivo', 'route': '/archiveManagement' },
  ];
  @Input() breadcrumbRouteActive = 'Edificio';
  @Input() showUnidadesAlmacenamientoForm = false;
  // Valida typo
  validTextType: boolean = false;
  dataForm = []; // Guarda los datos del formulario
  // viewDataForm = []; // Guarda los datos del formulario para mostrar los
  viewDataForm = Object.keys;
  nombreGaBodega: UntypedFormArray; // Guarda los datos del formulario
  // Variable del formulario
  moduleForm: UntypedFormGroup;
  resResolveResponse: any;
  resResolveResponseErr: any;
  resSerlistDepart: any;
  resSerlistDepartErr: any;
  resSerlistMunicipios: any;
  resSerlistMunicipiosErr: any;
  resSerlistEdificios: any;
  resSerlistEdificiosErr: any;
  resSerlistTiposCajas: any;
  resSerlistTiposCajasErr: any;

  // Autentificacion
  authorization: string;
  // Version api
  versionApi = environment.versionApiDefault;
  // Ruta a redirigir
  redirectionPath = '/archiveManagement/physical-space-index';
  // Variables de consumo de servicios
  resSerFormSubmit: any;
  resSerFormSubmitErr: any;
  // Variables para el boton flotante
  iconMenu: string = 'save';
  dataLang: any;
  listDepart: any;
  listMunicipios: any;
  listEdificios: any;
/*   listTiposCaja: any; */

  tiposUnidadAlmacenamiento = [
    { id: 1, value: "X300" },
    { id: 2, value: "X200" },
    { id: 3, value: "X100" },
    { id: 4, value: "Cofre" }
  ]

  /** Las variables para mostrar la alerta informativa  */
  @Input() initialNotificationClassAlert: string = 'alert alert-info alert-with-icon';
  @Input() initialNotificationStatus = false; // muestra la notificacion
  @Input() initialNotificationMessage = 'textFormPhysicalSpace';

  /** lists filtered + namelist by search keyword */
  filteredlistDepart: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistMunicipios: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistCara: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);
  filteredlistEdificios: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>();
  filteredlistTiposCaja: ReplaySubject<ListaBusq[]> = new ReplaySubject<ListaBusq[]>(1);

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  /** Variables de internacionalización */
  activeLang: string;
  languageReceive: any;

  subscriptionTranslateService$: Subscription;

  /**Variables para unidades de almacenamiento */
  public dataUnidadesAlmaceamiento: any[] =  []
  dtTitles = [
    { title: 'Unidad almacenamiento' },
    { title: 'Tipo unidad' },
  ];


  columns = [
    { data: 'code' },
    { data: 'boxType' },
  ];

  datosEntrepano = null;


  constructor(private formBuilder: UntypedFormBuilder, public lhs: LocalStorageService, public restService: RestService,
    public globalAppService: GlobalAppService, public sweetAlertService: SweetAlertService,
    private translate: TranslateService, private activateTranslateService: ActivateTranslateService, private modal: ModalService,
    private http: HttpClient,
    private dialog: MatDialog, 
  ) {

    this.detectLanguageInitial();

    /**
     * Configuración del formulario
     */
    this.moduleForm = this.formBuilder.group({
      selectGaEdificio: new UntypedFormControl('', Validators.compose([])),
      nombreGaEdificio: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      idDepartamentoGaEdificio: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      idMunicipioGaEdificio: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      numeroPiso: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])),
      numeroGaPiso: new UntypedFormControl('', Validators.compose([
        // Validators.required
      ])),
      nombreGaBodega: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      cantidadModuloGaBodegaContenido: new UntypedFormControl('', Validators.compose([
        // Validators.required,
        // Validators.pattern("^[1-9]*$")
      ])),
      cantidadPasilloGaBodegaContenido: new UntypedFormControl('', Validators.compose([
        // Validators.required,
        // Validators.pattern("^[1-9]*$")
      ])),
      cantidadEntrepanoGaBodegaContenido: new UntypedFormControl('', Validators.compose([
        // Validators.required
        // Validators.pattern("^[1-9]*$")
      ])),
      cantidadCajaGaBodegaContenido: new UntypedFormControl('', Validators.compose([
        // Validators.required
        // Validators.pattern("^[1-9]*$")
      ])),
      cantidadCajasEntrepano: new UntypedFormControl('', Validators.compose([
        // Validators.required
        // Validators.pattern("^[1-9]*$")
      ])),
      idTipoCaja: new UntypedFormControl('', Validators.compose([
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
      /* listTiposCajasFilter: new UntypedFormControl('', Validators.compose([
        // Validators.required
      ])), */
      /* tipoUnidadAlmacenamiento: new UntypedFormControl('', Validators.compose([
        // Validators.required
      ])) */
    });

  }

  ngOnInit() {
    // Detectando si se ejecuta cambio de idioma
    this.detectLanguageChange();
    // Hace el llamado del token
    this.getTokenLS();
    // listen for search field value changes
    this.moduleForm.controls['listDepartFilter'].valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterBanks('listDepart');
    });
    // listen for search field value changes
    this.moduleForm.controls['listMunicipiosFilter'].valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterBanks('listMunicipios');
    });
    // listen for search field value changes
   /*  this.moduleForm.controls['listTiposCajasFilter'].valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterBanks('listTiposCaja')
    }); */


  }

  submitForm() {
    //console.log(this.moduleForm.value);
    if (this.moduleForm.valid) {
      this.moduleForm.controls['numeroGaPiso'].setValue(this.dataForm);
      // console.log( this.moduleForm.value );
      this.submitFormEmit.emit(this.moduleForm.value);

    } else {
      this.sweetAlertService.sweetInfo('Por favor verifique, datos obligatorios incompletos', '');
    }
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;

      /** Llamado de los servicios para las listas */
      this.getListDepart();
      this.getListEdificios();
      this.getListTiposCajas();

      if (this.paramOID != 0) {
        this.onSearchId(this.paramOID, this.authorization);
      }
    });
  }

  /*
  * param - id del rol a buscar
  * param - authori variable de la autorizacion del localstorage
  */
  onSearchId(id, authori) {

    // loading Active
    this.sweetAlertService.sweetLoading();
    let params = {
      id: this.paramOID
    };

    this.restService.restGetParams( this.versionApi + 'gestionArchivo/espacio-fisico/index-one', params, authori).subscribe(
      (res) => {
        this.resSerFormSubmit = res;
        this.fetchUnidadesAlmacenamiento()
        // console.log( this.resSerFormSubmit );
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.resSerFormSubmit, true, this.redirectionPath ).then((res) => {
          let resResolveResponse = res;
          if (resResolveResponse == true) {
            if (this.resSerFormSubmit.data) {
              for (let name in this.resSerFormSubmit.data) {
                if (this.moduleForm.controls[name]) {
                  this.moduleForm.controls[name].setValue(this.resSerFormSubmit.data[name]);
                }
                // Hace llamado a municios
                if ( name == 'idDepartamentoGaEdificio' ) {
                  this.getListMunicipio(this.resSerFormSubmit.data[name]);
                }
                // Asigna el valor al numero piso
                if ( name == 'numeroGaPiso'){
                  this.moduleForm.controls['numeroPiso'].setValue(this.resSerFormSubmit.data[name]);
                }
              }

              if (this.resSerFormSubmit.canUpdate == false) {
                this.moduleForm.controls['nombreGaEdificio'].disable();
                this.moduleForm.controls['idDepartamentoGaEdificio'].disable();
                this.moduleForm.controls['idMunicipioGaEdificio'].disable();
                this.moduleForm.controls['numeroPiso'].disable();
              }
            }
            this.sweetAlertService.sweetClose();
          }
        });
      }, (err) => {
        this.resSerFormSubmitErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerFormSubmitErr, true, this.redirectionPath ).then((res) => { });
      }
    );
    
  }

  typeInputEdificio = 'input' // input | select
  changeInputEdificio(){
    if(this.typeInputEdificio == 'input'){
      this.typeInputEdificio = 'select';
    }else{
      this.typeInputEdificio = 'input';
    }
  }

  onSelectEdificio(event){
    this.moduleForm.controls['nombreGaEdificio'].setValue(this.moduleForm.controls['selectGaEdificio'].value);
    this.typeInputEdificio = 'input'
  }

  /**
   * funcion que agrega el item al formulario
   */
  addItem () {
      this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
        // let numPiso = (this.moduleForm.controls['numeroPiso'].value != '' ? this.moduleForm.controls['numeroPiso'].value : 1 );
        let numPiso = this.moduleForm.controls['numeroPiso'].value;
        let nomBodega = this.moduleForm.controls['nombreGaBodega'].value;
        let canModulo = this.moduleForm.controls['cantidadModuloGaBodegaContenido'].value;
        let canPasillo = this.moduleForm.controls['cantidadPasilloGaBodegaContenido'].value;
        let canEntrepanyo = this.moduleForm.controls['cantidadEntrepanoGaBodegaContenido'].value;
        let canCaja = this.moduleForm.controls['cantidadCajaGaBodegaContenido'].value;
        let canCajasEntrepano = this.moduleForm.controls['cantidadCajasEntrepano'].value;
        let idTipoCaja = this.moduleForm.controls['idTipoCaja'].value;
        // Verifica los mensajes según el idioma
        this.sweetAlertService.text18nGet().then( (res) => {
          this.dataLang = res;
          // Valida piso
          if ( numPiso == '' ) {
            this.sweetAlertService.sweetInfo('Algo está mal', [this.dataLang['El piso es obligatorio']]);
            return false;
          }
          // Valida nombre del área de archivo (anteriromente bodega)
          else if ( nomBodega == '' ) {
            this.sweetAlertService.sweetInfo('Algo está mal', [this.dataLang['El área de archivo es obligatoria']]);
            return false;
          }
  
          let data = {
            numeroGaPiso: numPiso ? numPiso : 1,
            nombreGaBodega: nomBodega,
            cantidadModuloGaBodegaContenido: ( canModulo != '' && canModulo != 0 ? canModulo : 1),
            cantidadPasilloGaBodegaContenido: ( canPasillo != '' && canPasillo != 0 ? canPasillo : 1),
            cantidadEntrepanoGaBodegaContenido: (canEntrepanyo != '' && canEntrepanyo != 0 ? canEntrepanyo : 1),
            cantidadCajaGaBodegaContenido: (canCaja != '' && canCaja != 0 ? canCaja : 1),
            cantidadCajasEntrepano: (canCajasEntrepano != '' && canCajasEntrepano != 0 ? canCajasEntrepano : 1),
            idTipoCaja: (idTipoCaja != '' && idTipoCaja != 0 ? idTipoCaja : 1)
          };
  
          this.createItem(data);
        });
      })
  }

  /**
   * Metodo que crea un item
   * @param data del remitente
   */
  createItem(data) {

    // Data del contenido del área de archivo (anteriromente bodega)
    let dataBodega = {
      cantidadModuloGaBodegaContenido: data.cantidadModuloGaBodegaContenido,
      cantidadPasilloGaBodegaContenido: data.cantidadPasilloGaBodegaContenido,
      cantidadEntrepanoGaBodegaContenido: data.cantidadEntrepanoGaBodegaContenido,
      cantidadCajaGaBodegaContenido: data.cantidadCajaGaBodegaContenido,
      cantidadCajasEntrepano: data.cantidadCajasEntrepano,
      idTipoCaja: data.idTipoCaja
    };

    // Estructura del área de archivo con el cotenido del área de archivo (anteriromente bodega)
    let estructura: any = {};
    estructura[data.nombreGaBodega] = dataBodega;
    // Verifica si existe el piso
    if (this.dataForm.hasOwnProperty(data.numeroGaPiso)) {
      // Valida si existe el área de archivo (anteriromente bodega)
      if (this.dataForm[data.numeroGaPiso]['nombreGaBodega'].hasOwnProperty(data.nombreGaBodega)) {
        // Asigna los valores al área de archivo existente (anteriromente bodega)
        this.validarRegistroExistente(this.dataForm[data.numeroGaPiso]['nombreGaBodega'][data.nombreGaBodega] , dataBodega);
        this.dataForm[data.numeroGaPiso]['nombreGaBodega'][data.nombreGaBodega] = dataBodega;
      } else {
        // crea el área de archivo con el contenido (anteriromente bodega)
        Object.assign(this.dataForm[data.numeroGaPiso]['nombreGaBodega'], estructura);
      }
    } else {
      // crea el piso con el área de archivo (anteriromente bodega)
      this.dataForm[data.numeroGaPiso] = {'nombreGaBodega' : estructura };
    }
  }

  validarRegistroExistente(data1, data2) {
    if (
      data1.cantidadCajaGaBodegaContenido == data2.cantidadCajaGaBodegaContenido &&
      data1.cantidadEntrepanoGaBodegaContenido == data2.cantidadEntrepanoGaBodegaContenido &&
      data1.cantidadModuloGaBodegaContenido == data2.cantidadModuloGaBodegaContenido &&
      data1.cantidadPasilloGaBodegaContenido == data2.cantidadPasilloGaBodegaContenido &&
      data1.cantidadCajasEntrepano == data2.cantidadCajasEntrepano &&
      data1.idTipoCaja == data2.idTipoCaja
    ) {
      let errors = { error: this.translate.instant('Estos datos han sido ingresados ​​previamente') };
      this.sweetAlertService.sweetInfo('Algo está mal', errors);
    }
  }

  /**
   * Funcion que elimina los valores agregados en un objeto tiene que tener minimo un piso y un área de archivo (anteriromente bodega)
   * @param index Key de objeto
   * @param campo
   * @param piso // Solo se envia cuando es área de archivo (anteriromente bodega)
   */
  deleteItem(index, campo, piso = 0 ) {
    switch (campo) {
      case 'Piso':
          if ( Object.keys(this.dataForm).length > 1 ) {
            delete this.dataForm[index];
          }
      break;
      case 'Bodega':
        // console.log(  Object.keys(this.dataForm[piso]['nombreGaBodega']).length );
        if ( Object.keys(this.dataForm[piso]['nombreGaBodega']).length > 1 ) {
          delete this.dataForm[piso]['nombreGaBodega'][index];
        }
      break;

    }
  }

  // Llama la lista de los edificios
  getListEdificios() {

    this.restService.restGet(this.versionApi + 'gestionArchivo/espacio-fisico/list-edificios', this.authorization).subscribe(
      (data) => {
        this.resSerlistEdificios = data;
        //Evaluar la respuesta del servcicio
        this.globalAppService.resolveResponse(this.resSerlistEdificios).then((res) => {
          let responseResolveResponse = res;
          if (responseResolveResponse == true) {
            this.listEdificios = this.resSerlistEdificios.dataidGaEdificio;
            //load the list initial
            this.filteredlistEdificios.next(this.listEdificios.slice());
          }
        });
      }, (err) => {
        this.resSerlistEdificiosErr = err.message;
        // Evalua respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerlistEdificiosErr).then((res) => {})
      }
    );
  }

  // Llama la lista de los tipos de cajas
  getListTiposCajas() {
    this.restService.restGet(this.versionApi + 'api/gestion-archivo/tipos-cajas', this.authorization).subscribe(
      (data) => {
        this.resSerlistTiposCajas = data;
        //Evaluar la respuesta del servcicio
        this.globalAppService.resolveResponse(this.resSerlistTiposCajas).then((res) => {
          let responseResolveResponse = res;
         /*  if (responseResolveResponse == true) {
            this.listTiposCaja = this.resSerlistTiposCajas.data;
            //load the list initial
            this.filteredlistTiposCaja.next(this.listTiposCaja.slice());
          } */
        });
      }, (err) => {
        console.error("Error:", err);
        this.resSerlistTiposCajasErr = err.message;
        // Evalua respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerlistTiposCajasErr).then((res) => {})
      }
    );
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

  /**
   * Recibe el nombre de la lista para realizar la busqueda segun el filtro
   * @param nomList nombre lista
   */
  filterBanks(nomList) {
    if (!this[nomList]) {
      return;
    }
    // get the search keyword
    let search = this.moduleForm.controls[nomList + 'Filter'].value;
    if (!search) {
      this['filtered' + nomList].next(this[nomList].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this['filtered' + nomList].next(
      this[nomList].filter( listOption => listOption.val.toLowerCase().indexOf(search) > -1)
    );
  }

  /**Function only nunmber  */
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param event
   * Cuando se hace clic en el botón se envia el formulario
   */
  menuPrimaryReceiveData(event) {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      let buttonSubmit = <HTMLFormElement>document.getElementById('sendForm');
      buttonSubmit.click();
    })
  }

  /** Métodos para el uso de la internacionalización */
  detectLanguageInitial() {
    if (localStorage.getItem('language')) {
      this.activeLang = localStorage.getItem('language');
    } else {
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.activeLang);
  }

  detectLanguageChange() {
    this.subscriptionTranslateService$ = this.activateTranslateService.activateLanguageChange.subscribe(language => {
      this.languageReceive = language;
      this.translate.setDefaultLang(this.languageReceive);
    });
  }
  /** Fin Métodos para el uso de la internacionalización */
  /**Métodos HU013 unidades almacenamiento */

  
  fetchUnidadesAlmacenamiento() {
    
    const token = this.restService.getUserData().accessToken;
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    this.datosEntrepano = {
      "idGaEdificio": this.resSerFormSubmit['data']['idGaEdificio'],
      "idGaPiso": this.resSerFormSubmit['data']['idGaPiso'],
      "idGaBodega": this.resSerFormSubmit['data']['idGaBodega'],
      "pasilloGaArchivo": this.resSerFormSubmit['data']['cantidadPasilloGaBodegaContenido'],
      "moduloGaArchivo": this.resSerFormSubmit['data']['cantidadModuloGaBodegaContenido'],
      "entrepanoGaArchivo": 1
      // "entrepanoGaArchivo": this.resSerFormSubmit['data']['cantidadEntrepanoGaBodegaContenido']
    }

    let data = this.datosEntrepano;
    
    // return this.http.get(environment.apiUrlBasePath + `api/gestion-archivo/archivo`, httpOptions).pipe(
    console.log(this.resSerFormSubmit, data);
    return this.http.post(environment.apiUrlBasePath + `api/gestion-archivo/cajas-archivo`, data, httpOptions).pipe(
      
      map((data: any) => {
        return data.response
      })
    ).subscribe(res => {
      console.log(res)
      this.dataUnidadesAlmaceamiento = res
    })
  }

  agregarUnidadAlmacenamiento() {
    const dialogRef = this.dialog.open(AddBoxComponent, 
      {
      
      disableClose: false,
      width: '50%',
      data: {
        datosEntrepano: this.datosEntrepano,
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }

  tranladarUnidadAlmacenamiento(row) {
    const dialogRef = this.dialog.open(MoveBoxComponent, 
      {
      
      disableClose: false,
      width: '50%',
      data: {
        datosEntrepano: this.datosEntrepano,
        row,
        dataUnidadesAlmaceamiento: this.dataUnidadesAlmaceamiento,
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }

  retirarUnidadDeAlmacenamiento(row){
  
    const dialogRef = this.dialog.open(RemoveBoxComponent, {
      disableClose: false,
      width: '50%',
      data: {
        row,
        datosEntrepano: this.datosEntrepano
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }
  
  agregarUnidadDeConservacion(row){

    
    let dataToSave = {
      ...this.datosEntrepano,
      "caja_id": row.box.id
      // "entrepanoGaArchivo": this.resSerFormSubmit['data']['cantidadEntrepanoGaBodegaContenido']
    }
    console.log(row)
    const dialogRef = this.dialog.open(AddFileComponent, {
      disableClose: false,
      width: '50%',
      data: {
        dataToSave
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }

  transladarUnidadDeConservacion(row, file){
    

    const dialogRef = this.dialog.open(MoveFileComponent, {
      disableClose: false,
      width: '50%',
      data:  {
        idgaArchivo: file.idgaArchivo,
        dataUnidadesAlmaceamiento: this.dataUnidadesAlmaceamiento,
        boxCode: row.box.code,
        unidadCampoGaArchivo: file.unidadConservacionGaArchivo
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }
  retirarUnidadDeConservacion(row, file){
    
    let datosEntrepano = {
      ...this.datosEntrepano,
    }

    console.log(row)
    console.log(file)
    const dialogRef = this.dialog.open(RemoveFileComponent, {
      disableClose: false,
      width: '50%',
      data: {
        idgaArchivo: file.idgaArchivo,
        idCaja: row.box.id,
        datosEntrepano,
        boxCode: row.box.code,
        unidadCampoGaArchivo: file.unidadConservacionGaArchivo
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.fetchUnidadesAlmacenamiento()
    });
  }

  /**Fin Métodos HU013 unidades almacenamiento */

  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '@app/modules/components/table/service/table.service';
import { UtilsService } from '@app/modules/pqrs/pqrs-view/useCases/utils.service';
import { ActivateTranslateService } from '@app/services/activate-translate.service';
import { AuthService } from '@app/services/auth.service';
import { ChangeChildrenService } from '@app/services/change-children.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, map, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filing-radicados-email-index',
  templateUrl: './filing-radicados-email-index.component.html',
  styleUrls: ['./filing-radicados-email-index.component.css']
})
export class FilingRadicadosEmailIndexComponent implements OnInit {

  versionApi = environment.versionApiDefault;
  breadcrumbOn = [{ 'name': 'Radicación', 'route': '/filing' },];
  breadcrumbRouteActive = 'Correo electrónico';
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'assignment';
  initCardHeaderTitle = 'Listado de solicitudes';
  
  routeLoadDataTablesService: string = this.versionApi + 'radicacion/radicados/index';
  routeChangeStatus: string = this.versionApi + 'radicacion/radicados/change-status';
  initBotonCreateRoute: string = '/filing/filing-create'; // Ruta del botón crear
  eventClickButtonSelectedData: any;
  /**
   * Configuración para el botón flotante
   */
  menuButtonsSelectNull: any = [];
  menuButtonsSelectOne: any = [];

  menuButtonsSelectMasive: any = [];

  /** Variable que controla botón flotante */
  menuButtons: any = this.menuButtonsSelectNull;
  resServices: any;
  authorization: any;
  subscriptionTranslateService$: Subscription;
  languageReceive: any;
  hashLocalStorage: any;
  resErrServices: any;
  route: string = '/filing/filing-radicados-email-index';
  paramFilterActive: any;
  activeLang: string;
  viewColumStatus: boolean = false;
  dataFilter: any = { 'status': 50 };
  dtTitles: any = [
    { 'title': 'NUMERO RADICADO ENTRADA', 'data': 'numeroRadiRadicado' },
    { 'title': 'FECHA DE RADICACION', 'data': 'creacionRadiRadicado' },
    { 'title': 'TIPO SOLICITUD', 'data': 'tiposolicitud' },
    { 'title': 'CANAL', 'data': 'cgMedioRecepcion' },
    { 'title': 'ESTADO', 'data': 'estado' },
  ];
  configDataTable: any = {
    headers : [
      { label: 'NUMERO RADICADO ENTRADA', 'data': 'numeroRadiRadicado', name: 'numeroRadiRadicado', sortable: true, allowed: ['pqrs%columna%numeroradicado'] },
      { label: 'FECHA DE RADICACION', 'data': 'fechaRadiRadicado', name: 'creacionRadiRadicado', sortable: true, allowed: ['pqrs%columna%fecharadicacion'] },
      { label: 'TIPO SOLICITUD', 'data': 'nombreTipoSolicitud', name: 'tipo_solicitud', sortable: true, allowed: ['pqrs%columna%tiposolicitud'] },
      { label: 'CANAL', 'data': 'nombreCanal', name: 'cg_medio_recepcion', sortable: true, allowed: ['pqrs%columna%mediorecepcion'] },
      { label: 'ESTADO', 'data': 'nombreEstado', name: 'estado', sortable: true, allowed: ['pqrs%columna%estado'] },
    ],
    texts: {
      title: 'Listado de solicitudes',
      description: 'Listado de solicitudes',
    },
    // fetch: this.routeLoadDataTablesService,
    idTracker: 'idRadiRadicado',
    actions: [
      { icon: 'search', routerLink: '/filing/filing-update-radicados-email', 
      label: 'Ver' },
    ],
    TableMenuOptions: [
      { icon: 'visibility', action: 'view', title: 'Ver', data: '' },
    ],
    encrypParams: true,
  };
  public tableService: TableService = inject(TableService)
  @ViewChild('tableRef') tableRef;
  public utilsService = inject(UtilsService);
  filterSearch!: FormGroup;
  constructor(
    private restService: RestService,
    private globalAppService: GlobalAppService,
    private activateTranslateService: ActivateTranslateService,
    private translate: TranslateService,
    private lhs: LocalStorageService,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private routeActi: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private changeChildrenService: ChangeChildrenService
    
  ) { 
    /** Idioma inical */
    this.detectLanguageInitial();

    this.paramFilterActive = this.routeActi.snapshot.paramMap.get('params');
    this.filterSearch = this.fb.group({
      numRadicado: ['']
    });
  }

  ngOnInit() {
    /** Detectando si se ejecuta cambio de idioma */
    this.detectLanguageChange();
    
    // Hace el llamado del token
    this.getTokenLS().then((res) => {
      if (res) {
        this.configDataTable.fetch = this.fetchPqrs();
      }
    });
    /**
     *  remover vista anterior al select multiple RadiRadicadoHijos
     */
     localStorage.removeItem(environment.hashRadiAsociados);
     this.eventClickButtonSelectedData = [];

    this.hashLocalStorage = this.authService.decryptAES( localStorage.getItem( environment.hashSgdea ) );
  }

  private getTokenLS(): Promise<any> {
    return new Promise((resolve) => {
      this.lhs.getToken().then((res) => {
        this.authorization = res;
        resolve(true);
      });
    });
  }


  private data: any[] = [];
  fetchPqrs() {
    this.sweetAlertService.sweetLoading('Cargando...');
    const idRol = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.idRol;
    switch (idRol) {
      case 1:
        return this.http.get(environment.apiUrlBasePath + `api/radicacion/estado/1/5/49`, { headers: { Authorization: "Bearer " + this.authorization } }).pipe(
          map((response: any) => (this.data = response, response, this.listaAnterior = response)) 
        )

      // default:
      //   const idUser = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.idDataCliente;
      //   return this.http.get(environment.apiUrlBasePath + `api/radicados?usuario_id=${idUser}`).pipe(
      //     map((response: any) => response.data)
      //   )
    }
  }

  

  detectLanguageChange() {
    this.subscriptionTranslateService$ = this.activateTranslateService.activateLanguageChange.subscribe(language => {
      this.languageReceive = language;
      this.translate.setDefaultLang(this.languageReceive);
    });
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

  ngOnDestroy() {
    this.subscriptionTranslateService$.unsubscribe();
  }



  dataIdRadicados: any = [];
  operationDialogObserva: string; // operacion que se utiliza para las trasferencias  
  initBotonViewRoute: string = "/filing/filing-view"; // Ruta ver usuario
  initBotonUpdateRoute: string = "/filing/filing-update-request"; // Ruta editar usuario

  //attachmentMain variables
  textFormAttachment = 'Cargar anexos';
  maxRowsFilesAttachment: number = 5;
  showButtonCleanAttachment: boolean = true;
  showButtonClearAttachment: boolean = true;
  showTipoDocumental: boolean = true; // Se muestra el campo  tipo documental de anexos
  textFormObservaHeader: string = ''; // Titulo del botón inteligente tambien titulo del dialog observacion
  ruoteServiceDocumentsModal: any;
  dataSend: any; // Data que se le envia al front de los radicados
  ruoteServiceDocumentsAne: string = environment.apiUrl + this.versionApi + 'radicacion/documentos/upload-document';
  statusUploadFileAneMasive: boolean = false; // Muestra el modal para adjuntar anexos masivos
  public menuReceiveData(event) {
    this.dataIdRadicados = [];
    // Agrega los id's de los radicados para tratarlos
    let selecRadi = this.eventClickButtonSelectedData;
    if ( selecRadi ) {
      selecRadi.forEach(element => {
        if ( this.dataIdRadicados.indexOf(element.id) < 0 ) {
          this.dataIdRadicados.push(element.id);
        }
      });
    }
    // Le asigna la operacion a ejecutar
    this.operationDialogObserva = event.action;
    switch (event.action) {
      case 'asignar':
        this.router.navigate(['/' + this.initBotonUpdateRoute + '/' + btoa(this.eventClickButtonSelectedData[0]['id'])]);
      break;
      case 'edit':
        this.router.navigate(['/' + this.initBotonUpdateRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]+"/email"]);
      break;
      case 'view':
        this.router.navigate(['/' + this.initBotonViewRoute + '/' + this.eventClickButtonSelectedData[0]['data'][0]]);
      break;
      case 'printStickers':
          this.transactionPrintStickers();
      break;
      case 'attachmentMain':
        this.textFormAttachment = event.title;
        this.maxRowsFilesAttachment = 1;
        this.showButtonCleanAttachment = false;
        this.showButtonClearAttachment = false;

        this.showTipoDocumental = false; // Oculta el campo tipo documental
        // Titulo del modal segun el title del boton
        this.textFormObservaHeader = event.title;
        this.ruoteServiceDocumentsModal = this.ruoteServiceDocumentsAne; // Ruta de anexos
        this.dataSend = this.eventClickButtonSelectedData;
        this.statusUploadFileAneMasive = true;
      break;
    }
  }

  resSerPrintStickers: any;
  resSerPrintStickersErr: any;
  transactionPrintStickers() {

    this.sweetAlertService.sweetLoading();
    let params = {
      ButtonSelectedData: this.eventClickButtonSelectedData //
    };

    this.restService.restPost(this.versionApi + 'radicacion/transacciones/print-sticker', params, this.authorization).subscribe((res) => {

      this.resSerPrintStickers = res;

      this.globalAppService.resolveResponse(this.resSerPrintStickers, false).then((res) => {
        const responseResolveResponse = res;
        if (responseResolveResponse == true) {
          this.sweetAlertService.showNotification( 'success', this.resSerPrintStickers['message'] );
          if (this.resSerPrintStickers.datafile) {
            this.resSerPrintStickers.datafile.forEach( dtFile => {
              this.downloadFile(dtFile.dataFile, dtFile.fileName );
            });
          }
        }
        // Cargando false
        this.sweetAlertService.sweetClose();
        // this.changeChildrenService.changeProcess({ proccess: 'reload' });
      });

      }, (err) => {
        this.resSerPrintStickersErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerPrintStickersErr).then((res) => { });
      }
    );
  }

  downloadFile(file, nameDownload) {

    const linkSource = `data:application/octet-stream;base64,${file}`;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = nameDownload;
    downloadLink.click();
  }

  private destroy$ = new Subject<void>();
  private listaAnterior: any = [];
  onSearch() {
    this.dataFilter = this.filterSearch.value;
    // Le quitamos los guiones al número de radicado
    setTimeout(() => {
      let encontrar = this.listaAnterior.find(element => element.numeroRadiRadicado.split('-').join('')
      === this.dataFilter.numRadicado.split('-').join(''));
      if (encontrar) {
        this.data = [encontrar];
        // Lo convertimos en un observable
        this.configDataTable.fetch = this.data;
  
        this.tableService.emitEventWithData(true);
        setTimeout(() => {
          this.tableService.emitEventWithData(false);
        } , 200);
      } else {
        this.configDataTable.fetch = this.listaAnterior;
  
        this.tableService.emitEventWithData(true);
        setTimeout(() => {
          this.tableService.emitEventWithData(false);
        } , 200);
      }
    }, 200);
  }

  onRefresh() {
    this.configDataTable.fetch = this.fetchPqrs();
    this.dataFilter = { 'status': 50 };
    this.filterSearch.reset();
  }

  public selectedRows$: number[] = [];
  onSelect($event: any) {
    this.selectedRows$ = $event;
    this.eventClickButtonSelectedData = $event;
    if (this.selectedRows$.length === 1) {
      this.menuButtons = this.menuButtonsSelectOne;
    } else if (this.selectedRows$.length > 1) {
      this.menuButtons = this.menuButtonsSelectMasive;
    } else {
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }

  selectedRowsReceiveData(event) {
    this.eventClickButtonSelectedData = event;
    if (event.length > 0) {
      if (event.length == 1) { // Un registro seleccionado
        this.menuButtons = this.menuButtonsSelectOne;
      } else { // Varios registros seleccionados
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else { // Ningun registro seleccionado
      localStorage.removeItem(environment.hashRadiAsociados);
      this.menuButtons = this.menuButtonsSelectNull;
    }


    this.operacionesTiposRadicados(event);
  }


  operacionesTiposRadicados(event) {

    if (event.length > 0) {

      // Un registro seleccionado -    // Varios registros seleccionados
      let params = {
        event: event
      };
      params['Correo'] = true;
      this.restService.restPost(this.versionApi + 'radicacion/radicados/radi-multi-acciones', params, this.authorization).subscribe((res) => {

          this.resServices = res;
          this.globalAppService.resolveResponse(this.resServices, false).then((res) => {

            const responseResolveResponse = res;
            if (responseResolveResponse == true) {
              // la estructura de los botones llega por backend se asigna a la variable de botones
              this.menuButtonsSelectOne = this.resServices.dataTransacciones;
              this.eventClickButtonSelectedData = event;
              this.menuButtons = this.menuButtonsSelectOne;
              // Guarda en localStorage
              localStorage.setItem( environment.hashMenuButtonRadi, this.authService.encryptAES(this.menuButtons, false));
              // Valida que tenga mensajes para que los muestre en messageButton
              if ( this.resServices.messageButton.length > 0 ) {
                this.resServices.messageButton.forEach( dataSer => {
                  this.sweetAlertService.showNotification( dataSer.type, dataSer.message );
                });
              }
            }

          });

          }, (err) => {
            this.resErrServices = err;
            // Evaluar respuesta de error del servicio
            this.globalAppService.resolveResponseError(this.resErrServices).then((res) => { });
          }
      );

    // Ningun registro seleccionado
    } else {
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }

  validateFile: any = [{ type: 'xls' }, { type: 'xlsx' }, { type: 'pdf' }, { type: 'doc' }, { type: 'docx' }, { type: 'odt' }, { type: 'ods' } ];
  validateFileAnexos: any = environment.validateFile.anexosRadicado;
  closeObserva(dataObserva) {    
    this.routeChangeStatus = ''; // Ruta que ejecuta la transaccion
    this.showTipoDocumental = true; // Muestra el campo tipos documentales en el modal de adjuntar documentos
    this.validateFile = [{ type: 'xls' }, { type: 'xlsx' }, { type: 'pdf' }, { type: 'doc' }, { type: 'docx' } ];
    // Fin reestablecer variables

    // dataObserva es la data que retorna el componente de observaciones
    if ( dataObserva.status ) {
      let deleteFilingButton = this.eventClickButtonSelectedData;
      switch ( this.operationDialogObserva ) {
        case 'attachment':
          this.statusUploadFileAneMasive = false;
        break;
        
      }

    }
    this.statusUploadFileAneMasive = false;

    if (this.operationDialogObserva == 'uploadFile' || this.operationDialogObserva == 'loadFormat' || this.operationDialogObserva == 'attachment' || this.operationDialogObserva == 'attachmentMain' || this.operationDialogObserva == 'uploadSignedDocument') {
      this.changeChildrenService.changeProcess({ proccess: "reload" });
    }

  }

}

/**

 */

import { Component, OnInit, ViewChild, HostListener, OnDestroy, inject, Input, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavItem } from "../../md/md.module";
import { Location } from "@angular/common";
import { AdminTopNavBarComponent } from "../../admin-layout/admin-top-nav-bar/admin-top-nav-bar.component";
import { TranslateService } from "@ngx-translate/core";
import { ActivateTranslateService } from "../../../services/activate-translate.service";
import { environment } from "src/environments/environment";
import { RestService } from "src/app/services/rest.service";
import { BnNgIdleService } from "bn-ng-idle";
import { ChangeChildrenService } from "src/app/services/change-children.service";
import { Observable, catchError, finalize, forkJoin, retry } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { map, switchMap, of, throwError, tap } from "rxjs";
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { Inject } from '@angular/core';
import { NotifyModalComponent } from "src/app/services/modal/components/pqrs/notify-modal/notify-modal.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EncryptService } from "@app/services/encrypt.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DialogRef } from "@angular/cdk/dialog";
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";
import { Decrypted, IMezclaCorrespondenciaResponse, IProyectarRespuestaBody, ITrabajoColaborativoPost, ResponseAsociarPlantillas, ResponseAsociarPlantillasData, ResponseReasociarPlantilla } from "./interfaces";
import { GlobalAppService } from "@app/services/global-app.service";
import { link } from "fs";
import { VerRespuestaProyectadaComponent } from "../pqrs-ver-respuesta-proyectada/ver-respuesta-proyectada.component";
import { AbstractControl } from '@angular/forms';
import { PqrsActionsService } from "../pqrs-view/useCases/pqrs-actions.service";
@Component({
  selector: 'app-pqrs-proyectar-respuesta',
  templateUrl: './pqrs-proyectar-respuesta.component.html',
  styleUrls: ['./pqrs-proyectar-respuesta.component.css']
})
export class PqrsProyectarRespuestaComponent {
  @Input() vistoBueno = false
  @Input() canEdit = true
  @Input() tipoRespuestaDefault


  public activatedRoute = inject(ActivatedRoute)
  public currentID = this.activatedRoute.snapshot.params['id']

  //tabla
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'timer';
  initCardHeaderTitle = 'Listado registro de PQRS';
  route: string = 'LogPqrs';
  authorization: string;
  versionApi = environment.versionApiDefault;
  redirectionPath = '/pqrs/log-pqrs-index';

  secondPhase: boolean = false;

  routeLoadDataTablesService = environment.versionApiDefault + 'configuracionApp/log/index';


  // ckeditor
  editorContent = "";


  // Validador para correo electrónico específico
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'emailInvalid': true };
    }
    return null;
  }

  // Validador para valores numéricos
  numericValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && isNaN(control.value)) {
      return { 'numericInvalid': true };
    }
    return null;
  }

  isBodyPrepared() {
    const trabajoColaborativoValidation = this.trabajoColaborativoRegistros.length > 0;
    const usuariosAprobadoresValidation = this.trabajoColaborativoRegistros.length > 0;
    const clasificacionDocumentalValidation = !(this.formGroupTipoDocumental.get('tipo_documental_id').value === '')
    const correspondenciaValidation = !(this.formGroupCorrespondencia.get('correspondencia_id').value === '')
    const plantillaValidaton = !(this.formGroupPlantillas.get('plantilla').value === '')
    const GroupCorrespondencia = !(this.formGroupCorrespondencia.get('tipo_envio').value === '')

    const validations = [clasificacionDocumentalValidation, correspondenciaValidation, plantillaValidaton,GroupCorrespondencia]
    const validation = validations.some(item => item === false)

    return !validation
  }



  public formGroupTrabajoColaborativo = new FormGroup({
    dependencia_id: new FormControl({}, Validators.required),
    usuario_id: new FormControl({
      value: '',
      disabled: true,
    })
  })

  public formGroupUsuariosAprobadores = new FormGroup({
    rol_id: new FormControl({}, Validators.required),
    usuario_id: new FormControl({
      value: '',
      disabled: true,
    })
  })

  public formGroupDatosDestinatario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion_notificacion_fisica: new FormControl(' '),
    direccion_electronica: new FormControl('', [this.emailValidator]),
    direccion_residencia: new FormControl(''),
    codigo_postal: new FormControl('', [this.numericValidator]),
    telefono: new FormControl('', [this.numericValidator]),
    ciudad_destino: new FormControl('', Validators.required),
    numero_radicado_entrada: new FormControl('', Validators.required),
    documento_cliente: new FormControl(''),
    idTipoPersona: new FormControl(''),
  });


  public formGroupTipoDocumental = new FormGroup({
    serie_id: new FormControl(''),
    serie_nombre: new FormControl({
      value: '',
      disabled: true,
    }),
    subserie_id: new FormControl(''),
    subserie_nombre: new FormControl({
      value: '',
      disabled: true,
    }),
    tipo_documental_id: new FormControl(''),
    expediente: new FormControl({
      value: '',
      disabled: true,
    })
  })

  public formGroupPlantillas = new FormGroup({
    plantilla: new FormControl(null, Validators.required),
  })

  public formGroupCorrespondencia = new FormGroup({
    tipo_envio: new FormControl('', Validators.required),
    correspondencia_id: new FormControl({
      value: '',
      disabled: true,

    }, Validators.required),
  })

  /** Variables para el componente top-nav-bar */
  topNavBarTitle: string = "PQRS"; // i18n
  topNavBarRouteActive: string = "Detalle";
  topNavBarOn: string = "a?";
  /** Fin Variables para el componente top-nav-bar */

  /** Variables para el componente sub-menú */
  subMenuStatus: boolean = true;
  subMenuTitle: string;
  subMenuActive: string = "pqrs";
  subMenuNotificationStatus: boolean = true;
  subMenuNotificationClassAlert: string = "alert alert-info alert-with-icon";
  subMenuNotificationMessage: string = "Seleccione el módulo que desea consultar."; // i18n
  /** Fin Variables para el componente sub-menú */

  menuButtonsSelectNull: any = [];
  menuButtonsSelectOne: any = [
    { icon: 'remove_red_eye', title: 'Ver', action: 'view', data: '' },
  ];
  menuButtonsSelectMasive: any = [];

  selectedRows: any[] = [];

  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;

  public navItems: NavItem[];
  url: string;
  location: Location;

  /** Variables de internacionalización */
  activeLang: string;
  languageReceive: any;
  subscriptionTranslateService$: Subscription;

  /** Variables para control de inactividad */
  userTimeOutSessionMin: any;

  resSerDownload: any; // En esta variable guardas la respuesta de la peticion post de obtener el archivo para descargarlo

  subscriptionBnIdle$: Subscription;

  /** Trabajo colaborativo */
  areasTrabajoColaborativo = [
    { value: 'area-1', viewValue: 'Área 1' },
    { value: 'area-2', viewValue: 'Área 2' },
    { value: 'area-3', viewValue: 'Área 3' },
  ];

  usuariosTrabajoColaborativo = [
    { value: 'usuario-1', viewValue: 'Usuario 1' },
    { value: 'usuario-2', viewValue: 'Usuario 2' },
    { value: 'usuario-3', viewValue: 'Usuario 3' },
  ];

  trabajoColaborativoSelectedArea = null;
  trabajoColaborativoSelectedUsuario = null;
  trabajoColaborativoRegistros: any[] = [];

  tiposRespuesta = new FormGroup({
    tipoRespuestaRegistros: new FormControl(null, Validators.required)

  })

  /** End trabajo colaborativo */


  /** Usuarios aprobadores */
  usuariosUsuariosAprobadores = [
    { value: 'usuario-1', viewValue: 'Usuario 1' },
    { value: 'usuario-2', viewValue: 'Usuario 2' },
    { value: 'usuario-3', viewValue: 'Usuario 3' },
  ];

  actividadUsuariosAprobadores = [
    { value: 8, viewValue: 'Revisor' },
    { value: 9, viewValue: 'Aprobador' },
    { value: 13, viewValue: 'Aprobar y firmar' },
  ];

  usuariosAprobadoresSelectedActividad = null;
  usuariosAprobadoresSelectedUsuario = null;
  usuariosAprobadoresRegistros: any[] = [];
  /** End usuarios aprobadores */

  fileNames: string[] = [];
  fileSelected: boolean = false;
  fileObjects: { name: string; data: File }[] = [];
  LastfileObject: { name: string; data: File }[] = [];

  @ViewChild("sidebar", { static: false }) sidebar: any;
  @ViewChild(AdminTopNavBarComponent, { static: false }) navbar: AdminTopNavBarComponent;

  filteredUserOptions: Observable<string[]>;

  constructor(
    private router: Router,
    location: Location,
    private translate: TranslateService,
    private activateTranslateService: ActivateTranslateService,
    private changeChildrenService: ChangeChildrenService,
    public restService: RestService,
    private bnIdle: BnNgIdleService,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    private http: HttpClient,
    private globalAppService: GlobalAppService,
    private cdr: ChangeDetectorRef,
    private pqrs$: PqrsActionsService,

  ) {
    this.location = location;
    /**
     * Idioma inical
     */
  }


  public authentication = this.restService.getUserData().accessToken

  postAsociarPlantilla(id: number, idSelectedTemplate: string) {
    return forkJoin([
      this.restService.httpPost(`api/radicado/${id}/documento-principal`,
        {
          idPlantilla: parseInt(idSelectedTemplate),
          idUser: this.userData.idDataCliente,
        }, this.userData.accessToken),
      this.restService.post(`api/v1/colaborativo/savePlantillaHtml`, {
        id: id,
        plantillaHTML: this.editorContent
      })
    ])
  }

  fetch(route: string) {
    return this.restService.restGetNotDecrypt(route, this.authentication).pipe(
      map((response: any) => {
        const body = this.restService.decryptAES(response.encrypted, this.authentication)
        return body
      })
    )
  }

  postTrabajoColaborativo() {

    let usuarios = this.trabajoColaborativoRegistros.map((item: any) => {
      return {
        user_id: item.usuario.id
      }
    })

    let body = {
      radicado_id: this.currentID,
      users: usuarios,
      user_creator_trabajo_colaborativo_id: this.userData.idDataCliente,
    }
    return this.restService.httpPost('api/storePqrsDependenciasUsers', body, this.authentication)
  }

  postReasociarPlantilla(idEstadoPlantilla: string) {

    const formData = new FormData();

    formData.append('idUser', this.restService.getUserData().idDataCliente)
    formData.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)
    formData.append('estado', idEstadoPlantilla)
    formData.append('file', this.LastfileObject[0].data)


    return this.restService.httpPostArchivo(`api/radicado/${this.currentID}/documento-principal-one-file`, formData, this.authentication).pipe(
      catchError(err => {
        console.error(err)
        this.modal.openNotify('', 'Error en la peticion de reasociacion', false)
        throw new Error()
      })
    )
  }

  fetchDownloadDocument(body: any) {
    const data = {
      data: [{
        data: [btoa(`${body.idradiDocumentoPrincipal}`)],
        id: body.idradiDocumentoPrincipal,
        nombreRadiDocumentoPrincipal: body.nombreRadiDocumentoPrincipal,
        creacionRadiDocumentoPrincipal: body.creacionRadiDocumentoPrincipal,
        user: "",
        extensionRadiDocumentoPrincipal: body.extensionRadiDocumentoPrincipal,
        imagenPrincipalRadiDocumento: body.imagenPrincipalRadiDocumento,
        statusDocsPrincipales: 6,
        statusIdPublic: 0,
        statusTextPublic: "",
        statusText: "Combinación de correspondencia sin firmas",
        hasCorrespondence: false,
        rowSelect: true,
        idInitialList: 1
      }]
    }

    console.log(data)
    return this.restService.restPost('radicacion/documentos/download-doc-principal', data, this.authentication)
  }

  postCambiarEstado(idRadicado: string, codigoEstado: string) {
    return this.restService.httpPut(`api/radicado/${idRadicado}/estado/${codigoEstado}`, {})
  }

  fetchItem(): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/radicado/${this.currentID}`, this.authentication)
  }

  fetchPlantillas(): Observable<any> {
    return this.restService.restGetNotDecrypt(`configuracionApp/cg-gestion-plantillas/index?request=VTJGc2RHVmtYMTgvMzhlcUU2cytFM0dIRmNESDdGNGFuNEUybVVxYm5HVT0=`, this.authentication)
  }

  fetchAreas(): Observable<any> {
    return this.restService.restGetNotDecrypt(`gestionDocumental/trd-dependencias/index-list`, this.authentication)
  }

  fetchSeries(): Observable<any> {
    return this.restService.restGetNotDecrypt(`radicacion/radicados/index-list-series`, this.authentication)
  }
  fetchSubseries(): Observable<any> {
    return this.restService.restGetNotDecrypt(`gestionDocumental/trd-dependencias/index-list`, this.authentication)
  }

  fetchDatosDestinatario(id: number): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/radicado/${id}/cliente`, this.authentication)
  }

  fetchActividadesOptions(): Observable<any> {
    return this.restService.restGet(`api/flujo/participantes/${this.currentID}`, this.authentication)
  }
  fetchTiposDocumentales(body): Observable<any> {


    return this.restService.httpPost(`api/serie-subserie-tipos-documentales`, body
      , this.authentication)
  }

  fetchTiposComunicacion(): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/tipos-comunicacion`, this.authentication)
  }

  fetchTiposRespuesta(): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/tipos-respuesta`, this.authentication)
  }


  postMezclaCorrespondencia(plantillaAsociada: ResponseAsociarPlantillasData,
    BodyDecryptedProyectarRespuesta: Decrypted,
  ): Observable<any> {

    const { id } = BodyDecryptedProyectarRespuesta; // Id del radicado de salida
    const { nombreRadiDocumentoPrincipal, extensionRadiDocumentoPrincipal, idradiDocumentoPrincipal } = plantillaAsociada;

    // idradiDocumentoPrincipal es el id de la plantilla que asociaste a este radicado

    let body = {
      ButtonSelectedData: [
        {
          id: `${id}`,
          nameFile: nombreRadiDocumentoPrincipal.split('.')[0],
        },
      ],
      data: {
        creacionRadiDocumentoPrincipal: new Date().toISOString().split('T')[0],
        data: [
          btoa(`${idradiDocumentoPrincipal}`)
        ],
        extensionRadiDocumentoPrincipal: extensionRadiDocumentoPrincipal,
        hasCorrespondence: false,
        id: idradiDocumentoPrincipal,
        idInitialList: 0,
        imagenPrincipalRadiDocumento: 0,
        nombreRadiDocumentoPrincipal: nombreRadiDocumentoPrincipal.split('.')[0],
        rowSelect: true,
        statusDocsPrincipales: 0, // Se enviaba como 10.
        statusIdPublic: 0,
        statusText: "",
        statusTextPublic: "",
        user: this.restService.getUserData().nombre,
      },


      "isNewFiling": false
    }

    // console.log(body)
    // console.log('CUERPO MEZCLA CORRESPONDENCIA:', body)

    return this.restService.restPost(`radicacion/transacciones/correspondence-match`, body, this.authentication)
  }



  postProyectarRespuesta(body: any) {
    return this.restService.postParams('radicacion/radicados/create', body).pipe()
  }

  public areasOptions;
  public responseItem;
  public plantillasOptions;
  public usuariosDependenciaOptions;
  public informacionDestinatario;
  public tiposComunicacionOptions;
  public tiposComunicacionBody;
  public tiposDocumentalesOptions;
  public tiposRespuestaOptions;

  public actividadesOptions;
  public usuariosAprobadoresOptions;

  public responseMezclaCorrespondencia;

  public body;


  public idRadicadoSalida;

  public userData = this.restService.getUserData();

  isReadyForSubmit(): boolean {

    const body = {
      trabajo_colaborativo: this.trabajoColaborativoRegistros,
      datos_destinatario: this.formGroupDatosDestinatario.getRawValue(),
      clasificacion_documental: this.formGroupTipoDocumental.getRawValue(),
      plantilla: this.formGroupPlantillas.getRawValue(),
      clasificacion_correspondencia: this.formGroupCorrespondencia.getRawValue()
    }

    if (body) return true
    else false
  }

  getAllData() {
    return forkJoin([
      this.fetchItem(),
      this.fetchAreas(),
      this.fetchPlantillas(),
      this.fetchDatosDestinatario(this.currentID),
      this.fetchTiposComunicacion(),
      this.fetchTiposRespuesta()
    ])
  }

  public botonActivado = true
  public rolesValidos = [8, 13, 9]
  desactivarBoton() {
    this.botonActivado = false;
  }


  allowEdit() {
    this.formGroupDatosDestinatario.enable()
    this.formGroupDatosDestinatario.get('numero_radicado_entrada').disable()

  }

  disableEdit() {
    const camposAValidar = ['nombre', 'direccion_notificacion_fisica', 'direccion_electronica', 'direccion_residencia', 'codigo_postal', 'telefono'
      , 'ciudad_destino', 'numero_radicado_entrada', 'documento_cliente', 'idTipoPersona'
    ];
    let todosValidos = true;

    camposAValidar.forEach(campo => {
      const control = this.formGroupDatosDestinatario.get(campo);
      if (control && control.invalid) {
        control.markAsTouched(); // Marca como tocado para mostrar errores
        todosValidos = false;
      }
    });
    if (todosValidos)
      this.formGroupDatosDestinatario.disable()
    else {
      this.modal.openNotify('', 'Diligencie todos los campos obligatorios', false)
    //  this.turnOnErrors()
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.usuariosDependenciaOptions?.filter(option => option.val.toLowerCase().includes(filterValue));
  }

  displayFn(user): string {
    return user && user.val ? user.val : '';
  }

  ngOnInit() {

    this.getAllData().pipe(
      catchError((err) => {
        this.modal.openNotify('', 'No es posible mostrar esta proyeccion', false).afterClosed().subscribe(res => this.router.navigate['/pqrs/pqrs-view/' + this.currentID])
        console.error(err)
        return throwError(() => new Error(`Error en la obtencion de los datos`));

      }),
      switchMap(([responseItem, responseAreas, responsePlantillas, responseDestinatario, responseTiposComunicacion, responseTiposRespuesta]) => {
        // Asignar las respuestas a las propiedades del componente
        this.responseItem = responseItem;
        this.areasOptions = responseAreas.decrypted.data;
        this.plantillasOptions = responsePlantillas.decrypted.data;
        this.informacionDestinatario = responseDestinatario.data;
        this.tiposComunicacionBody = responseTiposComunicacion.data;
        this.tiposRespuestaOptions = responseTiposRespuesta.data;

        //  valdiacion para cuando el estado es Ampliación de terminos.
        if (
          this.responseItem.estado.estado == 'Ampliación de términos Aprobada' ||
          this.responseItem.estado.estado == 'Ampliación de términos Rechazada'
        ) {
          this.tiposRespuesta.controls['tipoRespuestaRegistros'].setValue(
            this.tiposRespuestaOptions.filter(item => (item.nombre == 'Ampliación de terminos'))[0].id
          )
          this.tiposRespuesta.controls['tipoRespuestaRegistros'].disable()
        } else {
          this.tiposRespuestaOptions = this.tiposRespuestaOptions.filter(item => (item.nombre != 'Ampliación de terminos'))
        }

        // validacion tipo respuesta default
        switch (this.tipoRespuestaDefault) {
          case "Petición incompleta":
            this.tiposRespuesta.controls['tipoRespuestaRegistros'].setValue(
              this.tiposRespuestaOptions.filter(item => (item.nombre == 'Petición incompleta'))[0].id
            )
            this.tiposRespuesta.controls['tipoRespuestaRegistros'].disable()

            break;

          default:
            this.tiposRespuestaOptions = this.tiposRespuestaOptions.filter(item => (item.nombre != 'Petición incompleta'))
            break;
        }

        // Actualizar los datos del formulario con la información obtenida
        this.formGroupDatosDestinatario.patchValue({
          nombre: this.informacionDestinatario.nombre,
          direccion_notificacion_fisica: this.informacionDestinatario.direccionNotificacionFisica,
          direccion_electronica: this.informacionDestinatario.direccionElectronica,
          direccion_residencia: this.informacionDestinatario.direccionResidencia,
          codigo_postal: this.informacionDestinatario.codigoPostal,
          telefono: this.informacionDestinatario.telefono,
          ciudad_destino: this.informacionDestinatario.nombreCiudadDestino,
          numero_radicado_entrada: this.informacionDestinatario.numeroRadicadoEntrada,
          idTipoPersona: this.informacionDestinatario.idTipoPersona,
          documento_cliente: this.informacionDestinatario.documento_cliente,
        });

        this.formGroupDatosDestinatario.disable()

        this.formGroupTipoDocumental.patchValue({
          serie_id: this.responseItem.idGdTrdSerie,
          serie_nombre: this.responseItem.serie.nombreGdTrdSerie,
          subserie_id: this.responseItem.idGdTrdSubserie,
          subserie_nombre: this.responseItem.sub_serie?.nombreGdTrdSubserie ?? '',
          expediente: this.responseItem.expedientes[0]?.nombreGdExpediente ?? "N/A"
        })

        const body = {
          serie_id: responseItem.idGdTrdSerie,
          subserie_id: responseItem.idGdTrdSubserie,
        };

        return this.fetchTiposDocumentales(body);
      })
    ).subscribe(finalResponse => {

      this.tiposDocumentalesOptions = finalResponse.data
    });




    if (this.rolesValidos.includes(this.userData.idRol)) {
      const actividad = this.actividadUsuariosAprobadores.find(item => item.value == this.userData.idRol);

      this.usuariosAprobadoresRegistros.push({
        actividad: actividad,
        usuario: { user_detalle: { full_name: this.userData.username } }
      });

      this.formGroupUsuariosAprobadores.disable();
      this.desactivarBoton();
    }

    this.formGroupTrabajoColaborativo.get('usuario_id').valueChanges.pipe(
    ).subscribe((value: any) => {
      const name = typeof value === 'string' ? value : value?.val;
      this.filteredUserOptions = of(this._filter(name))
    });

    this.formGroupTrabajoColaborativo.get('dependencia_id').valueChanges.subscribe((value: any) => {  // Logica para activar el select de usuarios en trabajo colaborativo
      const dependencia_id = value?.id;


      if (value.id !== null) {
        this.restService.restGetParams('user/index-list-by-depe', { idDependencia: dependencia_id }, this.authentication).subscribe(response => {
          this.usuariosDependenciaOptions = response.data;
          this.filteredUserOptions = of(response.data)
          if (response.data.length == 0) {
            this.modal.openNotify('', 'No hay usuarios registrados a la dependencia seleccionada', false)
          }
        })
        this.formGroupTrabajoColaborativo.get('usuario_id').enable()
        this.formGroupTrabajoColaborativo.get('usuario_id').updateValueAndValidity()
      }


    })


    this.formGroupUsuariosAprobadores.get('rol_id').valueChanges.subscribe((value: any) => {  // Logica para activar el select de usuarios en trabajo colaborativo

      const role_id = value.value;

      if (value.value !== null) {
        this.restService.restGetNotDecrypt('api/usuarios?&rol_id=' + role_id, this.authorization).subscribe((response: any) => {
          console.log(response)
          this.usuariosAprobadoresOptions = response
          if (response.length == 0) {
            this.modal.openNotify('', 'No hay usuarios con el rol seleccionado', false)
          }
        })

        this.formGroupUsuariosAprobadores.get('usuario_id').enable()
        this.formGroupUsuariosAprobadores.get('usuario_id').updateValueAndValidity()
      }
    })


    this.formGroupCorrespondencia.get('tipo_envio').valueChanges.subscribe((value: any) => {
      if (value === 1) {
        const mediosFisicos = [1, 3, 5];
        this.tiposComunicacionOptions = this.tiposComunicacionBody
          .filter(item => mediosFisicos.includes(item.id));
        this.formGroupCorrespondencia.get('correspondencia_id').enable()
        this.formGroupCorrespondencia.get('correspondencia_id').updateValueAndValidity()
      } else {
        const mediosDigitales = [2, 4]
        this.tiposComunicacionOptions = this.tiposComunicacionBody
          .filter(item => mediosDigitales.includes(item.id));
        this.formGroupCorrespondencia.get('correspondencia_id').enable()
        this.formGroupCorrespondencia.get('correspondencia_id').updateValueAndValidity()
      }
    })

    /**
     * Detectando si se ejecuta cambio de idioma
     */


  }


  public isMap() {
    if (this.location.prepareExternalUrl(this.location.path()) === "/maps/fullscreen") {
      return true;
    } else {
      return false;
    }
  }


  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf("MAC") >= 0 || navigator.platform.toUpperCase().indexOf("IPAD") >= 0) {
      bool = true;
    }
    return bool;
  }

  /** Métodos agregados */
  onActivate() {
    this.subMenuStatus = false;
  }

  /** Método para consumir la función del servicio changeChildrenService que emite la variable para abrir el modal de filtros */
  searchRecibe(event) {
    this.changeChildrenService.onSearchFilter(event);
  }

  /** Métodos para el uso de la internacionalización */


  /** Fin Métodos para el uso de la internacionalización */

  /**
   * Metodo para inicializar la funcionalidad de inactividad
   * @params autho authorization
   */
  calculateSessionInactivity(autho) {
    let minutes = environment.timeOutSessionMin;

    this.callLocalStorageHashTimeOut().then((res) => {
      this.userTimeOutSessionMin = res;
      if (this.userTimeOutSessionMin) {
        minutes = this.userTimeOutSessionMin;
      }
      let seconds = minutes * 60;

      this.subscriptionBnIdle$ = this.bnIdle.startWatching(seconds).subscribe((res) => {
        if (res) {
          // Busca si hay un modal en el cuerpo
          const body = document.getElementsByTagName("body")[0];
          const modalBackdrop = document.getElementsByClassName("mat-dialog-container")[0];
          // Valida ai hay un modal
          if (modalBackdrop) {
            // Elimina el modal
            body.classList.remove("mat-dialog-container");
            modalBackdrop.remove();
          }
          this.restService.logout(autho, "inactividad");
        }
      });
    });
  }

  /**
   * Inicio Decoradores utilizados para conocer si se utiliza el mouse o el teclado
   * Se debe cambiar la metodología en caso de que el sistema se ponga lento o aparezcan muchos logs de advertencias como el siguiente:
   * [Violation] 'requestIdleCallback' handler took 62ms
   */
  @HostListener('click', ['$event.target']) onClick(btn) {
    if (!!this.subscriptionBnIdle$) {
      this.bnIdle.resetTimer();
    }

  }

  @HostListener('window:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {
    if (!!this.subscriptionBnIdle$) {
      this.bnIdle.resetTimer();
    }
  }
  /** Fin Decoradores utilizados para conocer si se utiliza el mouse o el teclado */

  /** Función que obtiene el tiempo de sessión para inactividad en el local storage */
  callLocalStorageHashTimeOut() {
    return new Promise((resolve) => {
      let timeOutLS = localStorage.getItem(environment.hashTimeOut);
      resolve(timeOutLS);
    });
  }

  ngOnDestroy() {
    if (!!this.subscriptionBnIdle$) this.subscriptionBnIdle$.unsubscribe();
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }


  /** TRABAJO COLABORATIVO */
  agregarRegistroTrabajoColaborativo() {
    if (this.formGroupTrabajoColaborativo.valid && this.formGroupTrabajoColaborativo.get('usuario_id').value) {
      this.usuariosDependenciaOptions = this.usuariosDependenciaOptions.filter(us => us !== this.formGroupTrabajoColaborativo.get('usuario_id').value)
      this.trabajoColaborativoRegistros.push({
        area: this.formGroupTrabajoColaborativo.get('dependencia_id').value,
        usuario: this.formGroupTrabajoColaborativo.get('usuario_id').value
      });
      console.log(this.trabajoColaborativoRegistros)
    } else {
      this.modal.openNotify('', 'Seleccione todos los campos', false)
    }
    this.formGroupTrabajoColaborativo.get('usuario_id').setValue('')
  }

  borrarTrabajoColaborativoRegistro(index: number) {
    this.trabajoColaborativoRegistros.splice(index, 1);
  }
  /** END TRABAJO COLABORATIVO */


  /** USUARIOS APROBADORES */
  agregarRegistroUsuariosAprobadores() {
    if (this.formGroupUsuariosAprobadores.valid && this.formGroupUsuariosAprobadores.get('usuario_id').value) {
      this.usuariosAprobadoresRegistros.push({
        actividad: this.formGroupUsuariosAprobadores.get('rol_id').value,
        usuario: this.formGroupUsuariosAprobadores.get('usuario_id').value,
      });

      this.formGroupUsuariosAprobadores.reset()

    }
    else {
      this.modal.openNotify('', 'Seleccione todos los campos', false)
      this.formGroupUsuariosAprobadores.reset()

    }

    this.formGroupUsuariosAprobadores.reset()


    // Reiniciar selecciones a null


  }
  public urlDocs: string = '';
  public urlLastDoc: string;
  public allowSigninFlow: boolean = false;

  crearFlujoFirma() {
    this.modal.openAction('', '¿Está seguro de iniciar un flujo de firma para el radicado ' + this.responseItem.numeroRadiRadicado + '?', () => {
      this.router.navigate([`/signin/create/${this.currentID}`])
    })
  }

  // downloadFile(url, nameDownload) {
  //   try {

  //
  //   }
  //  catch(err) {
  //   return console.error(err)
  //  }

  // }

  isBase64(str: string): boolean {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  borrarUsuariosAprobadoresRegistro(index: number) {
    this.usuariosAprobadoresRegistros.splice(index, 1);
  }
  /** END USUARIOS APROBADORES */

  // onFileSelected(event: any): void {
  //   const files: FileList = event.target.files;
  //   this.fileObjects = [];

  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const fileURL = URL.createObjectURL(file);
  //       this.fileObjects.push({ name: file.name, data: file });
  //     }
  //   }

  //   console.log(this.fileObjects)
  // }

  validFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  maxFileSize = 5 * 1024 * 1024; // 5 MB

  confirmarFlujoFirma() {
    this.modal.openAction('', `¿Está seguro de generar un flujo de firma para el documento ${this.LastfileObject[0].name}?`, () => { this.router.navigate(['/signin']) })
  }

  LastonFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.length > 1) {
        this.modal.openNotify(`Alerta`, `Solo puedes seleccionar máximo 1 archivo.`, false)
      } else {
        const file = files[i];
        console.log(file)
        if (this.validFileTypes.includes(file.type) && file.size <= this.maxFileSize) {
          const fileObj = {
            name: file.name,
            data: file
          };


          this.modal.openAction('', `¿Está seguro de asociar el documento ${file.name}, al radicado ${this.responseItem.numeroRadiRadicado}?`, () => {
            this.LastfileObject.push(fileObj)
            this.postReasociarPlantilla("21").subscribe((res: ResponseReasociarPlantilla) => {
              const url = res.data.rutaRadiDocumentoPrincipal;
              const toBeReplaced = '/app/public/'
              let linkSource = url.replace(toBeReplaced, 'http://3.225.70.18:8111/');
              console.log(linkSource)
              this.urlDocs = linkSource;
              this.cdr.detectChanges();
              this.modal.openNotify('', 'Plantilla asociada correctamente al radicado', true).afterClosed().subscribe(

              )
            })
          })


        } else {
          // Mensaje de error para archivos no válidos
          if (!this.validFileTypes.includes(file.type)) {
            this.modal.openNotify(`Alerta`, `El archivo "${file.name}" no es de un tipo permitido.`, false)
          }
          if (file.size > this.maxFileSize) {
            this.modal.openNotify(`Alerta`, `El archivo "${file.name}" excede el tamaño máximo permitido de 5 MB.`, false)
          }
        }
      }
    }
  }



  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file)
      if (this.validFileTypes.includes(file.type) && file.size <= this.maxFileSize) {
        const fileObj = {
          name: file.name,
          data: file
        };
        this.fileObjects.push(fileObj);
      } else {
        // Mensaje de error para archivos no válidos
        if (!this.validFileTypes.includes(file.type)) {
          this.modal.openNotify(`Alerta`, `El archivo "${file.name}" no es de un tipo permitido.`, false)
        }
        if (file.size > this.maxFileSize) {
          this.modal.openNotify(`Alerta`, `El archivo "${file.name}" excede el tamaño máximo permitido de 5 MB.`, false)
        }
      }
    }
  }

  openPDF(url: string) {
    window.open(url, '_blank');
  }

  removeSelectedFile(index: number): void {


    this.modal.openAction('', '¿Está seguro de realizar la acción?', () => { this.fileObjects.splice(index, 1); })

  }

  removeLastSelectedFile(index: number): void {

    this.LastfileObject.splice(index, 1);

  }


  cancelar(): void {
    this.goBack()
  }


  asociarArchivos(radicadoSalida: string) {

    const url = `api/radicado/${radicadoSalida}/documentos`
    const formData = new FormData();

    formData.append('idUser', this.restService.getUserData().idDataCliente)
    formData.append('idGdTrdTipoDocumental', this.formGroupTipoDocumental.get('tipo_documental_id').value)
    formData.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)

    for (let i = 0; i < this.fileObjects.length; i++) {
      formData.append('files[]', this.fileObjects[i].data);
    }

    console.log(formData)

    return this.restService.httpPostArchivo(url, formData, this.restService.getUserData().accessToken)
  }

  goBack(): void {
    this.modal.openAction("", "¿Está seguro de cancelar la asignación?", () => {
      this.router.navigate(['/pqrs/pqrs-view/' + this.currentID])
      this.toast.open({ title: 'Cancelación exitosa', duration: 2000, success: true })
    })
  }

  turnOnErrors() {

    if (this.formGroupTipoDocumental.get('tipo_documental_id')?.value == '') {
      this.formGroupTipoDocumental.get('tipo_documental_id').setErrors({ required: true })
      this.formGroupTipoDocumental.get('tipo_documental_id').markAsTouched();
    }

    if (this.formGroupPlantillas.get('plantilla')?.value == '' || Object.keys((this.formGroupPlantillas.get('plantilla')?.value)).length === 0) {
      this.formGroupPlantillas.get('plantilla').setErrors({ required: true })
      this.formGroupPlantillas.get('plantilla').markAsTouched();
    }

    if (this.formGroupCorrespondencia.get('correspondencia_id')?.value == '') {
      this.formGroupCorrespondencia.get('correspondencia_id').setErrors({ required: true })
      this.formGroupCorrespondencia.get('correspondencia_id').markAsTouched();
    }

    if (this.tiposRespuesta.get('tipoRespuestaRegistros')?.value == '') {
      this.tiposRespuesta.get('tipoRespuestaRegistros').setErrors({ required: true })
      this.tiposRespuesta.get('tipoRespuestaRegistros').markAsTouched();
    }

  }



  handleError(context) {
    return catchError((error) => {
      console.error(`Error durante ${context}:`, error);
      this.modal.openNotify('', `Error durante la proyección.`, false);
      return throwError(() => new Error(`Error durante ${context}: ${error.message}`));
    });
  }


  handleSaveProyectar() {
    if (this.isBodyPrepared()) {
      this.modal.openAction(
        '',
        `A continuación se va a generar una respuesta de tipo ${this.tiposRespuestaOptions.find(r => r.id == this.tiposRespuesta.get('tipoRespuestaRegistros').value).nombre} ¿Está seguro de realizar esta acción?`,
        () => {

          const body_ = {
            trabajo_colaborativo: this.trabajoColaborativoRegistros,
            usuarios_aprobadores: this.usuariosAprobadoresRegistros,
            datos_destinatario: this.formGroupDatosDestinatario.getRawValue(),
            clasificacion_documental: this.formGroupTipoDocumental.getRawValue(),
            plantilla: this.formGroupPlantillas.getRawValue(),
            clasificacion_correspondencia: this.formGroupCorrespondencia.getRawValue(),
          }

          const userData = this.restService.getUserData();

          const dataForm = {
            "data": {
              "isNuevoRemitente": false,
              "idCliente": [
                {
                  "cliente": userData.idDataCliente,
                }
              ],
              "idCgTipoRadicado": 1,
              "radicadoOrigen": "",
              "fechaDocumentoRadiRadicado": new Date().toISOString().split('T')[0],
              "RadiRadicadoHijos": [parseInt(this.currentID)],
              "unicoRadiCgTipoRadicado": false,
              "idTipoPersona": body_.datos_destinatario.idTipoPersona,
              "nombreCliente": body_.datos_destinatario.nombre,
              "numeroDocumentoCliente": body_.datos_destinatario?.documento_cliente,
              "direccionCliente": body_.datos_destinatario.direccion_residencia,
              "idNivelGeografico3": this.informacionDestinatario.idCiudad,
              "idNivelGeografico2": 1,
              "idNivelGeografico1": 1,
              "correoElectronicoCliente": body_.datos_destinatario.direccion_electronica,
              "telefonoCliente": this.informacionDestinatario.telefono,
              "tipoZonaNotificacion ": 0,
              "remitentes": [
                {
                  "correoElectronicoCliente": body_.datos_destinatario.direccion_electronica,
                  "direccionCliente": body_.datos_destinatario.direccion_residencia,
                  "idNivelGeografico1": 1,
                  "idNivelGeografico2": 1,
                  "idNivelGeografico3": this.informacionDestinatario.idCiudad,
                  "idTipoPersona": body_.datos_destinatario.idTipoPersona,
                  "nombreCliente": body_.datos_destinatario.nombre,
                  "numeroDocumentoCliente": body_.datos_destinatario?.documento_cliente,
                  "telefonoCliente": this.informacionDestinatario.telefono,
                  "tipoZonaNotificacion ": 0,
                  "idCliente": {
                    "cliente": this.informacionDestinatario.idDestinatario,
                  }
                }
              ],
              "generoClienteCiudadanoDetalle": "",
              "rangoEdadClienteCiudadanoDetalle": "",
              "vulnerabilidadClienteCiudadanoDetalle": "",
              "etniaClienteCiudadanoDetalle": "",
              "isCiudadano": false,
              "idGdTrdSerie": body_.clasificacion_documental.serie_id,
              "idGdTrdSubserie": body_.clasificacion_documental.subserie_id,
              "idTrdTipoDocumental": body_.clasificacion_documental.tipo_documental_id,
              "idTramites": "",
              "PrioridadRadiRadicados": false,
              "idCgMedioRecepcion": 2,
              "asuntoRadiRadicado": "fasdfasdfas",
              "fechaVencimientoRadiRadicados": new Date().toISOString().split('T')[0],
              "foliosRadiRadicado": this.responseItem.foliosRadiRadicado,
              "descripcionAnexoRadiRadicado": "",
              "diasRestantes": 0,
              "observacionRadiRadicado": "",
              "autorizacionRadiRadicados": false,
              "idTrdDepeUserTramitador": this.restService.getUserData().dependencia.idGdTrdDependencia,
              "user_idTramitador": this.restService.getUserData().idDataCliente,
              "listSeriesFilter": "",
              "listSubseriesFilter": "",
              "listTipoDocumentalFilter": "",
              "listClienteFilter": "",
              "listTipoPersonaFilter": "",
              "listNumRadicadoFilter": "",
              "listTipoRadicadoFilter": "",
              "listTramitesFilter": "",
              "listTramitadorFilter": "",
              "listMedioRecepcionFilter": "",
              "listNivelGeografico3Filter": "",
              "listNivelGeografico2Filter": "",
              "listNivelGeografico1Filter": "",
              "listDependenciasFilter": "",
              "listFuncionariosFilter": "",
              "listGeneroFilter": "",
              "listRangoEdadFilter": "",
              "listVulnerabilidadFilter": "",
              "listEtniaFilter": "",
              "fileUpload": "",
              "numeroRadicadoExterno": "",
              "numeroCuentaContrato": "",
              "tipoRespuestaId": this.tiposRespuesta?.get('tipoRespuestaRegistros')?.value,
              "contactoSap": "",
              "direccion": "",
              "tipoDeVia": "",
              "numVia": "",
              "letra": "",
              "sufijo": "",
              "nPlaca": "",
              "complemento": "",
              "zona": "",
              "tipoSolicitudId": "",
              "tipoServicioId": "",
              "field-validate": true,
              "tipoComunicacionId": this.formGroupCorrespondencia.get('correspondencia_id').value
            },
            "dataEmail": {}
          }




          this.postProyectarRespuesta(dataForm).pipe(
            this.handleError('Proyectar respuesta'),
            switchMap((response: any) => {

              const decrypted: Decrypted = response.decrypted
              this.idRadicadoSalida = response.decrypted.id;
              const plantilla = (this.formGroupPlantillas.get('plantilla').value as any)

              return this.postAsociarPlantilla(response.decrypted.id, plantilla.id).pipe(
                this.handleError('Asociar plantilla'),
                switchMap((responseAsociarPlantilla: ResponseAsociarPlantillas) => {

                  return this.postMezclaCorrespondencia
                    (responseAsociarPlantilla[0].data, decrypted).pipe(this.handleError('Mezcla de correspondencia'),
                      switchMap((responseMezclaCorrespondencia: any) => {
                        this.responseMezclaCorrespondencia = responseMezclaCorrespondencia;
                        if (this.fileObjects.length > 0) {
                          this.asociarArchivos(response.decrypted.id).subscribe(response => console.log('Respuesta asociacion de archivos: ', response))
                        }

                        if (this.trabajoColaborativoRegistros.length > 0) {
                          return this.postTrabajoColaborativo().pipe(
                            switchMap((responseTrabajoColaborativo: any) => {
                              return forkJoin([
                                this.postCambiarEstado(this.currentID, 'EST-044').pipe(retry(3)),
                                this.postCambiarEstado(this.idRadicadoSalida, 'EST-044').pipe(retry(3)),
                              ])
                            })
                          )
                        } else {
                          return forkJoin([
                            this.postCambiarEstado(this.currentID, 'EST-070').pipe(this.handleError('Cambio de estado'), retry(3)),
                            this.postCambiarEstado(this.idRadicadoSalida, 'EST-070').pipe(this.handleError('Cambio de estado'), retry(3))
                          ])
                        }

                      }))
                })
              )




            })
          ).subscribe((response: any) => {
            this.urlDocs = this.responseMezclaCorrespondencia.data.rutaRadiDocumentoPrincipal.replace('/app/public/', 'http://3.225.70.18:8111/')
            this.allowSigninFlow = true;

            this.modal.openNotify('Éxito', 'Proyección por respuesta realizada exitosamente', true).afterClosed().subscribe(res => {
              this.router.navigate([`pqrs/pqrs-view/${this.currentID}/ver-respuesta-proyectada/${this.idRadicadoSalida}`])

            })

          })
        }
      );


    } else {
      if (this.formGroupCorrespondencia.invalid) 
        this.formGroupCorrespondencia.markAllAsTouched();
      if(this.formGroupPlantillas.invalid)
        this.formGroupPlantillas.markAllAsTouched();
      if(this.tiposRespuesta.invalid)
        this.tiposRespuesta.markAllAsTouched();
      
      this.modal.openNotify('', 'Diligencie todos los campos obligatorios', false)
      this.turnOnErrors()
    }
  };

  changePlantilla() {
    // obtenermos el html de la plantilla.
    this.restService.get(`api/plantilla/${this.formGroupPlantillas.get('plantilla').value.id}/html`).subscribe((response: any) => {
      console.log("response plantilla html: ", response);
      this.editorContent = response.data
    })
  }

  changeDocument(content) {
    this.editorContent = content.data;
  }
}

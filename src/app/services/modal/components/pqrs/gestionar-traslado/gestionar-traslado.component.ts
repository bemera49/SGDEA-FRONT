/**
 * HU 012 - Gestionar traslado por competencia
 */
import { ChangeDetectorRef, Component, Inject, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";
import { MaterialModule } from "@app/app.material.module";
import { Observable, startWith, map, forkJoin, catchError, switchMap, lastValueFrom } from "rxjs";
import { ModalService } from "@app/services/modal/modal.service";
import { TrasladoCompetenciaService } from "@app/services/pqrs/traslado-competencia.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbComponent } from "@app/modules/components/breadcrumb/breadcrumb.component";
import { ToastService } from "@app/services/toast/toast.service";
import {
  Cliente,
  Departamento,
  Empresa,
  Municipio,
  Pais,
  RegistrarEmpresa,
  Usuarios,
} from "./models/traslado-competencia";
import { RestService } from "@app/services/rest.service";
import { Decrypted, ResponseAsociarPlantillas, ResponseAsociarPlantillasData, ResponseReasociarPlantilla } from "@app/modules/pqrs/pqrs-proyectar-respuesta/interfaces";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgxDocViewerModule } from "ngx-doc-viewer";
@Component({
  selector: "app-gestionar-traslado",
  templateUrl: "./gestionar-traslado.component.html",
  styleUrls: ["./gestionar-traslado.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    NgxDocViewerModule
  ],
})
export class GestionarTrasladoComponent implements OnInit {
  location: Location;
  formTraslado: FormGroup;
  public activatedRoute = inject(ActivatedRoute);
  public currentID = this.activatedRoute.snapshot.params["id"];
  arrayEmpresa: Empresa[] = [];
  arrayDestinatario: Cliente[] = [];
  arrayFuncionario: Usuarios[] = [];
  filteredEmpresa: Observable<Empresa[]>;
  filteredDestinatario: Observable<Cliente[]>;
  filteredFuncionario: Observable<Usuarios[]>;
  arrayPais: Pais[] = [];
  arrayDepartamento: Departamento[] = [];
  arrayMunicipio: Municipio[] = [];
  userData = this.restService.getUserData();
  authentication = this.userData.accessToken;
  objDestinatario: any;
  plantilla: any;
  radicado: any;
  urlDocs: string;
  LastfileObject: { name: string; data: File }[] = [];
  validFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  maxFileSize = 5 * 1024 * 1024; // 5 MB

  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
    { name: "Listado de PQRS", route: "/pqrs/log-pqrs-index" },
    { name: "Detalle", route: "/pqrs/pqrs-view/1" },
  ];
  breadcrumbRouteActive = "Gestionar traslado por Competencia";
  private urlBase = environment.apiUrl;

  public formGroupCorrespondencia = new FormGroup({
    tipo_envio: new FormControl(''),
    correspondencia_id: new FormControl({
      value: '',
      disabled: true,

    }, Validators.required),
  })
  tiposComunicacionBody;
  tiposComunicacionOptions;
  idRadicadoSalida: any;

  constructor(
    private fb: FormBuilder,
    private _serviceTrasladoService: TrasladoCompetenciaService,
    private modal: ModalService,
    private router: Router,
    public restService: RestService,
    private cdr: ChangeDetectorRef,
    @Inject(ToastService) private toast: ToastService
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.getInfoEndpoints();
    this.getPlantilla();
    this.getItemRadicado();
    this.fetchTiposComunicacion()
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
  }

  initForm() {
    this.formTraslado = this.fb.group({
      empresa: [""],
      destinatario: [""],
      fullName: ["", [Validators.required]],
      nombreEntidad: ["", [Validators.required]],
      nit: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      email: ["", [Validators.required]],
      pais: ["", [Validators.required]],
      departamento: ["", [Validators.required]],
      ciudad: ["", [Validators.required]],
      cpostal: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      telefono: [, [Validators.required]],
    });
  }

  async fetchTiposComunicacion() {
    const resp: any = await lastValueFrom(
      this.restService.restGetNotDecrypt(`api/tipos-comunicacion`, this.authentication)
    )
    this.tiposComunicacionBody = resp.data;
  }



  removeInputs() {
    this.formTraslado.removeControl("fullName");
    this.formTraslado.removeControl("nombreEntidad");
    this.formTraslado.removeControl("nit");
    this.formTraslado.removeControl("direccion");
    this.formTraslado.removeControl("email");
    this.formTraslado.removeControl("pais");
    this.formTraslado.removeControl("departamento");
    this.formTraslado.removeControl("ciudad");
    this.formTraslado.removeControl("cpostal");
    this.formTraslado.removeControl("telefono");
    this.formTraslado.removeControl("celular");
  }
  addInputs() {
    this.formTraslado.addControl("nombre", new FormControl(""));
    this.formTraslado.addControl("nit", new FormControl(""));
    this.formTraslado.addControl("direccion", new FormControl(""));
    this.formTraslado.addControl("email", new FormControl(""));
    this.formTraslado.addControl("pais", new FormControl(""));
    this.formTraslado.addControl("departamento", new FormControl(""));
    this.formTraslado.addControl("ciudad", new FormControl(""));
    this.formTraslado.addControl("cpostal", new FormControl(""));
    this.formTraslado.addControl("telefono", new FormControl(""));
  }
  setupFiltered(item: any, flag: "empresa" | "destinatario" | "funcionario") {
    // Si flag es undefined, salir de la función o manejar según sea necesario
    if (!flag) {
      return;
    }
    switch (flag) {
      case "empresa":
        item.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
        this.filteredEmpresa = this.getFilteredObservable(item, "empresa");
        return;
      case "destinatario":
        this.filteredDestinatario = this.getFilteredObservable(
          item,
          "destinatario"
        );
        return;
      case "funcionario":
        this.filteredFuncionario = this.getFilteredObservable(
          item,
          "funcionario"
        );
        return;
    }
  }
  getFilteredObservable(item: any, formControlName: string): Observable<any[]> {
    let formControl;

    formControl = this.formTraslado.get(formControlName);

    if (!formControl) {
      // Retorna un observable vacío si el control del formulario no existe
      return new Observable<any[]>();
    }

    return formControl.valueChanges.pipe(
      startWith(""),
      map((value: any) => this._filter(value, item))
    );
  }

  private _filter(value: string, options: any[]): any[] {
    const filterValue = value ? value.toLocaleLowerCase() : "";
    return options.filter(
      (option) =>
        (option.nombre && option.nombre.toLowerCase().includes(filterValue)) ||
        (option.username &&
          option.username.toLowerCase().includes(filterValue)) ||
        (option.omNivelGeografico1 &&
          option.omNivelGeografico1.toLowerCase().includes(filterValue))
    );
  }

  getInfoEndpoints() {
    const empresas$ = this._serviceTrasladoService.getEmpresas();
    const pais$ = this._serviceTrasladoService.getPais();

    forkJoin([empresas$, pais$]).subscribe({
      next: ([empresa, pais]) => {
        if (empresa) {
          this.arrayEmpresa = empresa.data;
          this.setupFiltered(this.arrayEmpresa, "empresa");
        }
        this.arrayPais = pais;
      },
      error: (error) => {
        this.modal.openNotify(
          "",
          "Hubo un error en el cargue de información",
          false
        );
        console.log(error);
        // setTimeout(() => {
        //   this.router.navigate(["/pqrs/pqrs-view/" + this.currentID]);
        // }, 2000);
      },
    });
  }

  getIdEmpresa(value: string) {
    if (value !== "Otro") {
      const empresaObject = this.arrayEmpresa.find((id) => id.nombre === value);
      const idEmpresa = empresaObject.id;

      if (idEmpresa) {
        this._serviceTrasladoService
          .getDestinatariosxEmpresas(idEmpresa)
          .subscribe({
            next: (info) => {
              this.arrayDestinatario = info.data;
              if (typeof this.arrayDestinatario !== "string") {
                this.setupFiltered(this.arrayDestinatario, "destinatario");
              } else {
                this.modal.openNotify("", "La empresa consultada no tiene clientes asociados", false);
              }
            },
            error: (error) => {
              this.modal.openNotify(
                "",
                "Hubo un error en el cargue de información",
                false
              );
              console.log(error);
              setTimeout(() => {
                this.router.navigate(["/pqrs/pqrs-view/" + this.currentID]);
              }, 2000);
            },
          });
      }
      this.removeInputs();
    } else {
      this.addInputs();
    }
  }
  getId(controlName: string, id: string) {
    console.log(controlName);
    console.log(id);
    const valueInput = this.formTraslado.get(controlName).value;
    const idInput = valueInput[id];
    if (controlName === "pais") {
      this.getInfoControl(idInput, "getDepartamentos", "arrayDepartamento");
    } else if (controlName === "departamento") {
      this.getInfoControl(idInput, "getMunicipios", "arrayMunicipio");
    }
  }

  getInfoControl(id: string, nameService: string, arrayInfo) {
    this._serviceTrasladoService[nameService](id).subscribe({
      next: (info) => {
        this[arrayInfo] = info;
      },
      error: (error) => {
        this.modal.openNotify(
          "",
          "Hubo un error en el cargue de información",
          false
        );
        console.log(error);
        setTimeout(() => {
          this.router.navigate(["/pqrs/pqrs-view/" + this.currentID]);
        }, 2000);
      },
    });
  }

  validateEntidadExistente() {
    const nombreEntidad = this.formTraslado.get("nombreEntidad").value;

    if (this.arrayEmpresa) {
      const found = this.arrayEmpresa.some(
        (item) => item.nombre === nombreEntidad
      );
      if (found) {
        this.modal.openNotify("", "Nombre de entidad ya existe", false);
        this.formTraslado.get("nombreEntidad").setValue("");
      }
    }
  }
  crearEmpresa() {
    const telefono = Number(this.formTraslado.get("telefono").value);
    const body: RegistrarEmpresa = {
      nombreEmpresa: this.formTraslado.get("nombreEntidad").value,
      nombreCliente: this.formTraslado.get("fullName").value,
      numeroDocumentoCliente: this.formTraslado.get("nit").value,
      correoElectronicoCliente: this.formTraslado.get("email").value,
      direccionCliente: this.formTraslado.get("direccion").value,
      telefonoCliente: telefono,
      idNivelGeografico3: this.formTraslado.get("pais").value.nivelGeografico1,
      idNivelGeografico2:
        this.formTraslado.get("ciudad").value.idNivelGeografico2,
      idNivelGeografico1:
        this.formTraslado.get("departamento").value.idNivelGeografico1,
      celular: this.formTraslado.get("celular").value,
      codigoPostal: this.formTraslado.get("cpostal").value,
    };
    const isValid = Object.values(body).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (isValid) {
      this._serviceTrasladoService.registrarEmpresa(body).subscribe({
        next: (response: any) => {
          this.modal.openNotify("", response.message, false);
          this.removeInputs();
          this.getInfoEndpoints();
          this.formTraslado.get("empresa").setValue("");
        },
        error: (error) => {
          this.modal.openNotify(
            "",
            "Hubo un error en el cargue de información",
            false
          );
          console.log(error);
          setTimeout(() => {
            this.router.navigate(["/pqrs/pqrs-view/" + this.currentID]);
          }, 2000);
        },
      });
    } else {
      this.modal.openNotify("", "Campos obligatorios", false);
    }
  }
  submitForm() {
    if (this.urlDocs !== undefined) {
      this.modal.openNotify('Éxito', 'Traslado por competencia realizada exitosamente', true).afterClosed().subscribe((closed: any) => {
        this.router.navigate([
          `/pqrs/pqrs-view/${this.currentID}/proyectar-respuesta`,
        ]);
      })
    } else {
      this.modal.openNotify('Aviso', 'El destinatario ya tiene un traslado por competencia', true);
    }
  }
  downloadFile(url, nameDownload) {
    console.log('url del download file: ', url, 'nombre del download file, ', nameDownload)
    const toBeReplaced = '/app/public/'
    const linkSource = url.replace(toBeReplaced, `${this.urlBase}`);

    console.log('link parseado para la descarga: ', linkSource)
    this.urlDocs = linkSource;
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

    console.log(body)
    console.log('CUERPO MEZCLA CORRESPONDENCIA:', body)

    return this.restService.restPost(`radicacion/transacciones/correspondence-match`, body, this.authentication)
  }
  postAsociarPlantilla(id: number, idSelectedTemplate: string) {
    return this.restService.httpPost(`api/radicado/${id}/documento-principal`,
      {
        idPlantilla: parseInt(idSelectedTemplate),
        idUser: this.userData.idDataCliente,
      }, this.userData.accessToken)
  }
  getItemRadicado() {
    this.fetchItem().pipe(catchError((err: any) => {
      throw new Error
      console.error(err)
    })).subscribe(response => this.radicado = response)

  }
  fetchItem(): Observable<any> {
    return this.restService.restGetNotDecrypt(`api/radicado/${this.currentID}`, this.authentication)
  }

  getPlantilla() {
    this.fetchPlantillas().subscribe(plantillasArray => {
      console.log(plantillasArray);

      const plantillas = plantillasArray.decrypted.data;

      const plantillaEncontrada = plantillas.find(item => item.id === 9);
      console.log(plantillaEncontrada);

    });
  }
  goBack(): void {
    this.modal.openAction(
      "",
      "¿Está seguro de cancelar el traslado a competencia?",
      () => {
        this.router.navigate(["/pqrs/pqrs-view/" + this.currentID]);
        this.toast.open({
          title: "Cancelación exitosa",
          duration: 2000,
          success: true,
        });
      }
    );
  }
  postProyectarRespuesta(body: any) {
    return this.restService.postParams('radicacion/radicados/create', body).pipe()
  }
  fetchPlantillas(): Observable<any> {
    return this.restService.restGetNotDecrypt(`configuracionApp/cg-gestion-plantillas/index?request=VTJGc2RHVmtYMTgvMzhlcUU2cytFM0dIRmNESDdGNGFuNEUybVVxYm5HVT0=`, this.authentication)
  }
  onOptionSelected(destinatario: any) {
    this.objDestinatario = this.arrayDestinatario.find(dest => dest.nombre === destinatario);
    const tipoPersonaID = this.objDestinatario.tipoId;
    const dataForm = {
      "data": {
        "isNuevoRemitente": false,
        "idCliente": [
          {
            "cliente": this.objDestinatario.id
          }
        ],
        "idCgTipoRadicado": 1,
        "radicadoOrigen": "",
        "fechaDocumentoRadiRadicado": new Date().toISOString().split('T')[0],
        "RadiRadicadoHijos": [parseInt(this.currentID)],
        "unicoRadiCgTipoRadicado": false,
        "idTipoPersona": tipoPersonaID,
        "nombreCliente": this.objDestinatario.nombre,
        "numeroDocumentoCliente": this.objDestinatario.numeroDocumento,
        "direccionCliente": this.objDestinatario.direccion,
        "idNivelGeografico3": this.objDestinatario.ciudadId,
        "idNivelGeografico2": 1,
        "idNivelGeografico1": 1,
        "correoElectronicoCliente": this.objDestinatario.email,
        "telefonoCliente": this.objDestinatario.telefono,
        "tipoZonaNotificacion ": 0,
        "remitentes": [
          {
            "correoElectronicoCliente": this.objDestinatario.email,
            "direccionCliente": this.objDestinatario.direccion,
            "idNivelGeografico1": 1,
            "idNivelGeografico2": 1,
            "idNivelGeografico3": this.objDestinatario.ciudadId,
            "idTipoPersona": tipoPersonaID,
            "nombreCliente": this.objDestinatario.nombre,
            "numeroDocumentoCliente": this.objDestinatario.numeroDocumento,
            "telefonoCliente": this.objDestinatario.telefono,
            "tipoZonaNotificacion ": 0,
            "idCliente": {
              "cliente": this.objDestinatario.id,
            }
          }
        ],
        "generoClienteCiudadanoDetalle": "",
        "rangoEdadClienteCiudadanoDetalle": "",
        "vulnerabilidadClienteCiudadanoDetalle": "",
        "etniaClienteCiudadanoDetalle": "",
        "isCiudadano": false,
        "idGdTrdSerie": this.radicado.idGdTrdSerie,
        "idGdTrdSubserie": this.radicado.idGdTrdSubserie,
        "idTrdTipoDocumental": this.radicado.idTrdTipoDocumental,
        "idTramites": "",
        "PrioridadRadiRadicados": false,
        "idCgMedioRecepcion": 2,
        "asuntoRadiRadicado": this.radicado.asuntoRadiRadicado,
        "fechaVencimientoRadiRadicados": new Date().toISOString().split('T')[0],
        "foliosRadiRadicado": this.radicado.foliosRadiRadicado,
        "descripcionAnexoRadiRadicado": "",
        "diasRestantes": '',
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
        "numeroRadicadoExterno": this.radicado.numeroRadicadoExterno,
        "numeroCuentaContrato": this.radicado.numeroCuentaContrato,
        "tipoRespuestaId": 1,
        "contactoSap": this.radicado.contactoSap,
        "direccion": this.radicado.direccion,
        "tipoDeVia": this.radicado.tipoDeVia,
        "numVia": this.radicado.numVia ?? '',
        "letra": this.radicado.letra,
        "sufijo": this.radicado.sufijo,
        "nPlaca": this.radicado.nPlaca,
        "complemento": this.radicado.complemento,
        "zona": this.radicado.zona,
        "tipoSolicitudId": this.radicado.tipoSolicitudId,
        "tipoServicioId": this.radicado.tipoServicioId,
        "field-validate": true,
        "tipoComunicacionId": this.formGroupCorrespondencia.get('correspondencia_id').value
      },
      "dataEmail": {}
    }
    console.log(dataForm);
    this.postProyectarRespuesta(dataForm).pipe(
      switchMap((response: any) => {
        const decrypted: Decrypted = response.decrypted
        this.idRadicadoSalida = response.decrypted.id;
        return this.postAsociarPlantilla(response.decrypted.id, "9").pipe(
          switchMap((responseAsociarPlantilla: ResponseAsociarPlantillas) => {
            return this.postMezclaCorrespondencia(responseAsociarPlantilla.data, decrypted).pipe(
              switchMap((responseMezclaCorrespondencia: any) => {
                return forkJoin([
                  this.postCambiarEstado(this.currentID, 'EST-080'),
                  this.postCambiarEstado(this.idRadicadoSalida, 'EST-080')
                ])
              }))
          })
        )
      })
    ).subscribe((response: any) => {
      this.downloadFile(response.data.rutaRadiDocumentoPrincipal, response.data.nombreRadiDocumentoPrincipal)
      this.toast.open({
        title: 'Envío éxitoso',
        success: true,
        duration: 4000,
      })
      this.router.navigate([`pqrs/pqrs-view/${this.currentID}/ver-respuesta-proyectada/${this.idRadicadoSalida}`])
    })
  }

  postCambiarEstado(idRadicado: string, codigoEstado: string) {
    return this.restService.httpPut(`api/radicado/${idRadicado}/estado/${codigoEstado}`, {})
  }

  postReasociarPlantilla() {

    const formData = new FormData();

    formData.append('idUser', this.restService.getUserData().idDataCliente)
    formData.append('idDependencia', this.restService.getUserData().dependencia.idGdTrdDependencia)
    formData.append('estado', "21")
    formData.append('file', this.LastfileObject[0].data)


    return this.restService.httpPostArchivo(`api/radicado/${this.currentID}/documento-principal-one-file`, formData, this.authentication).pipe(
      catchError(err => {
        console.error(err)
        this.modal.openNotify('', 'Error en la peticion de reasociacion', false)
        throw new Error()
      })
    )
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


          this.modal.openAction('', `¿Está seguro de asociar el documento ${file.name}, al radicado ${this.radicado.numeroRadiRadicado}?`, () => {
            this.LastfileObject.push(fileObj)
            this.postReasociarPlantilla().subscribe((res: ResponseReasociarPlantilla) => {
              const url = res.data.rutaRadiDocumentoPrincipal;
              const toBeReplaced = '/app/public/'
              let linkSource = url.replace(toBeReplaced, environment.apiUrlBasePath);
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
  crearFlujoFirma() {
    this.modal.openAction('', '¿Está seguro de iniciar un flujo de firma para el radicado ' + this.radicado.numeroRadiRadicado + '?', () => {
      this.router.navigate([`/signin/create/${this.currentID}`])
    })
  }
}

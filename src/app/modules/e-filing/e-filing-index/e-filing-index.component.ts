import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { GlobalAppService } from '@app/services/global-app.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { faker } from '@faker-js/faker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-filing-index',
  templateUrl: './e-filing-index.component.html',
  styleUrls: ['./e-filing-index.component.css']
})
export class EFilingIndexComponent implements OnInit {

  @Input() breadcrumbOn = [{ name: "Radicación sede electronica", route: "/e-filing" }];
  @Input() breadcrumbRouteActive = "Crear Solicitud";
  @Input() idSend = 0; // Si el servicio debe filtrar algo por ID este será el input para enviar ese dato
  @Input() routeIndexOne: string; // Ruta para consultar index one para la busqueda de id
  @Input() redirectionPath = '/dashboard'; // Ruta a redirigir en caso de que el usuario no posea permisos para realizar la accion
  @Input() uploadResponse: any = { status: false, message: 'Cargando...', proccess: 50 };
  @Input() timerShowNotification: number = 3000; // Tiempo de visualización de la notificacion en pantalla

  public versionApi: string = environment.versionApiDefault;
  public resSerSearch: any;
  public resSerSearchErr: any;
  public moduleForm: UntypedFormGroup;
  @Input() ruoteService: string = environment.apiUrl + "api/radicados-sede-electronicas";
  uploadValid: boolean = false;
  uploadProcess: boolean = false;

  readonly hideRequiredControl = new FormControl(false);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);

  public requestType: Object[];
  public personType: Object[];
  public notificationType: Object[];
  public notificationTypeNot: Object[];

  public countries: Object[];
  public states: Object[];
  public cities: Object[];

  public countriesNot: Object[];
  public statesNot: Object[];
  public citiesNot: Object[];

  public authorization: any;

  readonly options = inject(FormBuilder).group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.requestType = this.getRequestType();
    this.personType = this.getPersonType();
    this.notificationType = this.getNotificacionType();
    this.notificationTypeNot = this.getNotificacionType();
    this.countries = this.getCountries();
    this.countriesNot = this.getCountries();
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      if (this.idSend != 0) {
        this.onSearchId(this.idSend, this.authorization);
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
      id: id
    };

    this.restService.restGetParams( this.versionApi + this.routeIndexOne, params, authori).subscribe(
      (res) => {
        this.resSerSearch = res;
        // console.log( this.resSerSearch );
        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.resSerSearch, true, this.redirectionPath ).then((res) => {
          let resResolveResponse = res;
          if (resResolveResponse == true) {
            if (this.resSerSearch.data) {
              for (let name in this.resSerSearch.data) {
                if (this.moduleForm.controls[name]) {
                  this.moduleForm.controls[name].setValue(this.resSerSearch.data[name]);
                }
              }
            }
            this.sweetAlertService.sweetClose();
          }
        });
      }, (err) => {
        this.resSerSearchErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.resSerSearchErr, true, this.redirectionPath ).then((res) => { });
      }
    );
  }

  submitForm() {
  // Enviar solicitud

    let formData = {
      "tipoSolicitud": 1,
      "NumCuentaContrato": 324234235,
      "tipoPersona": 1,
      "tipoIdentificacion": 1,
      "numeroDocumento": "34334123",
      "nombres": "algun nombre",
      "telefonoCelular": 231422122,
      "telefonoFijo": 3243242332,
      "direcionRecidencia": "Calle 123",
      "pais": 57,
      "depatamento": 32,
      "municipio": 12,
      "tipoNotificacion": 1,
      "email": "correo@mail.com",
      "direccionNotificacion": "Calle 123",
      "paisNotificacion": 57,
      "depatamentoNotificacion": 32,
      "municipioNotificacion": 12,
      "hechos": "lorem",
      "pretenciones": "lorem",
      "anexos": ""
    }

    this.http.post(this.ruoteService, formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.authorization,
        })
    }).subscribe(event => {
      console.log({"evento": event});


        if (event.type === HttpEventType.UploadProgress) {
            // Actualizar el progreso de la carga
            const progress = Math.round(100 * (event.loaded / event.total));
            this.uploadResponse = { status: true, message: 'Cargando...', proccess: progress };
        } else if (event.type === HttpEventType.Response) {
            // Procesar la respuesta del servidor
            this.uploadResponse = { status: true, message: 'Carga completada', proccess: 100 };
            this.sweetAlertService.showNotification('success', 'Los archivos se han trasladado correctamente.', this.timerShowNotification);
            this.uploadValid = false;
            this.uploadProcess = false;
            this.moduleForm.reset();
            // Lógica adicional como redirecciones o actualizaciones de UI
        }
    }, error => {
        this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.error);
        this.uploadProcess = false;
    });
  }

  public getCountries(): Object[]{
    let countries = [];

    for(var i = 0; i < 10; i++){
      let elementId = i +1;
      let obt = {id: elementId, name: faker.location.country()};
      countries.push(obt);
    }
    return countries;
  }

  public getRequestType(): Object[] {
    let requestType = [];

     for(var i = 0; i < 10; i++){
       let elementId = i +1;
       let obt = {id: elementId, name: faker.finance.accountName()};
      requestType.push(obt);
     }
     return requestType;
   }

   public getPersonType(): Object[] {
    let personType = [];

     for(var i = 0; i < 5; i++){
       let elementId = i +1;
       let obt = {id: elementId, name: faker.person.jobDescriptor()};
      personType.push(obt);
     }
     return personType;
   }

   public getNotificacionType(): Object[] {
    let notificationType = [];

     for(var i = 0; i < 5; i++){
       let elementId = i +1;
       let obt = {id: elementId, name: faker.company.bs()};
      notificationType.push(obt);
     }
     return notificationType;
   }

  public getStates(countryId) {
    this.states = [];

    for(var i = 0; i < 10; i++){
      let elementId = i +1;
      let obt = {id: elementId, name: faker.location.state()};
      this.states.push(obt);
    }
  }

  public getCities(stateId) {
    this.cities = [];

    for(var i = 0; i < 10; i++){
      let elementId = i +1;
      let obt = {id: elementId, name: faker.location.city()};
      this.cities.push(obt);
    }
  }

  public getStatesNot(countryId) {
    this.statesNot = [];

    for(var i = 0; i < 10; i++){
      let elementId = i +1;
      let obt = {id: elementId, name: faker.location.state()};
      this.statesNot.push(obt);
    }
  }

  public getCitiesNot(stateId) {
    this.citiesNot = [];

    for(var i = 0; i < 10; i++){
      let elementId = i +1;
      let obt = {id: elementId, name: faker.location.city()};
      this.citiesNot.push(obt);
    }
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

}

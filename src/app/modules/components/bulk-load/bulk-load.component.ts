/**

 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ValidatorTypeFileInputFile } from 'src/app/helpers/validate-input-file.helper';
import { Router } from '@angular/router';
import { ModalService } from "src/app/services/modal/modal.service";

import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { ActivateTranslateService } from 'src/app/services/activate-translate.service';
import { TranslateService } from '@ngx-translate/core';

import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.css']
})
export class BulkLoadComponent implements OnInit, OnDestroy {

  moduleForm: UntypedFormGroup;

  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;

  @Output() public submitFormEmit = new EventEmitter<any>();

  // Nombre de tarjetas del formulario
  @Input() textForm = 'Carga masiva de archivos';
  // Valida tipo texto
  validTextType: boolean = false;
  // Iconos del formulario
  @Input() initCardHeaderIcon = 'attachment';
  /** Extensiones validas */
  @Input() validateFile: any = [{ type: 'xls' }, { type: 'xlsx' }];
  @Input() idSend = 0; // Si el servicio debe filtrar algo por ID este será el input para enviar ese dato
  @Input() ruoteServiceDocuments: string; // Ruta para ejecutar la carga del archivo
  urlEndSend: any;
  /** Response upload service */
  @Input() uploadResponse: any = { status: false, message: 'Cargando...', proccess: 50 };
  @Input() maxSize:number = 5242880; // Maximo de peso permitido por defecto 5MB
  @Input() maxSizeText: string = '5MB';
  @Input() dataSend: object; // Objeto que se envia al back como parametro request
  @Input() showButtonDowload: boolean = false; // muestra el boton de descarga de formato
  @Input() routeButtonDowload: string = environment.versionApiDefault + 'user/download-format'; // Por defecto la ruta de descarga del formato de usuarios
  @Input() redirectActive: boolean = false; // Si es redireccion true redirecciona
  @Input() statusNameFile: boolean = false; // Muestra el nombre del archivo
  @Input() labelNameFile = 'Nombre archivo'; // label del archivo
  @Input() placeHolderNameFile = 'ingreseNameFile'; // label del archivo
  @Input() maxlengthNameFile = 20; // Maxlent para el campo nameFile

  /** Las variables para mostrar la alerta informativa  */
  @Input() subMenuNotificationStatusTable: boolean = false;
  @Input() subMenuNotificationStatus: boolean = false;
  @Input() subMenuNotificationClassAlert: string = 'alert alert-info alert-with-icon';
  @Input() subMenuNotificationMessage: string;
  @Input() timerShowNotification: number = 3000; // Tiempo de visualización de la notificacion en pantalla

  /** Variable que indica la ruta a la que se debbe */

  subMenuNotificationMessageUno: string = "subMenuNotificationMessageUno";
  subMenuNotificationMessageDos: string = "subMenuNotificationMessageDos";
  subMenuNotificationMessageTres: string = "subMenuNotificationMessageTres";
  subMenuNotificationMessageCuatro: string = "subMenuNotificationMessageCuatro";
  subMenuNotificationMessageCinco: string = "subMenuNotificationMessageCinco";

  authorization: any;
  notificationErrExtArray: any = [];
  notificationErrExt: string = 'Solo es permitido archivos';

  alertStatusForm: boolean = false;
  alertMaxSizeFile: boolean = false;
  alertStatusFormText: string;
  versionApi: string = environment.versionApiDefault;

  @Input() routeIndexOne: string; // Ruta para consultar index one para la busqueda de id

  uploadValid: boolean = false;
  uploadProcess: boolean = false;

  /** Variables para consulta de archivos */
  responseServiceFormSubmit: any;
  responseServiceFormSubmitErr: any;

  responseService: any;
  responseServiceErr: any;
  resSerLenguage: any;
  resSerSearch: any;
  resSerSearchErr: any;

  @Input() redirectionPath = '/dashboard'; // Ruta a redirigir en caso de que el usuario no posea permisos para realizar la accion

  @Output() public uploadSuccessFileEmiter = new EventEmitter<any>();

  activeLang: string;
  languageReceive: any;
  subscriptionTranslateService$: Subscription;

  dataListModuleName: any;
  dataListModuleNameNoAES: any;

  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, public lhs: LocalStorageService, private sweetAlertService: SweetAlertService, private encryptService: EncryptService, private globalAppService: GlobalAppService, private translate: TranslateService, private activateTranslateService: ActivateTranslateService,private restService: RestService, private router: Router, private modal: ModalService) {
    /**
     * Configuración del formulario para el login
     */
    this.moduleForm = this.formBuilder.group({
      nameFile: new UntypedFormControl('', Validators.compose([
        // Validators.required
      ])),
      file_uploaded: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.detectLanguageInitial();
  }

  ngOnInit() {
    this.getTokenLS();
    this.detectLanguageChange();
    if (this.statusNameFile) {
      this.moduleForm.controls['nameFile'].setValidators([Validators.required]);
    }
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

  /**
   * Valida la extensión del archivo que será cargado
   * @param nameFile nombre del archivo a cargar
   */
  validateFileExtension(nameFile) {
    return new Promise<boolean>((resolve) => {
      let extensionAcepted = false;
      this.notificationErrExtArray = [];
      // const extension = nameFile.name.split('.')[1].toLowerCase();
      const extensionArr = nameFile.name.split('.');
      const extension = extensionArr.pop().toLowerCase();
      this.validateFile.forEach(element => {
        this.notificationErrExtArray.push("." + element.type);
        if (extension == element.type) {
          extensionAcepted = true;
        }
      });

      resolve(extensionAcepted);
    });
  }


  onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const files = Array.from(input.files) as File[];
        let invalidFiles = false;
        const validFiles: File[] = [];

        files.forEach(file => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            if (extension === 'xls' || extension === 'xlsx') {
                validFiles.push(file);
            } else {
                invalidFiles = true;
            }
        });

        if (invalidFiles) {
            this.sweetAlertService.sweetInfoText('Archivo(s) no válido(s)', 'Solo se permiten archivos con extensión .xls o .xlsx');
        }

        if (validFiles.length > 0) {
            this.moduleForm.controls['file_uploaded'].setValue(validFiles);
            this.uploadValid = true;
        } else {
            this.uploadValid = false;
        }
    } else {
        this.uploadValid = false;
    }
  }

  

  submitForm() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      
      this.uploadValid = false;

      // Verificar si el formulario es válido y si hay archivos seleccionados
      if (!this.moduleForm.valid || this.moduleForm.get('file_uploaded').value.length === 0) {
          this.sweetAlertService.sweetInfo('Algo está mal', 'Por favor, asegúrate de que todos los campos están correctamente llenos y que has seleccionado al menos un archivo.');
          return;
      }

      this.sweetAlertService.sweetLoading();
      this.uploadProcess = true;

      const formData = new FormData();
      const files: File[] = this.moduleForm.get('file_uploaded').value;

      // Añadir cada archivo al objeto FormData. Nota que usamos el mismo nombre 'file_uploaded' para todos los archivos.
      files.forEach(file => {
          formData.append('file_uploaded', file, file.name);
      });

      // Añadir otros datos si es necesario
      if (this.statusNameFile && this.moduleForm.get('nameFile').value) {
          formData.append('nameFile', this.moduleForm.get('nameFile').value);
      }

      // Enviar solicitud
      this.http.post(this.ruoteServiceDocuments, formData, {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
              'Authorization': 'Bearer ' + this.authorization,
          })
      }).subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
              // Actualizar el progreso de la carga
              const progress = Math.round(100 * (event.loaded / event.total));
              this.uploadResponse = { status: true, message: 'Cargando...', proccess: progress };
          } else if (event.type == HttpEventType.Response) {
              // Procesar la respuesta del servidor
              this.uploadResponse = { status: true, message: 'Carga completada', proccess: 100 };
              this.sweetAlertService.showNotification('success', 'Archivo cargado exitosamente.', this.timerShowNotification);
              this.sweetAlertService.sweetClose();
              this.uploadValid = false;
              this.uploadProcess = false;
              this.moduleForm.reset();
              // Lógica adicional como redirecciones o actualizaciones de UI
          }
      }, error => {
          if(error.error.message){
            this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.message);
          }else{
            this.sweetAlertService.sweetInfoText('Error durante la carga', error.error.error.message);
          }
          this.uploadProcess = false;
      });
    })

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


  onDownloadFormat( ) {
    this.sweetAlertService.sweetLoading();
    let nombreDoc = 'formato-usuarios-sistema.xls';
    const data = {};

    this.restService.restPost( this.routeButtonDowload, data, this.authorization).subscribe((res) => {
        this.responseServiceFormSubmit = res;

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(this.responseServiceFormSubmit, false ).then((res) => {
          const responseResolveResponse = res;

          if (responseResolveResponse == true) {
            this.downloadFile( this.responseServiceFormSubmit.datafile, ( this.responseServiceFormSubmit.data ? this.responseServiceFormSubmit.data : nombreDoc ) );
          }
        });
      }, (err) => {
        this.responseServiceFormSubmitErr = err;
        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(this.responseServiceFormSubmitErr, false ).then((res) => { });
      }
    );
  }

   /**
   * Descarga el archivo que llega en base64
   * @param file el  en base 64
   * @param nameDownload nombre del archivo
   */
  downloadFile(file, nameDownload) {

		const linkSource = `data:application/octet-stream;base64,${file}`;
		const downloadLink = document.createElement("a");

		downloadLink.href = linkSource;
		downloadLink.download = nameDownload;
    downloadLink.click();
    this.sweetAlertService.sweetClose();
  }

  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }

 
}

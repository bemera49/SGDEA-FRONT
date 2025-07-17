import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateInput } from '@app/helpers/input-patters';
import { GlobalAppService } from '@app/services/global-app.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';

@Component({
  selector: 'settings-app-time-request-create',
  templateUrl: './settings-app-time-request-create.component.html',
  styleUrls: ['./settings-app-time-request-create.component.css']
})
export class SettingAppCreateTimeRequestComponent implements OnInit {

  @Input() breadcrumbOn = [{ name: "Configuración", route: "/setting" }];
  @Input() breadcrumbRouteActive = "Tiempo de respuesta";
  @Input() idSend = 0; // Si el servicio debe filtrar algo por ID este será el input para enviar ese dato
  @Input() routeIndexOne: string; // Ruta para consultar index one para la busqueda de id
  @Input() redirectionPath = '/dashboard'; // Ruta a redirigir en caso de que el usuario no posea permisos para realizar la accion
  @Input() uploadResponse: any = { status: false, message: 'Cargando...', proccess: 50 };
  @Input() timerShowNotification: number = 3000; // Tiempo de visualización de la notificacion en pantalla

  public versionApi: string = environment.versionApiDefault;
  public resSerSearch: any;
  public resSerSearchErr: any;
  public moduleForm: UntypedFormGroup;
  @Input() ruoteService: string = environment.versionApiDefault + 'api/v1/tipo-solicitudes';
  uploadValid: boolean = false;
  uploadProcess: boolean = false;

  readonly hideRequiredControl = new FormControl(false);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);

  public updateId: any;

  public initBotonIndexRoute: string = '/setting/time-request-index';
  public textSubmitButton: string = 'Agregar';
  public fecha: string;
  public usuario: string = "Usuario";

  readonly options = inject(FormBuilder).group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  readonly message = '¿Esta seguro de la acción a realizar?';
  readonly description = '';
  readonly dialog = inject(MatDialog);

  readonly messageAlert = 'Por favor verifique datos obligatorios imcompletos';
  readonly descriptionAlert = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    public lhs: LocalStorageService,
    public sweetAlertService: SweetAlertService,
    public restService: RestService,
    public globalAppService: GlobalAppService,
    private router: Router,
    private route: ActivatedRoute,
    public validateInput: ValidateInput
  ) {
    moment.locale("es");
    moment().format("L"); 
    const hoy = Date.now();
    this.fecha = moment(hoy).format("DD/MM/YYYY");
    this.lhs.getUser().then((res: any) => {
      this.usuario = res.nombre;
    });
  }

  ngOnInit(): void {
    this.updateId = this.route.snapshot.paramMap.get('id');
    this.formInit();
  }

  formInit():void {
    this.moduleForm = this.formBuilder.group({

      nombre: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      dias_vencimiento: new UntypedFormControl('', Validators.compose([
        // Validators.required
      ])),
      observacion: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      dias_verde: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      porcentaje_primera_alerta: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      porcentaje_segunda_alerta: new UntypedFormControl('', Validators.compose([
        Validators.required
      ])),
      estado: new UntypedFormControl(true, Validators.compose([
        Validators.required
      ])),
    });

    if(this.updateId != null) {
      this.textSubmitButton = 'Actualizar'
      this.getResponseTime(this.updateId);
    }
  }

  getResponseTime(id: number): void {
    this.restService.get(this.ruoteService + '/' + id).subscribe(res => {
      console.log({res});
      if(res.status == 'success'){
        this.moduleForm.setValue({
          "nombre": res.data.nombre,
          "dias_vencimiento": res.data.dias_vencimiento,
          "dias_verde": res.data.dias_vencimiento,
          "porcentaje_primera_alerta": res.data.porcentaje_primera_alerta,
          "porcentaje_segunda_alerta": res.data.porcentaje_segunda_alerta,
          "observacion": res.data.observacion,
          "estado": res.data.activo,
        })
      }

      if(res.data.created_at	!= null){
        this.fecha = moment(res.data.created_at).format("DD/MM/YYYY");
      }
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

  openDialog() {

    if(!this.moduleForm.valid){
      const dialogRef = this.dialog.open(ActionModalComponent, {
        data: {message: this.messageAlert, description: this.descriptionAlert, btnCancelIsHide: true, showIcon: 'report'},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(ActionModalComponent, {
        data: {message: this.message, description: this.description},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          this.submitForm(result);
        }
      });
    }

    
  }

  submitForm(result: any) {

    
  // Enviar solicitud
    let formData = {
      "nombre": this.moduleForm.controls.nombre.value,
      "dias_vencimiento": parseInt(this.moduleForm.controls.dias_vencimiento.value),
      "porcentaje_primera_alerta": parseInt(this.moduleForm.controls.porcentaje_primera_alerta.value),
      "porcentaje_segunda_alerta": parseInt(this.moduleForm.controls.porcentaje_segunda_alerta.value),
      "observacion": this.moduleForm.controls.observacion.value,
      "activo": this.moduleForm.controls.estado.value,
    }

    if(this.updateId != null) {
      this.restService.httpPut(this.ruoteService + '/' + this.updateId, formData).subscribe(resp =>{
        if(resp.status == 'success') {
          this.sweetAlertService.showNotification('success', 'tiempos de respuesta actualizado correctamente.', this.timerShowNotification);
          this.returnIndex();
        }
      });
    } else {
      this.restService.post(this.ruoteService, formData).subscribe(resp =>{
        if(resp.status == 'success') {
          this.sweetAlertService.showNotification('success', 'tiempos de respuesta creado correctamente.', this.timerShowNotification);
          this.returnIndex();
        }
      });

    }
  }

  returnIndex(): void {
    this.router.navigate(['/' + this.initBotonIndexRoute]);
  }

  

}

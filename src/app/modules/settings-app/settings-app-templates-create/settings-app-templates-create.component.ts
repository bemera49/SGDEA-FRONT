import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplateSettingsService } from '../../../services/settings/template-settings.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-app-templates-create',
  templateUrl: './settings-app-templates-create.component.html',
  styleUrls: ['./settings-app-templates-create.component.css']
})
export class SettingsAppTemplatesCreateComponent implements OnInit {

  // Nombre del formulario
  textForm = 'Cargar plantilla';
  // Icono del formulario
  initCardHeaderIcon = 'widgets';
  // Autentificacion
  authorization: string;
  // variable que guarda el id que llega por Get
  paramiD: string;
  paramOID: string;
  paramName: string;
  paramOName: string;
  filesUploadCount: any;

  statusNameFile = true;
  labelNameFile = 'Nombre plantilla';
  placeHolderNameFile = 'Ingrese nombre de la plantilla';

  /** Las variables para mostrar la alerta informativa  */
  subMenuNotificationStatus: boolean = true;
  subMenuNotificationMessage: string = 'notificationHeaderUploadTRD';

  dataSend: object; // Objeto que se envia al back como parametro request
  redirectActive: boolean = true; // redirecciona
  redirectionPath = '/setting/templates-index'; // Ruta a redirigir en caso de no poseer permisos para realizar la accion
  showButtonDowload: boolean = false; // Muestra el boton para descargar formato
  validateFile: any = [{ type: 'docx' }, { type: 'odt' }];

  /** Boton flotante */
  iconMenu: string = 'save';
  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Configuración', 'route': '/setting' },
    { 'name': 'Gestión de plantillas', 'route': this.redirectionPath },
  ];
  breadcrumbRouteActive = '';

  public templateTypes:any[] = [];
  public modules:any[] = [];
  public activeEditor:boolean = true;
  public editorContent = '';
  public templateForm: FormGroup;
  public templateId:any;
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private toastSvc:ToastService, private templateSettingsSvc: TemplateSettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      templateType: [null, Validators.required],
      templateCode: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]],
      templateName: [{ value: '', disabled: true }, Validators.required],
      version: [{ value: '', disabled: true }, Validators.required],
      module: [{ value: '', disabled: true }, Validators.required],
    });
    this.templateForm.get('templateType')?.valueChanges.subscribe(value => {
      this.handleTemplateTypeChange();
    });
    this.activatedRoute.params.subscribe((params:any) => {
      this.templateId = params.id;
      if (this.templateId !== undefined) {
        this.getTemplate();
        this.breadcrumbRouteActive = 'Actualizar'
      } else {
        this.breadcrumbRouteActive = 'Crear'
      }
    })
    this.getModules();
    this.getTemplateTypes();
  }

  handleTemplateTypeChange() {
    if (this.templateForm.get('templateType').value == 3 ) {
      this.templateForm.get('templateCode')?.enable();
      this.templateForm.get('templateName')?.enable();
      this.templateForm.get('version')?.enable();
      this.templateForm.get('module')?.enable();
    } else if (this.templateForm.get('templateType').value == 4 || this.templateForm.get('templateType').value == 5) {
      this.templateForm.get('templateCode')?.setValue(null);
      this.templateForm.get('version')?.setValue(null);

      this.templateForm.get('templateCode')?.disable();
      this.templateForm.get('version')?.disable();

      this.templateForm.get('templateName')?.enable();
      this.templateForm.get('module')?.enable();
    } else {
      this.templateForm.get('templateCode')?.setValue(null);
      this.templateForm.get('version')?.setValue(null);
      this.templateForm.get('templateName')?.setValue(null);
      this.templateForm.get('module')?.setValue(null);
      this.templateForm.get('templateCode')?.disable();
      this.templateForm.get('version')?.disable();
      this.templateForm.get('templateName')?.disable();
      this.templateForm.get('module')?.disable();
    }
  };

  onSubmit() {
    const data = {
      "nombre": this.templateForm.get('templateName').value,
      "modulo_id": this.templateForm.get('module').value,
      "tipo_plantilla_id": this.templateForm.get('templateType').value,
      "html": this.editorContent,
      "version": this.templateForm.get('version').value,
      "codigo_plantilla":this.templateForm.get('templateCode').value
    };
    this.templateForm.markAllAsTouched();
    if (this.templateForm.valid) {
      // Lógica para enviar el formulario
      if (this.templateId !== undefined) {
          this.updateTemplate(data);
      } else {
        this.createTemplate(data);
      }
    } else {
      this.toastSvc.open({
        description: 'Completa los campos requeridos',
        success: false,
        duration: 3000,
        title: ''
      })
    }
  }

  changeDocument(content: string) {
    this.editorContent = content;
  };

  getTemplateTypes(){
    this.templateSettingsSvc.getTemplateTypes()
      .subscribe({
        error:(err:any) => {
          console.log(err);
        },
        next:(resp:any) => {
          this.templateTypes = resp.data;
          console.log(this.templateTypes)
        }
      });
  };

  getModules(){
    this.templateSettingsSvc.getModules()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.modules = resp.data;
            console.log(this.modules);
          }
        });
  };

  getTemplate(){
    this.templateSettingsSvc.getTemplate(this.templateId)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp);
            this.templateForm.get('templateName')?.setValue(resp.data.nombreCgPlantilla);
            this.templateForm.get('module')?.setValue(resp.data.modulo.id);
            this.templateForm.get('templateType')?.setValue(resp.data.tipoPlantilla.id);
            this.templateForm.get('version')?.setValue(resp.data.version);
            this.templateForm.get('templateCode')?.setValue(resp.data.codigo_plantilla);
            this.editorContent = resp.data.html
            // this.templateForm.get('templateCode')?.setValue(resp.data.);
            // this.templateForm.get('version')?.setValue(resp.data.);
          }
        })
  }

  createTemplate(data:{}){


    this.templateSettingsSvc.createTemplate(data)
        .subscribe({
          error:(err:any) => {
            this.toastSvc.open({
              description: err.error.message,
              success: false,
              duration: 3000,
              title: ''
            })
          },
          next:(resp:any) => {
            this.router.navigateByUrl('/setting/templates-index')
            this.toastSvc.open({
              description: resp.message,
              success: false,
              duration: 3000,
              title: ''
            });
          }
        })
  }

  updateTemplate(data:{}){
    this.templateSettingsSvc.updateTemplate(data, this.templateId)
          .subscribe({
            error:(err:any) => {
              console.log(err)
              this.toastSvc.open({
                description: err.error.message,
                success: false,
                duration: 3000,
                title: ''
              })
            },
            next:(resp:any) => {
              this.router.navigateByUrl('/setting/templates-index')
              this.toastSvc.open({
                description: resp.message,
                success: false,
                duration: 3000,
                title: ''
              });
            }
          })

  }
}

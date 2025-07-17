import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/services/modal/modal.service';
import { environment } from 'src/environments/environment';
import { FormComponent } from './form/form.component';
import { RestService } from '@app/services/rest.service';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-administracion-metadatos',
  templateUrl: './administracion-metadatos.component.html',
  styleUrls: ['./administracion-metadatos.component.css']
})
export class AdministracionMetadatosComponent implements OnInit {

  /** BreadcrumbOn  */
  breadcrumbOn = [
    { 'name': 'Configuración', 'route': '/setting' },
  ];
  breadcrumbRouteActive = 'Administración Metadatos';

  // Nombre del módulo donde se esta accediendo al initialList
  route: string = '';

  initCardHeaderStatus = true;
  initCardHeaderIcon = 'point_of_sale';
  showButtonFiltrer = false; // oculta el boton de los filtros
  initialNotificationMessage = 'textFormFilingLabel';
  initCardHeaderTitle = 'Listado de metadatos';
  initialNotificationStatus = true; // muestra la notificacion

  // Configuraciones para datatables
  routeLoadDataTablesService: string = environment.versionApiDefault + 'api/metadatoTrdSerie';

  // Configuración para el proceso change status
  routeChangeStatus: string = environment.versionApiDefault + 'api/tipo_metadato';

  initBotonCreateRoute: string = '/setting/filing-label-create'; // Ruta del botón crear

  dtTitles: any = [
    { title: 'Tipo metadato', data: 'tipo_metadato_nombre' },
    { title: 'Fecha creación', data: 'created_at' },
    { title: 'Título', data: 'nombre' },
    { title: 'Tipo dato', data: 'tipo' },
    { title: 'Descripción', data: 'descripcion' },
  ];

  /**
   * Configuración para el botón flotante
   */
  menuButtonsSelectNull: any = [
    { icon: 'add', title: 'Crear', action: 'create', data: '' },
  ];
  menuButtonsSelectOne: any = [
    { icon: 'edit', title: 'Editar', action: 'edit', data: '' },
    { icon: 'delete', title: 'Eliminar', action: 'delete', data: '' },
  ];
  menuButtonsSelectMasive: any = [
    { icon: 'delete', title: 'Eliminar', action: 'delete', data: '' },
  ];
  menuButtons: any = this.menuButtonsSelectNull;
  eventClickButtonSelectedData: any;

  constructor(
    private modalSvc: ModalService,
    private restSvc: RestService,
    private fb: FormBuilder,
    private toastSvc: ToastService
  ) { }

  ngOnInit(): void {
  }

  /**
   *
   * @param event
   * Procesando las opciones del menu flotante
   */
  menuReceiveData(event) {
    switch (event.action) {
      case 'edit':
        this.modalSvc.open(FormComponent, { ...this.eventClickButtonSelectedData }, '60%').afterClosed().subscribe(() => {
          window.location.reload();
        });
        break;
      case 'create':
        this.modalSvc.open(FormComponent, null, '60%').afterClosed().subscribe(() => {
          window.location.reload();
        });
        break;
      case 'delete':
        console.log(this.eventClickButtonSelectedData);

        if (this.eventClickButtonSelectedData.filter(item => item.estado == 'Activo').length > 0) return this.toastSvc.open({ description: 'No se pueden eliminar registros activos' });
        this.modalSvc.openAction("", "¿Está seguro de la acción a realizar?", () => {
          forkJoin({
            ...this.eventClickButtonSelectedData.map(item => this.restSvc.delete(`api/metadatoTrdSerie/${item.id}`, this.fb.group({})))
          }).subscribe({
            next: (data) => {
              this.toastSvc.open({
                description: 'Metadatos eliminados correctamente',
              })
              window.location.reload();
            },
            error: (error) => {
              console.log(error.error);
              this.toastSvc.open({
                description: error.error[0],
              })
            }
          })
        });
        break;
    }
  }

  /**
   *
   * @param event
   * Recibe la data de los registros a lo que se les hizo clic
   */
  selectedRowsReceiveData(event) {
    if (event.length > 0) {
      if (event.length == 1) { // Un registro seleccionado
        this.eventClickButtonSelectedData = event;
        this.menuButtons = this.menuButtonsSelectOne;
      } else { // Varios registros seleccionados
        this.menuButtons = this.menuButtonsSelectMasive;
      }
    } else { // Ningun registro seleccionado
      this.menuButtons = this.menuButtonsSelectNull;
    }
  }

}

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, SimpleChanges, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '@app/app.material.module';
import { CanDirective } from '@app/directives/can.directive';
import { Observable, switchMap, of, pipe, takeUntil, Subscription, catchError } from 'rxjs';
import { PaginationComponent } from './pagination/pagination-component/pagination.component';
import { PaginationServiceService } from './pagination/pagination-service/pagination-service.service';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { AsyncPipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestService } from '@app/services/rest.service';
import { TableService } from './service/table.service';
import { ModalService } from '@app/services/modal/modal.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';



export interface actions {
  icon: string,
  routerLink: string,
  label: string,

}

export interface TableHeaders {
  label: string,
  name: string,
  sortable: boolean;
  allowed?: string[],

}


export interface texts {
  title: string,
  description: string,
}

export interface config {
  headers: TableHeaders[],
  texts: texts,
  fetch: Observable<any>,
  FormGroup?: FormGroup,
  setFatherId?: Boolean,
  searchLength?: Boolean,
  idTracker: string,
  actions: actions[],
  TableMenuOptions?: any[],
  isJefeArea?: boolean;
  reloadTable?: boolean;
  validateMinTwoSelected?: boolean
  validateMinOneSelected?: boolean
  hideSelectColumn?: boolean
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, PaginationComponent, CanDirective, AsyncPipe, NgFor, NgIf],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy{

  public pagination = inject(PaginationServiceService);
  public router: Router = inject(Router)
  public pqrsViewService: PqrsViewService = inject(PqrsViewService)
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  public restService: RestService = inject(RestService)
  public tableService: TableService = inject(TableService)
  public modalService: ModalService = inject(ModalService)

  @Input() config: config
  @Output() selectedRows: EventEmitter<any[]> = new EventEmitter<any[]>()
  @Output() refresh = new EventEmitter()
  @Output() clearFiltersOutput = new EventEmitter()
  public selectedRows$: any[] = []
  canSeeLenght = true
  isFirstSearch = false;

  private destroy$ = new Subject<void>();
  private subscription: Subscription = new Subscription();
  private reloadSubscription: Subscription = new Subscription();




  reload(forceReload = false) {
    if(this.config?.reloadTable == false  && !forceReload ){
      return;
    }

    this.subscription = this.config.fetch.subscribe(
      response => {

        this.data = response?.data ? response?.data : response;
        this.selectedRows$ = []
        this.selectedRows.emit(this.selectedRows$)
        this.pagination.setTotalItems(response)

        this.sweetAlertService.sweetClose();
        if(response.data?.length == 0 ) {
          this.modalService.openNotify('', 'No se encontraron registros que coincidan con su consulta', false)
        }

        //  console.log('Data updated:', this.data, "Selected rows:", this.selectedRows$);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  validations() { // Colocar aqui toda la logica para la depuracion de las acciones en la seleccion
    // if(elementBody.estado == 'Por asignar'){
    //   this.config.TableMenuOptions = this.config.TableMenuOptions.filter(option => option.title !== 'Tipificar')
    // }

  }


  clearFilters() {
    console.log("1")
    this.clearFiltersOutput.emit(true);
    if(!this.config.isJefeArea){
      this.config.FormGroup.reset()
    }
    this.isFirstSearch = false;
  }

  redirectToPreviousDetail() { // Este metodo es de la HU07 para rediguir a la vista anterior cuando se selecciona una vista asociada
    const id = this.activatedRoute.params['id']

    this.router.navigate(['/pqrs/pqrs-view/' + id])
  }


  actionsButtonValidation(): boolean {
    if(this.config.isJefeArea && this.config.validateMinOneSelected){
      const validation = this.selectedRows$.length >= 1 && this.isFirstSearch == true;
      return validation
    }
    
    if(this.config.isJefeArea && this.config.validateMinTwoSelected == undefined){
      return true;
    }
    const validation = this.selectedRows$.length >= 2 && this.isFirstSearch == true;
    return validation
  }

  selectedRowsLengthValidation(): boolean {
    return this.selectedRows$.length > 1
  }

  isRowSelected(item: any) {
    return this.selectedRows$.some(element => element[this.config.idTracker] === item[this.config.idTracker])
  }

  toggleAllRows($event: any, isChecked: boolean) { // Funcion para el checkbox maestro

    if(this.selectedRows$.length > 0) {

      this.selectedRows$ = []

      this.selectedRows.emit(this.selectedRows$)
    } else {
    this.selectedRows$ = this.data;
    if(this.selectedRows$.some(item => item.estado == "Por asignar") || this.selectedRows$.some(item => item.estado == 'Rechazado' || item.estado == 'Pendiente retipificación')  ) {
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Tipificar')
    }
    if(this.selectedRows$.some(item => item.estado == "Radicado")) {
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Asignar')
    }
    if (this.selectedRows$.some(item => item.estado !== 'Rechazado' && item.estado !== 'Pendiente retipificación')) {
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Retipificar');
    }
    this.selectedRows.emit(this.selectedRows$)
    }
  }

  toggleRowSelection(elementBody: any) { // Funcion para manejar la seleccion individual

    if(elementBody.estado == 'Por asignar' || elementBody.estado == 'Rechazado' || elementBody.estado == 'Pendiente retipificación'){
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Tipificar')
    }

    if(elementBody.estado == 'Radicado'){
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Asignar')
    }

    if (elementBody.estado !== 'Rechazado' && elementBody.estado !== 'Pendiente retipificación') {
      this.config.TableMenuOptions = this.config.TableMenuOptions?.filter(option => option.title !== 'Retipificar');
    }


    const property = this.config.idTracker;
    const validation = this.selectedRows$.find(element => {
      return element[property] === elementBody[property];
    });
    if (validation === undefined) {
      this.selectedRows$.push(elementBody);
    } else {
      this.selectedRows$ = this.selectedRows$.filter(element => {
        return element[property] !== validation[property];
      });
    } this.selectedRows.emit(this.selectedRows$)
  }

  navigateTo(url: string, id: string, encrypParams?: boolean) {
    if(this.config.setFatherId) {
      this.pqrsViewService.setDetailFatherId(id)
    }
    if(encrypParams) {
      id = btoa(id)
      // Le quitamos el numero y le agregamos el id encriptado
      url = url.split('/').slice(0, -1).join('/') + '/' + id
      console.log('URL:', url)
    }
    this.router.navigate([url])
  }

  public data: Array<any> = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
   
    if (changes.config) {
      console.log("changes ")
      // Cancelar la suscripción anterior para evitar fugas de memoria.
  
      
      console.log(changes['config'])

      // Llamar a config.fetch y suscribirse al resultado.

      this.config.fetch
      .pipe(catchError((err) => {
        console.error(err)
        throw new Error(err)
      }))
      .subscribe((response => {

          this.data = response.data 

        if(response?.data?.length == 0 ) {
          this.modalService.openNotify('', 'No se encontraron registros que coincidan con su consulta', false)
        } 

      }))

      // this.config?.fetch?.subscribe(
      //   response => {
      //     console.log("Llamar a config.fetch y suscribirse al resultado.", response)
      //     this.data = response.data;

      
     
      //     this.selectedRows$ = []
      //     this.selectedRows.emit(this.selectedRows$)

      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
    }
  }

  private unsubscribe$ = new Subject<void>();
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.validarDatoHijo().pipe(takeUntil(this.unsubscribe$)).subscribe(isChildRunning => {
        if (isChildRunning) {
          // Validamos si config.fetch es un observable
          if (this.config.fetch instanceof Observable) {
            this.subscription.unsubscribe();
            this.sweetAlertService.sweetLoading();
            this.reload();
          }else{
            this.data = this.config.fetch as any;
          }
        }
      });
      this.reloadSubscription = this.tableService.getEvent().subscribe(() => {
        this.clearFilters();
        console.log('Recargando tabla');
      });

      if(this.config?.reloadTable == false){
        return;
      }

      this.config.fetch.subscribe((response: any) => {
        this.data = response;
        console.log(this.data)
        this.sweetAlertService.sweetClose();
        this.pagination.setTotalItems(response)
        // console.log("Respuesta de la peticion al config.fetch: ",   response, this.config)

        this.pagination.setTotalItems(response)

        // Promise.resolve().then(() => this.cdr.detectChanges());
      });
    }, 0);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isObjectAndHasNombre(item: any, headerName: string): boolean {
    return item[headerName] && typeof item[headerName] === 'object' && !!item[headerName].nombre;
  }

  isObjectAndHasNombreCgMedioRecepcion(item: any, headerName: string): boolean {
    return item[headerName] && typeof item[headerName] === 'object' && !!item[headerName].nombreCgMedioRecepcion;
  }

  isObjectAndHasEstado(item: any, headerName: string): boolean {
    return item[headerName] && typeof item[headerName] === 'object' && !!item[headerName].estado;
  }

  isNotObject(item: any, headerName: string): boolean {
    return !item[headerName] || typeof item[headerName] !== 'object';
  }

  refreshTable() {
    this.refresh.emit()
  }

  validarDatoHijo(): Observable<boolean>{
    return new Observable<boolean>(observer => {
      this.tableService.refrescarCambios().subscribe(isChildRunning => {
        observer.next(isChildRunning);
      });
    });
  }
  
}

import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { PaginationServiceService } from '@app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Observable, Subscription } from 'rxjs';
import { DataItem } from '../../Interfaces/Designation-requets';
import { DesignationsService } from '../../Services/designations.service';

@Component({
  selector: 'app-traceability-table',
  templateUrl: './traceability-table.component.html',
  styleUrls: ['./traceability-table.component.css']
})
export class TraceabilityTableComponent implements OnInit, OnDestroy {

  private pag = inject(PaginationServiceService);
  datatable: DataItem[] | [] = [];
  @Input() id: string;
  @Input() headertableitem: [];
  itemsTable: unknown[] = [];
  traceabilitydata: DataItem[] = [
    // Datos de ejemplo aquí
  ];
  private dataTracebility: Subscription;
  private paginationSubscription: Subscription;
  itemsPerDefault = 5;

  private eventsSubscriptionReloadTable: Subscription;

  @Input() eventReloadTable: Observable<void>;

  constructor(
    private cd: ChangeDetectorRef,
    private traceabilityservices: DesignationsService,
    private vi: ValidateInternetService,
  ) { }

  ngOnInit(): void {

    this.eventsSubscriptionReloadTable = this.eventReloadTable.subscribe(() => {
      this.updatatraceability();
    });

    this.updatatraceability();
    this.cd.detectChanges();

    this.getDataRequest();
    this.paginationSubscription = this.pag.getItems().subscribe(data => {
      console.log('tabla trazabilidad', data)
      this.itemsTable = [];
      this.itemsTable = [...data] ? [...data] : [];
    });
  }

  private updatatraceability(): void {
    if (this.vi.validateConnection()) {
      this.dataTracebility = this.traceabilityservices.getdatatraceability().subscribe({
        next: (value) => {
          this.datatable = value.data;
          let solicitudes = this.datatable.map((item: any) => {
            let solicitudesTransformed = item.solicitude.map(e => {
              delete item.solicitude;
              return {
                ...e,
                ...item
              }
            })
            return solicitudesTransformed;
          }) as any;
          this.pag.setTotalItems(solicitudes.flat());
        },
        error: (err) => {
          console.error('Error al obtener los datos de trazabilidad:', err);
        }
      });
    }
  }

  displayState(state: boolean): string {
    return state ? 'Activo' : 'Inactivo';
  }

  ngOnDestroy(): void {
    if (this.dataTracebility) {
      this.dataTracebility.unsubscribe();
    }
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
    this.eventsSubscriptionReloadTable.unsubscribe();
  }

  getDataRequest(): void {
    this.pag.setTotalItems(this.datatable);
  }

  refreshTaskReceived(): void {
    this.updatatraceability();
    this.getDataRequest();
  }

  isNoEmptyObject(obj: any): boolean {
    return obj && Object.keys(obj).length !== 0;
  }


}

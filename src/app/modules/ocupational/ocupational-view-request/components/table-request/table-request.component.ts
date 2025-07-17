import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { RequestData } from '../../model/response-filter';
import { ShareInformationFiltersService } from '../../services/shareInformationfilters/share-information-filters.service';
import { ViewRequestService } from '../../services/view-request.service';

import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ResponsePaginator } from '../paginator/model/paginator.model';
import { PaginatorService } from '../paginator/services/paginator.service';





@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.css']
})
export class TableRequestComponent implements OnInit, OnDestroy {
  private viewRequestServices = inject(ViewRequestService);
  private shareInformationFiltersService = inject(ShareInformationFiltersService);
  private validateIt = inject(ValidateInternetService);
  private pag = inject(PaginationServiceService);
  private requestDataSub: Subscription;
  itemsPerDefault: number = 5;
  dataPagination: ResponsePaginator;
  itemsTable: RequestData[] = [];
  @ViewChild('dataTable', { static: false }) dataTable: ElementRef;
  headers = [
    { header: '#Radicado', key: 'filed', type: 'link' },
    { header: 'Solicitante', key: 'applicant.applicant', type: 'applicant' },
    { header: 'Fecha de solicitud', key: 'date', type: 'date' },
    { header: 'Proceso', key: 'process' },
    { header: 'Tipo  documento', key: 'documentary_type' },
    { header: 'Tipo de solicitud', key: 'request_type' },
    { header: 'Estado', key: 'estado', type: 'state' },
  ];

  constructor(private paginator: PaginatorService) {
    this.validateIt.connect();
  }

  ngOnInit(): void {

    this.validateIt.checkConnection();
    this.validateIt.validateConnection()

    this.getDataRequest();
    this.pag.getItems().subscribe(data => {
      this.itemsTable = data ? data : [];
    })


  }

  getDataRequest(): void {
    this.requestDataSub = this.viewRequestServices.getSearchRequests()
      .subscribe({
        next: (res) => {
          this.pag.setTotalItems(res.data)
        },
        error: (err) => {
          console.log('error view request', err);
        }
      })
  }
  /**
   * @description Metodo para obtener todos los elementos presentados en la tabla.
   */
  getDataTable(): RequestData[] {
    return this.shareInformationFiltersService.getDataTableItems();
  }

  /**
   * @description Metodo para obtener el largo del array de los elementos que se presentan en la tabla.
   */
  getDataTableLength(): number {
    return this.shareInformationFiltersService.getDataTableItems().length;
  }


  /**
  * @description Metodo para formatear la data this.getDataTable() para luego exportar a excel.
  */
  downloadFileExcel(): void {
    const dataTable = [];
    const data = this.itemsTable;
    console.log('DATA', data)

    for (let i = 0; i < this.itemsTable.length; i++) {
      const item = {
        "# Radicado": data[i].filed,
        "Solicitante": data[i].applicant.applicant,
        "Fecha de solicitud": this.formatDate(data[i].date),
        "Proceso": data[i].process,
        "Tipo documento": data[i].documentary_type,
        "Tipo de solicitud": data[i].request_type,
        "Estado": data[i].state
      };
      dataTable.push(item);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const fileName = `Solicitudes_${formattedDate}.xlsx`;

    // Escribir el archivo con el nombre que incluye la fecha actual
    XLSX.writeFile(wb, fileName);
  }


  /**
  * @description Metodo para formatear la fecha en YYYY-MM-DD HH:MM:SS
  * @param dateString
  */
  formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  refreshTaskReceived() {
    this.getDataRequest();
  }

  ngOnDestroy(): void {
    this.requestDataSub?.unsubscribe();

  }

}

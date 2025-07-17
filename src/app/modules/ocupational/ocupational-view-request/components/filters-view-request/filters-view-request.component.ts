import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Subscription } from 'rxjs';

import { PaginationServiceService } from '@app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { DataForm, Process, RequestType, State } from '../../model/automatic-data';
import { RequestParams } from '../../model/response-filter';
import { ShareInformationFiltersService } from '../../services/shareInformationfilters/share-information-filters.service';
import { ViewRequestService } from '../../services/view-request.service';
import { PaginatorService } from '../paginator/services/paginator.service';
@Component({
  selector: 'app-filters-view-request',
  templateUrl: './filters-view-request.component.html',
  styleUrls: ['./filters-view-request.component.css']
})

export class FiltersViewRequestComponent implements OnInit, OnDestroy {

  private viewRequestServices = inject(ViewRequestService);
  private shareInformationFiltersService = inject(ShareInformationFiltersService);
  private paginatorServices = inject(PaginatorService)
  private viewRequestSub!: Subscription;
  private validateIt = inject(ValidateInternetService);
  private pag = inject(PaginationServiceService);
  private pagesSub!: Subscription;
  private searchSub!: Subscription;
  private searchDat: any;

  constructor(private toast: ToastService) {
    this.validateIt.connect()
  }

  result = false;
  selectsData: DataForm = {
    documentary_type: [],
    process: [],
    request_type: [],
    state: [],

  };

  process: Process[] = [];
  state: State[] = [];
  requestType: RequestType[] = [];
  filterForm = new FormGroup({
    area: new FormControl(''),
    end_date: new FormControl(''),
    filed: new FormControl(''),
    process: new FormControl(''),
    request_type: new FormControl(''),
    start_date: new FormControl(''),
    state: new FormControl(''),

  })


  ngOnInit(): void {
    this.loadDataFilter();
    this.validateIt.checkConnection();
  }



  loadDataFilter(): void {
    this.viewRequestSub = this.viewRequestServices.getAutomaticDataFilter().subscribe(item => {
      this.selectsData = item.data;
      this.process = item.data.process.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.state = item.data.state.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.requestType = item.data.request_type.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })

  }


  onClear(): void {
    this.filterForm.reset({
      area: '',
      end_date: '',
      filed: '',
      process: '',
      request_type: '',
      start_date: '',
      state: '',


    });


    this.shareInformationFiltersService.setDataFilter(this.filterForm.value as RequestParams);
  }

  transformData(date: string): string {

    if (date !== '') {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const day = ('0' + newDate.getDate()).slice(-2);


      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    }
    return '';
  }


  parseDate(startDate: string, endDate: string) {
    this.filterForm.get('start_date').setValue(startDate);
    this.filterForm.get('end_date').setValue(endDate);

  }


  onSubmit(): void {
    const valueForm = this.filterForm.value as RequestParams;
    const start_date = this.transformData(valueForm.start_date);
    const end_date = this.transformData(valueForm.end_date);

    this.parseDate(start_date, end_date);

    if (this.validateIt.validateConnection()) {

      this.searchSub = this.viewRequestServices.getSearchRequests(this.filterForm.value).subscribe({
        next: (item) => {
          this.pag.setTotalItems(item.data);

        },
        error: () => {
          this.checkDates(start_date, end_date);
        }
      })
    }
  }

  onHidden(): void {
    this.result = false;
  }

  checkDates(startDate: string, endDate: string): void {

    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);


    if (start.getDate() + 1 === currentDate.getDate() &&
      start.getFullYear() === currentDate.getFullYear() &&
      start.getMonth() === currentDate.getMonth()) {
      this.toast.open({
        title: '067',
        description: 'El rango de fechas no es válido.'
      });
    }


    if (end.getFullYear() >= currentDate.getFullYear()) {
      if (end.getDate() >= currentDate.getDate() && end.getMonth() >= currentDate.getMonth()) {
        this.toast.open({
          title: '067',
          description: 'El rango de fechas no es válido.'
        });
      }

    }



    if (start >= end) {
      this.toast.open({
        title: '067',
        description: 'El rango de fechas no es válido.'
      });
    }


    if (end < start) {
      this.toast.open({
        title: '067',
        description: 'El rango de fechas no es válido.'
      });
    }
  }




  getLength(): number {
    return this.shareInformationFiltersService.getDataTableItems().length;
  }

  ngOnDestroy(): void {
    this.viewRequestSub.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}

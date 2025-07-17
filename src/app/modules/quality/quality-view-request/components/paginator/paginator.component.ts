import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { Subscription } from 'rxjs';
import { ShareInformationFiltersService } from '../../services/shareInformationfilters/share-information-filters.service';
import { ResponsePaginator } from './model/paginator.model';
import { PaginatorService } from './services/paginator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})

export class PaginatorComponent implements OnInit, OnDestroy {

  private urlBase = environment.apiUrl
  currentPages: number;
  @Input() rowPages: string[] = [];
  dataPagination: ResponsePaginator;
  @Output() upload = new EventEmitter<void>();
  totalPages: number[][] = [];
  pages: number[] = [];
  initPerPages = '5'

  private shareInformationFiltersService = inject(ShareInformationFiltersService);
  private validateInter = inject(ValidateInternetService);
  private dataPaginationSub: Subscription;

  constructor(private pagination: PaginatorService) {
    this.validateInter.connect();
  }

  ngOnInit(): void {
    this.validateInter.checkConnection();
    this.pagination.observerPages().subscribe(item => {
      if (item && this.validateInter.validateConnection()) {
        this.dataPagination = item;
        this.generatePages();
        this.currentPages = item.current_page;
      }
    })
  }




  generatePages(): void {

    const dataPages = this.dataPagination;

    const totalItems = dataPages.total;
    const itemsPerPage = dataPages.per_page;
    const maxPagesToShow = 6;


    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [];
    let startPage = 1;
    if (totalPages > maxPagesToShow) {
      startPage = Math.max(1, dataPages.current_page - Math.floor(maxPagesToShow / 2));
    }


    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);


    if (endPage === totalPages && endPage - maxPagesToShow >= 1) {
      startPage = endPage - maxPagesToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    this.pages = [...pages];

  }


  changePages(data: any): void {
    const search = this.shareInformationFiltersService.getDataFilter();
    this.dataPaginationSub = this.pagination.getData(`${this.urlBase}api/sgc/solicitud/search`, { ...search, data })
      .subscribe(item => {
        this.pagination.setDataPagination(item.meta);
        this.shareInformationFiltersService.setDataTableItems(item.data);
      })
  }

  setCurrenRowPages(item: number): void {

    const search = this.shareInformationFiltersService.getDataFilter();
    const newValue = { ...search, 'perPage': String(item) }
    this.shareInformationFiltersService.setDataFilter(newValue);
    if (this.validateInter.validateConnection()) {
      this.dataPaginationSub = this.pagination.getData(`${this.urlBase}api/sgc/solicitud/search`, this.shareInformationFiltersService.getDataFilter())
        .subscribe(item => {
          this.pagination.setDataPagination(item.meta);
          this.shareInformationFiltersService.setDataTableItems(item.data);
        })
    }
  }


  takeInformation(params: any): void {

    this.shareInformationFiltersService.setDataFilter(params);

    const search = this.shareInformationFiltersService.getDataFilter()

    this.pagination.getData(this.dataPagination.path, search)
      .subscribe(item => {
        this.dataPagination = item.meta;
        this.shareInformationFiltersService.setDataTableItems(item.data);
      })
  }


  setCurrentPages(item: number): void {
    const search = this.shareInformationFiltersService.getDataFilter();
    if (this.validateInter.validateConnection()) {
      this.dataPaginationSub = this.pagination.getData(`${this.urlBase}api/sgc/solicitud/search`, { ...search, 'page': item })
        .subscribe(item => {
          this.pagination.setDataPagination(item.meta);
          this.shareInformationFiltersService.setDataTableItems(item.data);
        })
    }

  }


  left(): void {
    const previous_page_url = this.dataPagination.previous_page_url;
    if (previous_page_url) {
      const search = this.shareInformationFiltersService.getDataFilter();
      if (this.validateInter.validateConnection()) {
        this.dataPaginationSub = this.pagination.changePages(previous_page_url, search).subscribe(item => {
          this.pagination.setDataPagination(item.meta);
          this.shareInformationFiltersService.setDataTableItems(item.data);
        });
      }
    }
  }

  right() {

    const next_page_url = this.dataPagination.next_page_url;
    if (next_page_url) {
      const search = this.shareInformationFiltersService.getDataFilter();
      if (this.validateInter.validateConnection()) {
        this.dataPaginationSub = this.pagination.changePages(next_page_url, search).subscribe(item => {
          this.pagination.setDataPagination(item.meta);
          this.shareInformationFiltersService.setDataTableItems(item.data);
        });
      }
    }

  }


  onUpdate(): void {
    this.upload.emit();
  }

  ngOnDestroy(): void {
    this.dataPaginationSub?.unsubscribe();

  }
}


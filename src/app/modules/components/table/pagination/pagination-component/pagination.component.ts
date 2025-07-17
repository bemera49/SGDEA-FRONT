import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { debounceTime } from 'rxjs/operators';

import { ValidateInternetService } from '../../../../../services/validate-internet/validate-internet.service';
import { PaginationServiceService } from '../pagination-service/pagination-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})

export class PaginationComponent implements OnInit, OnDestroy {

  public pagination$ = inject(PaginationServiceService);
  public serviceInternet = inject(ValidateInternetService);
  public items: any[] = [];
  public pages: any[] = [];
  public amountOfGroups: number;
  public currentPage: number = 0;
  @Output() rechargeTable = new EventEmitter<void>();
  @Input() itemsDefault: number;

  visiblePages: number[] = [];

  public formPaginator = new FormGroup({
    itemsPerPage: new FormControl()
  })

  constructor() {
    this.serviceInternet.connect();
  }

  ngOnInit(): void {
    this.paginatorItems();
    this.serviceInternet.checkConnection();
  }

  rechargeTaskReceived() {
    if (this.serviceInternet.validateConnection()) {
      this.rechargeTable.emit();
      this.paginatorItems();
      this.formPaginator.get('itemsPerPage').patchValue(5);
    }
  }

  paginatorItems() {
    this.formPaginator.get('itemsPerPage').patchValue(this.itemsDefault)
    if (this.serviceInternet.validateConnection()) {
      this.pagination$.totalItems.subscribe(response => {
        this.items = response;
        this.ItemsDefault(this.itemsDefault);
        this.formPaginator.get('itemsPerPage')?.valueChanges.pipe(debounceTime(500)).subscribe(newValue => {
          const itemsPerPage = newValue;
          this.currentPage = 0;
          if (this.serviceInternet.validateConnection()) {
            if (!isNaN(itemsPerPage) && itemsPerPage > 0) {
              this.amountOfGroups = Math.ceil(this.items.length / itemsPerPage);
              const groups = [];
              for (let i = 0; i < this.amountOfGroups; i++) {
                groups.push(this.items.slice(i * itemsPerPage, (i + 1) * itemsPerPage));
              }
              this.pages = groups;
              this.updateVisiblePages();
              this.pagination$.setItemsPaginados(this.pages[this.currentPage]);
            }
          }
        });
      });
    }
  }

  updateVisiblePages() {
    const totalVisible = 5;
    const startPage = Math.floor(this.currentPage / totalVisible) * totalVisible;
    const endPage = Math.min(startPage + totalVisible, this.amountOfGroups);
    this.visiblePages = Array.from({ length: endPage - startPage }, (_, i) => i + startPage + 1);
  }

  ItemsDefault(itemsPerPage: number) {
    this.amountOfGroups = Math.ceil(this.items.length / itemsPerPage);
    const groups = [];
    for (let i = 0; i < this.amountOfGroups; i++) {
      groups.push(this.items.slice(i * itemsPerPage, (i + 1) * itemsPerPage));
    }
    this.currentPage = 0;
    this.pages = groups;
    this.updateVisiblePages();
    this.pagination$.setItemsPaginados(this.pages[this.currentPage]);
  }

  previousPage() {
    if (this.serviceInternet.validateConnection()) {
      if (this.currentPage <= 0) {
        return;
      }
      this.currentPage--;
      this.pagination$.setItemsPaginados(this.pages[this.currentPage]);
      this.updateVisiblePages();
    }
  }

  nextPage() {
    if (this.serviceInternet.validateConnection()) {
      const totalPages = this.pages.length;
      if (this.currentPage >= totalPages - 1) {
        return;
      }
      this.currentPage++;
      this.pagination$.setItemsPaginados(this.pages[this.currentPage]);
      this.updateVisiblePages();
    }
  }

  goToPage(page: number) {
    if (this.serviceInternet.validateConnection()) {
      this.currentPage = page - 1;
      this.pagination$.setItemsPaginados(this.pages[this.currentPage]);
      this.updateVisiblePages();
    }
  }

  ngOnDestroy(): void {
    this.pagination$.setTotalItems([]);
  }

}
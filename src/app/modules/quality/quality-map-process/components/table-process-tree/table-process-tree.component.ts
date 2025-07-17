import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginationServiceService } from '@app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { tablenode } from '@app/modules/quality/quality-process-map/quality-process-detail/interfaces/Processnode';

@Component({
  selector: 'app-table-process-tree',
  templateUrl: './table-process-tree.component.html',
  styleUrls: ['./table-process-tree.component.css']
})
export class TableProcessTreeComponent implements OnChanges, OnInit {
  @Input() tableType: string;
  @Input() data: tablenode[] = [];
  dataPagination: tablenode[];
  itemsPerDefault= 5;

  fullscreen: string = 'fullscreen';
  private pgs$ = inject(PaginationServiceService);

  ngOnChanges(changes: SimpleChanges): void {
    console.log('this.data', this.data)
    this.pgs$.setTotalItems(this.data);
  }

  ngOnInit(): void {
    this.pgs$.getItems().subscribe(res => {
      this.dataPagination = res
    })
  }

  getStep(id: number): void {

  }

  getStepDocuments(id: number):void{

  }

  refreshTaskReceived():void{

  }
}

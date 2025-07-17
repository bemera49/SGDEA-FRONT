import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dataTable } from './model/table';

@Component({
  selector: 'app-table-exp',
  templateUrl: './table-exp.component.html',
  styleUrls: ['./table-exp.component.css']
})

export class TableExpComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = ['Dependencia', 'Serie', 'SubSerie', 'Expedientes', 'Fecha inicial', 'Fecha final', 'Archivo', 'Estado', 'Seleccion'];
  /* ,'Seleccion' */
  @Input() data: dataTable[] = [];
  @Output() onExp = new EventEmitter<unknown>();

  dataSource = new MatTableDataSource<dataTable>();


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.data;
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  onChangeExp(checked: boolean, expedienteId: any): void {
    if (checked) {
      console.log('data', expedienteId);
      this.onExp.emit(expedienteId);
    } else {
      this.onExp.emit(null);
    }
  }


}

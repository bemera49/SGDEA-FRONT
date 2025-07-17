import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { ParamsDoc } from '../../model/data-doc-params';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { ParamsService } from '../../services/params/params.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ModalDependencyDocComponent } from '../modal-dependency-doc/modal-dependency-doc.component';
import { DependenciaData } from './model/dependency';
import { DependencyService } from './services/dependency/dependency.service';


@Component({
  selector: 'app-table-dependency-doc',
  templateUrl: './table-dependency-doc.component.html',
  styleUrls: ['./table-dependency-doc.component.css']
})
export class TableDependencyDocComponent implements OnInit, OnDestroy {

  private dialog = inject(MatDialog);
  private dps$ = inject(DataDocParamsService);
  private paramsId$ = inject(ParamsService)
  private dpc = inject(DependencyService);
  private dataParams: ParamsDoc = null;
  private idGdExpedientesDocumentosDependencias: number = 0;
  private toast = inject(ToastService);
  private depSub$: Subscription = null;

  displayedColumns: string[] = ['Dependencia', 'Permisos'];

  dataSource: DependenciaData[] = [];

  ngOnInit(): void {
    this.dps$.getDataDocParams().subscribe(data => {
      this.dataParams = {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    })

    this.getDependencia();
  }

  getDependencia(): void {
    this.depSub$ = this.dpc.getDependency(this.dataParams).subscribe({
      next: (res) => {
        this.dataSource = res.data;
      }
    })
  }

  onAdd(): void {
    const refDialog = this.dialog.open(ModalDependencyDocComponent);
    refDialog.afterClosed().subscribe(res => {
      if (res) {
        this.getDependencia();
      }
    })
  }



  onRowClick(row: any) {

    this.idGdExpedientesDocumentosDependencias = row.idGdExpedientesDocumentosDependencias
    // Agrega o quita la clase .highlight-clicked según el estado actual
    row.highlighted = !row.highlighted;
    this.dataSource.forEach((otherRow: any) => {
      if (otherRow !== row) {
        otherRow.highlighted = false;
      }
    });
  }

  onRowMouseEnter(row: any) {
    // Agrega la clase .highlight-hover al pasar el ratón sobre la fila
    row.hovered = true;
  }

  onRowMouseLeave(row: any) {
    // Quita la clase .highlight-hover cuando el ratón sale de la fila
    row.hovered = false;
  }



  deleteDependencia(): void {
    this.dpc.deleteDependency(this.idGdExpedientesDocumentosDependencias).subscribe({
      next: () => {
        this.toast.open({
          title: 'Dependencia eliminada'
        })
        this.getDependencia();
      },
      error: () => {
        this.toast.open({
          title: 'Error al eliminar la dependencia eliminada'
        })
      }
    })

  }

  onDelete(): void {
    if (this.idGdExpedientesDocumentosDependencias !== 0) {
      const dialogRef = this.dialog.open(ModalDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteDependencia()

          this.idGdExpedientesDocumentosDependencias = 0;
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.depSub$?.unsubscribe();
  }

}

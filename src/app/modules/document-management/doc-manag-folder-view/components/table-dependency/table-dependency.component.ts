import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { ParamsService } from '../../services/params/params.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ModalDependencyComponent } from '../modal-dependency/modal-dependency.component';
import { TableDependencias } from './model/table-dependencias';
import { ToastService } from '@app/services/toast/toast.service';
import { ChangeTrazaService } from '../../services/change-traza/change-traza.service';

@Component({
  selector: 'app-table-dependency',
  templateUrl: './table-dependency.component.html',
  styleUrls: ['./table-dependency.component.css']
})
export class TableDependencyComponent implements OnInit {
  private dialog = inject(MatDialog);
  private restService = inject(RestService);
  private ac = inject(AuthHeaderService);
  private globalAppService = inject(GlobalAppService);
  private idDependencia: number = 0;
  private ps = inject(ParamsService);
  private toast = inject(ToastService);
  private cts$ = inject(ChangeTrazaService);

  displayedColumns: string[] = ['Dependencia', 'Permisos'];

  dataSource: TableDependencias[] = [];


  ngOnInit(): void {
    this.getDependencia();
  }

  onAdd(): void {
    const refDialog = this.dialog.open(ModalDependencyComponent);
    refDialog.afterClosed().subscribe(res => {
      if (res) {
        this.getDependencia();
      }
    })
  }

  getDependencia(): void {
    const params = {
      id: this.ps.getValue()
    }

    this.restService.restGetParams('gestionDocumental/expedientes/get-dependencias-permisos', params, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            this.dataSource = data.data;

          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }

  onRowClick(row: any) {
    this.idDependencia = row.idGdExpedientesDependencias
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
    const body = {
      idGdExpedientesDependencias: this.idDependencia
    }

    this.restService.restPost('gestionDocumental/expedientes/delete-dependencia-expediente', body, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {
          this.toast.open({
            title: 'Dependencia eliminada'
          })
          this.cts$.setDepende(true);
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });

  }

  onDelete(): void {
    if (this.idDependencia !== 0) {
      const dialogRef = this.dialog.open(ModalDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteDependencia();
          this.getDependencia();
          this.idDependencia = 0;
        }
      });
    }
  }

}

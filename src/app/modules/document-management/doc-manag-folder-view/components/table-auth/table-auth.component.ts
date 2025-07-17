import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ChangeTrazaService } from '../../services/change-traza/change-traza.service';
import { ParamsService } from '../../services/params/params.service';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { TableUsuarios } from './model/usuarios';

const ELEMENT = [
  {
    dep: 'hola',
    per: 'hola'
  }
];

@Component({
  selector: 'app-table-auth',
  templateUrl: './table-auth.component.html',
  styleUrls: ['./table-auth.component.css']
})
export class TableAuthComponent implements OnInit {

  private dialog = inject(MatDialog);
  private restService = inject(RestService);
  private ac = inject(AuthHeaderService);
  private globalAppService = inject(GlobalAppService);
  private ps = inject(ParamsService);
  private toast = inject(ToastService);
  private cts$ = inject(ChangeTrazaService);

  displayedColumns: string[] = ['Usuario', 'Permisos'];
  dataSource: TableUsuarios[] = [];
  idUsuario: number = 0;

  ngOnInit(): void {

    this.getUsuariosConPermisos();
  }

  onAdd(): void {
    const refDialog = this.dialog.open(ModalAuthComponent);
    refDialog.afterClosed().subscribe(res => {
      if (res) {
        this.getUsuariosConPermisos();

      }
    })
  }



  getUsuariosConPermisos(): void {
    const params = {
      id: this.ps.getValue()
    }

    this.restService.restGetParams('gestionDocumental/expedientes/get-usuarios-permisos', params, this.ac.getToken()).subscribe(
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
    this.idUsuario = row.idGdExpedientesUsuarios
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

  deleteUsuarios(): void {

    const body = {
      idGdExpedientesUsuarios: this.idUsuario
    }

    this.restService.restPost('gestionDocumental/expedientes/delete-usuario-expediente', body, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {
          if (res) {

            this.toast.open({
              title: 'Usuario eliminado'
            })
            this.cts$.setUsuario(true);
          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }

  onDelete(): void {

    if (this.idUsuario !== 0) {
      const dialogRef = this.dialog.open(ModalDeleteComponent);

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.deleteUsuarios();
          this.getUsuariosConPermisos();
          this.idUsuario = 0;
        }
      })
    }
  }




}

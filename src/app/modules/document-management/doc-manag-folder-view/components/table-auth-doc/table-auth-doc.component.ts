import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParamsDoc } from '../../model/data-doc-params';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { ModalAuthDocComponent } from '../modal-auth-doc/modal-auth-doc.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { UsuariosDoc } from './model/auth-doc';
import { AuthDocService } from './services/auth-doc.service';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-table-auth-doc',
  templateUrl: './table-auth-doc.component.html',
  styleUrls: ['./table-auth-doc.component.css']
})
export class TableAuthDocComponent implements OnInit {

  private dialog = inject(MatDialog);
  private ads = inject(AuthDocService);
  displayedColumns: string[] = ['Dependencia', 'Permisos'];
  dataSource: UsuariosDoc[] = [];
  idUsuario: number = 0;
  private idGdExpedientesDocumentosUsuarios: number = 0;
  private dps$ = inject(DataDocParamsService);
  private dataParams: ParamsDoc = null;
  private toast = inject(ToastService)


  ngOnInit(): void {
    this.dps$.getDataDocParams().subscribe(data => {
      this.dataParams = {
        idDocumentoIncluidoPivot: data.idDocumentoIncluidoPivot
      }
    })

    this.getUsuarios();
  }

  getUsuarios(): void {
    this.ads.getUsuarios(this.dataParams).subscribe({
      next: (res) => {
        console.log('res table auto', res);
        this.dataSource = res.data
      },
      error: () => {

      }
    })
  }

  onAdd(): void {
    const refDialog = this.dialog.open(ModalAuthDocComponent);
    refDialog.afterClosed().subscribe(res => {
      if (res) {

        this.getUsuarios();
      }
    })
  }



  onRowClick(row: any) {

      console.log('row auth',row)
    this.idGdExpedientesDocumentosUsuarios = row.idGdExpedientesDocumentosUsuarios
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

  deleteUsuariosPermisos(): void {
    this.ads.deletePermisosUsuarios(this.idGdExpedientesDocumentosUsuarios).subscribe({
      next: () => {
        this.getUsuarios();
        this.toast.open({
          title: 'Usuario eliminado'
        })
      },
      error: () => {

      }
    })
  }



  onDelete(): void {
    if (this.idGdExpedientesDocumentosUsuarios !== 0) {
      const dialogRef = this.dialog.open(ModalDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteUsuariosPermisos();
          this.idGdExpedientesDocumentosUsuarios = 0;
        }
      });
    }
  }
}

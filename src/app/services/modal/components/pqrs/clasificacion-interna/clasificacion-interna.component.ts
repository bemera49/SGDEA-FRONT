/**
 * HU 006 - Realizar Clasificación interna de una PQRS o solicitud - TIPIFICAR
 */

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClasificacionInternaService } from './clasificacion-interna.service';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { ModalService } from '@app/services/modal/modal.service';
import { catchError } from 'rxjs';
import { ToastService } from '@app/services/toast/toast.service';
import { TableService } from '@app/modules/components/table/service/table.service';

@Component({
  selector: 'app-clasificacion-interna',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './clasificacion-interna.component.html',
  styleUrls: ['./clasificacion-interna.component.css']
})
export class ClasificacionInternaComponent implements OnInit {

  clasificacionesInternas = [];
  selectedClasificacionInternaId = null;
  @Input() public user;

  modalOpen = false

  constructor(
    public dialogRef: MatDialogRef<ClasificacionInternaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clasificacionInternaService: ClasificacionInternaService,
    private pqrsService: PqrsViewService,
    private modalService: ModalService,
    private toastService: ToastService,
    private TableService: TableService,
  ) { }

  dataModal = this.data

  ngOnInit(): void {
    this.clasificacionInternaService.getClasificacionesInternas().subscribe((res) => {
      this.clasificacionesInternas = res;
    })
  }

  onSelectClasificacionInterna() {
  }


  onConfirmClose() {
    this.modalOpen = true
    this.modalService.openAction("", "¿Está seguro de cancelar la tipificación en curso?", () => {
      this.dialogRef.close()
      this.dialogRef.afterClosed().subscribe(() => {
        this.modalOpen = false
        this.toastService.open({ title: 'Cancelación exitosa', duration: 2000, success: true })
      })
     })
  }

  onConfirm() {
    this.modalOpen = true
    this.modalService.openAction("", "¿Está seguro de la acción a realizar?", () => { this.submit() }).afterClosed().subscribe(() => {
      this.modalOpen = false
    })
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let idRadicacion = this.dataModal.data.idRadicado;

    this.clasificacionInternaService.updateRadicacionClasificacionesInternaMasivo(idRadicacion, this.selectedClasificacionInternaId , 'No').pipe(catchError(error => { this.toastService.open({
      description: 'Error en la peticion',
      success: false,
      duration: 3000,
      title: 'Peticion fallida'
    })
    console.error(error)
    throw new Error})).subscribe(res => {
      this.dialogRef.close()
      this.dataModal.void()
      this.TableService.emitEvent()
      this.pqrsService.requestReload()
    })

  }
}

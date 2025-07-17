/**
 * HU 010 - Reclasificación o retipificacion interna de la PQRS o solicitud
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClasificacionInternaService } from '../clasificacion-interna/clasificacion-interna.service';
import { ToastService } from '../../../../toast/toast.service';
import { TableService } from '@app/modules/components/table/service/table.service';
import { PqrsViewService } from '@app/services/pqrs/pqrs-view.service';
import { ModalService } from '@app/services/modal/modal.service';
import { Router } from '@angular/router';
import { QrviewMainComponent } from '../../../../../modules/qrview/qrview-main/qrview-main.component';
@Component({
  selector: 'app-retipificacion-pqrs',
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
  templateUrl: './retipificacion-pqrs.component.html',
  styleUrls: ['./retipificacion-pqrs.component.css']
})
export class RetipificacionPqrsComponent implements OnInit {
  public internalClassifications:any[] = [];
  public modalOpen:boolean = false;
  inputSelected: boolean = false;
  form: FormGroup = this.fb.group({
    internalClassification: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Acepta solo números
    sapContact: ['', Validators.required], // Acepta cualquier string
  });

  ngOnInit(): void {
    this.getInternalClassification()
  }

  constructor(
    public dialogRef: MatDialogRef<RetipificacionPqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cInternaSvc:ClasificacionInternaService,
    private toastService:ToastService,
    private TableService: TableService,
    private pqrsService: PqrsViewService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private router:Router
  ){}

  dataModal = this.data

  getInternalClassification(){
    this.cInternaSvc.getClasificacionesInternas()
          .subscribe({
            error:(err:any) => {
              console.log(err)
            },
            next:(resp:any) => {
              this.internalClassifications = resp;
            }
          });
  };

  onConfirmClose() {
     this.modalOpen = true
     this.modalService.openAction("", "¿Está seguro de cancelar la retipificación en curso??", () => {
       this.dialogRef.close()
       this.dialogRef.afterClosed().subscribe(() => { this.toastService.open({ title: 'Cancelación exitosa', success: true, duration: 2000 }) })
     }).afterClosed().subscribe(() => {
       this.modalOpen = false
     })
  };


  onConfirm() {
    if (this.form.valid) {
      this.modalOpen = true
      this.modalService.openAction("", "¿Confirma la clasificación interna otorgada?", () => { this.submit() }).afterClosed().subscribe(() => {
        this.modalOpen = false
      })
    }
  };

  submit() {
    let idRadicacion = this.dataModal.data.idRadicado || this.dataModal.data;
    this.cInternaSvc.updateRadicacionClasificacionesInternaMasivo(idRadicacion, this.form.get('internalClassification').value,  this.form.get('sapContact').value )
          .subscribe({
            error:(err:any) => {
              this.toastService.open({
                description: 'Error en la peticion',
                success: false,
                duration: 3000,
                title: 'Peticion fallida'
              })
            },
            next:(resp:any) => {
              this.dialogRef.close();
              this.dataModal.void();
              this.TableService.emitEvent();
              this.pqrsService.requestReload();
              this.router.navigateByUrl('/pqrs/log-pqrs-index')
            }
          });
  };


}

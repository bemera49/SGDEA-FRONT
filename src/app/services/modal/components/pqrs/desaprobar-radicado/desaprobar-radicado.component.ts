import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '@app/services/toast/toast.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDesaprobarRadicadoComponent } from '../confirm-desaprobar-radicado/confirm-desaprobar-radicado.component';


@Component({
  selector: 'app-desaprobar-radicado',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './desaprobar-radicado.component.html',
  styleUrls: ['./desaprobar-radicado.component.css']
})
export class DesaprobarRadicadoComponent implements OnInit {

  desaprobarForm = new FormGroup({
    observaciones: new FormControl('', [Validators.required])
  })


  constructor(
    public dialogRef: MatDialogRef<DesaprobarRadicadoComponent>,
    private toast: ToastService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

  desaprobar(){
    if(this.desaprobarForm.valid){
      this.dialog.open(ConfirmDesaprobarRadicadoComponent, {
        data: {
          observaciones : this.desaprobarForm.value.observaciones,
          radicado_id: this.data.radicado_id
        }
      });
      this.dialogRef.close()
    }else{
      this.toast.open({
        title: '',
        description: `Por favor verifique, datos obligatorios incompletos`,
        success: false,
        duration: 5000,
      })
    }
  }

  onCloseModal(){
    this.dialogRef.close();
    this.data['isClosedWithCancelButton'] = true;
    this.toast.open({
      title: '',
      description: `Cancelación exitosa`,
      success: true,
      duration: 3000,
    })
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalACComponent } from '@app/modules/components/modal-ac/modal-ac.component';
import { ToastService } from '@app/services/toast/toast.service';
@Component({
  selector: 'app-quality-modify',
  templateUrl: './quality-modify.component.html',
  styleUrls: ['./quality-modify.component.css']
})
export class QualityModifyComponent {

  breadcrumbOn = [
    { name: "Calidad", route: "/quality" },
  ];

  breadcrumbRouteActive = "Modificar";

  constructor(private dialog: MatDialog, private toast: ToastService) { }

  SolicitudFormGroup = new FormGroup({
    radicado: new FormControl(''),
    solicitante: new FormControl(''),
    tipoSolicitud: new FormControl('', Validators.required),
    fechaSolicitud: new FormControl(''),
    proceso: new FormControl(''),
    estadoSolicitud: new FormControl(''),
    documentoModificar: new FormControl(''),
    tipoDocumental: new FormControl(''),
    cargo: new FormControl(''),
    privacidad: new FormControl('', Validators.required),
    centroCostos: new FormControl(''),
    gerencia: new FormControl(''),
    direccionDivisionOficina: new FormControl(''),
    justificacion: new FormControl('', Validators.required),
    solicitudAplica: new FormControl('', Validators.required),
    documentoPropuesto: new FormControl('', Validators.required),
    diagramaUrl: new FormControl('')
  })

  nameFile: string;


  openToastSuccess(): void {
    this.toast.open({
      description: '001.Registro exitoso'
    })
  }

  openToastRequired(): void {
    this.toast.open({
      description: '016.Por favor verifique datos obligatorios incompletos'
    })
  }

  openModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const modalRef = this.dialog.open(ModalACComponent, {
      width: '515px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        img: 'assets/img/questionIcon.svg',
        paragraph: '004. ¿Estas seguro de la acción a realizar?'
      }
    });

    modalRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('data', this.SolicitudFormGroup.value);
        this.openToastSuccess();
      }
    })
  }

  uploadFile(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files[0];

    if (archivo) {
      this.nameFile = archivo.name;
      this.SolicitudFormGroup.get('documentoPropuesto').setValue(this.nameFile);
    }
  }



  validateFields(): void {
    Object.keys(this.SolicitudFormGroup.controls).forEach(key => {
      const control = this.SolicitudFormGroup.get(key);
      if (control.status === 'VALID' && !control.touched) {
        this.openToastRequired();
      }
    })
  }

  onSubmit(): void {

    if (this.SolicitudFormGroup.valid) {
      this.openModal('100ms', '100ms');
    } else {
      this.validateFields();
    }


  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JuridicalService } from '@app/services/juridical/juridical.service';
import { SweetAlertService } from '@app/services/sweet-alert.service';
import { ToastService } from '@app/services/toast/toast.service';
import Swal from 'sweetalert2';
import { Semaforo } from 'src/app/modules/juridica/juridica-view-request/components/table-request/request-element';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-assignments',
  templateUrl: './professional-assignments.component.html',
  styleUrls: ['./professional-assignments.component.css']
})
export class ProfessionalAssignmentsComponent implements OnInit {
  colorSemaforo = Semaforo;
  constructor(
    public dialogRef: MatDialogRef<ProfessionalAssignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(ToastService) private toast: ToastService,
    private juridicalService: JuridicalService,
    public sweetAlertService: SweetAlertService,
    private router: Router
  ) { }

  options: any;
  ngOnInit(): void {
    this.options = this.data.options;
    console.log(this.data);
  }

  assignProfessional( checkbox: any, professional: any){
    if(checkbox && this.options.find((element: any) => element.id === professional.id)){
      this.options = this.options.map((element: any) => {
        if(element.id === professional.id){
          element.checked = checkbox;
        }
        return element;
      });
    } else {
      this.options = this.options.map((element: any) => {
        if(element.id === professional.id){
          element.checked = !element.checked;
        }
        return element;
      });
    }
  }

  assignProfessional2(){
    const professionals = this.options.filter((element: any) => element.checked);
    if(professionals.length > 0){
      const Swal = require('sweetalert2');
      Swal.fire({
        title: '¿Está seguro de asignar la solicitud a los profesionales seleccionados?\n' + professionals.map((element: any) => element.nombre_profesional).join(', '),
        showCancelButton: true,
        confirmButtonText: `Asignar`,
        cancelButtonText: `Cancelar`,
        type: 'question'
      }).then((result: any) => {
        if (result.value) {
          this.sweetAlertService.sweetLoading();
          const obj = {tarea_solicitud_id: this.data.id_solicitud, responsable_id: professionals.map((element: any) => element.id)};
          this.juridicalService.postAssignProfessional(obj).subscribe((response: any) => {
            this.sweetAlertService.sweetClose();
            this.dialogRef.close(response.message);
          } );

        }
      });
    } else {
      this.toast.open({description:'Debe seleccionar al menos un profesional'});
    }
  }

  professionalAssignments: any;
  viewProfessional(professional: any){
    this.sweetAlertService.sweetLoading();
    this.juridicalService.getProfessionalAssignmentsId(professional.id).subscribe((response: any) => {
      console.log(response);
      this.professionalAssignments = response.data.asignaciones;
      this.sweetAlertService.sweetClose();
    });
  }

  viewProfessional2(professional: any){
    console.log(professional);
    // Lo redireccionamos al apartado del detalle del profesional
    this.dialogRef.close(professional.id);
    setTimeout(() => {
      this.router.navigate(['/juridica/detail-request', professional.id]);
    }, 1000);
  }

  getColorClass(semaforo: string): string {
    switch (semaforo) {
      case this.colorSemaforo.AMARILLO:
        return 'amarillo';
      case this.colorSemaforo.ROJO:
        return 'rojo';
      case this.colorSemaforo.VERDE:
        return 'verde';
      default:
        return '';
    }
  }

  returnRequest(){
    this.dialogRef.close();
  }
}

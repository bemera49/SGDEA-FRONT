/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Input, SimpleChanges, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * @description Importacion de services
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { JuridicalService } from 'src/app/services/juridical/juridical.service';

/**
 * @description Modelos juridica
 */
import { DetailElement } from '../../../../../services/juridical/models/detail-element'

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";

@Component({
  selector: 'app-detail-anexos',
  templateUrl: './detail-anexos.component.html',
  styleUrls: ['./detail-anexos.component.css']
})
export class DetailAnexosComponent implements OnInit {

  public TypeRequest: string[] = ['Acompañamiento', 'Concepto jurídico', 'Asesoría'];
  public detailObject: DetailElement;
  @Input() dataDetail: DetailElement;
  public idSolicitud: number;

  public formDetalleSolicitud = new FormGroup({
    tipo_solicitud: new FormControl('', [Validators.required]),
    detalle_solicitud: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
  });

  // Array temporal para almacenar los archivos seleccionados
  public uploadedFiles: File[] = [];

  constructor(
    private juridicalService: JuridicalService,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetail'] && changes['dataDetail'].currentValue) {
      this.detailObject = changes['dataDetail'].currentValue;
      this.idSolicitud = this.detailObject['id'];
      console.log('this.detailObject detail-anexos', this.detailObject);
    }
  }

  // Maneja la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.uploadedFiles.push(input.files[i]);
      }
    }
  }

  // Elimina un archivo del array temporal
  deleteFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  // Verificar si se han seleccionado archivos
  hasFiles(): boolean {
    return this.uploadedFiles.length > 0;
  }

  // Enviar la solicitud con los detalles y los archivos adjuntos
  postDetailRequest() {
    const formdata = new FormData();

    // Agregar campos no relacionados con archivos al FormData
    formdata.append('tarea_solicitud_id', String(this.idSolicitud));
    formdata.append('tipo_solicitud', this.formDetalleSolicitud.get('tipo_solicitud').value);
    formdata.append('detalle_solicitud', this.formDetalleSolicitud.get('detalle_solicitud').value);

    // Asegurarse de que los archivos existan y agregarlos a formData
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      this.uploadedFiles.forEach((file: File) => {
        formdata.append('soportes[]', file);
      });
    }

    formdata.forEach((value, key) => {
      console.log(`Key: ${key}, Value:`, value);
    });

    this.juridicalService.postDetailRequest(formdata).subscribe({
      next: (data) => {
        console.log('data postDetailRequest despues de enviar: ', data);
        if (data.code === 403 && !data.success) {
          this.toast.open({ description: data.message });
        }

        if (data.success) {
          this.toast.open({ description: data.message });
          this.router.navigate(['/juridica/view-request']);
        }
      },
      error: (error) => {
        console.log('error postDetailRequest', error);
      }
    });
  }


  // Validar si los campos son correctos y abrir el modal de confirmación
  validApproved() {
    if (this.formDetalleSolicitud.valid) {
      const modalRef = this.modal.open(ActionModalComponent, {
        description: `¿Está seguro de crear esta solicitud?`
      });

      modalRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.postDetailRequest();
        }
      });
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }
}

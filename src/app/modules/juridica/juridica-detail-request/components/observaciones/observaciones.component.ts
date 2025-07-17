/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description Importacion de services
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { JuridicalService } from 'src/app/services/juridical/juridical.service';
import { ChangeChildrenService } from '@app/services/change-children.service';

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";
import { validate } from 'json-schema';

/**
 * @description Modelos juridica
 */
import { clasificacionRelatoria, restrictoresRelatoria, descriptoresRelatoria, subClasificacionRelatoria, conceptosRelatoria } from '../../../../../services/juridical/models/conceptos-element'
import { DetailElement } from '../../../../../services/juridical/models/detail-element'

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {

  // Array temporal para almacenar los archivos seleccionados
  public dataTableObservations: [] = []
  public detailObject: DetailElement;
  public idSolicitud: number;
  @Input() dataDetail: DetailElement;

  constructor(
    private juridicalService: JuridicalService,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    private changeChildrenService: ChangeChildrenService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetail'] && changes['dataDetail'].currentValue) {
      if (changes['dataDetail'].currentValue) {

        this.detailObject = changes['dataDetail'].currentValue
        this.idSolicitud = this.detailObject.solicitud.id
        this.getObservaciones(this.idSolicitud)

        console.log('this.detailObject observaciones comn', this.detailObject)
      }
    }
  }

  getObservaciones(idSolicitud: number) {
    this.juridicalService.getObservaciones(idSolicitud).subscribe({
      next: (res) => {
        console.log('data getObservaciones', res.data.comentarios)
        this.dataTableObservations = res.data.comentarios
        console.log('data this.dataTableObservations', this.dataTableObservations)
      }, error: (error) => {
        console.log('error getObservaciones', error)
      }
    })
  }

}

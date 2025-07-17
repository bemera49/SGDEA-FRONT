/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

/**
 * @description Modelos
 */
import { DetailElement } from '../../../../../services/juridical/models/detail-element'

@Component({
  selector: 'app-general-information-fill',
  templateUrl: './general-information-fill.component.html',
  styleUrls: ['./general-information-fill.component.css']
})
export class GeneralInformationFillComponent implements OnInit {

  @Output() aclarationForm = new EventEmitter<{ value: string, valid: boolean }>();
  @Output() attachmentsModify = new EventEmitter<{ nameFile: string, nomArchivo: string, dataArchivo: string }[]>();
  @Input() dataDetail: DetailElement;

  //obtener data con el formato del modelo
  public detailObject: DetailElement;
  public detailObjectValid: any;

  //Variables para presentar datos en la vista
  public numeroRadiRadicado: string;
  public fcreacionRadicado: string;
  public statusAviso: string;
  public fechaInicioDeseadaSap: string;
  public fechaFinDeseado: string;
  public circustancias: string;
  public descripcion: string;
  public numeroAviso: string;
  public claseAviso: string;
  public funcionario: string;
  public numeroOrden: string;
  public autorAvisoSap: string;
  public horaCreacion: string;
  public attachments: any;
  public aclaration = new FormControl('', [Validators.maxLength(150), Validators.required]);

  constructor() { }

  ngOnInit(): void {
    //Suscribirse a los cambios del formControl
    this.aclaration.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log('valor de aclaration form', value)
      this.aclarationForm.emit({ value, valid: this.aclaration.valid });
    });
  }

  /**
   * @description Detectar cambios 
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetail'] && changes['dataDetail'].currentValue) {
      if (changes['dataDetail'].currentValue) {
        console.log('Objeto detalle completo', this.detailObject)

        this.detailObject = changes['dataDetail'].currentValue
        this.numeroRadiRadicado = this.detailObject?.solicitud?.radicado;
        this.fcreacionRadicado = this.detailObject?.solicitud?.fecha_creacion; //fecha y Hora
        this.horaCreacion = this.detailObject?.solicitud?.hora_creacion;
        this.statusAviso = this.detailObject?.solicitud?.estado_aviso;
        this.fechaInicioDeseadaSap = this.detailObject?.solicitud?.fecha_inicio_deseado;
        this.fechaFinDeseado = this.detailObject?.solicitud?.fecha_fin_deseado;
        this.circustancias = this.detailObject?.solicitud?.circustancias;
        this.descripcion = this.detailObject?.solicitud?.descripcion;
        this.numeroAviso = this.detailObject?.solicitud?.numero_aviso;
        this.claseAviso = this.detailObject?.solicitud?.clase_aviso;
        this.funcionario = this.detailObject?.solicitud?.funcionario;
        this.numeroOrden = this.detailObject?.solicitud?.numero_orden;
        this.autorAvisoSap = this.detailObject?.solicitud?.autor_aviso;
        this.attachments = this.detailObject.solicitud.archivos;

        console.log('Objeto detalle completo', this.detailObjectValid.key_tipo_tarea)

      }
    }
  }

  /**
   * @description Metodo para emitir los anexos obtenidos al componente padre juridica-detail-request
   * @param updatedAttachments 
   */
  handleAttachmentsChanged(updatedAttachments: { nameFile: string, nomArchivo: string, dataArchivo: string }[]): void {
    this.attachmentsModify.emit(updatedAttachments)
    console.log('this.attachments.detalles', updatedAttachments)
  }
}

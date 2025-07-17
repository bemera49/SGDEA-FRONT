/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

/**
 * @description Modelos
 */
import { DetailElement } from '../../../../../services/juridical/models/detail-element'
import { JuridicalService } from '@app/services/juridical/juridical.service';
@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {

  @ViewChild('inputObservacion') inputObservacion!: ElementRef;
  @ViewChild('inputJustificacion') inputJustificacion!: ElementRef;
  @Output() observacionForm = new EventEmitter<{ value: string, valid: boolean }>();
  @Output() justificacionForm = new EventEmitter<{ value: string, valid: boolean }>();
  @Input() dataDetail: DetailElement;

  //obtener data con el formato del modelo
  public detailObject: DetailElement;
  public test: DetailElement[] = [];;

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

  //FormControl
  public observation = new FormControl('', [Validators.maxLength(150), Validators.required]);
  public justification = new FormControl('', [Validators.maxLength(150), Validators.required]);

  constructor(
    private juridicalService: JuridicalService
  ) { }
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {
    //Suscribirse a los cambios del formControl
    this.observation.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.observacionForm.emit({ value, valid: this.observation.valid });
    });
    this.justification.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.justificacionForm.emit({ value, valid: this.justification.valid });
    });
  }

  data: any;
  ngAfterViewInit() {
    this.validarDatoHijo().pipe(takeUntil(this.unsubscribe$)).subscribe(isChildRunning => {
      // this.onReclamarChange(isChildRunning);
      this.data = isChildRunning;
      console.log('isChildRunning', this.data)
    });
  }


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

        console.log('Objeto detalle completo', this.detailObject)

      }
    }
  }

  onReclamarChange(event: any) {
    this.campoObservacion(event);
    this.campoJustificacion(event);
  }

  private campoObservacion(event: any) {
    if (!event.observacion) {
      const inputElement = this.inputObservacion.nativeElement;
      // Le agregamos una clase al input
      inputElement.classList.add('input-off');
    } else {
      const inputElement = this.inputObservacion.nativeElement;
      // Le quitamos la clase al input
      inputElement.classList.remove('input-off');
    }
  }

  private campoJustificacion(event: any) {
    if (!event.justificacion) {
      const inputElement = this.inputJustificacion.nativeElement;
      // Le agregamos una clase al input
      inputElement.classList.add('input-off');
    } else {
      const inputElement = this.inputJustificacion.nativeElement;
      // Le quitamos la clase al input
      inputElement.classList.remove('input-off');
    }
  }

  validarDatoHijo(): Observable<Object> {
    return new Observable<Object>(observer => {
      this.juridicalService.enviarHijoAlPadre().subscribe(isChildRunning => {
        observer.next(isChildRunning);
      });
    });
  }
}

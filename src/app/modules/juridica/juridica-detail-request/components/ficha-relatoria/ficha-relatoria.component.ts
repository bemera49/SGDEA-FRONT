/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

/**
 * @description Importacion de services
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { JuridicalService } from 'src/app/services/juridical/juridical.service';

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";

/**
 * @description Modelos juridica
 */
import { clasificacionRelatoria, restrictoresRelatoria, descriptoresRelatoria, subClasificacionRelatoria, conceptosRelatoria } from '../../../../../services/juridical/models/conceptos-element'
import { DetailElement } from '../../../../../services/juridical/models/detail-element'
@Component({
  selector: 'app-ficha-relatoria',
  templateUrl: './ficha-relatoria.component.html',
  styleUrls: ['./ficha-relatoria.component.css']
})
export class FichaRelatoriaComponent implements OnInit {

  // Definición del FormGroup para manejar los campos del formulario
  @Input() dataDetail: DetailElement;
  public detailObject: DetailElement;

  public viewConcepts: boolean = false;

  public formFichaRelatoria = new FormGroup({
    idConcepto: new FormControl('', [Validators.maxLength(20)]),
    fechaConcepto: new FormControl('', [Validators.maxLength(20)]),
    abogado: new FormControl('', [Validators.maxLength(50)]),
    idClasificacion: new FormControl('', [Validators.maxLength(50), Validators.required]),
    idSubClasificacion: new FormControl('', [Validators.maxLength(50), Validators.required]),
    problemaJuridico: new FormControl('', [Validators.maxLength(300), Validators.required]),
    respuestaProblemaJuri: new FormControl('', [Validators.maxLength(300), Validators.required]),
    idDescriptor: new FormControl('', [Validators.maxLength(50), Validators.required]),
    idRestrictor: new FormControl('', [Validators.maxLength(50), Validators.required])
  })

  public idConcepto: string;
  public fecha_creacion: any;
  public abogado: any;
  public idSolicitud: number;
  public idFichaRelatoria: number;

  public dataClasificacionRelatoria: clasificacionRelatoria;
  public dataRestrictoresRelatoria: restrictoresRelatoria;
  public dataDescriptoresRelatoria: descriptoresRelatoria;
  public dataSubClasificacionRelatoria: subClasificacionRelatoria;
  public dataFichaRelatoria: any;

  constructor(
    private juridicalService: JuridicalService,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.getClasificaciónRelatoria();
    this.getDescriptoresRelatoria();
    this.getRestrictoresRelatoria();
    this.getClasificaciónRelatoria();
  }

  private getFechaActual(): string {
    const ahora = new Date();
    const year = ahora.getFullYear();
    const month = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const day = ahora.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetail'] && changes['dataDetail'].currentValue) {
      if (changes['dataDetail'].currentValue) {

        this.detailObject = changes['dataDetail'].currentValue
        this.fecha_creacion = this.getFechaActual();
        this.abogado = this.detailObject?.solicitud?.funcionario;
        this.idSolicitud = this.detailObject.solicitud.id
        console.log('this.idSolicitud ', this.idSolicitud)
        this.getfichaRelatoria(this.idSolicitud)

        this.formFichaRelatoria.get('fechaConcepto')?.setValue(this.fecha_creacion);
        this.formFichaRelatoria.get('fechaConcepto')?.setValue(this.fecha_creacion);
        this.formFichaRelatoria.get('abogado')?.setValue(this.abogado);
      }
    }
  }

  getfichaRelatoria(idSolicitud: number) {
    this.juridicalService.getfichaRelatoria(idSolicitud).subscribe({
      next: (res) => {
        // Verifica si la respuesta contiene datos
        if (res && res.data) {
          this.dataFichaRelatoria = res;
          this.idFichaRelatoria = res.data['id'];
          console.log('Responde getfichaRelatoria', res.data);

          // Asigna valores solo si el idFichaRelatoria existe
          if (this.idFichaRelatoria) {
            if (res.data['idConcepto']) {
              this.formFichaRelatoria.get('idConcepto')?.setValue(res.data['idConcepto']);
              this.getSubClasificacionRelatoria()
            }
            if (res.data['clasificacion']) {
              this.formFichaRelatoria.get('idClasificacion')?.setValue(res.data['clasificacion']);
              this.getSubClasificacionRelatoria()
            }
            if (res.data['subclasificacion']) {
              this.formFichaRelatoria.get('idSubClasificacion')?.setValue(res.data['subclasificacion']);
            }
            if (res.data['problemaJuridico']) {
              this.formFichaRelatoria.get('problemaJuridico')?.setValue(res.data['problemaJuridico']);
            }
            if (res.data['respuestaProblemaJuri']) {
              this.formFichaRelatoria.get('respuestaProblemaJuri')?.setValue(res.data['respuestaProblemaJuri']);
            }
            if (res.data['descriptor']) {
              this.formFichaRelatoria.get('idDescriptor')?.setValue(res.data['descriptor']);
            }
            if (res.data['restrictor']) {
              this.formFichaRelatoria.get('idRestrictor')?.setValue(res.data['restrictor']);
            }
          }
        } else {
          console.log('No se encontraron datos en la respuesta');
        }
      },
      error: (error) => {
        console.log('Error en getFichaRelatoria', error);
      }
    });
  }


  getClasificaciónRelatoria() {
    this.juridicalService.getClasificaciónRelatoria().subscribe({
      next: (res) => {
        this.dataClasificacionRelatoria = res;
      },
      error: (error) => {
        console.log('error getClasificaciónRelatoria', error)
      }
    })
  }

  getDescriptoresRelatoria() {
    this.juridicalService.getDescriptoresRelatoria().subscribe({
      next: (res) => {
        this.dataDescriptoresRelatoria = res;
      },
      error: (error) => {
        console.log('error getDescriptoresRelatoria', error)
      }
    })
  }

  getRestrictoresRelatoria() {
    this.juridicalService.getRestrictoresRelatoria().subscribe({
      next: (res) => {
        this.dataRestrictoresRelatoria = res;
      },
      error: (error) => {
        console.log('error getRestrictoresRelatoria', error)
      }
    })
  }

  getSubClasificacionRelatoria() {
    let idClasificacion = parseInt(this.formFichaRelatoria.get('idClasificacion').value)
    this.juridicalService.getSubClasificacionRelatoria(idClasificacion).subscribe({
      next: (res) => {
        this.dataSubClasificacionRelatoria = res;
        console.log('res getSubClasificacionRelatoria', res)
      },
      error: (error) => {
        console.log('error getRestrictoresRelatoria', error)
      }
    })
  }

  validApproved() {
    if (this.formFichaRelatoria.valid) {
      const modalRef = this.modal.open(ActionModalComponent, {
        message: `Creación`,
        description: `¿Está seguro de crear esta ficha de relatoria?`
      });

      modalRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.crearFichaRelatoria()
        }
      });
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }

  /**
   * @description Crear el id_concepto
   */
  crearFichaRelatoria() {
    let body = {
      "fechaConcepto": this.formFichaRelatoria.get('fechaConcepto').value,
      "abogado": 'Santiago Londoño Camacho',
      "id_solicitud_juridica": this.idSolicitud
    }
    console.log('body crearFichaRelatoria', body);
    this.juridicalService.postfichaRelatoria(body).subscribe({
      next: (res) => {
        this.formFichaRelatoria.get('idConcepto')?.setValue(res.data.idConcepto);
        this.updatefichaRelatoria();
      }, error: (error) => {
        console.log('error crearFichaRelatoria', error)
      }
    })
  }

  /**
   * @description Actualizar la ficha relatoria
   */
  updatefichaRelatoria() {
    if (this.formFichaRelatoria.valid) {
      let ficha = {
        id: this.idFichaRelatoria,
        idConcepto: this.formFichaRelatoria.get('idConcepto').value,
        fechaConcepto: this.formFichaRelatoria.get('fechaConcepto').value,
        abogado: this.formFichaRelatoria.get('abogado').value,
        idClasificacion: parseInt(this.formFichaRelatoria.get('idClasificacion').value),
        idSubClasificacion: parseInt(this.formFichaRelatoria.get('idSubClasificacion').value),
        problemaJuridico: this.formFichaRelatoria.get('problemaJuridico').value,
        respuestaProblemaJuri: this.formFichaRelatoria.get('respuestaProblemaJuri').value,
        idDescriptor: parseInt(this.formFichaRelatoria.get('idDescriptor').value),
        idRestrictor: parseInt(this.formFichaRelatoria.get('idRestrictor').value),
      }
      console.log('ficha updatefichaRelatoria', ficha);

      this.juridicalService.updateFichaRelatoria(ficha).subscribe({
        next: (res) => {
          console.log('res updateFichaRelatoria', res)
          this.toast.open({
            description: 'Ficha actualizada exitosamente'
          });
        }, error: (error) => {
          console.log('error updateFichaRelatoria', error)
        }
      })
    } else {
      this.toast.open({
        description: 'Por favor verifique, datos obligatorios incompletos'
      });
    }
  }

  /**
   * @description Abrir el componente ver conceptos
   */
  toggleSearchConcept() {
    this.viewConcepts = !this.viewConcepts;
  }

}
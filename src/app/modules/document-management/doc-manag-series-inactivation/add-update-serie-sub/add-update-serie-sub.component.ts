import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @description Importacion de servicios
 */
import { ToastService } from "src/app/services/toast/toast.service";
import { SeriesSubseriesService } from '../../../../services/gestion documental/series_subseries.service';

/**
 * @description Modelos 
 */

@Component({
  selector: 'app-add-update-serie-sub',
  templateUrl: './add-update-serie-sub.component.html',
  styleUrls: ['./add-update-serie-sub.component.css']
})
export class AddUpdateSerieSubComponent implements OnInit {

  public estados: String[] = ['Activo', 'Inactivo'];
  public disableFields: boolean = false;
  public config: any;

  public serieSubserieForm = new FormGroup({
    idGdTrdSerie: new FormControl('',),
    nombreGdTrdSerie: new FormControl('', [Validators.maxLength(255), Validators.required]),
    codigoGdTrdSerie: new FormControl('', [Validators.maxLength(12), Validators.required]),
    clasificacion_seguridad: new FormControl('', [Validators.maxLength(50), Validators.required]),
    subSeries: new FormGroup({
      idGdTrdSubserie: new FormControl('',),
      nombreGdTrdSubserie: new FormControl('', [Validators.maxLength(255), Validators.required]),
      codigoGdTrdSubserie: new FormControl('', [Validators.maxLength(255), Validators.required]),
      contieneSubseries: new FormControl(false),
      retencion_archivo_gestion: new FormControl('', [Validators.maxLength(2), Validators.required]),
      retencion_archivo_central: new FormControl('', [Validators.maxLength(2), Validators.required]),
      disposicion_final: new FormControl('', [Validators.required]),
      reproduccion_tecnica: new FormControl(false),
      procedimientoGdTrdSubserie: new FormControl('', [Validators.maxLength(1000), Validators.required]),
      estadoGdTrdSubserie: new FormControl('', [Validators.maxLength(50), Validators.required]),
    })
  });

  constructor(
    private dialogRef: MatDialogRef<AddUpdateSerieSubComponent>,
    @Inject(ToastService) private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public seriesSubseriesService: SeriesSubseriesService
  ) {
    this.config = data;
  }

  ngOnInit(): void {
    // Suscribirnos a los cambios en el valor de contieneSubseries
    this.serieSubserieForm.get('subSeries.contieneSubseries')?.valueChanges.subscribe(value => {
      this.onContieneSubseriesChange(value);
    });

    this.onContieneSubseriesChange()

    // Establecer el valor por defecto a true si la acción es 'create_subserie'
    if (this.config.action === 'create_subserie') {
      this.serieSubserieForm.get('subSeries.contieneSubseries')?.setValue(true);

      this.serieSubserieForm.get('nombreGdTrdSerie').disable()
      this.serieSubserieForm.get('codigoGdTrdSerie').disable()
      this.serieSubserieForm.get('clasificacion_seguridad').disable()

      this.serieSubserieForm.get('nombreGdTrdSerie')?.setValue(this.config.data['nombreGdTrdSerie']);
      this.serieSubserieForm.get('codigoGdTrdSerie')?.setValue(this.config.data['codigoGdTrdSerie']);
      this.serieSubserieForm.get('clasificacion_seguridad')?.setValue(this.config.data['clasificacion_seguridad']);
    }

    if (this.config.action === 'editar') {
      //Asignación de campos para editarlos 
      this.serieSubserieForm.get('subSeries.contieneSubseries').disable()
      this.serieSubserieForm.get('nombreGdTrdSerie')?.setValue(this.config.data['nombreGdTrdSerie']);
      this.serieSubserieForm.get('codigoGdTrdSerie')?.setValue(this.config.data['codigoGdTrdSerie']);
      this.serieSubserieForm.get('clasificacion_seguridad')?.setValue(this.config.data['clasificacion_seguridad']);
      this.serieSubserieForm.get('subSeries.idGdTrdSubserie')?.setValue(this.config.data['idGdTrdSubserie']);
      this.serieSubserieForm.get('subSeries.nombreGdTrdSubserie')?.setValue(this.config.data['nombreGdTrdSubserie']);
      this.serieSubserieForm.get('subSeries.codigoGdTrdSubserie')?.setValue(this.config.data['codigoGdTrdSubserie']);
      this.serieSubserieForm.get('subSeries.retencion_archivo_gestion')?.setValue(this.config.data['retencion_archivo_gestion']);
      this.serieSubserieForm.get('subSeries.retencion_archivo_central')?.setValue(this.config.data['retencion_archivo_central']);
      this.serieSubserieForm.get('subSeries.disposicion_final')?.setValue(this.config.data['disposicion_final']);
      this.serieSubserieForm.get('subSeries.reproduccion_tecnica')?.setValue(this.config.data['reproduccion_tecnica']);
      this.serieSubserieForm.get('subSeries.procedimientoGdTrdSubserie')?.setValue(this.config.data['procedimientoGdTrdSubserie']);

      //Validar el estado de la subserie para asignar
      if (this.config.data['estadoGdTrdSubserie'] == 'Activo') {
        this.serieSubserieForm.get('subSeries.estadoGdTrdSubserie')?.setValue('10');
      } else {
        this.serieSubserieForm.get('subSeries.estadoGdTrdSubserie')?.setValue('0');
      }

      //Validar si permite subseries
      if (this.config.data['nombreGdTrdSubserie'] == null && this.config.data['nombreGdTrdSubserie'] == '01') {
        this.serieSubserieForm.get('subSeries.contieneSubseries')?.setValue(false);
      } else {
        this.serieSubserieForm.get('subSeries.contieneSubseries')?.setValue(true);
      }
    }
  }

  onContieneSubseriesChange(value?: any): void {
    this.disableFields = value;
    if (this.config.action === 'create_subserie' || this.config.action === 'create_serie') {
      if (!value) {
        this.serieSubserieForm.get('subSeries.codigoGdTrdSubserie')?.patchValue('01');
        this.serieSubserieForm.get('subSeries.nombreGdTrdSubserie')?.patchValue('Sin subserie');
      } else {
        this.serieSubserieForm.get('subSeries.codigoGdTrdSubserie')?.patchValue('');
        this.serieSubserieForm.get('subSeries.nombreGdTrdSubserie')?.patchValue('');
      }
    }
  }

  createSerie(): void {
    let formulario = {
      "nombreGdTrdSerie": this.serieSubserieForm.get('nombreGdTrdSerie')?.value,
      "codigoGdTrdSerie": this.serieSubserieForm.get('codigoGdTrdSerie')?.value,
      "clasificacion_seguridad": this.serieSubserieForm.get('clasificacion_seguridad')?.value,
      "subSeries": [
        this.serieSubserieForm.get('subSeries')?.value
      ]
    }

    this.seriesSubseriesService.addSubSeriesSeries(formulario).subscribe({
      next: (res) => {
        this.toast.open({
          description: 'Se ha creado una nueva serie o subserie documental.'
        });
        this.onClose();
      }, error: (error) => {
        console.log('res onGuardar', error);
        this.toast.open({
          title: error.error.error,
          description: error.error.message
        });
      }
    });
  }

  createSubserie(): void {
    let formulario = {
      "idGdTrdSerie": this.config.data['idGdTrdSerie'],
      "nombreGdTrdSerie": this.serieSubserieForm.get('nombreGdTrdSerie')?.value,
      "codigoGdTrdSerie": this.serieSubserieForm.get('codigoGdTrdSerie')?.value,
      "clasificacion_seguridad": this.serieSubserieForm.get('clasificacion_seguridad')?.value,
      "subSeries": [
        this.serieSubserieForm.get('subSeries')?.value
      ]
    }

    this.seriesSubseriesService.addSubSeriesSeries(formulario).subscribe({
      next: (res) => {
        this.toast.open({
          description: 'Se ha creado una nueva subserie documental.'
        });
        this.onClose();
      }, error: (error) => {
        this.toast.open({
          title: error.error.error,
          description: error.error.message
        });
      }
    });
  }

  editarSerieSubserie(): void {
    let formulario = {
      "idGdTrdSerie": this.config.data['idGdTrdSerie'],
      "nombreGdTrdSerie": this.serieSubserieForm.get('nombreGdTrdSerie')?.value,
      "codigoGdTrdSerie": this.serieSubserieForm.get('codigoGdTrdSerie')?.value,
      "clasificacion_seguridad": this.serieSubserieForm.get('clasificacion_seguridad')?.value,
      "subSeries": [
        this.serieSubserieForm.get('subSeries')?.value
      ]
    }

    this.seriesSubseriesService.updateSubSeriesSeries(formulario).subscribe({
      next: (res) => {
        this.toast.open({
          description: 'Se ha actualizado con éxito.'
        });
        this.onClose();
      }, error: (error) => {
        console.log('res onGuardar', error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

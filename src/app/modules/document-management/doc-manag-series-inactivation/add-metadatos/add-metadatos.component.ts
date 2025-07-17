import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from "src/app/services/toast/toast.service";
import { SeriesSubseriesService } from '../../../../services/gestion documental/series_subseries.service';
import { catchError } from 'rxjs/operators';

interface Metadata {
  id: number;
  nombre: string;
  check: boolean;
}

interface MetadataDisponible {
  id: number;
  nombre: string;
  check: boolean;
}

@Component({
  selector: 'app-add-metadatos',
  templateUrl: './add-metadatos.component.html',
  styleUrls: ['./add-metadatos.component.css']
})
export class AddMetadatosComponent implements OnInit {

  @Input() dataSerie: any;
  public idMetadatos: number;

  public metadatosDisponibles: MetadataDisponible[] = [];
  public assignedMetadata: Metadata[] = [];
  selectedMetadata: Set<Metadata> = new Set<Metadata>();
  namingMask: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddMetadatosComponent>,
    @Inject(ToastService) private toast: ToastService,
    public seriesSubseriesService: SeriesSubseriesService
  ) { }

  ngOnInit(): void {
    this.getListMetadatos();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getListMetadatos(): void {
    const idGdTrdSubserie = {
      idGdTrdSubserie: this.dataSerie['idGdTrdSubserie']
    };

    this.seriesSubseriesService.getListMetadatos(idGdTrdSubserie)
      .pipe(catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error);
      }))
      .subscribe(res => {
        const data = res['data'];
        console.log('ressssssssss',res['data'])
        this.idMetadatos = res['data']['metadatosAsignados']['id'];
        console.log('this.idMetadatos', this.idMetadatos)

        this.metadatosDisponibles = data.metadatosDisponibles.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          check: false
        }));

        this.assignedMetadata = data['metadatosAsignados'].metadatosAsignados.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          check: item.check
        }));

        // Inicializar namingMask con valores asignados inicialmente
        const initialNames = this.assignedMetadata
          .filter(m => m.check)
          .map(m => m.nombre);
        this.namingMask = initialNames.join(', ');

        // Añadir los metadatos iniciales al conjunto seleccionado
        this.assignedMetadata.forEach(m => {
          if (m.check) {
            this.selectedMetadata.add(m);
          }
        });
      });
  }

  onSave(): void {
    const metadatos = {
      id: this.idMetadatos,
      idGdTrdSerie: this.dataSerie['idGdTrdSerie'],
      idGdTrdSubserie: this.dataSerie['idGdTrdSubserie'],
      mascaraDeNombrado: this.namingMask,
      metadatosAsignados: this.assignedMetadata.map(metadata => ({
        id: metadata.id,
        nombre: metadata.nombre,
        check: metadata.check
      }))
    };

    console.log('onSave() metadatos', metadatos);
    this.seriesSubseriesService.addMetadatos(metadatos).subscribe({
      next: (res) => {
        console.log('res', res.data)
        this.toast.open({
          description: 'Metadatos asignados con exito.'
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error al guardar los metadatos:', err);
      }
    });
  }

  onAssign(metadata: Metadata): void {
    this.assignedMetadata.push(metadata);
    this.metadatosDisponibles = this.metadatosDisponibles.filter(m => m.id !== metadata.id);
    this.updateNamingMask();
  }

  onCheckboxChange(metadata: Metadata, checked: boolean): void {
    metadata.check = checked;
    if (checked) {
      this.selectedMetadata.add(metadata);
    } else {
      this.selectedMetadata.delete(metadata);
    }
    this.updateNamingMask();
  }

  assignAll(): void {
    this.assignedMetadata = this.assignedMetadata.concat(this.metadatosDisponibles.map(m => ({
      ...m,
      check: false
    })));
    this.metadatosDisponibles = [];
    this.updateNamingMask();
  }

  unassignAll(): void {
    this.metadatosDisponibles = this.metadatosDisponibles.concat(this.assignedMetadata);
    this.assignedMetadata = [];
    this.selectedMetadata.clear();
    this.namingMask = '';
  }

  updateNamingMask(): void {
    const selectedNames = Array.from(this.selectedMetadata)
      .filter(m => m.check)
      .map(m => m.nombre);

    const currentNames = this.namingMask ? this.namingMask.split(', ') : [];

    const nameSet = new Set(currentNames);

    selectedNames.forEach(name => nameSet.add(name));

    currentNames.forEach(name => {
      if (!selectedNames.includes(name)) {
        nameSet.delete(name);
      }
    });

    this.namingMask = Array.from(nameSet).join(', ');
  }

  onRemove(metadata: Metadata): void {
    this.assignedMetadata = this.assignedMetadata.filter(m => m.id !== metadata.id);
    this.metadatosDisponibles.push(metadata);
    this.selectedMetadata.delete(metadata);
    this.updateNamingMask();
  }
}

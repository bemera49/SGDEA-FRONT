import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';

/**
 * @description Importacion de servicios
 */
import { TiposDocumentalesService } from '../../../../services/gestion documental/tipos_documentales.service';
import { ToastService } from "src/app/services/toast/toast.service";

interface Metadata {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-add-metadatos-type-documental',
  templateUrl: './add-metadatos.component.html',
  styleUrls: ['./add-metadatos.component.css']
})
export class AddMetadatosTypeDocumentalComponent implements OnInit {

  @Input() dataTipoDocumental: any;
  public idMetadatos: number;

  public metadatosDisponibles: Metadata[] = [];
  public assignedMetadata: Metadata[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddMetadatosTypeDocumentalComponent>,
    @Inject(ToastService) private toast: ToastService,
    public tiposDocumentalesService: TiposDocumentalesService
  ) { }

  ngOnInit(): void {
    this.getListMetadatos();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getListMetadatos(): void {
    const idGdTrdSubserie = {
      idGdTrdTipoDocumental: this.dataTipoDocumental['idGdTrdTipoDocumental']
    };

    this.tiposDocumentalesService.getListMetadatos(idGdTrdSubserie)
      .pipe(catchError((error) => {
        console.error('Error al obtener los metadatos:', error);
        throw new Error(error);
      }))
      .subscribe(res => {
        console.log('getListMetadatos res', res)
        const data = res['data'];
        this.idMetadatos = res['data']['metadatosAsignados']['id'];
        console.log('res',res)
  
        this.metadatosDisponibles = data.metadatosDisponibles.map((item: any) => ({
          id: item.id,
          nombre: item.nombre
        }));

        this.assignedMetadata = data['metadatosAsignados'].metadatosAsignados.map((item: any) => ({
          id: item.id,
          nombre: item.nombre
        }));
      });
  }

  onSave(): void {
    const metadatos = {
      id: this.idMetadatos,
      idGdTrdTipoDocumental: this.dataTipoDocumental['idGdTrdTipoDocumental'],
      metadatosAsignados: this.assignedMetadata.map(metadata => ({
        id: metadata.id,
        nombre: metadata.nombre,
      }))
    };

    console.log('onSave() metadatos', metadatos);

    this.tiposDocumentalesService.addMetadatos(metadatos).subscribe({
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
  }

  assignAll(): void {
    this.assignedMetadata = this.assignedMetadata.concat(this.metadatosDisponibles);
    this.metadatosDisponibles = [];
  }

  unassignAll(): void {
    this.metadatosDisponibles = this.metadatosDisponibles.concat(this.assignedMetadata);
    this.assignedMetadata = [];
  }

  onRemove(metadata: Metadata): void {
    this.assignedMetadata = this.assignedMetadata.filter(m => m.id !== metadata.id);
    this.metadatosDisponibles.push(metadata);
  }

}

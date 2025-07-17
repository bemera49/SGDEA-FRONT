import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '@app/app.material.module';
import { SigninService } from '@app/modules/management-processing/signin.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { SignatureEditService } from '@app/modules/management-processing/signature-edit/signature-edit.service';

export interface IUsuarioFirmaPost {
  user_id?: number,
  user_externos_id?: number,
  cg_tipo_firma_id: number,
  sgc_participante_id: number,
  cg_estado_flujo_id: number,
  posicion: number,
  coordenada: string,
  fecha_maxima_firma: string | Date,
}

export interface IUsuarioFirma {
  estado_flujo?: string | null;
  fecha_firma?: string | null;
  fecha_maxima_firma?: string | Date | null;
  id?: number | null;
  tipoFirma?: string | null;
  tipo_participante?: string | null;
  tipo_participante_id?: number | null;
  tipo_usuario?: string | null;
  name?: string | null;
  nombreUsuario?: string | null;
  tipoUsuario?: string | null;
  actividad?: string | null;
  dependencia?: string | null;
  posicion?: number | null;
  idTipoFirma?: string | null;
  user_id?: string | null;
  user_externos_id?: string | null;
  participante_id?: string | null;
}

@Component({
  selector: 'app-draggable-table-copy',
  standalone: true,
  imports: [CommonModule, MaterialModule, DragDropModule],
  templateUrl: './draggable-table-copy.component.html',
  styleUrls: ['./draggable-table-copy.component.css'],
 
})
export class DraggableTableCopyComponent  {

  constructor(
    public signature$: SignatureEditService, 
  ) {}

  @Input() headers: any[] = [];
  @Input() index: number;
  groupedData: IUsuarioFirma[][]= [];

  public filteredOrdenFirma: number[] = [];

  originalArray: IUsuarioFirma[] = [];
  private groupedItems: { [key: number]: IUsuarioFirma[] } = {
    1: [],
    2: [],
    3: []
};

  removeRow(id: number) {
    this.signature$.removeUsuarioFirma(id);
  }

 obtainOrdenFirmaOptions(num: number): number[] {

  let arr = this.signature$.sortedGroupedArraySubject.getValue()[this.index]
  let response = [];

  arr.forEach((subArr: [], index) => {
    index + 1 == num ? null : response.push(index + 1)
  })

  this.filteredOrdenFirma = response;
  return response;
}

ngOnInit() {
  this.signature$.sortedGroupedArray$.subscribe(res => {
    this.groupedData = res[this.index]
  })
}

mergeRows(item: any, newOrdenFirma: number) {
  this.signature$.updateOrdenFirma(item, newOrdenFirma)
  console.log(item, newOrdenFirma)
}


// Método que se llamará cuando haya cambios en el array original
disassociate(item: any, tabIndex) {
  this.signature$.removeUsuarioFirma(item.id)
 
  item.posicion = tabIndex.length + 1;

  this.signature$.addUsuarioFirma({...item}, 0)

}

drop(event: CdkDragDrop<IUsuarioFirma[]>) {
  moveItemInArray(this.groupedData, event.previousIndex, event.currentIndex);
  // Reagrupa después de mover un elemento
  let newSubGroup = this.signature$.sortedGroupedArraySubject.getValue();

  newSubGroup[this.index] = this.groupedData;

  this.signature$.updateSortedGroup(newSubGroup)
  console.log(event.previousIndex, event.currentIndex)
}

}


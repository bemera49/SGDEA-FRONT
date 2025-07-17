import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '@app/app.material.module';
import { SigninService } from '@app/modules/management-processing/signin.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
export interface IUsuarioFirma {
  actividad: string,
  dependencia: string,
  nombreUsuario: string,
  ordenFirma: number,
  tipoFirma: string,
  tipoUsuario: string,
  }

@Component({
  selector: 'app-draggable-table',
  standalone: true,
  imports: [CommonModule, DragDropModule, MaterialModule],
  templateUrl: './draggable-table.component.html',
  styleUrls: ['./draggable-table.component.css']
})
export class DraggableTableComponent implements OnInit {

  @Input() headers: any[] = [];
  data: IUsuarioFirma[][] = [];

  constructor(public signinService: SigninService,) { }

  public selectedTabIndex: number = 0;

  private subscription: Subscription;


  ngOnInit(): void {

    this.subscription = combineLatest([
      this.signinService.registrosUsuarios$,
      this.signinService.selectedTabIndex$
    ]).subscribe(([registros, selectedTabIndex]) => {
      if (registros && registros[selectedTabIndex]) {

        this.selectedTabIndex = selectedTabIndex;

        this.data = registros[this.selectedTabIndex]
        this.render();

      }
    });

  }


    // this.signinService.registrosUsuarios$.subscribe((newData) => {
    //   const idx = this.signinService.getValueTabIndex();
    //   this.data = newData[idx]

    //   console.log('datos actualizados', newData)
    // })

    // this.signinService.selectedTabIndex$.subscribe((newValue: number) => {
    //   this.selectedTabIndex = newValue
    //   this.signinService.registrosUsuarios$.subscribe(registros => {

    //     let usuarios = registros[this.selectedTabIndex]


    //     const filteredOrdenFirma = usuarios.forEach((arr: IUsuarioFirma[]) => {
    //       return arr.map((item: IUsuarioFirma) => {item.ordenFirma})
    //     })
        
    //     this.data = usuarios;
    //     this.render()
    
    //     console.log('SE COLOCA DATA', usuarios, filteredOrdenFirma, this.signinService.getValue())
       
    //   })})
   

  // }

  public filteredOrdenFirmas: number[] = []

  render() {

    this.data = this.data.filter(group => group.length > 0);

    this.data.forEach((group: any[], index) => {
      const parsedIndex = index + 1;
      group.forEach((item: IUsuarioFirma) => {
        item.ordenFirma = parsedIndex;
      })
    })
  }

  removeRow(row: any) {
    const rowStr = JSON.stringify(row);

    this.data = this.data
      .map(innerArray => {
        const rowIndex = innerArray.findIndex(item => JSON.stringify(item) === rowStr);

        if (rowIndex !== -1) {
          // Si el row es el único en el arreglo, elimina el arreglo completo
          if (innerArray.length === 1) {
            return null;
          } else {
            // Si no es el único, elimina solo el row
            return innerArray.filter((_, index) => index !== rowIndex);
          }
        }
        return innerArray;
      })
      .filter(innerArray => innerArray !== null);

      const value = this.signinService.getValue()
      const index = this.signinService.getValueTabIndex()
      value[index] = this.data;

      this.signinService.setValue(value)

      this.render()
  }



  mergeRows(objectIndex: number, groupIndex: number, newOrdenFirma: number): void {

    const group = this.data[groupIndex]; // Este es el grupo orden firma del item a mover
    let item = this.data[groupIndex][objectIndex]; // Este es el objeto dentro de this.data que se selecciono en el boton
    let newGroup = this.data[newOrdenFirma - 1]; // Este es el grupo de orden firma donde se debe enviar el item

    if(group.length == 1) {
      group.splice(0, 1)
    }
      
    item.ordenFirma = newOrdenFirma; 
    newGroup.push(item)
    this.render()


  }

  disassociate(row: any, groupLength: number) {

    this.removeRow(row)
    this.data.push([row])
    this.signinService.setValue(this.data)
    this.render()

    // this.data[groupIndex].push(newItem)

    // this.data[groupIndex].splice(rowIndex, 1)

    // this.render()
    // this.signinService.setValue(this.data)
  }

   extractOrdenFirma(toAvoid: number): number[] {
    let result = new Set<number>()
    
    this.data.forEach(innerArray => {
        innerArray.forEach(obj => {
          if(obj.ordenFirma !== toAvoid) {
            result.add(obj.ordenFirma);
          }
        });
    });
    
    const array = Array.from(result);

    this.filteredOrdenFirmas = array;
    console.log(array)
    return array;
}


  drop(event: CdkDragDrop<string[]>): void {
    console.log('Antes de arrastrar:', this.data)
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);

    this.render()

    console.log('Despues de arrastrar:', this.data)


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

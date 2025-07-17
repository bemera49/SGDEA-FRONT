import { Injectable } from '@angular/core';
import { IUsuarioFirma } from '@app/modules/components/draggable-table-copy/draggable-table-copy.component';
import { BehaviorSubject, Observable, map, } from 'rxjs';
import { IUsuarioFirmaTabla } from './signature-edit.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestService } from '@app/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SignatureEditService {

 // El arreglo original es un BehaviorSubject para poder emitir cambios
 public originalArraySubject = new BehaviorSubject<IUsuarioFirma[]>([]);
 public  sortedGroupedArraySubject = new BehaviorSubject<IUsuarioFirma[][][]>([[], [], []]);

 originalArray$ = this.originalArraySubject.asObservable();
 sortedGroupedArray$ = this.sortedGroupedArraySubject.asObservable();


 constructor(
  public http$: HttpClient,
  public rest$: RestService,
 ) {
  this.originalArray$.pipe(
    map(array => 
      this.groupAndSort(array)
    )
  ).subscribe(groupedArray => {
    this.sortedGroupedArraySubject.next(groupedArray);
    
  });
 }

 setInitialArray(initialArray: IUsuarioFirma[]): void {
  this.originalArraySubject.next(initialArray);
}


 // Método para agregar un nuevo objeto al arreglo original
 addUsuarioFirma(nuevoUsuarioFirma: any, tabIndex: number): void {
   const currentArray = this.originalArraySubject.getValue();
   this.render()
   this.originalArraySubject.next([...currentArray, nuevoUsuarioFirma]);
   console.log(this.originalArraySubject.getValue())
   console.log(this.sortedGroupedArraySubject.getValue())
 }

 // Método para eliminar un objeto del arreglo original por ID
 removeUsuarioFirma(id: number): void {
   const currentArray = this.originalArraySubject.getValue();
   const updatedArray = currentArray.filter(item => item.id !== id);
   this.originalArraySubject.next(updatedArray);
   
 }

 updateOrdenFirma(item: any, newOrdenFirma: number) {
  const currentArray = this.originalArraySubject.getValue().filter(el => el.name !== item.name);
  const itemToAdd = this.originalArraySubject.getValue().find(el => el.name === item.name)
  
  itemToAdd.posicion = newOrdenFirma;

  this.originalArraySubject.next([...currentArray, itemToAdd])

  console.log(this.sortedGroupedArraySubject.getValue())

 }

 // Método para actualizar un objeto en el arreglo original por ID
 updateUsuarioFirma(updatedUsuarioFirma: IUsuarioFirma): void {
   const currentArray = this.originalArraySubject.getValue();
   const updatedArray = currentArray.map(item =>
     item.id === updatedUsuarioFirma.id ? updatedUsuarioFirma : item
   );
   this.originalArraySubject.next(updatedArray);
 }
 private groupAndSort(array: IUsuarioFirma[]): IUsuarioFirma[][][] {
  // Inicializamos el objeto para agrupar por tipo de participante
  const groupedByParticipant: { [key: number]: { [key: number]: IUsuarioFirma[] } } = {
    1: {},
    2: {},
    3: {}
  };

  // Agrupamos los elementos primero por 'tipo_participante_id' y luego por 'posicion'
  array.forEach(item => {
    const participantKey = item.tipo_participante_id;  // La clave del grupo es el tipo de participante
    const posicionKey = item.posicion;  // La clave del subgrupo es la posición

    // Si no existe el grupo para este tipo de participante, lo inicializamos como un objeto
    if (!groupedByParticipant[participantKey]) {
      groupedByParticipant[participantKey] = {};
    }

    // Si no existe un subgrupo para esta posición, lo inicializamos como un arreglo
    if (!groupedByParticipant[participantKey][posicionKey]) {
      groupedByParticipant[participantKey][posicionKey] = [];
    }

    // Añadimos el item al arreglo del subgrupo correspondiente
    groupedByParticipant[participantKey][posicionKey].push(item);
  });

  // Convertimos el objeto de grupos a un arreglo para su renderización
  const matrizDeArreglos = Object.keys(groupedByParticipant).map(participantId => {
    const groupedByPosition = groupedByParticipant[+participantId];
    
    // Convertimos las posiciones en un arreglo
    return Object.keys(groupedByPosition).map(posicion => {
      const subGroup = groupedByPosition[+posicion];
      return subGroup;  // Devolvemos el subgrupo como un arreglo
    });
  });

  matrizDeArreglos.forEach((groupParticipant: IUsuarioFirma[][]) => {
    groupParticipant.forEach((positionGroup: IUsuarioFirma[], groupParticipantindex) => {
      positionGroup.forEach((item: IUsuarioFirma) => {
        item.posicion = groupParticipantindex + 1;
      })
    })
  })


  console.log("Matriz de arreglos de arreglos:", matrizDeArreglos);

  
  return matrizDeArreglos;  
}

updateSortedGroup(arr: IUsuarioFirma[][][]): void {
  this.sortedGroupedArraySubject.next(arr)
  this.render()
}

render(): void {
  // Reasignar las posiciones dentro del arreglo agrupado
  
let newSortedGroup = this.sortedGroupedArraySubject.getValue()

  newSortedGroup.forEach(groupParticipant => {
    groupParticipant.forEach((subgrupo, subgrupoIndex) => {
      subgrupo.forEach(item => {
        item.posicion = subgrupoIndex + 1;  // Actualiza la posición
      });
    });
  });

  // Actualiza el sortedGroupSubject con las nuevas posiciones reasignadas
  this.sortedGroupedArraySubject.next(newSortedGroup);
}

public editSignature(idRadicado: any, body: any): any {

  const userData = this.rest$.getUserData();

  let httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + userData.accessToken,

    }),
  }
  return this.http$.put(`${environment.apiUrlBasePath}api/flujo/radicado/editar/${idRadicado}/${userData.idDataCliente}/${userData.dependencia.idGdTrdDependencia}`, body, httpOptions);
}

 // Método general para agrupar por una propiedad
 private groupBy(array: IUsuarioFirma[], property: string): IUsuarioFirma[][] {
   const groupedResult: { [key: string]: IUsuarioFirma[] } = {};
   
   array.forEach(item => {
     const key = item[property];
     if (!groupedResult[key]) {
       groupedResult[key] = [];
     }
     groupedResult[key].push(item);
   });

   return Object.values(groupedResult);
 }
}

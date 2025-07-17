import { Injectable } from '@angular/core';
import { DocumentDetail, SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { BehaviorSubject } from 'rxjs';
import { Tree, TreeDocument, TreeSubprocess } from './interface/tree-process';

@Injectable({
  providedIn: 'root'
})

export class TreeProcessService {

  private tree$ = new BehaviorSubject<Tree[]>([]);
  private treeSubProcess$ = new BehaviorSubject<TreeSubprocess[]>([]);
  private treeDocuments$ = new BehaviorSubject<TreeDocument[]>([]);

  /** 
   * @description Permite cerrar todo los items .
   */

  closetItems(): void {
    const resetItems = this.tree$.value.map(tree => ({
      expanded: false,
      subProcess: tree.subProcess
    }))

    this.setTree(resetItems);
  }



  private removeTheFirstElement(): TreeSubprocess[] {
    return this.returnSubProcess().slice(1);
  }

  /** 
   * @description Permite inicializar los items cerrados , menos el primero que permanecerá abierto.
   */

  initItems(): void {

    const INIT_DATA_TREE = this.removeTheFirstElement();

    this.tree$.next(INIT_DATA_TREE.map((sub) => ({
      expanded: false,
      subProcess: sub
    })))
  }

  setAdapter(subProcess: SubprocessDetail[]): void {
    this.adapterSubProcess(subProcess);
    this.initItems();
  }

  setTree(tree: Tree[]): void {
    this.tree$.next(tree);
  }

  /**
   * @param {Subprocess[]} subProcess 
   * @description Permite adaptar  el modelo del sub proceso de la API para renderizarlo en el arbol.
   */

  private adapterSubProcess(subProcess: SubprocessDetail[]): void {

    const newSubProcess: TreeSubprocess[] = subProcess.map(sub => {
      this.adapterDocuments(sub.documents);
      return {
        ...sub,
        documents: this.returnDocuments()
      }
    })


    this.treeSubProcess$.next(newSubProcess);

  }

  /**
   * @param {Document[]} document 
   * @description @description Permite adaptar el modelo de los documentos de la API para renderizarlo en el árbol.
   */

  private adapterDocuments(document: DocumentDetail[]): void {

    const documentTree: TreeDocument[] = document.map(doc => ({
      expanded: false,
      documents: doc
    }));


    this.treeDocuments$.next(documentTree);
  }



  private returnSubProcess(): TreeSubprocess[] {
    return this.treeSubProcess$.value;
  }

  returnDocuments(): TreeDocument[] {
    return this.treeDocuments$.value
  }


  getTree(): Tree[] {
    return this.tree$.value;
  }



}

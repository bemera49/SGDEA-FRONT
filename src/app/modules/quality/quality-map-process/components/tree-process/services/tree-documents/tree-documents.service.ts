import { Injectable } from '@angular/core';
import { DocumentDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { BehaviorSubject } from 'rxjs';
import { DocumentTree } from '../tree-process/interface/tree-process';

@Injectable({
  providedIn: 'root'
})
export class TreeDocumentsService {

  private treeDocuments$ = new BehaviorSubject<DocumentTree[]>([]);

  transformDocuments(doc: DocumentDetail[]): void {
    const newDocs: DocumentTree[] = doc.map(item => (
      {
        expanden: false,
        documents: item
      }
    ))
    this.setDocumentsTree(newDocs);
  }

  setDocumentsTree(doc: DocumentTree[]): void {
    this.treeDocuments$.next(doc);
  }

  getDocumentsTree(): DocumentTree[] {
    return this.treeDocuments$.value;
  }

}

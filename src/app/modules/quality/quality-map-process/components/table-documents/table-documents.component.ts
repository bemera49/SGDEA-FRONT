import { Component, Input } from '@angular/core';
import { tablenode } from '@app/modules/quality/quality-process-map/quality-process-detail/interfaces/Processnode';

@Component({
  selector: 'app-table-documents',
  templateUrl: './table-documents.component.html',
  styleUrls: ['./table-documents.component.css']
})
export class TableDocumentsComponent {
  fullscreen: string = 'fullscreen'
  @Input() data: tablenode[] = [];

  getStepDocuments(id: number): void {

  }
}

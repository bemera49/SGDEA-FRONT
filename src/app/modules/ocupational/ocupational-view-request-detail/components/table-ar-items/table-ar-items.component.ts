import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Items } from './interface/items';

@Component({
  selector: 'app-table-ar-items',
  templateUrl: './table-ar-items.component.html',
  styleUrls: ['./table-ar-items.component.css']
})
export class TableARItemsComponent {
  @Input() headersItems: Items[] = [];
  @Output() addItems = new EventEmitter<void>();


  onAddItem(): void {
    this.addItems.emit();
  }

}

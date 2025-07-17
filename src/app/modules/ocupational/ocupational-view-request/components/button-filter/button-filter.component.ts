import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.css']
})
export class ButtonFilterComponent {
  @Output() onClick = new EventEmitter<void>();

  onFilter(): void {
    this.onClick.emit();
  }
}

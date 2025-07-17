import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-clear',
  templateUrl: './button-clear.component.html',
  styleUrls: ['./button-clear.component.css']
})
export class ButtonClearComponent {
  @Output() onClick = new EventEmitter<void>();

  onClear(): void {
    this.onClick.emit();
  }

}

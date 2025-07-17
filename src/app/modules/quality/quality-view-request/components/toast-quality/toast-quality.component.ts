import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast-quality',
  templateUrl: './toast-quality.component.html',
  styleUrls: ['./toast-quality.component.css']
})
export class ToastQualityComponent {
  @Input() count!: number;
  @Input() visibility: boolean;
  @Output() onVisibility = new EventEmitter();

  onAction(): void {
    this.onVisibility.emit();
  }
}

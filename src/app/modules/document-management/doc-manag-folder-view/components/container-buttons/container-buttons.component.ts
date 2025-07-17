import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-container-buttons',
  templateUrl: './container-buttons.component.html',
  styleUrls: ['./container-buttons.component.css']
})
export class ContainerButtonsComponent {
  
  @Input() firstTexto: string;
  @Input() secondTexto: string;

  @Output() fistEvent = new EventEmitter<void>();
  @Output() secondEvent = new EventEmitter<void>();

  onFistEvent(): void {
    this.fistEvent.emit();
  }

  onSecondEvent(): void {
    this.secondEvent.emit();
  }

}

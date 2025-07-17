import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QualityDetailsService } from 'src/app/services/quality-details/quality-details.service';

@Component({
  selector: 'app-quality-details-process-map',
  templateUrl: './quality-details-process-map.component.html',
  styleUrls: ['./quality-details-process-map.component.css']
})

export class QualityDetailsProcessMapComponent {
  @Input() cardData: any[] = [];
  @Output() onSaveChanges = new EventEmitter<any[]>();
  isEditing: boolean = false;

  constructor(private qualityDetailsService: QualityDetailsService) {}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    this.onSaveChanges.emit(this.cardData);
    this.toggleEdit();
  }
}

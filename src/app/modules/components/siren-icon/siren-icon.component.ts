import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-siren-icon',
  templateUrl: './siren-icon.component.html',
  styleUrls: ['./siren-icon.component.css']
})
export class SirenIconComponent implements OnChanges {
  @Input() inicio!: string;
  @Input() fin!: string;
  color: string = '#000000';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inicio || changes.fin) {
      this.updateColor();
    }
  }

  private updateColor(): void {
    const inicioDate = moment(new Date(this.inicio), 'DD/MM/YYYY HH:mm:ss').toDate();
    const finDate = moment(new Date(this.fin), 'DD/MM/YYYY HH:mm:ss').toDate();
    const now = moment(new Date(), 'DD/MM/YYYY HH:mm:ss').toDate();

    const totalDuration = finDate.getTime() - inicioDate.getTime();
    const timeElapsed = now.getTime() - inicioDate.getTime();

    const diffFinPercentage = Math.floor((timeElapsed / totalDuration) * 100);
    if (diffFinPercentage >= 63) {
      // rojo
      this.color = '#FF0000';
    } else if (diffFinPercentage > 33) {
      // amarillo
      this.color = '#FFFF00';
    } else {
      // verde
      this.color = '#00FF00';
    }
  }

}

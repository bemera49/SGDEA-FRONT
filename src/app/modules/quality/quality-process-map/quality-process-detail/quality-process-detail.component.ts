import { Component } from '@angular/core';
import { ProcesoDetallesService } from './services/proceso-detalles.service';

@Component({
  selector: 'app-quality-process-detail',
  templateUrl: './quality-process-detail.component.html',
  styleUrls: ['./quality-process-detail.component.css']
})
export class QualityProcessDetailComponent {
  mostrarPantallaB: boolean = true;
  constructor(private procesoDetallesService: ProcesoDetallesService) { }


  togglePantallaB() {
    this.mostrarPantallaB = !this.mostrarPantallaB;
  }

}
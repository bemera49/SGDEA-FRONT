import { Component, OnDestroy, OnInit } from "@angular/core";
import { QualityDetailsService } from "@app/services/quality-details/quality-details.service";
import { Items } from "../quality-main/components/sub-menu-quality/items";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { ProcesoDetallesService } from "./quality-process-detail/services/proceso-detalles.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-quality-process-map',
  templateUrl: './quality-process-map.component.html',
  styleUrls: ['./quality-process-map.component.css']
})

export class QualityProcessMapComponent implements OnInit, OnDestroy {
  private mapDetailsSubscription: Subscription
  //nuevo submenu
  items: Items[] = [{
    link: 'quality-process-map',
    text: 'Mapa proceso'
  }]

  private urlBase = environment.apiUrl;
  mapShowData: any;
  descriptionMap: any;
  nameMap: any;
  imageMap: any;
  listProcess: any;
  //variables de iconos
  ChevronLeft: string = 'arrow_back_ios';

  arrayProcess: any[] = [
    { id: 1, nombre: 'Direccionamiento Estratégico y Planeación', coords: '380,57,465,110', shape: 'rect' },
    { id: 2, nombre: 'Evaluación Independiente', coords: '756,828,409,798', shape: 'rect' },
    { id: 3, nombre: 'Gestión Ambiental', coords: '173,372,233,416', shape: 'rect' },
    { id: 4, nombre: 'Gestión Comercial', coords: '718,240,777,280', shape: 'rect' },
    { id: 6, nombre: 'Gestión de Comunicaciones', coords: '568,57,645,100', shape: 'rect' },
    { id: 12, nombre: 'Gestión del Talento Humano', coords: '715,57,795,100', shape: 'rect' },
    { id: 7, nombre: 'GESTIÓN DE MANTENIMIENTO, CALIBRACIÓN, HIDROMETEREOLOGÍA Y ENSAYO', coords: '477,541,376,489', shape: 'rect' },
    { id: 5, nombre: 'Gestión Contractual', coords: '449,721,33', shape: 'circle' },
    { id: 9, nombre: 'Gestión de Servicios Administrativos', coords: '365,675,33', shape: 'circle' },
    { id: 10, nombre: 'Gestión de TIC', coords: '699,676,33', shape: 'circle' },
    { id: 11, nombre: 'Gestión del Conocimiento e Innovación', coords: '285,721,33', shape: 'circle' },
    { id: 13, nombre: 'Gestión Documental', coords: '532,673,33', shape: 'circle' },
    { id: 14, nombre: 'Gestión Financiera', coords: '615,722,33', shape: 'circle' },
    { id: 15, nombre: 'Gestión Jurídica', coords: '199,676,33', shape: 'circle' },
    { id: 16, nombre: 'Gestión Predial', coords: '778,723,33', shape: 'circle' },
    { id: 17, nombre: 'Gestión Social', coords: '206,270,253,313', shape: 'rect' },
    { id: 18, nombre: 'Servicio Acueducto', coords: '500,281,438,240', shape: 'rect' },
    { id: 19, nombre: 'Servicio Alcantarillado Sanitario y Pluvial', coords: '593,552,693,605', shape: 'rect' }
  ];


  constructor(
    private mapShowServices: QualityDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private procesoDetallesService: ProcesoDetallesService
  ) {
    this.imageMap = `${this.urlBase}sgc/images/mapas/default.png`
  }

  ngOnInit() {
    this.getProcessMap();
  }

  getProcessMap() {
    this.mapDetailsSubscription = this.mapShowServices.MapDetails().subscribe({
      next: (res) => {
        if (res.data.length >= 1) {
          //this.imageMap = 'https://139.177.195.95/sgc/images/mapas/default.png';
          this.nameMap = res.data[0].name;
          this.descriptionMap = res.data[0].description;
          this.listProcess = res.data[0].processes; //Reemplazar el array arrayProcess por listProcess cuando el end point funcione correctamente.
        }
      },
      error: (error) => {
        console.error('Error getProcessMap:', error);
      }
    })
  }

  clickInMapForSendDataProcess(nombre: string) {
    var dataMapProcess = this.arrayProcess.filter(res => res['nombre'] === nombre)
    this.router.navigate(['/quality/quality-process-map/', dataMapProcess[0].id]);
  }
  ngOnDestroy(): void {
    if (this.mapDetailsSubscription) {
      this.mapDetailsSubscription.unsubscribe()
    }
  }
}


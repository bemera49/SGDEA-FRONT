/**
 * @description Bibliotecas y dependencias
 */
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @description Modelos
 */
import { Semaforo } from './request-element';

/**
 * @description Servicios generales
 */
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { JuridicalService } from '../../../../../services/juridical/juridical.service'
import { AuthService } from '@app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.css']
})
export class TableRequestComponent implements OnInit {

  colorSemaforo = Semaforo;
  RequestReceived: any[] = [];
  public itemsPerDefault: number = 5;
  notificationsList: any
  hashLocalStorage: any;


  constructor(
    private paginationService: PaginationServiceService,
    public router: Router,
    public juridicalServices: JuridicalService,
    private authService: AuthService,
  ) { 
    this.hashLocalStorage = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
    //console.log(this.hashLocalStorage.data.data[0]);
    //console.log(this.hashLocalStorage.data)
  }

  ngOnInit(): void {
    this.getRequetsList();
    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.RequestReceived = res
        //console.log(this.RequestReceived);
      }
    })
  }

  //Al momento de hacer la integración solo se modifica este metodo!!!!
  getRequetsList(): void {
    this.juridicalServices.getRadicados(this.hashLocalStorage.data.idDataCliente)
    .subscribe({
      next: (res:any) => {
        this.notificationsList = res.data.asignaciones.map((asignacion: any) => {
          return {
            ...asignacion,
            nomProfesional: this.hashLocalStorage.data.Rol.nombreRol
          };
        });
        this.paginationService.setTotalItems(this.notificationsList)
      }, error: (error) => {
        console.log('getRequetsList error', error)
      }
    })

  }


  refreshTaskReceived() {
    this.getRequetsList();
  }

  getColorClass(semaforo: string): string {
    switch (semaforo) {
      case this.colorSemaforo.AMARILLO:
        return 'amarillo';
      case this.colorSemaforo.ROJO:
        return 'rojo';
      case this.colorSemaforo.VERDE:
        return 'verde';
      default:
        return '';
    }
  }

  redirectDetailRequest(id_request: number) {
    this.router.navigate(['/juridica/detail-request/', id_request]);
  }

}

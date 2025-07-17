import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { PlantillaShowAclarationService } from '@app/modules/ocupational/ocupational-view-notification-detail/components/list-aclaration/services/plantilla-show-aclaration.service';
import { RestService } from '@app/services/rest.service';
import { saveAs } from 'file-saver';
import { Items } from "../../../ocupational-main/components/sub-menu-ocupational/items";
import { ListFile, file } from './Interfaces/list-aclaration';

@Component({
  selector: 'app-list-aclaration',
  templateUrl: './list-aclaration.component.html',
  styleUrls: ['./list-aclaration.component.css']
})
export class ListAclarationComponent implements OnInit {
  private datosShow: any;

  @Input() idRequest: number = 0;

  //nuevo submenu
  items: Items[] = [{
    link: 'list-file',
    text: 'Plantilla de documentos'
  }]
  breadcrumbRouteActive = "Plantilla de documentos";
  ChevronLeft: string = 'arrow_back_ios';
  Excel: string = 'assets/img/logos/excel-icon.svg';
  Word: string = 'note'
  pruebaVariable: string;
  buttondowload: boolean = false;

  constructor(
    private plantillaShowService: PlantillaShowAclarationService,
    private rest: RestService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.obtenerDatosDeLaAPI();
    /*     console.log('token', this.rest.getUserData()) */
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idRequest']) {
      console.log('Nuevo valor para idRequest:', this.idRequest);
      this.obtenerDatosDeLaAPI();
    }
  }


  obtenerDatosDeLaAPI() {
    const valueForm: ListFile = {
      request_id: this.idRequest,
    };

    this.plantillaShowService.obtenerDatos(valueForm).subscribe(response => {
      this.datosShow = response.data;
    }, error => {
      console.error('Error al obtener datos de la API:', error);
    });
  }
  getDatosShow() {
    return this.datosShow;
  }
  procesarNombres(datosApi: any[]): any[] {
    return datosApi.map(documento => {
      let nombreModificado = '';
      // Determina si el nombre contiene la palabra "Procedimiento"
      if (documento.name.includes('Procedimiento')) {
        nombreModificado = 'Procedimiento';
      }
      // Determina si el nombre contiene la palabra "Instructivo" o "Instrucciones"
      else if (documento.name.match(/Instructivo|Instrucciones/)) {
        nombreModificado = 'Instructivo';
      }
      else if (documento.name.includes('Caracterizacion')) {
        nombreModificado = 'Caracterización';
      }
      return {
        ...documento,
        name: nombreModificado
      };
    });
  }

  openAcceptModal(paragraph: string): void {
    const dialogRef = this.dialog.open(ModalAcceptComponent, {
      width: '50%',
      data: { paragraph: paragraph }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  descargarDocumento(id: number, original_name: string) {
    console.log("antes de descargar documentos: " + id)
    this.plantillaShowService.descargarArchivo(id.toString()).subscribe((data: Blob) => {
      console.log('respuesta blob:', data)
      const nombreArchivo = original_name;
      saveAs(data, nombreArchivo);
      this.openAcceptModal('012. Descarga Exitosa.');
    }, error => {
      this.openAcceptModal('003.Error del sistema.');
    });
  }

  
}

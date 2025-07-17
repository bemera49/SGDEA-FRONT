import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { PlantillaShowService } from '@app/modules/ocupational/ocupational-view-request-detail/components/list-file/services/plantilla-show.service';
import { RestService } from '@app/services/rest.service';
import { saveAs } from 'file-saver';
import { Items } from "../../../ocupational-main/components/sub-menu-ocupational/items";
import { ListFile, file } from './Interfaces/list-file';

@Component({
  selector: 'app-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.css']
})
export class ListFileComponent implements OnInit {
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
    private plantillaShowService: PlantillaShowService,
    private rest: RestService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obtenerDatosDeLaAPI();
    /*     console.log('token', this.rest.getUserData()) */
  }


  obtenerDatosDeLaAPI() {
    const valueForm: ListFile = {
      request_id: this.idRequest,

    };

    console.log(this.idRequest)

    this.plantillaShowService.obtenerDatos(valueForm).subscribe(response => {
      this.datosShow = this.procesarNombres(response.data);
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

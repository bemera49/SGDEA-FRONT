import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { PlantillaShowService } from '@app/services/quality/quality-plantilla/plantilla-show.service';
import { RestService } from '@app/services/rest.service';
import { saveAs } from 'file-saver';
import { Items } from "../quality-main/components/sub-menu-quality/items";
@Component({
  selector: 'app-quality-download-template',
  templateUrl: './quality-download-template.component.html',
  styleUrls: ['./quality-download-template.component.css']
})
export class QualityDownloadTemplateComponent implements OnInit {
  private datosShow: any;
  //nuevo submenu
  items: Items[] = [{
    link: 'quality-download-template',
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
    this.plantillaShowService.obtenerDatos().subscribe(response => {
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

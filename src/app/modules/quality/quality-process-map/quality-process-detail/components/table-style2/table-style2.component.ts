import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcceptComponent } from '@app/modules/components/modal-accept/modal-accept.component';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { RestService } from '@app/services/rest.service';
import { saveAs } from 'file-saver';
import { ProcesoDetallesService } from '../../services/proceso-detalles.service';
interface RowEventData {
  id: number;
  isCharacterization: boolean;
}
@Component({
  selector: 'app-table-style2',
  templateUrl: './table-style2.component.html',
  styleUrls: ['./table-style2.component.css']
})
export class TableStyle2Component implements OnInit, OnChanges {
  rows: any[] = [];
  tablaprocedimiento: boolean = false;
  @Input() characterization
  @Input() tableType: string = '';
  @Output() rowClicked: EventEmitter<number> = new EventEmitter<number>();
  Excel: string = 'assets/img/logos/excel-icon.svg';
  // Agrega más iconos para otras extensiones si es necesario
  extensionIcons: { [extension: string]: string } = {
    '.xlsx': 'assets/img/logos/excel-icon.svg',
    '.docx': 'assets/img/logos/word-icon.svg',
    '.pdf': 'assets/img/logos/pdf-icon.svg',
    // Agrega más extensiones y sus respectivos iconos aquí
  };
  fullscreen: string = 'fullscreen';
  download: string = 'file_download';
  //variables de flujo
  diagramdata: any = null
  characterizationcopy: any
  DiagramView: boolean = false
  characterizationvision: any = null

  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private servicesdownloadfile: QualityDetailsService,
    private dialog: MatDialog,
    private rest: RestService,

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTableStyle2()
  }

  ngOnInit(): void {
  }

  private initTableStyle2() {
    if (this.tableType === 'characterization') {
      this.initDate();
    } else if (this.tableType === 'Documents') {
      this.DateFile();
    }
  }

  private DateFile(): void {
    this.rows = [];
    if (this.characterization && this.characterization.files) {
      const item = this.characterization.files;
      this.rows.push({ name: item.name, ID: item.id, extesion: item.extesion, original_name: item.original_name })
    }
  }


  private initDate(): void {
    this.rows = [];
    if (this.characterization && this.characterization.files) {
      this.characterizationcopy = { ...this.characterization }
      this.characterizationvision = { ...this.characterization }
      this.validateDiagramExtension(this.characterizationvision.files)
      const item = this.characterizationcopy.files.find(file => file.extesión !== 'vsdx');
      // Agregamos los datos necesarios, sin la versión primero
      this.rows.push({
        name: item.name,
        ID: item.id,
        extesion: item.extesion,
        original_name: item.original_name
      });
      // Luego agregamos la versión
      if (this.characterization.version) {
        // Si la versión existe en characterization, la agregamos al último objeto agregado a this.rows
        const version = this.characterization.version;
        this.rows[this.rows.length - 1].version = version;
        /*             console.log("datos rows:", this.rows) */
      } else {
        // Si la versión no está definida en characterization, podrías manejar este caso o simplemente no hacer nada
        console.log("No se encontró versión en characterization.");
      }
    } else {
      // Hacer algo si no hay archivos
      console.log("No hay archivos o la propiedad files no está definida en el objeto characterization.");
    }
  }

  // funcion para verificar si tiene visión
  private validateDiagramExtension(files: any): void {
    this.diagramdata = files.find(file => file.extesion.toLowerCase() === 'vsdx');
    if (this.diagramdata) {
      this.DiagramView = true
    } else {
      this.DiagramView = false
    }
  }




  toggleMostrarTabla() {
    this.tablaprocedimiento = !this.tablaprocedimiento;
  }

  onRowClicked(id: number): void {

    this.rowClicked.emit(id);
    this.procesoDetallesService.setDocumentById(id);
    this.procesoDetallesService.setSelectedCharacterizationId(id);
  }

  cleanName(name: string, code: string): string {
    // Asegúrate de que 'name' sea una cadena antes de proceder
    if (typeof name !== 'string') {
      console.error('cleanName fue llamado con un valor no válido:', name);
      return ''; // Retorna una cadena vacía o maneja el error como prefieras
    }
    // Reemplaza los guiones bajos por espacios
    let cleanedName = name.replace(/_/g, ' ');

    // Si el nombre empieza con el código, lo elimina
    if (cleanedName.startsWith(code)) {
      cleanedName = cleanedName.replace(code, '').trim();
    }
    // Elimina cualquier contenido entre paréntesis junto con los paréntesis
    cleanedName = cleanedName.replace(/\s*\(.*?\)\s*/g, '').trim();
    // Elimina cualquier extensión de archivo al final del nombre
    const extensionIndex = cleanedName.lastIndexOf('.');
    if (extensionIndex > -1) {
      cleanedName = cleanedName.substring(0, extensionIndex);
    }
    return cleanedName;
  }


  descargarDocumento(id: number, original_name: string) {
    this.servicesdownloadfile.descargarArchivo(id.toString()).subscribe((data: Blob) => {
      const nombreArchivo = original_name;
      saveAs(data, nombreArchivo);
      this.openAcceptModal('012. Descarga Exitosa.');
    }, error => {
      this.openAcceptModal('003.Error del sistema.');
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

}



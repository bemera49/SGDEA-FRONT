import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { tablenode } from '../../interfaces/Processnode';
import { ProcesoDetallesService } from '../../services/proceso-detalles.service';
@Component({
  selector: 'app-table-style3',
  templateUrl: './table-style3.component.html',
  styleUrls: ['./table-style3.component.css']
})
export class TableStyle3Component implements OnInit, OnChanges {
  //variables de flujo
  rows: any[] = []
  pro: unknown[] = [];

  selectindex: number = 0
  valueselectDocument: number
  //variables de iconos
  fullscreen: string = 'fullscreen'
  download: string = 'file_download'
  checked: boolean[] = [];
  itemsPerDefault: number = 5;

  @Input() documents: any = []
  @Input() procedimento: tablenode[] = []
  @Input() tableType: string = ''
  @Output() downloadClicked = new EventEmitter<{ id: number, original_name: string }>();

  private pag = inject(PaginationServiceService);

  constructor(private procesoDetallesService: ProcesoDetallesService, private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.initDate();
  }

  ngOnInit(): void {
    /* if (this.tableType === "Procedimientosstep2") {
      this.initDateStep() 
    } */

    /* this.pag.getItems().subscribe(item => {
      if (item) {
        this.pro = item ? item : [];
        console.log('item', item)
      }
    }) */
  }

  private initDateStep(): void {
    this.rows = [];

    if (this.documents && this.documents.length > 0) { // Debe ser "> 0"
      this.documents.forEach(item => {
        this.rows.push({
          id: item.id, name: item.name, code: item.code,
          type: item.documental, subtitle: item.subtitle,
          version: item.version, fileId: item.fileId
        });
        this.selectitem(this.selectindex)

      });
    }
  }

  initDate(): void {
    if (this.tableType === 'subproceso') {
      this.pro = this.procedimento;

      /*  this.pag.setTotalItems(this.procedimento); */
    }
  }

  //función de limpiar el nombre del codigo si este esta con el mismo y limita la presentación
  cleanName(name: string, code: string): string {
    let cleanedName = name;
    if (name.startsWith(code)) {
      cleanedName = name.replace(code, '').trim();
    }
    if (this.tableType === 'Procedimientosstep2') {
      // Trunca el nombre a 25 caracteres si es más largo
      const maxLength = 19;
      if (cleanedName.length > maxLength) {
        return cleanedName.substring(0, maxLength) + '.';
      }
    }
    return cleanedName;
  }

  //metodo anterior de redirección de la tabla proximo a cambiar por un output
  getStep(id, step): number {

    if (this.tableType === 'subproceso') {
      step = 2
      this.procesoDetallesService.setIsCharacterizationSelected(false)
      this.procesoDetallesService.setSubprocessById(id);
      this.procesoDetallesService.setbyidrouterstep(step);
      return;
    } else if (this.tableType === 'Procedimientos') {
      console.log('entre en Procedimientos');
      step = 3
      this.procesoDetallesService.setDocumentById(id);
      this.procesoDetallesService.setbyidrouterstep(step);
    }
  }
  // información  de la fila seleccionada de la tabla
  handleRowClick(row: any, i: number): void {
    this.selectitem(i)
    this.getFile(row.id, row.fileId)
  }

  //función al oprimir el boton descargar de la tabla
  DownloadClick(id: number, original_name: string) {
    this.downloadClicked.emit({ id, original_name });
  }

  //Función que limita el texto presentado de la tabla
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '.';
    }
    return text;
  }
  //envia el id del documento y archivo seleccionado con tiempo de demora por si tiene vision
  private getFile(id: number, fileId: number): void {
    this.procesoDetallesService.setDocumentById(id);
    setTimeout(() => {
      this.procesoDetallesService.setFileId(fileId);
    }, 3)
  }

  private selectitem(i: number) {
    this.checked.fill(false)
    this.checked[i] = true

  }

  refreshTaskReceived(): void {
    this.initDateStep();
  }

}
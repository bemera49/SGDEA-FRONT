
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProcesoDetallesService } from '../../services/proceso-detalles.service';

@Component({
  selector: 'app-tree-process',
  templateUrl: './tree-process.component.html',
  styleUrls: ['./tree-process.component.css']
})

export class TreeProcessComponent implements OnInit {
  @Input() datosTree: any;
  @Input() canExpand: boolean;
  @Output() subprocesoExpandio = new EventEmitter<any>();
  expand_more: string = 'expand_more'
  keyboard_return: string = 'keyboard_return'

  constructor(private procesoDetallesService: ProcesoDetallesService) {
    this.datosTree = []
  }

  ngOnInit(): void {
    this.seleccionarPrimerElemento();
  }

  private seleccionarPrimerElemento(): void {
    if (this.datosTree.length > 0) {
      const primerItem = this.datosTree[0];
      this.procesoDetallesService.setFileId(primerItem["id"]);
    }
  }

  //función limpia nombres
  cleanName(name: string, code: string): string {
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



  toggleExpandedAccordion(event: Event, item: any): void {

    // Si es un Subprocess
    if ('documents' in item) {

      const subprocessItem = item;
      subprocessItem.expanded = !subprocessItem.expanded;
      this.procesoDetallesService.setsubprocesOrProcedure(false)// siempre es falso para mostrar subproceso

      // Si se expande un Subprocess, colapsar todos los demás Subprocess
      if (subprocessItem.expanded) {
        this.datosTree.forEach(subprocess => {
          if (subprocess !== subprocessItem) {
            subprocess.expanded = false;
          }
        });
      }
    }

    // Si es un Document
    if ('files' in item) {
      const documentItem = item;
      documentItem.expanded = !documentItem.expanded;
      this.procesoDetallesService.setsubprocesOrProcedure(documentItem.expanded);
      // Si se expande un Document, colapsar todos los demás Documents dentro del mismo Subprocess
      if (documentItem.expanded) {
        this.datosTree.forEach(subprocess => {
          subprocess.documents.forEach(document => {
            if (document !== documentItem) {
              document.expanded = false;
              this.procesoDetallesService.setsubprocesOrProcedure(documentItem.expanded);
            }
          });
        });
      }
    }

    this.subprocesoExpandio.emit(item);
    this.setIdForTree(item);
  }

  //variables publicas para reiniciarlas.
  public subprocessItem: []
  public documentItem: []
  public fileItem: []

  setIdForTree = (item) => {
    this.subprocessItem = []
    this.documentItem = []
    this.fileItem = []
    // Finalmente, envía los datos al servicio según corresponda
    if ('documents' in item && item.expanded) {
      this.subprocessItem = item;
      this.procesoDetallesService.setSubprocessById(this.subprocessItem['id']);
    } else if ('files' in item && item.expanded) {
      this.documentItem = item;
      this.fileItem = item.files
      this.procesoDetallesService.setDocumentById(this.documentItem['id'])
      this.procesoDetallesService.setFileId(this.fileItem['id']);
    }
  }


}

import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-header-process-map',
  templateUrl: './header-process-map.component.html',
  styleUrls: ['./header-process-map.component.css']
})

export class HeaderProcessMapComponent {
  @Input() Procedure: any
  @Input() filebyId: any
  @Input() typeheader: string
  @Input() data: any
  @Input() stepReturn: boolean
  @Input() isCharacterization: boolean
  @Input() diagramView: boolean
  @Input() diagramData: any
  @Output() requestModification = new EventEmitter<void>();
  @Output() gostep = new EventEmitter<{ id: number, step: number }>();
  @Output() getreturnStep = new EventEmitter<number>();
  @Output() descargarDocumento = new EventEmitter<{ id: number, name: string }>();
  @Output() visio = new EventEmitter<void>();

  //variables de iconos
  fullscreen: string = 'fullscreen'
  account_tree: string = 'account_tree'
  Info: string = 'info'
  download: string = 'file_download'
  edit: string = 'edit'
  close_fullscreen: string = 'close_fullscreen'
  //variables de flujo
  subprocesOrProcedure: boolean = false
  datoSubproces: any
  mostrarDescripcion: boolean = true
  currentStep: number
  selectedId: number


  constructor(
  ) { }



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

  onGoStep(id: number, step: number) {
    this.gostep.emit({ id, step });
  }

  ongetreturnStep(step: number) {
    this.getreturnStep.emit(step);
  }

  onDescargarDocumento(id: number, name: string) {
    this.descargarDocumento.emit({ id, name });
  }

}

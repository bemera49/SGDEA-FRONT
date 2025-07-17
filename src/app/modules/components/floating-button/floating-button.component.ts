/**

 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  /**
   * Configuraciones para el botón flotante
   *
   * Estilo para el botón, json abierto a css
   */
  public spin: boolean = true;
  public direction = 'up';
  public animationMode = 'fling';
  @Input() textBtn: string = '';
  @Input() styleButtonFloat: any = {
    'right': '30px',
    'z-index': 10000,
    'position': 'fixed',
    'bottom': '15px',
    'color': 'red'
  };

  /**
   * Nombre del icono principal
   */
  @Input() iconMenu: string = 'menu';

  /**
   * Data del menu a desplegar
   */
  @Input() menuButtons: any;
  /**
   * Data del style para el button del icono
   */
  @Input() styleButtonIcon: any;
  /**
  * Data del style para el icono
  */
  @Input() styleIcon: any;
  /**
   * Data para recibir el texto del title
   */
  @Input() titleButton: any;
  /**
   * Data para recibir el texto del title
   */
  @Input() statusInitialScroll: boolean = true; // Posicionar automaticamente el scroll al inicio del componente
  /**
   * Emite la data completa del botón al que se le haga clic
   */
  @Output() public menuEmiterData = new EventEmitter<any>();
  @Output() public menuPrimaryEmiterData = new EventEmitter<any>();
  @Output() public menuEmiterCancel = new EventEmitter<any>();


  constructor(private router: Router, private modal: ModalService, private modalSvc: ModalService) { }

  ngOnInit() {
    if (this.statusInitialScroll) {
      window.scroll(0, 0); // Posicionando scroll al inicio
    }
  }

  isPhysicalSpaceCreateRoute(): boolean {
    return this.router.url === '/archiveManagement/physical-space-create';
  }

  isPhysicalSpaceUpdateRoute(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.startsWith('/archiveManagement/physical-space-update');
  }

  isArchiveManagementCreateRoute(): boolean {
    return this.router.url === '/archiveManagement/archive-filing-index';
  }

  /**
   * Haciendo clic en un botón del menu se enviara la data al padre
   * @param data
   */
  menuButtonClick(data) {
    if (data.action === "changeStatus") {
      this.modalSvc.openAction("", "¿Está seguro que desea cambiar el estado ?", () => { this.menuEmiterData.emit(data) })

    } else this.menuEmiterData.emit(data);
  }

  menuButtonPrimaryClick() {
    this.menuPrimaryEmiterData.emit({ data: true });
  }

  clickCancel() {
    window.location.reload(); // Recarga la página
  }

  /** Validar si el boton es un array vacio o no tiene data para ocultar los botones */
}

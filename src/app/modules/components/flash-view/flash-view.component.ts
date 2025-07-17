/**

 */

import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-flash-view',
  templateUrl: './flash-view.component.html',
  styleUrls: ['./flash-view.component.css']
})
export class FlashViewComponent implements OnInit {

  flashStorageStatus: boolean;
  flashStorageStatusError: boolean;
  flashText: string;
  flashTextError: string;

  constructor() {
    this.validateStorageFlash();
  }

  ngOnInit() {
  }

  validateStorageFlash() {
    this.flashText = localStorage.getItem('setFlashText');
    this.flashTextError = localStorage.getItem('setFlashTextError');

    if (this.flashText != null) {
      this.showNotification('success', this.flashText );
        // this.flashStorageStatus = true;
        localStorage.removeItem('setFlashText');
    }

    if (this.flashTextError != null) {
        this.showNotification( 'danger', this.flashTextError );
        // this.flashStorageStatusError = true;
        localStorage.removeItem('setFlashTextError');
    }
  }

  // Para los mensajes de confirmarción siempre será a la derecha y en la parte superior
  /**
   * @param colorStatus Color que se desea mostrar
   * @param msg Mensaje que se desea mostrar
   * @param from ubicación
   * @param align aliniación 
   */
  showNotification( colorStatus: any,  msg: any, timer:number = 3000, from = 'top', align = 'right') {

    // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
    // const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message: msg
    }, {
      // type: type[ color ],
        type: colorStatus,
        timer: timer,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}

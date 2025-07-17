import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Items } from '../ocupational-main/components/sub-menu-ocupational/items';
import { ViewRequestService } from './services/view-request.service';

@Component({
  selector: 'app-ocupational-view-request',
  templateUrl: './ocupational-view-request.component.html',
  styleUrls: ['./ocupational-view-request.component.css'],

})

export class OcupationalViewRequestComponent implements OnInit {
  // nuevo sub menu 
  private validateIt = inject(ValidateInternetService);
  items: Items[] = [{
    link: 'ocupational-view-request',
    text: 'Solicitudes'
  }]
  modal = inject(ModalService)

  // controlar modal de exito o error
  isSuccess: boolean = true;
  constructor(
    private router: Router,
    private Datos: ViewRequestService,
  ) {

    this.validateIt.connect()
  }

  

  ngOnInit(): void {
    this.validateIt.checkConnection();
    this.validateIt.validateConnection();

  }

}

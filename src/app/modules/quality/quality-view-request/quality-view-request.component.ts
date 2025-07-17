import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Items } from '../quality-main/components/sub-menu-quality/items';
import { ViewRequestService } from './services/view-request.service';

@Component({
  selector: 'app-quality-view-request',
  templateUrl: './quality-view-request.component.html',
  styleUrls: ['./quality-view-request.component.css'],

})

export class QualityViewRequestComponent implements OnInit {
  // nuevo sub menu 
  private validateIt = inject(ValidateInternetService);
  items: Items[] = [{
    link: 'quality-view-request',
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

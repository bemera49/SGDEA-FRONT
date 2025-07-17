import { Component, OnInit } from '@angular/core';
import { Items } from '../juridica-main/components/sub-menu-juridica/items';

@Component({
  selector: 'app-juridica-view-request',
  templateUrl: './juridica-view-request.component.html',
  styleUrls: ['./juridica-view-request.component.css']
})
export class JuridicaViewRequestComponent implements OnInit {

  items: Items[] = [{
    link: 'view-request',
    text: 'Notificaciones'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}

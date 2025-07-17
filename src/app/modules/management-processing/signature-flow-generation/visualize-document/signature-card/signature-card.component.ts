import { Component, OnInit, Input } from '@angular/core';
import { IUsuarioFirma } from '@app/modules/components/draggable-table/draggable-table.component';
@Component({
  selector: 'app-signature-card',
  templateUrl: './signature-card.component.html',
  styleUrls: ['./signature-card.component.css']
})
export class SignatureCardComponent implements OnInit {

   @Input() title: string = '';
   @Input() data!: IUsuarioFirma[]; 

  constructor() { }

  ngOnInit(): void {
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PqrsConsultContentComponent } from '../components/pqrs-consult-content/pqrs-consult-content.component';

@Component({
  selector: 'app-external-pqrs-consult',
  templateUrl: './external-pqrs-consult.component.html',
  styleUrls: ['./external-pqrs-consult.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PqrsConsultContentComponent
  ]
})
export class ExternalPqrsConsultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

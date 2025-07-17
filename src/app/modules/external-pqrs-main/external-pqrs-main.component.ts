import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PqrsMainContentComponent } from '../components/pqrs-main-content/pqrs-main-content.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-external-pqrs-main',
  templateUrl: './external-pqrs-main.component.html',
  styleUrls: ['./external-pqrs-main.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PqrsMainContentComponent
  ]
})
export class ExternalPqrsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}

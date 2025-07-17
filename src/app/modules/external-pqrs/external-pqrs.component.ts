import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PqrsFormComponent } from '../components/pqrs-form/pqrs-form.component';

@Component({
  selector: 'app-external-pqrs',
  templateUrl: './external-pqrs.component.html',
  styleUrls: ['./external-pqrs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PqrsFormComponent
  ],
})
export class ExternalPqrsComponent implements OnInit {


  constructor(

  ) { }

  ngOnInit(): void {
  }

  onSubmitPqrs($event): void {
    console.log($event)
  }

}

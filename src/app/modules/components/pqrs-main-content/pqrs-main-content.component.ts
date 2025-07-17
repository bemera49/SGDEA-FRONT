import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pqrs-main-content',
  templateUrl: './pqrs-main-content.component.html',
  styleUrls: ['./pqrs-main-content.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatIconModule
  ]
})
export class PqrsMainContentComponent implements OnInit {

  @Input() title: string = "missing title";

  constructor() {
    localStorage.removeItem("pqrsForm");
  }

  ngOnInit(): void {
  }

}

/**

 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-errors-forms',
  templateUrl: './errors-forms.component.html',
  styleUrls: ['./errors-forms.component.css']
})
export class ErrorsFormsComponent implements OnInit {

  @Input() resErrsJsonStatus: boolean = false;
  @Input() resErrsJson: any;

  constructor() { }

  ngOnInit() { }

}

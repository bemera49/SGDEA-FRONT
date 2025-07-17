/**

 */

import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filing-email-form',
  templateUrl: './filing-email-form.component.html',
  styleUrls: ['./filing-email-form.component.css']
})
export class FilingEmailFormComponent implements OnInit {

  @Output() public submitFormEmit = new EventEmitter<any>();
  // @HostBinding('class.message-opened')
  @Input() opened = false;

  @Input() avatar = '';
  @Input() from = '';
  @Input() subject = '';
  @Input() body = '';
  @Input() recieved = new Date();

  @Output() removed = new EventEmitter<void>();
  @Output() reply = new EventEmitter<{ to: string, subject: string }>();

  iconMenu = 'menu';

  // Variables del formulario
  moduleForm: UntypedFormGroup;
  // Autentificacion
  authorization: string;

  /** BreadcrumbOn  */
  @Input() breadcrumbOn = [
    { 'name': 'Radicación', 'route': '/filing' }
  ];
  @Input() breadcrumbRouteActive = 'Formulario principal email';

  constructor( private formBuilder: UntypedFormBuilder ) {
    /**
     * Configuración del formulario
     */
    this.moduleForm = this.formBuilder.group({
      
    });
  }

  ngOnInit() {
  }

  submitForm() {
    
  }

}

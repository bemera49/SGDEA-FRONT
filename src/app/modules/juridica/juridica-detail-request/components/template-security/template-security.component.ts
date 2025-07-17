import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-security',
  templateUrl: './template-security.component.html',
  styleUrls: ['./template-security.component.css']
})
export class TemplateSecurityComponent implements OnInit {

  @Output() observacionForm = new EventEmitter<{ nameTemplate: string, securityLevel: string }>();
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      nameTemplate: [''],
      securityLevel: [''],
    });
  }

  ngOnInit(): void {
    // Validamos cuando secuirtyLevel cambie
    this.form.get('securityLevel')?.valueChanges.subscribe((value) => {
      this.observacionForm.emit({ nameTemplate: this.form.get('nameTemplate')?.value, securityLevel: value });
    });
  }

}

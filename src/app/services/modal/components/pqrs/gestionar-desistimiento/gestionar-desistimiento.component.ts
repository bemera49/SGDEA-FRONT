import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionar-desistimiento',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gestionar-desistimiento.component.html',
  styleUrls: ['./gestionar-desistimiento.component.css']
})
export class GestionarDesistimientoComponent {
  form: FormGroup;
  selectedTemplate: any = null;

  plantillas = [
    { value: 'manual_carga_trd', viewValue: 'Manual Carga TRD Desistimiento', filePath: 'assets/manuales/manual_carga_trd.pdf' },
    { value: 'manual_configuracion_carga_trd', viewValue: 'Manual de Expedientes Desistimiento', filePath: 'assets/manuales/manual_expedientes.pdf' },
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GestionarDesistimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      tipoPlantilla: [''],
      nombreSolicitante: [''],
      nombreRemitente: [''],
    });
  }

  dataModal = this.data

  onTemplateSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedTemplate = this.plantillas.find(p => p.value === selectedValue) || null;
  }
  

  viewTemplate(event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedTemplate) {
      window.open(this.selectedTemplate.filePath, '_blank');
    }
  }
  
 
  downloadTemplate() {
    if (this.selectedTemplate) {
      const link = document.createElement('a');
      link.href = this.selectedTemplate.filePath;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  removeSelectedTemplate() {
    this.selectedTemplate = null;
    this.form.patchValue({ tipoPlantilla: '' });
  }

  submitForm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.dataModal.void()
    }
  }

  close() {
    this.dialogRef.close();
  }
}

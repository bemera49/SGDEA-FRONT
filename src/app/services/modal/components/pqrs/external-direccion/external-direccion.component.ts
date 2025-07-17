import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-external-direccion',
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
  templateUrl: './external-direccion.component.html',
  styleUrls: ['./external-direccion.component.css']
})
export class ExternalDireccionComponent {

  pqrsForm: FormGroup;

  listTiposVia: any = [
    { value: 'avenida_calle', viewValue: 'Avenida Calle' },
    { value: 'avenida_carrera', viewValue: 'Avenida Carrera' },
    { value: 'calle', viewValue: 'Calle' },
    { value: 'carrera', viewValue: 'Carrera' },
    { value: 'diagonal', viewValue: 'Diagonal' },
    { value: 'transversal', viewValue: 'Transversal' }
  ];

  listTiposLetraDir: any = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
    { value: 'E', viewValue: 'E' },
    { value: 'F', viewValue: 'F' },
    { value: 'G', viewValue: 'G' },
    { value: 'H', viewValue: 'H' },
    { value: 'I', viewValue: 'I' },
    { value: 'J', viewValue: 'J' },
    { value: 'K', viewValue: 'K' },
    { value: 'L', viewValue: 'L' },
    { value: 'M', viewValue: 'M' },
    { value: 'N', viewValue: 'N' },
    { value: 'Ñ', viewValue: 'Ñ' },
    { value: 'O', viewValue: 'O' },
    { value: 'P', viewValue: 'P' },
    { value: 'Q', viewValue: 'Q' },
    { value: 'R', viewValue: 'R' },
    { value: 'S', viewValue: 'S' },
    { value: 'T', viewValue: 'T' },
    { value: 'U', viewValue: 'U' },
    { value: 'V', viewValue: 'V' },
    { value: 'W', viewValue: 'W' },
    { value: 'X', viewValue: 'X' },
    { value: 'Y', viewValue: 'Y' },
    { value: 'Z', viewValue: 'Z' }
  ];

  listBis: any = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
    { value: 'F', viewValue: 'F' },
    { value: 'G', viewValue: 'G' },
    { value: 'H', viewValue: 'H' },
    { value: 'I', viewValue: 'I' },
    { value: 'J', viewValue: 'J' },
    { value: 'K', viewValue: 'K' },
    { value: 'L', viewValue: 'L' },
    { value: 'M', viewValue: 'M' },
    { value: 'N', viewValue: 'N' },
    { value: 'Ñ', viewValue: 'Ñ' },
    { value: 'P', viewValue: 'P' },
    { value: 'Q', viewValue: 'Q' },
    { value: 'R', viewValue: 'R' },
    { value: 'T', viewValue: 'T' },
    { value: 'U', viewValue: 'U' },
    { value: 'V', viewValue: 'V' },
    { value: 'W', viewValue: 'W' },
    { value: 'X', viewValue: 'X' },
    { value: 'Y', viewValue: 'Y' },
    { value: 'Z', viewValue: 'Z' }
  ];

  listTiposSufijos: any[] = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
  ]

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExternalDireccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {

    // init formulario
    this.pqrsForm = this.fb.group({

      tipoDeVia: new FormControl('',),
      numVia: new FormControl('',),
      letra1: new FormControl('',),
      bis: new FormControl('',),
      letra2: new FormControl('',),
      sufijo: new FormControl('',),
      nPlaca: new FormControl('',),
      letra3: new FormControl('',),
      nPlaca2: new FormControl('',),
      sufijo2: new FormControl('',),
      complemento: new FormControl('',),
      direccionGenerada: new FormControl({ value: '', disabled: true }),
    });

    this.pqrsForm.valueChanges.subscribe(() => {
      this.updateDireccionGenerada();
    });
  }

  dataModal = this.data

  updateDireccionGenerada(): void {
    const formValue = this.pqrsForm.value;
    const direccion = `${formValue.tipoDeVia} ${formValue.numVia} ${formValue.letra1} ${formValue.bis} ${formValue.letra2} ${formValue.sufijo} ${formValue.nPlaca} ${formValue.letra3} ${formValue.nPlaca2} ${formValue.sufijo2} ${formValue.complemento}`;
    this.pqrsForm.controls['direccionGenerada'].setValue(direccion, { emitEvent: false }); // Actualiza sin emitir evento para evitar ciclos
  }


  close() {
    this.dialogRef.close()
  }

  submit(): void {
    this.dialogRef.close(this.pqrsForm.controls['direccionGenerada'].value);
  }

}

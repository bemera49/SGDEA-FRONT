import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '@app/services/local-storage.service';

@Component({
  selector: 'app-rechazar-pqrs',
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
  templateUrl: './rechazar-pqrs.component.html',
  styleUrls: ['./rechazar-pqrs.component.css']
})
export class RechazarPqrsComponent implements OnInit {

  versionApi = environment.apiUrl;
  authorization: string;

  listCausales = []
  isCausalOtro = false

  form: FormGroup = this.fb.group({
    causal: [null, Validators.required],
    observaciones: [null]
  });

  constructor(
    public dialogRef: MatDialogRef<RechazarPqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private lhs: LocalStorageService
  ) {
    this.getTokenLS()
  }

  ngOnInit(): void {
    this.getCausales()
  }

  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
    });
  }

  getCausales() {
    this.http.get(this.versionApi + 'api/causales_de_rechazo', { headers: { Authorization: "Bearer " + this.authorization } }).subscribe((data: any) => {
      this.listCausales = data.map(p => ({ name: p, value: p }));
    })
  }

  changeCausales(event) {
    this.form.removeControl('causal_otro')
    this.isCausalOtro = false
    if (event.value == 'Otro') {
      this.isCausalOtro = true
      this.form.addControl('causal_otro', this.fb.control(null, Validators.required))
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  accept() {
    this.dialogRef.close(this.form)
  }

}

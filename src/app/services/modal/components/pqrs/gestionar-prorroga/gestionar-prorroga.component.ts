/**
 *  HU 019 - Gestionar Prórroga
 */

import { Component, Inject, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ToastService } from "src/app/services/toast/toast.service";
import { ModalService } from "@app/services/modal/modal.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";
@Component({
  selector: "app-gestionar-prorroga",
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
    FormsModule,
  ],
  templateUrl: "./gestionar-prorroga.component.html",
  styleUrls: ["./gestionar-prorroga.component.css"],
})
export class GestionarProrrogaComponent {
  ampliacion: number;
  btnAceptar: boolean = true;
  btnAprobador: boolean = false;
  justification: string;
  formProrroga: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<GestionarProrrogaComponent>,
    private modal: ModalService,
    private router: Router,
    private _prorrogaService: ProrrogaService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
  }

  dataModal = this.data.data;

  initForm() {
    this.formProrroga = this.fb.group({
      ampliacion: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      justification: ["", Validators.required],
    });
  }
  close() {
    this.dialogRef.close();
  }

  validateProrroga() {
    if (this.formProrroga.get("ampliacion").value > 30) {
      this.modal.openNotify(
        "Aviso",
        "El tiempo solicitado para ampliación de términos supera el tiempo permitido",
        false
      );
      this.btnAceptar = true;
    } else {
      this.btnAceptar = false;
    }
  }
  submit() {
    if (this.formProrroga.valid) {
      this.router.navigate([
        `pqrs/pqrs-view/${this.dataModal.id}/view-prorroga`,
      ]);
      const data = {
        id: this.dataModal.id,
        ampliacion: this.formProrroga.get("ampliacion").value,
        justification: this.formProrroga.get("justification").value,
        dateVencimiento: this.dataModal.dateVencimiento,
      };
      this._prorrogaService.senData(data);
      this.close();
    }
  }
}

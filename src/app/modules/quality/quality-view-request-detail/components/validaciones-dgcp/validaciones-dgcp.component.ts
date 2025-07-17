import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "@app/services/toast/toast.service";
import { HttpParams } from "@angular/common/http";
import { DgcpValidationService } from "../../services/dgcp-validation/dgcp-validation.service";
import swal from "sweetalert2";

export interface Conditions {
  id: number;
  name: string;
  isValid: number | null;
}
@Component({
  selector: "app-validaciones-dgcp",
  templateUrl: "./validaciones-dgcp.component.html",
  styleUrls: ["./validaciones-dgcp.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidacionesDGCPComponent implements OnInit, OnChanges {
  public loading: boolean = false;
  @Input() checked: any[] = [];
  conditions: Conditions[] = [
    { id: 1, name: "Justificación", isValid: null },
    { id: 2, name: "Documento propuesto", isValid: null },
    { id: 3, name: "Diagrama", isValid: null },
    { id: 4, name: "Redacción", isValid: null },
    { id: 5, name: "Coherencia", isValid: null },
    { id: 6, name: "Ajuste a Metodología", isValid: null },
  ];
  form: FormGroup = this.fb.group({
    justification: [
      "",
      [Validators.required, Validators.minLength(1), Validators.maxLength(500)],
    ], // Acepta cualquier string
  });
  form2: FormGroup = this.fb.group({
    observation: [
      "",
      [Validators.required, Validators.minLength(1), Validators.maxLength(500)],
    ], // Acepta cualquier string
  });
  public selectedConditions: Conditions[] = [];
  public allComplies: boolean = false;
  public fieldsUnchecked: boolean = false;
  public requestId: any;
  public date: string = "";
  validateCriteriaChecked: any[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.requestId = params?.id;
    });
  }
  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private dgcpValidationSvc: DgcpValidationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Datos recibidos en el hijo:", this.checked);
    this.validateCriteriaChecked = this.checked["0"];
    if (this.validateCriteriaChecked) {
      this.form2.controls["observation"].setValue(this.checked["observation"]);
      this.form2.controls["observation"].disable();
    }
  }

  onSelectItem(item: Conditions, isValid: number): void {
    item.isValid = isValid;
    this.checkAllSelectedItemsValidity();
  }

  checkAllSelectedItemsValidity(): void {
    this.allComplies = this.conditions.every((item) => item.isValid === 1);
  }

  checkAllCheckedItems() {
    if (this.conditions.every((item) => item.isValid !== null)) {
      this.onConfirm();
    } else {
      this.fieldsUnchecked = true;
      this.toastService.open({
        title: `Por favor verifique, datos obligatorios incompletos `,
        duration: 5000,
        success: false,
      });
    }
  }

  onConfirm() {
    let fd = new HttpParams()
      .append("request_id", this.requestId)
      .append("justification", this.conditions[0].isValid)
      .append("proposed_document", this.conditions[1].isValid)
      .append("writing", this.conditions[2].isValid)
      .append("diagram", this.conditions[3].isValid)
      .append("coherence", this.conditions[4].isValid)
      .append("adjustment_methodo", this.conditions[5].isValid);
    if (!this.allComplies) {
      fd = fd.append("observation", this.form2.controls["observation"].value);
    }
    this.dgcpValidationSvc.validateRequestCriteria(fd).subscribe({
      error: (err: any) => {
        if (err.status == 422) {
          this.toastService.open({
            title: `Por favor verifique, datos obligatorios incompletos `,
            duration: 5000,
            success: false,
          });
        } else {
          this.toastService.open({
            title: `Validación fallída, ${err.error.message} `,
            duration: 2000,
            success: false,
          });
        }
      },
      next: (resp: any) => {
        console.log(resp);
        if (this.allComplies) {
          this.toastService.open({
            title: "Validación exitosa",
            duration: 2000,
            success: true,
          });
          this.date = resp.data.fecha_hrs_check;
        } else {
          this.toastService.open({
            title: resp.data.alert.text,
            duration: 2000,
            success: true,
          });
          this.date = resp.data.fecha_hrs_rechazo;
        }
      },
    });
  }

  requestExtension() {
    if (this.form.invalid) {
      this.toastService.open({
        title: `Por favor verifique, datos obligatorios incompletos `,
        duration: 5000,
        success: false,
      });
    } else {
      const fd = new HttpParams()
        .append("request_id", this.requestId)
        .append(
          "justification_add_time",
          this.form.controls["justification"].value
        );

      this.dgcpValidationSvc.requestExtension(fd).subscribe({
        error: (err: any) => {
          this.toastService.open({
            title: "Validación fallida ",
            duration: 2000,
            success: true,
          });
        },
        next: (resp: any) => {
          this.toastService.open({
            title: "Solicitud exitosa",
            duration: 2000,
            success: true,
          });
          this.form.disabled;
        },
      });
    }
  }
}

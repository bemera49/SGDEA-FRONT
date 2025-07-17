/**

 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "../../../../environments/environment";
import { ErrorStateMatcher } from "@angular/material/core";

import swal from "sweetalert2";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-register-main",
  templateUrl: "./register-main.component.html",
  styleUrls: ["./register-main.component.css"],
})
export class RegisterMainComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();

  versionApi: string = environment.versionApiDefault;
  registrationForm: UntypedFormGroup;
  statusRegistration: boolean = true;

  responseServiceFormSubmit: any;

  resErrsJsonStatus: boolean;
  resErrsJson: any;
  resErrsJsonList: any;

  isSubmitted: boolean = false;
  alertStatusForm: boolean = false;
  responseValidateForm: any;
  jsonErrsMessage: any;

  /*** Loading ***/
  statusloading: boolean = false;
  textloading: string =
    "Registrando datos, recibirá la información necesaria al correo registrado para activar el usuario.";

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    //public validatiosService: ValidatiosService,
    private router: Router
  ) {
    /**
     * Configuración del formulario para el login
     */
    this.registrationForm = this.formBuilder.group({
      email: new UntypedFormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new UntypedFormControl("", Validators.compose([Validators.required])),
      terminosCondiciones: new UntypedFormControl("", Validators.compose([Validators.requiredTrue])),
    });
  }

  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    body.classList.add("off-canvas-sidebar");
  }

  submitForm() {
    this.isSubmitted = true;

    if (!this.registrationForm.valid) {
      this.alertStatusForm = true;
      this.isSubmitted = false;
    } else if (this.registrationForm.valid) {
      this.authService.authPost(this.versionApi + "site/signup", this.registrationForm.value).subscribe(
        (res) => {
          this.responseServiceFormSubmit = res;
          this.resErrsJsonStatus = false;

          this.showSwal("success-message", this.responseServiceFormSubmit.message);
          this.router.navigate(["/login"]);
          this.isSubmitted = false;
        },
        (err) => {
          this.responseServiceFormSubmit = err;
          if (this.responseServiceFormSubmit.status === 322) {
            this.resErrsJsonStatus = true;
            this.resErrsJsonList = this.responseServiceFormSubmit.data.data;
            this.resErrsJson = [];
            Object.keys(this.resErrsJsonList).forEach((keyName) => {
              this.resErrsJsonList[keyName].forEach((errorKeyName) => {
                this.resErrsJson.push(errorKeyName);
              });
            });
          }
          this.isSubmitted = false;
        }
      );
    }
  }

  offAlertErrsForm() {
    this.alertStatusForm = false;
  }

  isFieldValid(form: UntypedFormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: UntypedFormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field),
    };
  }

  showSwal(type, message) {
    if (type == "success-message") {
      swal({
        title: "Correcto!",
        text: message,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success",
      }).catch(swal.noop);
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
    body.classList.remove("off-canvas-sidebar");
  }
}

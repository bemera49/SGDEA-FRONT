import {FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FieldsValidator {

  /**
  * @summary Valida si es un correo valido
  * @param control FormControl => campo a validar
  * @return null o error boolean
  */
  static mailIsValid(control: FormControl): ValidationErrors | null {

    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
    if (re) {
      return null;
    }

    if(control.value == '') {
      return null;
    }

    return {invalidEmail: true};
  }

  /**
  * @summary Valida si dos campos coinciden
  * @param firstField nombre primer campo a comparar
  * @param secondField nombre segundo campo a comparar
  * @param form FormGroup => formulario
  * @return null o error boolean
  */
  static fieldsEquals(firstField: string, secondField: string): ValidatorFn {
    return (form: FormGroup): ValidationErrors | null => {
      const firstFieldControl = form.get(firstField);
      const secondFieldControl = form.get(secondField);
  
      if(firstFieldControl.value == '') {
        return null;
      }
  
      return firstFieldControl.value === secondFieldControl.value ? null : {areEquals: true};
    }
  }

}
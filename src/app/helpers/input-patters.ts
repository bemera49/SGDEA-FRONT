import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class ValidateInput {

    isInteger(event: any) {
        const pattern = /^\d*$/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    isNumber(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    isNumDat(event: any) {
      const pattern = /[0-9-]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
      }
    }

    isString(event: any) {
        const pattern = /^[A-ZÀ-ÿ\s]+$/i;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    isText(event: any) {
        const pattern = /^[A-Z0-9À-ÿ\s]+$/i;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }

    setPercent(num: string, form: FormGroup, name: string) {
      const disableEnableOptions = { emitEvent: false };
      if (parseInt(num, 10) > 100 ) {
          form.get(name).setValue(100, disableEnableOptions);
        }
    }

    setNumberLimit(num: string, form: FormGroup, name: string) {
      const disableEnableOptions = { emitEvent: false };
      if (parseInt(num, 10) > 50000 ) {
          form.get(name).setValue(50000, disableEnableOptions);
        }
    }

    dateValidate(fieldDate: string): any {
        const bierthDay = moment(fieldDate);
        let pipebierthDay = null;
        if(bierthDay.isValid()) {
          pipebierthDay = bierthDay.format('YYYY/MM/DD');
        }
        return pipebierthDay;
      }
  
      dateFormatGrid(params: any): any {
        const result = moment(params.value).format('YYYY/MM/DD, h:mm:ss a');
        return result;
      }
  

}
/**

 */

import { Component, PipeTransform, Pipe } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-dynamic-forms-types-not-repeat',
  templateUrl: './dynamic-forms-types-not-repeat.component.html',
  styleUrls: ['./dynamic-forms-types-not-repeat.component.css']
})
export class DynamicFormsTypesNotRepeatComponent extends FieldArrayType {

  constructor() {
    super();
  }
}

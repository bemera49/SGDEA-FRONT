/**

 */

import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-dynamic-forms-types-repeat',
  templateUrl: './dynamic-forms-types-repeat.component.html',
  styleUrls: ['./dynamic-forms-types-repeat.component.css']
})
export class DynamicFormsTypesRepeatComponent extends FieldArrayType {
  constructor() {
    super();
  }
}

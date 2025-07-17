import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
interface TypeData {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-inputs-view-request',
  templateUrl: './inputs-view-request.component.html',
  styleUrls: ['./inputs-view-request.component.css']
})

export class InputsViewRequestComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;
  @Input() placeholderProp: string = '';
  @Input() max: number;
  characters = 0;

  ngOnChanges(): void {
    this.data = this.data.sort((a, b) => a.nombre.localeCompare(b.nombre));

  }

  onInput(event: any): void {
    let inputValue: string = event.target.value;
    if (inputValue.length > this.max) {
      inputValue = inputValue.substring(0, this.max);

      this.control.setValue(inputValue);
    }
    this.characters = inputValue.length;
  }


}

import { Pipe, PipeTransform } from '@angular/core';

interface Data {
  id: number;
  nombre: string;
}


@Pipe({
  name: 'sortAlphabetical',
})
export class SortAlphabeticalPipe implements PipeTransform {

  transform(value: Data[]): Data[] {
    if (!value) return [];
    return value.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

}

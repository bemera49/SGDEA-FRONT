import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseData',
})

export class ParseDataPipe implements PipeTransform {

  transform(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { timeZone: 'UTC' });

  }

}

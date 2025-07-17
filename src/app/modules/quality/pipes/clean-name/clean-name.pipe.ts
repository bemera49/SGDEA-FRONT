import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanName'
})
export class CleanNamePipe implements PipeTransform {

  transform(name: string, code: string): string {

    // Reemplaza los guiones bajos por espacios
    let cleanedName = name.replace(/_/g, ' ');

    // Si el nombre empieza con el código, lo elimina
    if (cleanedName.startsWith(code)) {
      cleanedName = cleanedName.replace(code, '').trim();
    }

    // Elimina cualquier contenido entre paréntesis junto con los paréntesis
    cleanedName = cleanedName.replace(/\s*\(.*?\)\s*/g, '').trim();

    // Elimina cualquier extensión de archivo al final del nombre
    const extensionIndex = cleanedName.lastIndexOf('.');
    if (extensionIndex > -1) {
      cleanedName = cleanedName.substring(0, extensionIndex);
    }
    return cleanedName;

  }

}

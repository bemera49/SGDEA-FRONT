import { Pipe, PipeTransform } from '@angular/core';
import { PermisosTable } from '../../components/table-dependency/model/table-dependencias';

@Pipe({
  name: 'joinPermissions',
})
export class JoinPermissionsPipe implements PipeTransform {

  transform(permisos: PermisosTable[]): string {
    const text = permisos.map(item => item.permiso);
    return text.join(" - ");
  }

}

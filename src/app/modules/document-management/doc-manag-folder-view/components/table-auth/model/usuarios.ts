import { PermisosTable } from "../../table-dependency/model/table-dependencias";

export interface Usuarios {
  id: number;
  name: string;
}


export interface TableUsuarios {
  idGdExpedientesUsuarios: number;
  idUsuario: number;
  name: string;
  permisos: PermisosTable[]
}
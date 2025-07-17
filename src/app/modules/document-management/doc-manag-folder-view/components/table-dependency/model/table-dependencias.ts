export interface PermisosTable {
  idPermiso: number;
  justificacion: string;
  permiso: string;
}

export interface TableDependencias {
  idGdExpedientesDependencias: number;
  idGdTrdDependencia: number;
  nombreDependencia: string;
  permisos: PermisosTable[];
}

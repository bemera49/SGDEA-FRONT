export interface PermisosUsuarios {
  id: string;
  justificacion: string;
  permiso: string;
}


export interface UsuariosDoc {
  idGdExpedientesDocumentosUsuarios: number;
  idUsuario: number;
  nombreUsuario: string;
  permisos: PermisosUsuarios[]
}

export interface UsuariosPermisosRespuesta {
  data: UsuariosDoc[];
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}



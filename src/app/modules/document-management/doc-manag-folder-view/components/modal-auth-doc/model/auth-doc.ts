export interface AuthDoc {
}

export interface ParamsAuthUsuarios {
  idDocumentoIncluidoPivot: number;
  name: string;
}

export interface UsuariosAuth {
  id: number;
  nombre: string;
}

export interface ResponseUsuarios {
  data: UsuariosAuth[];
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}


export interface BodyUsuariosDoc {
  idDocumento: number;
  model: string;
  idGdExpediente: number;
  idUsuario: number;
  permisos: number[];
  justificacion: string;
  nombre?: string;
}
export interface DependenciasDoc {
  idDocumento: number;
  model: string;
  idGdExpediente: number;
}

export interface Dependency {
  id: number;
  nombre: string;
}
export interface BodyDependency {
  idDocumentoIncluidoPivot: number;
  idDependencia: number;
  permisos: number[];
  justificacion: string;
}

export interface ParamsDependency {
  idDocumentoIncluidoPivot: number;
}

export interface ResponseDependency {
  origin: string;
  transactionId: string;
  timestamp: string;
  message: string;
  data: Dependency[];
  meta: unknown[]
}

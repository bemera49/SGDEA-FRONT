export interface DependencyParams {
  idDocumento: number;
  model: string;
  idGdExpediente: number;
}

export interface Permisos {
  id: string;
  justificacion: string;
  nombre: string;
}

export interface DependenciaData {
  idGdExpedientesDocumentosDependencias: number;
  idGdTrdDependencia: number;
  modelo: string;
  nombreDependencia: string;
  permisos: Permisos[];

}


export interface ResponseDependency {
  data: DependenciaData[];
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}




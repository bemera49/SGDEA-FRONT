export interface Info {
  data: string[];
  id: number;
  numeroRadiRadicado: string;
  nombreGdTrdTipoDocumental: string;
  nombreRadiDocumento: string;
  descripcionRadiDocumentoRadicado: string;
  creacionRadiDocumento: string;
  statusText: string;
  status: number;
  rowSelect: boolean;
  idInitialList: number;
  extension: string;
  model: string;
  asunto: string;
  nombreDocumento: string;
  tipoDocumental: string;
  fechaDeclaracion: string;
  fechaIncorporacion: string;
  paginaInicio: string;
  paginaFin: string;
  numeroFolios: string;
  radicado: string;
  formato: string;
  tamanio: string;
  origen: string;
  unidadAlmacenamiento: string;
}


export interface ParamsInfoDoc {
  idDocumentoIncluidoPivot: number;
  idDocumentoIncluido?: number;
}


export interface ResponseInfo {
  data: InfoDoc;
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}


export interface InfoDoc {
  idDocumento: number;
  asuntoContenido: string;
  codigoUnidadConservacion: string;
  fechaDeclaracion: string;
  fechaElaboracion: string;
  fechaIncorporacion: string;
  fechaTransmision: string;
  hashDocumento: string;
  nombreDocumento: string;
  nombreElaboradorRemitente: string;
  numeroFolios: string;
  numeroRadicado: string;
  origen: string;
  otros: string;
  pesoDocumento: string;
  tipoDocumento: number;
  tomo: string;
}

export interface TipoDocumental {
  id: number;
  name: string;
  value: boolean;
}

export interface UpdateInfoDoc {
  idDocumento: number;
  origen: number;
  fechaElaboracion: string;
  tipoDocumento: number;
  asuntoContenido: string;
  numeroFolios: number;
  codigoUnidadConservacion: string;
  tomo: string;
  nombreDocumento: string;
  estadoGdExpedienteDocumentoFisico?: number;
}

export type BodyArchivoFisico = Omit<UpdateInfoDoc, "idDocumento"> & {
  idGdExpediente: number;
  idDocumentoIncluidoPivot?: number;
}

export interface UnidadesDeconservacion {
  idgaArchivo: number;
  tipoArchivo: string;
  tomo: string;
  unidadConservacion: string;
}


export interface ResponseUnidades {
  data: UnidadesDeconservacion[];
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}


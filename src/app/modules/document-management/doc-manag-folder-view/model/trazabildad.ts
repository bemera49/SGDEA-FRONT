export interface Trazabilidad {
  dependencia: string;
  fecha: string;
  observacion: string;
  usuario: string;
}

export interface ResponseTrazabilidad {
  data: Trazabilidad[];
  message: string;
  meta: unknown[];
  origin: string;
  status: string;
  timestamp: string;
  transactionId: string;
}

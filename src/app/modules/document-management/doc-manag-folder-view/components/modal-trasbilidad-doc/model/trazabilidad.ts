export interface Trazabilidad {
  dependencia: string;
  fecha: string;
  observacion: string;
  usuario: string;
}

export interface ResponseTrazabilidad {
  data: Trazabilidad[]
  message: string;
  meta: any[];
  status: string;
  timestamp: string;
  transactionId: string;
}


export interface BodyPdf {
  id: number
}
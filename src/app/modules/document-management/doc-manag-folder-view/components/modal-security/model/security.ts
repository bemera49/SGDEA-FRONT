export interface Security {
  id: number;
  model: string;
  idGdExpediente: number;
}

export interface DataSecurity{
  clasificacionSeguridad:string;  
  created_at:string;
  id:number;
  idGdExpediente:number;
  idGdExpedienteDocumento: number;  
  justificacion: string;
  modelo: string;
  updated_at: string;
}

export interface SecurityBody {
  idDocumentoIncluidoPivot: number;
  clasificacionSeguridad: string;
  justificacion: string;
}

export interface ResponseSecurity{
  data: DataSecurity;
  message: string;
  meta: [];
  origin:string;
  status: string;
  timestamp:string;
  transactionId:string;
}
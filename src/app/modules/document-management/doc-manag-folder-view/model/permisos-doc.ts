export interface PermisosDoc {
  created_at: null
  id: number;
  nombre: string;
  updated_at: null
}

export interface RequestPermisosDoc{
  data: PermisosDoc[];
  message: string;
  meta: [];
  origin:string;
  status: string;
  timestamp:string;
  transactionId:string;    
}

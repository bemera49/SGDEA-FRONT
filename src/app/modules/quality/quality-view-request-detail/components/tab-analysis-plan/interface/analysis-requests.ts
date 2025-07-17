export interface ResponseNameDocuments {
  status: boolean;
  data: string[];
  message: string;
  token: string
}

export interface Meetings {
  area: string;
  code: string;
  document_name: string;
  email: string[] | string;
  date_hrs: string;
  help_file?:any;
  isConfirm?:number;
}

export interface RequestAnalysis {
  request_id: number;
  question_i: string;
  question_ii: string;
  which: string;
  meetings: Meetings[];
  observation: string;
}

export interface Meeting {
  codigo: string;
  correos: string;
  fecha_hrs: string;
  gdTrdDependencia_id: number;
  id: number;
  nombre: string;
  sgc_plan_analisi_id: number;
  help_file?:any;
  isConfirm?:number;
}

export interface ResponseData {
  0: string;
  1: number;
  fecha_hrs_c: string;
  meetings: Meeting[];
}

export interface ResponseAnalysisCreate {
  data: ResponseData;
  message: string;
  status: boolean;
  token: string;
}

export interface ResponseAnalysisUpdate {
  data: { fecha_hrs_u: string };
  message: string;
  status: boolean;
  token: string;
}
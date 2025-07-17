
export interface Applicant {
  id: number;
  applicant: string;
  user: string;
  position: string;
  management: string;
  dependence: string;
  cost_center: string;
}

interface Observation {
  user: string;
  id: number;
  fecha: string;
  contenido: string;
}

interface Question {
  pregunta: string;
  respuesta: string;
  cual: string;
  fecha: string;
}

interface Meeting {
  id: number;
  area_id: number
  area: string;
  name_document: string;
  code: string;
  emails: string;
  date_hrs: string;
}

export interface AnalysisPlan {
  id: number;
  name: string;
  date_hrs_create: string;
  date_hrs_update: string;
  observations: Observation[];
  questions: Question[];
  meetings: Meeting[];
}

export interface DocumentFile {
  id: number;
  original_name: string;
  name: string;
  path: string;
  mime_type: string;
  extension: string;
  size: number;
  down_count: number;
  description: string;
  extesion: string;
}

export interface Dependence {
  id: number;
  nombre: string;
}

export interface ListAnalyst {
  id: number;
  nombre: string;
}

export interface Data {
  id: number;
  filed: string;
  date: string;
  hour: string;
  analysis_plan: AnalysisPlan | null;
  dependence_all: Dependence[];
  list_analysts_all_sap: ListAnalyst[] | null;
  applicant: Applicant;
  is_propuesto: number;
  justification: string;
  multiple_choice: number;
  state: string;
  level: string;
  process: string;
  sub_process: string;
  documentary_type: string;
  request_type: string;
  privacy: string;
  document_file: DocumentFile;
  diagram: DocumentFile;
  documents_addtional: DocumentAdditional[];
  extend:string;
  name?:string;
  code?:string;
  hco_tipo_tarea_id?: number;
  tipoSolicitud?: string;
  aclaracion?:string;
  plantilla?:string;
  user?:string;
  datasap: DataSap[];
  tipoVerificacion_id?: number;
  respuesta_interna?:string;


}

export interface DataSap {
  id: number;
  idSolicitude: string;
  fechaInicioDeseada: string;
  fechaFinDeseada: string;
  descripcionBreveGrupoCodigos: string;
  numeroAviso: string;
  claseAviso: string;
  numeroOrden: string;
  grupoPlanificadorServicioClienteMantenimiento: string;
  centroPlanificacionMantenimiento: string;
  puestoTrabajoResponsableMedidasMantenimiento: string;
}


export interface Response {
  status_response: boolean;
  data: Data;
  message: string;
  token: string;
}


export interface DataItemInfo {
  label: string;
  value: string;
}


export interface DocumentAdditional {
  id: number;
  is_propuesto: number;
  justification: string;
  level: string;
  multiple_choice: any; // Dependiendo de lo que sea, puedes cambiar el tipo
  privacy: string;
  process: string;
  request_type: string;
  state: any; // Dependiendo de lo que sea, puedes cambiar el tipo
  sub_process: string;
  documentary_type: string;
  document_file: DocumentFile;
}

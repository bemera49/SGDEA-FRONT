/* interfaces en comun */
export interface CommonProcessDetails {
  id:number
  name: string
  code: string
  from: string
  subprocess: SubprocessDetail[];
}


export interface CommonSubprocessDetail {
  id: number;
  name: string;
  subtitle: string;
  code: string;
  from: string;
  until: string;
  description: string;
  documents: DocumentDetail[];
  expanded?: boolean;
}

export interface DocumentDetail {
  id: number;
  documental: string;
  name: string;
  subtitle: string;
  code: string;
  version: string;
  invoice: number;
  document_date: string;
  from: string;
  until: string;
  notes: string;
  description_change: string;
  topic_type: string;
  description: string;
  trd: TRDDetail;
  files: FileDetail[];
  expanded?: boolean;
}



//Interfaces extendidas
export interface ProcessDetails extends CommonProcessDetails {
    id: number
    level: number
    until: string
    characterizations:{
      documental: string
      name: string
      code: string
      version: string
      document_date: string
      from: string
      until: string
      notes: string
      description_change: string
      topic_type: string
      description: string
      files?: FileDetail
    }
    procedure_lead_area:{
      area:{
        code: number
        name: string
        }
      area_head: string
      cost_center: string
      direction: string
      management: string
    }
    
}

export interface SubprocessDetail extends CommonSubprocessDetail {
  id: number;
  name: string;
  subtitle: string;
  code: string;
  from: string;
  until: string;
  description: string;
  documents: DocumentDetail[];
  expanded?: boolean;
}



export interface FileDetail {
  expanded: boolean
  id: number
  original_name: string
  name: string
  path: string
  mime_type: string
  extension: string
  extesion:string
  size: number
  down_count: number
  description: string
}
export interface TRDDetail {
  administrative_unit: string
  serie: string
  subserie: string
  document_type: string
}
//interfaces de las tablas

//intreface tabla 1

export interface tableone {
    id:number
  name: string
  code: string
  from: string
  level: number
  until: string
  area:areaDetail[]
}
export interface areaDetail {
  code: string
  name: string
}

//interface de tabla estilo 3 mapa de proceso
export interface tablenode {
  selected?: boolean;
  id:number
  name: string
  code?: string
}
export interface paramsMap {
  id: number
  name: string
}
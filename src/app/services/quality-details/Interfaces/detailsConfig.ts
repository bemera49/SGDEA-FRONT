

export interface FileDetail {
  id: number;
  original_name: string;
  name: string;
  path: string;
  mime_type: string;
  extension: string;
  extesion: string
  size: number;
  down_count: number;
  description: string;
  expanded: boolean
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

export interface TRDDetail {
  administrative_unit: string;
  serie: string;
  subserie: string;
  document_type: string;
}

export interface SubprocessDetail {
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


export interface ProcessData {
  id: number;
  name: string;
  subtitle: string;
  code: string;
  from: string;
  until: string;
  level: number;
  description: string;
  procedure_lead_area: {
    area: {
      code: string
      name: string
    }
    management: string;
    direction: string;
    cost_center: string;
    area_head: string;
  }
  characterizations: {
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
    trd: TRDDetail
    files: FileDetail
  }
  subprocess: SubprocessDetail[];
}
export interface ResponseInterface {
  status: boolean;
  data: ProcessData;
  message: string;
  token: string;
}


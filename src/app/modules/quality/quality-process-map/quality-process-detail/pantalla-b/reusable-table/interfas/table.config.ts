export interface ProcessDetails {
  name: string;
  code: string;
  level: string;
  from: string;
  until: string;
}

export interface CharacterizationDetails {
  documental: string;
  name: string;
  code: string;
  version: string;
  document_date: string;
  from: string;
  until: string;
  notes: string;
  description_change: string;
  topic_type: string;
  description: string;
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
  files: FileDetail;
}

export interface FileDetail {
  id: number;
  original_name: string;
  name: string;
  path: string;
  mime_type: string;
  extension: string;
  size: number;
  down_count: number;
  description: string;
}
export interface TRDDetail {
  administrative_unit: string;
  serie: string;
  subserie: string;
  document_type: string;
}
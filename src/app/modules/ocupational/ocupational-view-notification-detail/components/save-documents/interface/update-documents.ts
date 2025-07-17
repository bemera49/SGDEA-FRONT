import { DocumentFile } from "../../../model/view-reques-detail";

export interface Proposed {
  proposed_document: File;
  diagram_file: File;
  request_id: number;
}

interface ProposedDocument {
  id: number;
  is_propuesto: number;
  justification: string;
  multiple_choice: null;
  level: string;
  process: string;
  sub_process: string;
  documentary_type: string;
  request_type: string;
  privacy: string;
}


export interface Documents {
  proposed_document: ProposedDocument;
  diagram_file: DocumentFile;
  proposed_file: DocumentFile;
}

export interface ResponseRequest {
  status: boolean;
  data: Documents;
  message: string;
}

import { DocumentDetail } from "@app/services/quality-details/Interfaces/detailsConfig";

export interface Tree {
  expanded: boolean;
  subProcess: TreeSubprocess;
}

export interface TreeSubprocess {
  id: number;
  name: string;
  subtitle: string;
  code: string;
  from: string;
  until: string;
  description: string;
  documents: TreeDocument[];
  expanded?: boolean;
}


export interface TreeDocument {
  expanded: boolean;
  documents: DocumentDetail
}
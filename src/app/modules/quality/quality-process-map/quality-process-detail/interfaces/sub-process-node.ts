/* INTERFAS COMUNES EN PANTALLA A Y B */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  code: string
  from: string
}
/* nodo padre */
export interface SubProcessNode {
  name: string;
  documents?: DocumentsFlatNode[];
}
/* nodo hijo */
export interface DocumentsFlatNode {
  level: number;
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
  file: FileFlatNode[];
}
/* nodo subhijo */
export interface FileFlatNode {
    id: number;
    original_name: string;
    name: string;
    path: string;
    mime_type: string;
    extension: string;
    size: number;
    down_count: number;
}

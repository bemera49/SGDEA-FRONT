export interface CreateRequest {
  process: string | any,
  documentary_type: string | number,
  privacy: string,
  level: string,
  state: number,
  sub_process: string | number,
  request_type: string,
  justification: string,
  name: string,
  multiple_choice: number,
  filed: string,
  proposed_document: any,
  diagram_file?: any,
  multiple_file?: string | MultipleFile[] | Blob;
}

export interface MultipleFile {
  name: string,
  justification: string,
  documentary_type: number,
  request_type: number,
  proposed_document?: any;
}


export interface DataPredictiveText {

  status: boolean,
  data: string[],
  message: string,
  token: string

}
export interface DataForm {
  state: State[],
  process: Process[],
  documentary_type: DocumentType[],
  request_type: RequestType[],
}

export interface Applicant {
  id: number,
  user: string,
  position: string,
  management: string,
  cost_center: string
}

export interface State {
  id: number,
  nombre: string
}

export interface Level {
  id: number,
  nombre: string
}

export interface Process {
  id: number,
  nombre: string
}

export interface DocumentType {
  id: number,
  nombre: string
}

export interface RequestType {
  id: number,
  nombre: string
}
export interface Privacy {
  id: number,
  nombre: string
}



export interface AutomaticData {
  status: boolean,
  data: DataForm,
  message: string;
  token: string;
}



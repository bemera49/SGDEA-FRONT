export interface DataForm {
  filed: string,
  date: string,
  applicant: Applicant,
  state: State,
  level: Level[],
  process: Process[],
  sub_process: null,
  documentary_type: DocumentaryType[],
  request_type: RequestType[],
  privacy: Privacy[]
}


export interface Applicant {
  id: number,
  user: string,
  position: string,
  management: string,
  dependence: string,
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
export interface SubProcessResponse {
  data: Process[],
  message: string,
  status: boolean,
  token: string
}

export interface DocumentaryType {
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


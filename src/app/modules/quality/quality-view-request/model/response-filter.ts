import { ResponsePaginator } from "../components/paginator/model/paginator.model";

export interface Applicant {
  id: number;
  user: string;
  applicant: string;
  position: string;
  management: string;
  dependence: string;
  cost_center: string;
}

export interface RequestData {
  filed: string;
  date: string;
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
}

export interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ApiResponse {
  status: boolean;
  data: RequestData[];
  links: any;
  meta: ResponsePaginator;
  message: string;
  token: string;
}

export interface RequestParams {
  start_date: string,
  end_date: string,
  filed: string,
  request_type: string,
  area: string,
  process: string,
  state: string,
  perPage: string,
  page?: string
}
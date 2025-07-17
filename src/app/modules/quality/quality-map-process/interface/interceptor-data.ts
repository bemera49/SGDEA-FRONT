import { DocumentDetail, ProcessData, SubprocessDetail } from "@app/services/quality-details/Interfaces/detailsConfig";

export interface Interceptor {
  type: string;
  data: ProcessData | DocumentDetail | SubprocessDetail;
}
/**

 */

export interface DialogData {
  idRadicado: string;
  route: string;
  authorization: string;
}

export interface GetParamsData {
  data: {
    idResoluciones: number;
    numeroResolucion: number;
    fechaResolucion: string;
    valorResolucion: number;
  }
}

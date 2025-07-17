export interface IDataTableHeader {
  name: string;
  label: string,
  hiddeable?: boolean;
}

export interface IAssociatedRequest {
  idRadiRadicado: number
  cuenta: string
  cont: string
  solicitante_nombre: string
  fecha_radicado: string
}

export const headers: IDataTableHeader[] = [
  {
    name: 'idRadiRadicado',
    label: 'Radicado',
  },
  {
    name: 'cuenta',
    label: 'Cuenta',
  },
  {
    name: 'cont',
    label: 'Cont',
  },
  {
    name: 'solicitante_nombre',
    label: 'Nombre del solicitante',
  },
  {
    name: 'fecha_radicado',
    label: 'Fecha del radicado',
  }
]

export const body: IAssociatedRequest[] = [
 /*  {
    radicado: 123,
    cuenta: 'Ejemplo1',
    cont: 'Ejemplo1',
    solicitante_nombre: 'Ejemplo1',
    fecha_radicado: '2022-01-01'
  },
  {
    radicado: 456,
    cuenta: 'Ejemplo2',
    cont: 'Ejemplo2',
    solicitante_nombre: 'Ejemplo2',
    fecha_radicado: '2022-02-02'
  } */
]
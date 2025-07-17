

export interface detailUpdate {
    id_radicado: number;
    estado: number;
    aclaracion?: string;
    observacion?: string;
}

export interface Radicado {
    check: string
    idRadiRadicado: number;
    numeroRadiRadicado: string;
    fcreacionRadicado: string;
    tipoTarea: string;
    tipoSolicitudId: number;
    idProfesional: number;
    nomProfesional: string;
    fechaAsignacion: string;
    estadoId: number;
    estado: Estado;
    tipo_solicitud: TipoSolicitud;
}

export interface DetailElement {
    idRadiRadicado: number;
    numeroRadiRadicado: string;
    fcreacionRadicado: string;
    tipoTarea: string;
    tipoSolicitudId: number;
    idProfesional: number;
    nomProfesional: string;
    fechaAsignacion: string;
    fechaInicioDeseadaSap: string;
    fechaFinDeseado: string;
    circustancias: string;
    descripcion: string;
    numeroAviso: string;
    claseAviso: string;
    funcionario: string;
    numeroOrden: string;
    autorAvisoSap: string;
    statusAviso: string;
    estadoId: number;
    observacion: string;
    anexos: Anexos[];
    estado: Estado;
    tipo_solicitud: TipoSolicitud;
    tipo_tarea: TipoTarea;
    solicitud: any;
}

export interface Estado {
    id: number;
    estado: string;
}

export interface Anexos {
    nameFile?: string;
    nomArchivo: string;
    dataArchivo: string;
}

export interface TipoSolicitud {
    id: number;
    nombre: string;
}

export interface TipoTarea {
    id: number;
    nombre: string;
}





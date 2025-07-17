export interface clasificacionRelatoria {
    id: number;
    descripcion: string;
    creacionClasificacion: string;
}

export interface restrictoresRelatoria {
    id: number;
    descripcion: string;
    creacionRestrictor: string;
}

export interface descriptoresRelatoria {
    id: number;
    descripcion: string;
    creacionDescriptor: string;
}

export interface subClasificacionRelatoria {
    id: number;
    idClasificacionRelatoria: number;
    descripcionSubClasificacion: string;
    creacionSubClasificacion: string;
}

export interface fichaRelatoria {
    id: number;
    idConcepto: string;
    fechaConcepto: string;
    abogado: string;
    idClasificacion: number;
    idSubClasificacion: number;
    problemaJuridico: string;
    respuestaProblemaJuri: string;
    idDescriptor: number;
    idRestrictor: number;
}

export interface conceptosRelatoria {
    idConcepto: string;
    fechaConcepto: string;
    abogado: string;
    problemaJuridico: string;
    respuestaProblemaJuri: string;
    nomClasificacion: string;
    nomSubClasificacion: string;
    nomDescriptor: string;
    nomRestrictor: string;
}
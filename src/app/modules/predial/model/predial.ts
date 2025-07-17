export interface BodyPredial {
    radicado: number;
    solicitante: string;
    detalle: string;
    estado: string;
    anexos_fisicos: AnexosFisicos[]
}

export interface AnexosFisicos {
    titulo_anexo: string;
    folios: number;
}
export interface filtrosTiposDocumentales {
    codigo_documento_calidad?: string;
    nombreTipoDocumental?: string;
    estadoTipoDocumental?: number;
}

export interface addTipoDocumental {
    idGdTrdTipoDocumental: number,
    codigo_documento_calidad: number,
    nombreTipoDocumental: string,
    nombre_corto: string,
    clasificacion_seguridad: string
    estadoTipoDocumental: number
}

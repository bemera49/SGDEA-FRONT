export interface filtrosSubseries {
    nombreGdTrdSerie?: string;
    codigoGdTrdSerie?: string;
    nombreGdTrdSubserie?: string;
    codigoGdTrdSubserie?: string;
    estadoGdTrdSubserie?: number;
}

export interface addSerieSubseries {
    nombreGdTrdSerie?: string;
    codigoGdTrdSerie?: number;
    clasificacion_seguridad?: string;
    subSeries: Subseries;
}
export interface Subseries {
    nombreGdTrdSubserie?: string;
    codigoGdTrdSubserie?: number;
    contieneSubseries?: boolean;
    retencion_archivo_gestion?: string;
    retencion_archivo_central?: string;
    disposicion_final?: string;
    reproduccion_tecnica?: boolean;
    procedimientoGdTrdSubserie?: string;
    estadoGdTrdSubserie?: string;
}

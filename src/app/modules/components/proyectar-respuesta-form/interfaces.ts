
export interface ResponseReasociarPlantilla {
  message: string,
  data: ResponseDataReasociarPlantilla,
}

export interface ResponseDataReasociarPlantilla {
 
    idUser: string
    nombreRadiDocumentoPrincipal: string
    rutaRadiDocumentoPrincipal: string
    extensionRadiDocumentoPrincipal: string
    estadoRadiDocumentoPrincipal: string
    tamanoRadiDocumentoPrincipal: string
    idRadiRespuesta: number
    idRadiRadicado: number
    idradiDocumentoPrincipal: number
 
  
}

export interface ResponseAsociarPlantillas {
message: string,
data: ResponseAsociarPlantillasData
}


export interface ResponseAsociarPlantillasData {
        idUser: number
        nombreRadiDocumentoPrincipal: string
        rutaRadiDocumentoPrincipal: string
        extensionRadiDocumentoPrincipal: string
        tamanoRadiDocumentoPrincipal: string
        idRadiRadicado: number
        idradiDocumentoPrincipal: number
}

export interface IMezclaCorrespondenciaResponse {
  idradiDocumentoPrincipal: number
  idRadiRadicado: number
  idUser: number
  nombreRadiDocumentoPrincipal: string
  rutaRadiDocumentoPrincipal: string
  extensionRadiDocumentoPrincipal: string
  imagenPrincipalRadiDocumento: number
  estadoRadiDocumentoPrincipal: number
  creacionRadiDocumentoPrincipal: string
  tamanoRadiDocumentoPrincipal: string
  publicoPagina: number
  idRadiRespuesta: number
  fechaEpochCreacion: any
  hash: any
  fechaEpochCreacionArchivo: any
  paginas: any
  alfrescoId: any
}

export interface IProyectarRespuestaBody {
    encrypted: string
    decrypted: Decrypted
    loggedIn: boolean
  }

  export interface Decrypted {
    message: string
    idRadiRadicado: string // Este id viene encriptado en base64 AES.
    id: number
    data: Data
    dataTransacciones: DataTransaccione[]
    formaRadicacion: string
    status: number
  }

  export interface Data {
    idCgTipoRadicado: number
    radicadoOrigen: string
    fechaDocumentoRadiRadicado: string
    idGdTrdSerie: number
    idGdTrdSubserie: number
    idTrdTipoDocumental: number
    PrioridadRadiRadicados: number
    idCgMedioRecepcion: number
    asuntoRadiRadicado: string
    fechaVencimientoRadiRadicados: string
    foliosRadiRadicado: string
    descripcionAnexoRadiRadicado: string
    observacionRadiRadicado: string
    autorizacionRadiRadicados: number
    idTrdDepeUserTramitador: number
    user_idTramitador: number
    numeroRadicadoExterno: string
    numeroCuentaContrato: string
    tipoRespuestaId: string
    contactoSap: string
    direccion: string
    tipoDeVia: string
    numVia: string
    letra: string
    sufijo: string
    nPlaca: string
    complemento: string
    zona: string
    tipoSolicitudId: string
    tipoServicioId: string
    tipoComunicacionId: number
    numeroRadiRadicado: string
    user_idCreador: number
    idTrdDepeUserCreador: number
    idRadiRadicado: number
  }
  
  export interface DataTransaccione {
    route: string
    action: string
    title: string
    icon: string
    data: string
  }
  
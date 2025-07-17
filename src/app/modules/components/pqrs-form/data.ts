export const tiposDeViaOptions = [
    { value: 'avenida_calle', viewValue: 'Avenida Calle' },
    { value: 'avenida_carrera', viewValue: 'Avenida Carrera' },
    { value: 'calle', viewValue: 'Calle' },
    { value: 'carrera', viewValue: 'Carrera' },
    { value: 'diagonal', viewValue: 'Diagonal' },
    { value: 'transversal', viewValue: 'Transversal' }
];

// Letras para la dirección
export const letraOptions = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
    { value: 'E', viewValue: 'E' },
    { value: 'F', viewValue: 'F' },
    { value: 'G', viewValue: 'G' },
    { value: 'H', viewValue: 'H' },
    { value: 'I', viewValue: 'I' },
    { value: 'J', viewValue: 'J' },
    { value: 'K', viewValue: 'K' },
    { value: 'L', viewValue: 'L' },
    { value: 'M', viewValue: 'M' },
    { value: 'N', viewValue: 'N' },
    { value: 'Ñ', viewValue: 'Ñ' },
    { value: 'O', viewValue: 'O' },
    { value: 'P', viewValue: 'P' },
    { value: 'Q', viewValue: 'Q' },
    { value: 'R', viewValue: 'R' },
    { value: 'S', viewValue: 'S' },
    { value: 'T', viewValue: 'T' },
    { value: 'U', viewValue: 'U' },
    { value: 'V', viewValue: 'V' },
    { value: 'W', viewValue: 'W' },
    { value: 'X', viewValue: 'X' },
    { value: 'Y', viewValue: 'Y' },
    { value: 'Z', viewValue: 'Z' }
];

// Sufijos para la dirección
export const sufijoOptions = [
    { value: 'sur', viewValue: 'Sur' },
    { value: 'este', viewValue: 'Este' }
];

// 
export const diccionario = {
    tittleCliente: "filingModule.selectRemitente",
    idCgTipoRadicado: 'filingModule.selectTipoRadicado',
    fechaDocumentoRadiRadicado: 'Fecha documento',

}

export const validateSteps = [
    // paso1
    [
        'idCliente',
        'autorizacionRadiRadicados',
        'isNuevoRemitente',
        'nombreCliente',
        'idTipoPersona',
        'numeroDocumentoCliente',
        'direccionCliente',
        'idNivelGeografico1',
        'idNivelGeografico2',
        'idNivelGeografico3',
        'correoElectronicoCliente',
        'telefonoCliente',
        'remitentes',
        'generoClienteCiudadanoDetalle',
        'rangoEdadClienteCiudadanoDetalle',
        'vulnerabilidadClienteCiudadanoDetalle',
        'etniaClienteCiudadanoDetalle'
    ],
    // paso2
    [
        'idGdTrdSerie',
        'idGdTrdSubserie',
        'idTrdTipoDocumental',
        'idCgMedioRecepcion',
        'PrioridadRadiRadicados',
        'asuntoRadiRadicado',
        'fechaVencimientoRadiRadicados',
        'diasRestantes',
        'foliosRadiRadicado',
        'descripcionAnexoRadiRadicado',
        'observacionRadiRadicado'
    ],
    // paso3
    [
        'numeroRadicadoExterno',
        'numeroCuentaContrato',
        'contactoSap',
        'direccion',
        'tipoDeVia',
        'numVia',
        'letra',
        'sufijo',
        'nPlaca',
        'complemento',
        'zona',
        'tipoSolicitudId',
        'tipoServicioId'
    ],
    // paso4
    [
        'isCiudadano',
        'idTramites',
        'tipoDeIdentificador',
        'apellidosCliente',
        'telefono_celular',
        'direccion_residencia',
        'tipo_notificacion',
        'confirmacion_email',
        'departamento',
        'municipio_ciudad',
        'hechos',
        'pretenciones'
    ],
    // paso5
    [
        'idTrdDepeUserTramitador',
        'user_idTramitador',
        'fileUpload',
        'aceptaPoliticas',
        'aceptaEnvio',
        'idCgTipoRadicado',
        'radicadoOrigen',
        'fechaDocumentoRadiRadicado',
        'RadiRadicadoHijos'
    ]


]
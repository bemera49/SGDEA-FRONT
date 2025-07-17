import { TableHeaders } from "@app/modules/components/table/table.component"

export const tableHeaders: TableHeaders[] = [
    {
        label: "ID",
        name: "idRadiRadicado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Días para vencimiento",
        name: "diasVencimiento",
        sortable: true,
        allowed: ["pqrs%columna%numeroradicado"],
    },
    {
        label: "Número de radicado de entrada",
        name: "numeroRadiRadicado",
        sortable: true,
        allowed: ['pqrs%columna%numeroradicado'],
    },
    {
        label: "Número de cuenta contrato",
        name: "numeroCuentaContrato",
        sortable: true,
        allowed: ['pqrs%columna%numerocontrato']
        ,
    },
    {
        label: "Número de contacto SAP",
        name: "contactoSap",
        sortable: true,
        allowed: ['pqrs%columna%numerosap'],
    },
    {
        label: "Fecha de Radicación",
        name: "creacionRadiRadicado",
        sortable: true,
        allowed: ['pqrs%columna%fecharadicacion'],
    },
    {
        label: "Tipo de solicitud",
        name: "tipo_solicitud",
        sortable: true,
        allowed: ['pqrs%columna%tiposolicitud'],
    },
    {
        label: "Tipo de repuesta",
        name: "tipoRespuesta",
        sortable: true,
        allowed: ['pqrs%columna%tiposolicitud'],
    },
    {
        label: "Medio de recepción",
        name: "medio_de_recepcion",
        sortable: true,
        allowed: ['pqrs%columna%mediorecepcion'],
    },
    {
        label: "Clasificación interna",
        name: "clasificacion_interna",
        sortable: true,
        allowed: ['pqrs%columna%clasificacioninterna'],
    },
    {
        label: "Fecha de asignación",
        name: "fecha_de_asignacion",
        sortable: true,
        allowed: ['pqrs%columna%fechaasignacion'],
    },
    {
        label: "Fecha de vencimiento",
        name: "fechaVencimientoRadiRadicados",
        sortable: true,
        allowed: ['pqrs%columna%fechavencimiento'],
    },
    {
        label: "Fecha de solicitud de autorización",
        name: "fecha_solicitud_autorizacion",
        sortable: true,
        allowed: ['pqrs%columna%fechasolicitud'],
    },
    {
        label: "Usuario que solicita",
        name: "usuario_que_solicita",
        sortable: true,
        allowed: ['pqrs%columna%usuariosolicita'],
    },
    {
        label: "Tipo de solicitud de autorización",
        name: "tipo_solicitud",
        sortable: true,
        allowed: ['pqrs%columna%tipoautorizacion'],
    },
    {
        label: "Causal de rechazo",
        name: "causal_de_rechazo",
        sortable: true,
        allowed: ['pqrs%columna%causalrechazo'],
    },
    {
        label: "Estado",
        name: "estado",
        sortable: true,
        allowed: ['pqrs%columna%estado'],
    },
]


export const tableHeadersPqrsDetail: TableHeaders[] = [

    {
        label: "ID",
        name: "idRadicado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Número de radicado de entrada",
        name: "numeroRadicado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Cuenta contrato",
        name: "numeroCuentaContrato",
        sortable: true,
        allowed: null,
    },
    {
        label: "Contacto SAP",
        name: "numeroContactoSap",
        sortable: true,
        allowed: null,
    },
    {
        label: "Nombre del solicitante",
        name: "nombresSolicitantes",
        sortable: true,
        allowed: null,
    },
    {
        label: "Fecha de radicacion",
        name: "fechaRadicacion",
        sortable: true,
        allowed: null,
    },
    {
        label: "Clasificación interna",
        name: "clasificacionInterna",
        sortable: true,
        allowed: null,
    },
    {
        label: "Estado",
        name: "estado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Funcionario asignado",
        name: "funcionariosGestiona",
        sortable: true,
        allowed: null,
    },
]

export const tableHeadersPqrsDetailSolicitudesAsociadas: TableHeaders[] = [

    {
        label: "ID Radicado",
        name: "idRadicado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Número de radicado de entrada",
        name: "numeroRadicado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Cuenta contrato",
        name: "numeroCuentaContrato",
        sortable: true,
        allowed: null,
    },

    /* {
        label: "Contacto SAP",
        name: "funcionariosGestiona",
        sortable: true,
        allowed: null,
    }, */

    {
        label: "Nombre del solicitante",
        name: "nombresSolicitantes",
        sortable: true,
        allowed: null,
    },

    {
        label: "Fecha de radicacion",
        name: "fechaRadicacion",
        sortable: true,
        allowed: null,
    },
    {
        label: "Clasificación interna",
        name: "clasificacionInterna",
        sortable: true,
        allowed: null,
    },
    {
        label: "Estado",
        name: "estado",
        sortable: true,
        allowed: null,
    },
    {
        label: "Funcionario asignado",
        name: "funcionariosGestiona",
        sortable: true,
        allowed: null,
    },
]



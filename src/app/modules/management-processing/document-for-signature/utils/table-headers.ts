import { TableHeaders } from "@app/modules/components/table/table.component"

export const SigninHomeTableHeaders: TableHeaders[] = [
    {
        label: "Fecha límite de firma",
        name: "fechaLimite",
        sortable: true,
        allowed: ['pqrs%columna%id'],  
    },
     {
        label: "Proyector",
        name: "proyector",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Asunto del documento",
        name: "asunto",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas realizadas",
        name: "FirmaRealziada",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas pendientes",
        name: "firmaPendientes",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Estado",
        name: "estado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Justificación de rechazo",
        name: "",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
]

export const SignatureHomeHeaders: TableHeaders[] = [
    {
        label: "Número del radicado",
        name: "idRadiRadicado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Fecha de inicio",
        name: "fecha_creacion",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Fecha límite",
        name: "fechaVencimientoRadiRadicados",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Proyector",
        name: "full_name",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Asunto documento",
        name: "",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas realizadas",
        name: "firmado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas pendientes",
        name: "pendiente",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Estado",
        name: "nombreEstado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Selección",
        name: "",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
]

export const tableHeaders: TableHeaders[] = [
    {
        label: "ID",
        name: "idRadiRadicado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Fecha de inicio",
        name: "fecha_creacion",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Fecha límite",
        name: "fechaVencimientoRadiRadicados",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Proyector",
        name: "full_name",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Asunto documento",
        name: "",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas realizadas",
        name: "firmado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Firmas pendientes",
        name: "pendiente",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Estado",
        name: "nombreEstado",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },
    {
        label: "Selección",
        name: "",
        sortable: true,
        allowed: ['pqrs%columna%id'],
    },

]
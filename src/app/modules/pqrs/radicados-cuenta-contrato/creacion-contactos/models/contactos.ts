export interface contactos {
    id: number;
    descripcion: string;
    creacionClasificacion: string;
}

export interface cuentaContrato {
    cuentaContrato: numeroCuentaContrato
}

export interface numeroCuentaContrato {
    numeroCuentaContrato: string;
    contactoSap: string;
    cuentaInterna: string;
    zona: string;
    idRadiRadicado: string;
}

export interface contrato {
    id: number;
    numeroCuentaContrato: string;
    contactoSap: string;
    cuentaInterna: string;
    zona: string;
}

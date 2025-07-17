export interface roles {
    idRol: number;
    nombreRol: string;
    estadoRol: number;
    creacionRol: string;
    idRolNivelBusqueda: number
}

export interface userByRol {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: number;
    updated_at: number;
    idRol: number;
    idUserTipo: number;
    intentos: number;
    ldap: number;
    idGdTrdDependencia: number;
    licenciaAceptada: number;
    lider: number;
    sgc_cargo_id: number;
}

export interface vacaciones {
    usuario_sale_id: number;
    usuario_reemplazo_id: number;
    fecha_inicial: string;
    fecha_final: string;
}



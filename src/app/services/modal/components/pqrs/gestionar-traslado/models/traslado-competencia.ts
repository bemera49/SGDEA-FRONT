/* Pais */
export interface Pais {
    nivelGeografico1: number;
    nomNivelGeografico1: string;
    cdi: string;
    estadoNivelGeografico1: number;
    creacionNivelGeografico1: Date;
}

/* Departamento */
export interface Departamento {
    nivelGeografico2: number;
    idNivelGeografico1: number;
    nomNivelGeografico2: string;
    estadoNivelGeografico2: number;
    creacionNivelGeografico2: Date;
}

/* Municipio */

export interface Municipio {
    nivelGeografico3: number;
    idNivelGeografico2: number;
    nomNivelGeografico3: string;
    estadoNivelGeografico3: number;
    creacionNivelGeografico3: Date;
}


/* Empresa */

export interface Empresa {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
}

/* Response Empresa */
export interface ResponseEmpresa {
    data: Datum[];
}

export interface Datum {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
}

/* Cliente */

export interface Cliente {
    id: number;
    tipo: string;
    tipoId: number;
    nombre: string;
    numeroDocumento: string;
    email: string;
    direccion: string;
    telefono: string;
    estado: string;
    estadoId: number;
    fechaRegistro: Date;
    ciudad: string;
    ciudadId: number;
    departamento: string;
    departamentoId: number;
    pais: string;
    paisId: number;
    codigoSap: string;
    celular: string;
    codigoPostal: string;
    empresa: string;
    empresaId: number;
}

/* ResponseCliente */
export interface ResponseCliente {
    data: Datum[];
}

export interface Datum {
    id: number;
    tipo: string;
    tipoId: number;
    nombre: string;
    numeroDocumento: string;
    email: string;
    direccion: string;
    telefono: string;
    estado: string;
    estadoId: number;
    fechaRegistro: Date;
    ciudad: string;
    ciudadId: number;
    departamento: string;
    departamentoId: number;
    pais: string;
    paisId: number;
    codigoSap: string;
    celular: string;
    codigoPostal: string;
    empresa: string;
    empresaId: number;
}


/* Usuarios */


export interface Usuarios {
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
    user_detalle: UserDetalle;
}

export interface UserDetalle {
    idUserDetalles: number;
    idUser: number;
    nombreUserDetalles: string;
    apellidoUserDetalles: string;
    cargoUserDetalles: string;
    creacionUserDetalles: number;
    idTipoIdentificacion: number;
    documento: string;
    firma: null;
    estadoUserDetalles: number;
    full_name: string;
}


/* Registrar empresa */

export interface RegistrarEmpresa {
    nombreEmpresa: string;
    nombreCliente: string;
    numeroDocumentoCliente: string;
    correoElectronicoCliente: string;
    direccionCliente: string;
    telefonoCliente: number;
    idNivelGeografico3: number;
    idNivelGeografico2: number;
    idNivelGeografico1: number;
    celular: number;
    codigoPostal: string;
}

export interface aviso {
    pqrs_id: string;
    estado_aviso: string;
    fecha_respuesta: string;
    usuario: string;
    detalle_respuesta: string;
}
export interface Applicant {
    id: number;
    applicant: string;
    user: string;
    position: string;
    management: string;
    dependence: string;
    cost_center: string;
}

export interface DataItem {
    id: number;
    filed: string;
    name: string;
    date: string; // O Date si prefieres trabajar con objetos de fecha
    applicant: Applicant;
    request_type: string;
    state: string;
    analyst: string;
    analyst_state: boolean;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    count: number;
    first_item: number;
    items: DataItem[]; // Ajustado a DataItem[]
    next_page_url: string | null; // Puede ser null
    on_first_page: boolean;
    previous_page_url: string | null; // Puede ser null
    current_page_url: string; // Es una URL, por lo tanto string
    get_page_name: string; // Asumo que es un nombre, por lo tanto string
}

export interface ApiResponse {
    status: boolean;
    data: DataItem[];
    links: Record<string, any>; // Ajusta según el tipo exacto de 'links' si es necesario
    meta: Meta;
    message: string;
    token: string;
}

export interface RequestTypeRequest {
    request_id: number;
    tipoSolicitud: string;
    proveedor: number;
    cuerpocorreo: string;
    aprobado: number;
}


export interface Confirmation {
    request_id: number;
    aclaracion: string;
    fecha_tarea: string;
    hora_tarea: string;
}

export interface NivelPrivacidad {
    id?:number;
    name:string;
    descripcion:string;
    created_at?:string;
}

export interface ResNivelesPrivacidad{
    message:string;
    data:NivelPrivacidad[];
}



                                                                                             
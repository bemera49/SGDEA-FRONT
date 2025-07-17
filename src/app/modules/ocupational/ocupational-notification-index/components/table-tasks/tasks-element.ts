// Caambiar el tipo de dato una vez tenida la api 
export enum Semaforo {
  VERDE = 'green',
  AMARILLO = 'yellow',
  ROJO = 'red'
}

export enum EstadoSolicitud {
  EN_TRAMITE = 'En trámite',
  EN_ELAMBORACION = 'En elaboración',
  APROBADO = 'Aprobado',
  EN_ESPERA_DE_APROBACION = 'En espera de aprobacion'
}



export interface TasksElement {
  Semaforos: Semaforo,
  Radicado: string;
  FHSolicitud: string; // Caambiar a data al momento de tener la api
  FechaDeVencimiento: string; // Caambiar a data al momento de tener la api
  TipoSolicitud: string;
  Tarea: string;
  FHAsignacion: string; // Caambiar a data al momento de tener la api
  EstadoSolicitud: EstadoSolicitud;
  Ver: string;

}

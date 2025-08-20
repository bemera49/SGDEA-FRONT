import { connect, Socket } from "socket.io-client";
import { environment } from "src/environments/environment";

export enum IOEvents {
  connect = "connect",
  disconnect = "disconnect",
  join_room = "join_room",
  notificador = "notificador",
}

/**
 * Clase que permite la conexión con el socket.
 */
export class SocketHelper {
  /**
   * Instancia de la clase.
   */
  private static instance: SocketHelper;

  /**
   * Socket de la conexión.
   */
  private socket: Socket;

  /**
   * Identificador del socket.
   */
  socketId?: string;

  constructor() {
    // SOLUCIÓN TEMPORAL: Comentar la conexión
    console.log("SocketHelper initialized but connection disabled");
    this.socket = connect(environment.SOCKET_ENDPOINT);

    /**
     * Evento que se dispara cuando se conecta al socket.
     */
    this.on<any>(IOEvents.connect, () => {
      console.log("Connected to socket", { socket: this.socket });
      this.socketId = this.socket?.id;
    });

    /**
     * Evento que se dispara cuando se desconecta del socket.
     */
    this.on(IOEvents.disconnect, () => {
      console.log("Disconnected from socket");
      this.socketId = undefined;
    });
  }

  /**
   * Funcionalidad para escuchar los eventos del socket.
   * @param event Evento que se dispara cuando se conecta al socket.
   * @param callback Función que se ejecuta cuando se escucha el evento.
   */
  on<T = unknown>(event: IOEvents, callback: (data?: T) => void) {
    this.socket.on(event, callback);
  }

  /**
   * Funcionalidad que permite emitir los eventos al servidor.
   * @param event Nombre del evento que estará escuchando el servidor.
   * @param data Información que se envía al servidor.
   */
  emit<T = unknown>(event: IOEvents, data?: T) {
    this.socket.emit(event, data);
  }

  /**
   * Método singleton que permite obtener la instancia de la clase.
   * @returns Instancia de la clase.
   */
  static getInstance(): SocketHelper {
    if (!SocketHelper.instance) {
      SocketHelper.instance = new SocketHelper();
    }

    return SocketHelper.instance;
  }
}

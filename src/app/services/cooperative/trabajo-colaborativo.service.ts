import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestService } from 'src/app/services/rest.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from "src/app/services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class TrabajoColaborativoService {
  private trabajoColaborativoRegistrosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  trabajoColaborativoRegistros$: Observable<any[]> = this.trabajoColaborativoRegistrosSubject.asObservable();
  versionApi = environment.versionApiDefault;
  authorization: string = this.restService.getUserData().accessToken; 

  constructor(
    private http: HttpClient,
    private restService:RestService,
    public lhs: LocalStorageService,
    public toastService: ToastService
  ) {}
  
  // Método para obtener los registros
  getRegistros(): Observable<any[]> {
    return this.trabajoColaborativoRegistros$;
  }


  // Método para agregar un registro
  agregarRegistro(radicado_id: any, user_id: any): void {
    if (!user_id || !radicado_id) {
      this.toastService.open({ title: 'Success', description: 'Se requierie seleccionar un usuario', duration: 2000, success: false });
      return;
    }

    const userData = this.restService.getUserData();

    const formData = {
        radicado_id: radicado_id,
        user_id: user_id,
        user_creator_trabajo_colaborativo_id: userData.idDataCliente
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authorization}`)
    
    this.http.post<any>(environment.apiUrlBasePath + 'api/v1/colaborativo/storePqrsDependenciasUser', formData, { headers })
      .subscribe(
        response => {
          this.obtenerUsuariosTrabajoColaborativo(radicado_id);
          this.getRegistros();
          console.log('Registro agregado:', response);
        },
        error => {
          console.error('Error al agregar el registro:', error);
        }
      );
  }

  // Método para eliminar un registro
  eliminarRegistro(radicado_id: number,user_id: number): void {
    const userData = this.restService.getUserData();

    const formData = {
        radicado_id: radicado_id,
        user_id: user_id,
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authorization}`)
    
    this.http.post<any>(environment.apiUrlBasePath + 'api/v1/colaborativo/deletePqrsDependenciasUser', formData, { headers })
      .subscribe(
        response => {
          this.obtenerUsuariosTrabajoColaborativo(radicado_id);
          this.getRegistros();
          console.log('Registro eliminado:', response);
        },
        error => {
          console.error('Error al eliminar el registro:', error);
        }
      );
  }

  // Método para establecer registros iniciales (por ejemplo, obtenidos de una API)
  setRegistros(registros: any[]): void {
    this.trabajoColaborativoRegistrosSubject.next(registros);
  }

  // Método para obtener usuarios de trabajo colaborativo desde la API
  obtenerUsuariosTrabajoColaborativo(radicado_id: number ): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorization}`);
    this.http.get<any[]>(environment.apiUrlBasePath + `api/v1/colaborativo/getUsuariosTrabajoColaborativo/${radicado_id}`, { headers })
      .pipe(
        map(response => response['usuariosTrabajoColaborativo']) // Mapea la respuesta si es necesario
      )
      .subscribe(
        usuarios => {
          console.log('usuarios',usuarios)
          this.setRegistros(usuarios);
        },
        error => {
          console.error('Error al obtener usuarios de trabajo colaborativo:', error);
        }
      );
  }

  // Método obtener la plantilla
  iniciarTrabajoColaborativo(radicado_id: number):void{
    const registros = this.trabajoColaborativoRegistrosSubject.value;
    if (registros.length === 0) {
      this.toastService.open({ title: 'Error', description: 'No se puede iniciar el trabajo colaborativo sin usuarios', duration: 2000, success: false });
      return; // Salir del método si no hay usuarios
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authorization}`);
    console.log( headers );
    this.http.post<any[]>(environment.apiUrlBasePath + `api/v1/colaborativo/setStartTrabajoColaborativo/`,{radicado_id:radicado_id}, { headers })
    .subscribe(
      radicado => {
        this.toastService.open({ title: 'Success', description: 'Trabajo colaborativo iniciado', duration: 2000, success: false });
        setTimeout(() => {
            location.reload();
        }, 2000);
        return; 
      },
      error => {
        console.error('Error al obtener usuarios de trabajo colaborativo:', error);
      }
    );
  }

}

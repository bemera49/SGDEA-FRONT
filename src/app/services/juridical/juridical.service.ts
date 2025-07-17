import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHeaderService } from '../auth-header/auth-header.service';
import { Observable } from 'rxjs/internal/Observable';
import { QualityTasksReceivedComponent } from '@app/modules/quality/quality-tasks-received/quality-tasks-received.component';

/**
 * @description Modelos 
 */
import { DetailElement, detailUpdate, Radicado } from './models/detail-element'
import { clasificacionRelatoria, restrictoresRelatoria, descriptoresRelatoria, subClasificacionRelatoria, conceptosRelatoria, fichaRelatoria } from './models/conceptos-element'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JuridicalService {
    private URL = environment.apiUrlBasePath;
    private apiUrl = environment.apiUrlBasePath + 'api/';
    public isChildRunning = new BehaviorSubject<Object>({ observacion: false, justificacion: false, key_tipo_tarea: '' });
    public objetoPadre = new BehaviorSubject<Object>({});
    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    //Services radicados
    getRadicados(id: number): Observable<Radicado> {
        console.log('id', id)
        return this.http.get<Radicado>(`${this.apiUrl}v1/juridico/professional-tasks/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getObservaciones(id_solicitud: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/solicitud/${id_solicitud}/comentarios`, { headers: this.authHeaderService.getAuthHeader() });
    }

    //Services detail
    getDetailByIdNotification(id: number): Observable<any> {
        console.log('Token - Eliminar', this.authHeaderService.getToken())
        return this.http.get<any>(`${this.apiUrl}v1/juridico/task-details/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    updateDetailById(detail: detailUpdate): Observable<detailUpdate> {
        return this.http.put<detailUpdate>(`${this.apiUrl}juridico/updateStatusRadi`, detail, { headers: this.authHeaderService.getAuthHeader() });
    }

    //Services professionals assignments
    postAssignProfessional(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/asignarResponsable`, data, { headers: this.authHeaderService.getAuthHeader() });
    }

    //________ FICHA RELATORIA _________________
    getfichaRelatoria(id_solicitud: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/fichaRelatoria/${id_solicitud}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    postfichaRelatoria(ficha: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/crearFichaRelatoria`, ficha, { headers: this.authHeaderService.getAuthHeader() });
    }

    updateFichaRelatoria(ficha: fichaRelatoria): Observable<fichaRelatoria> {
        return this.http.put<fichaRelatoria>(`${this.apiUrl}v1/juridico/fichaRelatoria/${ficha.id}`, ficha, { headers: this.authHeaderService.getAuthHeader() });
    }

    //________ DETALLE SOLICITUD HU000 _________________
    postDetailRequest(detalle: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/solicitud/crear`, detalle, { headers: this.authHeaderService.getAuthHeader() });
    }

    //Services concepts
    getClasificaciónRelatoria(): Observable<clasificacionRelatoria> {
        return this.http.get<clasificacionRelatoria>(`${this.apiUrl}juridico/clasificacionRelatoria`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getRestrictoresRelatoria(): Observable<restrictoresRelatoria> {
        return this.http.get<restrictoresRelatoria>(`${this.apiUrl}juridico/restrictoresRelatoria`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getDescriptoresRelatoria(): Observable<descriptoresRelatoria> {
        return this.http.get<descriptoresRelatoria>(`${this.apiUrl}juridico/descriptoresRelatoria`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getSubClasificacionRelatoria(id: number): Observable<subClasificacionRelatoria> {
        return this.http.get<subClasificacionRelatoria>(`${this.apiUrl}juridico/subClasificacionRelatoria?idClasificacion=${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getAllConcepts(filters?: number): Observable<conceptosRelatoria> {
        return this.http.post<conceptosRelatoria>(`${this.apiUrl}juridico/conceptos`, filters, { headers: this.authHeaderService.getAuthHeader() });
    }

    getAllConceptsWithFilters(filters?: any): Observable<conceptosRelatoria> {
        return this.http.post<conceptosRelatoria>(`${this.apiUrl}juridico/conceptos`, filters, { headers: this.authHeaderService.getAuthHeader() });
    }

    getProfessionalAssignments(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/resumen-assignments`, { headers: this.authHeaderService.getAuthHeader() });
    }

    getProfessionalAssignmentsId(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/professional-assignments/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    putApproveSolicitude(id: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}v1/juridico/approve-solicitude/${id}`, {}, { headers: this.authHeaderService.getAuthHeader() });
    }

    putRejectSolicitude(id: number, observacion: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}v1/juridico/reject-solicitude/${id}`, { observations: observacion }, { headers: this.authHeaderService.getAuthHeader() });
    }

    postSolicitarProrroga(id: number, justificacion: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/request-extension`, { tarea_solicitud_id: id, justificacion: justificacion }, { headers: this.authHeaderService.getAuthHeader() });
    }

    getRangosProrroga(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/extension-ranges`, { headers: this.authHeaderService.getAuthHeader() });
    }

    postAprobarProrroga( id: number, observations:string, range: number ): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/approve-extension/${id}`,
            {observations: observations, range: range}
            , { headers: this.authHeaderService.getAuthHeader() });
    }

    postRechazarProrroga( id: number, observations: string ): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/reject-extension/${id}`, {observations: observations}, { headers: this.authHeaderService.getAuthHeader() });
    }

    postCreateExtension( id: number ): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/create-extension/${id}`, {}, { headers: this.authHeaderService.getAuthHeader() });
    }

    getInfoExtension( id: number ): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}v1/juridico/info-extension/${id}`, { headers: this.authHeaderService.getAuthHeader() });
    }

    postApproveReviewExtension( id: number, observations: string, range: number ): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}v1/juridico/approve-review-extension/${id}`, {observations: observations, range: range}, { headers: this.authHeaderService.getAuthHeader() });
    }

    actualizarEnviarHijoAlPadre(mostrar: { observacion?: boolean, justificacion?: boolean, key_tipo_tarea?: string }) {
        this.isChildRunning.next(mostrar);
    }

    actualizarObjetoPadre(objeto: Object) {
        this.objetoPadre.next(objeto);
    }

    recibirObjetoPadre(): Observable<Object> {
        return this.objetoPadre.asObservable();
    }

    enviarHijoAlPadre(): Observable<Object> {
        return this.isChildRunning.asObservable();
    }

}

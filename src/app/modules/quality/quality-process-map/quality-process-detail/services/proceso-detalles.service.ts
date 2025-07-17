import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DocumentDetail, FileDetail, ProcessData, SubprocessDetail, } from 'src/app/services/quality-details/Interfaces/detailsConfig';

@Injectable({
  providedIn: 'root'
})
export class ProcesoDetallesService implements OnDestroy {
  // Actualiza los BehaviorSubject para usar las nuevas interfaces
  private Idrputerstep = new BehaviorSubject<{ step: number }>({ step: 1 })
  private datosProcesoSubject = new BehaviorSubject<ProcessData | null>(null)
  private subprocessSubject = new BehaviorSubject<SubprocessDetail[]>([])
  private documentsSubject = new BehaviorSubject<DocumentDetail | null>(null)
  private mostrarDescripcionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedSubprocessIdSubject = new BehaviorSubject<number | null>(null)
  private selectedDocumentIdSubject = new BehaviorSubject<number | null>(null)
  private selectedFileIdSubject = new BehaviorSubject<number | null>(null)
  private subprocesOrProcedure: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fileSubject = new BehaviorSubject<FileDetail | null>(null)
  private isCharacterizationSelected = new BehaviorSubject<boolean>(false);
  private selectedCharacterizationId = new BehaviorSubject<number | null>(null);

  //variables pubiclas es decir variables que toca reiniciarlas:
  public selectedFile = null
  public firstFilesId = null
  public selectedSubprocess = null
  public selectedDocument = null
  constructor() {
  }
  ngOnDestroy(): void {
    this.Idrputerstep.next({ step: 1 });
    this.datosProcesoSubject.next(null);
    this.subprocessSubject.next([]);
    this.documentsSubject.next(null);
    this.mostrarDescripcionSubject.next(false);
    this.selectedSubprocessIdSubject.next(null);
    this.selectedDocumentIdSubject.next(null);
    this.selectedFileIdSubject.next(null);
    this.subprocesOrProcedure.next(false);
    this.fileSubject.next(null);
    this.isCharacterizationSelected.next(false);
    this.selectedCharacterizationId.next(null);
    this.selectedFile = null;
    this.firstFilesId = null;
    this.selectedSubprocess = null;
    this.selectedDocument = null;
  }
  //Obtener datos del subproceso seleccionado:
  retrieveAndProcessSubprocess(): Observable<SubprocessDetail> {
    return this.getSubprocessById().pipe(
      switchMap(selectedSubprocessId => {
        return this.getDatosProceso().pipe(

          map(response => {
            if (response) {
              this.selectedSubprocess = null
              this.selectedSubprocess = response.subprocess.find(subprocess => subprocess.id === selectedSubprocessId);
              this.setSubprocess([this.selectedSubprocess])
              return this.selectedSubprocess;
            }
          })
        );
      }),
      tap(selectedSubprocess => {
        if (selectedSubprocess && selectedSubprocess.documents && selectedSubprocess.documents.length > 0) {
          const firstDocumentsId = selectedSubprocess.documents[0].id;
          this.setDocumentById(firstDocumentsId);
        }
      })
    );
  }

  //datos carpeta documents o procedimiento
  retrieveAndProcessDocument(): Observable<DocumentDetail> {

    return this.getDocumentById().pipe(
      switchMap(selectedDocumentId => {
        return this.getSubprocess().pipe(
          map((response: SubprocessDetail | any) => {
            if (response) {
              this.selectedDocument = response && response[0].documents.find(document => document.id === selectedDocumentId);
              this.setDocument(this.selectedDocument)

              return this.selectedDocument; // Retorna el procedimiento seleccionado
            }
          }),
          tap(selectedDocument => {
            if (this.fileSubject !== null && this.fileSubject !== undefined) {
              if (selectedDocument !== undefined) {
                this.firstFilesId = selectedDocument.files[0].id;
                this.setFileId(this.firstFilesId);
              }
            }
          })
        )
      })
    );
  }

  dateFile(): Observable<FileDetail> {
    return this.getFileId().pipe(
      switchMap(selectedFileId => {
        return this.getDocument().pipe(
          map((response: DocumentDetail | any) => {
            if (response !== null && response !== undefined) {
              this.selectedFile = response.files && response.files.find(files => files['id'] === selectedFileId);
              this.setFileById(this.selectedFile)
              return this.selectedFile; // Retorna el procedimiento seleccionado
            }
          })
        )
      })
    );
  }


  // Actualiza los datos del proceso
  setDatosProceso(data: ProcessData): void {
    this.datosProcesoSubject.next(data);
  }

  // Obtiene los datos del proceso
  getDatosProceso(): Observable<ProcessData | null> {
    return this.datosProcesoSubject.asObservable()
  }

  // Actualiza los subprocesos
  setSubprocess(subprocess: SubprocessDetail[]): void {
    this.subprocessSubject.next(subprocess);
    /*     this.retrieveAndProcessSubprocess()
        this.retrieveAndProcessSubprocess() */
  }

  // Obtiene los subprocesos
  getSubprocess(): Observable<SubprocessDetail[]> {
    return this.subprocessSubject.asObservable();
  }


  // Actualiza los subprocesos
  setDocument(Documents: DocumentDetail): void {
    this.documentsSubject.next(Documents);
  }

  // Obtiene los Datos de documents
  getDocument(): Observable<DocumentDetail> {
    return this.documentsSubject.asObservable();
  }

  // Establece el valor de mostrarDescripción
  setMostrarDescripcion(value: boolean): void {
    this.mostrarDescripcionSubject.next(value);
  }

  // Alternar el valor de mostrarDescripción
  toggleShowDescription(): void {
    const currentValue = this.mostrarDescripcionSubject.value;
    const newValue = !currentValue;
    this.mostrarDescripcionSubject.next(newValue);
  }

  // Obtiene el valor de mostrarDescripción
  getMostrarDescripcion(): Observable<boolean> {
    return this.mostrarDescripcionSubject.asObservable();
  }

  //metodo para obtener ek id de cada boton oprimido subproceso
  getSubprocessById(): BehaviorSubject<number | null> {
    return this.selectedSubprocessIdSubject;
  }

  //metodo para obtener ek id de cada boton oprimido documento
  getDocumentById(): BehaviorSubject<number | null> {
    return this.selectedDocumentIdSubject;
  }
  //obtener datos del archivo seleccionado
  getFileById(): Observable<FileDetail> {
    return this.fileSubject.asObservable();
  }
  //metodo para obtener el ID de files o archivo seleccionado
  getFileId(): BehaviorSubject<number | null> {
    return this.selectedFileIdSubject;
  }
  //obtener el ID de elemento  seleccionado: de las talas y step
  getbyidrouterstep(): Observable<{ step: number }> {
    return this.Idrputerstep.asObservable()
  }
  //Actuaiza el id de elemento seleccionado y step
  setbyidrouterstep(step: number) {
    this.Idrputerstep.next({ step })
    /* this.retrieveAndProcessSubprocess(); */
  }

  // Método para establecer el ID del subproceso seleccionado
  setSubprocessById(id: number): void {
    this.selectedSubprocessIdSubject.next(id);
    this.retrieveAndProcessSubprocess()
  }
  //obtener el estado si presenta subproceso a procedimiento
  getsubprocessOrProcedure(): Observable<boolean> {
    return this.subprocesOrProcedure.asObservable()
  }

  //metodo para hacer el cambio de datos presentados de subproceso a procedimiento
  setsubprocesOrProcedure(value: boolean): void {
    this.subprocesOrProcedure.next(value)
  }
  //metodo para obtener ek id de cada boton oprimido documento
  setDocumentById(id: number): void {
    this.selectedDocumentIdSubject.next(id)
    /*     this.retrieveAndProcessDocument() */
  }
  //Actualizar datos de file o archivo seleccionado
  setFileById(file: FileDetail): void {
    this.fileSubject.next(file)
  }

  //metodo para obtener el id de cada boton oprimido archivos
  setFileId(id: number | null): void {
    this.selectedFileIdSubject.next(id)
    this.dateFile()
  }
  // Método para actualizar el estado de selección de caracterización
  setIsCharacterizationSelected(isSelected: boolean) {
    this.isCharacterizationSelected.next(isSelected);
  }

  // Método para obtener el estado de selección de caracterización
  getIsCharacterizationSelected(): Observable<boolean> {
    return this.isCharacterizationSelected.asObservable();
  }

  // Método para actualizar el ID de caracterización seleccionado
  setSelectedCharacterizationId(id: number) {
    this.selectedCharacterizationId.next(id);
  }

  // Método para obtener el ID de caracterización seleccionado
  getSelectedCharacterizationId(): Observable<number | null> {
    return this.selectedCharacterizationId.asObservable();
  }
}

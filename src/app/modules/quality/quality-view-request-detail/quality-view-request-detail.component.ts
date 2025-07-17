import { Location } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalACComponent } from "@app/modules/components/modal-ac/modal-ac.component";
import { Subscription } from "rxjs";
import { RestService } from "src/app/services/rest.service";
import { Items } from "../quality-main/components/sub-menu-quality/items";
import { Data, DataItemInfo, DocumentFile } from "./model/view-reques-detail";
import { RequestDetailService } from "./services/request-detail/request-detail.service";

import { MatStepper } from "@angular/material/stepper";
import { ValidateInternetService } from "@app/services/validate-internet/validate-internet.service";
import { saveAs } from "file-saver";
import { environment } from "src/environments/environment";
import { MetadataDocumentModalComponent } from "@app/services/modal/components/metadata-document-modal/metadata-document-modal.component";
import { DataUserObservation } from "./components/tab-analysis-plan/interface/visualization";
import { DocumentService } from "@app/services/quality/document.service";
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";
import { ModalSolicitudPublicacionComponent } from "./components/modal-solicitud-publicacion/modal-solicitud-publicacion.component";
import { ModalService } from "@app/services/modal/modal.service";
import { RequestPublicationService } from "./services/request-publication/request-publication.service";
import { MetadataService } from "@app/services/quality/metadata.service";
import { ToastService } from "../../../services/toast/toast.service";
import { WaterMarkService } from "../../../services/quality/water-mark.service";

@Component({
  selector: "app-quality-view-request-detail",
  templateUrl: "./quality-view-request-detail.component.html",
  styleUrls: ["./quality-view-request-detail.component.css"],
})
export class QualityViewRequestDetailComponent implements OnInit, OnDestroy {
  btnfinish: boolean = true;
  botonesDeshabilitadosPropuesto: { [id: number]: boolean } = {};
  @ViewChild("stepper") stepper: MatStepper;
  private validateIt = inject(ValidateInternetService);
  private cdr = inject(ChangeDetectorRef);
  private _documentService = inject(DocumentService);
  private urlBase = environment.apiUrl;
  private modal = inject(ModalService);
  itemsMenu: Items[] = [
    {
      link: "quality-view-request",
      text: "Solicitudes",
    },
    {
      link: `quality-view-request/4`,
      text: "Ver solicitud",
    },
  ];

  location: Location;
  solicitudForm = new FormGroup({
    radicado: new FormControl("", [Validators.required]),
    Solicitante: new FormControl("", [Validators.required]),
    TipoDeSolicitud: new FormControl("", [Validators.required]),
    FechaDeSolicitud: new FormControl("", [Validators.required]),
    ProcesoDocumento: new FormControl("", [Validators.required]),
    EstadoSolicitud: new FormControl("", [Validators.required]),
    DocumentoModificar: new FormControl("", [Validators.required]),
    TipoDocumental: new FormControl("", [Validators.required]),
    Cargo: new FormControl("", [Validators.required]),
    Privacidad: new FormControl("", [Validators.required]),
    CentroDeCostos: new FormControl("", [Validators.required]),
    Gerencia: new FormControl("", [Validators.required]),
    DDO: new FormControl("", [Validators.required]),
    Justificacion: new FormControl("", [Validators.required]),
    seccionMultiple: new FormControl("", [Validators.required]),
    DocumentosPropuestos: new FormControl(null, [Validators.required]),
    Diagrama: new FormControl(null, [Validators.required]),
  });

  observationForm = new FormGroup({
    observation: new FormControl(null, [Validators.required]),
  });

  dataInformation: DataItemInfo[] = [];
  diagrama: DocumentFile | null = null;
  document: any | null = null;
  idTipeTask: number | null = null;
  validate_criteria_checked: any;
  editModel: any[] = [];
  dataView: Data = {
    dependence_all: null,
    applicant: null,
    date: "",
    diagram: null,
    document_file: null,
    documentary_type: "",
    documents_addtional: [],
    list_analysts_all_sap: [],
    filed: "",
    id: 0,
    is_propuesto: 0,
    justification: "",
    level: "",
    multiple_choice: 0,
    privacy: "",
    process: "",
    request_type: "",
    state: "",
    sub_process: "",
    analysis_plan: null,
    extend: "",
    document_id: null,
    sgc_tipo_tarea_id: null,
    validate_criteria_checked: [],
  };

  pdfMake: any;

  public idParam;
  pathDoc: string = "";
  proposedDocId!: number;
  dataSub!: Subscription;
  stateAnalysisPlan: string | null = "";
  requestType: string = "";
  exit = "/quality/quality-view-request";
  storageCheckInterval: NodeJS.Timeout;
  public isAllDocVersionsAdded: number = 0;
  public isAllDocWaterMarkAdded: number = 0;
  public taskId!: number;
  public modalOpen: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private router2: Router,
    location: Location,
    public restService: RestService,
    public dialog: MatDialog,
    private viewServices: RequestDetailService,
    private metadataSvc: MetadataService,
    private toastSvc: ToastService,
    private waterMarkSvc: WaterMarkService,
    private _serviceDocument: RequestPublicationService,
    private modalSvc: ModalService
  ) {
    this.validateIt.connect();
    this.location = location;

    this.itemsMenu = [
      {
        link: "quality-view-request",
        text: "Solicitudes",
      },
      {
        link: `quality-view-request/4`,
        text: "Ver solicitud",
      },
    ];
  }

  ngOnInit() {
    this.validateIt.checkConnection();
    if (this.validateIt.validateConnection()) {
      this.router.paramMap.subscribe((params) => {
        const id = params.get("id");

        this.idParam = parseInt(id);
        this.dataSub = this.viewServices.getData(id).subscribe((item) => {
          this.dataView = item.data;
          this.validate_criteria_checked = item.data.validate_criteria_checked;
          console.log(this.validate_criteria_checked);
          this.requestType = item.data.request_type;
          this.document = item.data.document_file;
          this.taskId = item.data.sgc_tipo_tarea_id;
          console.log(item);
          this.proposedDocId = item.data.document_id;
          this.pathDoc = `https://docs.google.com/viewer?url=${this.urlBase}${item.data.document_file.path}${item.data.document_file.original_name}&embedded=true`;
          if (item.data.diagram) {
            this.diagrama = item.data.diagram;
          }
          this.dataInformation = [
            { label: "Radicado", value: item.data.filed },
            { label: "Fecha de solicitud", value: item.data.date },
            { label: "Solicitante", value: item.data.applicant.applicant },
            { label: "Cargo", value: item.data.applicant.position },
            { label: "Gerencia", value: item.data.applicant.management },
            {
              label: "Dirección / División / Oficina",
              value: item.data.applicant.dependence,
            },
            {
              label: "Centro de costos",
              value: item.data.applicant.cost_center,
            },
            { label: "Nivel", value: item.data.level },
            {
              label: "Proceso al que pertenece el documento",
              value: item.data.process,
            },
            { label: "Subproceso", value: item.data.sub_process },
            {
              label: "Nombre del documento",
              value: item.data.document_file.name,
            },
            { label: "Tipo documental", value: item.data.documentary_type },
            { label: "Tipo de solicitud", value: item.data.request_type },
            { label: "Privacidad", value: item.data.privacy },
            { label: "Justificación", value: item.data.justification },
            { label: "Prórroga", value: item.data.extend },
          ];
          console.log(this.dataView)
          this.storageCheckInterval = setInterval(() => {
            this.validatebutton();
          }, 2000);
          this.cdr.detectChanges();
          this.getParamsState();
        });
      });
    }
  }

  setIdTask(){
    localStorage.setItem("id_task", this.idParam);
  }

  validatebutton() {
    let adicionales = localStorage.getItem("finish-adicionales") || "";
    let propuesto = localStorage.getItem("finish-propuesto") || "";
    if (this.dataView.documents_addtional.length === 0) adicionales = "true";

    if (adicionales === "true" && propuesto === "true") {
      this.btnfinish = false;
    }
  }
  submit() {
    this.modal.openAction("", "¿Está seguro de la acción a realizar?", () => {
      this.router.paramMap.subscribe((params) => {
        const id = params.get("id");
        this._serviceDocument.putFinished(Number(id)).subscribe({
          next: (res) => {
            console.log(res);
            this.modal
              .openNotify(
                "",
                "Solicitud de publicación finalizada con éxito",
                false
              )
              .afterClosed()
              .subscribe((res) =>
                this.router2.navigate(["/quality/quality-tasks-received"])
              );
          },
          error: (error) => {
            alert("La solicitud no se puede finalizar!");
            console.error("El error es: ", error);
          },
        });
      });
    });
  }

  getParamsState(): void {
    this.router.queryParams.subscribe((params) => {
      this.idTipeTask = params["task"];
      console.log(this.idTipeTask, "desde var tipe");
      this.stateAnalysisPlan = params["state"] ?? null;
      if (this.stateAnalysisPlan) {
        this.itemsMenu[0] = {
          link: "quality-tasks-received",
          text: "Tareas recibidas",
        };
        this.exit = "/quality/quality-tasks-received";
        this.stepper.selectedIndex = 4;
      }
    });
  }

  public isMap() {
    if (
      this.location.prepareExternalUrl(this.location.path()) ===
      "/maps/fullscreen"
    ) {
      return true;
    } else {
      return false;
    }
  }

  downloadPdf(): void {
    this.viewServices.exportFile(this.idParam).subscribe({
      next: (res: Blob) => {
        const nombreArchivo = this.dataView.filed;
        saveAs(res, nombreArchivo);
      },
      error: (error) => {
        alert("La solicitud no se puede exportar!");
        console.error("El error es: ", error);
      },
    });
  }

  openModalSolcitud(id: number) {
    console.log(id);

    const dialogRef = this.modal.open(ModalSolicitudPublicacionComponent, {
      data: {
        id: id,
        type: "doc-propuesto",
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Deshabilita el botón correspondiente
      this.botonesDeshabilitadosPropuesto[id] = true;

      // Guarda el estado en localStorage
      localStorage.setItem(
        "estadoBotonesDeshabilitadosPropuesto",
        JSON.stringify(this.botonesDeshabilitadosPropuesto)
      );
    });
    let successCount =
      parseInt(localStorage.getItem("cantidad-doc-propuesto")) || 0;
    console.log(successCount);
    if (successCount === 0) localStorage.setItem("finish-propuesto", "true");
  }

  openModal(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const modalRef = this.dialog.open(ModalACComponent, {
      width: "515px",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        img: "assets/img/questionIcon.svg",
        paragraph: "004. ¿Estas seguro de la acción a realizar?",
      },
    });

    modalRef.afterClosed().subscribe((result) => {
      alert("Generar un nueva solicitud");
    });
  }

  saveChanges() {
    if (this.solicitudForm.valid) {
      this.openModal("100ms", "100ms");
    }
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
    if (this.storageCheckInterval) {
      clearInterval(this.storageCheckInterval);
    }
    localStorage.removeItem("estadoBotonesDeshabilitadosPropuesto");
    localStorage.removeItem("estadoBotonesDeshabilitados");
    localStorage.removeItem("finish-adicionales");
    localStorage.removeItem("finish-propuesto");
  }

  openMetadataDialog(): void {
    const dialogRef = this.dialog.open(MetadataDocumentModalComponent, {
      data: { document: this.document, idSolicitud: this.dataView.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result !== undefined) {
      }
    });
  }

  onValid() {
    const dialogRef = this.modal.open(ActionModalComponent, {
      title: "",
      description: `¿Esta seguro de la acción al realizar?`,
      onConfirmAction: () => {
        this._documentService.validateSolicitude(this.dataView.id).subscribe({
          next: (res: any) => {
            console.log(res, "res save");
          },
          error: (error) => {
            console.log("error", error);
          },
        });
      },
    });

    // Esperamos a que el modal se cierre para ver qué decidió el usuario
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result === "confirm" &&
        dialogRef.componentInstance.data.onConfirmAction
      ) {
        // Si el usuario confirmó, ejecutamos la acción de confirmación
        dialogRef.componentInstance.data.onConfirmAction();
      }
    });
  }

  onBackSolicitude() {
    const dialogRef = this.modal.open(ActionModalComponent, {
      title: "",
      description: `¿Esta seguro de la acción al realizar?`,
      onConfirmAction: () => {
        this._documentService.backSolicitude(this.dataView.id).subscribe({
          next: (res: any) => {
            console.log(res, "res save");
          },
          error: (error) => {
            console.log("error", error);
          },
        });
      },
    });

    // Esperamos a que el modal se cierre para ver qué decidió el usuario
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result === "confirm" &&
        dialogRef.componentInstance.data.onConfirmAction
      ) {
        // Si el usuario confirmó, ejecutamos la acción de confirmación
        dialogRef.componentInstance.data.onConfirmAction();
      }
    });
  }

  onEndSolicitude() {
    this._documentService.endSolicitude(this.dataView.id).subscribe({
      next: (res: any) => {
        console.log(res, "res save");
      },
      error: (error) => {
        console.log("error", error);
      },
    });
  }

  onFinalize(): void {
    this.modalOpen = true;
    this.modalSvc.openAction(
      "",
      "¿Estás seguro de los cambios a realizar?",
      () => {
        if (this.taskId == 6) {
          this.finalizeVersionDocUpdate();
        } else if (this.taskId == 7) {
          this.finalizeWaterMarkDocUpdate();
        } else {
          console.log("no soporte al task id" + this.taskId);
        }
      }
    );
    this.modalOpen = false;
  }

  finalizeVersionDocUpdate() {
    if (this.isAllDocVersionsAdded == 0) {
      this.metadataSvc.endMetadataDocEdit(this.idParam).subscribe({
        error: (err: any) => {
          console.log(err);
          this.toastSvc.open({
            description: err.error.message,
            success: false,
            duration: 3000,
            title: "",
          });
        },
        next: (resp: any) => {
          this.toastSvc.open({
            description: resp.message,
            success: false,
            duration: 3000,
            title: "",
          });
          console.log(resp);
        },
      });
    } else {
      this.toastSvc.open({
        description: "Aun te faltan documento por versionar",
        success: false,
        duration: 3000,
        title: "",
      });
    }
  }

  finalizeWaterMarkDocUpdate() {
    if (this.isAllDocWaterMarkAdded == 0) {
      this.waterMarkSvc.endWaterMarkDocEdit(this.idParam).subscribe({
        error: (err: any) => {
          console.log(err);
          this.toastSvc.open({
            description: err.error.message,
            success: false,
            duration: 3000,
            title: "",
          });
        },
        next: (resp: any) => {
          this.toastSvc.open({
            description: resp.message,
            success: false,
            duration: 3000,
            title: "",
          });
          console.log(resp);
        },
      });
    } else {
      this.toastSvc.open({
        description: "Aun te faltan documento por agregar marca de agua",
        success: false,
        duration: 3000,
        title: "",
      });
    }
  }
}

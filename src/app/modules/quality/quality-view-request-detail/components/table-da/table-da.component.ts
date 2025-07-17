
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MetadataDocumentModalComponent } from '@app/services/modal/components/metadata-document-modal/metadata-document-modal.component';
import { ActionModalComponent } from '@app/services/modal/components/action-modal/action-modal.component';
import { ToastService } from '@app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';


import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from "@angular/core";
import { DocumentAdditional } from "../../model/view-reques-detail";
import { UpdateDataService } from "../save-documents/services/updata-data/update-data.service";
import { MultipleFile } from "./interface/multiple.file";
import { ModalService } from "@app/services/modal/modal.service";
import { ModalSolicitudPublicacionComponent } from "../modal-solicitud-publicacion/modal-solicitud-publicacion.component";

@Component({
  selector: "app-table-da",
  templateUrl: "./table-da.component.html",
  styleUrls: ["./table-da.component.css"],
})
export class TableDAComponent implements OnChanges, OnInit {
  constructor(private modal: ModalService, private router:Router) { }

  private ud = inject(UpdateDataService);
  public dialog = inject(MatDialog);
  private toast = inject(ToastService);
  private activateRoute = inject(ActivatedRoute)

  botonesDeshabilitados: { [id: number]: boolean } = {};
  headers = [
    {
      name: "+",
      key: "",
      action: true,
    },

    {
      name: "Documento adicional",
      key: "DocumentoAdicional",
    },
    {
      name: "Tipo  documento",
      key: "TipoDocumento",
    },
    {
      name: "Tipo  Solicitud",
      key: "TipoSolicitud",
    },
    {
      name: "Justificación",
      key: "Justificacion",
    },
    {
      name: "Anexo",
      key: "Anexo",
    },
    {
      name: '',
      key: '',
    },
    {
      name:'',
      key:''
    }
  ]
  @Input() dataTable!: DocumentAdditional[];
  @Input() canEditMetadata:boolean = false;
  @Input() taskId:number;
  multipleFile: MultipleFile[] = [];
  files: File[] = [];
  fileDoc: File | null = null;
  idTipeTask: number = 0;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  editMetadata(id:any){
    this.router.navigateByUrl(`/quality/quality-doc-metadata/${id}/${this.taskId}`)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.dataTable, 'datatable');
    this.getParams();
    const dataFiles = this.dataTable.map(file => {
      return {
        document_id: file.id,
        file_id: file.document_file.id,
        proposed_document: null,
      };
    });

    this.multipleFile = dataFiles;
    console.log(dataFiles, this.dataTable)
    console.log(this.taskId, this.canEditMetadata)
  }

  openModal(id: number) {
    console.log(this.dataTable);

    const dialogRef = this.modal.open(ModalSolicitudPublicacionComponent, {
      data: {
        id: id,
        type: "doc-adicional",
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Deshabilita el botón correspondiente
      this.botonesDeshabilitados[id] = true;

      // Guarda el estado en localStorage
      localStorage.setItem(
        "estadoBotonesDeshabilitados",
        JSON.stringify(this.botonesDeshabilitados)
      );
    });
    let successCount =
      parseInt(localStorage.getItem("cantidad-doc-adicional")) || 0;
    console.log(successCount);
    if (successCount === this.dataTable.length - 1)
      localStorage.setItem("finish-adicionales", "true");
  }
  parseFormData(): FormData {
    const formData = new FormData();

    this.multipleFile.forEach((documents, index) => {
      Object.entries(documents).forEach(([propiedad, val]) => {
        formData.append(
          `multiple_file[${index}][${propiedad}]`,
          val as string | Blob
        );
      });
    });

    return formData;
  }

  deleteAditionalDocument(id: number) {
    console.log(id, 'id doc aditional ')
    const dialogRef = this.modal.open(ActionModalComponent, {
      title: '004',
      description: `¿Esta seguro de la acción al realizar?`,
      onConfirmAction: () => {
        this.ud.deleteAditionalDocumnets(id).subscribe({
          next: (res) => {
            if (res.status) {
              console.log('exito');
            }
          }
        })

      },

      error: err => {
        this.toast.open({
          title: 'Error',
          description: `Petición fallida ${err.error.message}.`
        });
      },
    });


    // Esperamos a que el modal se cierre para ver qué decidió el usuario
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm' && dialogRef.componentInstance.data.onConfirmAction) {
        // Si el usuario confirmó, ejecutamos la acción de confirmación
        dialogRef.componentInstance.data.onConfirmAction();
      }
    });
  }
  onSubmit(): void {
    console.log("multiple", this.multipleFile);
    const parseData = this.parseFormData();
    console.log("parseData", parseData);
    this.ud.updateAdditionalDocuments(parseData).subscribe({
      next: (res) => {
        if (res.status) {
          console.log("exito");
        }
      },
    });
  }

  openMetadataDialog(index: number): void {
    console.log(this.dataTable[index].document_file.id, 'datatable dialog', index)
    const dialogRef = this.dialog.open(MetadataDocumentModalComponent, {
      data: { document: this.dataTable[index].document_file },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  getParams(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.idTipeTask = params['task'];

    })
  }
}

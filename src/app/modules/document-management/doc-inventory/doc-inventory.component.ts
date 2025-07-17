import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { ConvertParamsBase64Helper } from "@app/helpers/convert-params-base64.helper";
import { BreadcrumbComponent } from "@app/modules/components/breadcrumb/breadcrumb.component";
import { RestService } from "@app/services/rest.service";
import { environment } from "src/environments/environment";
import { ParamsService } from "../doc-manag-folder-view/services/params/params.service";
import * as XLSX from "xlsx";
import { TiposDocumentalesService } from "@app/services/gestion documental/tipos_documentales.service";
import { catchError } from "rxjs";
import { saveAs } from "file-saver";
import { ModalService } from "@app/services/modal/modal.service";
import { DivulgacionesService } from "@app/modules/quality/quality-view-request-detail/components/tab-divulgacion/services/divulgaciones.service";
@Component({
  selector: "app-doc-inventory",
  templateUrl: "./doc-inventory.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    BreadcrumbComponent,
  ],
  styleUrls: ["./doc-inventory.component.scss"],
})
export class DocInventoryComponent implements OnInit {
  breadcrumbOn = [{ name: "Expediente", route: "/documentManagement" }];
  breadcrumbRouteActive = "Consultar inventario documental";

  arrayinventory: any;
  newArrayInventory: any[] = [];
  formInventory: FormGroup;

  urlActive: string;
  paramOID: any;
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  headerInfo: any;

  constructor(
    private restService: RestService,
    private router: Router,
    private fb: FormBuilder,
    private modal: ModalService,
    private tiposDocumentalesService: TiposDocumentalesService,
    private _serviceDoc: DivulgacionesService
  ) {
    this.urlActive = this.router.url.split("/").pop();
  }

  ngOnInit(): void {
    this.getinventory();
    // Inicializar el formulario con campos vacíos y deshabilitados
    this.formInventory = this.fb.group({
      entidadRemitente: [{ value: "", disabled: true }],
      EntidadProductora: [{ value: "", disabled: true }],
      unidadAdmin: [{ value: "", disabled: true }],
      ofiProductora: [{ value: "", disabled: true }],
      objeto: [{ value: "", disabled: true }],
    });
  }

  initForm() {
    this.formInventory = this.fb.group({
      entidadRemitente: [
        { value: this.headerInfo.entidadRemitente || "", disabled: true },
      ],
      EntidadProductora: [
        { value: this.headerInfo.entidadProductora || "", disabled: true },
      ],
      unidadAdmin: [
        { value: this.headerInfo.unidadAdministrativa || "", disabled: true },
      ],
      ofiProductora: [
        { value: this.headerInfo.oficinaProductora || "", disabled: true },
      ],
      objeto: [{ value: this.headerInfo.objeto || "", disabled: true }],
    });
  }

  getinventory() {
    this._serviceDoc.getInventarioDocumental(this.urlActive).subscribe({
      next: (data: any) => {
        this.headerInfo = data.data.header;
        if (this.headerInfo) {
          this.initForm();
        }

        if (data.data.inventario.length > 0) {
          this.arrayinventory = data.data.inventario;
          this.newArrayInventory = this.filtrarCampos(this.arrayinventory);
        } else {
          this.modal.openNotify(
            "",
            "No se encontraron registros que coincidan con su consulta",
            false
          );
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrarCampos(arrayOriginal) {
    return arrayOriginal.map((item) => {
      return {
        "Numero radicado": item.numeroRadiRadicado,
        "Oficina productora": item.oficinaProductora,
        Serie: item.serie,
        Subserie: item.subserie,
        "Asunto/Expediente": item.asuntoExpediente,
        "Fecha inicio": item.fechaInicio,
        "Fecha fin": item.fechaFin,
        Caja: item.caja,
        Carpeta: item.carpeta,
        Tomo: item.tomo,
        Otro: item.otro,
        "Número de documentos": item.numeroDocumentos,
        "Número de folios": item.numeroFolios,
        Soporte: item.soporte,
        Estado: item.estado,
        Etapa: item.etapa,
      };
    });
  }

  exportExcel() {
    if (this.newArrayInventory.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        this.newArrayInventory
      );
      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ["data"],
      };
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "inventarioDocumental");
    } else {
      this.modal.openNotify(
        "",
        "No se encontraron registros a exportar",
        false
      );
    }
  }

  // Guardar archivo Excel
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    const EXCEL_EXTENSION = ".xlsx";
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = URL.createObjectURL(data);
    link.download = fileName + EXCEL_EXTENSION;
    link.click();
  }

  // Método para exportar a CSV
  exportCVS() {
    if (this.newArrayInventory.length > 0) {
      const csvData = this.convertToCSV(this.newArrayInventory);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.download = "inventarioDocumental.csv";
      link.click();
    } else {
      this.modal.openNotify(
        "",
        "No se encontraron registros a exportar",
        false
      );
    }
  }

  // Convertir datos a formato CSV
  private convertToCSV(objArray: any[]): string {
    const header = [
      "Numero radicado",
      "Oficina productora",
      "Serie",
      "Subserie",
      "Asunto/Expediente",
      "Fecha inicio",
      "Fecha fin",
      "Caja",
      "Carpeta",
      "Tomo",
      "Otro",
      "Número de documentos",
      "Número de folios",
      "Soporte",
      "Estado",
      "Etapa",
    ];
    const rows = objArray.map((item) => [
      item.numeroRadiRadicado,
      item.oficinaProductora,
      item.serie,
      item.subserie,
      item.asuntoExpediente,
      item.fechaInicio,
      item.fechaFin,
      item.caja,
      item.carpeta,
      item.tomo,
      item.numeroDocumentos,
      item.numeroFolios,
      item.soporte,
      item.estado,
      item.etapa,
    ]);
    let csv = header.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.join(",") + "\n";
    });
    return csv;
  }

  exportPDF() {
    const formData = new FormData();
    formData.append("id", this.urlActive);
    this._serviceDoc.postInventarioDocumental(formData).subscribe({
      next: (response: any) => {
        if (response && response.status === "success" && response.data) {
          const base64String = response.data;
          const blob = this.b64toBlob(base64String);
          const nombreArchivo = "inventario-documental.pdf";
          saveAs(blob, nombreArchivo);
        } else {
          console.error(
            "Error en la respuesta del servidor o data no disponible"
          );
        }
      },
      error: (error) => {
        console.error("Error al exportar inventario documental a PDF:", error);
      },
    });
  }

  imprimirPDF() {
    const formData = new FormData();
    formData.append("id", this.urlActive);

    this._serviceDoc.postInventarioDocumental(formData).subscribe({
      next: (response: any) => {
        if (response && response.status === "success" && response.data) {
          const base64String = response.data;
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);

          // Crear un iframe oculto y asignar la URL del blob como su src
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = url;

          // Agregar el iframe al DOM
          document.body.appendChild(iframe);

          // Esperar a que el iframe cargue y luego activar la impresión
          iframe.onload = () => {
            setTimeout(() => {
              iframe.contentWindow?.focus();
              iframe.contentWindow?.print();

              // Limpiar después de imprimir
              document.body.removeChild(iframe);
              window.URL.revokeObjectURL(url);
            }, 2000); // Aumentar el tiempo de espera a 2 segundos
          };

          // Abrir en una nueva pestaña como alternativa
          const newTab = window.open(url, "_blank");
          if (newTab) {
            newTab.focus();
            newTab.print();
          } else {
            console.error(
              "No se pudo abrir una nueva pestaña. Verifica los permisos del navegador."
            );
          }
        } else {
          console.error(
            "Error en la respuesta del servidor o data no disponible"
          );
        }
      },
      error: (error) => {
        console.error("Error al exportar inventario documental a PDF:", error);
      },
    });
  }

  b64toBlob(b64Data: string, contentType = "application/pdf", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  goBack(): void {
    this.router.navigate(["/documentManagement/folder-view-loan"]);
  }
}

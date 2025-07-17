import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BreadcrumbComponent } from "@app/modules/components/breadcrumb/breadcrumb.component";
import { DocumentManagementRoutingModule } from "../document-management-routing.module";
import { ModalService } from "@app/services/modal/modal.service";
import { Router } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RestService } from "@app/services/rest.service";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "@app/services/local-storage.service";
import { ProrrogaService } from "@app/services/pqrs/prorroga.service";

@Component({
  selector: "app-doc-manag-loan-view",
  templateUrl: "./doc-manag-loan-view.component.html",
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
  styleUrls: ["./doc-manag-loan-view.component.scss"],
})
export class DocManagLoanViewComponent implements OnInit {
  formConsulta: FormGroup;
  url: string = "gestionArchivo/prestamo-documental/index-manage-loan-files";
  urlApi = environment.versionApiDefault + this.url;
  urlListado =
    environment.versionApiDefault + "gestionDocumental/trd-dependencias";
  userData = this.restService.getUserData();
  authentication = this.userData.accessToken;
  breadcrumbOn = [{ name: "Expediente", route: "/documentManagement" }];
  breadcrumbRouteActive = "Consultar solicitudes de préstamo de documentos";
  allData: any[] = []; // Almacena todos los datos disponibles
  filteredArray: any[] = [];
  arrayDependencias: any[] = [];
  constructor(
    private modal: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private restService: RestService,
    private reciveDataService: ProrrogaService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getListadoSolicitudesPrestamo();
    this.getListadoDependency();
  }

  goBack(): void {
    this.router.navigate(["/documentManagement/folder-index/open"]);
  }

  initForm() {
    this.formConsulta = this.fb.group({
      avisoSap: [""],
      ofiProductora: [""],
      fInicial: [""],
      fFinal: [""],
    });
  }
  clean() {
    this.formConsulta.reset();
    this.filteredArray = [...this.allData]; // Vuelve a mostrar todos los datos
  }

  getListadoDependency() {
    this.restService
      .restGetParams(
        this.urlListado,
        `?request=${this.authentication}`,
        this.authentication
      )
      .subscribe({
        next: (data) => {
          this.arrayDependencias = data.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getListadoSolicitudesPrestamo() {
    const idCliente = this.userData.idDataCliente;
  
    this.restService
      .restGetParams(
        this.urlApi,
        `?request=${this.authentication}`,
        this.authentication
      )
      .subscribe({
        next: (data) => {
          this.allData = data.data;
  
          this.filteredArray = this.filtrarDatosPorRol(this.allData, idCliente, this.userData.idRol);
  
          if (this.filteredArray.length === 0) {
            this.modal.openNotify(
              "",
              "No se encontraron registros que coincidan con su consulta",
              false
            );
          }
        },
        error: (error) => {
          console.error(error);
          
        },
      });
  }
  
  filtrarDatosPorRol(data, idCliente, idRol) {
    switch (idRol) {
      case 37:
        return data.filter((item) => item.ubicacionTopologica2 === "Central");
      case 38:
        return data.filter(
          (item) =>
            item.ubicacionTopologica === "Gestión" ||
            item.ubicacionTopologica === "Histórico"
        );
      default:
        // Si no es 37 ni 38, filtrar por idCliente
        return data.filter((item) => item.idUser === idCliente);
    }
  }
  

  submit() {
    let filtro = this.formConsulta.value;
    filtro.fInicial = this.formatDate(filtro.fInicial);
    filtro.fFinal = this.formatDate(filtro.fFinal);

    this.filteredArray = this.allData.filter((item) => {
      // Convierte las fechas a objetos Date para facilitar la comparación
      const fechaInicioPrestamo = new Date(item.fechaInicioPrestamo);
      const fechaFinPrestamo = new Date(item.fechaFinPrestamo);
      const fInicial = new Date(filtro.fInicial);
      const fFinal = new Date(filtro.fFinal);
      // Aplica el filtro basado en los valores del formulario
      const matchesAvisoSap = filtro.avisoSap
        ? item.numeroSap.includes(filtro.avisoSap)
        : true;
      const matchesOfiProductora = filtro.ofiProductora
        ? item.dependency === filtro.ofiProductora.nombreGdTrdDependencia
        : true;
      const matchesFecha =
        filtro.fInicial && filtro.fFinal
          ? (fechaInicioPrestamo >= fInicial &&
              fechaInicioPrestamo <= fFinal) ||
            (fechaFinPrestamo >= fInicial && fechaFinPrestamo <= fFinal) ||
            (fechaInicioPrestamo <= fInicial && fechaFinPrestamo >= fFinal) // Si el rango de la base de datos envuelve completamente el filtro
          : true;

      return matchesAvisoSap && matchesOfiProductora && matchesFecha;
    });

  }

  viewDetail(data: any) {
    this.router.navigate(["/documentManagement/folder-loan", "editViewDetail"]);
    this.reciveDataService.senData(data);
  }
  formatDate(date: Date): string {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }
  
  navigateToDetail(data: any) {
    this.router.navigate(["/documentManagement/doc-inventory", data]);
  }
}
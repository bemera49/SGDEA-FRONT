import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { GlobalAppService } from 'src/app/services/global-app.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { TrdVersionAdministrationService } from '../../../services/trd/trd-version-administration.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-doc-manag-productions-office-index',
  templateUrl: './doc-manag-productions-office-index.component.html',
  styleUrls: ['./doc-manag-productions-office-index.component.css']
})
export class DocManagProductionsOfficeIndexComponent implements OnInit {
/** Initial List */
initCardHeaderStatus = true;
initCardHeaderIcon = 'bookmarks';
initCardHeaderTitle = 'Gestión Oficinas Productoras';

redirectionPath = '/documentManagement/production-office-trd-index';

/** BreadcrumbOn  */
breadcrumbOn = [
  { 'name': 'Gestión documental', 'route': '/documentManagement' },
  // { 'name': 'Versionamiento TRD TMP', 'route': '/documentManagement/upload-trd-index' }
];
breadcrumbRouteActive = 'Gestión Oficinas Productoras';

// Production office list properties
public productionOffices:any[]= [];
private urlBase = environment.apiUrl;
// Pagination
public totalPages!: number;
public currentPage: number = 1;

// Production office list filter
public officeCode:string =  '';
public officeName:string =  '';
public instrumentalType:string = '';
public status:string = '';

constructor(private http:HttpClient,  private authHeaderService: AuthHeaderService, public restService: RestService, public globalAppService: GlobalAppService, public lhs: LocalStorageService, private trdVersionAdminSvc:TrdVersionAdministrationService)  { }

  ngOnInit() {
    this.getProductionsOffice();
  }

  getProductionsOffice(){
    const url = `${this.urlBase}gestionDocumental/trd-dependencias/index?request=VTJGc2RHVmtYMS9rZkM2VFJLcDRUUGI5WHlDTERmZ2RQYWg0VWxyZXgyQjR4MmFKSGRpd2VEdlNYS0o5QjVUOA==`
    this.http.get(url,this.authHeaderService.getHttpHeadersOptions() )
        .subscribe({
          error:(err:any)=>{
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
          }
        })
  };

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProductionsOffice()
    }
  }
  /**
  * @description Metodo para formatear la data this.getDataTable() para luego exportar a excel.
  */
  downloadFileExcel(): void {
    const dataTable = [];
    const data = this.productionOffices;
    console.log('DATA', data)

    for (let i = 0; i < this.productionOffices.length; i++) {
      const item = {
        "# ": data[i] + 1,
        "Nombre versión TRD": data[i].version_nombre,
        "Tipo": this.formatDate(data[i].tipo_instrumento),
        "Fecha inicio aplicación": this.formatDate(data[i].fecha_inicio_aplicacion),
        "Fecha final aplicación": this.formatDate(data[i].fecha_final_aplicacion)  || 'No definido',
        "Estado": data[i].estado ,
      };
      dataTable.push(item);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const fileName = `Versiones_TRD_${formattedDate}.xlsx`;

    // Escribir el archivo con el nombre que incluye la fecha actual
    XLSX.writeFile(wb, fileName);
  }


  /**
  * @description Metodo para formatear la fecha en YYYY-MM-DD HH:MM:SS
  * @param dateString
  */
  formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

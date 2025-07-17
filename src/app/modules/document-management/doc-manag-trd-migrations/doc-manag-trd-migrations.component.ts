import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TrdVersionAdministrationService } from '@app/services/trd/trd-version-administration.service';
import * as XLSX from 'xlsx';
import { ModalService } from '../../../services/modal/modal.service';
import Swal from 'sweetalert2';
import { DocManagUploadTrdErrorsComponent } from '../doc-manag-upload-trd-errors/doc-manag-upload-trd-errors.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doc-manag-trd-migrations',
  templateUrl: './doc-manag-trd-migrations.component.html',
  styleUrls: ['./doc-manag-trd-migrations.component.css']
})

export class DocManagTrdMigrationsComponent implements OnInit {
  // Pagination
  public totalPages!: number;
  public currentPage: number = 1;

  @Input() trdMigrations:any[] =[];
  @Input() nameTrdVersion:string = '';
  @Input() trdId:any;
  @Output() reload = new EventEmitter<boolean>();

  public selectedFile:any;

  public modalOpen:boolean = false;
  constructor(public dialog: MatDialog,private modalSvc:ModalService, private trdAdminSvc:TrdVersionAdministrationService) { }

  ngOnInit(): void {
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getTrdMigrations()
    }
  };

  getTrdMigrations(){
      this.reload.emit(true);
  }

   /**
  * @description Metodo para formatear la data this.getDataTable() para luego exportar a excel.
  */
   downloadFileExcel(): void {
    const dataTable = [];
    const data = this.trdMigrations;

    for (let i = 0; i < this.trdMigrations.length; i++) {
      const item = {
        "Nombre Archivo ": data[i].nombre,
        "Fecha Cargue":  this.formatDate(data[i].fecha),
        "Cantidad Registros": data[i].registros,
        "Estado": data[i].registros  > 1 ? 'Sin novedades': 'Con novedades' ,
      };
      dataTable.push(item);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const fileName = `MIGRACIONES_TRD_${formattedDate}.xlsx`;

    // Escribir el archivo con el nombre que incluye la fecha actual
    XLSX.writeFile(wb, fileName);
  };

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
  };

  migrateTrd(){
    const fd = new FormData();

    fd.append('fileUpload', this.selectedFile);
    fd.append('versionId', this.trdId);

    this.trdAdminSvc.migrateTrd(fd, this.trdId)
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            if (Array.isArray(resp.decrypted.data.error) && resp.decrypted.data.error[0]) {
              Swal({
                title: "Algo está mal..",
                position: "top",
                toast: true,
                showConfirmButton: true,
                confirmButtonText: 'Ver',
                type:'error'
              }).then((result: any) => {
                this.openDialogUploadError(resp.decrypted.data.error);
              });
            } else if (resp.decrypted.data.error) {
              Swal({
                title: "Algo está mal..",
                position: "top",
                toast: true,
                showConfirmButton: false,
                type:'error',
                text:resp.decrypted.data.error,
                width: 800
              })
            } else {
                  this.getTrdMigrations();
                 Swal({
                   title: "¡Carga Exitosa!",
                   position: "top",
                   toast: true,
                   showConfirmButton: false,
                   type:'success',
                   text: `Se han cargado ${resp.decrypted.register} registros. ${resp.decrypted.message}`,
                   width: 600,
                 })
            }
          }
        })
  };

  confirmMigrate(){
    this.modalOpen = true;
    this.modalSvc.openAction("", "Se ha cargado el archivo seleccionado, ¿Desea continuar con el proceso de migración", () => { this.migrateTrd() })
    this.modalOpen = false;
  };

  onFileSelected(event: any): void {
    this.selectedFile = null
    this.selectedFile = event.target.files[0];
    this.confirmMigrate();
  };

  openDialogUploadError(data:any): void {
    this.dialog.open(DocManagUploadTrdErrorsComponent, {
      data: data
    });
  };
}



import { AfterViewChecked, Component, EventEmitter, Inject, Input, OnInit, Output, } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from "@angular/material/dialog";
import { RestService } from "@app/services/rest.service";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-detail-cuatro-setenta-dos",
  template: "",
  styleUrls: ["./detail-cuatro-setenta-dos.component.css"],
})
export class DetailCuatroSetentaDosComponent implements OnInit {
  @Output() public closeModalEmiter = new EventEmitter<any>(); // Data a retornar
  @Input() idDocument: object;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(ViewCuatroSetentaDosModalDialog, {
      disableClose: false,
      width: "100%",
      height: 'auto',
      data: this.idDocument,
    });
    dialogRef.afterClosed().subscribe((res) => {
      let respuesta = res;
      if (!respuesta) {
        respuesta = { event: "close", status: false, data: [] };
      }
      this.closeComponent(respuesta);
    });
  }

  /*** Método para cerrar o destruir el componente desde el padre ***/
  closeComponent(respuesta) {
    this.closeModalEmiter.emit(respuesta);
  }
}

@Component({
  selector: "app-detail-cuatro-setenta-dos-dialog",
  templateUrl: "./detail-cuatro-setenta-dos.component.html",
  styleUrls: ["./detail-cuatro-setenta-dos.component.css"],
})
export class ViewCuatroSetentaDosModalDialog
  implements OnInit, AfterViewChecked {
  constructor(
    public dialogRef: MatDialogRef<ViewCuatroSetentaDosModalDialog>,
    @Inject(MAT_DIALOG_DATA) public idDocument: number,
    private restService: RestService,
    private sanitizer: DomSanitizer
  ) { }
  soporteFisicoData: any;
  viewCuatroSetentaDosStatus = false;

  versionApi = environment.versionApiDefault;
  pathConsulta47 = "api/472/consultar/soporte-fisico";
  userData = this.restService.getUserData();
  authentication = this.userData.accessToken;

  styleIframe: any = {
    'display': 'none'
  };
  styleContent: any = {
    'height': '150px'
  };

  viewPdfStatus: boolean = true;
  @Input() colGrip: string = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
  @Input() styleContentNew: any = {
    'height': '500px'
  };

  async ngOnInit() {
    await this.getSoporteFisico();
    console.log(this.soporteFisicoData)
  }

  ngAfterViewChecked() {
    $(".cdk-global-overlay-wrapper").css("z-index", "1000");
    $(".cdk-overlay-pane").css("overflow", "auto");
  }


  getSoporteFisicoOb(): Observable<any> {
    console.log(this.pathConsulta47, 'URL')
    return this.restService.restGetNotDecrypt(`${this.pathConsulta47}/${this.idDocument}`, this.authentication)

  }
  async getSoporteFisico() {
    await this.getSoporteFisicoOb().pipe(catchError((err: any) => {
      throw new Error
      console.error(err)
    })).subscribe(response => this.soporteFisicoData = response)
  }

  getUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  closeDialog() {
    this.dialogRef.close({ event: "close", status: false, data: [] });
  }
}

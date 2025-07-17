import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IAssociatedRequest, IDataTableHeader, body } from './util/data';
import { Observable, Subscription, catchError, delay, map, of, throwError } from 'rxjs';
import { RestService } from '@app/services/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { AuthService } from '@app/services/auth.service';
import { AsociarSolicitudesHu13ConfirmComponent } from '../asociar-solicitudes-hu13-confirm/asociar-solicitudes-hu13-confirm.component';



@Component({
  selector: 'app-asociar-solicitudes-hu13',
  templateUrl: './asociar-solicitudes-hu13.component.html',
  styleUrls: ['./asociar-solicitudes-hu13.component.css']
})
export class AsociarSolicitudesHu13Component implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'idRadiRadicado', 'numeroCuentaContrato', 'contactoSap', 'usuario_que_solicita', 'creacionRadiRadicado'];

  dataSource = new MatTableDataSource<IAssociatedRequest>();
  selection = new SelectionModel<IAssociatedRequest>(true, []);
  errorOccurred: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<AsociarSolicitudesHu13Component>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public restService: RestService,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getSolicitudes().pipe(
      map((response: any) => response.data)
    ).subscribe(res => {
      this.dataSource = new MatTableDataSource<IAssociatedRequest>(res);
    });
  }
  ngOnDestroy(): void {
  }

  public getSolicitudes(): Observable<IAssociatedRequest[]> {

    const token = this.restService.getUserData().accessToken;
    let dependenciaId = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea)).data.dependencia.idGdTrdDependencia;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log({token})

    return this.http.get<IAssociatedRequest[]>(`${environment.apiUrlBasePath}api/radicados?dependencia_id=${dependenciaId}`, httpOptions)
  }


  asociar() {
    
    let radicadosIds = this.selection.selected.map(e => e.idRadiRadicado);
   
    let data = {
      radicado_id: parseInt(this.data.id),
      asociados: radicadosIds
    }
    console.log({data})
    this.openDialog(data)
  }

  openDialog(data): void {
    let ref = this.dialog.open(AsociarSolicitudesHu13ConfirmComponent, {
      width: '250px',
      data
    });

    ref.afterClosed().subscribe((res) => {
      this.close()
    })
  }

  close() {
    this.dialogRef.close();
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


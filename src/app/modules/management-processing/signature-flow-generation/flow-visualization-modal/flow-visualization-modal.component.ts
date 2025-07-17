import { Component, Input, OnInit, Inject } from '@angular/core';
import { SigninService } from '../../signin.service';
import { tableHeaders } from '../utils/table-headers';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({
  selector: 'app-flow-visualization-modal',
  templateUrl: './flow-visualization-modal.component.html',
  styleUrls: ['./flow-visualization-modal.component.css']
})
export class FlowVisualizationModalComponent implements OnInit {


  constructor(
    public signinService: SigninService,
    public dialogRef: MatDialogRef<FlowVisualizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  

  public headers = tableHeaders;

  public revisoresConfig;
  public aprobadoresConfig;
  public aprobadoresFirmantesConfig;

  public registros;

  ngOnInit(): void {
    const {revisores, aprobadores, aprobadoresFirmantes} = this.data    

    this.revisoresConfig = {
      headers: tableHeaders,
      texts: {
        title: 'Revisores',
        description: 'Descripcion'
      },
      fetch: () => of(revisores),
      idTracker: 'id',
    
    };
  

    this.registros = [revisores, aprobadores, aprobadoresFirmantes]

  }

  close() {
    this.dialogRef.close()
  }
  
}

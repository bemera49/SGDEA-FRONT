import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SortAlphabeticalModule } from '@app/modules/quality/pipes/sort-alphabetical/sort-alphabetical.module';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { LayoutSectionModule } from '@app/modules/quality/quality-view-request-detail/components/layout-section/layout-section.module';
import { ShowDateModule } from '@app/modules/quality/quality-view-request-detail/components/tab-analysis-plan/components/show-date/show-date.module';
import { VisualizationConversationModule } from '@app/modules/quality/quality-view-request-detail/components/tab-analysis-plan/components/visualization-conversation/visualization-conversation.module';
import { DataUserObservation } from '@app/modules/quality/quality-view-request-detail/components/tab-analysis-plan/interface/visualization';
import { Data } from '@app/modules/quality/quality-view-request-detail/model/view-reques-detail';
import { DocumentService } from '@app/services/quality/document.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { CommentModel, UpdateMetadataModel } from './models/comment.model';



@Component({
  selector: 'app-metadata-document-modal',
  standalone: true,
  imports: [
    VisualizationConversationModule,
    ShowDateModule,
    MatSelectModule,
    SortAlphabeticalModule,
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    LayoutSectionModule,
    ReactiveFormsModule,
    ButtonContinueModule,
    MatDialogModule
  ],
  templateUrl: './metadata-document-modal.component.html',
  styleUrls: ['./metadata-document-modal.component.css']
})
export class MetadataDocumentModalComponent {
  valueCode = '';
  valueName = '';
  displayedColumns: string[] = ['name', 'code'];
  dataSource: any;
  dataObservation: DataUserObservation[] = [];
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastService);
  public restService = inject(RestService)
  aprovalDate: string | null = '2024-06-04 11:13:26';
  startdate: string | null = '2024-06-04 11:13:26';
  endDate: string | null = '2024-06-04 11:13:26';
  constructor(
    public dialogRef: MatDialogRef<MetadataDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _documentService: DocumentService,
  ) { }

  dataModal = this.data

  metadataForm = new FormGroup({

    level: new FormControl({ value: '', disabled: true }, Validators.required),
    process: new FormControl({ value: '', disabled: true }, Validators.required),
    subprocess: new FormControl({ value: '', disabled: true }, Validators.required),
    procedure: new FormControl({ value: '', disabled: true }, Validators.required),
    documentName: new FormControl({ value: '', disabled: true }, Validators.required),
    management: new FormControl({ value: '', disabled: true }, Validators.required),
    direction: new FormControl({ value: '', disabled: true }, Validators.required),
    costCenter: new FormControl({ value: '', disabled: true }, Validators.required),
    typeDocumentary: new FormControl({ value: '', disabled: true }, Validators.required),
    typeRequest: new FormControl({ value: '', disabled: true }, Validators.required),
    privacy: new FormControl({ value: '', disabled: true }, Validators.required),
    code: new FormControl('', Validators.required),
    folio: new FormControl('', Validators.required),
    version: new FormControl({ value: '', disabled: true }, Validators.required),
    observation: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.searchMetadata();
    console.log(this.dataModal, 'data modal');

    console.log(this.restService.getUserData().idDataCliente, 'ciente');
    this.searchCommentsMetadata();

  }

  handleSubmit() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.saveSomeMetadata();
  }

  setMetadata(data: any) {

    if (data) {
      console.log(data.level, 'level')
      this.metadataForm.controls["level"].setValue(data.level[0].id);
      this.metadataForm.controls["process"].setValue(data.proces[0].id);
      this.metadataForm.controls["subprocess"].setValue(data.subproces[0].id);
      this.metadataForm.controls["procedure"].setValue(data.procedure);
      this.metadataForm.controls["documentName"].setValue(data.name);
      this.metadataForm.controls["management"].setValue(data.management[0].id);
      this.metadataForm.controls["direction"].setValue('Oficina');
      this.metadataForm.controls["costCenter"].setValue(data.cost_center[0].id);
      this.metadataForm.controls["typeDocumentary"].setValue(data.type_documentary[0].id);
      this.metadataForm.controls["typeRequest"].setValue(data.type_request[0].id);
      this.metadataForm.controls["privacy"].setValue(data.privacy[0].id);
      this.metadataForm.controls["code"].setValue(data.code);
      this.metadataForm.controls["folio"].setValue(data.folio);
      this.metadataForm.controls["version"].setValue(data.version);
      this.metadataForm.controls["observation"].setValue(data.description_change);
    }


  }

  searchMetadata() {

    if (this.dataModal) {
      this._documentService.getMetadata(this.dataModal.document.id).subscribe({
        next: (res: any) => {
          this.dataSource = res;
          console.log(this.dataSource, 'respuesta');
          this.setMetadata(res.data);
        },
        error: (error) => {
          console.log('error', error);
        }
      });
    }
  }

  searchCommentsMetadata() {

    if (this.dataModal) {
      this._documentService.getCommentMetadata(this.dataModal.idSolicitud).subscribe({
        next: (res: any) => {
          this.dataObservation = res.data;
          console.log(res, 'respuesta comen');
        },
        error: (error) => {
          console.log('error', error);
        }
      });
    }
  }


  // saveSomeMetadata
  saveSomeMetadata() {
    // this.restService.getUserData().idDataCliente;
    let data: UpdateMetadataModel = {
      descripcion_cambio: this.metadataForm.get('observation').value,
      codigo: this.metadataForm.get('code').value,
      folio: parseInt(this.metadataForm.get('folio').value)
    }

    this._documentService.saveSomeMetadata(data, this.dataSource.data.id).subscribe({
      next: (res: any) => {

        console.log(res, 'res save');
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }
}


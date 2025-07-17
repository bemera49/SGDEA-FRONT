import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Data } from '@app/modules/quality/quality-view-request-detail/model/view-reques-detail';
import { DocumentService } from '@app/services/quality/document.service';



@Component({
  selector: 'app-search-document-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule

  ],
  templateUrl: './search-document-modal.component.html',
  styleUrls: ['./search-document-modal.component.css']
})
export class SearchDocumentModalComponent {
  valueCode = '';
  valueName = '';
  displayedColumns: string[] = ['code', 'name'];
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<SearchDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _documentService: DocumentService,
  ) { }

  dataModal = this.data

  handleSubmit() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close()
  }

  searchDocument() {
    let data = {
      name: this.valueName,
      code: this.valueCode,
    }
    this._documentService.searchFile(data).subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }
}

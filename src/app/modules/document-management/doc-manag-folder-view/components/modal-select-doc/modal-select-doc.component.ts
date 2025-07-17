import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { TypeDocumentService } from '../../services/type-document/type-document.service';
import { ModalDocInfoComponent } from '../modal-doc-info/modal-doc-info.component';
import { ModalUploadDocumentComponent } from '../modal-upload-document/modal-upload-document.component';

@Component({
  selector: 'app-modal-select-doc',
  templateUrl: './modal-select-doc.component.html',
  styleUrls: ['./modal-select-doc.component.css']
})
export class ModalSelectDocComponent {

  private dialog = inject(MatDialog);
  private tds$ = inject(TypeDocumentService);
  private ddps$ = inject(DataDocParamsService);

  formSelect = new FormGroup({
    select: new FormControl(0)
  })


  onSubmit(): void {

    this.tds$.setTypeDoc(this.formSelect.get('select').value);

    if (this.formSelect.get('select').value === 1 || this.formSelect.get('select').value === 3) {
      const ref = this.dialog.open(ModalUploadDocumentComponent);
      ref.afterClosed().subscribe(res => {
        if (res) {
          ref.close();
;
        }
      })
    }

    if (this.formSelect.get('select').value === 2) {
      const ref = this.dialog.open(ModalDocInfoComponent);
      ref.afterClosed().subscribe(res => {
        if (res) {
          ref.close();
          
        }
      })
    }
  }


}

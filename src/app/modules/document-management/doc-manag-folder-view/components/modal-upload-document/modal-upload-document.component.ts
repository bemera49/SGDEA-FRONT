import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { EncryptService } from '@app/services/encrypt.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { environment } from 'src/environments/environment';
import { DataFileDoc } from '../../model/data-file-doc';
import { DataFileDocService } from '../../services/data-file-doc/data-file-doc.service';
import { ParamsService } from '../../services/params/params.service';
import { TypeDocumentService } from '../../services/type-document/type-document.service';
import { ModalDocInfoComponent } from '../modal-doc-info/modal-doc-info.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-upload-document',
  templateUrl: './modal-upload-document.component.html',
  styleUrls: ['./modal-upload-document.component.css']
})
export class ModalUploadDocumentComponent implements OnInit {
  nameFile: string = '';
  private restService = inject(RestService);
  private globalAppService = inject(GlobalAppService);
  private baseUrl = environment.apiUrl;
  private auth = inject(AuthHeaderService);
  private tds$ = inject(TypeDocumentService);
  private prs$ = inject(ParamsService);
  private encryptService = inject(EncryptService);
  private http = inject(HttpClient);
  private dfd$ = inject(DataFileDocService);
  private dialog = inject(MatDialog);

  updateForm = new FormGroup({
    descripcion: new FormControl("", Validators.required),
    origen: new FormControl(0),
    id: new FormControl(0),
    fileUpload: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.tds$.getTypeDoc().subscribe(type => {
      this.updateForm.get('origen').setValue(type);
    })
    this.updateForm.get('id').setValue(this.prs$.getValue());
  }

  uploadFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.nameFile = file.name;
    this.updateForm.get('fileUpload').setValue(file);
  }




  transformData(): FormData {
    const formData = new FormData;

    const data = {
      dataForm: {
        origen: this.updateForm.get('origen').value,
        descripcion: this.updateForm.get('descripcion').value
      },
      ButtonSelectedData: [
        {
          id: this.updateForm.get('id').value
        }
      ],
      fileUpload: this.updateForm.get('fileUpload').value
    }

    const entries = Object.entries(data);

    for (const [key, value] of entries) {
      formData.append(key, value);
    }

    return formData;
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.dfd$.setDataFileDoc(this.updateForm.value as DataFileDoc);
      const ref = this.dialog.open(ModalDocInfoComponent);
      ref.afterClosed().subscribe(res=>{
        if(res){
          ref.close();
        }
      })
      /* 
            const data = {
              dataForm: {
                origen: this.updateForm.get('origen').value,
                descripcion: this.updateForm.get('descripcion').value,
      
              },
              ButtonSelectedData: [
                {
                  id: this.updateForm.get('id').value
                }
              ],
            } */
      /* this.encryptService.generateRouteGetParams('radicacion/transacciones/upload-document-to-expedient', data, this.auth.getToken()).then(response => {
        console.log('url', response);
        const url = response as string;
        const formData = new FormData;
        formData.append('fileUpload', this.updateForm.get('fileUpload').value);
        this.http.post(this.baseUrl + url, formData, {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.auth.getToken(),
            'language': localStorage.getItem('language') ? localStorage.getItem('language') : 'es'
          }),
          reportProgress: true,
          observe: 'events'

        }).subscribe({
          next: (res) => {
            console.log('exito', res)
          },
          error: (err) => {
            console.error('error', err);
          }
        })

      }) */

    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../../services/modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../../../../services/toast/toast.service';
import { RequestExtensionService } from '../../../../services/request-extension/request-extension.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-request-extension',
  templateUrl: './request-extension.component.html',
  styleUrls: ['./request-extension.component.css']
})
export class RequestExtensionComponent implements OnInit {
  @Input() requestId:any;
  @Input() justification:string = '';
  public form:FormGroup;
  public modalOpen:boolean = false;
  constructor(private fb:FormBuilder, private modalService:ModalService, private toastSvc:ToastService, private requestExtensionSvc:RequestExtensionService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      extension: [null, [Validators.required, Validators.min(1), Validators.max(30)]],
      observations: [''],
      extensionDate: ['',],
    });

  }

  confirm(){
    if (this.form.valid) {
      this.modalOpen = true;
      this.modalService.openYesNoAction("", "¿Está seguro de la acción a realizar?", () => {
        this.onConfirm()
       }).afterClosed().subscribe(() => {
        this.modalOpen = false;

      })
    }
  }

  onConfirm(){
    let fd = new HttpParams()
      .append('request_id',  this.requestId)
      .append('extend', this.form.controls["extension"].value)
      .append('observation', this.form.controls["observations"].value)

    this.requestExtensionSvc.requestExtensionChoice(fd)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                this.toastSvc.open({
                  title: '003',
                  description: 'Error del sistema',
                  success: false,
                  duration:2000
                });
              },
              next:(resp:any) => {
                console.log(resp);
                this.toastSvc.open({
                  title: '001',
                  description: 'Registro Exitoso',
                  success: true,
                  duration:2000
                });
              }
            });
  };

}

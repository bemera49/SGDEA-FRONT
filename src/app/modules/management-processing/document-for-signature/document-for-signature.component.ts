import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminTopNavBarComponent } from '@app/modules/admin-layout/admin-top-nav-bar/admin-top-nav-bar.component';
import { NavItem } from '@app/modules/md/md.module';
import { SignatureHomeHeaders } from '@app/modules/management-processing/document-for-signature/utils/table-headers';
import { PqrsActionsService } from '@app/modules/pqrs/pqrs-view/useCases/pqrs-actions.service';
import { ActivateTranslateService } from '@app/services/activate-translate.service';
import { AuthService } from '@app/services/auth.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { BnNgIdleService } from 'bn-ng-idle';
import PerfectScrollbar from 'perfect-scrollbar';
import { Subscription, Subject, take, switchMap, of, takeUntil, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";
import { filter } from 'rxjs/operators';
import { TablecopyComponent } from '@app/modules/components/tablecopy/tablecopy.component';
import { SignatureDetailComponent } from '../signature-detail/signature-detail.component';
import { SignatureEditComponent } from '../signature-edit/signature-edit.component';
@Component({
  selector: 'app-document-for-signature',
  templateUrl: './document-for-signature.component.html',
  styleUrls: ['./document-for-signature.component.css']
})
export class DocumentForSignatureComponent implements OnInit {


  modal = inject(ModalService)
  authService = inject(AuthService)
  http = inject(HttpClient)

  // controlar modal de exito o error
  isSuccess: boolean = true;




  public pqrsActions = inject(PqrsActionsService)

  constructor(
    public router: Router,
    public restService: RestService,

  ) {

  }



  ngOnInit() {
 
    this.dataConfig
  }




  public selectedRows$: number[] = []

  onSelect($event: any) {
    this.selectedRows$ = $event.map(item => item.idRadiRadicado);
    // console.log(this.selectedRows$)
  }

public params = new FormGroup({
  idTramitador: new FormControl(this.restService.getUserData().idDataCliente),
})

 public dataConfig = {
    headers: SignatureHomeHeaders,
    texts: {
      title: 'Flujos realizados',
      description: 'Descripcion'
    },
    fetch: () => this.pqrsActions.getAllSignatures(this.params),
    idTracker: 'idRadiRadicado',
    searchLength: true,
    actions: [{
      icon: 'visibility',
      routerLink: 'signin/detail',
      label: 'Ver solicitud',
      void: (item: any) => {
        this.modal.open(SignatureDetailComponent, {
          itemData: item
        })
      }
    }, {
      icon: 'edit',
      routerLink: ``,
      label: 'Editar solicitud',
      void: (item: any) => {
        this.router.navigate([`signin/edit/${item.idRadiRadicado}`])
      }
    }],
  };




  ngOnDestroy() {
   
  }


  onRefresh() {
  }
}

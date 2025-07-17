import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminTopNavBarComponent } from '@app/modules/admin-layout/admin-top-nav-bar/admin-top-nav-bar.component';
import { NavItem } from '@app/modules/md/md.module';
import { SigninHomeTableHeaders } from '../document-for-signature/utils/table-headers';
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
import { SigninService } from '../signin.service';
@Component({
  selector: 'app-signature-home',
  templateUrl: './signature-home.component.html',
  styleUrls: ['./signature-home.component.css']
})
export class SignatureHomeComponent implements OnInit {


  modal = inject(ModalService)
  authService = inject(AuthService)
  http = inject(HttpClient)
  signin$ = inject(SigninService)

  // controlar modal de exito o error
  isSuccess: boolean = true;



  public SigninHomeTableHeaders = SigninHomeTableHeaders;
  public pqrsActions = inject(PqrsActionsService)

  constructor(
    public router: Router,
    public restService: RestService,

  ) {

  }



  ngOnInit() {
 
    this.signin$.getSignatures().subscribe(res => console.log('Respuesta:', res))

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
    headers: SigninHomeTableHeaders,
    texts: {
      title: 'Flujos necesarios de firma',
      description: 'Descripcion'
    },
    fetch: () => this.signin$.getSignatures(),
    
    
    idTracker: 'idRardicado',
    searchLength: true,
    actions: [{
      icon: 'edit',
      routerLink: 'signin/detail',
      label: 'Firmar',
      void: (item: any) => {
          this.router.navigate([`/signin/internal-signin/${item.idRardicado}`])
      }
    }],
  };




  ngOnDestroy() {
   
  }


  onRefresh() {
  }

}

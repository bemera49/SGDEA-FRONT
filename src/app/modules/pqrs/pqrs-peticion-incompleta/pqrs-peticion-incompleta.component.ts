import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/services/modal/modal.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pqrs-peticion-incompleta',
  templateUrl: './pqrs-peticion-incompleta.component.html',
  styleUrls: ['./pqrs-peticion-incompleta.component.css']
})
export class PqrsPeticionIncompletaComponent implements OnInit {
  id = this.actRoute.snapshot.params['id']
  loading = false
  authentication = this.restService.getUserData().accessToken

  constructor(
    private actRoute: ActivatedRoute,
    private modal: ModalService,
    private toast: ToastService,
    private router: Router,
    private restService: RestService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    try {
      this.loading = true
      this.http.get(environment.apiUrlBasePath + `api/sgc/peticion-incompleta/validar/${this.actRoute.snapshot.params['id']}`, { headers: { Authorization: "Bearer " + this.authentication } })
        .subscribe((data: any) => {
          if (data.respuesta == false)
            this.toast.open({ title: 'Petición incompleta', description: data.mensaje, duration: 10000, success: false })
          this.router.navigate(['/pqrs/pqrs-view/' + this.actRoute.snapshot.params['id']])
        })
    } catch (error) {
      this.toast.open({ title: 'Error al cargar', duration: 10000, success: false })
      this.router.navigate(['/pqrs/pqrs-view/' + this.actRoute.snapshot.params['id']])
    }
  }

}

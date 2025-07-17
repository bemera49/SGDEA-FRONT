import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { Dependencias } from '../../model/dependencias';
import { Permisos } from '../../model/permisos';
import { ChangeTrazaService } from '../../services/change-traza/change-traza.service';
import { ParamsService } from '../../services/params/params.service';
import { PermisosService } from '../../services/permisos/permisos.service';

@Component({
  selector: 'app-modal-dependency',
  templateUrl: './modal-dependency.component.html',
  styleUrls: ['./modal-dependency.component.css']
})
export class ModalDependencyComponent implements OnInit, OnDestroy {

  private restService = inject(RestService);
  private ac = inject(AuthHeaderService);
  private globalAppService = inject(GlobalAppService);
  private lhs = inject(LocalStorageService);
  private ps = inject(ParamsService);
  private pms$ = inject(PermisosService);
  private permisos$: Subscription = undefined;
  private toast = inject(ToastService);
  private cts$ = inject(ChangeTrazaService);

  idExp: string;
  authorization: string;
  dependencias: Dependencias[] = [];
  versionApi = "";
  permisos: Permisos[] = [];
  permisosAceptados: number[] = [];

  formDependency = new FormGroup({
    idExpediente: new FormControl(0, Validators.required),
    idDependencia: new FormControl("", Validators.required),
    permisos: new FormControl([], Validators.required),
    justificacion: new FormControl("", Validators.required)
  })


  ngOnInit(): void {
    this.formDependency.get("idExpediente").setValue(this.ps.getValue());
    this.getTokenLS();
    this.getDependencias();
    this.permisos$ = this.pms$.getPermisos().subscribe(permisos => {
      this.permisos = permisos;
    })
  }

  getTokenLS() {
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      this.getListDependencia();

    });
  }
  onSubmit(): void {
    this.agregarPermisos();
  }

  onChecked(completed: boolean, id: number): void {
    if (completed) {
      this.permisosAceptados.push(id)
    } else {
      this.permisosAceptados = this.permisosAceptados.filter(idPermisos => idPermisos !== id);
    }

    this.formDependency.get('permisos').setValue(this.permisosAceptados);
  }


  agregarPermisos(): void {
    if (this.formDependency.valid) {
      this.restService.restPost('gestionDocumental/expedientes/save-dependencias-permisos', this.formDependency.value, this.ac.getToken()).subscribe(
        (data) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(data).then((res) => {

            if (res) {
              this.toast.open({
                title: 'Registro exitoso'
              })
              this.cts$.setDepende(true)
            }
          });
        }, (err) => {

          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        });
    }
  }

  getDependencias(): void {
    const params = {
      id: this.ps.getValue()
    }
    this.restService.restGetParams(this.versionApi + 'gestionDocumental/expedientes/get-available-dependencias', params, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            this.dependencias = data.data

          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }

  getListDependencia() {
    const params = {
      id: this.ps.getValue()
    }
    this.restService.restGetParams(this.versionApi + 'gestionDocumental/expedientes/get-dependencias-permisos', params, this.authorization).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {


          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }


  ngOnDestroy(): void {
    this.permisos$?.unsubscribe();
  }

} 

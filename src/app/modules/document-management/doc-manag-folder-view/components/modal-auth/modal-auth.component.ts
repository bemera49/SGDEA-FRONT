import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHeaderService } from '@app/services/auth-header/auth-header.service';
import { GlobalAppService } from '@app/services/global-app.service';
import { RestService } from '@app/services/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Permisos } from '../../model/permisos';
import { BuscarUsuariosService } from '../../services/buscar-usuarios/buscar-usuarios.service';
import { ChangeTrazaService } from '../../services/change-traza/change-traza.service';
import { ParamsService } from '../../services/params/params.service';
import { PermisosService } from '../../services/permisos/permisos.service';
import { Usuarios } from '../table-auth/model/usuarios';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css']
})
export class ModalAuthComponent implements OnInit, OnDestroy {

  private restService = inject(RestService);
  private ac = inject(AuthHeaderService);
  private globalAppService = inject(GlobalAppService);
  private ps = inject(ParamsService);
  private pms$ = inject(PermisosService);
  private permisos$: Subscription = undefined;
  private search$ = inject(BuscarUsuariosService);
  permisos: Permisos[] = [];
  permisosAceptados: number[] = [];
  textoPredictivo: Usuarios[] = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  private toast = inject(ToastService);
  private cts$ = inject(ChangeTrazaService);

  formAuth = new FormGroup({
    idExpediente: new FormControl(0, Validators.required),
    idUser: new FormControl(0, Validators.required),
    permisos: new FormControl([], Validators.required),
    justificacion: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.formAuth.get("idExpediente").setValue(this.ps.getValue());
    this.permisos$ = this.pms$.getPermisos().subscribe(permisos => {
      this.permisos = permisos;
    })
    this.buscarUsuarios();
  }


  setIdUsuario(id: number): void {
    this.formAuth.get('idUser').setValue(id);
  }

  buscarUsuarios(): void {
    this.formAuth.get("nombre").valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {

        return this.search$.getUsuarios({
          id: this.ps.getValue(),
          name: value.trim().toLocaleUpperCase()
        });

      }),
      takeUntil(this.onDestroy$)
    ).subscribe(item => {
      this.textoPredictivo = item.decrypted.data;

    })
  }

  getUsuarios(name: string): void {
    console.log('id', this.ps.getValue());
    const params = {
      id: this.ps.getValue(),
      name
    }

    this.restService.restGetParams('gestionDocumental/expedientes/get-available-usuarios', params, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            this.textoPredictivo = data.data;
          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });
  }

  onChecked(completed: boolean, id: number): void {
    if (completed) {
      this.permisosAceptados.push(id)
    } else {
      this.permisosAceptados = this.permisosAceptados.filter(idPermisos => idPermisos !== id);
    }

    this.formAuth.get('permisos').setValue(this.permisosAceptados);

  }

  getUsuarioAutorizados(): void {

    const params = {
      id: this.ps.getValue(),

    }

    this.restService.restGetParams('gestionDocumental/expedientes/get-available-usuarios', params, this.ac.getToken()).subscribe(
      (data) => {

        // Evaluar respuesta del servicio
        this.globalAppService.resolveResponse(data).then((res) => {

          if (res) {
            console.log('data usuarios', data);

          }
        });
      }, (err) => {

        // Evaluar respuesta de error del servicio
        this.globalAppService.resolveResponseError(err).then((res) => { });
      });

  }

  onSubmit(): void {

    if (this.formAuth.valid) {

      const data = this.formAuth.value;
      delete data.nombre;

      this.restService.restPost('gestionDocumental/expedientes/save-usuarios-permisos', data, this.ac.getToken()).subscribe(
        (data) => {

          // Evaluar respuesta del servicio
          this.globalAppService.resolveResponse(data).then((res) => {

            if (res) {
              this.toast.open({
                title: 'Registro exitoso'
              })

              this.cts$.setUsuario(true);
            }
          });
        }, (err) => {

          // Evaluar respuesta de error del servicio
          this.globalAppService.resolveResponseError(err).then((res) => { });
        });
    }
  }


  ngOnDestroy(): void {
    this.permisos$?.unsubscribe();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Permisos } from '../../model/permisos';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { ParamsService } from '../../services/params/params.service';
import { PermisosDocService } from '../../services/permisos-doc/permisos-doc.service';
import { ParamsDependency } from '../modal-dependency-doc/model/dependencias-doc';
import { BodyUsuariosDoc, ParamsAuthUsuarios, UsuariosAuth } from './model/auth-doc';
import { AuthDocService } from './services/auth-doc/auth-doc.service';

@Component({
  selector: 'app-modal-auth-doc',
  templateUrl: './modal-auth-doc.component.html',
  styleUrls: ['./modal-auth-doc.component.css']
})
export class ModalAuthDocComponent implements OnInit {

  private ads = inject(AuthDocService);
  private permisos$: Subscription = null;
  private paramsAuth: ParamsDependency = null;
  private dps = inject(DataDocParamsService);
  private paramsIdEx = inject(ParamsService);
  private pds = inject(PermisosDocService);
  private onDestroy$: Subject<void> = new Subject<void>();
  permisosAceptados: number[] = [];
  permisos: Permisos[] = [];

  formAuth = new FormGroup({
    idDocumentoIncluidoPivot: new FormControl(0),
    nombre: new FormControl(""),
    idUsuario: new FormControl(0, Validators.required),
    permisos: new FormControl([], Validators.required),
    justificacion: new FormControl("", Validators.required),

  });

  textoPredictivo: UsuariosAuth[] = [];

  ngOnInit(): void {
    this.dps.getDataDocParams().subscribe(res => {
      this.paramsAuth = {
        idDocumentoIncluidoPivot: res.idDocumentoIncluidoPivot

      }
      this.formAuth.get('idDocumentoIncluidoPivot').setValue(res.idDocumentoIncluidoPivot);
      
    })

    this.getPermisos();
    this.buscarUsuarios();
  }

  setIdUsuario(id: number): void {
    this.formAuth.get('idUsuario').setValue(id);
  }


  onChecked(completed: boolean, id: number): void {
    if (completed) {
      this.permisosAceptados.push(id)
    } else {
      this.permisosAceptados = this.permisosAceptados.filter(idPermisos => idPermisos !== id);
    }

    this.formAuth.get('permisos').setValue(this.permisosAceptados);

  }

  buscarUsuarios(): void {
    this.formAuth.get("nombre").valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {

        const params: ParamsAuthUsuarios = {
          ...this.paramsAuth,
          name: value
        }
        console.log('params', params)
        return this.ads.getUsuarios(params)

      }),
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (res) => {
        this.textoPredictivo = res.data
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  getPermisos(): void {
    this.permisos$ = this.pds.getPermisos().subscribe({
      next: (res) => {
        this.permisos = res.data;
      },
      error: (err) => {
        console.error(`Error : ${err}`)
      }
    })
  }

  onSubmit(): void {

    if (this.formAuth.valid) {
      const data = this.formAuth.value as BodyUsuariosDoc;
      delete data.nombre;
      this.ads.postPermisosUsuarios(data).subscribe({
        next: (res) => {
          console.log('res', res);
        },
        error: (err) => {
          console.error('ERROR', err);
        }
      });
    }


  }
}

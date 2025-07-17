import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { ParamsDoc } from '../../model/data-doc-params';
import { DataDocParamsService } from '../../services/data-doc-params/data-doc-params.service';
import { ParamsService } from '../../services/params/params.service';
import { PermisosDocService } from '../../services/permisos-doc/permisos-doc.service';
import { BodyDependency, Dependency } from './model/dependencias-doc';
import { DependencyDocService } from './services/dependency-doc/dependency-doc.service';

@Component({
  selector: 'app-modal-dependency-doc',
  templateUrl: './modal-dependency-doc.component.html',
  styleUrls: ['./modal-dependency-doc.component.css']
})
export class ModalDependencyDocComponent implements OnInit, OnDestroy {

  private pds = inject(PermisosDocService);
  private dcs = inject(DependencyDocService);
  private paramsDependency: ParamsDoc = null;
  private permisos$: Subscription = undefined;
  private prs = inject(ParamsService);
  private dps = inject(DataDocParamsService)
  private dataParamsSub$: Subscription = null;
  private toast = inject(ToastService);
  permisosAceptados: number[] = [];

  dependencias: unknown[] = [];
  permisos: Dependency[] = [];

  formDepDoc = new FormGroup({
    idDocumentoIncluidoPivot: new FormControl(0),
    idDependencia: new FormControl(0, Validators.required),
    permisos: new FormControl([], Validators.required),
    justificacion: new FormControl('', Validators.required)
  });



  ngOnInit(): void {

    this.dataParamsSub$ = this.dps.getDataDocParams().subscribe(res => {
      if(res){
        this.paramsDependency = {
          idDocumentoIncluidoPivot: res.idDocumentoIncluidoPivot
        }
        this.formDepDoc.get('idDocumentoIncluidoPivot').setValue(res.idDocumentoIncluidoPivot);
      }
    })

    this.getPermisos();
    this.getDependency();
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

  getDependency(): void {
    this.dcs.getDependency(this.paramsDependency).subscribe({
      next: (res) => {
        this.dependencias = res.data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onChecked(completed: boolean, id: number): void {
    if (completed) {
      this.permisosAceptados.push(id)
    } else {
      this.permisosAceptados = this.permisosAceptados.filter(idPermisos => idPermisos !== id);
    }

    this.formDepDoc.get('permisos').setValue(this.permisosAceptados);
  }

  onSubmit(): void {
    if (this.formDepDoc.valid) {

      const data = this.formDepDoc.value as BodyDependency;

      this.dcs.postDependency(data).subscribe({
        next: (res) => {
          this.toast.open({
            title: 'Registro exitoso'
          })
        },
        error: (err) => {
          console.log(`err ${err}`)
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dataParamsSub$?.unsubscribe();
    this.permisos$?.unsubscribe();
  }
}

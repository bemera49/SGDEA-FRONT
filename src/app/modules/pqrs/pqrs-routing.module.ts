import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes
 */
import { PqrsMainComponent } from './pqrs-main/pqrs-main.component';
// Pqrs Log
import { PqrsProyectarRespuestaComponent } from './pqrs-proyectar-respuesta/pqrs-proyectar-respuesta.component';
import { PqrsCuentasContratoComponent } from './pqrs-cuentas-contrato/pqrs-cuentas-contrato.component';
import { PqrsCuentasContratoViewComponent } from './pqrs-cuentas-contrato-view/pqrs-cuentas-contrato-view.component';
import { PqrsViewAssociatedComponent } from './pqrs-view-associated/pqrs-view-associated/pqrs-view-associated.component';
import { GestionarTrasladoComponent } from '@app/services/modal/components/pqrs/gestionar-traslado/gestionar-traslado.component';

import { VerRespuestaProyectadaComponent } from './pqrs-ver-respuesta-proyectada/ver-respuesta-proyectada.component';

//HU030 - Radicados con varias cuentas contrato y agregar o editar cuentas contrato en un radicado.
import { CreacionContactosComponent } from './radicados-cuenta-contrato/creacion-contactos/creacion-contactos.component';
import { ViewProrrogaComponent } from '@app/services/modal/components/pqrs/gestionar-prorroga/view-prorroga/view-prorroga.component';
import { PqrsPeticionIncompletaComponent } from './pqrs-peticion-incompleta/pqrs-peticion-incompleta.component';
import { PqrsListadoComponent } from './pqrs-listado/pqrs-listado.component';
import { PqrsDetalleComponent } from './pqrs-detalle/pqrs-detalle.component';

const routes: Routes = [

  // physical space
  { path: 'log-pqrs-index', component: PqrsListadoComponent },
  { path: 'pqrs-view/:id', component: PqrsDetalleComponent },
  { path: 'pqrs-associated/:id', component: PqrsViewAssociatedComponent },
  { path: 'pqrs-view/:id/proyectar-respuesta', component: PqrsProyectarRespuestaComponent },
  { path: 'pqrs-view/:id/ver-respuesta-proyectada/:idSalida', component: VerRespuestaProyectadaComponent },
  { path: 'pqrs-view/:id/gestionar-traslado', component: GestionarTrasladoComponent },
  { path: 'pqrs-view/:id/view-prorroga', component: ViewProrrogaComponent },
  { path: 'pqrs-view/:id/peticion-incompleta', component: PqrsPeticionIncompletaComponent },
  { path: 'pqrs-cuentas-contrato', component: PqrsCuentasContratoComponent },
  { path: 'pqrs-cuentas-contrato/:id', component: PqrsCuentasContratoViewComponent },
  { path: 'pqrs-view/:id/creacion-contactos', component: CreacionContactosComponent },
];

PqrsMainComponent
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PqrsRoutingModule { }

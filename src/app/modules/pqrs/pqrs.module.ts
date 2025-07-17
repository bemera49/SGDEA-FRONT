/**

 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MaterialModule } from "../../app.material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BnNgIdleService } from 'bn-ng-idle';

import { PqrsRoutingModule } from "./pqrs-routing.module";
import { AdminLayoutModule } from "../admin-layout/admin-layout.module";
import { ComponentsModule } from "../components/components.module";
import { PqrsMainComponent } from "./pqrs-main/pqrs-main.component";
/** Pqrs log */
import { PqrsProyectarRespuestaComponent } from "./pqrs-proyectar-respuesta/pqrs-proyectar-respuesta.component";
import { PqrsCuentasContratoComponent } from "./pqrs-cuentas-contrato/pqrs-cuentas-contrato.component";
import { PqrsCuentasContratoViewComponent } from "./pqrs-cuentas-contrato-view/pqrs-cuentas-contrato-view.component";

import { CardComponent } from "src/app/modules/components/card/card.component";
import { AsociarSolicitudesHu13Component } from "./pqrs-log-index/uses/asociar-solicitudes-hu13/asociar-solicitudes-hu13.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { TableComponent } from "../components/table/table.component";
import { CanDirective } from "@app/directives/can.directive";
import { PqrsViewAssociatedComponent } from './pqrs-view-associated/pqrs-view-associated/pqrs-view-associated.component';
import { AsyncPipe } from "@angular/common";
import { AsociarSolicitudesHu13ConfirmComponent } from './pqrs-log-index/uses/asociar-solicitudes-hu13-confirm/asociar-solicitudes-hu13-confirm.component';
import { SolicitudVistoBuenoComponent } from './solicitud-visto-bueno/solicitud-visto-bueno.component';
import { RechazoVistoBuenoComponent } from './rechazo-visto-bueno/rechazo-visto-bueno.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxDocViewerModule } from "ngx-doc-viewer";

//HU030 - Radicados con varias cuentas contrato y agregar o editar cuentas contrato en un radicado.
import { CreacionContactosComponent } from './radicados-cuenta-contrato/creacion-contactos/creacion-contactos.component';
import { UploadModalComponent } from './radicados-cuenta-contrato/upload-modal/upload-modal.component';
import { AvisosSapSgoModalComponent } from './radicados-cuenta-contrato/avisos-sap-sgo-modal/avisos-sap-sgo-modal.component'
import { VerRespuestaProyectadaComponent } from './pqrs-ver-respuesta-proyectada/ver-respuesta-proyectada.component';
import { PqrsPeticionIncompletaComponent } from './pqrs-peticion-incompleta/pqrs-peticion-incompleta.component'
import { ProyectarRespuestaFormComponent } from "../components/proyectar-respuesta-form/proyectar-respuesta-form.component";
import { PqrsListadoComponent } from './pqrs-listado/pqrs-listado.component';
import { PqrsDetalleComponent } from './pqrs-detalle/pqrs-detalle.component';
import { SgdaEditorComponent } from "../components/sgda-editor/sgda-editor.component";

@NgModule({
  declarations: [
    PqrsListadoComponent,
    PqrsMainComponent,
    PqrsProyectarRespuestaComponent,
    CardComponent,
    AsociarSolicitudesHu13Component,
    PqrsCuentasContratoComponent,
    PqrsCuentasContratoViewComponent,
    PqrsViewAssociatedComponent,
    AsociarSolicitudesHu13ConfirmComponent,
    SolicitudVistoBuenoComponent,
    RechazoVistoBuenoComponent,
    CreacionContactosComponent,
    UploadModalComponent,
    AvisosSapSgoModalComponent,
    VerRespuestaProyectadaComponent,
    PqrsPeticionIncompletaComponent,
    PqrsDetalleComponent
  ],
  imports: [
    SgdaEditorComponent,
    CommonModule,
    PqrsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    /**
     * Modulos
     */
    AdminLayoutModule,
    ComponentsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    BreadcrumbComponent,
    TableComponent,
    CanDirective,
    AsyncPipe,
    MatRadioModule,
    NgxDocViewerModule,
    ProyectarRespuestaFormComponent
  ],
  exports: [],
  providers: [BnNgIdleService]
})
export class PqrsModule { }

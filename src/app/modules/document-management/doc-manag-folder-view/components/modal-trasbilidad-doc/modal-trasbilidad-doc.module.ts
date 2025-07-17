import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTrasbilidadDocComponent } from './modal-trasbilidad-doc.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    ModalTrasbilidadDocComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
  ],
  exports:[ModalTrasbilidadDocComponent]
})
export class ModalTrasbilidadDocModule { }

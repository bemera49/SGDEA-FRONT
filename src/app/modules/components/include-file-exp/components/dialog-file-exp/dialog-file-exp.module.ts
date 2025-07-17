import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalConfirmModule } from '@app/modules/components/modal-confirm/modal-confirm.module';
import { TableExpModule } from '@app/modules/components/table-exp/table-exp.module';
import { DialogFileExpComponent } from './dialog-file-exp.component';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    DialogFileExpComponent
  ],
  imports: [
    CommonModule,
    TableExpModule,
    ModalConfirmModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    /*    AppRoutingModule, */
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
  exports: [DialogFileExpComponent]
})
export class DialogFileExpModule { }

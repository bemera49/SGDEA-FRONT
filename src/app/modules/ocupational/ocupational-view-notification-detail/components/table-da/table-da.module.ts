import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDirective } from '@app/directives/can.directive';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { DocumentModifiableModule } from '../document-modifiable/document-modifiable.module';
import { DownloadDocModule } from '../download-doc/download-doc.module';
import { InputMeetingsModule } from '../input-meetings/input-meetings.module';
import { LayoutSectionModule } from '../layout-section/layout-section.module';
import { SelectMeetingsModule } from '../select-meetings/select-meetings.module';
import { TextMeetingsModule } from '../text-meetings/text-meetings.module';
import { TableDAComponent } from './table-da.component';
@NgModule({
  declarations: [TableDAComponent],
  imports: [
    CommonModule,
    SelectMeetingsModule,
    InputMeetingsModule,
    FormsModule,
    ButtonContinueModule,
    TextMeetingsModule,
    LayoutSectionModule,
    DownloadDocModule,
    DocumentModifiableModule,
    CanDirective
  ],
  exports: [TableDAComponent]
})
export class TableDAModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputMeetingsModule } from '../input-meetings/input-meetings.module';
import { SelectMeetingsModule } from '../select-meetings/select-meetings.module';
import { TableTabMeetingsComponent } from './table-tab-meetings.component';
@NgModule({
  declarations: [TableTabMeetingsComponent],
  imports: [
    CommonModule,
    SelectMeetingsModule,
    InputMeetingsModule
  ],
  exports: [TableTabMeetingsComponent]
})
export class TableTabMeetingsModule { }

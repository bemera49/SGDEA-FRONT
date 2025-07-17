import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectMeetingsComponent } from './select-meetings.component';

@NgModule({
  declarations: [SelectMeetingsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SelectMeetingsComponent]
})
export class SelectMeetingsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextMeetingsComponent } from './text-meetings.component';


@NgModule({
  declarations: [TextMeetingsComponent],
  imports: [
    CommonModule
  ],
  exports: [TextMeetingsComponent]
})
export class TextMeetingsModule { }

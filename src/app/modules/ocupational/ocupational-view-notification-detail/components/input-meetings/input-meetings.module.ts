import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMeetingsComponent } from './input-meetings.component';

@NgModule({
  declarations: [InputMeetingsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InputMeetingsComponent]
})
export class InputMeetingsModule { }

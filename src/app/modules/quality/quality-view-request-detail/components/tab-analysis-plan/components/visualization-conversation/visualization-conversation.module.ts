import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisualizationConversationComponent } from './visualization-conversation.component';



@NgModule({
  declarations: [VisualizationConversationComponent],
  imports: [
    CommonModule
  ],
  exports: [VisualizationConversationComponent]
})
export class VisualizationConversationModule { }

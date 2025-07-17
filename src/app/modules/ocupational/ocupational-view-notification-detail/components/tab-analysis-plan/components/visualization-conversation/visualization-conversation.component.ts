import { Component, Input } from '@angular/core';
import { DataUserObservation } from '../../interface/visualization';

@Component({
  selector: 'app-visualization-conversation',
  templateUrl: './visualization-conversation.component.html',
  styleUrls: ['./visualization-conversation.component.css']
})
export class VisualizationConversationComponent {

  @Input() observations: DataUserObservation[];
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationConversationComponent } from './visualization-conversation.component';

describe('VisualizationConversationComponent', () => {
  let component: VisualizationConversationComponent;
  let fixture: ComponentFixture<VisualizationConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationConversationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizationConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

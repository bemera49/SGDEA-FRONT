import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowVisualizationModalComponent } from './flow-visualization-modal.component';

describe('FlowVisualizationModalComponent', () => {
  let component: FlowVisualizationModalComponent;
  let fixture: ComponentFixture<FlowVisualizationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowVisualizationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowVisualizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

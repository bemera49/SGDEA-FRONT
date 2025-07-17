import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAnalysisPlanComponent } from './tab-analysis-plan.component';

describe('TabAnalysisPlanComponent', () => {
  let component: TabAnalysisPlanComponent;
  let fixture: ComponentFixture<TabAnalysisPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabAnalysisPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabAnalysisPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

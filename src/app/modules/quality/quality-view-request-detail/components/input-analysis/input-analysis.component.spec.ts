import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAnalysisComponent } from './input-analysis.component';

describe('InputAnalysisComponent', () => {
  let component: InputAnalysisComponent;
  let fixture: ComponentFixture<InputAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

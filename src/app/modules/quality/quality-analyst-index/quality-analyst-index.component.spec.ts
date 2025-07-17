import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAnalystsIndexComponent } from './quality-analyst-index.component';

describe('QualityAnalystsIndexComponent', () => {
  let component: QualityAnalystsIndexComponent;
  let fixture: ComponentFixture<QualityAnalystsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityAnalystsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityAnalystsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

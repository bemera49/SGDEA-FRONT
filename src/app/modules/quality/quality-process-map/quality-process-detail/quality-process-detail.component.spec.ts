import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityProcessDetailComponent } from './quality-process-detail.component';

describe('QualityProcessDetailComponent', () => {
  let component: QualityProcessDetailComponent;
  let fixture: ComponentFixture<QualityProcessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityProcessDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityProcessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

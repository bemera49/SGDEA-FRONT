import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityViewRequestDetailComponent } from './quality-view-request-detail.component';

describe('QualityViewRequestDetailComponent', () => {
  let component: QualityViewRequestDetailComponent;
  let fixture: ComponentFixture<QualityViewRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityViewRequestDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QualityViewRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

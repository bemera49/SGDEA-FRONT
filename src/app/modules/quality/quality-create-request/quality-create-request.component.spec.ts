import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCreateRequestComponent } from './QualityCreateRequestComponent';

describe('QualityCreateRequestComponent', () => {
  let component: QualityCreateRequestComponent;
  let fixture: ComponentFixture<QualityCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityCreateRequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QualityCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

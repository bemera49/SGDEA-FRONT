import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityViewRequestComponent } from './quality-view-request.component';

describe('QualityViewRequestComponent', () => {
  let component: QualityViewRequestComponent;
  let fixture: ComponentFixture<QualityViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityViewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

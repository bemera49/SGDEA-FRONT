import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMapProcessComponent } from './quality-map-process.component';

describe('QualityMapProcessComponent', () => {
  let component: QualityMapProcessComponent;
  let fixture: ComponentFixture<QualityMapProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityMapProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityMapProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

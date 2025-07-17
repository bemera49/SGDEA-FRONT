import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDetailsProcessMapComponent } from './quality-details-process-map.component';

describe('QualityDetailsProcessMapComponent', () => {
  let component: QualityDetailsProcessMapComponent;
  let fixture: ComponentFixture<QualityDetailsProcessMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityDetailsProcessMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityDetailsProcessMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

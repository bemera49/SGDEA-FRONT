import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityProcessMapComponent } from './quality-process-map.component';

describe('QualityProcessMapComponent', () => {
  let component: QualityProcessMapComponent;
  let fixture: ComponentFixture<QualityProcessMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityProcessMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityProcessMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

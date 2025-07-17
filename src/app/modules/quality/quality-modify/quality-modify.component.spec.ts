import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityModifyComponent } from './quality-modify.component';

describe('QualityModifyComponent', () => {
  let component: QualityModifyComponent;
  let fixture: ComponentFixture<QualityModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

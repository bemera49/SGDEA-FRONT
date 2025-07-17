import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateDataViewerStepOneComponent } from './alternate-data-viewer-step-one.component';

describe('AlternateDataViewerStepOneComponent', () => {
  let component: AlternateDataViewerStepOneComponent;
  let fixture: ComponentFixture<AlternateDataViewerStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateDataViewerStepOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateDataViewerStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateDataViewerStepTwoComponent } from './alternate-data-viewer-step-two.component';

describe('AlternateDataViewerStepTwoComponent', () => {
  let component: AlternateDataViewerStepTwoComponent;
  let fixture: ComponentFixture<AlternateDataViewerStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateDataViewerStepTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternateDataViewerStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFilingFormComponent } from './e-filing-form.component';

describe('EFilingFormComponent', () => {
  let component: EFilingFormComponent;
  let fixture: ComponentFixture<EFilingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFilingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EFilingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

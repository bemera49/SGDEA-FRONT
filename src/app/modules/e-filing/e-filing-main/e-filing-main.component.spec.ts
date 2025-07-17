import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFilingMainComponent } from './e-filing-main.component';

describe('EFilingMainComponent', () => {
  let component: EFilingMainComponent;
  let fixture: ComponentFixture<EFilingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFilingMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EFilingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
